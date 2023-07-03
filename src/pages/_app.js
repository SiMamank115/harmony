// pages/_app.js

import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@/styles/globals.css";
import { SupabaseProvider } from "@/components/supabase";
import LazyAOS from "@/components/LazeAOS";

const App = ({ Component, pageProps }) => {
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
