import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Skeleton from "./skeleton";
import modeToggler from "@/utils/modeToggler";

export default function Navbar({ dashboard, active, homeButton }) {
    const { user, error, isLoading } = useUser();
    return (
        <div className="flex sticky top-0 p-3 h-[var(--nav-height)] overflow-x-hidden bg-seasalt dark:bg-gunmetal mx-auto max-w-7xl px-2 md:px-6 lg:px-8 justify-between z-50">
            <div onClick={modeToggler} className="brand p-0 m-0 flex items-center gap-4">
                <img src="/logo-11.png" className="h-3/4 max-h-[35px] rounded dark:hidden" />
                <img src="/logo-11-light.png" className="h-3/4 max-h-[35px] rounded hidden dark:block" />
            </div>
            <div className="navigation p-0 m-0 flex items-center gap-5">
                <div className="link-nav lg:flex hidden items-center gap-2 text-gunmetal font-semibold">
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
                            {(homeButton == null ? dashboard : homeButton) ? (
                                <Link data-aos-clean data-aos="fade" data-aos-delay="200" className="button bg-mint text-seasalt dark:bg-tiffany dark:text-gunmetal" key={"button-home"} href={"/"}>
                                    Home
                                </Link>
                            ) : (
                                <Link data-aos-clean data-aos="fade" data-aos-delay="200" className="button bg-mint text-seasalt dark:bg-tiffany dark:text-gunmetal" key={"button-dashboard"} href={"/dashboard"}>
                                    Dashboard
                                </Link>
                            )}
                            <Link key={"button-logout"} href={"/api/auth/logout"} className="button light-hover text-[#ef233c]">
                                Logout
                            </Link>
                        </>
                    ) : (
                        ""
                    )}
                    {!isLoading && !user && !error ? (
                        <>
                            <Link data-aos-clean data-aos="fade-left" data-aos-delay="100" key={"button-login"} className="bg-mint text-seasalt dark:bg-tiffany dark:text-gunmetal button" href={"/api/auth/login"}>
                                Login
                            </Link>
                            <Link data-aos-clean data-aos="fade-left" data-aos-delay="0" key={"button-login2"} className="bg-transparent text-gunmetal dark:text-seasalt button light-hover outline -outline-offset-2 outline-2 outline-gunmetal dark:outline-seasalt" href={"/api/auth/login"}>
                                Login as Enterpeneur
                            </Link>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}
