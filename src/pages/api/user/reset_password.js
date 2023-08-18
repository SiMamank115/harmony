import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
export default withApiAuthRequired(async function handler(req, res) {
	const { user } = await getSession(req, res);
	try {
		if (req.method != "POST") throw Error();
		const access_token = (
			await axios.post(`${process.env.BASE_URL}/api/token/${process.env.TOKEN_QUERY}`).catch((e) => {
				throw new Error("Internal Error");
			})
		).data;
		const fulluser = (
			await axios.get(`${process.env.AUTH0_AUDIENCE}users/${user.sub}`, { headers: { authorization: `Bearer ${access_token}` } }).catch((e) => {
				throw new Error("Internal Error");
			})
		).data;
		if (!fulluser.email_verified) {
			throw new Error("Verify your email first !");
		}
		if (fulluser.identities.map((e) => (e.isSocial && fulluser.user_id.split("|")[0] == e.provider ? 1 : 0)).reduce((e, c) => e + c, 0) > 0) {
			throw new Error("Linked account can't change their Password !");
		}
		let UTCattempt = new Date().getTime() - new Date((fulluser?.user_metadata?.last_reset_password_attempt ?? 0) + +3600000).getTime();
		if (UTCattempt < 0)
			throw new Error(`Try again in ${Math.ceil((UTCattempt * -1 * 0.001) / 60)} ${(UTCattempt * -1 * 0.001) / 60 > 1 ? "Minutes" : "Minute"} !`);
		const reset = await axios
			.post(
				`${process.env.AUTH0_ISSUER_BASE_URL}/dbconnections/change_password`,
				new URLSearchParams({
					email: fulluser.email,
					connection: process.env.AUTH0_USER_CONNECTION,
					client_id: process.env.AUTH0_CLIENT_ID,
				}),
				{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
			)
			.then((e) => {
				axios.patch(
					`${process.env.AUTH0_AUDIENCE}users/${user.sub}`,
					{
						user_metadata: {
							last_reset_password_attempt: new Date().getTime(),
						},
					},
					{ headers: { authorization: `Bearer ${access_token}` } }
				);
			})
			.catch((e) => {
				throw new Error("Internal Error");
			});
		res.status(200).json(fulluser);
	} catch (error) {
		res.status(500).json({ error: error.message ? error.message : "Internal Error" });
	}
});
