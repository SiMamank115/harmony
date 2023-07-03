// pages/index.js
import Layout from "@/components/layout";

const Index = () => {
    return (
        <Layout option={{ navbar: { active: "home" } }}>
            <div className="hero w-full bg-[url('/hero-image.jpg')] bg-cover bg-center min-h-[calc(100vh-var(--nav-height))]"></div>
        </Layout>
    );
};

export default Index;
