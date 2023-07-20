import axios from "axios";
export default async function handler(req, res) {
    try {
        if (req.method != "POST" || req.query?.token.findIndex((e) => e == process.env.TOKEN_QUERY) == -1) {
            throw Error();
        }
        let token = await axios.post(
            `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
            { client_id: process.env.AUTH0_API_CLIENT_ID, client_secret: process.env.AUTH0_API_CLIENT_SECRET, audience: process.env.AUTH0_AUDIENCE, grant_type: "client_credentials" },
            {
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        res.status(200).json(token.data.access_token);
    } catch (error) {
        return res.status(404).send();
    }
}
