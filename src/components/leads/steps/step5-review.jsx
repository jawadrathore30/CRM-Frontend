"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Tag,
	MapPin,
	ImageIcon,
	ClipboardList,
	Users,
	DollarSign,
	CheckCircle,
	Ruler,
	Hammer,
} from "lucide-react";
import { remodelingAreasFull } from "./data/remodeling-areas-data";

export default function Step5Review({ formData }) {
	// Animation variants
	const formItemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.05,
				type: "spring",
				stiffness: 300,
				damping: 24,
			},
		}),
	};

	// Helper function to get area by ID
	const getAreaById = (areaId) => {
		return remodelingAreasFull.find((area) => area.id === areaId) || null;
	};

	// Helper function to get subcategory by ID
	const getSubcategoryById = (areaId, subcategoryId) => {
		const area = getAreaById(areaId);
		if (!area) return null;
		return (
			area.subcategories.find(
				(subcategory) => subcategory.id === subcategoryId
			) || null
		);
	};

	// Count total images across all areas
	const getTotalImageCount = () => {
		let count = 0;
		Object.keys(formData.areaDetails || {}).forEach((areaId) => {
			const areaImages = formData.areaDetails[areaId]?.images || [];
			count += areaImages.length;
		});
		return count;
	};

	// Format currency
	const formatCurrency = (value) => {
		if (!value) return "Not provided";
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
		}).format(value);
	};

	// Get wall option label
	const getWallOptionLabel = (optionId) => {
		const wallOptions = {
			paint: "Paint",
			"wall-outlet": "Wall Outlet",
			"wall-outlet-plate": "Wall Outlet Plate",
			"sheet-rock": "Sheet Rock",
		};
		return wallOptions[optionId] || optionId;
	};

	// Get material type label
	const getMaterialTypeLabel = (subcategory, subcatData) => {
		// Determine which property to use for material types
		let materialTypeProperty = "materialTypes";

		// Check for special material type properties
		const specialMaterialProperties = [
			"lightFixtureTypes",
			"doorTypes",
			"mirrorTypes",
			"cabinetFinishTypes",
			"countertopMaterialTypes",
			"applianceTypes",
			"sinkTypes",
			"faucetStyles",
			"toiletTypes",
			"bathtubTypes",
			"showerTypes",
			"vanityStyles",
			"closetSystemTypes",
			"landscapingTypes",
			"irrigationTypes",
			"ceilingTypes",
		];

		for (const prop of specialMaterialProperties) {
			if (subcategory[prop]) {
				materialTypeProperty = prop;
				break;
			}
		}

		return {
			type: subcatData[materialTypeProperty] || "",
			property: materialTypeProperty,
			description: subcatData[`${materialTypeProperty}Description`] || "",
		};
	};

	// Calculate baseboard total
	const calculateBaseboardTotal = (length, width) => {
		const numLength = Number.parseFloat(length || 0);
		const numWidth = Number.parseFloat(width || 0);
		if (isNaN(numLength) || isNaN(numWidth)) return 0;
		return numLength + numWidth;
	};

	return (
		<div className="space-y-6">
			<motion.div
				custom={0}
				variants={formItemVariants}
				initial="hidden"
				animate="visible"
				className="space-y-4">
				<div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
					<Tag className="h-5 w-5 text-primary/70" />
					<h3 className="text-lg font-medium">Review & Finalize</h3>
				</div>
				<p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
					Review all information before creating the lead.
				</p>

				<div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-lg border border-slate-200 dark:border-slate-700/50 space-y-4">
					<div className="flex flex-col space-y-4">
						{/* Basic Information */}
						<div>
							<h4 className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2 mb-3">
								<Tag className="h-4 w-4 text-primary/70" />
								Customer Information
							</h4>
							<div className="grid grid-cols-2 gap-3">
								<div className="space-y-1">
									<p className="text-xs text-slate-500 dark:text-slate-400">
										Name
									</p>
									<p className="text-sm font-medium text-slate-900 dark:text-white">
										{formData.firstName && formData.lastName
											? `${formData.firstName} ${formData.lastName}`
											: formData.firstName ||
											  formData.lastName ||
											  "Not provided"}
									</p>
								</div>
								<div className="space-y-1">
									<p className="text-xs text-slate-500 dark:text-slate-400">
										Email
									</p>
									<p className="text-sm font-medium text-slate-900 dark:text-white">
										{formData.email || "Not provided"}
									</p>
								</div>
								<div className="space-y-1">
									<p className="text-xs text-slate-500 dark:text-slate-400">
										Phone
									</p>
									<p className="text-sm font-medium text-slate-900 dark:text-white">
										{formData.telephone || "Not provided"}
									</p>
								</div>
							</div>
						</div>

						{/* Address Information */}
						<div className="pt-3 border-t border-slate-200 dark:border-slate-700/50">
							<h4 className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2 mb-3">
								<MapPin className="h-4 w-4 text-primary/70" />
								Address
							</h4>
							<div className="space-y-1">
								<p className="text-sm text-slate-900 dark:text-white">
									{formData.street ? formData.street : "Not provided"}
									{formData.city && formData.state
										? `, ${formData.city}, ${formData.state}`
										: formData.city
										? `, ${formData.city}`
										: formData.state
										? `, ${formData.state}`
										: ""}
									{formData.zipCode ? ` ${formData.zipCode}` : ""}
								</p>
								<p className="text-sm text-slate-900 dark:text-white">
									{formData.country || ""}
								</p>
							</div>
						</div>

						{/* Remodeling Areas */}
						{formData.selectedAreas.length > 0 && (
							<div className="pt-3 border-t border-slate-200 dark:border-slate-700/50">
								<h4 className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2 mb-3">
									<ClipboardList className="h-4 w-4 text-primary/70" />
									Remodeling Areas
								</h4>
								<div className="space-y-4">
									{formData.selectedAreas.map((areaId) => {
										const area = getAreaById(areaId);
										if (!area) return null;

										const areaDetails = formData.areaDetails[areaId] || {};
										const selectedSubcategories = Object.keys(
											areaDetails.subcategories || {}
										).filter(
											(subcatId) =>
												areaDetails.subcategories[subcatId]?.selected
										);

										return (
											<div
												key={areaId}
												className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
												<div className="flex items-center gap-2 mb-2">
													{area.icon}
													<h5 className="text-sm font-medium">{area.label}</h5>
												</div>

												{selectedSubcategories.length > 0 ? (
													<div className="pl-6 space-y-3">
														{selectedSubcategories.map((subcatId) => {
															const subcategory = getSubcategoryById(
																areaId,
																subcatId
															);
															if (!subcategory) return null;

															const subcatData =
																areaDetails.subcategories[subcatId];
															const materialInfo = getMaterialTypeLabel(
																subcategory,
																subcatData
															);

															return (
																<div
																	key={subcatId}
																	className="mb-4 text-xs border-l-2 border-slate-200 dark:border-slate-700 pl-3">
																	<div className="font-medium mb-2">
																		{subcategory.label}
																	</div>

																	{/* Customer provides materials */}
																	<div className="mb-1 flex items-center gap-1 text-slate-600 dark:text-slate-400">
																		<CheckCircle
																			className={`h-4 w-4 ${
																				subcatData.customerProvidesMaterials
																					? "text-green-500"
																					: "text-slate-400"
																			}`}
																		/>
																		<span>
																			{subcatData.customerProvidesMaterials
																				? "Customer will provide materials"
																				: "Materials not provided by customer"}
																		</span>
																	</div>

																	{/* Demolition if applicable */}
																	{subcategory.canDemolish && (
																		<div className="mb-1 flex items-center gap-1 text-slate-600 dark:text-slate-400">
																			<Hammer className="h-4 w-4 text-primary/70" />
																			<span>
																				{subcatData.demolitionRequired
																					? "Demolition required"
																					: "No demolition needed"}
																			</span>
																		</div>
																	)}

																	{/* Wall Options if applicable */}
																	{subcategory.hasWallOptions &&
																		subcatData.selectedWallOptions &&
																		subcatData.selectedWallOptions.length >
																			0 && (
																			<div className="mb-1 space-y-1 text-slate-600 dark:text-slate-400">
																				<div className="flex items-center gap-1">
																					<span className="h-4 w-4 text-primary/70">
																						🧱
																					</span>
																					<span>Wall Options:</span>
																				</div>
																				<div className="pl-4 space-y-1">
																					{subcatData.selectedWallOptions.map(
																						(optionId) => (
																							<div
																								key={optionId}
																								className="flex items-center gap-1">
																								<CheckCircle className="h-3 w-3 text-green-500" />
																								<span>
																									{getWallOptionLabel(optionId)}
																								</span>
																								{optionId === "wall-outlet" &&
																									subcatData.wallOutletQuantity && (
																										<span className="text-xs text-slate-500">
																											(
																											{
																												subcatData.wallOutletQuantity
																											}{" "}
																											units)
																										</span>
																									)}
																								{optionId ===
																									"wall-outlet-plate" &&
																									subcatData.wallOutletPlateQuantity && (
																										<span className="text-xs text-slate-500">
																											(
																											{
																												subcatData.wallOutletPlateQuantity
																											}{" "}
																											units)
																										</span>
																									)}
																							</div>
																						)
																					)}
																				</div>
																			</div>
																		)}

																	{/* Material type if applicable */}
																	{materialInfo.type && (
																		<div className="mb-1 space-y-1 text-slate-600 dark:text-slate-400">
																			<div className="flex items-center gap-1">
																				<span className="h-4 w-4 text-primary/70">
																					🧱
																				</span>
																				<span>
																					{materialInfo.property ===
																					"materialTypes"
																						? "Material"
																						: materialInfo.property
																								.replace(/Types|Styles/g, "")
																								.replace(/^./, (char) =>
																									char.toUpperCase()
																								)}
																					: {materialInfo.type}
																				</span>
																			</div>

																			{/* Show description if type is "Other" */}
																			{materialInfo.type === "Other" &&
																				materialInfo.description && (
																					<div className="pl-4 text-xs">
																						"{materialInfo.description}"
																					</div>
																				)}
																		</div>
																	)}

																	{/* Measurements if applicable */}
																	{subcategory.needsMeasurements &&
																		(subcatData.width ||
																			subcatData.length ||
																			subcatData.quantity) && (
																			<div className="mb-1 flex items-center gap-1 text-slate-600 dark:text-slate-400">
																				<Ruler className="h-4 w-4 text-primary/70" />
																				<span>
																					{subcategory.unit === "sqft"
																						? `Measurement: Width ${
																								subcatData.width || 0
																						  }ft × Length ${
																								subcatData.length || 0
																						  }ft = ${(
																								Number.parseFloat(
																									subcatData.width || 0
																								) *
																								Number.parseFloat(
																									subcatData.length || 0
																								)
																						  ).toFixed(2)} sq ft`
																						: `${subcatData.quantity || 0} ${
																								subcategory.unit
																						  }`}
																				</span>
																			</div>
																		)}

																	{/* Baseboards if applicable */}
																	{subcategory.id === "floor" &&
																		subcatData.baseboardsRequired && (
																			<div className="mb-1 flex items-center gap-1 text-slate-600 dark:text-slate-400">
																				<span className="h-4 w-4 text-primary/70">
																					📏
																				</span>
																				<span>
																					Baseboards: Length{" "}
																					{subcatData.baseboardLength || 0} ft +
																					Width {subcatData.baseboardWidth || 0}{" "}
																					ft ={" "}
																					{calculateBaseboardTotal(
																						subcatData.baseboardLength,
																						subcatData.baseboardWidth
																					).toFixed(2)}{" "}
																					ft total
																				</span>
																			</div>
																		)}

																	{/* Sheet Rock Details if applicable */}
																	{subcategory.hasWallOptions &&
																		subcatData.selectedWallOptions &&
																		subcatData.selectedWallOptions.includes(
																			"sheet-rock"
																		) && (
																			<div className="mb-1 space-y-1 text-slate-600 dark:text-slate-400">
																				<div className="flex items-center gap-1">
																					<span className="h-4 w-4 text-primary/70">
																						🧱
																					</span>
																					<span>Sheet Rock Details:</span>
																				</div>
																				<div className="pl-4 space-y-1">
																					<div className="flex items-center gap-1">
																						<span>
																							Demolition:{" "}
																							{subcatData.sheetRockDemolitionRequired
																								? "Required"
																								: "Not Required"}
																						</span>
																					</div>
																					{subcatData.sheetRockDemolitionRequired && (
																						<div className="flex items-center gap-1">
																							<span>
																								Demolition Area:{" "}
																								{subcatData.sheetRockWidth || 0}
																								ft ×{" "}
																								{subcatData.sheetRockLength ||
																									0}
																								ft ={" "}
																								{(
																									Number.parseFloat(
																										subcatData.sheetRockWidth ||
																											0
																									) *
																									Number.parseFloat(
																										subcatData.sheetRockLength ||
																											0
																									)
																								).toFixed(2)}{" "}
																								sq ft
																							</span>
																						</div>
																					)}
																					<div className="flex items-center gap-1">
																						<span>
																							Installation Area:{" "}
																							{subcatData.sheetRockInstallWidth ||
																								0}
																							ft ×{" "}
																							{subcatData.sheetRockInstallLength ||
																								0}
																							ft ={" "}
																							{(
																								Number.parseFloat(
																									subcatData.sheetRockInstallWidth ||
																										0
																								) *
																								Number.parseFloat(
																									subcatData.sheetRockInstallLength ||
																										0
																								)
																							).toFixed(2)}{" "}
																							sq ft
																						</span>
																					</div>
																				</div>
																			</div>
																		)}

																	{/* Extra description if applicable */}
																	{subcatData.extraDescription && (
																		<div className="mt-1 text-slate-600 dark:text-slate-400 italic">
																			"{subcatData.extraDescription}"
																		</div>
																	)}
																</div>
															);
														})}
													</div>
												) : (
													<p className="text-xs text-slate-500 dark:text-slate-400 pl-6">
														No subcategories selected
													</p>
												)}
											</div>
										);
									})}
								</div>
							</div>
						)}

						{/* Images */}
						{getTotalImageCount() > 0 && (
							<div className="pt-3 border-t border-slate-200 dark:border-slate-700/50">
								<h4 className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2 mb-3">
									<ImageIcon className="h-4 w-4 text-primary/70" />
									Project Images ({getTotalImageCount()})
								</h4>
								<div className="space-y-3">
									{formData.selectedAreas.map((areaId) => {
										const area = getAreaById(areaId);
										const areaImages =
											formData.areaDetails[areaId]?.images || [];

										if (!area || areaImages.length === 0) return null;

										return (
											<div key={areaId} className="space-y-2">
												<h5 className="text-xs font-medium flex items-center gap-1">
													{area.icon}
													<span>
														{area.label} ({areaImages.length})
													</span>
												</h5>
												<div className="flex flex-wrap gap-2">
													{areaImages.map((image) => (
														<div
															key={image.id}
															className="relative h-16 w-16 rounded-md overflow-hidden border border-slate-200 dark:border-slate-700 group">
															<img
																src={image.url || "/placeholder.svg"}
																alt={image.name || "Project image"}
																className="h-full w-full object-cover"
															/>
															<div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
																<div className="text-[10px] text-white bg-black/60 px-1 py-0.5 rounded">
																	{image.name
																		? image.name.substring(0, 10) + "..."
																		: image.id}
																</div>
															</div>
														</div>
													))}
												</div>
											</div>
										);
									})}
								</div>
							</div>
						)}

						{/* Assigned Users */}
						{formData.assignedUsers?.length > 0 && (
							<div className="pt-3 border-t border-slate-200 dark:border-slate-700/50">
								<h4 className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2 mb-3">
									<Users className="h-4 w-4 text-primary/70" />
									Assigned Team Members
								</h4>
								<div className="flex flex-wrap gap-2">
									{formData.assignedUsers.map((user) => (
										<Badge
											key={user.id}
											variant="secondary"
											className="flex items-center gap-1 pl-1 pr-2 py-1 bg-slate-100 dark:bg-slate-700">
											<Avatar className="h-5 w-5 mr-1">
												<AvatarImage
													src={user.avatar || "/placeholder.svg"}
													alt={user.name}
												/>
												<AvatarFallback className="text-[10px]">
													{user.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<span className="text-xs">{user.name}</span>
										</Badge>
									))}
								</div>
							</div>
						)}

						{/* Estimate */}
						<div className="pt-3 border-t border-slate-200 dark:border-slate-700/50">
							<h4 className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2 mb-3">
								<DollarSign className="h-4 w-4 text-primary/70" />
								Project Estimate
							</h4>
							<div className="grid grid-cols-2 gap-3">
								<div className="space-y-1">
									<p className="text-xs text-slate-500 dark:text-slate-400">
										Estimated Cost
									</p>
									<p className="text-sm font-medium text-slate-900 dark:text-white">
										{formatCurrency(formData.estimatedValue)}
									</p>
								</div>
								<div className="space-y-1">
									<p className="text-xs text-slate-500 dark:text-slate-400">
										Estimated Time
									</p>
									<p className="text-sm font-medium text-slate-900 dark:text-white">
										{formData.estimatedTime
											? `${formData.estimatedTime} days`
											: "Not provided"}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
