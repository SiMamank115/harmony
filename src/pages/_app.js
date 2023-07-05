// pages/_app.js

import React, { useEffect } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@/styles/globals.css";
import "@/styles/AOSextend.css";
import { SupabaseProvider } from "@/components/supabase";
import LazyAOS from "@/components/LazyAOS";

const App = ({ Component, pageProps }) => {
    useEffect(() => {
        if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);
    return (
        <UserProvider>
            <SupabaseProvider>
                <Component {...pageProps} />
                <LazyAOS />
            </SupabaseProvider>
        </UserProvider>
    );
};

export default App;
