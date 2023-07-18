import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
export default withApiAuthRequired(async function handler(req, res) {
    const { user } = await getSession(req, res);
    try {
        if (req.method != "GET") throw Error();
        const access_token = (await axios.post(`${process.env.BASE_URL}/api/token/${process.env.TOKEN_QUERY}`)).data;
        const fulluser = await axios.get(`${process.env.AUTH0_AUDIENCE}users/${user.sub}`, { headers: { authorization: `Bearer ${access_token}` } }).catch(e=>console.log(e));
        res.status(200).json(fulluser.data);
    } catch (error) {
        res.status(500).json({ error: error.message ? error.message : "Internal Error" });
    }
});
