"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ImageIcon, Upload, Trash2, Plus, Camera } from "lucide-react";
import { remodelingAreasFull } from "./data/remodeling-areas-data";

export default function Step3Images({ formData, setFormData, errors }) {
	// Create a single ref object to store all file input references
	const fileInputRefs = useRef({});

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

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	// Get area data by ID
	const getAreaById = (areaId) => {
		return remodelingAreasFull.find((area) => area.id === areaId) || null;
	};

	// Handle image upload for a specific area
	const handleImageUpload = (e, areaId, taskId) => {
		const files = Array.from(e.target.files);
		if (files.length === 0) return;

		// Process each file
		const newImages = files.map((file) => {
			return {
				file,
				id: Math.random().toString(36).substring(2, 11),
				url: URL.createObjectURL(file),
				name: file.name,
				size: file.size,
				type: file.type,
				taskId,
			};
		});

		setFormData((prev) => {
			// Get current area details
			const areaDetails = prev.areaDetails || {};
			const currentAreaDetails = areaDetails[areaId] || { subcategories: {} };

			// Get current images for this area
			const currentImages = currentAreaDetails.images || [];

			// Update area details with new images
			return {
				...prev,
				areaDetails: {
					...areaDetails,
					[areaId]: {
						...currentAreaDetails,
						images: [...currentImages, ...newImages],
					},
				},
			};
		});

		// Reset file input
		e.target.value = null;
	};

	// Remove image
	const handleRemoveImage = (areaId, imageId) => {
		setFormData((prev) => {
			// Get current area details
			const areaDetails = prev.areaDetails || {};
			const currentAreaDetails = areaDetails[areaId] || { subcategories: {} };

			// Get current images for this area
			const currentImages = currentAreaDetails.images || [];

			// Find the image to remove
			const imageToRemove = currentImages.find((img) => img.id === imageId);
			if (imageToRemove?.url) URL.revokeObjectURL(imageToRemove.url);

			// Update area details with filtered images
			return {
				...prev,
				areaDetails: {
					...areaDetails,
					[areaId]: {
						...currentAreaDetails,
						images: currentImages.filter((img) => img.id !== imageId),
					},
				},
			};
		});
	};

	// Get images for a specific area and task
	const getImagesForTask = (areaId, taskId) => {
		const areaDetails = formData.areaDetails || {};
		const currentAreaDetails = areaDetails[areaId] || {};
		const images = currentAreaDetails.images || [];

		return images.filter((img) => img.taskId === taskId);
	};

	// Define photo tasks for each area
	const getPhotoTasks = (areaId) => {
		const area = getAreaById(areaId);
		if (!area) return [];

		const commonTasks = [
			{
				id: "overview",
				label: "Overview of the entire area",
				icon: <Camera className="h-4 w-4" />,
			},
		];

		// Add specific tasks based on selected subcategories
		const selectedSubcategories = Object.keys(
			formData.areaDetails[areaId]?.subcategories || {}
		).filter(
			(subcatId) =>
				formData.areaDetails[areaId]?.subcategories[subcatId]?.selected
		);

		const subcategoryTasks = selectedSubcategories
			.map((subcatId) => {
				const subcategory = area.subcategories.find((s) => s.id === subcatId);
				if (!subcategory) return null;

				return {
					id: subcatId,
					label: `Photos of ${subcategory.label.toLowerCase()}`,
					icon: subcategory.icon || <ImageIcon className="h-4 w-4" />,
				};
			})
			.filter(Boolean);

		return [...commonTasks, ...subcategoryTasks];
	};

	// Handle click on file input
	const handleFileInputClick = (areaId, taskId) => {
		const inputId = `${areaId}-${taskId}-input`;

		// Create the input element if it doesn't exist
		if (!fileInputRefs.current[inputId]) {
			const input = document.createElement("input");
			input.type = "file";
			input.multiple = true;
			input.accept = "image/*";
			input.onchange = (e) => handleImageUpload(e, areaId, taskId);
			fileInputRefs.current[inputId] = input;
		}

		// Trigger click on the input
		fileInputRefs.current[inputId].click();
	};

	return (
		<div className="space-y-8">
			<motion.div
				custom={0}
				variants={formItemVariants}
				initial="hidden"
				animate="visible"
				className="space-y-4">
				<div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
					<ImageIcon className="h-5 w-5 text-primary/70" />
					<h3 className="text-lg font-medium">Project Images</h3>
				</div>
				<p className="text-sm text-slate-500 dark:text-slate-400">
					Upload images for each area you've selected. These photos will help us
					provide a more accurate estimate.
				</p>

				{/* Error Message */}
				{errors.images && (
					<p className="text-sm text-red-500 dark:text-red-400">
						{errors.images}
					</p>
				)}

				{/* Areas and their photo tasks */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="space-y-6 mt-6">
					{formData.selectedAreas.map((areaId, areaIndex) => {
						const area = getAreaById(areaId);
						if (!area) return null;

						const photoTasks = getPhotoTasks(areaId);

						return (
							<motion.div
								key={areaId}
								variants={formItemVariants}
								custom={areaIndex}
								className="border border-slate-200 dark:border-slate-700 rounded-lg p-5 bg-white dark:bg-slate-900">
								<h4 className="text-base font-medium flex items-center gap-2 mb-4 text-slate-700 dark:text-slate-300">
									{area.icon}
									<span>{area.label} Photos</span>
								</h4>

								<div className="space-y-5">
									{photoTasks.map((task, taskIndex) => {
										const taskImages = getImagesForTask(areaId, task.id);

										return (
											<div key={`${areaId}-${task.id}`} className="space-y-3">
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
														{task.icon}
														<span>{task.label}</span>
													</div>
													<Button
														type="button"
														variant="outline"
														size="sm"
														onClick={() =>
															handleFileInputClick(areaId, task.id)
														}
														className="text-xs h-8">
														<Upload className="h-3 w-3 mr-1" />
														Add Photos
													</Button>
												</div>

												{/* Image previews for this task */}
												{taskImages.length > 0 ? (
													<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
														{taskImages.map((image) => (
															<div
																key={image.id}
																className="relative group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
																<div className="aspect-square relative">
																	<img
																		src={image.url || "/placeholder.svg"}
																		alt={image.name}
																		className="object-cover w-full h-full"
																	/>
																	<div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
																		<Button
																			type="button"
																			variant="destructive"
																			size="icon"
																			onClick={() =>
																				handleRemoveImage(areaId, image.id)
																			}
																			className="h-8 w-8 rounded-full">
																			<Trash2 className="h-4 w-4" />
																		</Button>
																	</div>
																</div>
																<div className="p-2 text-xs truncate text-slate-700 dark:text-slate-300">
																	{image.name}
																</div>
															</div>
														))}
														<div
															className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
															onClick={() =>
																handleFileInputClick(areaId, task.id)
															}>
															<Plus className="h-8 w-8 text-slate-400 dark:text-slate-600 mb-2" />
															<span className="text-xs text-slate-500 dark:text-slate-400">
																Add More
															</span>
														</div>
													</div>
												) : (
													<div
														className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
														onClick={() =>
															handleFileInputClick(areaId, task.id)
														}>
														<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
															<Camera className="h-6 w-6 text-primary/70" />
														</div>
														<p className="text-sm text-slate-500 dark:text-slate-400 text-center">
															Click to upload photos of{" "}
															{task.label.toLowerCase()}
														</p>
														<p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
															Supports JPG, PNG, GIF up to 5MB each
														</p>
													</div>
												)}
											</div>
										);
									})}
								</div>
							</motion.div>
						);
					})}
				</motion.div>

				{/* No areas selected message */}
				{formData.selectedAreas.length === 0 && (
					<div className="text-center p-8 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
						<div className="h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
							<ImageIcon className="h-8 w-8 text-slate-500 dark:text-slate-400" />
						</div>
						<h4 className="text-base font-medium text-slate-700 dark:text-slate-300 mb-2">
							No Areas Selected
						</h4>
						<p className="text-sm text-slate-500 dark:text-slate-400">
							Please go back to Step 2 and select the areas you want to remodel.
						</p>
					</div>
				)}
			</motion.div>
		</div>
	);
}
