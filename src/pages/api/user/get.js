import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
export default withApiAuthRequired(async function handler(req, res) {
    const { user } = await getSession(req, res);
    try {
        if (req.method != "GET") throw Error();
        const access_token = (await axios.post(`${process.env.BASE_URL}/api/token/${process.env.TOKEN_QUERY}`)).data;
        const fulluser = await axios.get(`${process.env.AUTH0_AUDIENCE}users/${user.sub}`, { headers: { authorization: `Bearer ${access_token}` } });
        res.status(200).json(processData(req, fulluser.data));
    } catch (error) {
        res.status(500).json({ error: error.message ? error.message : "Internal Error" });
    }
});
function processData(req, fulluser) {
    if (!req.query?.metadata && !req.query?.data) return fulluser;
    const result = {};
    if (req.query?.data) {
        req.query.data.split(",").forEach((e) => {
            fulluser[e] && (result[e] = fulluser[e]);
        });
    }
    if (req.query?.metadata) {
        result.user_metadata = {};
        req.query.metadata.split(",").forEach((e) => {
            fulluser.user_metadata[e] && (result.user_metadata[e] = fulluser.user_metadata[e]);
        });
    }
    return result;
}
