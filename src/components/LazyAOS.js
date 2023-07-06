import { useEffect } from "react";
import "aos/dist/aos.css";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function LazyAOS() {
    const { user, error, isLoading } = useUser();

    useEffect(() => {
        if (!isLoading) {
            document.addEventListener("aos:in", ({ detail }) => {
                if (detail.dataset.aosClean) {
                    detail.addEventListener("transitionend", () => {
                        delete detail.dataset.aosClean;
                        delete detail.dataset.aos;
                        delete detail.dataset.aosDelay;
                        delete detail.dataset.aosDuration;
                        delete detail.dataset.aosEasing;
                    });
                    // setTimeout(() => {
                    // }, detail.dataset.aosDelay);
                }
            });
            const AOS = require("aos");
            let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            AOS.init({ disable: reduced, dutaion: reduced ? 400 : 0 });
        }
    }, [isLoading]);

    return null;
}
