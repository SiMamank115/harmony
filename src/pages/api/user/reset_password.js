import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
export default withApiAuthRequired(async function handler(req, res) {
    const { user } = await getSession(req, res);
    try {
        if (req.method != "POST") throw Error();
        const fulluser = await axios
            .post(
                `${process.env.AUTH0_ISSUER_BASE_URL}/dbconnections/change_password`,
                new URLSearchParams({
                    email: user.email,
                    connection: process.env.AUTH0_USER_CONNECTION,
                    client_id: process.env.AUTH0_CLIENT_ID,
                }),
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            )
            .catch((e) => console.log(e));
        res.status(200).json(fulluser.data);
    } catch (error) {
        res.status(500).json({ error: error.message ? error.message : "Internal Error" });
    }
});
