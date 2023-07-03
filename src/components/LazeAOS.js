import { useEffect } from "react";
import dynamic from "next/dynamic";
import "aos/dist/aos.css";
import { useUser } from "@auth0/nextjs-auth0/client";
const AOS = dynamic(() => import("aos"), { ssr: false });

export default function LazyAOS() {
    const { user, error, isLoading } = useUser();
    useEffect(() => {
        if (!isLoading) {
            const AOS = require("aos");
            AOS.init({});
        }
    }, [isLoading]);

    return null;
}
