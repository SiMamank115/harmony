import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Layout from "@/components/layout";
import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@/components/skeleton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
const Profile = () => {
    const [update, setUpdate] = useState(0);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const reset = (event) => {
        event.target.setAttribute("disabled", "");
        toast.promise(
            axios.post("/api/user/reset_password"),
            {
                pending: "Sending to your email !",
                success: "Check your email !",
                error: {
                    render({
                        data: {
                            response: { data },
                        },
                    }) {
                        console.log(data);
                        return data.error ?? "Please try again !";
                    },
                },
            },
            { theme: localStorage.theme, position: toast.POSITION.BOTTOM_RIGHT, onClose: () => event.target.removeAttribute("disabled") }
        );
    };
    useEffect(() => {
        setUser({});
        setLoading(true);
        axios
            .get("/api/user/get")
            .catch((e) => {
                setUser({});
                setLoading(false);
            })
            .then((e) => {
                if (e?.status == 200) {
                    setUser(e.data);
                    setLoading(false);
                } else {
                    setUser({});
                    setLoading(false);
                }
            });
    }, [update]);
    return (
        <Layout option={{ navbar: { dashboard: true, homeButton: false, active: "profile" } }}>
            <Head>
                <title>Profile | Harmony Hires</title>
            </Head>
            <div id="profile" className="items-baseline container ring-0 ring-black shadow-lg rounded-lg gap-x-6 gap-y-14 p-10 mt-10 mx-auto flex flex-wrap">
                <div className="w-full text-center text-5xl font-semibold text-gunmetal dark:text-seasalt mb-2">Profile</div>
                <div className="wrapper grow min-w-[250px]">
                    <label className="w-full mb-1 font-medium text-gunmetal dark:text-seasalt">Email</label>
                    {loading ? <Skeleton width={"100%"} height={"2.6rem"} /> : <input className="form-input" disabled={loading} type="email" defaultValue={loading ? "" : user.email} />}
                </div>
                <div className="wrapper grow min-w-[250px]">
                    <label className="w-full mb-1 font-medium text-gunmetal dark:text-seasalt">Username</label>
                    {loading ? <Skeleton width={"100%"} height={"2.6rem"} /> : <input className="form-input" disabled={loading} type="text" defaultValue={loading ? "" : user.username} />}
                </div>
                <div className="wrapper grow min-w-[250px]">
                    <label className="w-full mb-1 font-medium text-gunmetal dark:text-seasalt">Nickname</label>
                    {loading ? <Skeleton width={"100%"} height={"2.6rem"} /> : <input className="form-input" disabled={loading} type="text" defaultValue={loading ? "" : user.nickname} />}
                </div>
                <div className="wrapper grow min-w-[250px]">
                    <label className="w-full mb-1 font-medium text-gunmetal dark:text-seasalt">Name</label>
                    {loading ? <Skeleton width={"100%"} height={"2.6rem"} /> : <input className="form-input" disabled={loading} type="text" defaultValue={loading ? "" : user.name} />}
                </div>
                <div className="wrapper grow min-w-[250px]">
                    <label className="w-full mb-1 font-medium text-gunmetal dark:text-seasalt">Location</label>
                    {loading ? <Skeleton width={"100%"} height={"6.6rem"} /> : <textarea className="form-input" disabled={loading} type="text" defaultValue={loading && user.user_metadata?.location ? "" : user.user_metadata?.location} />}
                </div>
                <div className="wrapper grow min-w-[250px]">
                    <label className="w-full mb-1 font-medium text-gunmetal dark:text-seasalt">Skills</label>
                    {loading ? <Skeleton width={"100%"} height={"6.6rem"} /> : <textarea className="form-input" disabled={loading} type="text" defaultValue={loading && user.user_metadata?.skills ? "" : user.user_metadata?.skills} />}
                </div>
                <div className="wrapper grow w-full">
                    <label className="w-full mb-1 font-medium text-gunmetal dark:text-seasalt">Bio</label>
                    {loading ? <Skeleton width={"100%"} height={"6.6rem"} /> : <textarea rows={4} className="form-input" disabled={loading} type="text" defaultValue={loading && user.user_metadata?.bio ? "" : user.user_metadata?.bio} />}
                </div>
                <div className="w-full flex justify-center gap-6">
                    <button onClick={reset} className="button bg-red-600 text-seasalt dark:bg-red-800 dark:text-seasalt">
                        Change password
                    </button>
                    <button className="button bg-mint text-seasalt dark:bg-tiffany dark:text-gunmetal">Save changes</button>
                </div>
            </div>
        </Layout>
    );
};

export const getServerSideProps = withPageAuthRequired();

export default Profile;
