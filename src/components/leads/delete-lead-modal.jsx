"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
	AlertTriangle,
	X,
	Mail,
	Phone,
	Tag,
	AlertCircle,
	Clock,
	CheckCircle2,
	FileText,
} from "lucide-react";

export default function DeleteLeadModal({ isOpen, lead, onClose, onConfirm }) {
	if (!isOpen || !lead) return null;

	// Get status badge color
	const getStatusBadgeColor = (status) => {
		switch (status) {
			case "New":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
			case "Contacted":
				return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
			case "Qualified":
				return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
			case "Proposal Sent":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
			case "Converted":
				return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
			case "Disqualified":
				return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
			default:
				return "bg-slate-100 text-slate-800 dark:bg-slate-700/30 dark:text-slate-400";
		}
	};

	// Get status icon
	const getStatusIcon = (status) => {
		switch (status) {
			case "New":
				return <Clock className="h-3 w-3 mr-1" />;
			case "Contacted":
				return <Phone className="h-3 w-3 mr-1" />;
			case "Qualified":
				return <CheckCircle2 className="h-3 w-3 mr-1" />;
			case "Proposal Sent":
				return <FileText className="h-3 w-3 mr-1" />;
			case "Converted":
				return <CheckCircle2 className="h-3 w-3 mr-1" />;
			case "Disqualified":
				return <AlertCircle className="h-3 w-3 mr-1" />;
			default:
				return <Tag className="h-3 w-3 mr-1" />;
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
					className="w-full max-w-md bg-white dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 bg-gradient-to-b from-slate-50 to-white rounded-2xl shadow-2xl overflow-hidden relative"
					variants={modalVariants}
					onClick={(e) => e.stopPropagation()}>
					{/* Decorative elements */}
					<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
						<div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-red-500/10 dark:bg-red-500/20 blur-3xl opacity-50"></div>
						<div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-red-500/5 dark:bg-red-500/10 blur-3xl opacity-50"></div>
					</div>

					{/* Top accent */}
					<div className="h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-red-400"></div>

					{/* Header */}
					<div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
								<AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
							</div>
							<div>
								<h2 className="text-xl font-semibold text-slate-900 dark:text-white">
									Delete Lead
								</h2>
								<p className="text-sm text-slate-500 dark:text-slate-400">
									This action cannot be undone
								</p>
							</div>
						</div>
						<Button
							variant="ghost"
							size="icon"
							onClick={onClose}
							className="h-8 w-8 rounded-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white">
							<X className="h-5 w-5" />
						</Button>
					</div>

					{/* Content */}
					<div className="p-6">
						<div className="mb-6 space-y-4">
							{/* Lead Information */}
							<div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/70 dark:to-slate-800/30 rounded-xl p-5 border border-slate-200/70 dark:border-slate-700/50 shadow-sm">
								{/* Title with decorative element */}
								<div className="relative mb-4 pb-3 border-b border-slate-200 dark:border-slate-700/50">
									<div className="absolute left-0 top-0 w-30 h-1 bg-gradient-to-r from-red-400 to-red-300 rounded-full"></div>
									<h3 className="pt-2 text-lg font-medium text-slate-900 dark:text-white mt-3">
										{lead.title}
									</h3>
								</div>

								<div className="flex flex-col gap-3">
									{/* Status with improved badge */}
									<div className="flex items-center justify-between">
										<span className="text-sm font-medium text-slate-500 dark:text-slate-400">
											Status
										</span>
										<span
											className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
												lead.status
											)}`}>
											{getStatusIcon(lead.status)}
											{lead.status}
										</span>
									</div>

									{/* Contact with improved layout */}
									<div className="flex items-center justify-between">
										<span className="text-sm font-medium text-slate-500 dark:text-slate-400">
											Contact
										</span>
										<div className="flex items-center gap-2">
											<span className="text-sm font-medium text-slate-700 dark:text-slate-300">
												{lead.contact.name}
											</span>
										</div>
									</div>

									{/* Email with icon */}
									<div className="flex items-center justify-between">
										<span className="text-sm font-medium text-slate-500 dark:text-slate-400">
											Email
										</span>
										<div className="flex items-center gap-1.5">
											<span className="text-sm text-slate-700 dark:text-slate-300">
												{lead.contact.email}
											</span>
										</div>
									</div>
								</div>
							</div>

							{/* Warning */}
							<div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg p-4">
								<div className="flex items-start">
									<AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
									<div>
										<h4 className="text-sm font-medium text-red-800 dark:text-red-300">
											Warning
										</h4>
										<p className="mt-1 text-sm text-red-700 dark:text-red-400">
											Deleting this lead will permanently remove all associated
											data, including contact information, notes, and activity
											history. This action cannot be reversed.
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Actions */}
						<div className="flex justify-end gap-3">
							<Button
								variant="outline"
								onClick={onClose}
								className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50">
								Cancel
							</Button>
							<Button
								variant="destructive"
								onClick={onConfirm}
								className="bg-red-600 hover:bg-red-700 text-white">
								Delete Lead
							</Button>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
