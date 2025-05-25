"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Mail, X, User, Building, Filter } from "lucide-react";

// Filter Sidebar Component
export default function FilterSidebar({
	onClose,
	filterData,
	setFilterData,
	onApplyFilter,
}) {
	const [activeSection, setActiveSection] = useState("basic");
	const [ownerFilters, setOwnerFilters] = useState({
		owner: false,
		user: false,
		shared: false,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFilterData((prev) => ({ ...prev, [name]: value }));
	};

	const handleReset = () => {
		setFilterData({
			companyName: "",
			name: "",
			email: "",
			userType: "",
			dateStart: "",
			dateEnd: "",
		});
		setOwnerFilters({
			owner: false,
			user: false,
			shared: false,
		});
	};

	// Animation variants
	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { duration: 0.3 } },
		exit: { opacity: 0, transition: { duration: 0.2 } },
	};

	const sidebarVariants = {
		hidden: { opacity: 0, x: "100%" },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 30,
			},
		},
		exit: {
			opacity: 0,
			x: "100%",
			transition: {
				duration: 0.2,
				ease: "easeInOut",
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: (i) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.05,
				duration: 0.3,
			},
		}),
	};

	return (
		<motion.div
			className="fixed inset-0 z-50 flex items-start justify-end bg-black/30 backdrop-blur-sm"
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={overlayVariants}
			onClick={onClose}>
			<motion.div
				className="h-full w-full max-w-sm bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 shadow-2xl overflow-auto"
				variants={sidebarVariants}
				onClick={(e) => e.stopPropagation()}>
				{/* Decorative elements */}
				<div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
					<div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl opacity-50"></div>
					<div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl opacity-50"></div>
				</div>

				<div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
							<Filter className="h-5 w-5 text-white" />
						</div>
						<div>
							<h2 className="text-xl font-semibold text-slate-900 dark:text-white">
								Filter Contacts
							</h2>
							<p className="text-xs text-slate-500 dark:text-slate-400">
								Refine your contact list
							</p>
						</div>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={onClose}
						className="h-8 w-8 rounded-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50">
						<X className="h-5 w-5" />
					</Button>
				</div>

				{/* Filter navigation */}
				<div className="px-6 py-3 border-b border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm">
					<div className="flex space-x-2">
						<Button
							variant={activeSection === "basic" ? "default" : "outline"}
							size="sm"
							onClick={() => setActiveSection("basic")}
							className={`rounded-full ${
								activeSection === "basic"
									? "bg-primary hover:bg-primary/90 text-white"
									: "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
							}`}>
							Basic
						</Button>
						<Button
							variant={activeSection === "advanced" ? "default" : "outline"}
							size="sm"
							onClick={() => setActiveSection("advanced")}
							className={`rounded-full ${
								activeSection === "advanced"
									? "bg-primary hover:bg-primary/90 text-white"
									: "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
							}`}>
							Advanced
						</Button>
					</div>
				</div>

				<div className="p-6 space-y-6">
					{activeSection === "basic" && (
						<div className="space-y-5">
							<motion.div
								custom={0}
								variants={itemVariants}
								initial="hidden"
								animate="visible"
								className="space-y-2">
								<label
									htmlFor="companyName"
									className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
									<Building className="h-4 w-4 text-primary/70" />
									Company Name
								</label>
								<div className="relative">
									<Input
										id="companyName"
										name="companyName"
										value={filterData.companyName}
										onChange={handleChange}
										className="h-11 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:ring-primary pl-3 pr-3"
										placeholder="Filter by company..."
									/>
								</div>
							</motion.div>

							<motion.div
								custom={1}
								variants={itemVariants}
								initial="hidden"
								animate="visible"
								className="space-y-2">
								<label
									htmlFor="name"
									className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
									<User className="h-4 w-4 text-primary/70" />
									Name
								</label>
								<div className="relative">
									<Input
										id="name"
										name="name"
										value={filterData.name}
										onChange={handleChange}
										className="h-11 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:ring-primary pl-3 pr-3"
										placeholder="Filter by name..."
									/>
								</div>
							</motion.div>

							<motion.div
								custom={2}
								variants={itemVariants}
								initial="hidden"
								animate="visible"
								className="space-y-2">
								<label
									htmlFor="email"
									className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
									<Mail className="h-4 w-4 text-primary/70" />
									Email Address
								</label>
								<div className="relative">
									<Input
										id="email"
										name="email"
										value={filterData.email}
										onChange={handleChange}
										className="h-11 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:ring-primary pl-3 pr-3"
										placeholder="Filter by email..."
									/>
								</div>
							</motion.div>
						</div>
					)}

					{activeSection === "advanced" && (
						<div className="space-y-5">
							<motion.div
								custom={1}
								variants={itemVariants}
								initial="hidden"
								animate="visible"
								className="space-y-3 py-2">
								<label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="h-4 w-4 text-primary/70">
										<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
										<circle cx="9" cy="7" r="4"></circle>
										<path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
										<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
									</svg>
									Role
								</label>
								<div className="flex flex-wrap gap-2">
									<div
										className={`px-3 py-2 rounded-lg border cursor-pointer transition-all ${
											ownerFilters.owner
												? "bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900/30 dark:border-purple-800/30 dark:text-purple-400"
												: "bg-white border-slate-200 text-slate-700 dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-300"
										}`}
										onClick={() =>
											setOwnerFilters((prev) => ({
												...prev,
												owner: !prev.owner,
											}))
										}>
										<div className="flex items-center gap-2">
											<Checkbox
												checked={ownerFilters.owner}
												className={
													ownerFilters.owner
														? "text-purple-600 border-purple-600"
														: ""
												}
											/>
											<span className="text-sm">Owner</span>
										</div>
									</div>
									<div
										className={`px-3 py-2 rounded-lg border cursor-pointer transition-all ${
											ownerFilters.user
												? "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800/30 dark:text-blue-400"
												: "bg-white border-slate-200 text-slate-700 dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-300"
										}`}
										onClick={() =>
											setOwnerFilters((prev) => ({
												...prev,
												user: !prev.user,
											}))
										}>
										<div className="flex items-center gap-2">
											<Checkbox
												checked={ownerFilters.user}
												className={
													ownerFilters.user
														? "text-blue-600 border-blue-600"
														: ""
												}
											/>
											<span className="text-sm">User</span>
										</div>
									</div>
								</div>
							</motion.div>
							<motion.div
								custom={2}
								variants={itemVariants}
								initial="hidden"
								animate="visible"
								className="space-y-2 pt-3">
								<label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="h-4 w-4 text-primary/70">
										<rect
											x="3"
											y="4"
											width="18"
											height="18"
											rx="2"
											ry="2"></rect>
										<line x1="16" y1="2" x2="16" y2="6"></line>
										<line x1="8" y1="2" x2="8" y2="6"></line>
										<line x1="3" y1="10" x2="21" y2="10"></line>
									</svg>
									Date Added
								</label>
								<div className="space-y-1">
									<label
										htmlFor="dateStart"
										className="text-xs text-slate-500 dark:text-slate-400">
										Start
									</label>
									<Input
										id="dateStart"
										name="dateStart"
										type="date"
										value={filterData.dateStart}
										onChange={handleChange}
										className="h-11 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:ring-primary"
									/>
								</div>
								<div className="space-y-1">
									<label
										htmlFor="dateEnd"
										className="text-xs text-slate-500 dark:text-slate-400">
										End
									</label>
									<Input
										id="dateEnd"
										name="dateEnd"
										type="date"
										value={filterData.dateEnd}
										onChange={handleChange}
										className="h-11 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:ring-primary"
									/>
								</div>
							</motion.div>

							{/* <motion.div
								custom={3}
								variants={itemVariants}
								initial="hidden"
								animate="visible"
								className="space-y-2 pt-1">
								<label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="h-4 w-4 text-primary/70">
										<path d="M3 3v18h18"></path>
										<path d="m19 9-5 5-4-4-3 3"></path>
									</svg>
									Activity Level
								</label>
								<div className="pt-2">
									<div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
										<div className="h-full w-3/4 bg-gradient-to-r from-primary to-primary/70 rounded-full"></div>
									</div>
									<div className="flex justify-between mt-1">
										<span className="text-xs text-slate-500 dark:text-slate-400">
											Low
										</span>
										<span className="text-xs text-slate-500 dark:text-slate-400">
											High
										</span>
									</div>
								</div>
							</motion.div> */}
						</div>
					)}

					<div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-700/50 flex gap-3 justify-between">
						<Button
							type="button"
							variant="outline"
							onClick={handleReset}
							className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
							Reset
						</Button>
						<Button
							type="button"
							onClick={onApplyFilter}
							className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-6">
							Apply Filter
						</Button>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
