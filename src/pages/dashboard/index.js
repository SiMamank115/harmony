import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Layout from "@/components/layout";

const Dashboard = () => {
    return (
        <Layout option={{ navbar: { dashboard: true } }}>
            <p>DASHBOARD</p>
        </Layout>
    );
};

export const getServerSideProps = withPageAuthRequired();

export default Dashboard;
