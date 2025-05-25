"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AlertCircle, Trash2, X, Mail, Briefcase, UserCog } from "lucide-react";

export default function DeleteEmployeeModal({ employee, onClose, onConfirm }) {
	if (!employee) return null;

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

	// Get role badge color
	const getRoleBadgeColor = () => {
		if (!employee) return "";

		switch (employee.role) {
			case "Admin":
				return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
			case "Co Admin":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
			case "Management":
				return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
			case "Accounting":
				return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
			default:
				return "bg-slate-100 text-slate-800 dark:bg-slate-700/30 dark:text-slate-400";
		}
	};

	// Get employee name
	const getEmployeeName = () => {
		if (employee.firstName && employee.lastName) {
			return `${employee.firstName} ${employee.lastName}`;
		}
		return employee.name || "Employee";
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
							Delete Employee
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
					{/* Employee info */}
					<div className="p-6">
						<div className="flex flex-col items-center mb-6">
							<div className="relative group mb-4">
								<div className="absolute inset-0 rounded-full bg-red-500/20 blur-lg opacity-30 group-hover:opacity-40 transition-opacity"></div>
								<Avatar className="h-24 w-24 border-4 border-white dark:border-slate-700 shadow-md">
									<AvatarImage
										src={
											employee.avatar || "/placeholder.svg?height=96&width=96"
										}
										alt={getEmployeeName()}
									/>
									<AvatarFallback className="bg-gradient-to-br from-red-500/20 to-red-500/10 text-red-500 text-xl font-semibold">
										{employee.firstName && employee.lastName
											? `${employee.firstName[0]}${employee.lastName[0]}`
											: employee.name
											? employee.name
													.split(" ")
													.map((n) => n[0])
													.join("")
											: "E"}
									</AvatarFallback>
								</Avatar>
							</div>
							<h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
								{getEmployeeName()}
							</h3>
							<span
								className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor()}`}>
								<UserCog className="h-3 w-3 mr-1" />
								{employee.role}
							</span>
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
										{employee.email}
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-700">
								<div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
									<Briefcase className="h-4 w-4 text-green-600 dark:text-green-400" />
								</div>
								<div className="min-w-0 flex-1">
									<p className="text-xs text-slate-500 dark:text-slate-400">
										Position
									</p>
									<p className="text-sm font-medium text-slate-900 dark:text-white truncate">
										{employee.position || "Not specified"}
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
									Are you sure you want to delete this employee? This action
									cannot be undone and all associated data will be permanently
									removed.
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
							Delete Employee
						</Button>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
