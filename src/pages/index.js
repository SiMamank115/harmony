// pages/index.js

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { SupabaseContext } from "@/components/supabase";
import { useRouter } from "next/router";
const Index = ({ user }) => {
    const [todos, setTodos] = useState([]);
    const { supa } = useContext(SupabaseContext);
    const { push } = useRouter();
    useEffect(() => {
        if (supa) {
            // crud
            supa
                .from("todo")
                .select("*")
                .then(({ data }) => {
                    setTodos(data);
                });
            console.log("Index load");
        }
    }, [supa]);

    return (
        <div>
            <p>
                Welcome {user.name}! <Link href="/api/auth/logout">Logout</Link>
            </p>
            {todos?.length > 0 ? todos.map((e) => <p key={e.title.replaceAll(" ", "").toLowerCase()}>{e.title}</p>) : "NOPE"}
            <p>You have completed all todos!</p>
        </div>
    );
};

export const getServerSideProps = withPageAuthRequired();

export default Index;
