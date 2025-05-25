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
	Lock,
	MoreHorizontal,
	Download,
	Eye,
	AlertCircle,
	CheckCircle2,
	User,
	Building,
	Filter,
	ArrowUpDown,
	ChevronDown,
	ChevronUp,
	Users,
	Briefcase,
	Shield,
	UserCheck,
} from "lucide-react";

// Import the modal components
import DeleteUserModal from "../components/client-users/delete-user-modal";
import UserDetailsModal from "../components/client-users/user-details-modal";
import CreateUserModal from "../components/client-users/create-user-modal";
import ChangeUserPasswordModal from "../components/client-users/user-password-modal";
import UpdateUserModal from "../components/client-users/update-user-modal";
import FilterSidebar from "../components/client-users/filter-sidebar";

// import ClientFilterSidebar from "../components/client-users/client-filter-sidebar";
// import DeleteClientModal from "../components/client-users/delete-client-modal";
// import ClientDetailsModal from "../components/client-users/client-details-modal";
// import UpdateClientModal from "../components/client-users/update-client-modal";
// import CreateClientModal from "../components/client-users/create-client-modal";

// Mock data for users
const mockUsers = [
	{
		id: 1,
		name: "Amanda Omar",
		firstName: "Amanda",
		lastName: "Omar",
		avatar: "/placeholder.svg?height=40&width=40",
		company: "Wholesome Foods Inc",
		companyName: "Wholesome Foods Inc",
		email: "amanda@example.com",
		telephone: "(555) 123-4567",
		position: "Marketing Director",
		timeZone: "America/New_York",
		twitter: "amandaomar",
		facebook: "amandaomar",
		instagram: "amanda.omar",
		linkedin: "amandaomar",
		telegram: "amandaomar",
		whatsapp: "amandaomar",
		github: "aomar",
		dribble: "",
		status: "active",
		role: "Owner",
	},
	{
		id: 2,
		name: "Amy Davis",
		firstName: "Amy",
		lastName: "Davis",
		avatar: "/placeholder.svg?height=40&width=40",
		company: "Fast Applications LLC",
		companyName: "Fast Applications LLC",
		email: "amy@example.com",
		telephone: "(555) 234-5678",
		position: "Product Manager",
		timeZone: "Europe/London",
		twitter: "amydavis",
		facebook: "",
		instagram: "amy.davis",
		linkedin: "amydavis",
		github: "",
		dribble: "",
		status: "active",
		role: "User",
	},
	// More users...
];

// Mock data for clients
const mockClients = [
	{
		id: 1,
		name: "Acme Corporation",
		contactName: "John Smith",
		avatar: "/diverse-business-team.png",
		email: "contact@acme.com",
		telephone: "(555) 111-2222",
		position: "CEO",
		industry: "Technology",
		location: "New York, USA",
		status: "active",
		type: "Enterprise",
	},
	{
		id: 2,
		name: "Globex Industries",
		contactName: "Jane Doe",
		avatar: "/diverse-business-team.png",
		email: "info@globex.com",
		telephone: "(555) 333-4444",
		position: "CTO",
		industry: "Manufacturing",
		location: "Chicago, USA",
		status: "active",
		type: "Mid-Market",
	},
	{
		id: 3,
		name: "Initech Solutions",
		contactName: "Michael Bolton",
		avatar: "/diverse-business-team.png",
		email: "contact@initech.com",
		telephone: "(555) 555-6666",
		position: "Director",
		industry: "Finance",
		location: "Austin, USA",
		status: "inactive",
		type: "Small Business",
	},
	{
		id: 4,
		name: "Umbrella Corporation",
		contactName: "Albert Wesker",
		avatar: "/diverse-business-team.png",
		email: "info@umbrella.com",
		telephone: "(555) 777-8888",
		position: "Research Lead",
		industry: "Pharmaceuticals",
		location: "Raccoon City, USA",
		status: "active",
		type: "Enterprise",
	},
	{
		id: 5,
		name: "Stark Industries",
		contactName: "Tony Stark",
		avatar: "/diverse-business-team.png",
		email: "tony@stark.com",
		telephone: "(555) 999-0000",
		position: "CEO",
		industry: "Defense",
		location: "Malibu, USA",
		status: "active",
		type: "Enterprise",
	},
	{
		id: 6,
		name: "Wayne Enterprises",
		contactName: "Bruce Wayne",
		avatar: "/diverse-business-team.png",
		email: "bruce@wayne.com",
		telephone: "(555) 123-9876",
		position: "CEO",
		industry: "Conglomerate",
		location: "Gotham City, USA",
		status: "active",
		type: "Enterprise",
	},
	{
		id: 7,
		name: "Oscorp Industries",
		contactName: "Norman Osborn",
		avatar: "/diverse-business-team.png",
		email: "norman@oscorp.com",
		telephone: "(555) 456-7890",
		position: "Founder",
		industry: "Research",
		location: "New York, USA",
		status: "inactive",
		type: "Mid-Market",
	},
	{
		id: 8,
		name: "LexCorp",
		contactName: "Lex Luthor",
		avatar: "/diverse-business-team.png",
		email: "lex@lexcorp.com",
		telephone: "(555) 321-6547",
		position: "President",
		industry: "Technology",
		location: "Metropolis, USA",
		status: "active",
		type: "Enterprise",
	},
];

export default function Client() {
	const [mounted, setMounted] = useState(false);
	const [activeTab, setActiveTab] = useState("clients"); // Default to clients tab
	const [users, setUsers] = useState(mockUsers);
	const [clients, setClients] = useState(mockClients);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [selectedClients, setSelectedClients] = useState([]);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
	const [showCreateUserModal, setShowCreateUserModal] = useState(false);
	const [showCreateClientModal, setShowCreateClientModal] = useState(false);
	const [showUserFilterSidebar, setShowUserFilterSidebar] = useState(false);
	const [showClientFilterSidebar, setShowClientFilterSidebar] = useState(false);
	const [userFilterData, setUserFilterData] = useState({
		companyName: "",
		name: "",
		email: "",
		userType: "",
		dateStart: "",
		dateEnd: "",
	});
	const [clientFilterData, setClientFilterData] = useState({
		industry: "",
		name: "",
		email: "",
		clientType: "",
		dateStart: "",
		dateEnd: "",
	});

	// State for modals
	const [userToDelete, setUserToDelete] = useState(null);
	const [clientToDelete, setClientToDelete] = useState(null);
	const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
	const [showDeleteClientModal, setShowDeleteClientModal] = useState(false);
	const [userToView, setUserToView] = useState(null);
	const [clientToView, setClientToView] = useState(null);
	const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
	const [showClientDetailsModal, setShowClientDetailsModal] = useState(false);
	const [userToChangePassword, setUserToChangePassword] = useState(null);
	const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
	const [userToEdit, setUserToEdit] = useState(null);
	const [clientToEdit, setClientToEdit] = useState(null);
	const [showEditUserModal, setShowEditUserModal] = useState(false);
	const [showEditClientModal, setShowEditClientModal] = useState(false);

	// Ensure hydration
	useEffect(() => {
		setMounted(true);
	}, []);

	// Filter users based on search query
	const filteredUsers = users.filter((user) => {
		const matchesSearch =
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.role.toLowerCase().includes(searchQuery.toLowerCase());

		return matchesSearch;
	});

	// Filter clients based on search query
	const filteredClients = clients.filter((client) => {
		const matchesSearch =
			client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			client.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			client.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
			client.type.toLowerCase().includes(searchQuery.toLowerCase());

		return matchesSearch;
	});

	// Sort users
	const sortedUsers = [...filteredUsers].sort((a, b) => {
		if (!sortConfig.key) return 0;

		if (a[sortConfig.key] < b[sortConfig.key]) {
			return sortConfig.direction === "ascending" ? -1 : 1;
		}
		if (a[sortConfig.key] > b[sortConfig.key]) {
			return sortConfig.direction === "ascending" ? 1 : -1;
		}
		return 0;
	});

	// Sort clients
	const sortedClients = [...filteredClients].sort((a, b) => {
		if (!sortConfig.key) return 0;

		if (a[sortConfig.key] < b[sortConfig.key]) {
			return sortConfig.direction === "ascending" ? -1 : 1;
		}
		if (a[sortConfig.key] > b[sortConfig.key]) {
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

	// Handle select all users
	const handleSelectAllUsers = (checked) => {
		if (checked) {
			setSelectedUsers(sortedUsers.map((user) => user.id));
		} else {
			setSelectedUsers([]);
		}
	};

	// Handle select all clients
	const handleSelectAllClients = (checked) => {
		if (checked) {
			setSelectedClients(sortedClients.map((client) => client.id));
		} else {
			setSelectedClients([]);
		}
	};

	// Handle select individual user
	const handleSelectUser = (userId, checked) => {
		if (checked) {
			setSelectedUsers([...selectedUsers, userId]);
		} else {
			setSelectedUsers(selectedUsers.filter((id) => id !== userId));
		}
	};

	// Handle select individual client
	const handleSelectClient = (clientId, checked) => {
		if (checked) {
			setSelectedClients([...selectedClients, clientId]);
		} else {
			setSelectedClients(selectedClients.filter((id) => id !== clientId));
		}
	};

	// Handle delete user
	const handleDeleteUser = (userId) => {
		const user = users.find((user) => user.id === userId);
		setUserToDelete(user);
		setShowDeleteUserModal(true);
	};

	// Handle delete client
	const handleDeleteClient = (clientId) => {
		const client = clients.find((client) => client.id === clientId);
		setClientToDelete(client);
		setShowDeleteClientModal(true);
	};

	// Handle view user details
	const handleViewUser = (userId) => {
		const user = users.find((user) => user.id === userId);
		setUserToView(user);
		setShowUserDetailsModal(true);
	};

	// Handle view client details
	const handleViewClient = (clientId) => {
		const client = clients.find((client) => client.id === clientId);
		setClientToView(client);
		setShowClientDetailsModal(true);
	};

	// Confirm delete user
	const confirmDeleteUser = () => {
		if (userToDelete) {
			setUsers(users.filter((user) => user.id !== userToDelete.id));
			setSelectedUsers(selectedUsers.filter((id) => id !== userToDelete.id));
			setShowDeleteUserModal(false);
			setUserToDelete(null);
		}
	};

	// Confirm delete client
	const confirmDeleteClient = () => {
		if (clientToDelete) {
			setClients(clients.filter((client) => client.id !== clientToDelete.id));
			setSelectedClients(
				selectedClients.filter((id) => id !== clientToDelete.id)
			);
			setShowDeleteClientModal(false);
			setClientToDelete(null);
		}
	};

	// Handle bulk delete users
	const handleBulkDeleteUsers = () => {
		setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
		setSelectedUsers([]);
	};

	// Handle bulk delete clients
	const handleBulkDeleteClients = () => {
		setClients(
			clients.filter((client) => !selectedClients.includes(client.id))
		);
		setSelectedClients([]);
	};

	// Handle change user password
	const handleChangeUserPassword = (userId) => {
		const user = users.find((user) => user.id === userId);
		setUserToChangePassword(user);
		setShowChangePasswordModal(true);
	};

	// Handle password change
	const handlePasswordChange = (userId, newPassword) => {
		console.log(`Password changed for user ID ${userId} to: ${newPassword}`);
		// Here you would typically call your API to update the password
	};

	// Handle edit user
	const handleEditUser = (userId) => {
		const user = users.find((user) => user.id === userId);
		setUserToEdit(user);
		setShowEditUserModal(true);
	};

	// Handle edit client
	const handleEditClient = (clientId) => {
		const client = clients.find((client) => client.id === clientId);
		setClientToEdit(client);
		setShowEditClientModal(true);
	};

	// Handle update user
	const handleUpdateUser = (userId, userData) => {
		setUsers(
			users.map((user) => {
				if (user.id === userId) {
					return { ...user, ...userData };
				}
				return user;
			})
		);
	};

	// Handle update client
	const handleUpdateClient = (clientId, clientData) => {
		setClients(
			clients.map((client) => {
				if (client.id === clientId) {
					return { ...client, ...clientData };
				}
				return client;
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

	// Get role badge color
	const getRoleBadgeColor = (role) => {
		switch (role) {
			case "Owner":
				return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
			case "User":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
			default:
				return "bg-slate-100 text-slate-800 dark:bg-slate-700/30 dark:text-slate-400";
		}
	};

	// Get role icon
	const getRoleIcon = (role) => {
		switch (role) {
			case "Owner":
				return <Shield className="h-3 w-3 mr-1" />;
			case "User":
				return <UserCheck className="h-3 w-3 mr-1" />;
			default:
				return <User className="h-3 w-3 mr-1" />;
		}
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

	const tabVariants = {
		inactive: { opacity: 0.7 },
		active: {
			opacity: 1,
			transition: { duration: 0.3 },
		},
	};

	const handleReset = () => {
		setSearchQuery("");
		if (activeTab === "users") {
			setUserFilterData({
				companyName: "",
				name: "",
				email: "",
				userType: "",
				dateStart: "",
				dateEnd: "",
			});
		} else {
			setClientFilterData({
				industry: "",
				name: "",
				email: "",
				clientType: "",
				dateStart: "",
				dateEnd: "",
			});
		}
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
					<h1 className="text-2xl font-bold gradient-text">
						Client Management
					</h1>
					<p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
						Manage all clients and users
					</p>
				</div>

				<div className="flex items-center gap-3">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
						<Input
							type="search"
							placeholder={
								activeTab === "users" ? "Search users..." : "Search clients..."
							}
							className="pl-9 h-10 md:w-[300px] bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					<Button
						variant="outline"
						size="icon"
						className="h-10 w-10 border-slate-200 dark:border-slate-700"
						onClick={() =>
							activeTab === "users"
								? setShowUserFilterSidebar(true)
								: setShowClientFilterSidebar(true)
						}>
						<Filter className="h-4 w-4" />
					</Button>

					<Button
						onClick={() =>
							activeTab === "users"
								? setShowCreateUserModal(true)
								: setShowCreateClientModal(true)
						}
						className="h-10 w-10 md:w-auto md:px-4 rounded-lg bg-primary hover:bg-primary/90 text-white">
						<Plus className="h-5 w-5 md:mr-2" />
						<span className="hidden md:inline">
							{activeTab === "users" ? "Add User" : "Add Client"}
						</span>
					</Button>
				</div>
			</motion.div>

			{/* Tabs */}
			<div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
				<motion.button
					className={`py-3 px-6 font-medium text-sm transition-colors relative flex items-center gap-2 ${
						activeTab === "clients"
							? "text-primary border-b-2 border-primary"
							: "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
					}`}
					onClick={() => setActiveTab("clients")}
					variants={tabVariants}
					animate={activeTab === "clients" ? "active" : "inactive"}>
					<Briefcase className="h-4 w-4" />
					Clients
				</motion.button>
				<motion.button
					className={`py-3 px-6 font-medium text-sm transition-colors relative flex items-center gap-2 ${
						activeTab === "users"
							? "text-primary border-b-2 border-primary"
							: "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
					}`}
					onClick={() => setActiveTab("users")}
					variants={tabVariants}
					animate={activeTab === "users" ? "active" : "inactive"}>
					<Users className="h-4 w-4" />
					Users
				</motion.button>
			</div>

			{/* Client Table */}
			{activeTab === "clients" && (
				<motion.div
					className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-md"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					key="clients-table">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b border-slate-200 dark:border-slate-700">
									<th className="px-6 py-4 text-left">
										<div className="relative flex items-center">
											<Checkbox
												checked={
													sortedClients.length > 0 &&
													selectedClients.length === sortedClients.length
												}
												onCheckedChange={handleSelectAllClients}
												className="data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-md h-5 w-5"
											/>
											<div className="absolute -right-2 top-0 h-full w-px bg-slate-200 dark:bg-slate-700/50"></div>
										</div>
									</th>
									<th className="px-6 py-4 text-left">
										<button
											className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
											onClick={() => requestSort("name")}>
											Company {getSortIcon("name")}
										</button>
									</th>
									<th className="px-6 py-4 text-left">
										<button
											className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
											onClick={() => requestSort("contactName")}>
											Contact {getSortIcon("contactName")}
										</button>
									</th>
									<th className="px-6 py-4 text-left">
										<button
											className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
											onClick={() => requestSort("email")}>
											Email {getSortIcon("email")}
										</button>
									</th>
									<th className="px-6 py-4 text-left">
										<button
											className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
											onClick={() => requestSort("position")}>
											Position {getSortIcon("position")}
										</button>
									</th>
									<th className="px-6 py-4 text-left">
										<button
											className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
											onClick={() => requestSort("type")}>
											Type {getSortIcon("type")}
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
								{sortedClients.length === 0 ? (
									<tr>
										<td
											colSpan={8}
											className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
											<div className="flex flex-col items-center justify-center">
												<div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-700/30 flex items-center justify-center mb-4">
													<Building className="h-10 w-10 text-slate-400 dark:text-slate-500" />
												</div>
												<p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-1">
													No clients found
												</p>
												<p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
													Try adjusting your search or filter to find what
													you're looking for.
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
									sortedClients.map((client, index) => (
										<motion.tr
											key={client.id}
											className={`group transition-colors ${
												selectedClients.includes(client.id)
													? "bg-primary/5 dark:bg-primary/10"
													: "hover:bg-slate-50 dark:hover:bg-slate-700/20"
											}`}
											variants={itemVariants}
											custom={index * 0.03}>
											<td className="px-6 py-4">
												<Checkbox
													checked={selectedClients.includes(client.id)}
													onCheckedChange={(checked) =>
														handleSelectClient(client.id, checked)
													}
													className="data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-md h-5 w-5"
												/>
											</td>
											<td className="px-6 py-4">
												<div className="flex items-center gap-3">
													<div className="relative">
														<Avatar className="h-10 w-10 border-2 border-white dark:border-slate-700 shadow-sm transition-transform group-hover:scale-105">
															<AvatarImage
																src={client.avatar || "/placeholder.svg"}
																alt={client.name}
															/>
															<AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-medium">
																{client.name
																	.split(" ")
																	.map((n) => n[0])
																	.join("")}
															</AvatarFallback>
														</Avatar>
														{client.status === "active" && (
															<span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-slate-700"></span>
														)}
													</div>
													<div>
														<button
															className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors"
															onClick={() => handleViewClient(client.id)}>
															{client.name}
														</button>
														<p className="text-xs text-slate-500 dark:text-slate-400">
															{client.industry}
														</p>
													</div>
												</div>
											</td>
											<td className="px-6 py-4">
												<span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
													{client.contactName}
												</span>
											</td>
											<td className="px-6 py-4">
												<div className="flex items-center gap-2">
													<div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
														<Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
													</div>
													<span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
														{client.email}
													</span>
												</div>
											</td>
											<td className="px-6 py-4">
												<span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
													{client.position}
												</span>
											</td>
											<td className="px-6 py-4">
												<span
													className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
														client.type === "Enterprise"
															? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40"
															: client.type === "Mid-Market"
															? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40"
															: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 group-hover:bg-green-200 dark:group-hover:bg-green-900/40"
													}`}>
													{client.type}
												</span>
											</td>
											<td className="px-6 py-4">
												<span
													className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
														client.status === "active"
															? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 group-hover:bg-green-200 dark:group-hover:bg-green-900/40"
															: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 group-hover:bg-red-200 dark:group-hover:bg-red-900/40"
													}`}>
													{client.status === "active" ? (
														<CheckCircle2 className="h-3 w-3" />
													) : (
														<AlertCircle className="h-3 w-3" />
													)}
													{client.status === "active" ? "Active" : "Inactive"}
												</span>
											</td>
											<td className="px-6 py-4">
												<div className="flex items-center justify-center gap-1">
													<Button
														variant="ghost"
														size="icon"
														onClick={() => handleEditClient(client.id)}
														className="h-8 w-8 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-full">
														<Edit2 className="h-4 w-4" />
														<span className="sr-only">Edit</span>
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
														onClick={() => handleDeleteClient(client.id)}>
														<Trash2 className="h-4 w-4" />
														<span className="sr-only">Delete</span>
													</Button>
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button
																variant="ghost"
																size="icon"
																className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-full">
																<MoreHorizontal className="h-4 w-4" />
																<span className="sr-only">More</span>
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent
															align="end"
															className="w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
															<DropdownMenuItem
																className="text-slate-700 dark:text-slate-300 focus:bg-slate-100 dark:focus:bg-slate-700/50 cursor-pointer"
																onClick={() => handleViewClient(client.id)}>
																<Eye className="h-4 w-4 mr-2" />
																View Details
															</DropdownMenuItem>
															<DropdownMenuItem className="text-slate-700 dark:text-slate-300 focus:bg-slate-100 dark:focus:bg-slate-700/50 cursor-pointer">
																<Download className="h-4 w-4 mr-2" />
																Export Data
															</DropdownMenuItem>
															<DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
															<DropdownMenuItem
																className="text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20 cursor-pointer"
																onClick={() => handleDeleteClient(client.id)}>
																<Trash2 className="h-4 w-4 mr-2" />
																Delete Client
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
					{sortedClients.length > 0 && (
						<div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
							<div className="text-sm text-slate-500 dark:text-slate-400">
								Showing{" "}
								<span className="font-medium text-slate-700 dark:text-slate-300">
									{sortedClients.length}
								</span>{" "}
								of{" "}
								<span className="font-medium text-slate-700 dark:text-slate-300">
									{clients.length}
								</span>{" "}
								clients
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
			)}

			{/* User Table */}
			{activeTab === "users" && (
				<motion.div
					className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-md"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					key="users-table">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b border-slate-200 dark:border-slate-700">
									<th className="px-6 py-4 text-left">
										<div className="relative flex items-center">
											<Checkbox
												checked={
													sortedUsers.length > 0 &&
													selectedUsers.length === sortedUsers.length
												}
												onCheckedChange={handleSelectAllUsers}
												className="data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-md h-5 w-5"
											/>
											<div className="absolute -right-2 top-0 h-full w-px bg-slate-200 dark:bg-slate-700/50"></div>
										</div>
									</th>
									<th className="px-6 py-4 text-left">
										<button
											className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
											onClick={() => requestSort("name")}>
											Name {getSortIcon("name")}
										</button>
									</th>
									<th className="px-6 py-4 text-left">
										<button
											className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
											onClick={() => requestSort("company")}>
											Company {getSortIcon("company")}
										</button>
									</th>
									<th className="px-6 py-4 text-left">
										<button
											className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
											onClick={() => requestSort("email")}>
											Email {getSortIcon("email")}
										</button>
									</th>
									<th className="px-6 py-4 text-left">
										<button
											className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
											onClick={() => requestSort("role")}>
											Role {getSortIcon("role")}
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
								{sortedUsers.length === 0 ? (
									<tr>
										<td
											colSpan={6}
											className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
											<div className="flex flex-col items-center justify-center">
												<div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-700/30 flex items-center justify-center mb-4">
													<User className="h-10 w-10 text-slate-400 dark:text-slate-500" />
												</div>
												<p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-1">
													No users found
												</p>
												<p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
													Try adjusting your search or filter to find what
													you're looking for.
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
									sortedUsers.map((user, index) => (
										<motion.tr
											key={user.id}
											className={`group transition-colors ${
												selectedUsers.includes(user.id)
													? "bg-primary/5 dark:bg-primary/10"
													: "hover:bg-slate-50 dark:hover:bg-slate-700/20"
											}`}
											variants={itemVariants}
											custom={index * 0.03}>
											<td className="px-6 py-4">
												<Checkbox
													checked={selectedUsers.includes(user.id)}
													onCheckedChange={(checked) =>
														handleSelectUser(user.id, checked)
													}
													className="data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-md h-5 w-5"
												/>
											</td>
											<td className="px-6 py-4">
												<div className="flex items-center gap-3">
													<div className="relative">
														<Avatar className="h-10 w-10 border-2 border-white dark:border-slate-700 shadow-sm transition-transform group-hover:scale-105">
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
													<div>
														<button
															className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors"
															onClick={() => handleViewUser(user.id)}>
															{user.name}
														</button>
														<p className="text-xs text-slate-500 dark:text-slate-400">
															{user.role}
														</p>
													</div>
												</div>
											</td>
											<td className="px-6 py-4">
												<div className="max-w-[180px]">
													<span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors truncate block">
														{user.company}
													</span>
												</div>
											</td>
											<td className="px-6 py-4">
												<div className="flex items-center gap-2">
													<div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
														<Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
													</div>
													<span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
														{user.email}
													</span>
												</div>
											</td>
											<td className="px-6 py-4">
												<span
													className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
														user.role
													)}`}>
													{getRoleIcon(user.role)}
													{user.role}
												</span>
											</td>
											<td className="px-6 py-4">
												<div className="flex items-center justify-center gap-1">
													<Button
														variant="ghost"
														size="icon"
														onClick={() => handleEditUser(user.id)}
														className="h-8 w-8 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-full">
														<Edit2 className="h-4 w-4" />
														<span className="sr-only">Edit</span>
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
														onClick={() => handleChangeUserPassword(user.id)}
														className="h-8 w-8 text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-full">
														<Lock className="h-4 w-4" />
														<span className="sr-only">Password</span>
													</Button>
													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8 text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
														onClick={() => handleDeleteUser(user.id)}>
														<Trash2 className="h-4 w-4" />
														<span className="sr-only">Delete</span>
													</Button>
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button
																variant="ghost"
																size="icon"
																className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-full">
																<MoreHorizontal className="h-4 w-4" />
																<span className="sr-only">More</span>
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent
															align="end"
															className="w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
															<DropdownMenuItem
																className="text-slate-700 dark:text-slate-300 focus:bg-slate-100 dark:focus:bg-slate-700/50 cursor-pointer"
																onClick={() => handleViewUser(user.id)}>
																<Eye className="h-4 w-4 mr-2" />
																View Details
															</DropdownMenuItem>
															<DropdownMenuItem className="text-slate-700 dark:text-slate-300 focus:bg-slate-100 dark:focus:bg-slate-700/50 cursor-pointer">
																<Download className="h-4 w-4 mr-2" />
																Export Data
															</DropdownMenuItem>
															<DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
															<DropdownMenuItem
																className="text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20 cursor-pointer"
																onClick={() => handleDeleteUser(user.id)}>
																<Trash2 className="h-4 w-4 mr-2" />
																Delete User
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
					{sortedUsers.length > 0 && (
						<div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
							<div className="text-sm text-slate-500 dark:text-slate-400">
								Showing{" "}
								<span className="font-medium text-slate-700 dark:text-slate-300">
									{sortedUsers.length}
								</span>{" "}
								of{" "}
								<span className="font-medium text-slate-700 dark:text-slate-300">
									{users.length}
								</span>{" "}
								users
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
			)}

			{/* Bulk Actions */}
			{activeTab === "users" && selectedUsers.length > 0 && (
				<motion.div
					className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}>
					<div className="bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-900 dark:to-slate-800 text-white px-6 py-3 rounded-full shadow-xl border border-slate-700/50 dark:border-slate-600/30 backdrop-blur-sm flex items-center gap-4">
						<div className="flex items-center gap-2">
							<div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
								<span className="text-xs font-bold text-primary">
									{selectedUsers.length}
								</span>
							</div>
							<span className="text-sm font-medium">users selected</span>
						</div>
						<div className="h-4 w-px bg-slate-600/50 dark:bg-slate-500/50"></div>
						<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="sm"
								className="h-8 text-slate-200 hover:text-white hover:bg-red-500/20 dark:hover:bg-red-500/10 transition-colors"
								onClick={handleBulkDeleteUsers}>
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

			{/* Bulk Actions for Clients */}
			{activeTab === "clients" && selectedClients.length > 0 && (
				<motion.div
					className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}>
					<div className="bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-900 dark:to-slate-800 text-white px-6 py-3 rounded-full shadow-xl border border-slate-700/50 dark:border-slate-600/30 backdrop-blur-sm flex items-center gap-4">
						<div className="flex items-center gap-2">
							<div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
								<span className="text-xs font-bold text-primary">
									{selectedClients.length}
								</span>
							</div>
							<span className="text-sm font-medium">clients selected</span>
						</div>
						<div className="h-4 w-px bg-slate-600/50 dark:bg-slate-500/50"></div>
						<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="sm"
								className="h-8 text-slate-200 hover:text-white hover:bg-red-500/20 dark:hover:bg-red-500/10 transition-colors"
								onClick={handleBulkDeleteClients}>
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

			{/* Create User Modal */}
			<AnimatePresence>
				{showCreateUserModal && (
					<CreateUserModal
						isOpen={showCreateUserModal}
						onClose={() => setShowCreateUserModal(false)}
						onCreateUser={(userData) => {
							setUsers([
								...users,
								{ id: users.length + 1, ...userData, status: "active" },
							]);
							setShowCreateUserModal(false);
						}}
					/>
				)}
			</AnimatePresence>

			{/* Create Client Modal */}
			<AnimatePresence>
				{showCreateClientModal && (
					<CreateClientModal
						isOpen={showCreateClientModal}
						onClose={() => setShowCreateClientModal(false)}
						onCreateClient={(clientData) => {
							setClients([
								...clients,
								{ id: clients.length + 1, ...clientData, status: "active" },
							]);
							setShowCreateClientModal(false);
						}}
					/>
				)}
			</AnimatePresence>

			{/* Filter Sidebars */}
			<AnimatePresence>
				{showUserFilterSidebar && (
					<FilterSidebar
						onClose={() => setShowUserFilterSidebar(false)}
						filterData={userFilterData}
						setFilterData={setUserFilterData}
						onApplyFilter={() => {
							// Apply filter logic here
							setShowUserFilterSidebar(false);
						}}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{showClientFilterSidebar && (
					<ClientFilterSidebar
						onClose={() => setShowClientFilterSidebar(false)}
						filterData={clientFilterData}
						setFilterData={setClientFilterData}
						onApplyFilter={() => {
							// Apply filter logic here
							setShowClientFilterSidebar(false);
						}}
					/>
				)}
			</AnimatePresence>

			{/* Delete Modals */}
			<AnimatePresence>
				{showDeleteUserModal && userToDelete && (
					<DeleteUserModal
						user={userToDelete}
						onClose={() => {
							setShowDeleteUserModal(false);
							setUserToDelete(null);
						}}
						onConfirm={confirmDeleteUser}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{showDeleteClientModal && clientToDelete && (
					<DeleteClientModal
						client={clientToDelete}
						onClose={() => {
							setShowDeleteClientModal(false);
							setClientToDelete(null);
						}}
						onConfirm={confirmDeleteClient}
					/>
				)}
			</AnimatePresence>

			{/* Details Modals */}
			<AnimatePresence>
				{showUserDetailsModal && userToView && (
					<UserDetailsModal
						user={userToView}
						onClose={() => {
							setShowUserDetailsModal(false);
							setUserToView(null);
						}}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{showClientDetailsModal && clientToView && (
					<ClientDetailsModal
						client={clientToView}
						onClose={() => {
							setShowClientDetailsModal(false);
							setClientToView(null);
						}}
					/>
				)}
			</AnimatePresence>

			{/* Change Password Modal */}
			<AnimatePresence>
				{showChangePasswordModal && userToChangePassword && (
					<ChangeUserPasswordModal
						isOpen={showChangePasswordModal}
						onClose={() => {
							setShowChangePasswordModal(false);
							setUserToChangePassword(null);
						}}
						user={userToChangePassword}
						onPasswordChange={handlePasswordChange}
					/>
				)}
			</AnimatePresence>

			{/* Edit Modals */}
			<AnimatePresence>
				{showEditUserModal && userToEdit && (
					<UpdateUserModal
						isOpen={showEditUserModal}
						onClose={() => {
							setShowEditUserModal(false);
							setUserToEdit(null);
						}}
						user={userToEdit}
						onUpdateUser={handleUpdateUser}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{showEditClientModal && clientToEdit && (
					<UpdateClientModal
						isOpen={showEditClientModal}
						onClose={() => {
							setShowEditClientModal(false);
							setClientToEdit(null);
						}}
						client={clientToEdit}
						onUpdateClient={handleUpdateClient}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
