import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Layout from "@/components/layout";
import { useUser } from "@auth0/nextjs-auth0/client";

const Profile = () => {
    const { user, error, isLoading } = useUser();
    return (
        <div>lol</div>
        // <Layout option={{ navbar: { dashboard: true, homeButton: false, active: "profile" } }}>
        //     <p>PROFILE</p>
        // </Layout>
    );
};

export const getServerSideProps = withPageAuthRequired();

export default Profile;
