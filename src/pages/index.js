// pages/index.js

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { SupabaseContext } from "@/components/supabase";
import { useRouter } from "next/router";
import Layout from "@/components/layout";

const Index = () => {
    return (
        <Layout>
            <p>LMAO</p>
        </Layout>
    );
};


export default Index;
