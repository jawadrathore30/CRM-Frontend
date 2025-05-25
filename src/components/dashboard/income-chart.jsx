import { useEffect, useState } from "react";
import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	CartesianGrid,
} from "recharts";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const data = [
	{ month: 1, income: 0, expense: 0 },
	{ month: 2, income: 0, expense: 0 },
	{ month: 3, income: 100, expense: 0 },
	{ month: 4, income: 1000, expense: 0 },
	{ month: 5, income: 500, expense: 0 },
	{ month: 6, income: 0, expense: 0 },
	{ month: 7, income: 0, expense: 0 },
	{ month: 8, income: 0, expense: 0 },
	{ month: 9, income: 0, expense: 0 },
	{ month: 10, income: 0, expense: 0 },
	{ month: 11, income: 0, expense: 0 },
	{ month: 12, income: 0, expense: 0 },
];

// Calculate totals
const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
const totalExpense = data.reduce((sum, item) => sum + item.expense, 0);

export function IncomeChart() {
	const { mode } = useSelector((state) => state.theme);
	const [mounted, setMounted] = useState(false);
	const [visibleLines, setVisibleLines] = useState({
		income: true,
		expense: true,
	});

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleLine = (line) => {
		setVisibleLines((prev) => ({
			...prev,
			[line]: !prev[line],
		}));
	};

	if (!mounted) return null;

	const isDark = mode === "dark";

	// Theme-specific colors
	const colors = {
		background: isDark ? "bg-slate-800" : "bg-white",
		text: isDark ? "text-white" : "text-slate-900",
		subtext: isDark ? "text-slate-400" : "text-slate-500",
		border: isDark ? "border-slate-700" : "border-slate-200",
		grid: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
		axisColor: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
		tooltipBg: isDark ? "bg-slate-800" : "bg-white",
		tooltipBorder: isDark ? "border-slate-700" : "border-slate-200",
	};

	return (
		<div className={`flex flex-col h-full w-full ${colors.background}`}>
			<div className="flex justify-between items-center mb-2 px-4 pt-4">
				<h2 className={`text-lg font-medium ${colors.text}`}>
					Income vs Expenses
				</h2>
				<div className="flex gap-2">
					<Button
						size="sm"
						onClick={() => toggleLine("income")}
						className={`rounded-full px-3 py-1 h-8 ${
							visibleLines.income
								? "bg-cyan-500 hover:bg-cyan-600"
								: "bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
						}`}>
						Income
					</Button>
					<Button
						size="sm"
						onClick={() => toggleLine("expense")}
						className={`rounded-full px-3 py-1 h-8 ${
							visibleLines.expense
								? "bg-blue-500 hover:bg-blue-600"
								: "bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
						}`}>
						Expense
					</Button>
				</div>
			</div>

			<div className="flex-1 w-full px-2">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={data}
						margin={{
							top: 5,
							right: 10,
							left: 10,
							bottom: 5,
						}}>
						<CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => `${value}`}
							stroke={colors.axisColor}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => `${value}`}
							stroke={colors.axisColor}
						/>
						<Tooltip
							content={({ active, payload }) => {
								if (active && payload && payload.length) {
									return (
										<div
											className={`rounded-lg border ${colors.tooltipBorder} ${colors.tooltipBg} p-3 shadow-sm`}>
											<div className="grid gap-2">
												<div className="flex flex-col">
													<span
														className={`text-[0.70rem] uppercase ${colors.subtext}`}>
														Month
													</span>
													<span className={`font-bold ${colors.text}`}>
														{payload[0].payload.month}
													</span>
												</div>
												{visibleLines.income && (
													<div className="flex flex-col">
														<span
															className={`text-[0.70rem] uppercase ${colors.subtext}`}>
															Income
														</span>
														<span className="font-bold text-cyan-500">
															${payload[0].payload.income}
														</span>
													</div>
												)}
												{visibleLines.expense && (
													<div className="flex flex-col">
														<span
															className={`text-[0.70rem] uppercase ${colors.subtext}`}>
															Expense
														</span>
														<span className="font-bold text-blue-500">
															${payload[0].payload.expense}
														</span>
													</div>
												)}
											</div>
										</div>
									);
								}
								return null;
							}}
						/>
						{visibleLines.income && (
							<Line
								type="monotone"
								dataKey="income"
								strokeWidth={3}
								dot={{ r: 4, strokeWidth: 0, fill: "#06b6d4" }}
								activeDot={{
									r: 6,
									style: { fill: "#06b6d4", opacity: 0.8 },
								}}
								style={{
									stroke: "#06b6d4",
								}}
							/>
						)}
						{visibleLines.expense && (
							<Line
								type="monotone"
								dataKey="expense"
								strokeWidth={3}
								dot={{ r: 4, strokeWidth: 0, fill: "#3b82f6" }}
								activeDot={{
									r: 6,
									style: { fill: "#3b82f6", opacity: 0.8 },
								}}
								style={{
									stroke: "#3b82f6",
								}}
							/>
						)}
					</LineChart>
				</ResponsiveContainer>
			</div>

			<div className="grid grid-cols-3 gap-4 mt-auto mb-4 text-center px-4">
				<div className="flex flex-col">
					<span className={`text-sm ${colors.subtext}`}>Period</span>
					<span className={`text-xl font-bold ${colors.text}`}>2025</span>
				</div>
				<div className="flex flex-col">
					<span className={`text-sm ${colors.subtext}`}>Income</span>
					<span className="text-xl font-bold text-cyan-500">
						${totalIncome.toFixed(2)}
					</span>
				</div>
				<div className="flex flex-col">
					<span className={`text-sm ${colors.subtext}`}>Expenses</span>
					<span className="text-xl font-bold text-blue-500">
						${totalExpense.toFixed(2)}
					</span>
				</div>
			</div>
		</div>
	);
}
