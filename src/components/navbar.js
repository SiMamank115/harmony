import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Skeleton from "./skeleton";
import modeToggler from "@/utils/modeToggler";
import { useState } from "react";
import { useRouter } from "next/router";
import { FaAngleRight, FaBars } from "react-icons/fa6";
export default function Navbar({ dashboard, active, homeButton }) {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    console.log(router);
    const [sideMenu, setSideMenu] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false);
    return (
        <>
            <div className={"fixed transition origin-right flex right-0 top-0 h-screen w-2/5 min-w-[300px] max-w-full md:hidden sm:max-w-[400px] dark:bg-charcoal bg-flash z-[51]" + (!sideMenu ? " scale-x-0" : "")}>
                <div className="h-[var(--nav-height)] flex items-center justify-end px-2 shadow-sm w-full bg-mint dark:bg-tiffany">
                    <div onClick={() => setSideMenu(!sideMenu)} className="cursor-pointer button p-[14px] mx-7 bg-mint brightness-[.9] text-seasalt dark:bg-tiffany dark:text-gunmetal" key={"button-sidenav"}>
                        <FaAngleRight />
                    </div>
                </div>
            </div>
            <div className="flex shadow-sm sticky top-0 p-3 h-[var(--nav-height)] bg-seasalt dark:bg-gunmetal w-full px-8 md:px-8 lg:px-12 justify-between z-50">
                <div onClick={modeToggler} className="brand p-0 m-0 flex items-center gap-4">
                    <img src="/logo-11.png" className="h-3/4 max-h-[35px] rounded dark:hidden" />
                    <img src="/logo-11-light.png" className="h-3/4 max-h-[35px] rounded hidden dark:block" />
                </div>
                <div className="navigation p-0 m-0 flex items-center gap-5">
                    <div className="link-nav md:flex hidden items-center gap-2 text-gunmetal font-semibold">
                        {isLoading ? (
                            <>
                                <Skeleton width={"9rem"} />
                                <Skeleton width={"9rem"} />
                            </>
                        ) : !dashboard ? (
                            <>
                                <Link data-aos-clean data-aos="fade" data-aos-delay="0" data-active={active == "home"} href="/">
                                    Home
                                </Link>
                                <Link data-aos-clean data-aos="fade" data-aos-delay="50" data-active={active == "faq"} href="/">
                                    FAQ
                                </Link>
                                <Link data-aos-clean data-aos="fade" data-aos-delay="100" data-active={active == "job"} href="/">
                                    Job
                                </Link>
                                <Link data-aos-clean data-aos="fade" data-aos-delay="150" data-active={active == "talent"} href="/">
                                    Talent Finder
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link data-aos-clean data-aos="fade" data-aos-delay="0" data-active={active == "job"} href="/">
                                    Jobs
                                </Link>
                                <Link data-aos-clean data-aos="fade" data-aos-delay="50" data-active={active == "recruit"} href="/">
                                    Recruit
                                </Link>
                                <Link data-aos-clean data-aos="fade" data-aos-delay="100" data-active={active == "profile"} href="/dashboard/profile">
                                    Profile
                                </Link>
                                <Link data-aos-clean data-aos="fade" data-aos-delay="150" data-active={active == "setting"} href="/dashboard/setting">
                                    Setting
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="account-nav flex items-center gap-5">
                        {isLoading ? (
                            <>
                                <Skeleton width={"18rem"} />
                            </>
                        ) : (
                            ""
                        )}
                        {!isLoading && user && !error ? (
                            <>
                                <div className="w-[45px] items-center relative shadow-mudium md:flex hidden">
                                    <button className="m-0 p-0 rounded-full" onClick={() => setUserDropdown(!userDropdown)} onBlur={() => setUserDropdown(false)}>
                                        <img className="aspect-square cursor-pointer rounded-full hover:brightness-[.9] active:brightness-[.8] transition" src={user.picture} />
                                    </button>
                                    <div className={"absolute transition rounded-md w-screen max-w-[200px] top-[120%] -right-[5%] h-[50px] bg-mint origin-top-right" + (!userDropdown ? " scale-0 opacity-0" : "")}></div>
                                </div>
                                <Link key={"button-logout"} href={"/api/auth/logout"} className="button light-hover text-[#ef233c] md:block hidden">
                                    Logout
                                </Link>
                            </>
                        ) : (
                            ""
                        )}
                        {!isLoading && !user && !error ? (
                            <>
                                <Link data-aos-clean data-aos="fade-left" data-aos-delay="100" key={"button-login"} className="bg-mint text-seasalt dark:bg-tiffany dark:text-gunmetal button sm:block hidden" href={"/api/auth/login"}>
                                    Login
                                </Link>
                                <Link data-aos-clean data-aos="fade-left" data-aos-delay="0" key={"button-login2"} className="bg-transparent text-gunmetal dark:text-seasalt button light-hover outline -outline-offset-2 outline-2 outline-gunmetal dark:outline-seasalt sm:block hidden" href={"/enterpeneur"}>
                                    Login as Enterpeneur
                                </Link>
                            </>
                        ) : (
                            ""
                        )}
                        <div onClick={() => setSideMenu(!sideMenu)} className="cursor-pointer button p-[14px] mx-0 bg-mint text-seasalt dark:bg-tiffany dark:text-gunmetal block md:hidden" key={"button-sidenav"}>
                            <FaBars />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}