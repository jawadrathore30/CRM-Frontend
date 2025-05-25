import { useState, useEffect } from "react";
import { Search, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./layout/mode-toggle";
import { Logo } from "./logo";
import { CustomSidebar } from "./layout/custom-sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import EditProfileModal from "./layout/edit-profile-modal";
import { useSelector, useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice"; // adjust path to your slice
import { ToastErrorMessage } from "./ui/error-message";
import ScrollToTop from "./scroll-to-top";
import ChangePasswordModal from "./layout/change-password-modal";
import {
	ChevronLeft,
	ChevronRight,
	Home,
	Users,
	Briefcase,
	CreditCard,
	MessageSquare,
	Share2,
	UserCog,
	BarChart3,
	Phone,
	ShoppingBag,
	DollarSign,
	Truck,
	Badge,
	IdCard,
} from "lucide-react";

export function AppLayout() {
	const [activeTab, setActiveTab] = useState("dashboard");
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [mounted, setMounted] = useState(false);
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [isChangePasswordModalOpen, setChangePasswordModalOpen] =
		useState(false);
	const { currentUser } = useSelector((state) => state.user);
	const [logoutErrorMsg, setLogoutErrorMsg] = useState("");
	const [showToast, setShowToast] = useState(false);

	const location = useLocation();

	const tabs = [
		{ id: "dashboard", label: "Dashboard", icon: Home, path: "/" },
		// { id: "admin", label: "Admin", icon: UserCog, path: "/admin" },
		{ id: "employees", label: "Employees", icon: IdCard, path: "/employees" },
		{ id: "leads", label: "Leads", icon: Phone, path: "/leads" },
		{
			id: "clients",
			label: "Clients",
			icon: Users,
			path: "/clients",
		},
		{ id: "projects", label: "Projects", icon: Briefcase, path: "/projects" },
		{
			id: "accounting",
			label: "Accounting",
			icon: CreditCard,
			path: "/accounting",
		},
		{ id: "suppliers", label: "Suppliers", icon: Truck, path: "/suppliers" },
		{
			id: "analytics",
			label: "Analytics",
			icon: BarChart3,
			path: "/analytics",
		},
		{ id: "marketing", label: "Marketing", icon: Share2, path: "/marketing" },
		{
			id: "payments",
			label: "Payments",
			icon: DollarSign,
			path: "/payments",
		},
		{
			id: "chatgpt",
			label: "ChatGPT",
			icon: MessageSquare,
			path: "/chatgpt",
		},
	];

	useEffect(() => {
		const currentTab = tabs.find((tab) => tab.path === location.pathname);
		if (currentTab) {
			setActiveTab(currentTab.id);
		}
	}, [location.pathname]);

	// console.log("Current User:", currentUser); // Debugging line

	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Ensure hydration
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!currentUser) {
		navigate("/login");
		return null;
	}

	useEffect(() => {
		if (!currentUser?.passwordChanged) {
			setChangePasswordModalOpen(true);
		}
	}, [currentUser?.passwordChanged]);

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed);
	};

	const handleTabChange = (tab) => {
		navigate(`${tab.path}`); // Navigate to the selected tab
		// Close mobile sidebar when tab changes
		setIsMobileOpen(false);
	};

	if (!mounted) return null;

	const handleLogout = async () => {
		setLogoutErrorMsg(""); // Reset error message
		setShowToast(false); // Reset toast visibility

		try {
			const res = await fetch("/api/auth/signout", {
				method: "POST",
				credentials: "include", // This makes sure cookies are sent!
			});

			if (res.ok) {
				dispatch(signOutSuccess()); // Clear Redux state
				navigate("/login"); // Redirect to login
			} else {
				const data = await res.json();
				console.error(data);
				setLogoutErrorMsg(data.message || "Logout failed.");
				setShowToast(true); // Show toast notification
			}
		} catch (err) {
			console.error("Error logging out:", err);
			setLogoutErrorMsg("Something went wrong while logging out.");
			setShowToast(true); // Show toast notification
		}
	};

	return (
		<div className="flex min-h-screen bg-background w-full">
			{/* Header */}
			<header className="fixed w-full top-0 left-0 right-0 h-16 border-b border-r border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md z-30 flex items-center pl-4 pr-4">
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center">
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden text-slate-600 dark:text-slate-300"
							onClick={() => setIsMobileOpen(!isMobileOpen)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-menu">
								<line x1="4" x2="20" y1="12" y2="12" />
								<line x1="4" x2="20" y1="6" y2="6" />
								<line x1="4" x2="20" y1="18" y2="18" />
							</svg>
						</Button>
						<Logo className="relative z-10" />
					</div>

					<div className="hidden md:flex items-center relative max-w-md w-full mx-4">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
						<Input
							type="search"
							placeholder="Search..."
							className="pl-9 h-9 bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-full focus:ring-primary"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					<div className="flex items-center gap-2">
						{/* Theme toggle */}
						<ModeToggle />

						{/* Notifications */}
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full h-9 w-9 text-slate-600 dark:text-slate-300 hover:bg-primary/10 dark:hover:bg-primary/30 transition-colors duration-200 ease-in-out focus:outline-none ">
							<Bell className="h-5 w-5" />
						</Button>

						{/* User dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="relative h-9 w-9 rounded-full overflow-hidden transition-all hover:ring-2 hover:ring-primary/20 hover:scale-105">
									<Avatar className="h-9 w-9 border-2 border-primary/20 dark:border-primary/30">
										<AvatarImage
											src={
												currentUser?.profilePicture !==
												"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
													? currentUser?.profilePicture
													: "https://via.placeholder.com/32"
											}
											alt="@user"
										/>
										<AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-white font-medium">
											{currentUser?.firstName?.charAt(0).toUpperCase()}
											{currentUser?.lastName?.charAt(0).toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-64 mt-2 glass border border-slate-200/50 dark:border-slate-700/50 shadow-xl rounded-xl overflow-hidden backdrop-blur-sm"
								align="end"
								sideOffset={8}
								alignOffset={0}>
								<div className="p-0">
									{/* User info with gradient background */}
									<div className="relative overflow-hidden">
										<div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-primary/20 dark:from-primary/40 dark:to-primary/10 backdrop-blur-sm -z-10"></div>
										<div className="px-4 py-3 flex items-center gap-3">
											<Avatar className="h-12 w-12 border-2 border-white/50 dark:border-slate-700/50 shadow-md">
												<AvatarImage
													src={
														currentUser?.profilePicture !==
														"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
															? currentUser?.profilePicture
															: "https://via.placeholder.com/32"
													}
													alt="@user"
												/>
												<AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-white font-medium">
													{currentUser?.firstName?.charAt(0).toUpperCase()}
													{currentUser?.lastName?.charAt(0).toUpperCase()}
												</AvatarFallback>
											</Avatar>
											<div className="flex flex-col">
												<p className="text-sm font-medium text-slate-900 dark:text-white">
													{currentUser?.firstName} {currentUser?.lastName}
												</p>
												<p className="text-xs text-slate-500 dark:text-slate-400">
													{currentUser?.email}
												</p>
												<div className="flex items-center mt-1">
													<div className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></div>
													<span className="text-xs text-green-600 dark:text-green-400 font-medium">
														Online
													</span>
												</div>
											</div>
										</div>
									</div>

									<div className="p-2">
										<DropdownMenuItem
											className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 focus:bg-slate-100/80 dark:focus:bg-slate-800/80 transition-colors slide-in"
											style={{ animationDelay: "0.05s" }}
											onClick={() => setEditModalOpen(true)}>
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
												className="text-primary">
												<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
												<circle cx="12" cy="7" r="4"></circle>
											</svg>
											<span>Edit Profile</span>
										</DropdownMenuItem>

										<DropdownMenuItem
											className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 focus:bg-slate-100/80 dark:focus:bg-slate-800/80 transition-colors slide-in"
											style={{ animationDelay: "0.1s" }}
											onClick={() => setChangePasswordModalOpen(true)}>
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
												className="text-primary">
												<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
												<circle cx="12" cy="12" r="3"></circle>
											</svg>
											<span>Change Password</span>
										</DropdownMenuItem>

										<DropdownMenuItem
											className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 focus:bg-slate-100/80 dark:focus:bg-slate-800/80 transition-colors slide-in"
											style={{ animationDelay: "0.15s" }}>
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
												className="text-primary">
												<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
												<circle cx="12" cy="12" r="3"></circle>
											</svg>
											<span>Settings</span>
										</DropdownMenuItem>
									</div>

									<DropdownMenuSeparator className="bg-slate-200/70 dark:bg-slate-700/70 mx-2" />

									<div className="p-2">
										<DropdownMenuItem
											className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 focus:bg-rose-50 dark:focus:bg-rose-900/20 transition-colors slide-in"
											style={{ animationDelay: "0.2s" }}
											onClick={handleLogout}>
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
												className="text-rose-500">
												<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
												<polyline points="16 17 21 12 16 7"></polyline>
												<line x1="21" y1="12" x2="9" y2="12"></line>
											</svg>
											<span>Log out</span>
										</DropdownMenuItem>
									</div>
								</div>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</header>

			{/* Toast notification */}
			<ToastErrorMessage
				message={showToast ? logoutErrorMsg : ""}
				onDismiss={() => setShowToast(false)}
				position="top-right"
			/>

			{/* Sidebar */}
			<CustomSidebar
				isMobileOpen={isMobileOpen}
				setIsMobileOpen={setIsMobileOpen}
				activeTab={activeTab}
				onTabChange={handleTabChange}
				isCollapsed={isCollapsed}
				toggleSidebar={toggleSidebar}
				menuItems={tabs}
			/>

			<EditProfileModal
				isOpen={isEditModalOpen}
				onClose={() => setEditModalOpen(false)}
			/>

			<ChangePasswordModal
				isOpen={isChangePasswordModalOpen}
				onClose={() => setChangePasswordModalOpen(false)}
			/>

			{/* Main content */}
			<main
				className={`flex-1 pt-16 w-full transition-all duration-300 ease-in-out ${
					isCollapsed ? "md:ml-[83px]" : "md:ml-[230px]"
				}`}>
				<div className="w-full">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
