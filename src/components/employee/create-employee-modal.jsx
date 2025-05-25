"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ErrorHighlight } from "../ui/form-error";
import {
	X,
	UserPlus,
	User,
	Mail,
	Briefcase,
	Lock,
	Eye,
	EyeOff,
	Check,
	AlertCircle,
	ShieldCheck,
} from "lucide-react";

export default function CreateEmployeeModal({
	isOpen,
	onClose,
	onCreateEmployee,
}) {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		position: "",
		role: "staff",
	});

	const [errors, setErrors] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		position: "",
	});

	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState(0);
	const [passwordFeedback, setPasswordFeedback] = useState({
		hasMinLength: false,
		hasUppercase: false,
		hasLowercase: false,
		hasNumber: false,
		hasSpecialChar: false,
	});

	// Calculate password strength
	useEffect(() => {
		// Check password requirements
		const hasMinLength = formData.password.length >= 8;
		const hasUppercase = /[A-Z]/.test(formData.password);
		const hasLowercase = /[a-z]/.test(formData.password);
		const hasNumber = /[0-9]/.test(formData.password);
		const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
			formData.password
		);

		setPasswordFeedback({
			hasMinLength,
			hasUppercase,
			hasLowercase,
			hasNumber,
			hasSpecialChar,
		});

		// Calculate strength percentage
		const requirements = [
			hasMinLength,
			hasUppercase,
			hasLowercase,
			hasNumber,
			hasSpecialChar,
		];
		const metRequirements = requirements.filter(Boolean).length;
		setPasswordStrength((metRequirements / requirements.length) * 100);
	}, [formData.password]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear errors when user types
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}

		// Clear confirm password error if passwords match
		if (name === "password" || name === "confirmPassword") {
			if (
				name === "password" &&
				formData.confirmPassword &&
				value !== formData.confirmPassword
			) {
				setErrors((prev) => ({
					...prev,
					confirmPassword: "Passwords don't match",
				}));
			} else if (name === "confirmPassword" && value !== formData.password) {
				setErrors((prev) => ({
					...prev,
					confirmPassword: "Passwords don't match",
				}));
			} else if (name === "confirmPassword" && value === formData.password) {
				setErrors((prev) => ({ ...prev, confirmPassword: "" }));
			}
		}
	};

	const validateForm = () => {
		const newErrors = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			position: "",
		};
		let isValid = true;

		// Validate first name
		if (!formData.firstName.trim()) {
			newErrors.firstName = "First name is required";
			isValid = false;
		}

		// Validate last name
		if (!formData.lastName.trim()) {
			newErrors.lastName = "Last name is required";
			isValid = false;
		}

		// Validate email
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
			isValid = false;
		}

		// Validate password
		if (!formData.password.trim()) {
			newErrors.password = "Password is required";
			isValid = false;
		} else if (formData.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters";
			isValid = false;
		} else if (passwordStrength < 40) {
			newErrors.password = "Password is too weak";
			isValid = false;
		}

		// Validate confirm password
		if (!formData.confirmPassword.trim()) {
			newErrors.confirmPassword = "Please confirm your password";
			isValid = false;
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords don't match";
			isValid = false;
		}

		// Validate position
		// if (!formData.position.trim()) {
		// 	newErrors.position = "Position is required";
		// 	isValid = false;
		// }

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);

		try {
			// Simulate API call
			setTimeout(() => {
				// Create employee object without confirmPassword
				const { confirmPassword, ...employeeData } = formData;

				// Call the onCreateEmployee function passed from parent
				onCreateEmployee(employeeData);

				// Reset form
				setFormData({
					firstName: "",
					lastName: "",
					email: "",
					password: "",
					confirmPassword: "",
					position: "",
					role: "staff",
				});

				setIsLoading(false);
				onClose();
			}, 1500);
		} catch (error) {
			console.error("Error creating employee:", error);
			setIsLoading(false);
		}
	};

	// Get strength color
	const getStrengthColor = () => {
		if (passwordStrength < 40) return "bg-red-500";
		if (passwordStrength < 70) return "bg-amber-500";
		return "bg-green-500";
	};

	// Get strength text
	const getStrengthText = () => {
		if (passwordStrength < 40) return "Weak";
		if (passwordStrength < 70) return "Medium";
		return "Strong";
	};

	// Get role color and icon
	const getRoleInfo = (role) => {
		switch (role) {
			case "admin":
				return {
					bgColor: "bg-purple-100 dark:bg-purple-900/30",
					textColor: "text-purple-600 dark:text-purple-400",
					icon: (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-purple-600 dark:text-purple-400">
							<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
							<circle cx="9" cy="7" r="4"></circle>
							<path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
							<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
						</svg>
					),
					description: "Full system access",
				};
			case "coadmin":
				return {
					bgColor: "bg-blue-100 dark:bg-blue-900/30",
					textColor: "text-blue-600 dark:text-blue-400",
					icon: (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-blue-600 dark:text-blue-400">
							<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
							<circle cx="9" cy="7" r="4"></circle>
							<path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
							<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
						</svg>
					),
					description: "Can manage employees",
				};
			case "management":
				return {
					bgColor: "bg-green-100 dark:bg-green-900/30",
					textColor: "text-green-600 dark:text-green-400",
					icon: (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-green-600 dark:text-green-400">
							<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
							<circle cx="9" cy="7" r="4"></circle>
							<path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
							<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
						</svg>
					),
					description: "Management level access",
				};
			case "accounting":
				return {
					bgColor: "bg-amber-100 dark:bg-amber-900/30",
					textColor: "text-amber-600 dark:text-amber-400",
					icon: (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-amber-600 dark:text-amber-400">
							<path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-7h-2c0-1-1.5-1.5-1.5-1.5"></path>
							<path d="M2 9v1c0 1.1.9 2 2 2h1"></path>
							<path d="M16 11h0"></path>
						</svg>
					),
					description: "Financial system access",
				};
			case "staff":
			default:
				return {
					bgColor: "bg-slate-100 dark:bg-slate-700/30",
					textColor: "text-slate-600 dark:text-slate-400",
					icon: (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-slate-600 dark:text-slate-400">
							<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
							<circle cx="12" cy="7" r="4"></circle>
						</svg>
					),
					description: "Standard employee permissions",
				};
		}
	};

	// Animation variants
	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { duration: 0.3 } },
		exit: { opacity: 0, transition: { duration: 0.2 } },
	};

	const modalVariants = {
		hidden: { opacity: 0, y: 20, scale: 0.95 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: { type: "spring", stiffness: 300, damping: 30 },
		},
		exit: {
			opacity: 0,
			y: 20,
			scale: 0.95,
			transition: { duration: 0.2 },
		},
	};

	const formItemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.05,
				type: "spring",
				stiffness: 300,
				damping: 24,
			},
		}),
	};

	if (!isOpen) return null;

	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={overlayVariants}
				onClick={onClose}>
				<motion.div
					className="w-full max-w-xl bg-white dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 bg-gradient-to-b from-slate-50 to-white rounded-2xl shadow-2xl overflow-hidden relative"
					variants={modalVariants}
					onClick={(e) => e.stopPropagation()}>
					{/* Decorative elements */}
					<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
						<div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl opacity-50"></div>
						<div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl opacity-50"></div>
					</div>

					{/* Top accent */}
					<div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/50"></div>

					{/* Header */}
					<div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
								<UserPlus className="h-5 w-5 text-primary" />
							</div>
							<h2 className="text-xl font-semibold text-slate-900 dark:text-white">
								Create New Employee
							</h2>
						</div>
						<Button
							variant="ghost"
							size="icon"
							onClick={onClose}
							className="h-8 w-8 rounded-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white">
							<X className="h-5 w-5" />
						</Button>
					</div>

					{/* Form */}
					<form
						onSubmit={handleSubmit}
						className="p-6 max-h-[70vh] overflow-y-auto">
						<div className="grid md:grid-cols-2 gap-6">
							{/* First Name */}
							<motion.div
								custom={0}
								variants={formItemVariants}
								initial="hidden"
								animate="visible"
								className="space-y-2">
								<Label
									htmlFor="firstName"
									className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
									<User className="h-4 w-4 text-primary/70" />
									First Name*
								</Label>
								<ErrorHighlight
									isError={!!errors.firstName}
									errorMessage={errors.firstName}>
									<Input
										id="firstName"
										name="firstName"
										value={formData.firstName}
										onChange={handleChange}
										className={`h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white ${
											errors.firstName
												? "border-2 border-red-500 dark:border-red-500/70"
												: ""
										}`}
									/>
								</ErrorHighlight>
							</motion.div>

							{/* Last Name */}
							<motion.div
								custom={1}
								variants={formItemVariants}
								initial="hidden"
								animate="visible"
								className="space-y-2">
								<Label
									htmlFor="lastName"
									className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
									<User className="h-4 w-4 text-primary/70" />
									Last Name*
								</Label>
								<ErrorHighlight
									isError={!!errors.lastName}
									errorMessage={errors.lastName}>
									<Input
										id="lastName"
										name="lastName"
										value={formData.lastName}
										onChange={handleChange}
										className={`h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white ${
											errors.lastName
												? "border-2 border-red-500 dark:border-red-500/70"
												: ""
										}`}
									/>
								</ErrorHighlight>
							</motion.div>

							{/* Email */}
							<motion.div
								custom={2}
								variants={formItemVariants}
								initial="hidden"
								animate="visible"
								className="space-y-2 md:col-span-2">
								<Label
									htmlFor="email"
									className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
									<Mail className="h-4 w-4 text-primary/70" />
									Email Address*
								</Label>
								<ErrorHighlight
									isError={!!errors.email}
									errorMessage={errors.email}>
									<Input
										id="email"
										name="email"
										type="email"
										value={formData.email}
										onChange={handleChange}
										className={`h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white ${
											errors.email
												? "border-2 border-red-500 dark:border-red-500/70"
												: ""
										}`}
									/>
								</ErrorHighlight>
							</motion.div>

							{/* Password */}
							<motion.div
								custom={3}
								variants={formItemVariants}
								initial="hidden"
								animate="visible"
								className="space-y-2 md:col-span-2">
								<Label
									htmlFor="password"
									className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
									<Lock className="h-4 w-4 text-primary/70" />
									Password*
								</Label>
								<div className="flex flex-row w-full items-top gap-2">
									<ErrorHighlight
										isError={!!errors.password}
										errorMessage={errors.password}
										className="flex-grow w-full">
										<div className="relative">
											<Input
												id="password"
												name="password"
												type={showPassword ? "text" : "password"}
												value={formData.password}
												onChange={handleChange}
												className={`h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white ${
													errors.password
														? "border-2 border-red-500 dark:border-red-500/70"
														: ""
												}`}
											/>
										</div>
									</ErrorHighlight>
									<button
										type="button"
										className="text-black bg-primary/10 dark:text-white dark:bg-primary/10 p-2.5 rounded hover:opacity-90 transition-colors h-11 w-11 flex items-center justify-center"
										onClick={() => setShowPassword(!showPassword)}>
										{showPassword ? (
											<EyeOff className="h-5 w-5" />
										) : (
											<Eye className="h-5 w-5" />
										)}
									</button>
								</div>
							</motion.div>

							{/* Password strength meter */}
							<motion.div
								custom={5}
								variants={formItemVariants}
								initial="hidden"
								animate="visible"
								className="md:col-span-2 space-y-2">
								<div className="flex items-center justify-between mb-2">
									<span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
										<ShieldCheck
											className={`h-4 w-4 ${
												passwordStrength >= 70
													? "text-green-500"
													: "text-slate-400"
											}`}
										/>
										Password Strength
									</span>
									<span
										className={`text-sm font-medium ${
											passwordStrength < 40
												? "text-red-500"
												: passwordStrength < 70
												? "text-amber-500"
												: "text-green-500"
										}`}>
										{getStrengthText()}
									</span>
								</div>
								<div className="relative h-2 w-full bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
									<motion.div
										className={`absolute top-0 left-0 h-full rounded-full ${getStrengthColor()}`}
										initial={{ width: 0 }}
										animate={{ width: `${passwordStrength}%` }}
										transition={{
											duration: 0.5,
											ease: "easeOut",
										}}></motion.div>
								</div>
							</motion.div>

							{/* Password requirements */}
							<motion.div
								custom={6}
								variants={formItemVariants}
								initial="hidden"
								animate="visible"
								className="md:col-span-2 grid grid-cols-2 gap-x-4 gap-y-2 bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
								<div className="flex items-center gap-1.5">
									<div className="h-4 w-4 rounded-full flex items-center justify-center">
										{passwordFeedback.hasMinLength ? (
											<div className="h-4 w-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
												<Check className="h-2.5 w-2.5 text-green-600 dark:text-green-500" />
											</div>
										) : (
											<div className="h-4 w-4 rounded-full border border-slate-300 dark:border-slate-600" />
										)}
									</div>
									<span className="text-xs text-slate-600 dark:text-slate-400">
										8+ characters
									</span>
								</div>

								<div className="flex items-center gap-1.5">
									<div className="h-4 w-4 rounded-full flex items-center justify-center">
										{passwordFeedback.hasUppercase ? (
											<div className="h-4 w-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
												<Check className="h-2.5 w-2.5 text-green-600 dark:text-green-500" />
											</div>
										) : (
											<div className="h-4 w-4 rounded-full border border-slate-300 dark:border-slate-600" />
										)}
									</div>
									<span className="text-xs text-slate-600 dark:text-slate-400">
										Uppercase letter
									</span>
								</div>

								<div className="flex items-center gap-1.5">
									<div className="h-4 w-4 rounded-full flex items-center justify-center">
										{passwordFeedback.hasLowercase ? (
											<div className="h-4 w-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
												<Check className="h-2.5 w-2.5 text-green-600 dark:text-green-500" />
											</div>
										) : (
											<div className="h-4 w-4 rounded-full border border-slate-300 dark:border-slate-600" />
										)}
									</div>
									<span className="text-xs text-slate-600 dark:text-slate-400">
										Lowercase letter
									</span>
								</div>

								<div className="flex items-center gap-1.5">
									<div className="h-4 w-4 rounded-full flex items-center justify-center">
										{passwordFeedback.hasNumber ? (
											<div className="h-4 w-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
												<Check className="h-2.5 w-2.5 text-green-600 dark:text-green-500" />
											</div>
										) : (
											<div className="h-4 w-4 rounded-full border border-slate-300 dark:border-slate-600" />
										)}
									</div>
									<span className="text-xs text-slate-600 dark:text-slate-400">
										Number
									</span>
								</div>

								<div className="flex items-center gap-1.5 col-span-2">
									<div className="h-4 w-4 rounded-full flex items-center justify-center">
										{passwordFeedback.hasSpecialChar ? (
											<div className="h-4 w-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
												<Check className="h-2.5 w-2.5 text-green-600 dark:text-green-500" />
											</div>
										) : (
											<div className="h-4 w-4 rounded-full border border-slate-300 dark:border-slate-600" />
										)}
									</div>
									<span className="text-xs text-slate-600 dark:text-slate-400">
										Special character (!@#$%^&*)
									</span>
								</div>
							</motion.div>

							{/* Confirm Password */}
							<motion.div
								custom={4}
								variants={formItemVariants}
								initial="hidden"
								animate="visible"
								className="space-y-2 md:col-span-2">
								<Label
									htmlFor="confirmPassword"
									className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
									<Lock className="h-4 w-4 text-primary/70" />
									Confirm Password*
								</Label>
								<div className="flex flex-row w-full items-top gap-2">
									<ErrorHighlight
										isError={!!errors.confirmPassword}
										errorMessage={errors.confirmPassword}
										className="flex-grow w-full">
										<div className="relative">
											<Input
												id="confirmPassword"
												name="confirmPassword"
												type={showConfirmPassword ? "text" : "password"}
												value={formData.confirmPassword}
												onChange={handleChange}
												className={`h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white ${
													errors.confirmPassword
														? "border-2 border-red-500 dark:border-red-500/70"
														: ""
												}`}
											/>
										</div>
									</ErrorHighlight>
									<button
										type="button"
										className="text-black bg-primary/10 dark:text-white dark:bg-primary/10 p-2.5 rounded hover:opacity-90 transition-colors h-11 w-11 flex items-center justify-center"
										onClick={() =>
											setShowConfirmPassword(!showConfirmPassword)
										}>
										{showConfirmPassword ? (
											<EyeOff className="h-5 w-5" />
										) : (
											<Eye className="h-5 w-5" />
										)}
									</button>
								</div>
							</motion.div>

							{/* Position */}
							<motion.div
								custom={7}
								variants={formItemVariants}
								initial="hidden"
								animate="visible"
								className="space-y-2 md:col-span-2">
								<Label
									htmlFor="position"
									className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
									<Briefcase className="h-4 w-4 text-primary/70" />
									Position
								</Label>
								<ErrorHighlight
									isError={!!errors.position}
									errorMessage={errors.position}>
									<Input
										id="position"
										name="position"
										value={formData.position}
										onChange={handleChange}
										className={`h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white ${
											errors.position
												? "border-2 border-red-500 dark:border-red-500/70"
												: ""
										}`}
										placeholder=""
									/>
								</ErrorHighlight>
							</motion.div>

							{/* Role Selection */}
							<motion.div
								custom={8}
								variants={formItemVariants}
								initial="hidden"
								animate="visible"
								className="space-y-3 md:col-span-2">
								<Label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
									<UserPlus className="h-4 w-4 text-primary/70" />
									Employee Role*
								</Label>
								<RadioGroup
									defaultValue="staff"
									value={formData.role}
									onValueChange={(value) =>
										setFormData((prev) => ({ ...prev, role: value }))
									}
									className="grid grid-cols-2 gap-3 w-full">
									{["coadmin", "management", "accounting", "staff"].map(
										(role) => {
											const roleInfo = getRoleInfo(role);
											return (
												<div
													key={role}
													className={`flex items-center space-x-2 bg-white dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700/50 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30 ${
														formData.role === role
															? "ring-2 ring-primary/50"
															: ""
													}`}>
													<RadioGroupItem
														value={role}
														id={`role-${role}`}
														className="text-primary border-slate-300 dark:border-slate-600"
													/>
													<Label
														htmlFor={`role-${role}`}
														className="flex items-center gap-2 cursor-pointer">
														<div
															className={`h-6 w-6 rounded-full ${roleInfo.bgColor} flex items-center justify-center`}>
															{roleInfo.icon}
														</div>
														<div>
															<p className="text-sm font-medium text-slate-900 dark:text-white capitalize">
																{role}
															</p>
															<p className="text-xs text-slate-500 dark:text-slate-400">
																{roleInfo.description}
															</p>
														</div>
													</Label>
												</div>
											);
										}
									)}
								</RadioGroup>
							</motion.div>
						</div>

						<div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50">
							<motion.p
								custom={10}
								variants={formItemVariants}
								initial="hidden"
								animate="visible"
								className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
								<AlertCircle className="h-3 w-3 text-primary/70" />
								Required fields are marked with *
							</motion.p>

							<motion.div
								custom={11}
								variants={formItemVariants}
								initial="hidden"
								animate="visible"
								className="flex gap-3">
								<Button
									type="button"
									variant="outline"
									onClick={onClose}
									className="border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white">
									Cancel
								</Button>
								<Button
									type="submit"
									className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
									disabled={isLoading}>
									{isLoading ? (
										<div className="flex items-center gap-2">
											<div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
											<span>Creating...</span>
										</div>
									) : (
										<div className="flex items-center gap-2">
											<span>Create Employee</span>
											<UserPlus className="h-4 w-4" />
										</div>
									)}
								</Button>
							</motion.div>
						</div>
					</form>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
