"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorHighlight } from "@/components/ui/form-error";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Users,
	DollarSign,
	Clock,
	Sparkles,
	Search,
	Check,
	X,
} from "lucide-react";

export default function Step4TeamCost({
	formData,
	setFormData,
	errors,
	mockUsers,
}) {
	const [searchQuery, setSearchQuery] = useState("");
	const [showUserDropdown, setShowUserDropdown] = useState(false);
	const [filteredUsers, setFilteredUsers] = useState([]);

	const searchInputRef = useRef(null);
	const dropdownRef = useRef(null);

	// Filter users based on search query
	useEffect(() => {
		if (searchQuery.trim() === "") {
			setFilteredUsers(
				mockUsers.filter(
					(user) =>
						!formData.assignedUsers.some((assigned) => assigned.id === user.id)
				)
			);
		} else {
			setFilteredUsers(
				mockUsers.filter(
					(user) =>
						(user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
							user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
						!formData.assignedUsers.some((assigned) => assigned.id === user.id)
				)
			);
		}
	}, [searchQuery, formData.assignedUsers, mockUsers]);

	// Handle click outside to close dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) &&
				searchInputRef.current &&
				!searchInputRef.current.contains(event.target)
			) {
				setShowUserDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Add user to assigned users
	const handleAddUser = (user) => {
		setFormData((prev) => ({
			...prev,
			assignedUsers: [...prev.assignedUsers, user],
		}));
		setSearchQuery("");
		setShowUserDropdown(false);
		// Focus back on search input after selection
		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}
	};

	// Remove user from assigned users
	const handleRemoveUser = (userId) => {
		setFormData((prev) => ({
			...prev,
			assignedUsers: prev.assignedUsers.filter((user) => user.id !== userId),
		}));
	};

	// Handle numeric value change with validation
	const handleNumericChange = (e) => {
		const { name, value } = e.target;
		// Allow empty string or numbers with up to 2 decimal places
		if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	// Animation variants
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

	return (
		<div className="space-y-6">
			{/* Assigned Users Section */}
			<motion.div
				custom={0}
				variants={formItemVariants}
				initial="hidden"
				animate="visible"
				className="space-y-4">
				<div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
					<Users className="h-5 w-5 text-primary/70" />
					<h3 className="text-lg font-medium">Assign Team Members</h3>
				</div>
				<p className="text-sm text-slate-500 dark:text-slate-400">
					Assign team members who will be responsible for this project.
				</p>

				{/* Selected Users */}
				{formData.assignedUsers.length > 0 && (
					<div className="flex flex-wrap gap-2 mb-2">
						{formData.assignedUsers.map((user) => (
							<Badge
								key={user.id}
								variant="secondary"
								className="flex items-center gap-1 pl-1 pr-2 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600">
								<Avatar className="h-5 w-5 mr-1">
									<AvatarImage
										src={user.avatar || "/placeholder.svg"}
										alt={user.name}
									/>
									<AvatarFallback className="text-[10px]">
										{user.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<span className="text-xs">{user.name}</span>
								<button
									type="button"
									className="h-4 w-4 ml-1 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center"
									onClick={() => handleRemoveUser(user.id)}>
									<X className="h-3 w-3" />
									<span className="sr-only">Remove {user.name}</span>
								</button>
							</Badge>
						))}
					</div>
				)}

				{/* Search Input */}
				<div className="relative">
					<div className="relative">
						<Search className="absolute left-2.5 top-3 h-4 w-4 text-slate-400" />
						<Input
							id="assignedUsers"
							ref={searchInputRef}
							value={searchQuery}
							onChange={(e) => {
								setSearchQuery(e.target.value);
								setShowUserDropdown(true);
							}}
							onFocus={() => setShowUserDropdown(true)}
							placeholder="Search users..."
							className="h-11 pl-9 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
						/>
					</div>

					{/* Dropdown */}
					{showUserDropdown && (
						<div
							ref={dropdownRef}
							className="absolute z-10 mt-1 w-full bg-white dark:bg-slate-800 rounded-md shadow-lg border border-slate-200 dark:border-slate-700 max-h-54 overflow-auto">
							{filteredUsers.length === 0 ? (
								<div className="p-2 text-sm text-slate-500 dark:text-slate-400 text-center">
									No users found
								</div>
							) : (
								<ul className="py-1">
									{filteredUsers.map((user) => (
										<li key={user.id}>
											<button
												type="button"
												className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700"
												onClick={() => handleAddUser(user)}>
												<Avatar className="h-6 w-6">
													<AvatarImage
														src={user.avatar || "/placeholder.svg"}
														alt={user.name}
													/>
													<AvatarFallback className="text-[10px]">
														{user.name
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</AvatarFallback>
												</Avatar>
												<div className="flex-1 min-w-0">
													<p className="text-sm font-medium truncate">
														{user.name}
													</p>
													<p className="text-xs text-slate-500 dark:text-slate-400 truncate">
														{user.email}
													</p>
												</div>
												{formData.assignedUsers.some(
													(assigned) => assigned.id === user.id
												) && <Check className="h-4 w-4 text-green-500" />}
											</button>
										</li>
									))}
								</ul>
							)}
						</div>
					)}
				</div>
			</motion.div>

			{/* Estimate Section */}
			<motion.div
				custom={1}
				variants={formItemVariants}
				initial="hidden"
				animate="visible"
				className="space-y-4 mt-8">
				<div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
					<DollarSign className="h-5 w-5 text-primary/70" />
					<h3 className="text-lg font-medium">Project Estimate</h3>
				</div>
				<p className="text-sm text-slate-500 dark:text-slate-400">
					Provide an estimated cost and timeline for the project completion.
				</p>

				<div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
					<div className="grid md:grid-cols-2 gap-6">
						{/* Estimated Value */}
						<motion.div
							custom={2}
							variants={formItemVariants}
							initial="hidden"
							animate="visible"
							className="space-y-2">
							<Label
								htmlFor="estimatedValue"
								className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
								<Sparkles className="h-4 w-4 text-primary/70" />
								Estimated Cost ($)
							</Label>
							<ErrorHighlight
								isError={!!errors.estimatedValue}
								errorMessage={errors.estimatedValue}>
								<div className="relative">
									<DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
									<Input
										id="estimatedValue"
										name="estimatedValue"
										value={formData.estimatedValue}
										onChange={handleNumericChange}
										placeholder="0.00"
										className="h-11 pl-9 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
									/>
								</div>
							</ErrorHighlight>
						</motion.div>

						{/* Estimated Time (in days) */}
						<motion.div
							custom={3}
							variants={formItemVariants}
							initial="hidden"
							animate="visible"
							className="space-y-2">
							<Label
								htmlFor="estimatedTime"
								className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
								<Clock className="h-4 w-4 text-primary/70" />
								Estimated Time (days)
							</Label>
							<ErrorHighlight
								isError={!!errors.estimatedTime}
								errorMessage={errors.estimatedTime}>
								<div className="relative">
									<Input
										id="estimatedTime"
										name="estimatedTime"
										value={formData.estimatedTime}
										onChange={handleNumericChange}
										placeholder="0"
										className="h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
									/>
								</div>
							</ErrorHighlight>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
