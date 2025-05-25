import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const data = [
	{ name: "New", value: 20, color: "#9ca3af" },
	{ name: "Disqualified", value: 15, color: "#f43f5e" },
	{ name: "Qualified", value: 25, color: "#06b6d4" },
	{ name: "Contacted", value: 18, color: "#f97316" },
	{ name: "Proposal Sent", value: 12, color: "#84cc16" },
	{ name: "Converted", value: 10, color: "#14b8a6" },
];

// Calculate total
const total = data.reduce((sum, item) => sum + item.value, 0);

// Custom label component with animation
const CustomLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index,
	name,
	fill,
}) => {
	const RADIAN = Math.PI / 180;
	const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	// Only show labels for segments with enough space (more than 8%)
	if (percent < 0.08) return null;

	return (
		<motion.g
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}>
			<text
				x={x}
				y={y}
				fill={fill}
				textAnchor={x > cx ? "start" : "end"}
				dominantBaseline="central"
				fontSize="12"
				fontWeight="500">
				{`${name} ${(percent * 100).toFixed(0)}%`}
			</text>
		</motion.g>
	);
};

export function LeadsChart() {
	const { mode } = useSelector((state) => state.theme);
	const [mounted, setMounted] = useState(false);
	const [activeIndex, setActiveIndex] = useState(null);
	const [isAnimating, setIsAnimating] = useState(true);

	useEffect(() => {
		setMounted(true);
		// Start animation when component mounts
		const timer = setTimeout(() => {
			setIsAnimating(false);
		}, 1500);
		return () => clearTimeout(timer);
	}, []);

	const onPieEnter = (_, index) => {
		setActiveIndex(index);
	};

	const onPieLeave = () => {
		setActiveIndex(null);
	};

	if (!mounted) return null;

	const isDark = mode === "dark";

	// Theme-specific colors
	const colors = {
		text: isDark ? "text-white" : "text-slate-900",
		subtext: isDark ? "text-slate-400" : "text-slate-500",
		tooltipBg: isDark ? "bg-slate-800" : "bg-white",
		tooltipBorder: isDark ? "border-slate-700" : "border-slate-200",
		shadow: isDark
			? "shadow-lg shadow-slate-900/20"
			: "shadow-lg shadow-slate-200/50",
	};

	// Custom tooltip component
	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			const data = payload[0].payload;
			const percentage = ((data.value / total) * 100).toFixed(1);

			return (
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					className={`rounded-lg border ${colors.tooltipBorder} ${colors.tooltipBg} p-3 ${colors.shadow}`}
					style={{ zIndex: 20 }}>
					<div className="flex items-center gap-2 mb-1">
						<div
							className="h-3 w-3 rounded-full"
							style={{ backgroundColor: data.color }}></div>
						<span className={`font-medium ${colors.text}`}>{data.name}</span>
					</div>
					<div className="grid grid-cols-2 gap-3 mt-2">
						<div className="flex flex-col">
							<span className={`text-[0.70rem] uppercase ${colors.subtext}`}>
								Count
							</span>
							<span className={`font-bold ${colors.text}`}>{data.value}</span>
						</div>
						<div className="flex flex-col">
							<span className={`text-[0.70rem] uppercase ${colors.subtext}`}>
								Percentage
							</span>
							<span className={`font-bold ${colors.text}`}>{percentage}%</span>
						</div>
					</div>
				</motion.div>
			);
		}
		return null;
	};

	// Custom legend
	const CustomLegend = ({ payload }) => {
		return (
			<div className="flex flex-wrap justify-center gap-2 mt-auto">
				{payload.map((entry, index) => (
					<motion.div
						key={`legend-${index}`}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3, delay: index * 0.05 }}
						className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
						style={{
							backgroundColor: `${entry.color}20`, // 20% opacity background
							border: `1px solid ${entry.color}40`, // 40% opacity border
						}}>
						<div
							className="h-2.5 w-2.5 rounded-full"
							style={{ backgroundColor: entry.color }}></div>
						<span
							className={`text-xs font-medium`}
							style={{ color: entry.color }}>
							{entry.value}
						</span>
					</motion.div>
				))}
			</div>
		);
	};

	return (
		<div className="h-full w-full flex flex-col">
			<div className="flex-1 relative">
				{/* Total count in center */}
				<div className="absolute inset-0 flex items-center justify-center flex-col z-0 pointer-events-none">
					<motion.p
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.8 }}
						className={`text-3xl font-bold ${colors.text}`}>
						{total}
					</motion.p>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.7 }}
						transition={{ duration: 0.5, delay: 1 }}
						className={`text-xs uppercase ${colors.subtext}`}>
						Total Leads
					</motion.p>
				</div>

				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							innerRadius={isAnimating ? 0 : 60}
							outerRadius={isAnimating ? 0 : 80}
							paddingAngle={3}
							dataKey="value"
							onMouseEnter={onPieEnter}
							onMouseLeave={onPieLeave}
							// Animated start angle
							startAngle={isAnimating ? 0 : 90}
							endAngle={isAnimating ? 0 : 450}
							// Label component
							label={(props) => (
								<CustomLabel {...props} fill={isDark ? "#fff" : "#333"} />
							)}
							labelLine={false}
							// Animation
							animationBegin={0}
							animationDuration={1500}
							animationEasing="ease-out">
							{data.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={entry.color}
									stroke={isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.8)"}
									strokeWidth={activeIndex === index ? 2 : 1}
									// Scale up the active segment
									scale={activeIndex === index ? 1.05 : 1}
								/>
							))}
						</Pie>
						<Tooltip content={<CustomTooltip />} />
					</PieChart>
				</ResponsiveContainer>
			</div>

			{/* Legend at the bottom */}
			<div className="mt-auto mb-4 px-4">
				<div className="flex flex-wrap justify-center gap-2">
					{data.map((entry, index) => (
						<motion.div
							key={`tag-${index}`}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: index * 0.05 }}
							className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
							style={{
								backgroundColor: `${entry.color}20`, // 20% opacity background
								border: `1px solid ${entry.color}40`, // 40% opacity border
							}}>
							<div
								className="h-2.5 w-2.5 rounded-full"
								style={{ backgroundColor: entry.color }}></div>
							<span
								className={`text-xs font-medium`}
								style={{ color: entry.color }}>
								{entry.name}
							</span>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
