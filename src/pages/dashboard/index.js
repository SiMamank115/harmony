import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Layout from "@/components/layout";
import Head from "next/head";

const Dashboard = () => {
    return (
        <Layout option={{ navbar: { dashboard: true } }}>
            <Head>
                <title>Dashboard | Harmony Hires</title>
            </Head>
            <p>DASHBOARD</p>
        </Layout>
    );
};

export const getServerSideProps = withPageAuthRequired();

export default Dashboard;
