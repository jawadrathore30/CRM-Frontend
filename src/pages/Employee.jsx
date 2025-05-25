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
	Briefcase,
} from "lucide-react";

// Import the modal components
import DeleteEmployeeModal from "../components/employee/delete-employee-modal";
import EmployeeDetailsModal from "../components/employee/employee-details-modal";
import CreateEmployeeModal from "../components/employee/create-employee-modal";
import EmployeePasswordModal from "../components/employee/employee-password-modal";
import UpdateEmployeeModal from "../components/employee/update-employee-modal";
import FilterSidebar from "../components/employee/filter-sidebar";

// Mock data for employees with updated roles
const mockEmployees = [
	{
		id: 1,
		name: "Amanda Omar",
		firstName: "Amanda",
		lastName: "Omar",
		avatar: "/placeholder.svg?height=40&width=40",
		email: "amanda@example.com",
		telephone: "(555) 123-4567",
		position: "Marketing Director",
		timeZone: "America/New_York",
		telegram: "amandaomar",
		whatsapp: "15551234567",
		role: "Admin",
	},
	{
		id: 2,
		name: "Amy Davis",
		firstName: "Amy",
		lastName: "Davis",
		avatar: "/placeholder.svg?height=40&width=40",
		email: "amy@example.com",
		telephone: "(555) 234-5678",
		position: "Product Manager",
		timeZone: "Europe/London",
		telegram: "amydavis",
		whatsapp: "15552345678",
		role: "CoAdmin",
	},
	{
		id: 3,
		name: "Cody Smith",
		firstName: "Cody",
		lastName: "Smith",
		avatar: "/placeholder.svg?height=40&width=40",
		email: "cody@example.com",
		telephone: "(555) 345-6789",
		position: "Developer",
		timeZone: "America/Los_Angeles",
		telegram: "",
		whatsapp: "15553456789",
		role: "Staff",
	},
	{
		id: 4,
		name: "Colex Mine",
		firstName: "Colex",
		lastName: "Mine",
		avatar: "/placeholder.svg?height=40&width=40",
		email: "john.doe@example.com",
		telephone: "(555) 456-7890",
		position: "System Administrator",
		timeZone: "Asia/Tokyo",
		telegram: "colexmine",
		whatsapp: "",
		role: "Admin",
	},
	{
		id: 5,
		name: "Elleno Winsor",
		firstName: "Elleno",
		lastName: "Winsor",
		avatar: "/placeholder.svg?height=40&width=40",
		email: "elleno@example.com",
		telephone: "(555) 567-8901",
		position: "UX Designer",
		timeZone: "Europe/Berlin",
		telegram: "ellenowinsor",
		whatsapp: "15555678901",
		role: "Staff",
	},
	{
		id: 6,
		name: "James Keen",
		firstName: "James",
		lastName: "Keen",
		avatar: "/placeholder.svg?height=40&width=40",
		email: "james@example.com",
		telephone: "(555) 678-9012",
		position: "CEO",
		timeZone: "America/Chicago",
		telegram: "jameskeen",
		whatsapp: "15556789012",
		role: "Management",
	},
	{
		id: 7,
		name: "Jill Rawson",
		firstName: "Jill",
		lastName: "Rawson",
		avatar: "/placeholder.svg?height=40&width=40",
		email: "jill@example.com",
		telephone: "(555) 789-0123",
		position: "Sales Manager",
		timeZone: "Europe/Paris",
		telegram: "",
		whatsapp: "15557890123",
		role: "Management",
	},
	{
		id: 8,
		name: "John Doe",
		firstName: "John",
		lastName: "Doe",
		avatar: "/placeholder.svg?height=40&width=40",
		email: "jhon1@example.com",
		telephone: "(555) 890-1234",
		position: "Support Specialist",
		timeZone: "Australia/Sydney",
		telegram: "johndoe",
		whatsapp: "",
		role: "Staff",
	},
	{
		id: 9,
		name: "Sarah Johnson",
		firstName: "Sarah",
		lastName: "Johnson",
		avatar: "/placeholder.svg?height=40&width=40",
		email: "sarah@example.com",
		telephone: "(555) 901-2345",
		position: "CTO",
		timeZone: "America/New_York",
		telegram: "sarahjohnson",
		whatsapp: "15559012345",
		role: "CoAdmin",
	},
	{
		id: 10,
		name: "Michael Chen",
		firstName: "Michael",
		lastName: "Chen",
		avatar: "/placeholder.svg?height=40&width=40",
		email: "michael@example.com",
		telephone: "(555) 012-3456",
		position: "Software Engineer",
		timeZone: "Asia/Singapore",
		telegram: "",
		whatsapp: "15550123456",
		role: "Staff",
	},
	{
		id: 11,
		name: "Emma Wilson",
		firstName: "Emma",
		lastName: "Wilson",
		avatar: "/placeholder.svg?height=40&width=40",
		email: "emma@example.com",
		telephone: "(555) 123-4567",
		position: "Creative Director",
		timeZone: "Europe/London",
		telegram: "emmawilson",
		whatsapp: "15551234567",
		role: "Management",
	},
	{
		id: 12,
		name: "David Brown",
		firstName: "David",
		lastName: "Brown",
		avatar: "/placeholder.svg?height=40&width=40",
		email: "david@example.com",
		telephone: "(555) 234-5678",
		position: "Accountant",
		timeZone: "America/Los_Angeles",
		telegram: "davidbrown",
		whatsapp: "15552345678",
		role: "Accounting",
	},
];

export default function Employee() {
	const [mounted, setMounted] = useState(false);
	const [employees, setEmployees] = useState(mockEmployees);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedEmployees, setSelectedEmployees] = useState([]);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showFilterSidebar, setShowFilterSidebar] = useState(false);
	const [filterData, setFilterData] = useState({
		name: "",
		email: "",
		position: "",
		role: "",
		dateStart: "",
		dateEnd: "",
	});

	// State for modals
	const [employeeToDelete, setEmployeeToDelete] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [employeeToView, setEmployeeToView] = useState(null);
	const [showEmployeeDetailsModal, setShowEmployeeDetailsModal] =
		useState(false);
	const [employeeToChangePassword, setEmployeeToChangePassword] =
		useState(null);
	const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
	const [employeeToEdit, setEmployeeToEdit] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);

	// Ensure hydration
	useEffect(() => {
		setMounted(true);
	}, []);

	// Filter employees based on search query
	const filteredEmployees = employees.filter((employee) => {
		const matchesSearch =
			employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
			employee.role.toLowerCase().includes(searchQuery.toLowerCase());

		return matchesSearch;
	});

	// Sort employees
	const sortedEmployees = [...filteredEmployees].sort((a, b) => {
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
			setSelectedEmployees(sortedEmployees.map((employee) => employee.id));
		} else {
			setSelectedEmployees([]);
		}
	};

	// Handle select individual employee
	const handleSelectEmployee = (employeeId, checked) => {
		if (checked) {
			setSelectedEmployees([...selectedEmployees, employeeId]);
		} else {
			setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
		}
	};

	// Handle delete employee
	const handleDeleteEmployee = (employeeId) => {
		const employee = employees.find((employee) => employee.id === employeeId);
		setEmployeeToDelete(employee);
		setShowDeleteModal(true);
	};

	// Handle view employee details
	const handleViewEmployee = (employeeId) => {
		const employee = employees.find((employee) => employee.id === employeeId);
		setEmployeeToView(employee);
		setShowEmployeeDetailsModal(true);
	};

	// Confirm delete employee
	const confirmDeleteEmployee = () => {
		if (employeeToDelete) {
			setEmployees(
				employees.filter((employee) => employee.id !== employeeToDelete.id)
			);
			setSelectedEmployees(
				selectedEmployees.filter((id) => id !== employeeToDelete.id)
			);
			setShowDeleteModal(false);
			setEmployeeToDelete(null);
		}
	};

	// Handle bulk delete
	const handleBulkDelete = () => {
		setEmployees(
			employees.filter((employee) => !selectedEmployees.includes(employee.id))
		);
		setSelectedEmployees([]);
	};

	// Handle change employee password
	const handleChangeEmployeePassword = (employeeId) => {
		const employee = employees.find((employee) => employee.id === employeeId);
		setEmployeeToChangePassword(employee);
		setShowChangePasswordModal(true);
	};

	// Handle password change
	const handlePasswordChange = (employeeId, newPassword) => {
		console.log(
			`Password changed for employee ID ${employeeId} to: ${newPassword}`
		);
		// Here you would typically call your API to update the password
	};

	// Handle edit employee
	const handleEditEmployee = (employeeId) => {
		const employee = employees.find((employee) => employee.id === employeeId);
		setEmployeeToEdit(employee);
		setShowEditModal(true);
	};

	// Handle update employee
	const handleUpdateEmployee = (employeeId, employeeData) => {
		setEmployees(
			employees.map((employee) => {
				if (employee.id === employeeId) {
					return { ...employee, ...employeeData };
				}
				return employee;
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
			case "Admin":
				return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40";
			case "CoAdmin":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40";
			case "Management":
				return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 group-hover:bg-green-200 dark:group-hover:bg-green-900/40";
			case "Accounting":
				return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/40";
			default:
				return "bg-slate-100 text-slate-800 dark:bg-slate-700/30 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700/40";
		}
	};

	// Get role icon
	const getRoleIcon = (role) => {
		switch (role) {
			case "Admin":
				return (
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
				);
			case "CoAdmin":
				return (
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
				);
			case "Management":
				return (
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
						<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
						<path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
					</svg>
				);
			case "Accounting":
				return (
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
						<path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"></path>
						<path d="M8 10h8"></path>
						<path d="M8 14h6"></path>
					</svg>
				);
			default:
				return (
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
				);
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

	const handleReset = () => {
		setSearchQuery("");
		setFilterData({
			name: "",
			email: "",
			position: "",
			role: "",
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
					<h1 className="text-2xl font-bold gradient-text">
						Employee Management
					</h1>
					<p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
						Manage all employees and their roles
					</p>
				</div>

				<div className="flex items-center gap-3">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
						<Input
							type="search"
							placeholder="Search employees..."
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
						<span className="hidden md:inline">Add Employee</span>
					</Button>
				</div>
			</motion.div>
			{/* Employee Table */}
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
												sortedEmployees.length > 0 &&
												selectedEmployees.length === sortedEmployees.length
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
										onClick={() => requestSort("position")}>
										Position {getSortIcon("position")}
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
							{sortedEmployees.length === 0 ? (
								<tr>
									<td
										colSpan={6}
										className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
										<div className="flex flex-col items-center justify-center">
											<div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-700/30 flex items-center justify-center mb-4">
												<User className="h-10 w-10 text-slate-400 dark:text-slate-500" />
											</div>
											<p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-1">
												No employees found
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
								sortedEmployees.map((employee, index) => (
									<motion.tr
										key={employee.id}
										className={`group transition-colors ${
											selectedEmployees.includes(employee.id)
												? "bg-primary/5 dark:bg-primary/10"
												: "hover:bg-slate-50 dark:hover:bg-slate-700/20"
										}`}
										variants={itemVariants}
										custom={index * 0.03}>
										<td className="px-6 py-4">
											<Checkbox
												checked={selectedEmployees.includes(employee.id)}
												onCheckedChange={(checked) =>
													handleSelectEmployee(employee.id, checked)
												}
												className="data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-md h-5 w-5"
											/>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-3">
												<div className="relative">
													<Avatar className="h-10 w-10 border-2 border-white dark:border-slate-700 shadow-sm transition-transform group-hover:scale-105">
														<AvatarImage
															src={employee.avatar || "/placeholder.svg"}
															alt={employee.name}
														/>
														<AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-medium">
															{employee.name
																.split(" ")
																.map((n) => n[0])
																.join("")}
														</AvatarFallback>
													</Avatar>
												</div>
												<div>
													<button
														className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors"
														onClick={() => handleViewEmployee(employee.id)}>
														{employee.name}
													</button>
													<p className="text-xs text-slate-500 dark:text-slate-400">
														{employee.role}
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
													{employee.email}
												</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												{/* <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
													<Briefcase className="h-4 w-4 text-green-600 dark:text-green-400" />
												</div> */}
												<span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
													{employee.position}
												</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<span
												className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${getRoleBadgeColor(
													employee.role
												)}`}>
												{getRoleIcon(employee.role)}
												{employee.role}
											</span>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center justify-center gap-1">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => handleEditEmployee(employee.id)}
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
													onClick={() =>
														handleChangeEmployeePassword(employee.id)
													}
													className="h-8 w-8 text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-full">
													<Lock className="h-4 w-4" />
													<span className="sr-only">Password</span>
												</Button>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
													onClick={() => handleDeleteEmployee(employee.id)}>
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
															onClick={() => handleViewEmployee(employee.id)}>
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
															onClick={() => handleDeleteEmployee(employee.id)}>
															<Trash2 className="h-4 w-4 mr-2" />
															Delete Employee
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
				{sortedEmployees.length > 0 && (
					<div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
						<div className="text-sm text-slate-500 dark:text-slate-400">
							Showing{" "}
							<span className="font-medium text-slate-700 dark:text-slate-300">
								{sortedEmployees.length}
							</span>{" "}
							of{" "}
							<span className="font-medium text-slate-700 dark:text-slate-300">
								{employees.length}
							</span>{" "}
							employees
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
			{selectedEmployees.length > 0 && (
				<motion.div
					className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}>
					<div className="bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-900 dark:to-slate-800 text-white px-6 py-3 rounded-full shadow-xl border border-slate-700/50 dark:border-slate-600/30 backdrop-blur-sm flex items-center gap-4">
						<div className="flex items-center gap-2">
							<div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
								<span className="text-xs font-bold text-primary">
									{selectedEmployees.length}
								</span>
							</div>
							<span className="text-sm font-medium">employees selected</span>
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

			{/* Create Employee Modal */}
			<AnimatePresence>
				{showCreateModal && (
					<CreateEmployeeModal
						isOpen={showCreateModal}
						onClose={() => setShowCreateModal(false)}
						onCreateEmployee={(employeeData) => {
							setEmployees([
								...employees,
								{ id: employees.length + 1, ...employeeData },
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
			{/* Delete Employee Modal */}
			<AnimatePresence>
				{showDeleteModal && employeeToDelete && (
					<DeleteEmployeeModal
						employee={employeeToDelete}
						onClose={() => {
							setShowDeleteModal(false);
							setEmployeeToDelete(null);
						}}
						onConfirm={confirmDeleteEmployee}
					/>
				)}
			</AnimatePresence>
			{/* Employee Details Modal */}
			<AnimatePresence>
				{showEmployeeDetailsModal && employeeToView && (
					<EmployeeDetailsModal
						user={employeeToView}
						onClose={() => {
							setShowEmployeeDetailsModal(false);
							setEmployeeToView(null);
						}}
					/>
				)}
			</AnimatePresence>
			{/* Change Password Modal */}
			<AnimatePresence>
				{showChangePasswordModal && employeeToChangePassword && (
					<EmployeePasswordModal
						isOpen={showChangePasswordModal}
						onClose={() => {
							setShowChangePasswordModal(false);
							setEmployeeToChangePassword(null);
						}}
						employee={employeeToChangePassword}
						onPasswordChange={handlePasswordChange}
					/>
				)}
			</AnimatePresence>
			{/* Edit Employee Modal */}
			<AnimatePresence>
				{showEditModal && employeeToEdit && (
					<UpdateEmployeeModal
						isOpen={showEditModal}
						onClose={() => {
							setShowEditModal(false);
							setEmployeeToEdit(null);
						}}
						employee={employeeToEdit}
						onUpdateEmployee={handleUpdateEmployee}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
