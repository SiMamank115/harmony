import updateData from "@/utils/updateData";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
export default withApiAuthRequired(async function handler(req, res) {
	const { user } = await getSession(req, res);
	try {
		if (req.method != "POST") throw Error();
		const access_token = (await axios.post(`${process.env.BASE_URL}/api/token/${process.env.TOKEN_QUERY}`)).data;
		const fulluser = (
			await axios
				.get(`${process.env.AUTH0_AUDIENCE}users/${user.sub}`, {
					headers: { authorization: `Bearer ${access_token}` },
				})
				.catch((e) => {
					throw new Error("Internal Error");
				})
		).data;
		if (
			fulluser.identities
				.map((e) => ((e.isSocial && fulluser.user_id.split("|")[0] == e.provider) || !fulluser.email_verified ? 1 : 0))
				.reduce((e, c) => e + c, 0) > 0
		) {
			delete req.body?.email;
		}
		let finalData = updateData(fulluser, req.body);
		if (Object.keys(finalData).length == 0) {
			res.status(200).json({});
			return;
		}
		const update = await axios.patch(`${process.env.AUTH0_AUDIENCE}users/${fulluser.user_id}`, finalData, {
			headers: { authorization: `Bearer ${access_token}` },
		});
		res.status(200).json(update.data);
		// res.status(200).json(fulluser);
	} catch (error) {
		console.log(error.response);
		res.status(500).json({
			error: error.response.data.message ? error.response.data.message : "Internal Error",
		});
	}
});
