"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
	Search,
	Plus,
	Trash2,
	Edit2,
	Mail,
	MoreHorizontal,
	Download,
	Eye,
	Filter,
	ArrowUpDown,
	ChevronDown,
	ChevronUp,
	Tag,
	CheckCircle2,
	AlertCircle,
	Clock,
	FileText,
	Phone,
	Settings,
} from "lucide-react";

// Import the modal components
import DeleteLeadModal from "../components/leads/delete-lead-modal";
// import LeadDetailsModal from "../components/leads/lead-details-modal";
import CreateLeadModal from "../components/leads/create-lead-modal";
// import UpdateLeadModal from "../components/leads/update-lead-modal";
import LeadManagementModal from "../components/leads/lead-management-modal";
// import FilterSidebar from "../components/leads/filter-sidebar";

// Mock data for leads
const mockLeads = [
	{
		id: 1,
		title: "Web Design - Shopping Cart",
		contact: {
			name: "Philipie Gurney",
			email: "philipie@example.com",
			phone: "(555) 123-4567",
		},
		value: 0.0,
		assignedUsers: [
			{
				id: 1,
				name: "Amanda Omar",
				avatar: "/contemplative-woman.png",
			},
			{
				id: 2,
				name: "Amy Davis",
				avatar: "/sunlit-blonde.png",
			},
		],
		category: "Application Development",
		status: "Converted",
		createdAt: "02-13-2024",
	},
	{
		id: 2,
		title: "New Coming Soon Page",
		contact: {
			name: "Brandon Minsk",
			email: "brandon@example.com",
			phone: "(555) 234-5678",
		},
		value: 120.0,
		assignedUsers: [
			{
				id: 1,
				name: "Amanda Omar",
				avatar: "/contemplative-woman.png",
			},
			{
				id: 3,
				name: "John Smith",
				avatar: "/thoughtful-brunette.png",
			},
		],
		category: "Default",
		status: "Converted",
		createdAt: "02-15-2024",
	},
	{
		id: 3,
		title: "Custom landing page design",
		contact: {
			name: "Philip Gunie",
			email: "philip@example.com",
			phone: "(555) 345-6789",
		},
		value: 0.0,
		assignedUsers: [
			{
				id: 1,
				name: "Amanda Omar",
				avatar: "/contemplative-woman.png",
			},
			{
				id: 4,
				name: "Michael Chen",
				avatar: "/thoughtful-urbanite.png",
			},
		],
		category: "Default",
		status: "Contacted",
		createdAt: "02-13-2024",
	},
	{
		id: 4,
		title: "Dentist website redesign",
		contact: {
			name: "Aniel Watson",
			email: "aniel@example.com",
			phone: "(555) 456-7890",
		},
		value: 4500.0,
		assignedUsers: [
			{
				id: 5,
				name: "David Brown",
				avatar: "/thoughtful-spectacled-man.png",
			},
		],
		category: "Default",
		status: "Disqualified",
		createdAt: "01-23-2023",
	},
	{
		id: 5,
		title: "Login page redesign",
		contact: {
			name: "Hilda Jones",
			email: "hilda@example.com",
			phone: "(555) 567-8901",
		},
		value: 350.0,
		assignedUsers: [
			{
				id: 6,
				name: "Emma Wilson",
				avatar: "/fiery-portrait.png",
			},
		],
		category: "Default",
		status: "Converted",
		createdAt: "01-22-2023",
	},
	{
		id: 6,
		title: "Create a new logo for tech startup",
		contact: {
			name: "Kim Cornelie",
			email: "kim@example.com",
			phone: "(555) 678-9012",
		},
		value: 3999.0,
		assignedUsers: [
			{
				id: 1,
				name: "Amanda Omar",
				avatar: "/contemplative-woman.png",
			},
			{
				id: 7,
				name: "Sarah Johnson",
				avatar: "/curly-haired-portrait.png",
			},
		],
		category: "Application Development",
		status: "Qualified",
		createdAt: "01-15-2023",
	},
	{
		id: 7,
		title: "WordPress theme design",
		contact: {
			name: "Edgar Rivers",
			email: "edgar@example.com",
			phone: "(555) 789-0123",
		},
		value: 2600.0,
		assignedUsers: [
			{
				id: 8,
				name: "Jill Rawson",
				avatar: "/confident-gaze.png",
			},
		],
		category: "Default",
		status: "Proposal Sent",
		createdAt: "01-02-2023",
	},
	{
		id: 8,
		title: "Mobile banking app design",
		contact: {
			name: "Gina Roberts",
			email: "gina@example.com",
			phone: "(555) 890-1234",
		},
		value: 4500.0,
		assignedUsers: [
			{
				id: 9,
				name: "Colex Mine",
				avatar: "/thoughtful-bearded-man.png",
			},
		],
		category: "Default",
		status: "New",
		createdAt: "02-14-2024",
	},
];

export default function Leads() {
	const [mounted, setMounted] = useState(false);
	const [leads, setLeads] = useState(mockLeads);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedLeads, setSelectedLeads] = useState([]);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showFilterSidebar, setShowFilterSidebar] = useState(false);
	const [filterData, setFilterData] = useState({
		title: "",
		contact: "",
		category: "",
		status: "",
		dateStart: "",
		dateEnd: "",
		minValue: "",
		maxValue: "",
	});

	// State for modals
	const [leadToDelete, setLeadToDelete] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [leadToView, setLeadToView] = useState(null);
	const [showLeadDetailsModal, setShowLeadDetailsModal] = useState(false);
	const [leadToEdit, setLeadToEdit] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [leadToManage, setLeadToManage] = useState(null);
	const [showManageModal, setShowManageModal] = useState(false);

	// Ensure hydration
	useEffect(() => {
		setMounted(true);
	}, []);

	// Filter leads based on search query
	const filteredLeads = leads.filter((lead) => {
		const matchesSearch =
			lead.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			lead.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			lead.contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			lead.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
			lead.status.toLowerCase().includes(searchQuery.toLowerCase());

		return matchesSearch;
	});

	// Sort leads
	const sortedLeads = [...filteredLeads].sort((a, b) => {
		if (!sortConfig.key) return 0;

		let aValue, bValue;

		// Handle nested properties
		if (sortConfig.key === "contact") {
			aValue = a.contact.name;
			bValue = b.contact.name;
		} else if (sortConfig.key === "assignedUsers") {
			aValue = a.assignedUsers.length;
			bValue = b.assignedUsers.length;
		} else {
			aValue = a[sortConfig.key];
			bValue = b[sortConfig.key];
		}

		if (aValue < bValue) {
			return sortConfig.direction === "ascending" ? -1 : 1;
		}
		if (aValue > bValue) {
			return sortConfig.direction === "ascending" ? 1 : -1;
		}
		return 0;
	});

	// Handle sort
	const requestSort = (key) => {
		let direction = "ascending";
		if (sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	// Handle select all
	const handleSelectAll = (checked) => {
		if (checked) {
			setSelectedLeads(sortedLeads.map((lead) => lead.id));
		} else {
			setSelectedLeads([]);
		}
	};

	// Handle select individual lead
	const handleSelectLead = (leadId, checked) => {
		if (checked) {
			setSelectedLeads([...selectedLeads, leadId]);
		} else {
			setSelectedLeads(selectedLeads.filter((id) => id !== leadId));
		}
	};

	// Handle delete lead
	const handleDeleteLead = (leadId) => {
		const lead = leads.find((lead) => lead.id === leadId);
		setLeadToDelete(lead);
		setShowDeleteModal(true);
	};

	// Handle view lead details
	const handleViewLead = (leadId) => {
		const lead = leads.find((lead) => lead.id === leadId);
		setLeadToView(lead);
		setShowLeadDetailsModal(true);
	};

	// Confirm delete lead
	const confirmDeleteLead = () => {
		if (leadToDelete) {
			setLeads(leads.filter((lead) => lead.id !== leadToDelete.id));
			setSelectedLeads(selectedLeads.filter((id) => id !== leadToDelete.id));
			setShowDeleteModal(false);
			setLeadToDelete(null);
		}
	};

	// Handle bulk delete
	const handleBulkDelete = () => {
		setLeads(leads.filter((lead) => !selectedLeads.includes(lead.id)));
		setSelectedLeads([]);
	};

	// Handle edit lead
	const handleEditLead = (leadId) => {
		const lead = leads.find((lead) => lead.id === leadId);
		setLeadToEdit(lead);
		setShowEditModal(true);
	};

	// Handle manage lead (combined assign users and change status)
	const handleManageLead = (leadId) => {
		const lead = leads.find((lead) => lead.id === leadId);
		setLeadToManage(lead);
		setShowManageModal(true);
	};

	// Handle update lead
	const handleUpdateLead = (leadId, leadData) => {
		setLeads(
			leads.map((lead) => {
				if (lead.id === leadId) {
					return { ...lead, ...leadData };
				}
				return lead;
			})
		);
	};

	// Get sort icon
	const getSortIcon = (key) => {
		if (sortConfig.key !== key) {
			return <ArrowUpDown className="h-4 w-4 ml-1 text-slate-400" />;
		}
		return sortConfig.direction === "ascending" ? (
			<ChevronUp className="h-4 w-4 ml-1 text-primary" />
		) : (
			<ChevronDown className="h-4 w-4 ml-1 text-primary" />
		);
	};

	// Get status badge color
	const getStatusBadgeColor = (status) => {
		switch (status) {
			case "New":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40";
			case "Contacted":
				return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/40";
			case "Qualified":
				return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/40";
			case "Proposal Sent":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-900/40";
			case "Converted":
				return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 group-hover:bg-green-200 dark:group-hover:bg-green-900/40";
			case "Disqualified":
				return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 group-hover:bg-red-200 dark:group-hover:bg-red-900/40";
			default:
				return "bg-slate-100 text-slate-800 dark:bg-slate-700/30 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700/40";
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

	// Format currency
	const formatCurrency = (value) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
		}).format(value);
	};

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { type: "spring", stiffness: 300, damping: 24 },
		},
	};

	const handleReset = () => {
		setSearchQuery("");
		setFilterData({
			title: "",
			contact: "",
			category: "",
			status: "",
			dateStart: "",
			dateEnd: "",
			minValue: "",
			maxValue: "",
		});
	};

	if (!mounted) return null;

	return (
		<div className="space-y-6 p-6">
			{/* Header */}
			<motion.div
				className="flex flex-col md:flex-row md:items-center justify-between gap-4"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}>
				<div>
					<h1 className="text-2xl font-bold gradient-text">Leads Management</h1>
					<p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
						Manage all leads and their status
					</p>
				</div>

				<div className="flex items-center gap-3">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
						<Input
							type="search"
							placeholder="Search leads..."
							className="pl-9 h-10 md:w-[300px] bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					<Button
						variant="outline"
						size="icon"
						className="h-10 w-10 border-slate-200 dark:border-slate-700"
						onClick={() => setShowFilterSidebar(true)}>
						<Filter className="h-4 w-4" />
					</Button>

					<Button
						onClick={() => setShowCreateModal(true)}
						className="h-10 w-10 md:w-auto md:px-4 rounded-lg bg-primary hover:bg-primary/90 text-white">
						<Plus className="h-5 w-5 md:mr-2" />
						<span className="hidden md:inline">Add Lead</span>
					</Button>
				</div>
			</motion.div>

			{/* Leads Table */}
			<motion.div
				className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-md"
				variants={containerVariants}
				initial="hidden"
				animate="visible">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-slate-200 dark:border-slate-700">
								<th className="px-6 py-4 text-left">
									<div className="relative flex items-center">
										<Checkbox
											checked={
												sortedLeads.length > 0 &&
												selectedLeads.length === sortedLeads.length
											}
											onCheckedChange={handleSelectAll}
											className="data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-md h-5 w-5"
										/>
										<div className="absolute -right-2 top-0 h-full w-px bg-slate-200 dark:bg-slate-700/50"></div>
									</div>
								</th>
								<th className="px-6 py-4 text-left">
									<button
										className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
										onClick={() => requestSort("title")}>
										Title {getSortIcon("title")}
									</button>
								</th>
								<th className="px-6 py-4 text-left">
									<button
										className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
										onClick={() => requestSort("contact")}>
										Contact {getSortIcon("contact")}
									</button>
								</th>
								<th className="px-6 py-4 text-left">
									<button
										className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
										onClick={() => requestSort("createdAt")}>
										Created At {getSortIcon("createdAt")}
									</button>
								</th>
								<th className="px-6 py-4 text-left">
									<button
										className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
										onClick={() => requestSort("value")}>
										Value {getSortIcon("value")}
									</button>
								</th>
								<th className="px-6 py-4 text-left">
									<button
										className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
										onClick={() => requestSort("assignedUsers")}>
										Assigned {getSortIcon("assignedUsers")}
									</button>
								</th>
								<th className="px-6 py-4 text-left">
									<button
										className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
										onClick={() => requestSort("status")}>
										Status {getSortIcon("status")}
									</button>
								</th>
								<th className="px-6 py-4 text-center">
									<span className="text-sm font-medium text-slate-700 dark:text-slate-300">
										Actions
									</span>
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
							{sortedLeads.length === 0 ? (
								<tr>
									<td
										colSpan={7}
										className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
										<div className="flex flex-col items-center justify-center">
											<div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-700/30 flex items-center justify-center mb-4">
												<FileText className="h-10 w-10 text-slate-400 dark:text-slate-500" />
											</div>
											<p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-1">
												No leads found
											</p>
											<p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
												Try adjusting your search or filter to find what you're
												looking for.
											</p>
											<Button
												variant="outline"
												className="mt-4 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
												onClick={handleReset}>
												Reset Filters
											</Button>
										</div>
									</td>
								</tr>
							) : (
								sortedLeads.map((lead, index) => (
									<motion.tr
										key={lead.id}
										className={`group transition-colors ${
											selectedLeads.includes(lead.id)
												? "bg-primary/5 dark:bg-primary/10"
												: "hover:bg-slate-50 dark:hover:bg-slate-700/20"
										}`}
										variants={itemVariants}
										custom={index * 0.03}>
										<td className="px-6 py-4">
											<Checkbox
												checked={selectedLeads.includes(lead.id)}
												onCheckedChange={(checked) =>
													handleSelectLead(lead.id, checked)
												}
												className="data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-md h-5 w-5"
											/>
										</td>
										<td className="px-6 py-4">
											<button
												className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors"
												onClick={() => handleViewLead(lead.id)}>
												{lead.title}
											</button>
										</td>
										<td className="px-6 py-4">
											<div className="flex flex-col">
												<span className="text-sm font-medium text-slate-700 dark:text-slate-300">
													{lead.contact.name}
												</span>
												<div className="flex items-center gap-2 mt-1">
													<span className="text-xs text-slate-500 dark:text-slate-400">
														{lead.contact.email}
													</span>
												</div>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center">
												<span className="text-sm text-slate-700 dark:text-slate-300">
													{lead.createdAt}
												</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium text-slate-700 dark:text-slate-300">
													{formatCurrency(lead.value)}
												</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="relative">
												<div className="flex -space-x-2">
													{lead.assignedUsers.slice(0, 2).map((user) => (
														<div key={user.id} className="relative">
															<div className="group">
																<Avatar className="border-2 border-white dark:border-slate-800 cursor-default">
																	<AvatarImage
																		src={user.avatar || "/placeholder.svg"}
																		alt={user.name}
																	/>
																	<AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-medium">
																		{user.name
																			.split(" ")
																			.map((n) => n[0])
																			.join("")}
																	</AvatarFallback>
																</Avatar>
															</div>
														</div>
													))}

													{lead.assignedUsers.length > 0 && (
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	variant="ghost"
																	className="h-10 w-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700 p-0 flex items-center justify-center !ring-0 !ring-offset-0 focus:outline-none">
																	<span className="text-xs font-medium">
																		...
																	</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent
																align="end"
																className="w-56 p-2">
																<div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 px-2">
																	Assigned Members
																</div>
																{lead.assignedUsers.map((user) => (
																	<DropdownMenuItem
																		key={user.id}
																		className="flex items-center gap-2 px-2 py-1.5 cursor-default">
																		<Avatar className="h-8 w-8">
																			<AvatarImage
																				src={user.avatar || "/placeholder.svg"}
																				alt={user.name}
																			/>
																			<AvatarFallback className="text-xs">
																				{user.name
																					.split(" ")
																					.map((n) => n[0])
																					.join("")}
																			</AvatarFallback>
																		</Avatar>
																		<span className="text-sm">{user.name}</span>
																	</DropdownMenuItem>
																))}
															</DropdownMenuContent>
														</DropdownMenu>
													)}
												</div>
											</div>
										</td>
										<td className="px-6 py-4">
											<span
												className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${getStatusBadgeColor(
													lead.status
												)}`}>
												{getStatusIcon(lead.status)}
												{lead.status}
											</span>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center justify-center gap-1">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => handleEditLead(lead.id)}
													className="h-8 w-8 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-full">
													<Edit2 className="h-4 w-4" />
													<span className="sr-only">Edit</span>
												</Button>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => handleManageLead(lead.id)}
													className="h-8 w-8 text-slate-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-full">
													<Settings className="h-4 w-4" />
													<span className="sr-only">Manage Lead</span>
												</Button>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full">
													<Mail className="h-4 w-4" />
													<span className="sr-only">Email</span>
												</Button>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
													onClick={() => handleDeleteLead(lead.id)}>
													<Trash2 className="h-4 w-4" />
													<span className="sr-only">Delete</span>
												</Button>

												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-full !ring-0 !ring-offset-0 focus:outline-none">
															<MoreHorizontal className="h-4 w-4" />
															<span className="sr-only">More</span>
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent
														align="end"
														className="w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
														<DropdownMenuItem
															className="text-slate-700 dark:text-slate-300 focus:bg-slate-100 dark:focus:bg-slate-700/50 cursor-pointer"
															onClick={() => handleViewLead(lead.id)}>
															<Eye className="h-4 w-4 mr-2" />
															View Details
														</DropdownMenuItem>
														<DropdownMenuItem
															className="text-slate-700 dark:text-slate-300 focus:bg-slate-100 dark:focus:bg-slate-700/50 cursor-pointer"
															onClick={() => handleManageLead(lead.id)}>
															<Settings className="h-4 w-4 mr-2" />
															Manage Lead
														</DropdownMenuItem>
														<DropdownMenuItem className="text-slate-700 dark:text-slate-300 focus:bg-slate-100 dark:focus:bg-slate-700/50 cursor-pointer">
															<Download className="h-4 w-4 mr-2" />
															Export Data
														</DropdownMenuItem>
														<DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
														<DropdownMenuItem
															className="text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20 cursor-pointer"
															onClick={() => handleDeleteLead(lead.id)}>
															<Trash2 className="h-4 w-4 mr-2" />
															Delete Lead
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										</td>
									</motion.tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* Table footer with pagination */}
				{sortedLeads.length > 0 && (
					<div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
						<div className="text-sm text-slate-500 dark:text-slate-400">
							Showing{" "}
							<span className="font-medium text-slate-700 dark:text-slate-300">
								{sortedLeads.length}
							</span>{" "}
							of{" "}
							<span className="font-medium text-slate-700 dark:text-slate-300">
								{leads.length}
							</span>{" "}
							leads
						</div>
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="sm"
								className="h-8 px-3 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-50"
								disabled>
								Previous
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="h-8 w-8 p-0 flex items-center justify-center border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800">
								1
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="h-8 px-3 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
								Next
							</Button>
						</div>
					</div>
				)}
			</motion.div>

			{/* Bulk Actions */}
			{selectedLeads.length > 0 && (
				<motion.div
					className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}>
					<div className="bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-900 dark:to-slate-800 text-white px-6 py-3 rounded-full shadow-xl border border-slate-700/50 dark:border-slate-600/30 backdrop-blur-sm flex items-center gap-4">
						<div className="flex items-center gap-2">
							<div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
								<span className="text-xs font-bold text-primary">
									{selectedLeads.length}
								</span>
							</div>
							<span className="text-sm font-medium">leads selected</span>
						</div>
						<div className="h-4 w-px bg-slate-600/50 dark:bg-slate-500/50"></div>
						<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="sm"
								className="h-8 text-slate-200 hover:text-white hover:bg-red-500/20 dark:hover:bg-red-500/10 transition-colors"
								onClick={handleBulkDelete}>
								<Trash2 className="h-4 w-4 mr-1" />
								Delete
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="h-8 text-slate-200 hover:text-white hover:bg-blue-500/20 dark:hover:bg-blue-500/10 transition-colors">
								<Mail className="h-4 w-4 mr-1" />
								Email
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="h-8 text-slate-200 hover:text-white hover:bg-green-500/20 dark:hover:bg-green-500/10 transition-colors">
								<Download className="h-4 w-4 mr-1" />
								Export
							</Button>
						</div>
					</div>
				</motion.div>
			)}

			{/* Create Lead Modal */}
			<AnimatePresence>
				{showCreateModal && (
					<CreateLeadModal
						isOpen={showCreateModal}
						onClose={() => setShowCreateModal(false)}
						onCreateLead={(leadData) => {
							setLeads([...leads, { id: leads.length + 1, ...leadData }]);
							setShowCreateModal(false);
						}}
					/>
				)}
			</AnimatePresence>

			{/* Filter Sidebar */}
			<AnimatePresence>
				{showFilterSidebar && (
					<FilterSidebar
						onClose={() => setShowFilterSidebar(false)}
						filterData={filterData}
						setFilterData={setFilterData}
						onApplyFilter={() => {
							// Apply filter logic here
							setShowFilterSidebar(false);
						}}
					/>
				)}
			</AnimatePresence>

			{/* Delete Lead Modal */}
			<AnimatePresence>
				{showDeleteModal && leadToDelete && (
					<DeleteLeadModal
						isOpen={showDeleteModal}
						lead={leadToDelete}
						onClose={() => {
							setShowDeleteModal(false);
							setLeadToDelete(null);
						}}
						onConfirm={confirmDeleteLead}
					/>
				)}
			</AnimatePresence>

			{/* Lead Details Modal */}
			<AnimatePresence>
				{showLeadDetailsModal && leadToView && (
					<LeadDetailsModal
						lead={leadToView}
						onClose={() => {
							setShowLeadDetailsModal(false);
							setLeadToView(null);
						}}
					/>
				)}
			</AnimatePresence>

			{/* Edit Lead Modal */}
			<AnimatePresence>
				{showEditModal && leadToEdit && (
					<UpdateLeadModal
						isOpen={showEditModal}
						onClose={() => {
							setShowEditModal(false);
							setLeadToEdit(null);
						}}
						lead={leadToEdit}
						onUpdateLead={handleUpdateLead}
					/>
				)}
			</AnimatePresence>

			{/* Lead Management Modal (Combined Assign Users and Change Status) */}
			<AnimatePresence>
				{showManageModal && leadToManage && (
					<LeadManagementModal
						isOpen={showManageModal}
						onClose={() => {
							setShowManageModal(false);
							setLeadToManage(null);
						}}
						lead={leadToManage}
						onUpdateLead={handleUpdateLead}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
