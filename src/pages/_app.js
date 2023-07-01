// pages/_app.js

import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@/styles/globals.css";
import { SupabaseProvider } from "@/components/supabase";

const App = ({ Component, pageProps }) => {
    console.log("App load");
    return (
        <UserProvider>
            <SupabaseProvider>
                <Component {...pageProps} />
            </SupabaseProvider>
        </UserProvider>
    );
};

export default App;
