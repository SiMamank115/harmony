// pages/api/auth/[...auth0].js

import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import jwt from "jsonwebtoken";

const afterCallback = async (req, res, session) => {
    const payload = {
        userId: session.user.sub,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30.44,
    };

    session.user.accessToken = jwt.sign(payload, process.env.SUPABASE_JWT_SECRET);

    return session;
};

export default handleAuth({
    async callback(req, res) {
        try {
            await handleCallback(req, res, { afterCallback });
            console.log("In");
        } catch (error) {
            console.log("In Error");
            res.status(error.status || 500).redirect("/").end(error.message);
        }
    },
});
