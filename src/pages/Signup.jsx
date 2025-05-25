import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Logo } from "../components/logo";
import {
	Mail,
	User,
	Building,
	Lock,
	Eye,
	EyeOff,
	ArrowRight,
	Check,
} from "lucide-react";

export default function Signup() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		companyName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);
	const totalSteps = 2;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (currentStep < totalSteps) {
			setCurrentStep(currentStep + 1);
			return;
		}

		setIsLoading(true);

		// Simulate signup
		setTimeout(() => {
			setIsLoading(false);
			navigate("/login");
		}, 1500);
	};

	const goBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: "spring", stiffness: 300, damping: 24 },
		},
	};

	const stepVariants = {
		hidden: { x: 50, opacity: 0 },
		visible: {
			x: 0,
			opacity: 1,
			transition: { type: "spring", stiffness: 300, damping: 24 },
		},
		exit: {
			x: -50,
			opacity: 0,
			transition: { duration: 0.2 },
		},
	};

	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
			{/* Background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-3xl"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.5 }}
				/>
				<motion.div
					className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-primary/10 blur-3xl"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.5, delay: 0.3 }}
				/>
			</div>

			{/* Main content */}
			<motion.div
				className="w-full max-w-md z-10"
				variants={containerVariants}
				initial="hidden"
				animate="visible">
				{/* Card */}
				<motion.div
					className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden relative"
					variants={itemVariants}>
					{/* Top accent */}
					<div className="h-2 bg-gradient-to-r from-primary to-primary/70"></div>

					{/* Logo and progress */}
					<div className="pt-8 px-8 flex items-center justify-between">
						<Logo />
						<div className="flex items-center gap-1">
							{Array.from({ length: totalSteps }).map((_, index) => (
								<div
									key={index}
									className={`h-2 w-8 rounded-full transition-colors duration-300 ${
										index + 1 <= currentStep
											? "bg-primary"
											: "bg-slate-200 dark:bg-slate-700"
									}`}></div>
							))}
						</div>
					</div>

					{/* Form content */}
					<div className="px-8 py-6">
						<motion.div variants={itemVariants} className="mb-6">
							<h1 className="text-2xl font-bold text-slate-900 dark:text-white">
								{currentStep === 1
									? "Create your account"
									: "Set up your password"}
							</h1>
							<p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
								{currentStep === 1
									? "Enter your details to get started"
									: "Choose a secure password for your account"}
							</p>
						</motion.div>

						<form onSubmit={handleSubmit}>
							{currentStep === 1 && (
								<motion.div
									variants={stepVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label
												htmlFor="firstName"
												className="text-sm font-medium text-slate-700 dark:text-slate-300">
												First Name
											</Label>
											<div className="relative mt-1">
												<User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
												<Input
													id="firstName"
													name="firstName"
													value={formData.firstName}
													onChange={handleChange}
													className="pl-10 h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-primary"
													required
												/>
											</div>
										</div>
										<div className="space-y-2">
											<Label
												htmlFor="lastName"
												className="text-sm font-medium text-slate-700 dark:text-slate-300">
												Last Name
											</Label>
											<Input
												id="lastName"
												name="lastName"
												value={formData.lastName}
												onChange={handleChange}
												className="mt-1 h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-primary"
												required
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label
											htmlFor="companyName"
											className="text-sm font-medium text-slate-700 dark:text-slate-300">
											Company Name
										</Label>
										<div className="mt-1 relative">
											<Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
											<Input
												id="companyName"
												name="companyName"
												value={formData.companyName}
												onChange={handleChange}
												className="pl-10 h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-primary"
											/>
										</div>
									</div>

									<div className="pb-1 space-y-2">
										<Label
											htmlFor="email"
											className="text-sm font-medium text-slate-700 dark:text-slate-300">
											Email
										</Label>
										<div className="mt-1 relative">
											<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
											<Input
												id="email"
												name="email"
												type="email"
												value={formData.email}
												onChange={handleChange}
												placeholder="name@example.com"
												className="pl-10 h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-primary"
												required
											/>
										</div>
									</div>
								</motion.div>
							)}

							{currentStep === 2 && (
								<motion.div
									variants={stepVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="space-y-4">
									<div className="space-y-2 mb-0">
										<Label
											htmlFor="password"
											className="text-sm font-medium text-slate-700 dark:text-slate-300">
											Password
										</Label>
										<div className="mt-1 relative">
											<Lock className="absolute left-3 top-1/3 -translate-y-1/2 h-5 w-5 text-slate-400" />
											<Input
												id="password"
												name="password"
												type={showPassword ? "text" : "password"}
												value={formData.password}
												onChange={handleChange}
												placeholder="••••••••"
												className="pl-10 pr-10 h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-primary"
												required
											/>
											<button
												type="button"
												className="absolute left-88 top-1/3 -translate-y-8.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
												onClick={() => setShowPassword(!showPassword)}>
												{showPassword ? (
													<EyeOff className="h-5 w-5" />
												) : (
													<Eye className="h-5 w-5" />
												)}
											</button>
										</div>
									</div>

									<div className="space-y-2 mb-0">
										<Label
											htmlFor="confirmPassword"
											className="text-sm font-medium text-slate-700 dark:text-slate-300">
											Confirm Password
										</Label>
										<div className="mt-1 relative">
											<Lock className="absolute left-3 top-1/3 -translate-y-1/2 h-5 w-5 text-slate-400" />
											<Input
												id="confirmPassword"
												name="confirmPassword"
												type={showConfirmPassword ? "text" : "password"}
												value={formData.confirmPassword}
												onChange={handleChange}
												placeholder="••••••••"
												className="pl-10 pr-10 h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-primary"
												required
											/>
											<button
												type="button"
												className="absolute left-88 top-1/3 -translate-y-8.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
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
									</div>

									<div className="space-y-2">
										<p className="text-sm font-medium text-slate-700 dark:text-slate-300">
											Password Strength
										</p>
										<div className="bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
											<div
												className="bg-primary h-full rounded-full"
												style={{ width: "70%" }}></div>
										</div>
										<div className="flex gap-2 mt-1">
											<div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
												<Check className="h-3 w-3 text-green-500" />
												<span>Length</span>
											</div>
											<div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
												<Check className="h-3 w-3 text-green-500" />
												<span>Uppercase</span>
											</div>
											<div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
												<Check className="h-3 w-3 text-green-500" />
												<span>Number</span>
											</div>
										</div>
									</div>
								</motion.div>
							)}

							<motion.div variants={itemVariants} className="mt-6 flex gap-3">
								{currentStep > 1 && (
									<Button
										type="button"
										onClick={goBack}
										className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white py-2 rounded-xl flex items-center justify-center gap-2 h-12 transition-all duration-300">
										Back
									</Button>
								)}
								<Button
									type="submit"
									className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 rounded-xl flex items-center justify-center gap-2 h-12 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
									disabled={isLoading}>
									{isLoading ? (
										<div className="flex items-center gap-2">
											<div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
											<span>Creating account...</span>
										</div>
									) : (
										<div className="flex items-center gap-2">
											<span>
												{currentStep < totalSteps
													? "Continue"
													: "Create account"}
											</span>
											<ArrowRight className="h-4 w-4" />
										</div>
									)}
								</Button>
							</motion.div>
						</form>

						<motion.div variants={itemVariants} className="mt-8 text-center">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
								</div>
								<div className="relative flex justify-center">
									<span className="bg-white dark:bg-slate-800 px-4 text-xs text-slate-500 dark:text-slate-400">
										Already have an account?
									</span>
								</div>
							</div>

							<Link
								to="/login"
								className="mt-4 inline-block text-sm text-primary font-medium hover:underline">
								Sign in
							</Link>
						</motion.div>
					</div>
				</motion.div>

				{/* Footer */}
				{/* <motion.p
					variants={itemVariants}
					className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
					© 2025 Grow CRM. All rights reserved.
				</motion.p> */}
			</motion.div>
		</div>
	);
}
