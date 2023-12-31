// pages/_app.js

import React, { useEffect } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import 'react-toastify/dist/ReactToastify.css';
import "@/styles/globals.css";
import "@/styles/AOSextend.css";
import { SupabaseProvider } from "@/components/supabase";
import LazyAOS from "@/components/LazyAOS";
import BeforeLoad from "@/components/beforeLoad";
import { ToastContainer } from "react-toastify";
import { compactUtils } from "@/utils/compactUtils";
import ErrorPopup from "@/components/errorPopup";

const App = ({ Component, pageProps }) => {
    compactUtils()
    return (
        <UserProvider>
            <SupabaseProvider>
                <BeforeLoad />
                <Component {...pageProps} />
                <ErrorPopup />
                <ToastContainer limit={3} draggablePercent={50} />
                <LazyAOS />
            </SupabaseProvider>
        </UserProvider>
    );
};

export default App;
