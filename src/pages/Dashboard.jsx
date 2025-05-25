import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, CreditCard } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { IncomeChart } from "../components/dashboard/income-chart";
import { LeadsChart } from "../components/dashboard/leads-chart";
import { LatestActivity } from "../components/dashboard/latest-activity";
import { ProjectsSummary } from "../components/dashboard/projects-summary";

export default function Dashboard() {
	const [mounted, setMounted] = useState(false);

	// Ensure hydration
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: "spring", stiffness: 300, damping: 24 },
		},
	};

	return (
		<motion.div
			className="flex flex-col space-y-6 mx-auto min-h-screen w-full p-4 md:p-8"
			variants={containerVariants}
			initial="hidden"
			animate="visible">
			<motion.div variants={itemVariants}>
				<h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
					Dashboard
				</h1>
				<p className="text-slate-500 dark:text-slate-400">
					Welcome back, here's an overview of your business
				</p>
			</motion.div>

			<motion.div
				className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
				variants={containerVariants}>
				<motion.div variants={itemVariants}>
					<Card className="border-t-4 border-t-emerald-500 transition-all hover:shadow-md bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
								Payments - Today
							</CardTitle>
							<div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
								<DollarSign className="h-4 w-4 text-emerald-500" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-slate-900 dark:text-white">
								$1,092.20
							</div>
							<p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
								<span className="text-emerald-500">↑ 12%</span> from yesterday
							</p>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div variants={itemVariants}>
					<Card className="border-t-4 border-t-cyan-500 transition-all hover:shadow-md bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
								Payments - Month
							</CardTitle>
							<div className="h-8 w-8 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
								<DollarSign className="h-4 w-4 text-cyan-500" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-slate-900 dark:text-white">
								$24,565.40
							</div>
							<p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
								<span className="text-cyan-500">↑ 8%</span> from last month
							</p>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div variants={itemVariants}>
					<Card className="border-t-4 border-t-amber-500 transition-all hover:shadow-md bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
								Invoices - Due
							</CardTitle>
							<div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
								<CreditCard className="h-4 w-4 text-amber-500" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-slate-900 dark:text-white">
								$3,780.00
							</div>
							<p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
								<span className="text-amber-500">5 invoices</span> pending
							</p>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div variants={itemVariants}>
					<Card className="border-t-4 border-t-rose-500 transition-all hover:shadow-md bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
								Invoices - Overdue
							</CardTitle>
							<div className="h-8 w-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
								<TrendingUp className="h-4 w-4 text-rose-500" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-slate-900 dark:text-white">
								$1,205.75
							</div>
							<p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
								<span className="text-rose-500">2 invoices</span> overdue
							</p>
						</CardContent>
					</Card>
				</motion.div>
			</motion.div>

			<motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-3">
				<Card className="col-span-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
					<CardHeader className="pb-2">
						<CardTitle className="text-slate-900 dark:text-white">
							Income vs Expenses
						</CardTitle>
						<CardDescription className="text-slate-500 dark:text-slate-400">
							Monthly financial overview
						</CardDescription>
					</CardHeader>
					<CardContent className="p-0 h-[400px]">
						<div className="h-full w-full">
							<IncomeChart />
						</div>
					</CardContent>
				</Card>

				<Card className="col-span-1 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
					<CardHeader className="pb-2">
						<CardTitle className="text-slate-900 dark:text-white">
							Lead Distribution
						</CardTitle>
						<CardDescription className="text-slate-500 dark:text-slate-400">
							Current pipeline status
						</CardDescription>
					</CardHeader>
					<CardContent className="p-0 h-[400px]">
						<div className="h-full w-full">
							<LeadsChart />
						</div>
					</CardContent>
				</Card>
			</motion.div>

			<motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2">
				<motion.div variants={itemVariants} className="col-span-1">
					<LatestActivity />
				</motion.div>
				<motion.div variants={itemVariants} className="col-span-1">
					<ProjectsSummary />
				</motion.div>
			</motion.div>

			{/* Uncomment this section if you want to show the additional cards */}
			{/* <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-slate-900 dark:text-white text-lg">
              Recent Clients
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {["JD", "TS", "AK"][i - 1]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {["John Doe", "Taylor Swift", "Anna Kendrick"][i - 1]}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {["Web Design", "Marketing", "App Development"][i - 1]}
                    </p>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {["2d ago", "1w ago", "2w ago"][i - 1]}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-slate-900 dark:text-white text-lg">
              Upcoming Tasks
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      ["bg-amber-100", "bg-cyan-100", "bg-rose-100"][i - 1]
                    } dark:opacity-80`}
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${
                        ["bg-amber-500", "bg-cyan-500", "bg-rose-500"][i - 1]
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {
                        [
                          "Client meeting",
                          "Project deadline",
                          "Review designs",
                        ][i - 1]
                      }
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {
                        [
                          "Today, 2:00 PM",
                          "Tomorrow, 11:00 AM",
                          "Friday, 10:00 AM",
                        ][i - 1]
                      }
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 rounded-full"
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    <span className="text-xs">Add</span>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-slate-900 dark:text-white text-lg">
              Quick Stats
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              Refresh
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Total Clients
                    </p>
                  </div>
                </div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  124
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Active Projects
                    </p>
                  </div>
                </div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  36
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      New Leads
                    </p>
                  </div>
                </div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  18
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div> */}
		</motion.div>
	);
}
