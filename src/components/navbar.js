import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function Navbar() {
    const { user, error, isLoading } = useUser();
    return (
        <div className="flex sticky p-3 min-h-[60px] bg-slate-500 w-full justify-between px-10">
            <div className="brand p-0 m-0 flex items-center gap-4">
                <img src="https://fakeimg.pl/400x400?font=bebas" className="aspect-square w-[50px] rounded" />
                <p className="font-semibold">Harmony</p>
            </div>
            <div className="navigation p-0 m-0 flex items-center gap-10">
                <div className="link-nav md:flex hidden items-center gap-12 px-5">
                    <Link href={"/"}>Abaut</Link>
                    <Link href={"/"}>Blog</Link>
                    <Link href={"/"}>Guide</Link>
                </div>
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
                            <Link className="md:block hidden" href="/dashboard">
                                Dashboard
                            </Link>
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
