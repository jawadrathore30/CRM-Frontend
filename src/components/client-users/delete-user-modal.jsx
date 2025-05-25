"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AlertCircle, Trash2, X, Mail, Building } from "lucide-react";

export default function DeleteUserModal({ user, onClose, onConfirm }) {
	if (!user) return null;

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

	// Get owner badge color
	const getOwnerBadgeColor = () => {
		if (!user) return "";

		switch (user.ownerType) {
			case "Owner":
				return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
			case "User":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
			default:
				return "bg-slate-100 text-slate-800 dark:bg-slate-700/30 dark:text-slate-400";
		}
	};

	return (
		<motion.div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={overlayVariants}
			onClick={onClose}>
			<motion.div
				className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden"
				variants={modalVariants}
				onClick={(e) => e.stopPropagation()}>
				{/* Decorative elements */}
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
					<div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-red-500/10 blur-3xl opacity-30"></div>
					<div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-red-500/10 blur-3xl opacity-30"></div>
				</div>

				{/* Top accent */}
				<div className="h-1.5 bg-gradient-to-r from-red-500 via-red-500/80 to-red-500/50"></div>

				{/* Header */}
				<div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
							<AlertCircle className="h-5 w-5 text-red-500" />
						</div>
						<h2 className="text-xl font-semibold text-slate-900 dark:text-white">
							Delete User
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

				<div className="overflow-y-auto max-h-[calc(100vh-180px)]">
					{/* User info */}
					<div className="p-6">
						<div className="flex flex-col items-center mb-6">
							<div className="relative group mb-4">
								<div className="absolute inset-0 rounded-full bg-red-500/20 blur-lg opacity-30 group-hover:opacity-40 transition-opacity"></div>
								<Avatar className="h-24 w-24 border-4 border-white dark:border-slate-700 shadow-md">
									<AvatarImage
										src={user.avatar || "/placeholder.svg?height=96&width=96"}
										alt={user.name}
									/>
									<AvatarFallback className="bg-gradient-to-br from-red-500/20 to-red-500/10 text-red-500 text-xl font-semibold">
										{user.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
							</div>
							<h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
								{user.name}
							</h3>
							<div className="flex flex-col items-center gap-1.5">
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOwnerBadgeColor()}`}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="h-3 w-3 mr-1">
										<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
										<circle cx="9" cy="7" r="4"></circle>
										<path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
										<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
									</svg>
									{user.ownerType || "User"}
								</span>
							</div>
						</div>

						<div className="space-y-4 mb-6">
							<div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-700">
								<div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
									<Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
								</div>
								<div className="min-w-0 flex-1">
									<p className="text-xs text-slate-500 dark:text-slate-400">
										Email Address
									</p>
									<p className="text-sm font-medium text-slate-900 dark:text-white truncate">
										{user.email}
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-700">
								<div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
									<Building className="h-4 w-4 text-purple-600 dark:text-purple-400" />
								</div>
								<div className="min-w-0 flex-1">
									<p className="text-xs text-slate-500 dark:text-slate-400">
										Company
									</p>
									<p className="text-sm font-medium text-slate-900 dark:text-white truncate">
										{user.company}
									</p>
								</div>
							</div>
						</div>

						<div className="rounded-lg border border-red-200 dark:border-red-700/40 bg-red-50 dark:bg-red-900/10 p-4 flex items-start gap-3">
							<AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
							<div className="space-y-1">
								<p className="text-sm font-medium text-red-700 dark:text-red-400">
									Warning
								</p>
								<p className="text-sm text-slate-600 dark:text-slate-400">
									Are you sure you want to delete this user? This action cannot
									be undone and all associated data will be permanently removed.
								</p>
							</div>
						</div>
					</div>

					{/* Actions */}
					<div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
							className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
							Cancel
						</Button>
						<Button
							type="button"
							onClick={onConfirm}
							className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white flex items-center gap-2">
							<Trash2 className="h-4 w-4" />
							Delete User
						</Button>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
