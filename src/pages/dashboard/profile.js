import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Layout from "@/components/layout";
import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get("/api/user/get").then((e) => {
            if (e.status == 200) {
                setUser(e.data);
                setLoading(false);
            } else {
                setLoading(false);
                setUser({});
            }
        });
    }, []);
    return (
        <Layout option={{ navbar: { dashboard: true, homeButton: false, active: "profile" } }}>
            <Head>
                <title>Profile | Harmony Hires</title>
            </Head>
            <p>PROFILE</p>
            {loading ? "loading." : user.email}
            <br />
            {loading ? "loading.." : user.name}
            <br />
            {loading ? "loading..." : user.nickname}
            <br />
            {loading ? "loading.." : user.userdata?.role ?? "no role"}
        </Layout>
    );
};

export const getServerSideProps = withPageAuthRequired();

export default Profile;
