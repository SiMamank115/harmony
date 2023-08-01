import Layout from "@/components/layout";
import { useEffect, useState } from "react";

export default function FAQ() {
	return (
		<Layout>
			<div className="absolute max-sm:hidden lg:left-20 md:left-16 left-5 top-28 h-[50px] w-[17px]">
				<img
					className="dark:block hidden h-fit w-fit"
					src="arrow-light.png"
				/>
				<img
					className="dark:hidden block h-fit w-fit"
					src="arrow-dark.png"
				/>
			</div>
			<div className="absolute max-sm:hidden lg:left-[52.5%] lg:top-[20.5rem] lg:w-[450px] md:left-[52.5%] md:top-[18rem] md:w-[325px] sm:right-[2.5%] sm:top-[15.75rem] sm:w-[300px]">
				<img
					className="dark:block hidden h-fit w-fit"
					src="underline-light.png"
				/>
				<img
					className="dark:hidden block h-fit w-fit"
					src="underline-dark.png"
				/>
			</div>
			<div className="flex w-full flex-wrap justify-center px-10 py-20">
				<div className="w-full sm:text-xl text-center font-semibold text-gunmetal dark:text-seasalt">
					FAQs
				</div>
				<div className="w-full lg:text-5xl md:text-4xl text-2xl !leading-normal font-bold text-center text-gunmetal dark:text-seasalt">
					Wow, We're{" "}
					<span className="text-mint dark:text-tiffany">Glad</span>{" "}
					you got here <br /> are there any{" "}
					<span className="text-mint dark:text-tiffany">
						Questions ?
					</span>
				</div>
			</div>
		</Layout>
	);
}
