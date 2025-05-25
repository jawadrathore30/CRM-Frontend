import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { cn } from "../../lib/utils";

const icons = {
	error: AlertCircle,
	warning: AlertTriangle,
	info: Info,
	success: CheckCircle,
};

const variants = {
	initial: { opacity: 0, y: -10, scale: 0.95 },
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 400,
			damping: 25,
		},
	},
	exit: {
		opacity: 0,
		y: -10,
		scale: 0.95,
		transition: {
			duration: 0.2,
		},
	},
};

export function ErrorMessage({
	message,
	variant = "error",
	className,
	onDismiss,
	autoDismiss = false,
	dismissTimeout = 5000,
	showIcon = true,
	showDismiss = true,
	animate = true,
}) {
	const [isVisible, setIsVisible] = useState(true);

	const Icon = icons[variant];

	useEffect(() => {
		if (autoDismiss && message) {
			const timer = setTimeout(() => {
				setIsVisible(false);
				if (onDismiss) onDismiss();
			}, dismissTimeout);

			return () => clearTimeout(timer);
		}
	}, [message, autoDismiss, dismissTimeout, onDismiss]);

	if (!message) return null;

	const handleDismiss = () => {
		setIsVisible(false);
		if (onDismiss) onDismiss();
	};

	const variantStyles = {
		error:
			"bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50",
		warning:
			"bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50",
		info: "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/50",
		success:
			"bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50",
	};

	const iconColors = {
		error: "text-red-500 dark:text-red-400",
		warning: "text-amber-500 dark:text-amber-400",
		info: "text-blue-500 dark:text-blue-400",
		success: "text-green-500 dark:text-green-400",
	};

	const MessageComponent = () => (
		<div
			className={cn(
				"flex items-start gap-3 p-3 rounded-lg border",
				variantStyles[variant],
				className
			)}>
			{showIcon && (
				<div className="flex-shrink-0 mt-0.5">
					<Icon className={cn("h-5 w-5", iconColors[variant])} />
				</div>
			)}

			<div className="flex-1 text-sm">{message}</div>

			{showDismiss && (
				<button
					onClick={handleDismiss}
					className={cn(
						"flex-shrink-0 rounded-full p-1 hover:bg-black/5 dark:hover:bg-white/10 transition-colors",
						iconColors[variant]
					)}>
					<X className="h-4 w-4" />
				</button>
			)}
		</div>
	);

	if (!animate) {
		return isVisible ? <MessageComponent /> : null;
	}

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					variants={variants}
					initial="initial"
					animate="animate"
					exit="exit">
					<MessageComponent />
				</motion.div>
			)}
		</AnimatePresence>
	);
}

// Floating variant that appears at the top of the screen
export function FloatingErrorMessage({
	message,
	variant = "error",
	position = "top",
	onDismiss,
	autoDismiss = true,
	dismissTimeout = 5000,
}) {
	const [isVisible, setIsVisible] = useState(!!message);

	useEffect(() => {
		setIsVisible(!!message);
	}, [message]);

	useEffect(() => {
		if (autoDismiss && message) {
			const timer = setTimeout(() => {
				setIsVisible(false);
				if (onDismiss) onDismiss();
			}, dismissTimeout);

			return () => clearTimeout(timer);
		}
	}, [message, autoDismiss, dismissTimeout, onDismiss]);

	if (!message) return null;

	const handleDismiss = () => {
		setIsVisible(false);
		if (onDismiss) onDismiss();
	};

	const positionStyles = {
		top: "top-4 left-1/2 -translate-x-1/2",
		bottom: "bottom-4 left-1/2 -translate-x-1/2",
		"top-left": "top-4 left-4",
		"top-right": "top-4 right-4",
		"bottom-left": "bottom-4 left-4",
		"bottom-right": "bottom-4 right-4",
	};

	const floatingVariants = {
		initial: { opacity: 0, y: position.includes("top") ? -20 : 20 },
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 400,
				damping: 25,
			},
		},
		exit: {
			opacity: 0,
			y: position.includes("top") ? -20 : 20,
			transition: {
				duration: 0.2,
			},
		},
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					className={cn(
						"fixed z-50 max-w-md w-full shadow-lg",
						positionStyles[position]
					)}
					variants={floatingVariants}
					initial="initial"
					animate="animate"
					exit="exit">
					<ErrorMessage
						message={message}
						variant={variant}
						onDismiss={handleDismiss}
						className="border-2 shadow-lg"
						animate={false}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

// Toast-style notification that slides in from the side
export function ToastErrorMessage({
	message,
	variant = "error",
	position = "top-right",
	onDismiss,
	autoDismiss = true,
	dismissTimeout = 5000,
}) {
	const [isVisible, setIsVisible] = useState(!!message);

	useEffect(() => {
		setIsVisible(!!message);
	}, [message]);

	useEffect(() => {
		if (autoDismiss && message) {
			const timer = setTimeout(() => {
				setIsVisible(false);
				if (onDismiss) onDismiss();
			}, dismissTimeout);

			return () => clearTimeout(timer);
		}
	}, [message, autoDismiss, dismissTimeout, onDismiss]);

	if (!message) return null;

	const handleDismiss = () => {
		setIsVisible(false);
		if (onDismiss) onDismiss();
	};

	const positionStyles = {
		"top-right": "top-4 right-4",
		"top-left": "top-4 left-4",
		"bottom-right": "bottom-4 right-4",
		"bottom-left": "bottom-4 left-4",
	};

	const getSlideDirection = () => {
		if (position.includes("right")) return { x: 20 };
		if (position.includes("left")) return { x: -20 };
		if (position.includes("top")) return { y: -20 };
		return { y: 20 };
	};

	const slideDirection = getSlideDirection();

	const toastVariants = {
		initial: { opacity: 0, ...slideDirection },
		animate: {
			opacity: 1,
			x: 0,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 400,
				damping: 25,
			},
		},
		exit: {
			opacity: 0,
			...slideDirection,
			transition: {
				duration: 0.2,
			},
		},
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					className={cn("fixed z-50 max-w-md w-full", positionStyles[position])}
					variants={toastVariants}
					initial="initial"
					animate="animate"
					exit="exit">
					<ErrorMessage
						message={message}
						variant={variant}
						onDismiss={handleDismiss}
						className="border shadow-lg"
						animate={false}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
