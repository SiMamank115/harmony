import Link from "next/link";
import Skeleton from "./skeleton";
import modeToggler from "@/utils/modeToggler";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaAngleRight, FaBars } from "react-icons/fa6";
import Image from "next/image";
import axios from "axios";
export default function Navbar() {
	const router = useRouter();
	const dashboard = router.route.checkRoute("/dashboard", 0);
	const [update, setUpdate] = useState(false);
	const [sideMenu, setSideMenu] = useState(false);
	const [userDropdown, setUserDropdown] = useState(false);
	const [user, setUser] = useState({}); // user data
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setUser({});
		setLoading(true);
		axios
			.get("/api/user/get?data=email,name,nickname,picture,email_verified,app_metadata")
			.catch((e) => {
				setUpdate(update + 1);
				setUser({});
				setLoading(false);
			})
			.then((e) => {
				if (e?.status == 200) {
					setUser(e.data);
					setLoading(false);
				} else {
					setUpdate(update + 1);
					setUser({});
					setLoading(false);
				}
			});
	}, [update]);
	useEffect(() => {
		console.log("UseEffect");
		document.addEventListener("click", (e) => {
			if (
				Array.from(document.querySelectorAll("#dropdown"))
					.map((dropdown) => dropdown.contains(e.target))
					.findIndex((e) => e == true) != -1
			) {
				setUserDropdown(true);
			} else {
				setUserDropdown(false);
			}
		});
	}, []);
	return (
		<>
			<div
				className={
					"fixed transition origin-right flex right-0 top-0 h-screen w-2/5 min-w-[300px] max-w-full md:hidden sm:max-w-[400px] dark:bg-charcoal bg-flash z-[51]" +
					(!sideMenu ? " scale-x-0" : "")
				}
			>
				<div className="h-[var(--nav-height)] flex items-center justify-end px-2 shadow-sm w-full bg-mint dark:bg-tiffany">
					<div
						onClick={() => setSideMenu(!sideMenu)}
						className="cursor-pointer button p-[14px] mx-7 bg-mint brightness-[.9] text-seasalt dark:bg-tiffany dark:text-gunmetal"
						key={"button-sidenav"}
					>
						<FaAngleRight />
					</div>
				</div>
			</div>
			<div className="container mx-auto px-2">
				<div className="flex shadow-sm sticky top-0 p-3 h-[var(--nav-height)] bg-seasalt dark:bg-gunmetal md:px-8 justify-between z-50">
					<div className="brand p-0 m-0 flex items-center gap-4">
						<img src="/logo-11.png" className="h-3/4 max-h-[35px] rounded dark:hidden" />
						<img src="/logo-11-light.png" className="h-3/4 max-h-[35px] rounded hidden dark:block" />
					</div>
					<div className="navigation p-0 m-0 flex items-center gap-5">
						<div className="link-nav md:flex hidden items-center gap-2 text-gunmetal font-semibold">
							{loading ? (
								<>
									<Skeleton width={"9rem"} />
									<Skeleton width={"9rem"} />
								</>
							) : !dashboard ? (
								<>
									<Link data-aos-clean data-aos="fade" data-aos-delay="0" data-active={router.route.checkRoute("/", 0)} href="/">
										Home
									</Link>
									<Link data-aos-clean data-aos="fade" data-aos-delay="50" data-active={router.route.checkRoute("/FAQ", 0)} href="/FAQ">
										FAQ
									</Link>
									<Link data-aos-clean data-aos="fade" data-aos-delay="100" href="/">
										Job
									</Link>
									<Link data-aos-clean data-aos="fade" data-aos-delay="150" href="/">
										Talent Finder
									</Link>
								</>
							) : (
								<>
									<Link data-aos-clean data-aos="fade" data-aos-delay="0" href="/">
										Jobs
									</Link>
									<Link data-aos-clean data-aos="fade" data-aos-delay="50" href="/">
										Recruit
									</Link>
									<Link
										data-aos-clean
										data-aos="fade"
										data-aos-delay="100"
										data-active={router.route.checkRoute("/dashboard/profile", 0)}
										href="/dashboard/profile"
									>
										Profile
									</Link>
									<Link
										data-aos-clean
										data-aos="fade"
										data-aos-delay="150"
										data-active={router.route.checkRoute("/dashboard/setting", 0)}
										href="/dashboard/setting"
									>
										Setting
									</Link>
								</>
							)}
						</div>
						<div className="account-nav flex items-center gap-5">
							{loading ? (
								<>
									<Skeleton width={"18rem"} />
								</>
							) : (
								""
							)}
							{!loading && Object.keys(user).length > 0 ? (
								<>
									<div id="dropdown" className="w-[45px] justify-center rounded-full items-center relative shadow-mudium md:flex hidden">
										<button className="m-0 rounded-full">
											<Image
												alt="user profile picture"
												className="aspect-square ring-1 ring-mint ring-offset-2 dark:ring-offset-gunmetal cursor-pointer rounded-full hover:brightness-[.9] active:brightness-[.8] transition"
												src={user.picture}
												width={40}
												height={40}
											/>
										</button>
										<div
											className={
												"group [&>*]:px-4 w-screen max-w-[320px] pt-3 absolute flex flex-wrap overflow-hidden transition select-none shadow-[2px_2px_10px_0px_rgb(0_0_0_/_0.1)] border border-gunmetal/10 rounded-md top-[120%] -right-[5%] dark:bg-charcoal bg-seasalt dark:text-seasalt text-gunmetal origin-top-right" +
												(!userDropdown ? " scale-0 opacity-0" : "")
											}
										>
											<div className="flex gap-4 w-full">
												<div>
													<Image
														alt="user profile picture"
														className="aspect-square ring-1 ring-mint ring-offset-2 dark:ring-offset-gunmetal rounded-full hover:brightness-[.9] active:brightness-[.8] transition"
														src={user.picture}
														width={40}
														height={40}
													/>
												</div>
												<div className="grow">
													<div className="font-light flex justify-between">
														<span className="font-semibold">{user.app_metadata?.nickname.uppercaseFirst()}</span>
														<span
															className={
																"mx-4 px-2 py-[2px] text-seasalt text-[.81rem] font-semibold rounded-full " +
																(user?.email_verified ? "bg-mint/90" : "bg-[#fb8500]/90")
															}
														>
															{user?.email_verified ? "Verified" : "Pending"}
														</span>
													</div>
													<div className="text-sm font-light">{user.email}</div>
												</div>
											</div>
											<Link
												href="/dashboard/profile"
												className="border-t-2 dark:font-medium font-normal border-gunmetal/10 dark:border-seasalt/10 rounded-none px-0 mt-2 py-3 button w-full block"
											>
												Account settings
											</Link>
											<label
												onMouseUp={modeToggler}
												className="relative button inline-flex items-center cursor-pointer rounded-none px-0 py-3 w-full"
											>
												<input type="checkbox" value="" defaultChecked={localStorage.theme == "dark"} className="sr-only peer" />
												<div className="w-11 h-6 bg-charcoal border-2 border-gunmetal/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-tiffany dark:peer-focus:ring-tiffany rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-seasalt after:content-[''] after:absolute after:top-[2px] after:ms-4 after:mt-3 after:left-[2px] after:bg-seasalt after:border-seasalt after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mint"></div>
												<span className="ml-3 dark:font-medium font-normal">Dark mode</span>
											</label>
											<Link
												href="/api/auth/logout"
												className="border-t-2 border-gunmetal/10 dark:border-seasalt/10 rounded-none text-[#ef233c] font-medium dark:font-bold px-0 py-3 button w-full block"
											>
												Logout
											</Link>
										</div>
									</div>
								</>
							) : (
								""
							)}
							{!loading && !Object.keys(user).length > 0 ? (
								<>
									<Link
										data-aos-clean
										data-aos="fade-left"
										data-aos-delay="100"
										key={"button-login"}
										className="bg-mint text-seasalt dark:bg-tiffany dark:text-gunmetal button sm:block hidden"
										href={"/api/auth/login"}
									>
										Login
									</Link>
									<Link
										data-aos-clean
										data-aos="fade-left"
										data-aos-delay="0"
										key={"button-login2"}
										className="bg-transparent text-gunmetal dark:text-seasalt button light-hover outline -outline-offset-2 outline-2 outline-gunmetal dark:outline-seasalt sm:block hidden"
										href={"/enterpeneur"}
									>
										Login as Enterpeneur
									</Link>
								</>
							) : (
								""
							)}
							<div
								onClick={() => setSideMenu(!sideMenu)}
								className="cursor-pointer button p-[14px] mx-0 bg-mint text-seasalt dark:bg-tiffany dark:text-gunmetal block md:hidden"
								key={"button-sidenav"}
							>
								<FaBars />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
