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
	Unlock,
	MoreHorizontal,
	Download,
	UserPlus,
	Eye,
	AlertCircle,
	CheckCircle2,
	X,
	User,
	Building,
	Filter,
	ArrowUpDown,
	ChevronDown,
	ChevronUp,
} from "lucide-react";

// Import the DeleteUserModal component at the top of the file
import DeleteUserModal from "../components/admin/delete-user-modal";
import UserDetailsModal from "../components/admin/user-details-modal";
import CreateUserModal from "../components/admin/create-user-modal";
import ChangeUserPasswordModal from "../components/admin/user-password-modal";
import UpdateUserModal from "../components/admin/update-user-modal";
import FilterSidebar from "../components/admin/filter-sidebar";

// Mock data for users with updated roles
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
		github: "aomar",
		dribble: "",
		status: "active",
		role: "Admin",
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
		role: "Co Admin",
	},
	{
		id: 3,
		name: "Cody Smith",
		firstName: "Cody",
		lastName: "Smith",
		avatar: "/placeholder.svg?height=40&width=40",
		company: "Dellon Inc",
		companyName: "Dellon Inc",
		email: "cody@example.com",
		telephone: "(555) 345-6789",
		position: "Developer",
		timeZone: "America/Los_Angeles",
		twitter: "",
		facebook: "",
		instagram: "",
		linkedin: "codysmith",
		github: "codysmith",
		dribble: "",
		status: "inactive",
		role: "User",
	},
	{
		id: 4,
		name: "Colex Mine",
		firstName: "Colex",
		lastName: "Mine",
		avatar: "/placeholder.svg?height=40&width=40",
		company: "System",
		companyName: "System",
		email: "john.doe@example.com",
		telephone: "(555) 456-7890",
		position: "System Administrator",
		timeZone: "Asia/Tokyo",
		twitter: "",
		facebook: "",
		instagram: "",
		linkedin: "",
		github: "colexmine",
		dribble: "",
		status: "inactive",
		role: "Admin",
	},
	{
		id: 5,
		name: "Elleno Winsor",
		firstName: "Elleno",
		lastName: "Winsor",
		avatar: "/placeholder.svg?height=40&width=40",
		company: "Enco Power Company",
		companyName: "Enco Power Company",
		email: "elleno@example.com",
		telephone: "(555) 567-8901",
		position: "UX Designer",
		timeZone: "Europe/Berlin",
		twitter: "ellenowinsor",
		facebook: "ellenowinsor",
		instagram: "elleno.winsor",
		linkedin: "ellenowinsor",
		github: "",
		dribble: "ellenowinsor",
		status: "active",
		role: "Co Admin",
	},
	{
		id: 6,
		name: "James Keen",
		firstName: "James",
		lastName: "Keen",
		avatar: "/placeholder.svg?height=40&width=40",
		company: "Jolly Juice Inc",
		companyName: "Jolly Juice Inc",
		email: "james@example.com",
		telephone: "(555) 678-9012",
		position: "CEO",
		timeZone: "America/Chicago",
		twitter: "jameskeen",
		facebook: "jameskeen",
		instagram: "james.keen",
		linkedin: "jameskeen",
		github: "",
		dribble: "",
		status: "active",
		role: "Admin",
	},
	{
		id: 7,
		name: "Jill Rawson",
		firstName: "Jill",
		lastName: "Rawson",
		avatar: "/placeholder.svg?height=40&width=40",
		company: "Dellon Inc",
		companyName: "Dellon Inc",
		email: "jill@example.com",
		telephone: "(555) 789-0123",
		position: "Sales Manager",
		timeZone: "Europe/Paris",
		twitter: "",
		facebook: "jillrawson",
		instagram: "",
		linkedin: "jillrawson",
		github: "",
		dribble: "",
		status: "active",
		role: "User",
	},
	{
		id: 8,
		name: "John Doe",
		firstName: "John",
		lastName: "Doe",
		avatar: "/placeholder.svg?height=40&width=40",
		company: "System",
		companyName: "System",
		email: "jhon1@example.com",
		telephone: "(555) 890-1234",
		position: "Support Specialist",
		timeZone: "Australia/Sydney",
		twitter: "",
		facebook: "",
		instagram: "",
		linkedin: "",
		github: "",
		dribble: "",
		status: "inactive",
		role: "Co Admin",
	},
	{
		id: 9,
		name: "Sarah Johnson",
		firstName: "Sarah",
		lastName: "Johnson",
		avatar: "/placeholder.svg?height=40&width=40",
		company: "Bright Solutions",
		companyName: "Bright Solutions",
		email: "sarah@example.com",
		telephone: "(555) 901-2345",
		position: "CTO",
		timeZone: "America/New_York",
		twitter: "sarahjohnson",
		facebook: "sarahjohnson",
		instagram: "sarah.johnson",
		linkedin: "sarahjohnson",
		github: "sarahjohnson",
		dribble: "",
		status: "active",
		role: "Admin",
	},
	{
		id: 10,
		name: "Michael Chen",
		firstName: "Michael",
		lastName: "Chen",
		avatar: "/placeholder.svg?height=40&width=40",
		company: "Global Tech",
		companyName: "Global Tech",
		email: "michael@example.com",
		telephone: "(555) 012-3456",
		position: "Software Engineer",
		timeZone: "Asia/Singapore",
		twitter: "",
		facebook: "",
		instagram: "",
		linkedin: "michaelchen",
		github: "michaelchen",
		dribble: "",
		status: "active",
		role: "User",
	},
	{
		id: 11,
		name: "Emma Wilson",
		firstName: "Emma",
		lastName: "Wilson",
		avatar: "/placeholder.svg?height=40&width=40",
		company: "Innovate Design",
		companyName: "Innovate Design",
		email: "emma@example.com",
		telephone: "(555) 123-4567",
		position: "Creative Director",
		timeZone: "Europe/London",
		twitter: "emmawilson",
		facebook: "emmawilson",
		instagram: "emma.wilson",
		linkedin: "emmawilson",
		github: "",
		dribble: "emmawilson",
		status: "active",
		role: "Co Admin",
	},
	{
		id: 12,
		name: "David Brown",
		firstName: "David",
		lastName: "Brown",
		avatar: "/placeholder.svg?height=40&width=40",
		company: "Tech Solutions",
		companyName: "Tech Solutions",
		email: "david@example.com",
		telephone: "(555) 234-5678",
		position: "Project Manager",
		timeZone: "America/Los_Angeles",
		twitter: "",
		facebook: "davidbrown",
		instagram: "",
		linkedin: "davidbrown",
		github: "",
		dribble: "",
		status: "inactive",
		role: "User",
	},
];

export default function Admin() {
	const [mounted, setMounted] = useState(false);
	const [users, setUsers] = useState(mockUsers);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showFilterSidebar, setShowFilterSidebar] = useState(false);
	const [filterData, setFilterData] = useState({
		companyName: "",
		name: "",
		email: "",
		userType: "",
		dateStart: "",
		dateEnd: "",
	});

	// Add this state to track the user being deleted, near the other state declarations
	const [userToDelete, setUserToDelete] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	// Add state for user details modal
	const [userToView, setUserToView] = useState(null);
	const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
	// Add state for user creation modal
	const [userToChangePassword, setUserToChangePassword] = useState(null);
	const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
	// Add state for user update modal
	const [userToEdit, setUserToEdit] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);

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
			setSelectedUsers(sortedUsers.map((user) => user.id));
		} else {
			setSelectedUsers([]);
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

	// Update the handleDeleteUser function to show the modal instead of immediately deleting
	const handleDeleteUser = (userId) => {
		const user = users.find((user) => user.id === userId);
		setUserToDelete(user);
		setShowDeleteModal(true);
	};

	// Add a function to handle viewing user details
	const handleViewUser = (userId) => {
		const user = users.find((user) => user.id === userId);
		setUserToView(user);
		setShowUserDetailsModal(true);
	};

	// Add a new function to confirm deletion
	const confirmDeleteUser = () => {
		if (userToDelete) {
			setUsers(users.filter((user) => user.id !== userToDelete.id));
			setSelectedUsers(selectedUsers.filter((id) => id !== userToDelete.id));
			setShowDeleteModal(false);
			setUserToDelete(null);
		}
	};

	// Handle bulk delete
	const handleBulkDelete = () => {
		setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
		setSelectedUsers([]);
	};

	// Add this function to handle opening the change password modal
	const handleChangeUserPassword = (userId) => {
		const user = users.find((user) => user.id === userId);
		setUserToChangePassword(user);
		setShowChangePasswordModal(true);
	};

	// Add this function to handle the password change
	const handlePasswordChange = (userId, newPassword) => {
		console.log(`Password changed for user ID ${userId} to: ${newPassword}`);
		// Here you would typically call your API to update the password
		// For now, we'll just log it
	};

	// Handle edit user
	const handleEditUser = (userId) => {
		const user = users.find((user) => user.id === userId);
		setUserToEdit(user);
		setShowEditModal(true);
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
			companyName: "",
			name: "",
			email: "",
			userType: "",
			dateStart: "",
			dateEnd: "",
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
					<h1 className="text-2xl font-bold gradient-text">User Management</h1>
					<p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
						Manage all users and their permissions
					</p>
				</div>

				<div className="flex items-center gap-3">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
						<Input
							type="search"
							placeholder="Search users..."
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
						<span className="hidden md:inline">Add User</span>
					</Button>
				</div>
			</motion.div>
			{/* User Table */}
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
												sortedUsers.length > 0 &&
												selectedUsers.length === sortedUsers.length
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
										onClick={() => requestSort("name")}>
										Name {getSortIcon("name")}
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
										onClick={() => requestSort("company")}>
										Company {getSortIcon("company")}
									</button>
								</th>
								<th className="px-6 py-4 text-left">
									<button
										className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
										onClick={() => requestSort("role")}>
										Role {getSortIcon("role")}
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
							{sortedUsers.length === 0 ? (
								<tr>
									<td
										colSpan={7}
										className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
										<div className="flex flex-col items-center justify-center">
											<div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-700/30 flex items-center justify-center mb-4">
												<User className="h-10 w-10 text-slate-400 dark:text-slate-500" />
											</div>
											<p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-1">
												No users found
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
													{user.status === "active" && (
														<span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-slate-700"></span>
													)}
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
											<div className="max-w-[180px]">
												<span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors truncate block">
													{user.company}
												</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<span
												className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
													user.role === "Admin"
														? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40"
														: user.role === "Co Admin"
														? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40"
														: "bg-slate-100 text-slate-800 dark:bg-slate-700/30 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700/40"
												}`}>
												{user.role === "Admin" && (
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
														className="mr-1">
														<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
														<path d="M12 8v8"></path>
														<path d="M8 12h8"></path>
													</svg>
												)}
												{user.role === "Co Admin" && (
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
														className="mr-1">
														<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
														<circle cx="9" cy="7" r="4"></circle>
														<path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
														<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
													</svg>
												)}
												{user.role === "User" && (
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
														className="mr-1">
														<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
														<circle cx="12" cy="7" r="4"></circle>
													</svg>
												)}
												{user.role}
											</span>
										</td>
										<td className="px-6 py-4">
											<span
												className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
													user.status === "active"
														? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 group-hover:bg-green-200 dark:group-hover:bg-green-900/40"
														: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 group-hover:bg-red-200 dark:group-hover:bg-red-900/40"
												}`}>
												{user.status === "active" ? (
													<CheckCircle2 className="h-3 w-3" />
												) : (
													<AlertCircle className="h-3 w-3" />
												)}
												{user.status === "active" ? "Active" : "Inactive"}
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
			{/* Bulk Actions */}
			{selectedUsers.length > 0 && (
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
			{/* Create User Modal */}
			<AnimatePresence>
				{showCreateModal && (
					<CreateUserModal
						isOpen={showCreateModal}
						onClose={() => setShowCreateModal(false)}
						onCreateUser={(userData) => {
							setUsers([
								...users,
								{ id: users.length + 1, ...userData, status: "active" },
							]);
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
			{/* Delete User Modal */}
			<AnimatePresence>
				{showDeleteModal && userToDelete && (
					<DeleteUserModal
						user={userToDelete}
						onClose={() => {
							setShowDeleteModal(false);
							setUserToDelete(null);
						}}
						onConfirm={confirmDeleteUser}
					/>
				)}
			</AnimatePresence>
			{/* User Details Modal */}
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
			{/* Edit User Modal */}
			<AnimatePresence>
				{showEditModal && userToEdit && (
					<UpdateUserModal
						isOpen={showEditModal}
						onClose={() => {
							setShowEditModal(false);
							setUserToEdit(null);
						}}
						user={userToEdit}
						onUpdateUser={handleUpdateUser}
					/>
				)}
			</AnimatePresence>{" "}
		</div>
	);
}
