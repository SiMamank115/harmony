import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Button from "./button";
export default function Navbar({ dashboard, active }) {
    const { user, error, isLoading } = useUser();
    return (
        <div className="flex sticky top-0 p-3 h-[var(--nav-height)] overflow-x-hidden bg-seasalt w-full justify-between px-10">
            <div className="brand p-0 m-0 flex items-center gap-4">
                <img src="logo.png" className="h-3/4 max-h-[35px] rounded" />
            </div>
            <div className="navigation p-0 m-0 flex items-center gap-10">
                <div className="link-nav md:flex hidden items-center gap-10 text-gunmetal font-semibold">
                    {isLoading ? (
                        <>
                            <div className="h-9 bg-slate-700 rounded animate-pulse w-24"></div>
                            <div className="h-9 bg-slate-700 rounded animate-pulse w-24"></div>
                        </>
                    ) : !dashboard ? (
                        <>
                            <Link data-aos="zoom-in" data-aos-delay="0" data-active={active == "home"} href="/">
                                Home
                            </Link>
                            <Link data-aos="zoom-in" data-aos-delay="50" data-active={active == "faq"} href="/">
                                FAQ
                            </Link>
                            <Link data-aos="zoom-in" data-aos-delay="100" data-active={active == "job"} href="/">
                                Job
                            </Link>
                            <Link data-aos="zoom-in" data-aos-delay="150" data-active={active == "talent"} href="/">
                                Talent Finder
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link data-aos="zoom-in" data-aos-delay="0" data-active={active == "job"} href="/">
                                Jobs
                            </Link>
                            <Link data-aos="zoom-in" data-aos-delay="50" data-active={active == "recruit"} href="/">
                                Recruit
                            </Link>
                            <Link data-aos="zoom-in" data-aos-delay="100" data-active={active == "profile"} href="/">
                                Profile
                            </Link>
                        </>
                    )}
                </div>
                <div className="account-nav flex items-center gap-5">
                    {isLoading ? (
                        <>
                            <div className="h-9 bg-slate-700 rounded animate-pulse w-72"></div>
                        </>
                    ) : (
                        ""
                    )}
                    {!isLoading && user && !error ? (
                        <>
                            {dashboard ? (
                                <Button data-aos="zoom-in" data-aos-delay="300" key={"button-login"} href={"/"} whitetext={"true"}>
                                    Home
                                </Button>
                            ) : (
                                <Button data-aos="zoom-in" data-aos-delay="300" key={"button-dashboard"} href={"/dashboard"} whitetext={"true"}>
                                    Dashboard
                                </Button>
                            )}
                            <Button key={"button-logout"} href={"/api/auth/logout"} backgroundcolor="#F8F9FA" classes="outline -outline-offset-2 outline-2 outline-[#d9042900]" whitetext={"true"} textcolor={"#c1121f"}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        ""
                    )}
                    {!isLoading && !user && !error ? (
                        <>
                            <Button data-aos="zoom-in-left" data-aos-delay="100" key={"button-login"} href={"/api/auth/login"} whitetext={"true"}>
                                Login
                            </Button>
                            <Button data-aos="zoom-in-left" data-aos-delay="0" key={"button-login2"} classes="outline -outline-offset-2 outline-2 outline-gunmetal" href={"/api/auth/login"} whitetext={"true"} backgroundcolor={"#F8F9FA"} bghover={"#E9ECEF"} textcolor={"#1F2D3D"}>
                                Login as Enterpeneur
                            </Button>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}
