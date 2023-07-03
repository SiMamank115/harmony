import contrast from "@/utils/contrast";
import pSBC from "@/utils/pSBC";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Button(props) {
    const [bg, setBG] = useState(props.backgroundcolor ?? "#1ABC9C");
    let classes = (props.classes ?? "") + " button";
    let style = props.style ?? {};
    let isdark = contrast(bg, "#fff") > contrast(bg, "#000");
    let dark = isdark ? 1 : -1;
    let hover = pSBC(0.2 * dark, bg);
    style["--button-bg"] = bg;
    style["--button-bg-hover"] = props.bghover ?? hover;
    style["--button-text"] = props.textcolor ?? pSBC(0.99 * (dark * (props?.whitetext ? (props?.blacktext ? -1 : dark) : 1)), bg);
    console.log(classes);
    return props?.href ? (
        <Link className={classes} style={style} {...props}>
            {props.children}
        </Link>
    ) : (
        <button className={classes} style={style} {...props}>
            {props.children}
        </button>
    );
}
