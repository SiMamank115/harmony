import Link from "next/link";
import Skeleton from "./skeleton";

export default function Footer({ hidden }) {
    return hidden ? (
        ""
    ) : (
        <div className="flex flex-wrap mt-52 py-16 gap-x-24 gap-y-4 min-h-[300px] overflow-x-hidden bg-gradient-to-r from-gunmetal to-mint dark:to-gunmetal w-full px-10 justify-between z-50">
            <div className="flex flex-wrap sm:py-10 w-full sm:w-1/3 gap-y-4">
                <img src="/logo-light.png" className="w-2/3 min-w-[200px] h-fit" />
                <div className="w-full text-seasalt">Welcome to TalentFinder, where we believe that everyone has unique talents that deserve to be recognized and celebrated. </div>
            </div>
            <div className="flex gap-12 grow py-10 text-seasalt">
                <div className="flex flex-col gap-2">
                    <div className="text-xl">Product</div>
                    <Link href={"/"} className="font-light">
                        Part Time Job
                    </Link>
                    <Link href={"/"} className="font-light">
                        Full Time Job
                    </Link>
                    <Link href={"/"} className="font-light">
                        Remote Job
                    </Link>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-xl">Company</div>
                    <Link href={"/"} className="font-light">
                        About Us
                    </Link>
                    <Link href={"/"} className="font-light">
                        Location
                    </Link>
                    <Link href={"/"} className="font-light">
                        Recruiting Staff
                    </Link>
                </div>
            </div>
            <div className="w-full h-0 rounded-full border border-seasalt/25"></div>
            <div className="flex flex-wrap w-full text-seasalt font-light justify-between gap-y-4 text-base sm:text-base">
                <div className="sm:w-fit w-full text-center">Terms And Condition | Privacy Police</div>
                <div className="sm:w-fit w-full text-center">Copyright HarmonyHires.com 2023</div>
            </div>
        </div>
    );
}
