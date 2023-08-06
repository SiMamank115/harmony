import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Layout from "@/components/layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@/components/skeleton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
const Profile = () => {
	const schema = yup
		.object({
			email: yup.string().nullable().email(),
			username: yup.string().max(32),
			name: yup.string().max(64),
			nickname: yup.string().max(32),
			user_metadata: yup.object({
				location: yup.string().max(256),
				skills: yup.string().max(128),
				bio: yup.string().max(128),
			}),
		})
		.required();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });
	const [update, setUpdate] = useState(0); // trigger data fetching after user update their profile
	const [user, setUser] = useState({}); // user data
	const [loading, setLoading] = useState(true);
	const updateUser = (data) => {
		document
			.querySelector("button[type=submit")
			.setAttribute("disabled", true);
		toast.promise(
			axios.post("/api/user/update", data),
			{
				pending: "Updating your profile !",
				success: {
					render() {
						setUpdate(update + 1)
						return "Updated your profile !";
					},
				},
				error: {
					render({
						data: {
							response: { data },
						},
					}) {
						return data.error ?? "Please try again !";
					},
				},
			},
			{
				theme: localStorage.theme,
				position: toast.POSITION.BOTTOM_RIGHT,
				onClose: () =>
					document
						.querySelector("button[type=submit")
						.removeAttribute("disabled"),
			}
		);
	};
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
			{
				theme: localStorage.theme,
				position: toast.POSITION.BOTTOM_RIGHT,
				onClose: () => event.target.removeAttribute("disabled"),
			}
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
	useEffect(() => {
		let keys = Object.keys(errors);
		if (keys.length > 0) {
			keys.forEach((e) => {
				toast.error(errors[e].message);
			});
		}
	}, [errors]);
	return (
		<Layout
			option={{
				navbar: {
					dashboard: true,
					homeButton: false,
					active: "profile",
				},
			}}
		>
			<Head>
				<title>Profile | Harmony Hires</title>
			</Head>
			<form
				onSubmit={handleSubmit(updateUser)}
				id="profile"
				className="items-baseline container ring-0 ring-black shadow-lg rounded-lg gap-x-6 sm:gap-y-14 gap-y-6 p-10 mt-10 mx-auto flex flex-wrap"
			>
				<div className="w-full text-center text-5xl font-semibold text-gunmetal dark:text-seasalt mb-2">
					Profile
				</div>
				<div className="wrapper grow min-w-[250px]">
					<label className="w-full mb-1 font-medium text-gunmetal dark:text-seasalt">
						Email
					</label>
					{loading ? (
						<Skeleton width={"100%"} height={"2.6rem"} />
					) : (
						<input
							{...register("email")}
							className="form-input"
							disabled={
								loading ||
								user?.identities
									?.map((e) =>
										(e.isSocial &&
											user.user_id.split("|")[0]) ==
											e.provider || !e.email_verified
											? 1
											: 0
									)
									.reduce((e, c) => e + c, 0) > 0
							}
							type="email"
							defaultValue={loading ? "" : user.email}
						/>
					)}
				</div>
				<div className="wrapper grow min-w-[250px]">
					<label className="w-full mb-1 font-medium text-gunmetal dark:text-seasalt">
						Username
					</label>
					{loading ? (
						<Skeleton width={"100%"} height={"2.6rem"} />
					) : (
						<input
							{...register("username")}
							className="form-input"
							disabled={loading}
							type="text"
							defaultValue={loading ? "" : user.username}
						/>
					)}
				</div>
				<div className="wrapper grow min-w-[250px]">
					<label className="w-full mb-1 font-medium text-gunmetal dark:text-seasalt">
						Nickname
					</label>
					{loading ? (
						<Skeleton width={"100%"} height={"2.6rem"} />
					) : (
						<input
							{...register("nickname")}
							className="form-input"
							disabled={loading}
							type="text"
							defaultValue={loading ? "" : user.nickname}
						/>
					)}
				</div>
				<div className="wrapper grow min-w-[250px]">
					<label className="w-full mb-1 font-medium text-gunmetal dark:text-seasalt">
						Name
					</label>
					{loading ? (
						<Skeleton width={"100%"} height={"2.6rem"} />
					) : (
						<input
							{...register("name")}
							className="form-input"
							disabled={loading}
							type="text"
							defaultValue={loading ? "" : user.name}
						/>
					)}
				</div>
				<div className="wrapper grow min-w-[250px]">
					<label className="w-full mb-1 font-medium text-gunmetal dark:text-seasalt">
						Location
					</label>
					{loading ? (
						<Skeleton width={"100%"} height={"6.6rem"} />
					) : (
						<textarea
							{...register("user_metadata.location")}
							className="form-input"
							disabled={loading}
							type="text"
							defaultValue={
								loading && user.user_metadata?.location
									? ""
									: user.user_metadata?.location
							}
						/>
					)}
				</div>
				<div className="wrapper grow min-w-[250px]">
					<label className="w-full mb-1 font-medium text-gunmetal dark:text-seasalt">
						Skills
					</label>
					{loading ? (
						<Skeleton width={"100%"} height={"6.6rem"} />
					) : (
						<textarea
							{...register("user_metadata.skills")}
							className="form-input"
							disabled={loading}
							type="text"
							defaultValue={
								loading && user.user_metadata?.skills
									? ""
									: user.user_metadata?.skills
							}
						/>
					)}
				</div>
				<div className="wrapper grow !w-full">
					<label className="w-full mb-1 font-medium text-gunmetal dark:text-seasalt">
						Bio
					</label>
					{loading ? (
						<Skeleton width={"100%"} height={"6.6rem"} />
					) : (
						<textarea
							{...register("user_metadata.bio")}
							rows={4}
							className="form-input"
							disabled={loading}
							type="text"
							defaultValue={
								loading && user.user_metadata?.bio
									? ""
									: user.user_metadata?.bio
							}
						/>
					)}
				</div>
				<div className="w-full flex justify-center gap-6">
					<button
						onClick={reset}
						className="button bg-red-600 text-seasalt dark:bg-red-800 dark:text-seasalt"
					>
						Change password
					</button>
					<button
						type="submit"
						className="button bg-mint text-seasalt dark:bg-tiffany dark:text-gunmetal"
					>
						Save changes
					</button>
				</div>
			</form>
		</Layout>
	);
};

export const getServerSideProps = withPageAuthRequired();

export default Profile;
