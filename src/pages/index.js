// pages/index.js
import Button from "@/components/button";
import Layout from "@/components/layout";
import Skeleton from "@/components/skeleton";
import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const Index = () => {
    const { user, error, isLoading } = useUser();
    return (
        <Layout option={{ navbar: { active: "home" } }}>
            <Head>
                <title>Home | Harmony Hires</title>
            </Head>
            <div className="hero w-full bg-[url('/hero-image.webp')] gap-y-4 flex flex-wrap flex-col px-10 py-16 bg-cover bg-left min-h-[calc(100vh-var(--nav-height))]">
                <div className="text-flash flex flex-wrap gap-x-3 gap-y-6 font-bold sm:text-4xl text-2xl sm:text-left text-center sm:leading-snug w-full max-w-[550px]">
                    {isLoading ? (
                        <>
                            <Skeleton theme={"light"} height={"2.75rem"} width={"10rem"} />
                            <Skeleton theme={"light"} height={"2.75rem"} width={"3rem"} />
                            <Skeleton theme={"light"} height={"2.75rem"} width={"5rem"} />
                            <Skeleton theme={"light"} height={"2.75rem"} width={"7rem"} />
                            <Skeleton theme={"light"} height={"2.75rem"} width={"8rem"} />
                            <Skeleton theme={"light"} height={"2.75rem"} width={"4rem"} />
                            <Skeleton theme={"light"} height={"2.75rem"} width={"6rem"} />
                            <Skeleton theme={"light"} height={"2.75rem"} width={"9rem"} />
                            <Skeleton theme={"light"} height={"2.75rem"} width={"12rem"} />
                            <Skeleton theme={"light"} height={"2.75rem"} width={"2rem"} />
                            <Skeleton theme={"light"} height={"2.75rem"} width={"7rem"} />
                            <Skeleton theme={"light"} height={"2.75rem"} width={"5rem"} />
                        </>
                    ) : (
                        <>Discover Your True Potential With TalentFinder - Your Ultimate Platform for Finding The Perfect Job Match</>
                    )}
                </div>
                <div className="text-seasalt flex flex-wrap gap-x-3 gap-y-4 sm:font-medium tracking-wide sm:text-lg text-sm sm:text-left text-center max-w-[550px] mt-4 mb-12">
                    {isLoading ? (
                        <>
                            <Skeleton theme={"light"} height={"1.3rem"} width={"10rem"} />
                            <Skeleton theme={"light"} height={"1.3rem"} width={"3rem"} />
                            <Skeleton theme={"light"} height={"1.3rem"} width={"5rem"} />
                            <Skeleton theme={"light"} height={"1.3rem"} width={"7rem"} />
                            <Skeleton theme={"light"} height={"1.3rem"} width={"8rem"} />
                            <Skeleton theme={"light"} height={"1.3rem"} width={"4rem"} />
                            <Skeleton theme={"light"} height={"1.3rem"} width={"6rem"} />
                            <Skeleton theme={"light"} height={"1.3rem"} width={"3rem"} />
                            <Skeleton theme={"light"} height={"1.3rem"} width={"12rem"} />
                            <Skeleton theme={"light"} height={"1.3rem"} width={"2rem"} />
                            <Skeleton theme={"light"} height={"1.3rem"} width={"7rem"} />
                            <Skeleton theme={"light"} height={"1.3rem"} width={"5rem"} />
                        </>
                    ) : (
                        <>Welcome to TalentFinder, where we believe that everyone has unique talents that deserve to be recognized and celebrated. We're not just a job search platform -</>
                    )}
                </div>
                {isLoading ? (
                    <></>
                ) : (
                    <form data-aos-clean data-aos="blur-fade-up" data-aos-delay="500" data-aos-easing="ease-out-back" className="w-full rounded-lg bg-seasalt dark:bg-gunmetal flex flex-wrap gap-x-8 gap-y-6 p-5 shadow-xl shadow-zinc-900/60">
                        <input placeholder="Find by name here ..." className="form-input" type="text"></input>
                        <select defaultValue="none" className="form-input block">
                            <option value="none" disabled>
                                Choose Specialization
                            </option>
                            <option>barudak</option>
                            <option>tani lele</option>
                            <option>iya kah ngerinya</option>
                            <option>never gonna give u up</option>
                            <option>bro is a rizzly bear</option>
                        </select>
                        <input placeholder="Find by city here ..." className="form-input" type="text"></input>
                        <button type="submit" onClick={() => {}} className="button grow bg-gunmetal text-seasalt dark:bg-tiffany dark:text-gunmetal">
                            Search
                        </button>
                    </form>
                )}
            </div>
            <Marquee className="border-b-2 border-gunmetal/10" autoFill gradient gradientColor={[233, 236, 239]} gradientWidth="20%">
                <img className="h-[200px]" src="https://fakeimg.pl/600x400/e9ecef/6c757d?text=SPONSOR&font=bebas" />
            </Marquee>
            <div className="w-full flex md:flex-nowrap flex-wrap gap-8 px-10 py-16">
                <div className="md:w-2/5 w-full md:max-w-[250px] min-w-[175px] flex flex-col">
                    <div className="w-full text-mint dark:text-tiffany font-medium text-lg">Trending Job !</div>
                    <div className="w-full text-gunmetal dark:text-seasalt text-3xl font-bold">Get Your Job in your Hand !</div>
                </div>
                <div className="grow flex flex-wrap gap-x-4 gap-y-8">
                    {[...Array(6)].map((e, i) => (
                        <div key={"card-" + i} className="card">
                            <img className="max-w-[60px] rounded h-fit" alt="logo company" src="https://fakeimg.pl/600x400/1abc9c/E9ECEF?text=LOGO&font=bebas" />
                            <div className="w-full tag-container">
                                <div className="tag">Programming</div>
                                <div className="tag">Analyst</div>
                            </div>
                            <div className="text-lg font-semibold w-3/4 max-w-[250px] text-gunmetal dark:text-seasalt">Software Engineer & Spesialist Data Analyst </div>
                            <div className="text-xs leading-[1.1rem] font-medium w-3/4 max-w-[250px] text-gunmetal dark:text-seasalt">Our state-of-the-art technology and advanced filtering options enable you to find the perfect job match based on your skills, experience, and preferences.</div>
                            <button className="button bg-mint text-seasalt dark:bg-tiffany dark:text-gunmetal w-fit">Go Apply</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="devider">
                <div className="devider-line"></div>
                <button className="py-3 shadow-medium button bg-gunmetal text-seasalt dark:bg-flash dark:text-gunmetal">Load More Jobs</button>
                <div className="devider-line"></div>
            </div>
            <div className="w-full flex md:flex-nowrap flex-wrap gap-8 px-10 py-16">
                <div className="md:w-2/5 w-full md:max-w-[250px] min-w-[175px] flex flex-col">
                    <div className="w-full text-mint dark:text-tiffany font-medium text-lg">Top Talent !</div>
                    <div className="w-full text-gunmetal dark:text-seasalt text-3xl font-bold">Get Your Talent Here !</div>
                </div>
                <div className="grow flex flex-wrap gap-x-4 gap-y-8">
                    {[...Array(6)].map((e, i) => (
                        <div key={"card-" + i} className="card">
                            <img className="max-w-[100px] grow mx-auto aspect-square rounded-full" alt="logo company" src="https://fakeimg.pl/600x400/1abc9c/E9ECEF?text=antony&font=bebas" />
                            <div className="text-lg text-center mx-auto font-semibold w-3/4 max-w-[250px] text-gunmetal dark:text-seasalt">Antony Barakuda Mamakkau</div>
                            <div className="text-xs text-center mx-auto leading-[1.1rem] font-medium w-3/4 max-w-[250px] text-gunmetal dark:text-seasalt">3+ years experience as software engineer</div>
                            <button className="button bg-gunmetal mx-auto text-seasalt dark:bg-flash dark:text-gunmetal w-fit">See More</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="devider">
                <div className="devider-line"></div>
                <button className="py-3 shadow-medium button bg-gunmetal text-seasalt dark:bg-flash dark:text-gunmetal">Load More Talent</button>
                <div className="devider-line"></div>
            </div>
        </Layout>
    );
};

export default Index;
