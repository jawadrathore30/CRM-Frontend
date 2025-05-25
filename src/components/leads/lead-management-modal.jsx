"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	X,
	Search,
	Check,
	Tag,
	Users,
	AlertCircle,
	Clock,
	Phone,
	CheckCircle2,
	FileText,
} from "lucide-react";

// Mock data for users
const mockUsers = [
	{
		id: 1,
		name: "Amanda Omar",
		email: "amanda@example.com",
		avatar: "/contemplative-woman.png",
	},
	{
		id: 2,
		name: "Amy Davis",
		email: "amy@example.com",
		avatar: "/sunlit-blonde.png",
	},
	{
		id: 3,
		name: "John Smith",
		email: "john@example.com",
		avatar: "/thoughtful-brunette.png",
	},
	{
		id: 4,
		name: "Michael Chen",
		email: "michael@example.com",
		avatar: "/thoughtful-urbanite.png",
	},
	{
		id: 5,
		name: "David Brown",
		email: "david@example.com",
		avatar: "/thoughtful-spectacled-man.png",
	},
	{
		id: 6,
		name: "Emma Wilson",
		email: "emma@example.com",
		avatar: "/fiery-portrait.png",
	},
	{
		id: 7,
		name: "Sarah Johnson",
		email: "sarah@example.com",
		avatar: "/curly-haired-portrait.png",
	},
	{
		id: 8,
		name: "Jill Rawson",
		email: "jill@example.com",
		avatar: "/confident-gaze.png",
	},
	{
		id: 9,
		name: "Colex Mine",
		email: "colex@example.com",
		avatar: "/thoughtful-bearded-man.png",
	},
];

// Lead status options
const statusOptions = [
	{ value: "New", label: "New", icon: <Clock className="h-4 w-4 mr-2" /> },
	{
		value: "Contacted",
		label: "Contacted",
		icon: <Phone className="h-4 w-4 mr-2" />,
	},
	{
		value: "Proposal Sent",
		label: "Proposal Sent",
		icon: <FileText className="h-4 w-4 mr-2" />,
	},
	{
		value: "Qualified",
		label: "Qualified",
		icon: <CheckCircle2 className="h-4 w-4 mr-2" />,
	},
	{
		value: "Disqualified",
		label: "Disqualified",
		icon: <AlertCircle className="h-4 w-4 mr-2" />,
	},
	{
		value: "Converted",
		label: "Converted",
		icon: <CheckCircle2 className="h-4 w-4 mr-2" />,
	},
];

export default function LeadManagementModal({
	isOpen,
	onClose,
	lead,
	onUpdateLead,
}) {
	const [activeTab, setActiveTab] = useState("assigned");
	const [assignedUsers, setAssignedUsers] = useState(lead?.assignedUsers || []);
	const [status, setStatus] = useState(lead?.status || "New");
	const [searchQuery, setSearchQuery] = useState("");
	const [showUserDropdown, setShowUserDropdown] = useState(false);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Refs
	const searchInputRef = useRef(null);
	const dropdownRef = useRef(null);

	// Initialize state from lead
	useEffect(() => {
		if (lead) {
			setAssignedUsers(lead.assignedUsers || []);
			setStatus(lead.status || "New");
		}
	}, [lead]);

	// Filter users based on search query
	useEffect(() => {
		if (searchQuery.trim() === "") {
			setFilteredUsers(
				mockUsers.filter(
					(user) => !assignedUsers.some((assigned) => assigned.id === user.id)
				)
			);
		} else {
			setFilteredUsers(
				mockUsers.filter(
					(user) =>
						(user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
							user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
						!assignedUsers.some((assigned) => assigned.id === user.id)
				)
			);
		}
	}, [searchQuery, assignedUsers]);

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
		setAssignedUsers([...assignedUsers, user]);
		setSearchQuery("");
		setShowUserDropdown(false);
		// Focus back on search input after selection
		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}
	};

	// Remove user from assigned users
	const handleRemoveUser = (userId) => {
		setAssignedUsers(assignedUsers.filter((user) => user.id !== userId));
	};

	// Handle save changes
	const handleSave = () => {
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			// Update lead with new assigned users and status
			onUpdateLead(lead.id, {
				assignedUsers,
				status,
			});

			setIsLoading(false);
			onClose();
		}, 800);
	};

	// Get status badge color
	const getStatusBadgeColor = (statusValue) => {
		switch (statusValue) {
			case "New":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
			case "Contacted":
				return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
			case "Proposal Sent":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
			case "Qualified":
				return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
			case "Disqualified":
				return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
			case "Converted":
				return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
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

	if (!isOpen || !lead) return null;

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
					className="w-full max-w-xl min-h-[620px] bg-white dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 bg-gradient-to-b from-slate-50 to-white rounded-2xl shadow-2xl overflow-hidden relative"
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
								<Tag className="h-5 w-5 text-primary" />
							</div>
							<div>
								<h2 className="text-xl font-semibold text-slate-900 dark:text-white">
									Manage Lead
								</h2>
								<p className="text-sm text-slate-500 dark:text-slate-400">
									{lead.title}
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

					<div className="flex flex-col justify-between min-h-[525px]">
						{/* Tabs */}
						<div className="p-6">
							<Tabs
								value={activeTab}
								onValueChange={setActiveTab}
								className="w-full">
								<TabsList className="grid w-full grid-cols-2 mb-6">
									<TabsTrigger
										value="assigned"
										className="flex items-center gap-2">
										<Users className="h-4 w-4" />
										Assigned Users
									</TabsTrigger>
									<TabsTrigger
										value="status"
										className="flex items-center gap-2">
										<Tag className="h-4 w-4" />
										Lead Status
									</TabsTrigger>
								</TabsList>

								{/* Assigned Users Tab */}
								<TabsContent value="assigned" className="space-y-4">
									<div className="space-y-2">
										<Label
											htmlFor="assignedUsers"
											className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
											<Users className="h-4 w-4 text-primary/70" />
											Assigned Users
										</Label>

										{/* Selected Users */}
										{assignedUsers.length > 0 && (
											<div className="flex flex-wrap gap-2 mb-4">
												{assignedUsers.map((user) => (
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
															<span className="sr-only">
																Remove {user.name}
															</span>
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
													className="absolute z-10 mt-1 w-full bg-white dark:bg-slate-800 rounded-md shadow-lg border border-slate-200 dark:border-slate-700 max-h-50 overflow-auto">
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
																		{assignedUsers.some(
																			(assigned) => assigned.id === user.id
																		) && (
																			<Check className="h-4 w-4 text-green-500" />
																		)}
																	</button>
																</li>
															))}
														</ul>
													)}
												</div>
											)}
										</div>

										{assignedUsers.length === 0 && (
											<div className="mt-4 p-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-center">
												<Users className="h-8 w-8 mx-auto text-slate-400 mb-2" />
												<p className="text-sm text-slate-500 dark:text-slate-400">
													No users assigned to this lead yet.
												</p>
												<p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
													Search and add users above.
												</p>
											</div>
										)}
									</div>
								</TabsContent>

								{/* Status Tab */}
								<TabsContent value="status" className="space-y-4">
									<div className="space-y-2">
										<Label
											htmlFor="status"
											className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
											<Tag className="h-4 w-4 text-primary/70" />
											Current Status
										</Label>

										<div className="flex items-center gap-2 mb-4">
											<span
												className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
													lead.status
												)}`}>
												{
													statusOptions.find(
														(option) => option.value === lead.status
													)?.icon
												}
												{lead.status}
											</span>
										</div>

										<Label
											htmlFor="newStatus"
											className="text-sm font-medium text-slate-700 dark:text-slate-300">
											Update Status
										</Label>
										<Select value={status} onValueChange={setStatus}>
											<SelectTrigger
												id="newStatus"
												className="h-11 w-full rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white">
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
											<SelectContent>
												{statusOptions.map((option) => (
													<SelectItem
														key={option.value}
														value={option.value}
														className="flex items-center gap-2">
														<div className="flex items-center">
															{option.icon}
															{option.label}
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>

										<div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
											<h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
												Status Descriptions
											</h4>
											<ul className="space-y-2 text-xs">
												<li className="flex items-start gap-2">
													<Clock className="h-3.5 w-3.5 text-blue-500 mt-0.5" />
													<div>
														<span className="font-medium text-slate-700 dark:text-slate-300">
															New:
														</span>
														<span className="text-slate-500 dark:text-slate-400 ml-1">
															Lead created with initial information collected.
														</span>
													</div>
												</li>
												<li className="flex items-start gap-2">
													<Phone className="h-3.5 w-3.5 text-amber-500 mt-0.5" />
													<div>
														<span className="font-medium text-slate-700 dark:text-slate-300">
															Contacted:
														</span>
														<span className="text-slate-500 dark:text-slate-400 ml-1">
															Initial communication established with the lead.
														</span>
													</div>
												</li>
												<li className="flex items-start gap-2">
													<FileText className="h-3.5 w-3.5 text-yellow-500 mt-0.5" />
													<div>
														<span className="font-medium text-slate-700 dark:text-slate-300">
															Proposal Sent:
														</span>
														<span className="text-slate-500 dark:text-slate-400 ml-1">
															Formal proposal or quote sent, awaiting decision.
														</span>
													</div>
												</li>
												<li className="flex items-start gap-2">
													<CheckCircle2 className="h-3.5 w-3.5 text-indigo-500 mt-0.5" />
													<div>
														<span className="font-medium text-slate-700 dark:text-slate-300">
															Qualified:
														</span>
														<span className="text-slate-500 dark:text-slate-400 ml-1">
															Lead meets criteria for budget, authority, need,
															and timeline.
														</span>
													</div>
												</li>
												<li className="flex items-start gap-2">
													<AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5" />
													<div>
														<span className="font-medium text-slate-700 dark:text-slate-300">
															Disqualified:
														</span>
														<span className="text-slate-500 dark:text-slate-400 ml-1">
															Lead not a good fit due to budget, timeline, or
															misalignment.
														</span>
													</div>
												</li>
												<li className="flex items-start gap-2">
													<CheckCircle2 className="h-3.5 w-3.5 text-green-500 mt-0.5" />
													<div>
														<span className="font-medium text-slate-700 dark:text-slate-300">
															Converted:
														</span>
														<span className="text-slate-500 dark:text-slate-400 ml-1">
															Lead has become a customer with signed contract or
															purchase.
														</span>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</TabsContent>
							</Tabs>
						</div>

						{/* Footer */}
						<div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3">
							<Button
								variant="outline"
								onClick={onClose}
								className="border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white">
								Cancel
							</Button>
							<Button
								onClick={handleSave}
								className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
								disabled={isLoading}>
								{isLoading ? (
									<div className="flex items-center gap-2">
										<div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
										<span>Saving...</span>
									</div>
								) : (
									<span>Save Changes</span>
								)}
							</Button>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
