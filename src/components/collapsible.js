import { useEffect, useState } from "react";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { uid } from "uid";
export default function Collapsible({ children, autoOpen }) {
	const [id, setId] = useState("");
	const [height, setHeight] = useState("auto");
	useEffect(() => {
		setId("collapsible-" + uid());
	}, []);
	useEffect(() => {
		if (id) {
			setHeight(
				document.querySelector("#" + id + " > .collapsible-content")
					.scrollHeight + "px"
			);
		}
	}, [id]);
	return (
		<div
			id={id}
			className={
				"collapsible group transition flex flex-col w-full text-gunmetal dark:text-seasalt" +
				(!autoOpen ? " collapse-show" : "")
			}
		>
			<div className="flex justify-between py-5 hover-darken transition px-4 gap-x-4 cursor-pointer"
			onClick={(e) =>
					document
						.getElementById(id)
						?.classList?.toggle?.("collapse-show")
				}>
				<div className="font-bold text-xl"
				>
					{children?.[0] && typeof children == "object" ? (
						children[0]
					) : typeof children == "string" ? (
						children
					) : (
						<>
							Click this
							<FaArrowRightLong className="inline mx-4" />
						</>
					)}
				</div>
				<button
				>
					<BsDashCircle  className="text-xl group-[.collapse-show]:hidden"/>
					<BsPlusCircle className="text-xl group-[.collapse-show]:block hidden" />
				</button>
			</div>
			<div
				style={{ height: height }}
				className="collapsible-content group-[.collapse-show]:!h-0 motion-reduce:transition-none transition-[height] px-4 border-b-2 border-gunmetal/20 dark:border-seasalt/20 overflow-hidden"
			>
				{children?.[1] && typeof children == "object" ? (
					children[1]
				) : (
					<>
						<p>
							Labore labore reprehenderit voluptate exercitation
							enim. Aliqua duis amet exercitation ipsum non.
							Nostrud dolore qui ad ea.
						</p>

						<p>
							Mollit aute esse nostrud sit do. Anim elit nulla
							aute exercitation fugiat cillum cillum duis velit
							nulla cillum ex minim. Aliquip aliqua laborum dolore
							velit reprehenderit aliqua tempor do veniam commodo
							quis occaecat. Laborum dolor ipsum tempor qui
							eiusmod culpa deserunt cillum ullamco. Excepteur
							labore excepteur qui anim minim fugiat eiusmod
							eiusmod ad. Commodo veniam ex reprehenderit aliqua
							consequat eiusmod eiusmod exercitation.
						</p>
					</>
				)}
				<div className="h-[1rem]"></div>
			</div>
		</div>
	);
}
