"use client";

import { createContext, useContext, useState } from "react";

// Toast types
export const TOAST_TYPES = {
	DEFAULT: "default",
	SUCCESS: "success",
	ERROR: "error",
	WARNING: "warning",
	INFO: "info",
};

// Default duration for toasts
const DEFAULT_TOAST_DURATION = 5000;

// Create context for toast
const ToastContext = createContext({
	toasts: [],
	toast: () => {},
	dismiss: () => {},
});

// Toast component
export const Toast = ({
	id,
	type,
	title,
	description,
	duration,
	onDismiss,
}) => {
	const [isVisible, setIsVisible] = useState(true);

	// Handle dismiss
	const handleDismiss = () => {
		setIsVisible(false);
		setTimeout(() => {
			onDismiss(id);
		}, 300); // Wait for animation to complete
	};

	// Auto dismiss
	if (duration !== Number.POSITIVE_INFINITY) {
		setTimeout(() => {
			handleDismiss();
		}, duration || DEFAULT_TOAST_DURATION);
	}

	// Get icon based on type
	const getIcon = () => {
		switch (type) {
			case TOAST_TYPES.SUCCESS:
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-green-500">
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
						<polyline points="22 4 12 14.01 9 11.01"></polyline>
					</svg>
				);
			case TOAST_TYPES.ERROR:
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-red-500">
						<circle cx="12" cy="12" r="10"></circle>
						<line x1="15" y1="9" x2="9" y2="15"></line>
						<line x1="9" y1="9" x2="15" y2="15"></line>
					</svg>
				);
			case TOAST_TYPES.WARNING:
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-yellow-500">
						<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
						<line x1="12" y1="9" x2="12" y2="13"></line>
						<line x1="12" y1="17" x2="12.01" y2="17"></line>
					</svg>
				);
			case TOAST_TYPES.INFO:
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-blue-500">
						<circle cx="12" cy="12" r="10"></circle>
						<line x1="12" y1="16" x2="12" y2="12"></line>
						<line x1="12" y1="8" x2="12.01" y2="8"></line>
					</svg>
				);
			default:
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-slate-500">
						<path d="M18 6L6 18"></path>
						<path d="M6 6l12 12"></path>
					</svg>
				);
		}
	};

	// Get background color based on type
	const getBackgroundColor = () => {
		switch (type) {
			case TOAST_TYPES.SUCCESS:
				return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30";
			case TOAST_TYPES.ERROR:
				return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30";
			case TOAST_TYPES.WARNING:
				return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/30";
			case TOAST_TYPES.INFO:
				return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30";
			default:
				return "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700";
		}
	};

	return (
		<div
			className={`transform transition-all duration-300 ease-in-out ${
				isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
			}`}>
			<div
				className={`flex items-start gap-3 rounded-lg border p-4 shadow-md ${getBackgroundColor()}`}>
				<div className="flex-shrink-0">{getIcon()}</div>
				<div className="flex-1">
					{title && (
						<h4 className="text-sm font-medium text-slate-900 dark:text-white">
							{title}
						</h4>
					)}
					{description && (
						<p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
							{description}
						</p>
					)}
				</div>
				<button
					onClick={handleDismiss}
					className="flex-shrink-0 rounded-md p-1 text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round">
						<path d="M18 6L6 18"></path>
						<path d="M6 6l12 12"></path>
					</svg>
				</button>
			</div>
		</div>
	);
};

// Toast provider
export const ToastProvider = ({ children }) => {
	const [toasts, setToasts] = useState([]);

	// Add toast
	const toast = ({
		type = TOAST_TYPES.DEFAULT,
		title,
		description,
		duration,
	}) => {
		const id = Date.now().toString();
		setToasts((prevToasts) => [
			...prevToasts,
			{ id, type, title, description, duration },
		]);
		return id;
	};

	// Dismiss toast
	const dismiss = (id) => {
		setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
	};

	return (
		<ToastContext.Provider value={{ toasts, toast, dismiss }}>
			{children}
			<div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full max-w-sm">
				{toasts.map((toast) => (
					<Toast key={toast.id} {...toast} onDismiss={dismiss} />
				))}
			</div>
		</ToastContext.Provider>
	);
};

// Hook to use toast
export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}

	return {
		toast: (props) => {
			if (typeof props === "string") {
				return context.toast({ description: props });
			}
			return context.toast(props);
		},
		dismiss: context.dismiss,
	};
};

export default useToast;
