import Layout from "@/components/layout";

export default function Enterpeneur() {
    return (
        <Layout option={{ footer: { hidden: true } }}>
            <div className="container mx-auto sm:rounded-lg h-[calc(100vh-var(--nav-height))] sm:h-[calc(100vh-var(--nav-height)*2.5)] sm:mt-10 shadow-medium flex flex-col gap-8 px-6 py-12">
                <div className="text-gunmetal dark:text-flash w-full text-center text-[25px] tracking-tight font-medium h-fit">Contact us to process your company account</div>
                <div className="flex flex-wrap">
                    <div className="big-button bg-mint text-seasalt">Whatsapp</div>
                </div>
            </div>
        </Layout>
    );
}
