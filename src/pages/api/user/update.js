import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
export default withApiAuthRequired(async function handler(req, res) {
    const access_token = await fetch(`${process.env.BASE_URL}/api/token/${process.env.TOKEN_QUERY}`, { method: "POST" }).then((e) => e.json());
    return res.status(200).json(access_token);
});
