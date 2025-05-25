import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { useSelector } from "react-redux";

export function Logo({ className, showText = true, size = "default" }) {
	const { mode } = useSelector((state) => state.theme);
	const [mounted, setMounted] = useState(false);

	// Ensure component is mounted to avoid hydration issues
	useEffect(() => {
		setMounted(true);
	}, []);

	// Size variants
	const sizeClasses = {
		small: "h-6",
		default: "h-10",
		large: "h-14",
	};

	// Animation variants
	const logoVariants = {
		initial: { scale: 0.9, opacity: 0 },
		animate: {
			scale: 1,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 20,
			},
		},
		hover: {
			scale: 1.05,
			transition: {
				type: "spring",
				stiffness: 400,
				damping: 10,
			},
		},
	};

	const textVariants = {
		initial: { opacity: 0, x: -20 },
		animate: {
			opacity: 1,
			x: 0,
			transition: {
				delay: 0.2,
				duration: 0.3,
			},
		},
	};

	if (!mounted) return null;

	return (
		<motion.div
			className={cn("flex items-center", className)}
			initial="initial"
			animate="animate"
			whileHover="hover">
			{/* Logo container with 3D effect */}
			<motion.div
				className={cn("relative overflow-hidden", sizeClasses[size])}
				variants={logoVariants}>
				{/* Glow effect */}
				<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

				{/* Logo image */}
				<img
					src={mode === "dark" ? "AI-05-01.png" : "AI-06.png"}
					alt="CRM Logo"
					className="h-full w-auto object-contain"
				/>
			</motion.div>

			{/* Text */}
			{showText && (
				<motion.div
					className={cn("relative overflow-hidden", sizeClasses[size])}
					variants={textVariants}>
					{/* Logo image */}
					<img
						src={mode === "dark" ? "AI-03-01.png" : "AI-01-01.png"}
						alt="CRM Logo"
						className="h-full w-auto object-contain"
					/>
				</motion.div>
			)}
		</motion.div>
	);
}
