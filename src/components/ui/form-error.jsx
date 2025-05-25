"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";

// Inline form error that appears below input fields
export function FormError({ message, className }) {
	if (!message) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: -5, height: 0 }}
			animate={{
				opacity: 1,
				y: 0,
				height: "auto",
				transition: {
					type: "spring",
					stiffness: 500,
					damping: 30,
				},
			}}
			exit={{ opacity: 0, y: -5, height: 0 }}
			className={cn("flex items-center gap-1.5 mt-1.5", className)}>
			<AlertCircle className="h-3.5 w-3.5 text-red-500 flex-shrink-0" />
			<span className="text-xs text-red-600 dark:text-red-400">{message}</span>
		</motion.div>
	);
}

// Animated error highlight for input fields
export function ErrorHighlight({ children, isError, errorMessage, className }) {
	return (
		<div className={cn("relative", className)}>
			{children}

			{isError && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { duration: 0.2 },
					}}
					className="absolute inset-0 rounded-lg pointer-events-none"
				/>
			)}

			{errorMessage && <FormError message={errorMessage} />}
		</div>
	);
}
