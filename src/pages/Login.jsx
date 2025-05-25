import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Logo } from "../components/logo";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import {
	ErrorMessage,
	ToastErrorMessage,
} from "../components/ui/error-message";
import { ErrorHighlight } from "../components/ui/form-error";

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("admin@example.com");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [fieldErrors, setFieldErrors] = useState({
		email: "",
		password: "",
	});
	const [showToast, setShowToast] = useState(false);
	const [isChangePasswordModalOpen, setChangePasswordModalOpen] =
		useState(false);

	const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMsg("");
		setFieldErrors({ email: "", password: "" });

		// Field validation
		let hasErrors = false;
		const errors = { email: "", password: "" };

		if (!email) {
			errors.email = "Email is required";
			hasErrors = true;
		} else if (!validateEmail(email)) {
			errors.email = "Please enter a valid email address";
			hasErrors = true;
		}

		if (!password) {
			errors.password = "Password is required";
			hasErrors = true;
		} else if (password.length < 6) {
			errors.password = "Password must be at least 6 characters";
			hasErrors = true;
		}

		if (hasErrors) {
			setFieldErrors(errors);
			return;
		}

		setIsLoading(true);
		try {
			const res = await fetch("https://crm-backend-production-0336.up.railway.app/api/auth/signin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: true,
				body: JSON.stringify({ email, password, rememberMe }),
			});

			const body = await res.json();

			if (!res.ok) {
				// backend sent { message: 'Something broke' }
				return setErrorMsg(body.message || "Login failed");
			}

			// success path
			dispatch(signInSuccess(body));

			if (!body.passwordChanged) {
				setChangePasswordModalOpen(true);
			}

			navigate("/");
		} catch (err) {
			setErrorMsg(err.message);
			setShowToast(true);
		} finally {
			setIsLoading(false);
		}
	};

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
	};
	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: "spring", stiffness: 300, damping: 24 },
		},
	};
	const circleVariants = {
		hidden: { scale: 0 },
		visible: {
			scale: 1,
			transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.2 },
		},
	};

	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
			{/* Background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-3xl"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.5 }}
				/>
				<motion.div
					className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-primary/10 blur-3xl"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.5, delay: 0.3 }}
				/>
			</div>

			{/* Toast notification */}
			{/* <ToastErrorMessage
				message={showToast ? errorMsg : ""}
				onDismiss={() => setShowToast(false)}
				position="top-right"
			/> */}

			{/* Main content */}
			<motion.div
				className="w-full max-w-md z-10"
				variants={containerVariants}
				initial="hidden"
				animate="visible">
				<motion.div
					className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden relative"
					variants={itemVariants}>
					{/* Top accent */}
					<div className="h-2 bg-gradient-to-r from-primary to-primary/70"></div>

					{/* Logo section */}
					<div className="relative h-32 flex items-center justify-center">
						<motion.div
							className="absolute w-20 h-20 rounded-full bg-primary/10 left-[4%]"
							variants={circleVariants}
						/>
						<motion.div variants={itemVariants}>
							<Logo size="large" className="relative z-10" />
						</motion.div>
					</div>

					<div className="px-8 pb-8">
						<motion.div variants={itemVariants} className="text-center mb-6">
							<h1 className="text-2xl font-bold text-slate-900 dark:text-white">
								Welcome back
							</h1>
							<p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
								Sign in to your account
							</p>
						</motion.div>

						<form onSubmit={handleSubmit}>
							<motion.div variants={itemVariants} className="space-y-4">
								{/* Email field */}
								<div className="space-y-2">
									<Label
										htmlFor="email"
										className="text-sm font-medium text-slate-700 dark:text-slate-300">
										Email
									</Label>
									<ErrorHighlight
										isError={!!fieldErrors.email}
										errorMessage={fieldErrors.email}>
										<div className="relative">
											<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
											<Input
												id="email"
												type="email"
												value={email}
												onChange={(e) => {
													setEmail(e.target.value);
													if (fieldErrors.email)
														setFieldErrors({ ...fieldErrors, email: "" });
												}}
												placeholder="name@example.com"
												className={`pl-10 h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-primary ${
													fieldErrors.email
														? " border-2 border-red-500 dark:border-red-500/70"
														: ""
												}`}
											/>
										</div>
									</ErrorHighlight>
								</div>

								{/* Password field */}
								<div className="space-y-1">
									<div className="flex items-center justify-between">
										<Label
											htmlFor="password"
											className="text-sm font-medium text-slate-700 dark:text-slate-300">
											Password
										</Label>
										<span
											to="/forgot-password"
											className="text-xs text-primary hover:text-primary/80 transition-colors">
											Forgot password?
										</span>
									</div>
									<div className="flex flex-row w-full items-top gap-2">
										<ErrorHighlight
											isError={!!fieldErrors.password}
											errorMessage={fieldErrors.password}
											className="flex-grow w-full">
											<div className="relative">
												<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
												<Input
													id="password"
													type={showPassword ? "text" : "password"}
													value={password}
													onChange={(e) => {
														setPassword(e.target.value);
														if (fieldErrors.password)
															setFieldErrors({ ...fieldErrors, password: "" });
													}}
													placeholder="••••••••"
													className={`pl-10 pr-10 h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-primary ${
														fieldErrors.password
															? "border-red-500 dark:border-red-500/70"
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
								</div>

								{/* Remember me checkbox */}
								<div className="flex items-center space-x-2">
									<Checkbox
										id="remember"
										checked={rememberMe}
										onCheckedChange={(checked) => setRememberMe(checked)}
										className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
									/>
									<Label
										htmlFor="remember"
										className="text-sm text-slate-600 dark:text-slate-400">
										Remember me
									</Label>
								</div>
							</motion.div>

							{/* Submit button */}
							<motion.div variants={itemVariants} className="mt-6">
								<Button
									type="submit"
									className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-xl flex items-center justify-center gap-2 h-12 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
									disabled={isLoading}>
									{isLoading ? (
										<div className="flex items-center gap-2">
											<div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
											<span>Signing in...</span>
										</div>
									) : (
										<div className="flex items-center gap-2">
											<span>Sign in</span>
											<ArrowRight className="h-4 w-4" />
										</div>
									)}
								</Button>
							</motion.div>
						</form>

						{/* General error message */}
						{errorMsg && (
							<ErrorMessage
								message={errorMsg}
								className="mt-4"
								onDismiss={() => setErrorMsg("")}
							/>
						)}

						{/* <motion.div variants={itemVariants} className="mt-8 text-center">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
								</div>
								<div className="relative flex justify-center">
									<span className="bg-white dark:bg-slate-800 px-4 text-xs text-slate-500 dark:text-slate-400">
										Don't have an account?
									</span>
								</div>
							</div>

							<Link
								to="/signup"
								className="mt-4 inline-block text-sm text-primary font-medium hover:underline">
								Create an account
							</Link>
						</motion.div> */}
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
}
