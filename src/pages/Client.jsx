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
	User,
	Filter,
	ArrowUpDown,
	ChevronDown,
	ChevronUp,
} from "lucide-react";

// Import the modal components
import DeleteUserModal from "../components/client-users/delete-user-modal";
import UserDetailsModal from "../components/client-users/user-details-modal";
import CreateUserModal from "../components/client-users/create-user-modal";
import ChangeUserPasswordModal from "../components/client-users/user-password-modal";
import UpdateUserModal from "../components/client-users/update-user-modal";
import FilterSidebar from "../components/client-users/filter-sidebar";

// Mock data for users
const mockUsers = [
	{
		id: 1,
		name: "Amanda Omar",
		firstName: "Amanda",
		lastName: "Omar",
		avatar: "/abstract-geometric-ao.png",
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
		avatar: "/abstract-geometric-ad.png",
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
	{
		id: 3,
		name: "Michael Johnson",
		firstName: "Michael",
		lastName: "Johnson",
		avatar: "/abstract-geometric-mj.png",
		company: "Tech Innovations",
		companyName: "Tech Innovations",
		email: "michael@example.com",
		telephone: "(555) 345-6789",
		position: "Lead Developer",
		timeZone: "America/Los_Angeles",
		twitter: "mjohnson",
		facebook: "michaeljohnson",
		instagram: "michael.johnson",
		linkedin: "michaeljohnson",
		telegram: "",
		whatsapp: "mjohnson",
		github: "mjohnson",
		dribble: "",
		status: "active",
		role: "User",
	},
	{
		id: 4,
		name: "Sarah Williams",
		firstName: "Sarah",
		lastName: "Williams",
		avatar: "/stylized-sw.png",
		company: "Design Masters",
		companyName: "Design Masters",
		email: "sarah@example.com",
		telephone: "(555) 456-7890",
		position: "UI/UX Designer",
		timeZone: "Europe/Berlin",
		twitter: "sarahw",
		facebook: "sarahwilliams",
		instagram: "sarah.williams",
		linkedin: "sarahwilliams",
		telegram: "sarahw",
		whatsapp: "",
		github: "sarahw",
		dribble: "sarahwilliams",
		status: "inactive",
		role: "User",
	},
	{
		id: 5,
		name: "David Brown",
		firstName: "David",
		lastName: "Brown",
		avatar: "/stylized-db-logo.png",
		company: "Financial Solutions",
		companyName: "Financial Solutions",
		email: "david@example.com",
		telephone: "(555) 567-8901",
		position: "Financial Analyst",
		timeZone: "America/Chicago",
		twitter: "davidbrown",
		facebook: "davidbrown",
		instagram: "david.brown",
		linkedin: "davidbrown",
		telegram: "",
		whatsapp: "davidbrown",
		github: "",
		dribble: "",
		status: "active",
		role: "User",
	},
	{
		id: 6,
		name: "Jennifer Miller",
		firstName: "Jennifer",
		lastName: "Miller",
		avatar: "/abstract-jm.png",
		company: "Healthcare Plus",
		companyName: "Healthcare Plus",
		email: "jennifer@example.com",
		telephone: "(555) 678-9012",
		position: "HR Manager",
		timeZone: "America/New_York",
		twitter: "jenniferm",
		facebook: "jennifermiller",
		instagram: "jennifer.miller",
		linkedin: "jennifermiller",
		telegram: "jenniferm",
		whatsapp: "jenniferm",
		github: "",
		dribble: "",
		status: "active",
		role: "Owner",
	},
	{
		id: 7,
		name: "Robert Wilson",
		firstName: "Robert",
		lastName: "Wilson",
		avatar: "/abstract-rw.png",
		company: "Construction Experts",
		companyName: "Construction Experts",
		email: "robert@example.com",
		telephone: "(555) 789-0123",
		position: "Project Manager",
		timeZone: "America/Denver",
		twitter: "robertw",
		facebook: "robertwilson",
		instagram: "robert.wilson",
		linkedin: "robertwilson",
		telegram: "",
		whatsapp: "robertw",
		github: "",
		dribble: "",
		status: "active",
		role: "User",
	},
	{
		id: 8,
		name: "Lisa Taylor",
		firstName: "Lisa",
		lastName: "Taylor",
		avatar: "/letter-blocks-LT.png",
		company: "Marketing Wizards",
		companyName: "Marketing Wizards",
		email: "lisa@example.com",
		telephone: "(555) 890-1234",
		position: "Marketing Specialist",
		timeZone: "Europe/Paris",
		twitter: "lisat",
		facebook: "lisataylor",
		instagram: "lisa.taylor",
		linkedin: "lisataylor",
		telegram: "lisat",
		whatsapp: "lisat",
		github: "",
		dribble: "",
		status: "inactive",
		role: "User",
	},
	{
		id: 9,
		name: "James Anderson",
		firstName: "James",
		lastName: "Anderson",
		avatar: "/stylized-ja-typography.png",
		company: "Software Solutions",
		companyName: "Software Solutions",
		email: "james@example.com",
		telephone: "(555) 901-2345",
		position: "Software Engineer",
		timeZone: "Asia/Tokyo",
		twitter: "jamesa",
		facebook: "jamesanderson",
		instagram: "james.anderson",
		linkedin: "jamesanderson",
		telegram: "",
		whatsapp: "jamesa",
		github: "jamesanderson",
		dribble: "",
		status: "active",
		role: "User",
	},
	{
		id: 10,
		name: "Patricia Martinez",
		firstName: "Patricia",
		lastName: "Martinez",
		avatar: "/project-management-overview.png",
		company: "Global Logistics",
		companyName: "Global Logistics",
		email: "patricia@example.com",
		telephone: "(555) 012-3456",
		position: "Operations Director",
		timeZone: "America/Mexico_City",
		twitter: "patriciam",
		facebook: "patriciamartinez",
		instagram: "patricia.martinez",
		linkedin: "patriciamartinez",
		telegram: "patriciam",
		whatsapp: "patriciam",
		github: "",
		dribble: "",
		status: "active",
		role: "Owner",
	},
	{
		id: 11,
		name: "Thomas Garcia",
		firstName: "Thomas",
		lastName: "Garcia",
		avatar: "/abstract-geometric-tg.png",
		company: "Creative Studios",
		companyName: "Creative Studios",
		email: "thomas@example.com",
		telephone: "(555) 123-4567",
		position: "Creative Director",
		timeZone: "America/Los_Angeles",
		twitter: "thomasg",
		facebook: "thomasgarcia",
		instagram: "thomas.garcia",
		linkedin: "thomasgarcia",
		telegram: "",
		whatsapp: "thomasg",
		github: "thomasg",
		dribble: "thomasgarcia",
		status: "active",
		role: "User",
	},
	{
		id: 12,
		name: "Jessica Rodriguez",
		firstName: "Jessica",
		lastName: "Rodriguez",
		avatar: "/stylized-jr-logo.png",
		company: "Educational Services",
		companyName: "Educational Services",
		email: "jessica@example.com",
		telephone: "(555) 234-5678",
		position: "Content Manager",
		timeZone: "America/New_York",
		twitter: "jessicar",
		facebook: "jessicarodriguez",
		instagram: "jessica.rodriguez",
		linkedin: "jessicarodriguez",
		telegram: "jessicar",
		whatsapp: "jessicar",
		github: "",
		dribble: "",
		status: "active",
		role: "User",
	},
	{
		id: 13,
		name: "Daniel Lee",
		firstName: "Daniel",
		lastName: "Lee",
		avatar: "/abstract-dl.png",
		company: "Tech Innovations",
		companyName: "Tech Innovations",
		email: "daniel@example.com",
		telephone: "(555) 345-6789",
		position: "CTO",
		timeZone: "Asia/Seoul",
		twitter: "daniellee",
		facebook: "daniellee",
		instagram: "daniel.lee",
		linkedin: "daniellee",
		telegram: "daniell",
		whatsapp: "daniell",
		github: "daniellee",
		dribble: "",
		status: "active",
		role: "Owner",
	},
	{
		id: 14,
		name: "Nancy White",
		firstName: "Nancy",
		lastName: "White",
		avatar: "/northwest-landscape.png",
		company: "Healthcare Plus",
		companyName: "Healthcare Plus",
		email: "nancy@example.com",
		telephone: "(555) 456-7890",
		position: "Nurse Practitioner",
		timeZone: "America/Chicago",
		twitter: "nancyw",
		facebook: "nancywhite",
		instagram: "nancy.white",
		linkedin: "nancywhite",
		telegram: "",
		whatsapp: "nancyw",
		github: "",
		dribble: "",
		status: "inactive",
		role: "User",
	},
	{
		id: 15,
		name: "Mark Thompson",
		firstName: "Mark",
		lastName: "Thompson",
		avatar: "/mountain-terrain.png",
		company: "Financial Solutions",
		companyName: "Financial Solutions",
		email: "mark@example.com",
		telephone: "(555) 567-8901",
		position: "Investment Advisor",
		timeZone: "Europe/London",
		twitter: "markt",
		facebook: "markthompson",
		instagram: "mark.thompson",
		linkedin: "markthompson",
		telegram: "markt",
		whatsapp: "markt",
		github: "",
		dribble: "",
		status: "active",
		role: "User",
	},
];

export default function Client() {
	const [mounted, setMounted] = useState(false);
	const [users, setUsers] = useState(mockUsers);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
	const [showCreateUserModal, setShowCreateUserModal] = useState(false);
	const [showUserFilterSidebar, setShowUserFilterSidebar] = useState(false);
	const [userFilterData, setUserFilterData] = useState({
		name: "",
		email: "",
		userType: "",
		dateStart: "",
		dateEnd: "",
	});

	// State for modals
	const [userToDelete, setUserToDelete] = useState(null);
	const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
	const [userToView, setUserToView] = useState(null);
	const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
	const [userToChangePassword, setUserToChangePassword] = useState(null);
	const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
	const [userToEdit, setUserToEdit] = useState(null);
	const [showEditUserModal, setShowEditUserModal] = useState(false);

	// Ensure hydration
	useEffect(() => {
		setMounted(true);
	}, []);

	// Filter users based on search query
	const filteredUsers = users.filter((user) => {
		const matchesSearch =
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase());

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

	// Handle select all users
	const handleSelectAllUsers = (checked) => {
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

	// Handle delete user
	const handleDeleteUser = (userId) => {
		const user = users.find((user) => user.id === userId);
		setUserToDelete(user);
		setShowDeleteUserModal(true);
	};

	// Handle view user details
	const handleViewUser = (userId) => {
		const user = users.find((user) => user.id === userId);
		setUserToView(user);
		setShowUserDetailsModal(true);
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

	// Handle bulk delete users
	const handleBulkDeleteUsers = () => {
		setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
		setSelectedUsers([]);
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
		setUserFilterData({
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
						Manage all users
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
						onClick={() => setShowUserFilterSidebar(true)}>
						<Filter className="h-4 w-4" />
					</Button>

					<Button
						onClick={() => setShowCreateUserModal(true)}
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
										onClick={() => requestSort("email")}>
										Email {getSortIcon("email")}
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
										colSpan={4}
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
												</div>
												<div>
													<button
														className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors"
														onClick={() => handleViewUser(user.id)}>
														{user.name}
													</button>
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

			{/* Filter Sidebar */}
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

			{/* Delete Modal */}
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

			{/* Details Modal */}
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

			{/* Edit Modal */}
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
		</div>
	);
}
