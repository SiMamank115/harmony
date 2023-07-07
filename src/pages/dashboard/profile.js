import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Layout from "@/components/layout";

const Profile = () => {
    return (
        <Layout option={{ navbar: { profile: true } }}>
            <p>PROFILE</p>
        </Layout>
    );
};

export const getServerSideProps = withPageAuthRequired();

export default Profile;
