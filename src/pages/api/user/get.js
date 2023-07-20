import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
export default withApiAuthRequired(async function handler(req, res) {
    const { user } = await getSession(req, res);
    try {
        if (req.method != "GET") throw Error();
        const access_token = (await axios.post(`${process.env.BASE_URL}/api/token/${process.env.TOKEN_QUERY}`)).data;
        const fulluser = await axios.get(`${process.env.AUTH0_AUDIENCE}users/${user.sub}`, { headers: { authorization: `Bearer ${access_token}` } }).catch((e) => console.log(e));
        let result = {};
        if (req.query?.data) {
            let dataNeeded = req.query.data.split(",");
            dataNeeded.forEach((e) => {
                console.log(e);
                fulluser.data[e] ? (result[e] = fulluser.data[e]) : "";
            });
        }
        if (req.query?.metadata) {
            let dataNeeded = req.query.metadata.split(",");
            result.user_metadata = {};
            dataNeeded.forEach((e) => {
                console.log(e);
                fulluser.data.user_metadata[e] ? (result.user_metadata[e] = fulluser.data.user_metadata[e]) : "";
            });
        }
        if (!req.query?.data && !req.query?.metadata) result = fulluser.data;
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message ? error.message : "Internal Error" });
    }
});
