"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CustomModal({
	isOpen,
	onClose,
	title,
	children,
	footer,
	maxWidth = "md",
	closeOnOutsideClick = true,
}) {
	const modalRef = useRef(null);

	// Handle ESC key press to close modal
	useEffect(() => {
		const handleEscKey = (e) => {
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscKey);
			// Prevent scrolling when modal is open
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscKey);
			document.body.style.overflow = "";
		};
	}, [isOpen, onClose]);

	// Handle outside click
	const handleOutsideClick = (e) => {
		if (
			closeOnOutsideClick &&
			modalRef.current &&
			!modalRef.current.contains(e.target)
		) {
			onClose();
		}
	};

	if (!isOpen) return null;

	// Determine max width class
	const maxWidthClass =
		{
			sm: "max-w-sm",
			md: "max-w-md",
			lg: "max-w-lg",
			xl: "max-w-xl",
			"2xl": "max-w-2xl",
			"3xl": "max-w-3xl",
			"4xl": "max-w-4xl",
			"5xl": "max-w-5xl",
			full: "max-w-full",
		}[maxWidth] || "max-w-md";

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
			onClick={handleOutsideClick}>
			<div
				ref={modalRef}
				className={`${maxWidthClass} w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden`}>
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
					<h2 className="text-lg font-semibold text-slate-900 dark:text-white">
						{title}
					</h2>
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 rounded-full"
						onClick={onClose}>
						<X className="h-4 w-4" />
						<span className="sr-only">Close</span>
					</Button>
				</div>

				{/* Content */}
				<div className="p-4">{children}</div>

				{/* Footer */}
				{footer && (
					<div className="flex justify-end gap-2 p-4 border-t border-slate-200 dark:border-slate-700">
						{footer}
					</div>
				)}
			</div>
		</div>
	);
}
