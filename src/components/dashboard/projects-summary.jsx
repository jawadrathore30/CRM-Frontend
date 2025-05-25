import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projectStatuses = [
	{
		id: "not-started",
		name: "Not Started",
		count: 6,
		assigned: 5,
		color: "bg-slate-500",
		lightColor: "bg-slate-400",
	},
	{
		id: "in-progress",
		name: "In Progress",
		count: 3,
		assigned: 3,
		color: "bg-cyan-500",
		lightColor: "bg-cyan-500",
	},
	{
		id: "on-hold",
		name: "On Hold",
		count: 2,
		assigned: 2,
		color: "bg-amber-500",
		lightColor: "bg-amber-500",
	},
	{
		id: "completed",
		name: "Completed",
		count: 2,
		assigned: 2,
		color: "bg-emerald-500",
		lightColor: "bg-emerald-500",
	},
];

export function ProjectsSummary() {
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
					Projects
				</CardTitle>
			</CardHeader>
			<CardContent className="px-6 py-2">
				<motion.div
					className="space-y-4"
					variants={containerVariants}
					initial="hidden"
					animate="visible">
					{projectStatuses.map((status) => (
						<motion.div
							key={status.id}
							className="flex items-center gap-4"
							variants={itemVariants}>
							<div
								className={`flex h-12 w-12 items-center justify-center rounded-full ${status.lightColor} dark:${status.color}`}>
								<span className="text-white font-medium">{status.count}</span>
							</div>
							<div className="space-y-1">
								<p className="text-slate-900 dark:text-white font-medium">
									{status.name}
								</p>
								<p className="text-slate-500 dark:text-slate-400 text-sm">
									Assigned to me:{" "}
									<span className="text-slate-700 dark:text-white">
										{status.assigned}
									</span>
								</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</CardContent>
		</Card>
	);
}
