// pages/_app.js

import React, { useEffect } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@/styles/globals.css";
import "@/styles/AOSextend.css";
import { SupabaseProvider } from "@/components/supabase";
import LazyAOS from "@/components/LazyAOS";
import BeforeLoad from "@/components/beforeLoad";

const App = ({ Component, pageProps }) => {
    return (
        <UserProvider>
            <SupabaseProvider>
                <BeforeLoad />
                <Component {...pageProps} />
                <LazyAOS />
            </SupabaseProvider>
        </UserProvider>
    );
};

export default App;
