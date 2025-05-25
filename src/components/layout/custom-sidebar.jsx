import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

// Custom hook for media query
const useMediaQuery = (query) => {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(query);
		if (media.matches !== matches) {
			setMatches(media.matches);
		}

		const listener = () => setMatches(media.matches);
		media.addEventListener("change", listener);

		return () => media.removeEventListener("change", listener);
	}, [matches, query]);

	return matches;
};

export function CustomSidebar({
	isMobileOpen,
	setIsMobileOpen,
	activeTab,
	onTabChange,
	isCollapsed,
	toggleSidebar,
	menuItems,
}) {
	const isMobile = useMediaQuery("(max-width: 768px)");

	const scrollRef = useRef(null);

	useEffect(() => {
		if (isMobileOpen && scrollRef.current) {
			scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, [isMobileOpen]);

	const sidebarVariants = {
		expanded: { width: "230px" },
		collapsed: { width: "83px" },
	};

	// Mobile sidebar variants
	const mobileSidebarVariants = {
		open: {
			x: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 30,
			},
		},
		closed: {
			x: "-100%",
			opacity: 0,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 30,
			},
		},
	};

	const handleTabChange = (tab) => {
		onTabChange(tab);
	};

	// Desktop sidebar
	const DesktopSidebar = () => (
		<motion.div
			className={cn(
				"h-[calc(100vh-4rem)] fixed top-16 left-0 z-20 pt-6 pb-6 flex flex-col",
				"bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-r border-slate-200 dark:border-slate-700"
			)}
			variants={sidebarVariants}
			initial={false}
			animate={isCollapsed ? "collapsed" : "expanded"}
			transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}>
			<div
				ref={scrollRef}
				className="flex-1 overflow-y-auto px-3 py-6 space-y-6">
				<div className="space-y-1.5">
					{menuItems.map((item) => (
						<motion.div
							key={item.id}
							whileHover={{ x: 4 }}
							whileTap={{ scale: 0.98 }}
							transition={{ duration: 0.2 }}>
							<Button
								variant="ghost"
								className={cn(
									"w-full justify-start gap-3 rounded-xl h-12 px-4 relative overflow-hidden",
									activeTab === item.id
										? "bg-primary/10 text-primary font-medium hover:bg-primary/20 dark:hover:bg-primary/30 dark:text-primary"
										: "hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300",
									isCollapsed ? "justify-center" : ""
								)}
								onClick={() => handleTabChange(item)}>
								{activeTab === item.id && (
									<motion.div
										layoutId="activeTab"
										className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full"
										transition={{ duration: 0.3 }}
									/>
								)}
								<item.icon
									size={20}
									className={activeTab === item.id ? "text-primary" : ""}
								/>
								<AnimatePresence mode="wait">
									{!isCollapsed && (
										<motion.span className="whitespace-nowrap overflow-hidden">
											{item.label}
										</motion.span>
									)}
								</AnimatePresence>
							</Button>
						</motion.div>
					))}
				</div>
			</div>

			{/* Toggle button for desktop */}
			<div className="hidden md:block absolute -right-3 top-5">
				<Button
					variant="outline"
					size="icon"
					onClick={toggleSidebar}
					className="h-6 w-6 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md">
					{isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
				</Button>
			</div>
		</motion.div>
	);

	// Mobile sidebar
	const MobileSidebar = () => (
		<motion.div
			className="fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] w-[280px] bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col"
			variants={mobileSidebarVariants}
			initial="closed"
			animate={isMobileOpen ? "open" : "closed"}>
			<div className="flex-1 overflow-y-auto px-3 py-6 space-y-6">
				<div className="space-y-1.5">
					{menuItems.map((item) => (
						<motion.div
							key={item.id}
							whileHover={{ x: 4 }}
							whileTap={{ scale: 0.98 }}
							transition={{ duration: 0.2 }}>
							<Button
								variant="ghost"
								className={cn(
									"w-full justify-start gap-3 rounded-xl h-12 px-4 relative overflow-hidden",
									activeTab === item.id
										? "bg-primary/10 text-primary font-medium"
										: "hover:bg-white/50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300"
								)}
								onClick={() => handleTabChange(item.id)}>
								{activeTab === item.id && (
									<motion.div
										layoutId="mobileActiveTab"
										className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full"
										transition={{ duration: 0.3 }}
									/>
								)}
								<item.icon
									size={20}
									className={activeTab === item.id ? "text-primary" : ""}
								/>
								<span className="whitespace-nowrap overflow-hidden">
									{item.label}
								</span>
							</Button>
						</motion.div>
					))}
				</div>
			</div>
		</motion.div>
	);

	return (
		<>
			{/* Mobile overlay */}
			<AnimatePresence>
				{isMobile && isMobileOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.6 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 top-16 bg-black z-10 backdrop-blur-sm"
						onClick={() => setIsMobileOpen(false)}
					/>
				)}
			</AnimatePresence>

			{/* Render appropriate sidebar based on device */}
			{isMobile ? <MobileSidebar /> : <DesktopSidebar />}
		</>
	);
}
