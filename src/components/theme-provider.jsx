import { useEffect } from "react";
import { useSelector } from "react-redux";

function ThemeClassSyncer() {
	const mode = useSelector((state) => state.theme.mode);

	useEffect(() => {
		const root = window.document.documentElement;
		if (mode === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
	}, [mode]);

	return null; // this component only houses the side‑effect
}

export default ThemeClassSyncer;
