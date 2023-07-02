import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function Navbar({ dashboard, active }) {
    const { user, error, isLoading } = useUser();
    return (
        <div className="flex sticky p-3 h-[var(--nav-height)] bg-seasalt w-full justify-between px-10">
            <div className="brand p-0 m-0 flex items-center gap-4">
                <img src="logo.png" className="h-3/4 max-h-[35px] rounded" />
            </div>
            <div className="navigation p-0 m-0 flex items-center gap-10">
                {dashboard ? (
                    <div className="link-nav md:flex hidden items-center gap-12 px-5 text-gunmetal font-semibold">
                        <Link data-active={active == "job"} href="/">Jobs</Link>
                        <Link data-active={active == "recruit"} href="/">Recruit</Link>
                        <Link data-active={active == "profile"} href="/">Profile</Link>
                    </div>
                ) : (
                    <div className="link-nav md:flex hidden items-center gap-12 px-5 text-gunmetal font-semibold">
                        <Link data-active={active == "home"} href="/">Home</Link>
                        <Link data-active={active == "faq"} href="/">FAQ</Link>
                        <Link data-active={active == "job"} href="/">Job</Link>
                        <Link data-active={active == "talent"} href="/">Talent Finder</Link>
                    </div>
                )}
                <div className="account-nav flex items-center gap-7 px-10">
                    {isLoading ? (
                        <>
                            <div className="h-8 bg-slate-700 rounded animate-pulse w-20"></div>
                            <div className="h-8 bg-slate-700 rounded animate-pulse w-14"></div>
                        </>
                    ) : (
                        ""
                    )}
                    {!isLoading && user && !error ? (
                        <>
                            {dashboard ? (
                                <Link className="md:block hidden" href="/">
                                    Home
                                </Link>
                            ) : (
                                <Link className="md:block hidden" href="/dashboard">
                                    Dashboard
                                </Link>
                            )}
                            <Link className="md:block hidden" href="/api/auth/logout">
                                Logout
                            </Link>
                        </>
                    ) : (
                        ""
                    )}
                    {!isLoading && !user && !error ? (
                        <>
                            <Link className="md:block hidden" href={"/api/auth/login"}>
                                New User
                            </Link>
                            <Link className="md:block hidden" href={"/api/auth/login"}>
                                Login
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
