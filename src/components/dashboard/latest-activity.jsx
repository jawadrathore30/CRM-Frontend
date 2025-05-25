import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
	{
		id: "1",
		user: {
			name: "Steven",
			avatar: "/placeholder.svg?height=40&width=40",
			initials: "S",
		},
		time: "2 hours ago",
		action: "Created a new invoice",
		details: {
			type: "invoice",
			id: "INV-000135",
		},
	},
	{
		id: "2",
		user: {
			name: "Steven",
			avatar: "/placeholder.svg?height=40&width=40",
			initials: "S",
		},
		time: "2 hours ago",
		action: "Created a new invoice",
		details: {
			type: "invoice",
			id: "INV-000133",
		},
	},
	{
		id: "3",
		user: {
			name: "Steven",
			avatar: "/placeholder.svg?height=40&width=40",
			initials: "S",
		},
		time: "2 hours ago",
		action: "Created a new invoice",
		details: {
			type: "invoice",
			id: "INV-000134",
		},
	},
	{
		id: "4",
		user: {
			name: "Steven",
			avatar: "/placeholder.svg?height=40&width=40",
			initials: "S",
		},
		time: "2 hours ago",
		action: "Created a new proposal",
		details: {
			type: "proposal",
		},
	},
	{
		id: "5",
		user: {
			name: "Alex",
			avatar: "/placeholder.svg?height=40&width=40",
			initials: "A",
		},
		time: "3 hours ago",
		action: "Updated client information",
		details: {
			type: "invoice",
		},
	},
	{
		id: "6",
		user: {
			name: "Maria",
			avatar: "/placeholder.svg?height=40&width=40",
			initials: "M",
		},
		time: "4 hours ago",
		action: "Sent payment reminder",
		details: {
			type: "invoice",
			id: "INV-000130",
		},
	},
];

export function LatestActivity() {
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
		hidden: { y: 10, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: "spring", stiffness: 300, damping: 24 },
		},
	};

	return (
		<Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
			<CardHeader className="pb-3">
				<CardTitle className="text-slate-900 dark:text-white text-xl">
					Latest Activity
				</CardTitle>
			</CardHeader>
			<CardContent className="px-0 py-0">
				<div className="h-[400px] overflow-y-auto pr-2 custom-scrollbar">
					<motion.div
						className="space-y-3 px-6"
						variants={containerVariants}
						initial="hidden"
						animate="visible">
						{activities.map((activity) => (
							<motion.div
								key={activity.id}
								className="flex items-start gap-4 p-4 rounded-md bg-slate-100 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700/60 transition-colors"
								variants={itemVariants}>
								<Avatar className="h-10 w-10 border-2 border-slate-300 dark:border-slate-600">
									<AvatarImage
										src={activity.user.avatar || "/placeholder.svg"}
										alt={activity.user.name}
									/>
									<AvatarFallback className="bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-200">
										{activity.user.initials}
									</AvatarFallback>
								</Avatar>
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										<span className="text-cyan-600 dark:text-cyan-500 font-medium">
											{activity.user.name}
										</span>
										<span className="text-slate-500 dark:text-slate-400 text-sm">
											{activity.time}
										</span>
									</div>
									<p className="text-slate-700 dark:text-slate-300">
										{activity.action}
									</p>
									{activity.details.id && (
										<div className="mt-2 text-sm">
											<span className="text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer">
												{activity.details.type === "invoice"
													? "Invoice"
													: "Proposal"}{" "}
												- {activity.details.id}
											</span>
										</div>
									)}
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</CardContent>
		</Card>
	);
}
