import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
export default withApiAuthRequired(async function handler(req, res) {
    const { user } = await getSession(req, res);
    try {
        const access_token = (await axios.post(`${process.env.BASE_URL}/api/token/${process.env.TOKEN_QUERY}`)).data;
        const update = await axios.patch(`${process.env.AUTH0_AUDIENCE}users/${user.sub}`, req.body, { headers: { authorization: `Bearer ${access_token}` } });
        res.status(200).json(update.data);
    } catch (error) {
        res.status(500).json({ error: error.message ? error.message : "Internal Error" });
    }
});
