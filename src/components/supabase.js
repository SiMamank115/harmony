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
                    if (!isLoading && user?.accessToken) {
                        const supabase = getSupabase(user.accessToken);
                        if (supabase && !error) {
                            supabase
                                .from("users")
                                .select()
                                .then((e) => {
                                    if (e?.error?.message == "JWT expired") {
                                        push("/api/auth/logout");
                                    } else if (e.data.length == 0) {
                                        supabase    
                                            .from("users")
                                            .insert({
                                                user_id: user.sub,
                                            })
                                            .then((x) => {
                                                console.log("created");
                                            });
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
    }, [supa, isLoading]);

    return <SupabaseContext.Provider value={{ supa }}>{children}</SupabaseContext.Provider>;
};

SupabaseContext.displayName = "SupabaseContext";
SupabaseProvider.displayName = "SupabaseProvider";
