import Head from "next/head";
import Router from "next/router";

export default function ErrorHandler({ type }) {
    const datas = {
            404: {
                title: "Page not found",
                desc: "Seems like you face a non existing page! You can either check the url is right or not, or maybe you can go back and chill.",
            },
            401: {
                title: "Unauthorized",
                desc: "Seems like you end up in an login required page! You can either login, or maybe you can go back and chill.",
            },
            403: {
                title: "Forbidden",
                desc: "No hack for ya. ya'll better chill and stop messing around with the website. This is a Warning.",
            },
        },
        pagetitle = `Error ${type} !`;
    return (
        <div>LMAO BRR {type}</div>
    );
}