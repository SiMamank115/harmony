import { useEffect } from "react";

export function compactUtils() {
	String.prototype.uppercaseFirst = function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};
	String.prototype.checkRoute = function (string = "", index = 0) {
		return string == "/" ? this == string : this.includes(string, index);
	};
	useEffect(() => {
		if (!localStorage?.theme) {
			if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
				localStorage.theme = "dark";
			} else {
				localStorage.theme = "light";
			}
		}
	}, []);
}
