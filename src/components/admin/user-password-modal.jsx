import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ErrorHighlight } from "../ui/form-error";
import {
	X,
	Save,
	Check,
	Lock,
	Eye,
	EyeOff,
	ShieldCheck,
	ShieldAlert,
	Info,
	Mail,
	UserCog,
} from "lucide-react";

export default function ChangeUserPasswordModal({
	isOpen,
	onClose,
	user,
	onPasswordChange,
}) {
	const [formData, setFormData] = useState({
		newPassword: "",
		confirmPassword: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState(0);
	const [passwordFeedback, setPasswordFeedback] = useState({
		hasMinLength: false,
		hasUppercase: false,
		hasLowercase: false,
		hasNumber: false,
		hasSpecialChar: false,
	});
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errors, setErrors] = useState({
		newPassword: "",
		confirmPassword: "",
	});

	// Calculate password strength
	useEffect(() => {
		// Check password requirements
		const hasMinLength = formData.newPassword.length >= 8;
		const hasUppercase = /[A-Z]/.test(formData.newPassword);
		const hasLowercase = /[a-z]/.test(formData.newPassword);
		const hasNumber = /[0-9]/.test(formData.newPassword);
		const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
			formData.newPassword
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
	}, [formData.newPassword]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear errors when user types
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}

		// Clear confirm password error if passwords match
		if (name === "newPassword" || name === "confirmPassword") {
			if (
				name === "newPassword" &&
				formData.confirmPassword &&
				value !== formData.confirmPassword
			) {
				setErrors((prev) => ({
					...prev,
					confirmPassword: "Passwords don't match",
				}));
			} else if (name === "confirmPassword" && value !== formData.newPassword) {
				setErrors((prev) => ({
					...prev,
					confirmPassword: "Passwords don't match",
				}));
			} else if (name === "confirmPassword" && value === formData.newPassword) {
				setErrors((prev) => ({ ...prev, confirmPassword: "" }));
			}
		}
	};

	const validateForm = () => {
		const newErrors = {
			newPassword: "",
			confirmPassword: "",
		};
		let isValid = true;

		// Validate new password
		if (!formData.newPassword.trim()) {
			newErrors.newPassword = "New password is required";
			isValid = false;
		} else if (formData.newPassword.length < 8) {
			newErrors.newPassword = "Password must be at least 8 characters";
			isValid = false;
		} else if (passwordStrength < 40) {
			newErrors.newPassword = "Password is too weak";
			isValid = false;
		}

		// Validate confirm password
		if (!formData.confirmPassword.trim()) {
			newErrors.confirmPassword = "Please confirm the password";
			isValid = false;
		} else if (formData.newPassword !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords don't match";
			isValid = false;
		}

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
				// Call the onPasswordChange function passed from parent
				if (onPasswordChange) {
					onPasswordChange(user.id, formData.newPassword);
				}

				// Reset form
				setFormData({
					newPassword: "",
					confirmPassword: "",
				});

				setShowSuccessMessage(true);

				// Close after showing success message
				setTimeout(() => {
					setShowSuccessMessage(false);
					onClose();
				}, 2000);
			}, 1500);
		} catch (error) {
			console.error("Error changing password:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleClose = () => {
		setFormData({
			newPassword: "",
			confirmPassword: "",
		});
		setErrors({
			newPassword: "",
			confirmPassword: "",
		});
		setShowSuccessMessage(false);
		onClose();
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

	// Get role badge color
	const getRoleBadgeColor = () => {
		if (!user) return "";

		switch (user.role) {
			case "Admin":
				return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
			case "Co Admin":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
			default:
				return "bg-slate-100 text-slate-800 dark:bg-slate-700/30 dark:text-slate-400";
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

	const successVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { type: "spring", stiffness: 300, damping: 20 },
		},
		exit: {
			opacity: 0,
			scale: 0.8,
			transition: { duration: 0.2 },
		},
	};

	if (!isOpen || !user) return null;

	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={overlayVariants}
				onClick={handleClose}>
				{showSuccessMessage ? (
					<motion.div
						className="bg-white dark:bg-slate-800 rounded-2xl p-8 flex flex-col items-center max-w-md mx-auto shadow-2xl border border-slate-200 dark:border-slate-700/50"
						variants={successVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={(e) => e.stopPropagation()}>
						<div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center mb-6">
							<Check className="h-10 w-10 text-green-600 dark:text-green-500" />
						</div>
						<h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
							Password Updated!
						</h2>
						<p className="text-slate-600 dark:text-slate-400 text-center mb-6">
							The user's password has been successfully changed.
						</p>
						<Button
							onClick={handleClose}
							className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white">
							Close
						</Button>
					</motion.div>
				) : (
					<motion.div
						className="w-full max-w-xl bg-white dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 bg-gradient-to-b from-slate-50 to-white rounded-2xl shadow-2xl overflow-hidden relative"
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={(e) => e.stopPropagation()}>
						{/* Decorative elements */}
						<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
							<div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl opacity-50"></div>
							<div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl opacity-50"></div>
						</div>

						{/* Top accent */}
						<div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/50"></div>

						{/* Header */}
						<div className="relative flex items-center justify-between px-8 py-6 border-b border-slate-200 dark:border-slate-700">
							<div className="flex flex-col">
								<h2 className="text-2xl font-bold text-slate-900 dark:text-white">
									Change User Password
								</h2>
								<p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
									Update password for this user account
								</p>
							</div>
							<Button
								variant="ghost"
								size="icon"
								onClick={handleClose}
								className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-full h-10 w-10 absolute">
								<X className="h-5 w-5" />
							</Button>
						</div>

						{/* User Info */}
						<div className="px-8 py-6 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700/50">
							<div className="flex items-center gap-4">
								<Avatar className="h-16 w-16 border-2 border-white dark:border-slate-700 shadow-md">
									<AvatarImage
										src={user.avatar || "/placeholder.svg?height=64&width=64"}
										alt={user.name}
									/>
									<AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xl font-semibold">
										{user.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<div className="space-y-1">
									<h3 className="pl-1 text-lg font-semibold text-slate-900 dark:text-white">
										{user.name}
									</h3>
									<div className="flex items-end gap-2 text-sm text-slate-600 dark:text-slate-300">
										<Mail className="h-4 w-4 text-primary/70" />
										<span>{user.email}</span>
									</div>
									<div className="flex pt-1 items-center gap-2">
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor()}`}>
											<UserCog className="h-3 w-3 mr-1" />
											{user.role}
										</span>
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
												user.status === "active"
													? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
													: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
											}`}>
											{user.status === "active" ? "Active" : "Inactive"}
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Form */}
						<form
							onSubmit={handleSubmit}
							className="p-8 max-h-[50vh] overflow-y-auto">
							<div className="space-y-6">
								{/* New Password */}
								<motion.div
									custom={1}
									variants={formItemVariants}
									initial="hidden"
									animate="visible"
									className="space-y-2">
									<Label
										htmlFor="newPassword"
										className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
										<Lock className="h-4 w-4 text-primary/70" />
										New Password*
									</Label>
									<div className="flex flex-row w-full items-top gap-2">
										<ErrorHighlight
											isError={!!errors.newPassword}
											errorMessage={errors.newPassword}
											className="flex-grow w-full">
											<div className="relative">
												<Input
													id="newPassword"
													name="newPassword"
													type={showNewPassword ? "text" : "password"}
													value={formData.newPassword}
													onChange={handleChange}
													className={`h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white ${
														errors.newPassword
															? "border-2 border-red-500 dark:border-red-500/70"
															: ""
													}`}
												/>
											</div>
										</ErrorHighlight>
										<button
											type="button"
											className="text-black bg-primary/10 dark:text-white dark:bg-primary/10 p-2.5 rounded hover:opacity-90 transition-colors h-11 w-11 flex items-center justify-center"
											onClick={() => setShowNewPassword(!showNewPassword)}>
											{showNewPassword ? (
												<EyeOff className="h-5 w-5" />
											) : (
												<Eye className="h-5 w-5" />
											)}
										</button>
									</div>
								</motion.div>

								{/* Password strength meter */}
								<div>
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
								</div>

								{/* Password requirements */}
								<motion.div
									custom={2}
									variants={formItemVariants}
									initial="hidden"
									animate="visible"
									className="grid grid-cols-2 gap-x-4 gap-y-2 bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
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
									custom={3}
									variants={formItemVariants}
									initial="hidden"
									animate="visible"
									className="space-y-2">
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

								{/* Security Note */}
								<motion.div
									custom={4}
									variants={formItemVariants}
									initial="hidden"
									animate="visible"
									className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30 text-blue-800 dark:text-blue-300">
									<Info className="h-5 w-5 flex-shrink-0 mt-0.5 text-blue-500 dark:text-blue-400" />
									<div className="text-xs">
										<p className="font-medium">Admin Action</p>
										<p className="mt-1">
											You are changing the password for {user.name}. The user
											will need to use this new password for their next login.
										</p>
									</div>
								</motion.div>
							</div>

							<div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50">
								<motion.p
									custom={5}
									variants={formItemVariants}
									initial="hidden"
									animate="visible"
									className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
									<ShieldAlert className="h-3 w-3 text-primary/70" />
									Password will be securely encrypted
								</motion.p>

								<motion.div
									custom={6}
									variants={formItemVariants}
									initial="hidden"
									animate="visible"
									className="flex gap-3">
									<Button
										type="button"
										variant="outline"
										onClick={handleClose}
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
												<span>Updating...</span>
											</div>
										) : (
											<div className="flex items-center gap-2">
												<span>Update Password</span>
												<Save className="h-4 w-4" />
											</div>
										)}
									</Button>
								</motion.div>
							</div>
						</form>
					</motion.div>
				)}
			</motion.div>
		</AnimatePresence>
	);
}
