import { useState, useEffect, useRef } from "react";
import {
	motion,
	AnimatePresence,
	useScroll,
	useTransform,
} from "framer-motion";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	X,
	Mail,
	Phone,
	Building,
	MapPin,
	Clock,
	Twitter,
	Facebook,
	Instagram,
	Linkedin,
	Github,
	Dribbble,
	CheckCircle2,
	AlertCircle,
	User,
	Link,
	Edit2,
	MessageSquare,
} from "lucide-react";

export default function UserDetailsModal({ user, onClose }) {
	const [activeSection, setActiveSection] = useState("personal");
	const contentRef = useRef(null);
	const [showScrollIndicator, setShowScrollIndicator] = useState(false);

	// Scroll animation
	const { scrollYProgress } = useScroll({
		target: contentRef,
		offset: ["start start", "end end"],
	});

	const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

	// Check if content is scrollable
	useEffect(() => {
		const checkScrollable = () => {
			if (contentRef.current) {
				const isScrollable =
					contentRef.current.scrollHeight > contentRef.current.clientHeight;
				setShowScrollIndicator(isScrollable);
			}
		};

		checkScrollable();
		window.addEventListener("resize", checkScrollable);

		return () => window.removeEventListener("resize", checkScrollable);
	}, [activeSection, user]);

	if (!user) return null;

	// Format social media handles to remove @ if present
	const formatSocialHandle = (handle) => {
		if (!handle) return "";
		return handle.startsWith("@") ? handle.substring(1) : handle;
	};

	// Generate social media URLs
	const getSocialUrl = (platform, handle) => {
		if (!handle) return "#";
		const formattedHandle = formatSocialHandle(handle);

		switch (platform) {
			case "twitter":
				return `https://twitter.com/${formattedHandle}`;
			case "facebook":
				return `https://facebook.com/${formattedHandle}`;
			case "instagram":
				return `https://instagram.com/${formattedHandle}`;
			case "linkedin":
				return `https://linkedin.com/in/${formattedHandle}`;
			case "github":
				return `https://github.com/${formattedHandle}`;
			case "dribbble":
				return `https://dribbble.com/${formattedHandle}`;
			default:
				return "#";
		}
	};

	// Check if user has any social profiles
	const hasSocialProfiles =
		user.twitter ||
		user.facebook ||
		user.instagram ||
		user.linkedin ||
		user.github ||
		user.dribble;

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

	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-hidden"
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={overlayVariants}
				onClick={onClose}>
				<motion.div
					className="w-full max-w-3xl max-h-[90vh] bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative"
					variants={modalVariants}
					onClick={(e) => e.stopPropagation()}>
					{/* Decorative elements */}
					<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
						<div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl opacity-50"></div>
						<div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl opacity-50"></div>

						{/* Animated gradient lines */}
						<div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse"></div>
						<div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse delay-700"></div>
					</div>

					{/* Top accent */}
					<div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/50"></div>

					{/* Header */}
					<div className="relative px-8 pt-6 pb-4 border-b border-slate-200 dark:border-slate-700/50 flex items-center justify-between backdrop-blur-sm bg-white/70 dark:bg-slate-800/70">
						<div className="flex flex-col">
							<h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
								User Details
							</h2>
							<p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
								View complete user information
							</p>
						</div>
						<Button
							variant="ghost"
							size="icon"
							onClick={onClose}
							className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-white/20 dark:hover:bg-slate-700/50 rounded-full h-10 w-10 absolute backdrop-blur-sm bg-white/10 dark:bg-slate-800/20 border border-white/20 dark:border-slate-700/30">
							<X className="h-5 w-5" />
						</Button>
					</div>

					{/* User profile header */}
					<div className="px-8 py-6 flex flex-col md:flex-row md:items-center gap-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
						<div className="relative group">
							<div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary/60 blur-lg opacity-30 group-hover:opacity-60 transition-opacity animate-pulse"></div>
							<Avatar className="h-28 w-28 border-4 border-white dark:border-slate-700 group-hover:border-primary/30 transition-all duration-300 relative">
								<AvatarImage
									src={user.avatar || "/placeholder.svg?height=112&width=112"}
									alt={user.name}
								/>
								<AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xl font-semibold">
									{user.firstName && user.lastName
										? `${user.firstName[0]}${user.lastName[0]}`
										: user.name
										? user.name
												.split(" ")
												.map((n) => n[0])
												.join("")
										: "U"}
								</AvatarFallback>
							</Avatar>
							{user.status === "active" && (
								<span className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white dark:border-slate-700 flex items-center justify-center shadow-lg">
									<CheckCircle2 className="h-3 w-3 text-white" />
								</span>
							)}
							{user.status === "inactive" && (
								<span className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-red-500 border-2 border-white dark:border-slate-700 flex items-center justify-center shadow-lg">
									<AlertCircle className="h-3 w-3 text-white" />
								</span>
							)}
						</div>

						<div className="flex flex-col">
							<h3 className="text-2xl font-bold text-slate-900 dark:text-white">
								{user.firstName && user.lastName
									? `${user.firstName} ${user.lastName}`
									: user.name || "User"}
							</h3>

							<div className="flex flex-wrap items-center gap-2 mt-1">
								<span className="text-slate-600 dark:text-slate-300">
									{user.position || user.companyName || ""}
								</span>

								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm border ${
										user.role === "Admin"
											? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
											: user.role === "Co Admin"
											? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
											: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20"
									}`}>
									{user.role}
								</span>

								<span
									className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm border ${
										user.status === "active"
											? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
											: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
									}`}>
									{user.status === "active" ? (
										<CheckCircle2 className="h-3 w-3" />
									) : (
										<AlertCircle className="h-3 w-3" />
									)}
									{user.status === "active" ? "Active" : "Inactive"}
								</span>
							</div>

							<div className="flex items-center gap-2 mt-3">
								<Button
									variant="outline"
									size="sm"
									className="h-8 gap-1 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700">
									<MessageSquare className="h-3.5 w-3.5" />
									<span>Message</span>
								</Button>
								<Button
									variant="outline"
									size="sm"
									className="h-8 gap-1 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700">
									<Edit2 className="h-3.5 w-3.5" />
									<span>Edit</span>
								</Button>
							</div>
						</div>
					</div>

					{/* Scrollable content area */}
					<div
						ref={contentRef}
						className="overflow-y-auto px-8 pb-8"
						style={{ maxHeight: "calc(90vh - 300px)" }}>
						<div className="mt-6 space-y-6">
							<div className="grid md:grid-cols-2 gap-6">
								{/* Contact Information */}
								<motion.div
									className="space-y-4 bg-white/70 dark:bg-slate-800/50 backdrop-blur-md rounded-xl p-5 shadow-lg shadow-slate-200/50 dark:shadow-black/20 border border-white/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-slate-200/70 dark:hover:shadow-black/30 transition-all duration-300"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.1 }}>
									<h4 className="text-sm font-medium text-primary dark:text-primary uppercase tracking-wider flex items-center gap-2">
										<div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
											<User className="h-3.5 w-3.5 text-primary" />
										</div>
										Contact Information
									</h4>

									<div className="space-y-3">
										<div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-slate-700/50 transition-colors">
											<div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
												<Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
											</div>
											<div className="space-y-1">
												<p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
													Email Address
												</p>
												<p className="text-sm font-medium text-slate-900 dark:text-white">
													{user.email}
												</p>
											</div>
										</div>

										<div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-slate-700/50 transition-colors">
											<div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
												<Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
											</div>
											<div className="space-y-1">
												<p className="text-xs text-green-600 dark:text-green-400 font-medium">
													Phone Number
												</p>
												<p className="text-sm font-medium text-slate-900 dark:text-white">
													{user.telephone || "Not provided"}
												</p>
											</div>
										</div>
									</div>
								</motion.div>

								{/* Work Information */}
								<motion.div
									className="space-y-4 bg-white/70 dark:bg-slate-800/50 backdrop-blur-md rounded-xl p-5 shadow-lg shadow-slate-200/50 dark:shadow-black/20 border border-white/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-slate-200/70 dark:hover:shadow-black/30 transition-all duration-300"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}>
									<h4 className="text-sm font-medium text-primary dark:text-primary uppercase tracking-wider flex items-center gap-2">
										<div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
											<Building className="h-3.5 w-3.5 text-primary" />
										</div>
										Work Information
									</h4>

									<div className="space-y-3">
										<div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-slate-700/50 transition-colors">
											<div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
												<Building className="h-4 w-4 text-purple-600 dark:text-purple-400" />
											</div>
											<div className="space-y-1">
												<p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
													Company
												</p>
												<p className="text-sm font-medium text-slate-900 dark:text-white">
													{user.companyName || "Not provided"}
												</p>
											</div>
										</div>

										<div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-slate-700/50 transition-colors">
											<div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
												<MapPin className="h-4 w-4 text-amber-600 dark:text-amber-400" />
											</div>
											<div className="space-y-1">
												<p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
													Position
												</p>
												<p className="text-sm font-medium text-slate-900 dark:text-white">
													{user.position || "Not provided"}
												</p>
											</div>
										</div>
									</div>
								</motion.div>
							</div>

							<motion.div
								className="pt-4 border-t border-slate-200 dark:border-slate-700/50"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}>
								<h4 className="text-sm font-medium text-primary dark:text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
									<div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
										<Clock className="h-3.5 w-3.5 text-primary" />
									</div>
									Social Profiles
								</h4>

								<div className="mt-6">
									{!hasSocialProfiles ? (
										<div className="flex flex-col items-center justify-center py-12 text-center">
											<div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-700/30 flex items-center justify-center mb-4">
												<Link className="h-8 w-8 text-slate-400 dark:text-slate-500" />
											</div>
											<h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
												No Social Profiles
											</h3>
											<p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
												This user hasn't added any social media profiles to
												their account yet.
											</p>
										</div>
									) : (
										<div className="grid md:grid-cols-2 gap-6">
											{user.twitter && (
												<motion.a
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ delay: 0.1 }}
													href={getSocialUrl("twitter", user.twitter)}
													target="_blank"
													rel="noopener noreferrer"
													className="group flex items-start gap-3 p-4 rounded-xl border border-white/50 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/50 backdrop-blur-md hover:bg-white dark:hover:bg-slate-700/70 transition-all shadow-lg shadow-slate-200/30 dark:shadow-black/10 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20">
													<div className="h-10 w-10 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
														<Twitter className="h-5 w-5 text-[#1DA1F2]" />
													</div>
													<div className="space-y-1">
														<p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-[#1DA1F2] transition-colors">
															Twitter
														</p>
														<p className="text-xs text-slate-500 dark:text-slate-400">
															@{formatSocialHandle(user.twitter)}
														</p>
													</div>
												</motion.a>
											)}

											{user.facebook && (
												<motion.a
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ delay: 0.15 }}
													href={getSocialUrl("facebook", user.facebook)}
													target="_blank"
													rel="noopener noreferrer"
													className="group flex items-start gap-3 p-4 rounded-xl border border-white/50 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/50 backdrop-blur-md hover:bg-white dark:hover:bg-slate-700/70 transition-all shadow-lg shadow-slate-200/30 dark:shadow-black/10 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20">
													<div className="h-10 w-10 rounded-full bg-[#1877F2]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
														<Facebook className="h-5 w-5 text-[#1877F2]" />
													</div>
													<div className="space-y-1">
														<p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-[#1877F2] transition-colors">
															Facebook
														</p>
														<p className="text-xs text-slate-500 dark:text-slate-400">
															@{formatSocialHandle(user.facebook)}
														</p>
													</div>
												</motion.a>
											)}

											{user.instagram && (
												<motion.a
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ delay: 0.2 }}
													href={getSocialUrl("instagram", user.instagram)}
													target="_blank"
													rel="noopener noreferrer"
													className="group flex items-start gap-3 p-4 rounded-xl border border-white/50 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/50 backdrop-blur-md hover:bg-white dark:hover:bg-slate-700/70 transition-all shadow-lg shadow-slate-200/30 dark:shadow-black/10 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20">
													<div className="h-10 w-10 rounded-full bg-[#E4405F]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
														<Instagram className="h-5 w-5 text-[#E4405F]" />
													</div>
													<div className="space-y-1">
														<p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-[#E4405F] transition-colors">
															Instagram
														</p>
														<p className="text-xs text-slate-500 dark:text-slate-400">
															@{formatSocialHandle(user.instagram)}
														</p>
													</div>
												</motion.a>
											)}

											{user.linkedin && (
												<motion.a
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ delay: 0.25 }}
													href={getSocialUrl("linkedin", user.linkedin)}
													target="_blank"
													rel="noopener noreferrer"
													className="group flex items-start gap-3 p-4 rounded-xl border border-white/50 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/50 backdrop-blur-md hover:bg-white dark:hover:bg-slate-700/70 transition-all shadow-lg shadow-slate-200/30 dark:shadow-black/10 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20">
													{/* <div className="h- dark:hover:shadow-black/20"> */}
													<div className="h-10 w-10 rounded-full bg-[#0A66C2]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
														<Linkedin className="h-5 w-5 text-[#0A66C2]" />
													</div>
													<div className="space-y-1">
														<p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-[#0A66C2] transition-colors">
															LinkedIn
														</p>
														<p className="text-xs text-slate-500 dark:text-slate-400">
															@{formatSocialHandle(user.linkedin)}
														</p>
													</div>
												</motion.a>
											)}

											{user.github && (
												<motion.a
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ delay: 0.3 }}
													href={getSocialUrl("github", user.github)}
													target="_blank"
													rel="noopener noreferrer"
													className="group flex items-start gap-3 p-4 rounded-xl border border-white/50 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/50 backdrop-blur-md hover:bg-white dark:hover:bg-slate-700/70 transition-all shadow-lg shadow-slate-200/30 dark:shadow-black/10 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20">
													<div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-700/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
														<Github className="h-5 w-5 text-slate-700 dark:text-slate-300" />
													</div>
													<div className="space-y-1">
														<p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-slate-700 transition-colors">
															GitHub
														</p>
														<p className="text-xs text-slate-500 dark:text-slate-400">
															@{formatSocialHandle(user.github)}
														</p>
													</div>
												</motion.a>
											)}

											{user.dribble && (
												<motion.a
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ delay: 0.35 }}
													href={getSocialUrl("dribbble", user.dribble)}
													target="_blank"
													rel="noopener noreferrer"
													className="group flex items-start gap-3 p-4 rounded-xl border border-white/50 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/50 backdrop-blur-md hover:bg-white dark:hover:bg-slate-700/70 transition-all shadow-lg shadow-slate-200/30 dark:shadow-black/10 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20">
													<div className="h-10 w-10 rounded-full bg-[#EA4C89]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
														<Dribbble className="h-5 w-5 text-[#EA4C89]" />
													</div>
													<div className="space-y-1">
														<p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-[#EA4C89] transition-colors">
															Dribbble
														</p>
														<p className="text-xs text-slate-500 dark:text-slate-400">
															@{formatSocialHandle(user.dribble)}
														</p>
													</div>
												</motion.a>
											)}
										</div>
									)}
								</div>
							</motion.div>

							{/* Additional Information */}
							<motion.div
								className="pt-4 border-t border-slate-200 dark:border-slate-700/50"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}>
								<h4 className="text-sm font-medium text-primary dark:text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
									<div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
										<Clock className="h-3.5 w-3.5 text-primary" />
									</div>
									Additional Information
								</h4>

								<div className="grid md:grid-cols-2 gap-6">
									<div className="group bg-white/70 dark:bg-slate-800/50 backdrop-blur-md rounded-xl p-4 shadow-md shadow-slate-200/50 dark:shadow-black/20 border border-white/50 dark:border-slate-700/50 hover:shadow-lg hover:shadow-slate-200/70 dark:hover:shadow-black/30 transition-all duration-300">
										<div className="flex items-start gap-3">
											<div className="h-8 w-8 rounded-full bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
												<Clock className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
											</div>
											<div className="space-y-1">
												<p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">
													Time Zone
												</p>
												<p className="text-sm font-medium text-slate-900 dark:text-white">
													{user.timeZone || "Not provided"}
												</p>
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
