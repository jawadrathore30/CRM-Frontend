"use client";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Ruler, Hammer, Info, PaintBucket, Plug, Layers } from "lucide-react";

// Import data from the updated data file
import { remodelingAreasFull } from "./data/remodeling-areas-data";

export default function Step2EstimateDetails({
	formData,
	setFormData,
	errors,
}) {
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

	const fieldVariants = {
		hidden: { opacity: 0, height: 0 },
		visible: {
			opacity: 1,
			height: "auto",
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 24,
			},
		},
		exit: {
			opacity: 0,
			height: 0,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 24,
			},
		},
	};

	// Handle area selection
	const handleAreaSelection = (areaId) => {
		setFormData((prev) => {
			const isSelected = prev.selectedAreas.includes(areaId);

			// If deselecting, remove area from selectedAreas and its details
			if (isSelected) {
				const { [areaId]: _, ...remainingAreaDetails } = prev.areaDetails;
				return {
					...prev,
					selectedAreas: prev.selectedAreas.filter((id) => id !== areaId),
					areaDetails: remainingAreaDetails,
				};
			}

			// If selecting, add area to selectedAreas and initialize its details
			return {
				...prev,
				selectedAreas: [...prev.selectedAreas, areaId],
				areaDetails: {
					...prev.areaDetails,
					[areaId]: {
						subcategories: {},
					},
				},
			};
		});
	};

	// Handle subcategory selection
	const handleSubcategorySelection = (areaId, subcategoryId, isSelected) => {
		setFormData((prev) => {
			const areaDetails = prev.areaDetails[areaId] || { subcategories: {} };
			const subcategories = areaDetails.subcategories || {};

			if (isSelected) {
				// Initialize subcategory data
				const initialData = {
					selected: true,
					customerProvidesMaterials: false,
					demolitionRequired: false,
					materialType: "",
					width: "",
					length: "",
					quantity: "",
					baseboardsRequired: false,
					baseboardLength: "",
					baseboardWidth: "",
					extraDescription: "",
					selectedWallOptions: [],
					wallOutletQuantity: "0",
					wallOutletPlateQuantity: "0",
					sheetRockDemolitionRequired: false,
					sheetRockWidth: "",
					sheetRockLength: "",
					sheetRockInstallWidth: "",
					sheetRockInstallLength: "",
					paintWidth: "",
					paintLength: "",
				};

				return {
					...prev,
					areaDetails: {
						...prev.areaDetails,
						[areaId]: {
							...areaDetails,
							subcategories: {
								...subcategories,
								[subcategoryId]: initialData,
							},
						},
					},
				};
			} else {
				// Remove subcategory data
				const { [subcategoryId]: _, ...remainingSubcategories } = subcategories;
				return {
					...prev,
					areaDetails: {
						...prev.areaDetails,
						[areaId]: {
							...areaDetails,
							subcategories: remainingSubcategories,
						},
					},
				};
			}
		});
	};

	// Handle subcategory field change
	const handleSubcategoryFieldChange = (
		areaId,
		subcategoryId,
		field,
		value
	) => {
		setFormData((prev) => {
			const areaDetails = prev.areaDetails[areaId] || { subcategories: {} };
			const subcategories = areaDetails.subcategories || {};
			const subcategory = subcategories[subcategoryId] || {};

			// If setting baseboardsRequired to false, also set baseboardLength to "0"
			if (field === "baseboardsRequired" && value === false) {
				return {
					...prev,
					areaDetails: {
						...prev.areaDetails,
						[areaId]: {
							...areaDetails,
							subcategories: {
								...subcategories,
								[subcategoryId]: {
									...subcategory,
									[field]: value,
									baseboardLength: "0",
								},
							},
						},
					},
				};
			}

			// If changing the wall option, reset related fields
			// If changing the wall options, update the array
			if (field === "selectedWallOptions") {
				// If value is an array, use it directly, otherwise create/modify array
				const updatedWallOptions = Array.isArray(value)
					? value
					: (subcategory.selectedWallOptions || []).includes(value)
					? (subcategory.selectedWallOptions || []).filter(
							(option) => option !== value
					  ) // Remove if exists
					: [...(subcategory.selectedWallOptions || []), value]; // Add if doesn't exist

				return {
					...prev,
					areaDetails: {
						...prev.areaDetails,
						[areaId]: {
							...areaDetails,
							subcategories: {
								...subcategories,
								[subcategoryId]: {
									...subcategory,
									selectedWallOptions: updatedWallOptions,
								},
							},
						},
					},
				};
			}

			return {
				...prev,
				areaDetails: {
					...prev.areaDetails,
					[areaId]: {
						...areaDetails,
						subcategories: {
							...subcategories,
							[subcategoryId]: {
								...subcategory,
								[field]: value,
							},
						},
					},
				},
			};
		});
	};

	// Calculate area based on width and length
	const calculateArea = (width, length) => {
		if (!width || !length) return 0;
		const numWidth = Number.parseFloat(width);
		const numLength = Number.parseFloat(length);
		if (isNaN(numWidth) || isNaN(numLength)) return 0;
		return numWidth * numLength;
	};

	// Get the selected wall option object
	const getSelectedWallOption = (optionId) => {
		// Create wall options from the data structure
		const wallOptions = [
			{
				id: "paint",
				label: "Paint",
				icon: <PaintBucket className="h-4 w-4" />,
			},
			{
				id: "wall-outlet",
				label: "Wall Outlet",
				icon: <Plug className="h-4 w-4" />,
			},
			{
				id: "wall-outlet-plate",
				label: "Wall Outlet Plate",
				icon: <Plug className="h-4 w-4" />,
			},
			{
				id: "sheet-rock",
				label: "Sheet Rock",
				icon: <Layers className="h-4 w-4" />,
				needsDemolition: true,
			},
		];
		return wallOptions.find((option) => option.id === optionId) || null;
	};

	// Get area data by ID
	const getAreaById = (areaId) => {
		return remodelingAreasFull.find((area) => area.id === areaId) || null;
	};

	// Get subcategory data by ID
	const getSubcategoryById = (areaId, subcategoryId) => {
		const area = getAreaById(areaId);
		if (!area) return null;
		return (
			area.subcategories.find(
				(subcategory) => subcategory.id === subcategoryId
			) || null
		);
	};

	// Render material type selector
	const renderMaterialTypeSelector = (
		areaId,
		subcategoryId,
		subcategory,
		subcategoryData
	) => {
		// Determine which property to use for material types
		let materialTypeProperty = "materialTypes";
		let materialTypes = subcategory.materialTypes || [];

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
				materialTypes = subcategory[prop];
				break;
			}
		}

		if (!materialTypes || materialTypes.length === 0) return null;

		return (
			<>
				<Label className="text-sm flex items-center gap-1 font-medium">
					<span className="h-4 w-4 text-primary/70">🧱</span>
					{(materialTypeProperty === "materialTypes"
						? "Material Type"
						: materialTypeProperty.replace(/Types|Styles/g, " Type")
					).replace(/^./, (char) => char.toUpperCase())}
				</Label>
				<Select
					value={subcategoryData[materialTypeProperty] || ""}
					onValueChange={(value) =>
						handleSubcategoryFieldChange(
							areaId,
							subcategoryId,
							materialTypeProperty,
							value
						)
					}>
					<SelectTrigger className="h-9 focus:ring-2 focus:ring-primary/20 focus:border-primary">
						<SelectValue
							placeholder={`Select ${
								materialTypeProperty === "materialTypes" ? "material" : "type"
							}`}
						/>
					</SelectTrigger>
					<SelectContent>
						{materialTypes.map((material) => (
							<SelectItem key={material} value={material}>
								{material}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{subcategoryData[materialTypeProperty] === "Other" && (
					<motion.div
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={fieldVariants}>
						<Textarea
							placeholder={`Please describe the ${
								materialTypeProperty === "materialTypes" ? "material" : "type"
							}`}
							value={
								subcategoryData[`${materialTypeProperty}Description`] || ""
							}
							onChange={(e) =>
								handleSubcategoryFieldChange(
									areaId,
									subcategoryId,
									`${materialTypeProperty}Description`,
									e.target.value
								)
							}
							className="min-h-[80px] mt-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
						/>
					</motion.div>
				)}
			</>
		);
	};

	// Render measurements fields
	const renderMeasurements = (
		areaId,
		subcategoryId,
		subcategory,
		subcategoryData
	) => {
		if (!subcategory.unit) return null;

		return (
			<>
				<div className="flex items-center justify-between">
					<Label className="text-sm flex items-center gap-1 font-medium">
						<Ruler className="h-4 w-4 text-primary" />
						Measurements
						<span className="text-xs text-slate-500 ml-1">
							({subcategory.unit})
						</span>
					</Label>
					{subcategory.unit === "sqft" && (
						<div className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1 font-medium">
							{calculateArea(
								subcategoryData.width,
								subcategoryData.length
							).toFixed(2)}{" "}
							ft²
						</div>
					)}
				</div>

				{subcategory.unit === "sqft" ? (
					<div className="grid grid-cols-2 gap-4 mt-2">
						<div className="space-y-2">
							<Label className="text-xs flex items-center gap-1">
								<span className="text-slate-500">Width (ft)</span>
							</Label>
							<div className="relative">
								<Input
									type="number"
									min="0"
									step="0.1"
									value={subcategoryData.width || ""}
									onChange={(e) =>
										handleSubcategoryFieldChange(
											areaId,
											subcategoryId,
											"width",
											e.target.value
										)
									}
									className="h-10 pl-3 pr-8 focus:ring-2 focus:ring-primary/20 focus:border-primary"
								/>
								<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
									ft
								</span>
							</div>
						</div>
						<div className="space-y-2">
							<Label className="text-xs flex items-center gap-1">
								<span className="text-slate-500">Length (ft)</span>
							</Label>
							<div className="relative">
								<Input
									type="number"
									min="0"
									step="0.1"
									value={subcategoryData.length || ""}
									onChange={(e) =>
										handleSubcategoryFieldChange(
											areaId,
											subcategoryId,
											"length",
											e.target.value
										)
									}
									className="h-10 pl-3 pr-8 focus:ring-2 focus:ring-primary/20 focus:border-primary"
								/>
								<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
									ft
								</span>
							</div>
						</div>
					</div>
				) : (
					<div className="space-y-2 mt-2">
						<Label className="text-xs flex items-center gap-1">
							<span className="text-slate-500">
								Quantity ({subcategory.unit})
							</span>
						</Label>
						<div className="relative">
							<Input
								type="number"
								min="0"
								step={subcategory.unit === "linear-ft" ? "0.1" : "1"}
								value={subcategoryData.quantity || ""}
								onChange={(e) =>
									handleSubcategoryFieldChange(
										areaId,
										subcategoryId,
										"quantity",
										e.target.value
									)
								}
								className="h-10 pl-3 pr-8 focus:ring-2 focus:ring-primary/20 focus:border-primary"
							/>
							<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
								{subcategory.unit}
							</span>
						</div>
					</div>
				)}
			</>
		);
	};

	// Render demolition fields
	const renderDemolition = (
		areaId,
		subcategoryId,
		subcategory,
		subcategoryData
	) => {
		if (!subcategory.canDemolish) return null;

		return (
			<>
				<div className="flex items-center justify-between mb-3">
					<Label className="text-sm flex items-center gap-1 font-medium">
						<Hammer className="h-4 w-4 text-primary/70" />
						Demolition required?
					</Label>
					<div className="flex gap-2">
						<button
							type="button"
							onClick={() =>
								handleSubcategoryFieldChange(
									areaId,
									subcategoryId,
									"demolitionRequired",
									true
								)
							}
							className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
								subcategoryData.demolitionRequired
									? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10"
									: "border-slate-200 dark:border-slate-700 hover:border-primary/50"
							}`}>
							<div
								className={`h-4 w-4 rounded-full border flex items-center justify-center ${
									subcategoryData.demolitionRequired
										? "border-primary"
										: "border-slate-400"
								}`}>
								{subcategoryData.demolitionRequired && (
									<div className="h-2 w-2 rounded-full bg-primary" />
								)}
							</div>
							<span className="font-medium">Yes</span>
						</button>
						<button
							type="button"
							onClick={() =>
								handleSubcategoryFieldChange(
									areaId,
									subcategoryId,
									"demolitionRequired",
									false
								)
							}
							className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
								subcategoryData.demolitionRequired === false
									? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10"
									: "border-slate-200 dark:border-slate-700 hover:border-primary/50"
							}`}>
							<div
								className={`h-4 w-4 rounded-full border flex items-center justify-center ${
									subcategoryData.demolitionRequired === false
										? "border-primary"
										: "border-slate-400"
								}`}>
								{subcategoryData.demolitionRequired === false && (
									<div className="h-2 w-2 rounded-full bg-primary" />
								)}
							</div>
							<span className="font-medium">No</span>
						</button>
					</div>
				</div>

				{/* Demolition Measurements (if required) */}
				{subcategoryData.demolitionRequired && (
					<motion.div
						className="space-y-3 mt-3 p-3 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700"
						initial={{
							opacity: 0,
							y: -10,
							scale: 0.95,
						}}
						animate={{
							opacity: 1,
							y: 0,
							scale: 1,
						}}
						exit={{
							opacity: 0,
							y: -10,
							scale: 0.95,
						}}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 24,
						}}>
						<div className="flex items-center justify-between">
							<Label className="text-sm flex items-center gap-1 font-medium">
								<Ruler className="h-4 w-4 text-primary" />
								Demolition Measurements
								{subcategory.demolitionUnit && (
									<span className="text-xs text-slate-500 ml-1">
										({subcategory.demolitionUnit})
									</span>
								)}
							</Label>
							{subcategory.demolitionUnit === "sqft" && (
								<div className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1 font-medium">
									{calculateArea(
										subcategoryData.demolitionWidth,
										subcategoryData.demolitionLength
									).toFixed(2)}{" "}
									ft²
								</div>
							)}
						</div>

						{subcategory.demolitionUnit === "sqft" ? (
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label className="text-xs flex items-center gap-1">
										<span className="text-slate-500">Width (ft)</span>
									</Label>
									<div className="relative">
										<Input
											type="number"
											min="0"
											step="0.1"
											value={subcategoryData.demolitionWidth || ""}
											onChange={(e) =>
												handleSubcategoryFieldChange(
													areaId,
													subcategoryId,
													"demolitionWidth",
													e.target.value
												)
											}
											className="h-10 pl-3 pr-8 focus:ring-2 focus:ring-primary/20 focus:border-primary"
										/>
										<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
											ft
										</span>
									</div>
								</div>
								<div className="space-y-2">
									<Label className="text-xs flex items-center gap-1">
										<span className="text-slate-500">Length (ft)</span>
									</Label>
									<div className="relative">
										<Input
											type="number"
											min="0"
											step="0.1"
											value={subcategoryData.demolitionLength || ""}
											onChange={(e) =>
												handleSubcategoryFieldChange(
													areaId,
													subcategoryId,
													"demolitionLength",
													e.target.value
												)
											}
											className="h-10 pl-3 pr-8 focus:ring-2 focus:ring-primary/20 focus:border-primary"
										/>
										<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
											ft
										</span>
									</div>
								</div>
							</div>
						) : (
							<div className="space-y-2">
								<Label className="text-xs flex items-center gap-1">
									<span className="text-slate-500">
										Quantity ({subcategory.demolitionUnit})
									</span>
								</Label>
								<div className="relative">
									<Input
										type="number"
										min="0"
										step="1"
										value={subcategoryData.demolitionQuantity || ""}
										onChange={(e) =>
											handleSubcategoryFieldChange(
												areaId,
												subcategoryId,
												"demolitionQuantity",
												e.target.value
											)
										}
										className="h-10 pl-3 pr-8 focus:ring-2 focus:ring-primary/20 focus:border-primary"
									/>
									<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
										{subcategory.demolitionUnit}
									</span>
								</div>
							</div>
						)}
					</motion.div>
				)}
			</>
		);
	};

	// Render wall options
	const renderWallOptions = (
		areaId,
		subcategoryId,
		subcategory,
		subcategoryData
	) => {
		if (!subcategory.hasWallOptions) return null;

		return (
			<div className="space-y-4">
				<Label className="text-sm flex items-center gap-1 font-medium">
					<span className="h-4 w-4 text-primary/70">🧱</span>
					Wall Options (Select all that apply)
				</Label>

				<div className="space-y-2">
					{subcategory.wallOptions.map((optionId) => {
						const option = getSelectedWallOption(optionId);
						const isSelected = (
							subcategoryData.selectedWallOptions || []
						).includes(optionId);

						return (
							<div key={optionId} className="flex items-center space-x-2">
								<Checkbox
									id={`${areaId}-${subcategoryId}-${optionId}`}
									checked={isSelected}
									onCheckedChange={(checked) => {
										if (checked) {
											// Add to array if not present
											const newOptions = [
												...(subcategoryData.selectedWallOptions || []),
												optionId,
											];
											handleSubcategoryFieldChange(
												areaId,
												subcategoryId,
												"selectedWallOptions",
												newOptions
											);
										} else {
											// Remove from array
											const newOptions = (
												subcategoryData.selectedWallOptions || []
											).filter((id) => id !== optionId);
											handleSubcategoryFieldChange(
												areaId,
												subcategoryId,
												"selectedWallOptions",
												newOptions
											);
										}
									}}
									className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
								/>
								<Label
									htmlFor={`${areaId}-${subcategoryId}-${optionId}`}
									className="text-sm cursor-pointer flex items-center gap-2">
									{option?.icon}
									<span>{option?.label}</span>
								</Label>
							</div>
						);
					})}
				</div>

				{/* Render specific options for selected wall options */}
				{(subcategoryData.selectedWallOptions || []).length > 0 && (
					<motion.div
						className="space-y-4 mt-4"
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={fieldVariants}>
						{/* Quantity for outlets */}
						{(subcategoryData.selectedWallOptions || []).includes(
							"wall-outlet"
						) && (
							<div className="p-3 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700">
								<div className="space-y-2">
									<Label className="text-xs">
										Wall Outlets - How many to replace?
									</Label>
									<Input
										type="number"
										min="0"
										value={subcategoryData.wallOutletQuantity || "0"}
										onChange={(e) =>
											handleSubcategoryFieldChange(
												areaId,
												subcategoryId,
												"wallOutletQuantity",
												e.target.value
											)
										}
										className="h-9 focus:ring-2 focus:ring-primary/20 focus:border-primary"
									/>
								</div>
							</div>
						)}

						{/* Quantity for outlet plates */}
						{(subcategoryData.selectedWallOptions || []).includes(
							"wall-outlet-plate"
						) && (
							<div className="p-3 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700">
								<div className="space-y-2">
									<Label className="text-xs">
										Wall Outlet Plates - How many to replace?
									</Label>
									<Input
										type="number"
										min="0"
										value={subcategoryData.wallOutletPlateQuantity || "0"}
										onChange={(e) =>
											handleSubcategoryFieldChange(
												areaId,
												subcategoryId,
												"wallOutletPlateQuantity",
												e.target.value
											)
										}
										className="h-9 focus:ring-2 focus:ring-primary/20 focus:border-primary"
									/>
								</div>
							</div>
						)}

						{/* Sheet Rock specific options */}
						{(subcategoryData.selectedWallOptions || []).includes(
							"sheet-rock"
						) && (
							<>
								{/* Demolition Required */}
								<div className="p-3 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700 mb-3">
									<div className="flex items-center justify-between mb-2">
										<Label className="text-xs flex items-center gap-1 font-medium">
											<Hammer className="h-3 w-3 text-primary/70" />
											Sheet Rock - Demolition required?
										</Label>
										<div className="flex gap-2">
											<button
												type="button"
												onClick={() =>
													handleSubcategoryFieldChange(
														areaId,
														subcategoryId,
														"sheetRockDemolitionRequired",
														true
													)
												}
												className={`flex items-center justify-center gap-1 px-2 py-1 rounded-lg border text-xs transition-all ${
													subcategoryData.sheetRockDemolitionRequired
														? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10"
														: "border-slate-200 dark:border-slate-700 hover:border-primary/50"
												}`}>
												<div
													className={`h-3 w-3 rounded-full border flex items-center justify-center ${
														subcategoryData.sheetRockDemolitionRequired
															? "border-primary"
															: "border-slate-400"
													}`}>
													{subcategoryData.sheetRockDemolitionRequired && (
														<div className="h-1.5 w-1.5 rounded-full bg-primary" />
													)}
												</div>
												<span className="font-medium">Yes</span>
											</button>
											<button
												type="button"
												onClick={() =>
													handleSubcategoryFieldChange(
														areaId,
														subcategoryId,
														"sheetRockDemolitionRequired",
														false
													)
												}
												className={`flex items-center justify-center gap-1 px-2 py-1 rounded-lg border text-xs transition-all ${
													subcategoryData.sheetRockDemolitionRequired === false
														? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10"
														: "border-slate-200 dark:border-slate-700 hover:border-primary/50"
												}`}>
												<div
													className={`h-3 w-3 rounded-full border flex items-center justify-center ${
														subcategoryData.sheetRockDemolitionRequired ===
														false
															? "border-primary"
															: "border-slate-400"
													}`}>
													{subcategoryData.sheetRockDemolitionRequired ===
														false && (
														<div className="h-1.5 w-1.5 rounded-full bg-primary" />
													)}
												</div>
												<span className="font-medium">No</span>
											</button>
										</div>
									</div>
								</div>

								{/* Demolition Measurements */}
								{subcategoryData.sheetRockDemolitionRequired && (
									<div className="p-3 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700 mb-3">
										<div className="flex items-center justify-between mb-2">
											<Label className="text-xs flex items-center gap-1 font-medium">
												<Ruler className="h-3 w-3 text-primary" />
												Sheet Rock - Demolition Measurements
											</Label>
											<div className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium">
												{calculateArea(
													subcategoryData.sheetRockWidth,
													subcategoryData.sheetRockLength
												).toFixed(2)}{" "}
												ft²
											</div>
										</div>
										<div className="grid grid-cols-2 gap-3">
											<div className="space-y-1">
												<Label className="text-xs">
													<span className="text-slate-500">Width (ft)</span>
												</Label>
												<div className="relative">
													<Input
														type="number"
														min="0"
														step="0.1"
														value={subcategoryData.sheetRockWidth || ""}
														onChange={(e) =>
															handleSubcategoryFieldChange(
																areaId,
																subcategoryId,
																"sheetRockWidth",
																e.target.value
															)
														}
														className="h-8 pl-2 pr-7 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
													/>
													<span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">
														ft
													</span>
												</div>
											</div>
											<div className="space-y-1">
												<Label className="text-xs">
													<span className="text-slate-500">Length (ft)</span>
												</Label>
												<div className="relative">
													<Input
														type="number"
														min="0"
														step="0.1"
														value={subcategoryData.sheetRockLength || ""}
														onChange={(e) =>
															handleSubcategoryFieldChange(
																areaId,
																subcategoryId,
																"sheetRockLength",
																e.target.value
															)
														}
														className="h-8 pl-2 pr-7 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
													/>
													<span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">
														ft
													</span>
												</div>
											</div>
										</div>
									</div>
								)}

								{/* Installation Measurements */}
								<div className="p-3 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700">
									<div className="flex items-center justify-between mb-2">
										<Label className="text-xs flex items-center gap-1 font-medium">
											<Ruler className="h-3 w-3 text-primary" />
											Sheet Rock - Installation Measurements
										</Label>
										<div className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium">
											{calculateArea(
												subcategoryData.sheetRockInstallWidth,
												subcategoryData.sheetRockInstallLength
											).toFixed(2)}{" "}
											ft²
										</div>
									</div>
									<div className="grid grid-cols-2 gap-3">
										<div className="space-y-1">
											<Label className="text-xs">
												<span className="text-slate-500">Width (ft)</span>
											</Label>
											<div className="relative">
												<Input
													type="number"
													min="0"
													step="0.1"
													value={subcategoryData.sheetRockInstallWidth || ""}
													onChange={(e) =>
														handleSubcategoryFieldChange(
															areaId,
															subcategoryId,
															"sheetRockInstallWidth",
															e.target.value
														)
													}
													className="h-8 pl-2 pr-7 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
												/>
												<span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">
													ft
												</span>
											</div>
										</div>
										<div className="space-y-1">
											<Label className="text-xs">
												<span className="text-slate-500">Length (ft)</span>
											</Label>
											<div className="relative">
												<Input
													type="number"
													min="0"
													step="0.1"
													value={subcategoryData.sheetRockInstallLength || ""}
													onChange={(e) =>
														handleSubcategoryFieldChange(
															areaId,
															subcategoryId,
															"sheetRockInstallLength",
															e.target.value
														)
													}
													className="h-8 pl-2 pr-7 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
												/>
												<span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">
													ft
												</span>
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						{/* Paint specific options */}
						{(subcategoryData.selectedWallOptions || []).includes("paint") && (
							<div className="p-3 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700">
								<div className="space-y-2">
									<Label className="text-xs flex items-center gap-1 font-medium">
										<PaintBucket className="h-3 w-3 text-primary/70" />
										Paint - Area to Cover
									</Label>
									<div className="grid grid-cols-2 gap-3">
										<div className="space-y-1">
											<Label className="text-xs">
												<span className="text-slate-500">Width (ft)</span>
											</Label>
											<div className="relative">
												<Input
													type="number"
													min="0"
													step="0.1"
													value={subcategoryData.paintWidth || ""}
													onChange={(e) =>
														handleSubcategoryFieldChange(
															areaId,
															subcategoryId,
															"paintWidth",
															e.target.value
														)
													}
													className="h-8 pl-2 pr-7 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
												/>
												<span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">
													ft
												</span>
											</div>
										</div>
										<div className="space-y-1">
											<Label className="text-xs">
												<span className="text-slate-500">Length (ft)</span>
											</Label>
											<div className="relative">
												<Input
													type="number"
													min="0"
													step="0.1"
													value={subcategoryData.paintLength || ""}
													onChange={(e) =>
														handleSubcategoryFieldChange(
															areaId,
															subcategoryId,
															"paintLength",
															e.target.value
														)
													}
													className="h-8 pl-2 pr-7 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
												/>
												<span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">
													ft
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</motion.div>
				)}
			</div>
		);
	};

	// Render baseboards (only for floors)
	const renderBaseboards = (
		areaId,
		subcategoryId,
		subcategory,
		subcategoryData
	) => {
		if (subcategory.id !== "floor") return null;

		// Calculate the sum of length and width
		const calculateBaseboardTotal = (length, width) => {
			const numLength = Number.parseFloat(length || 0);
			const numWidth = Number.parseFloat(width || 0);
			if (isNaN(numLength) || isNaN(numWidth)) return 0;
			return numLength + numWidth;
		};

		return (
			<>
				<div className="flex items-center justify-between mb-3">
					<Label className="text-sm flex items-center gap-1 font-medium">
						<span className="h-4 w-4 text-primary/70">📏</span>
						Baseboards?
					</Label>
					<div className="flex gap-2">
						<button
							type="button"
							onClick={() =>
								handleSubcategoryFieldChange(
									areaId,
									subcategoryId,
									"baseboardsRequired",
									true
								)
							}
							className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
								subcategoryData.baseboardsRequired
									? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10"
									: "border-slate-200 dark:border-slate-700 hover:border-primary/50"
							}`}>
							<div
								className={`h-4 w-4 rounded-full border flex items-center justify-center ${
									subcategoryData.baseboardsRequired
										? "border-primary"
										: "border-slate-400"
								}`}>
								{subcategoryData.baseboardsRequired && (
									<div className="h-2 w-2 rounded-full bg-primary" />
								)}
							</div>
							<span className="font-medium">Yes</span>
						</button>
						<button
							type="button"
							onClick={() =>
								handleSubcategoryFieldChange(
									areaId,
									subcategoryId,
									"baseboardsRequired",
									false
								)
							}
							className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
								subcategoryData.baseboardsRequired === false
									? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10"
									: "border-slate-200 dark:border-slate-700 hover:border-primary/50"
							}`}>
							<div
								className={`h-4 w-4 rounded-full border flex items-center justify-center ${
									subcategoryData.baseboardsRequired === false
										? "border-primary"
										: "border-slate-400"
								}`}>
								{subcategoryData.baseboardsRequired === false && (
									<div className="h-2 w-2 rounded-full bg-primary" />
								)}
							</div>
							<span className="font-medium">No</span>
						</button>
					</div>
				</div>

				{/* Baseboard Measurements (if required) */}
				{subcategoryData.baseboardsRequired && (
					<motion.div
						className="space-y-3 mt-3 p-3 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700"
						initial={{
							opacity: 0,
							y: -10,
							scale: 0.95,
						}}
						animate={{
							opacity: 1,
							y: 0,
							scale: 1,
						}}
						exit={{
							opacity: 0,
							y: -10,
							scale: 0.95,
						}}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 24,
						}}>
						<div className="flex items-center justify-between">
							<Label className="text-sm flex items-center gap-1 font-medium">
								<Ruler className="h-4 w-4 text-primary/70" />
								Baseboard Measurements
							</Label>
							<div className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1 font-medium">
								Total:{" "}
								{calculateBaseboardTotal(
									subcategoryData.baseboardLength,
									subcategoryData.baseboardWidth
								).toFixed(2)}{" "}
								ft
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4 mt-2">
							<div className="space-y-2">
								<Label className="text-xs flex items-center gap-1">
									<span className="text-slate-500">Length (ft)</span>
								</Label>
								<div className="relative">
									<Input
										type="number"
										min="0"
										step="0.1"
										value={subcategoryData.baseboardLength || ""}
										onChange={(e) =>
											handleSubcategoryFieldChange(
												areaId,
												subcategoryId,
												"baseboardLength",
												e.target.value
											)
										}
										className="h-10 pl-3 pr-8 focus:ring-2 focus:ring-primary/20 focus:border-primary"
									/>
									<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
										ft
									</span>
								</div>
							</div>
							<div className="space-y-2">
								<Label className="text-xs flex items-center gap-1">
									<span className="text-slate-500">Width (ft)</span>
								</Label>
								<div className="relative">
									<Input
										type="number"
										min="0"
										step="0.1"
										value={subcategoryData.baseboardWidth || ""}
										onChange={(e) =>
											handleSubcategoryFieldChange(
												areaId,
												subcategoryId,
												"baseboardWidth",
												e.target.value
											)
										}
										className="h-10 pl-3 pr-8 focus:ring-2 focus:ring-primary/20 focus:border-primary"
									/>
									<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
										ft
									</span>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</>
		);
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
					{remodelingAreasFull[0].icon}
					<h3 className="text-lg font-medium">
						What areas are being remodeled?
					</h3>
				</div>
				<p className="text-sm text-slate-500 dark:text-slate-400">
					Select one or more areas that will be remodeled. Additional options
					will appear for each selected area.
				</p>

				{/* Area Selection */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
					{remodelingAreasFull.map((area) => (
						<motion.div
							key={area.id}
							custom={1}
							variants={formItemVariants}
							initial="hidden"
							animate="visible">
							<button
								type="button"
								onClick={() => handleAreaSelection(area.id)}
								className={`w-full p-3 rounded-lg border ${
									formData.selectedAreas.includes(area.id)
										? "border-primary bg-primary/10 text-primary"
										: "border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50"
								} transition-colors flex flex-col items-center gap-2`}>
								<div
									className={`h-10 w-10 rounded-full flex items-center justify-center ${
										formData.selectedAreas.includes(area.id)
											? "bg-primary/20"
											: "bg-slate-100 dark:bg-slate-800"
									}`}>
									{area.icon}
								</div>
								<span className="text-sm font-medium">{area.label}</span>
							</button>
						</motion.div>
					))}
				</div>

				{/* Selected Areas Details */}
				{formData.selectedAreas.length > 0 && (
					<div className="mt-8 space-y-8">
						{formData.selectedAreas.map((areaId) => {
							const area = getAreaById(areaId);
							if (!area) return null;

							return (
								<motion.div
									key={areaId}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									className="p-5 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-slate-900">
									<h4 className="text-lg font-medium flex items-center gap-2 mb-4">
										{area.icon}
										<span>{area.label}</span>
									</h4>

									<div className="space-y-6">
										{area.subcategories.map((subcategory) => {
											const subcategoryData =
												formData.areaDetails[areaId]?.subcategories?.[
													subcategory.id
												] || {};
											const isSelected = subcategoryData.selected || false;

											return (
												<div
													key={subcategory.id}
													className="border-t border-slate-200 dark:border-slate-700 pt-4">
													<div className="flex items-center gap-2 mb-3">
														<Checkbox
															id={`${areaId}-${subcategory.id}`}
															checked={isSelected}
															onCheckedChange={(checked) =>
																handleSubcategorySelection(
																	areaId,
																	subcategory.id,
																	checked
																)
															}
															className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
														/>
														<Label
															htmlFor={`${areaId}-${subcategory.id}`}
															className="text-base font-medium cursor-pointer">
															{subcategory.label}
														</Label>
													</div>

													{isSelected && (
														<motion.div
															className="ml-7 space-y-4"
															initial="hidden"
															animate="visible"
															exit="exit"
															variants={fieldVariants}>
															{/* BLOCK 1: Customer Provides Materials Option */}
															<div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm mb-4">
																<div className="flex items-center justify-between mb-3">
																	<Label className="text-sm flex items-center gap-1 font-medium">
																		<span className="h-4 w-4 text-primary/70">
																			📦
																		</span>
																		Customer will provide materials?
																	</Label>
																	<div className="flex gap-2">
																		<button
																			type="button"
																			onClick={() =>
																				handleSubcategoryFieldChange(
																					areaId,
																					subcategory.id,
																					"customerProvidesMaterials",
																					true
																				)
																			}
																			className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
																				subcategoryData.customerProvidesMaterials
																					? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10"
																					: "border-slate-200 dark:border-slate-700 hover:border-primary/50"
																			}`}>
																			<div
																				className={`h-4 w-4 rounded-full border flex items-center justify-center ${
																					subcategoryData.customerProvidesMaterials
																						? "border-primary"
																						: "border-slate-400"
																				}`}>
																				{subcategoryData.customerProvidesMaterials && (
																					<div className="h-2 w-2 rounded-full bg-primary" />
																				)}
																			</div>
																			<span className="font-medium">Yes</span>
																		</button>
																		<button
																			type="button"
																			onClick={() =>
																				handleSubcategoryFieldChange(
																					areaId,
																					subcategory.id,
																					"customerProvidesMaterials",
																					false
																				)
																			}
																			className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
																				subcategoryData.customerProvidesMaterials ===
																				false
																					? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10"
																					: "border-slate-200 dark:border-slate-700 hover:border-primary/50"
																			}`}>
																			<div
																				className={`h-4 w-4 rounded-full border flex items-center justify-center ${
																					subcategoryData.customerProvidesMaterials ===
																					false
																						? "border-primary"
																						: "border-slate-400"
																				}`}>
																				{subcategoryData.customerProvidesMaterials ===
																					false && (
																					<div className="h-2 w-2 rounded-full bg-primary" />
																				)}
																			</div>
																			<span className="font-medium">No</span>
																		</button>
																	</div>
																</div>
															</div>

															{/* BLOCK 2: Demolition Required (if applicable) */}
															{subcategory.canDemolish && (
																<div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm mb-4">
																	{renderDemolition(
																		areaId,
																		subcategory.id,
																		subcategory,
																		subcategoryData
																	)}
																</div>
															)}

															{/* BLOCK 3: Wall Options (if applicable) */}
															{subcategory.hasWallOptions && (
																<div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm mb-4">
																	{renderWallOptions(
																		areaId,
																		subcategory.id,
																		subcategory,
																		subcategoryData
																	)}
																</div>
															)}

															{/* BLOCK 4: Material Type and Measurements */}
															{!subcategory.hasTextArea &&
																subcategory.id !== "extra" &&
																subcategory.id !== "extra-outside" && (
																	<div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm mb-4">
																		<div className="space-y-3">
																			{renderMaterialTypeSelector(
																				areaId,
																				subcategory.id,
																				subcategory,
																				subcategoryData
																			)}

																			{subcategory.needsMeasurements && (
																				<div className="mt-4">
																					{renderMeasurements(
																						areaId,
																						subcategory.id,
																						subcategory,
																						subcategoryData
																					)}
																				</div>
																			)}
																		</div>
																	</div>
																)}

															{/* BLOCK 5: Baseboards (only for floors) */}
															{subcategory.id === "floor" && (
																<div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm mb-4">
																	{renderBaseboards(
																		areaId,
																		subcategory.id,
																		subcategory,
																		subcategoryData
																	)}
																</div>
															)}

															{/* Extra Description (only for extras) */}
															{(subcategory.hasTextArea ||
																subcategory.id === "extra" ||
																subcategory.id === "extra-outside") && (
																<div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm mb-4">
																	<div className="space-y-2">
																		<Label className="text-sm flex items-center gap-1 font-medium">
																			<Info className="h-4 w-4 text-primary/70" />
																			Describe extra work
																		</Label>
																		<Textarea
																			value={
																				subcategoryData.extraDescription || ""
																			}
																			onChange={(e) =>
																				handleSubcategoryFieldChange(
																					areaId,
																					subcategory.id,
																					"extraDescription",
																					e.target.value
																				)
																			}
																			placeholder="Describe any additional work needed"
																			className="min-h-[80px] focus:ring-2 focus:ring-primary/20 focus:border-primary"
																		/>
																	</div>
																</div>
															)}
														</motion.div>
													)}
												</div>
											);
										})}
									</div>
								</motion.div>
							);
						})}
					</div>
				)}
			</motion.div>
		</div>
	);
}
