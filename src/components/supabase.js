import { getSupabase } from "@/utils/supabase";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";

export const SupabaseContext = createContext({
    supa: null,
});

export const SupabaseProvider = ({ children }) => {
    const [supa, setSupa] = useState(null);
    const { user, error, isLoading } = useUser();
    const { push } = useRouter();
    useEffect(() => {
        if (!supa) {
            (async () => {
                try {
                    if (!isLoading) {
                        const supabase = getSupabase(user.accessToken);
                        if (supabase && !error) {
                            supabase.rpc("check_connection").then((e) => {
                                if (e?.error?.message == "JWT expired") {
                                    push("/api/auth/logout");
                                }
                            });
                            setSupa(supabase);
                        }
                    }
                } catch (error) {
                    throw Error(`[SupabaseProvider]: ${error}`);
                }
            })();
        }
        // supa ? supa.destroy() : false;
        // return () => {
        //     supa && supa.destroy();
        // };
    }, [supa, isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

    return <SupabaseContext.Provider value={{ supa }}>{children}</SupabaseContext.Provider>;
};

SupabaseContext.displayName = "SupabaseContext";
SupabaseProvider.displayName = "SupabaseProvider";
