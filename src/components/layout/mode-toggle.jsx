import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/theme/themeSlice"; // import your action

export function ModeToggle() {
	const { mode } = useSelector((state) => state.theme);
	const dispatch = useDispatch();

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => dispatch(toggleTheme())}
			className="rounded-full h-9 w-9 text-slate-600 dark:text-slate-300 hover:bg-primary/10 dark:hover:bg-primary/30 transition-colors duration-200 ease-in-out focus:outline-none ">
			{mode === "dark" ? (
				<Sun className="h-5 w-5" />
			) : (
				<Moon className="h-5 w-5" />
			)}
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
