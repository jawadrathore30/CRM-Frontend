"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { remodelingAreasFull } from "../components/leads/steps/data/remodeling-areas-data";
import {
	ChevronDown,
	ChevronUp,
	Clock,
	DollarSign,
	Info,
	X,
	MapPin,
	Phone,
	Mail,
	User,
	ImageIcon,
	ArrowLeft,
	Camera,
	Home,
	CheckCircle,
	XCircle,
	Layers,
	Download,
	ChevronLeft,
	ChevronRight,
	ZoomIn,
	ZoomOut,
	Maximize,
	Minimize,
} from "lucide-react";
import { format } from "date-fns";
import { Logo } from "../components/logo";
import { ModeToggle } from "../components/layout/mode-toggle";
import { CustomModal } from "../components/leadInfo/custom-modal";
import { InvoiceGenerator } from "../components/leadInfo/invoice-generator";
import { InvoiceSentConfirmation } from "../components/leadInfo/invoice-sent-confirmation";

// Mock function to fetch lead data - replace with your actual data fetching logic
const fetchLeadById = (id) => {
	// This is a placeholder - replace with your actual API call
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id,
				firstName: "John",
				lastName: "Doe",
				email: "john.doe@example.com",
				telephone: "555-123-4567",
				street: "123 Main Street",
				city: "Anytown",
				state: "CA",
				zipCode: "12345",
				country: "United States",
				createdAt: "2023-05-15",
				selectedAreas: ["living-room", "kitchen", "bathroom"],
				areaDetails: {
					"living-room": {
						subcategories: {
							floor: {
								selected: true,
								customerProvidesMaterials: false,
								materialType: "Hardwood Laminated",
								width: "12",
								length: "15",
								demolitionRequired: true,
								baseboardsRequired: true,
								baseboardLength: "24",
								baseboardWidth: "12",
							},
							walls: {
								selected: true,
								customerProvidesMaterials: true,
								materialType: "Paint",
								selectedWallOptions: ["paint", "wall-outlet"],
								wallOutletQuantity: "4",
							},
						},
						images: [
							{
								id: "img1",
								url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format",
								name: "Living Room Overview",
								description: "View of the living room from the entrance",
								uploadedAt: "2023-05-14T10:30:00Z",
								metadata: {
									size: "2.4 MB",
									dimensions: "1920x1080",
									type: "image/jpeg",
								},
							},
						],
					},
					kitchen: {
						subcategories: {
							"kitchen-cabinets": {
								selected: true,
								customerProvidesMaterials: false,
								materialType: "Solid Wood",
							},
							"kitchen-countertop": {
								selected: true,
								customerProvidesMaterials: false,
								materialType: "Granite",
								width: "10",
								length: "4",
							},
						},
						images: [
							{
								id: "img2",
								url: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&auto=format",
								name: "Kitchen Overview",
								description:
									"Full view of the kitchen area showing cabinets and countertops",
								uploadedAt: "2023-05-14T11:15:00Z",
								metadata: {
									size: "3.1 MB",
									dimensions: "2048x1536",
									type: "image/jpeg",
								},
							},
						],
					},
					bathroom: {
						subcategories: {
							floor: {
								selected: true,
								customerProvidesMaterials: false,
								materialType: "Ceramic Tiles",
								width: "8",
								length: "10",
							},
							shower: {
								selected: true,
								customerProvidesMaterials: false,
								materialType: "Walk-In",
								width: "4",
								length: "3",
							},
						},
						images: [
							{
								id: "img3",
								url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format",
								name: "Bathroom Overview",
								description:
									"Complete view of the bathroom showing shower and floor area",
								uploadedAt: "2023-05-14T12:00:00Z",
								metadata: {
									size: "2.8 MB",
									dimensions: "1800x1200",
									type: "image/jpeg",
								},
							},
						],
					},
				},
				estimatedValue: "15000",
				estimatedTime: "45",
			});
		}, 500);
	});
};

export default function LeadInfo() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [lead, setLead] = useState(null);
	const [loading, setLoading] = useState(true);
	const [expandedAreas, setExpandedAreas] = useState({});
	const [selectedImage, setSelectedImage] = useState(null);
	const [declineModalOpen, setDeclineModalOpen] = useState(false);
	const [declineReason, setDeclineReason] = useState("");
	const [imageViewerOpen, setImageViewerOpen] = useState(false);
	const [acceptModalOpen, setAcceptModalOpen] = useState(false);
	const [acceptSuccessModalOpen, setAcceptSuccessModalOpen] = useState(false);
	const [declineErrorMessage, setDeclineErrorMessage] = useState("");
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [zoomLevel, setZoomLevel] = useState(1);
	const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
	const [invoiceSentModalOpen, setInvoiceSentModalOpen] = useState(false);
	const [sentInvoiceData, setSentInvoiceData] = useState(null);

	useEffect(() => {
		const loadLead = async () => {
			try {
				setLoading(true);
				const data = await fetchLeadById(id);
				setLead(data);

				// Initialize expanded state for all areas
				const initialExpandedState = {};
				data.selectedAreas?.forEach((areaId) => {
					initialExpandedState[areaId] = true;
				});
				setExpandedAreas(initialExpandedState);
			} catch (error) {
				console.error("Error loading lead:", error);
			} finally {
				setLoading(false);
			}
		};

		loadLead();
	}, [id]);

	// Handle accept lead
	const handleAccept = () => {
		setAcceptModalOpen(true);
	};

	// Handle decline lead
	const handleDecline = (reason) => {
		// Replace with your actual decline logic
		console.log(`Lead ${id} declined. Reason: ${reason}`);
		navigate("/leads");
	};

	// Handle decline confirmation
	const handleDeclineConfirm = () => {
		if (declineReason.trim().length < 10) {
			setDeclineErrorMessage(
				"Please provide a detailed reason (at least 10 characters)"
			);
			return;
		}
		// Replace with your actual decline logic
		console.log(
			`Estimate for project ${id} declined. Reason: ${declineReason}`
		);
		navigate("/projects");
		setDeclineModalOpen(false);
	};

	// Handle accept confirmation
	const handleAcceptConfirm = () => {
		// Replace with your actual accept logic
		console.log(`Estimate for project ${id} accepted.`);
		setAcceptModalOpen(false);
		setAcceptSuccessModalOpen(true);
	};

	// Format date
	const formatDate = (date) => {
		if (!date) return "Not specified";
		try {
			return format(new Date(date), "PPP");
		} catch (e) {
			return "Invalid date";
		}
	};

	// Format time
	const formatTime = (dateString) => {
		if (!dateString) return "Unknown";
		try {
			return format(new Date(dateString), "h:mm a");
		} catch (e) {
			return "Invalid time";
		}
	};

	// Handle sending invoice
	const handleSendInvoice = (invoiceData) => {
		console.log("Invoice sent:", invoiceData);
		setInvoiceModalOpen(false);
		setSentInvoiceData(invoiceData);
		setInvoiceSentModalOpen(true);
	};

	// Toggle area expansion
	const toggleAreaExpansion = (areaId) => {
		setExpandedAreas((prev) => ({
			...prev,
			[areaId]: !prev[areaId],
		}));
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

	// Format area measurement
	const formatAreaMeasurement = (width, length) => {
		if (!width || !length) return "Not specified";
		return `${width} × ${length} ft (${(
			Number.parseFloat(width) * Number.parseFloat(length)
		).toFixed(2)} ft²)`;
	};

	// Format quantity
	const formatQuantity = (quantity, unit) => {
		if (!quantity) return "Not specified";
		return `${quantity} ${unit}`;
	};

	// Format currency
	const formatCurrency = (value) => {
		if (!value) return "Not specified";
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(value);
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
			type: subcatData[materialTypeProperty] || "Not specified",
			property: materialTypeProperty,
			description: subcatData[`${materialTypeProperty}Description`] || "",
		};
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

	// Get all images from all areas
	const getAllImages = () => {
		const images = [];
		if (!lead?.areaDetails) return images;

		Object.entries(lead.areaDetails).forEach(([areaId, areaData]) => {
			if (areaData.images && areaData.images.length > 0) {
				areaData.images.forEach((image) => {
					images.push({
						...image,
						areaId,
						areaName: getAreaById(areaId)?.label || areaId,
					});
				});
			}
		});

		return images;
	};

	// Count total subcategories
	const countTotalSubcategories = () => {
		let count = 0;
		if (!lead?.areaDetails) return count;

		Object.values(lead.areaDetails).forEach((areaData) => {
			if (areaData.subcategories) {
				count += Object.values(areaData.subcategories).filter(
					(subcat) => subcat.selected
				).length;
			}
		});

		return count;
	};

	const allImages = getAllImages();
	const totalSubcategories = countTotalSubcategories();

	// Handle image navigation
	const handlePreviousImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex > 0 ? prevIndex - 1 : allImages.length - 1
		);
		setSelectedImage(
			allImages[
				currentImageIndex > 0 ? currentImageIndex - 1 : allImages.length - 1
			]
		);
		setZoomLevel(1); // Reset zoom when changing images
	};

	const handleNextImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex < allImages.length - 1 ? prevIndex + 1 : 0
		);
		setSelectedImage(
			allImages[
				currentImageIndex < allImages.length - 1 ? currentImageIndex + 1 : 0
			]
		);
		setZoomLevel(1); // Reset zoom when changing images
	};

	// Handle zoom
	const handleZoomIn = () => {
		setZoomLevel((prevZoom) => Math.min(prevZoom + 0.25, 3));
	};

	const handleZoomOut = () => {
		setZoomLevel((prevZoom) => Math.max(prevZoom - 0.25, 0.5));
	};

	// Handle fullscreen
	const toggleFullscreen = () => {
		setIsFullscreen(!isFullscreen);
	};

	// Open image viewer with specific image
	const openImageViewer = (image, index) => {
		setSelectedImage(image);
		setCurrentImageIndex(index);
		setImageViewerOpen(true);
		setZoomLevel(1); // Reset zoom when opening viewer
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="flex flex-col items-center gap-4">
					<div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
					<p className="text-lg font-medium text-slate-600 dark:text-slate-300">
						Loading lead information...
					</p>
				</div>
			</div>
		);
	}

	if (!lead) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="flex flex-col items-center gap-4 max-w-md text-center">
					<div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
						<X className="h-8 w-8 text-red-500 dark:text-red-400" />
					</div>
					<h2 className="text-xl font-bold text-slate-900 dark:text-white">
						Lead Not Found
					</h2>
					<p className="text-slate-500 dark:text-slate-400">
						The lead you're looking for doesn't exist or you don't have
						permission to view it.
					</p>
					<Button onClick={() => navigate("/leads")} className="mt-2">
						<ArrowLeft className="mr-2 h-4 w-4" /> Back to Leads
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-gray-50 dark:bg-slate-900 min-h-screen pb-16 px-12 pt-8">
			{/* Header */}
			<header className="fixed w-full top-0 left-0 right-0 h-16 border-b border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md z-30 flex items-center px-4">
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center">
						<Button
							variant="ghost"
							size="icon"
							className="mr-2 text-slate-600 dark:text-slate-300"
							onClick={() => navigate("/leads")}>
							<ArrowLeft size={20} />
						</Button>
						<Logo className="relative z-10" />
					</div>

					<div className="flex items-center gap-2">
						{/* Theme toggle */}
						<ModeToggle />
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="container mx-auto px-4 pt-24 pb-6">
				<div className="flex flex-col gap-6">
					{/* Lead Header */}
					<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
						<div>
							<h1 className="text-2xl font-bold text-slate-900 dark:text-white">
								Lead Details
							</h1>
							<p className="text-gray-500 dark:text-slate-400 text-sm">
								Created on {formatDate(lead.createdAt)}
							</p>
						</div>
						<span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-full text-sm font-medium self-start">
							Proposal
						</span>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Left Column - Customer Info */}
						<div className="lg:col-span-1">
							<Card className="overflow-hidden border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
								<CardContent className="p-5">
									<h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
										Customer Information
									</h2>
									<div className="space-y-4">
										<div className="flex items-start gap-3">
											<div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mt-1">
												<User
													size={18}
													className="text-blue-600 dark:text-blue-400"
												/>
											</div>
											<div>
												<p className="text-sm text-gray-500 dark:text-slate-400">
													Name
												</p>
												<p className="font-medium text-slate-900 dark:text-white">
													{lead.firstName} {lead.lastName}
												</p>
											</div>
										</div>

										<div className="flex items-start gap-3">
											<div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mt-1">
												<Mail
													size={18}
													className="text-blue-600 dark:text-blue-400"
												/>
											</div>
											<div>
												<p className="text-sm text-gray-500 dark:text-slate-400">
													Email
												</p>
												<p className="font-medium text-slate-900 dark:text-white">
													{lead.email || "Not provided"}
												</p>
											</div>
										</div>

										<div className="flex items-start gap-3">
											<div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mt-1">
												<Phone
													size={18}
													className="text-blue-600 dark:text-blue-400"
												/>
											</div>
											<div>
												<p className="text-sm text-gray-500 dark:text-slate-400">
													Phone
												</p>
												<p className="font-medium text-slate-900 dark:text-white">
													{lead.telephone || "Not provided"}
												</p>
											</div>
										</div>

										<div className="flex items-start gap-3">
											<div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mt-1">
												<MapPin
													size={18}
													className="text-blue-600 dark:text-blue-400"
												/>
											</div>
											<div>
												<p className="text-sm text-gray-500 dark:text-slate-400">
													Address
												</p>
												<p className="font-medium text-slate-900 dark:text-white">
													{lead.street && lead.city
														? `${lead.street}, ${lead.city}, ${
																lead.state || ""
														  } ${lead.zipCode || ""}`
														: "Address not provided"}
												</p>
												{lead.country && (
													<p className="text-sm text-slate-500 dark:text-slate-400">
														{lead.country}
													</p>
												)}
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Project Overview */}
							<Card className="mt-6 overflow-hidden border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
								<CardContent className="p-5">
									<h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
										Project Overview
									</h2>
									<div className="space-y-4">
										<div className="flex items-start gap-3">
											<div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 mt-1">
												<Home
													size={18}
													className="text-green-600 dark:text-green-400"
												/>
											</div>
											<div>
												<p className="text-sm text-gray-500 dark:text-slate-400">
													Areas
												</p>
												<p className="font-medium text-slate-900 dark:text-white">
													{lead.selectedAreas?.length || 0} areas selected
												</p>
											</div>
										</div>

										<div className="flex items-start gap-3">
											<div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 mt-1">
												<Layers
													size={18}
													className="text-green-600 dark:text-green-400"
												/>
											</div>
											<div>
												<p className="text-sm text-gray-500 dark:text-slate-400">
													Subcategories
												</p>
												<p className="font-medium text-slate-900 dark:text-white">
													{totalSubcategories} items
												</p>
											</div>
										</div>

										<div className="flex items-start gap-3">
											<div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 mt-1">
												<ImageIcon
													size={18}
													className="text-green-600 dark:text-green-400"
												/>
											</div>
											<div>
												<p className="text-sm text-gray-500 dark:text-slate-400">
													Images
												</p>
												<p className="font-medium text-slate-900 dark:text-white">
													{allImages.length} photos
												</p>
											</div>
										</div>

										<div className="flex items-start gap-3">
											<div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 mt-1">
												<Clock
													size={18}
													className="text-green-600 dark:text-green-400"
												/>
											</div>
											<div>
												<p className="text-sm text-gray-500 dark:text-slate-400">
													Estimated Time
												</p>
												<p className="font-medium text-slate-900 dark:text-white">
													{lead.estimatedTime
														? `${lead.estimatedTime} days`
														: "Not specified"}
												</p>
											</div>
										</div>

										<div className="flex items-start gap-3">
											<div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 mt-1">
												<DollarSign
													size={18}
													className="text-green-600 dark:text-green-400"
												/>
											</div>
											<div>
												<p className="text-sm text-gray-500 dark:text-slate-400">
													Estimated Value
												</p>
												<p className="font-medium text-slate-900 dark:text-white">
													{formatCurrency(lead.estimatedValue)}
												</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Right Column - Content */}
						<div className="lg:col-span-2 space-y-6">
							{/* Project Details */}
							<Card className="overflow-hidden border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
								<CardContent className="p-0">
									<div className="p-5 border-b border-gray-200 dark:border-slate-700">
										<h2 className="text-lg font-semibold text-slate-900 dark:text-white">
											Project Details
										</h2>
									</div>

									<div className="divide-y divide-gray-200 dark:divide-slate-700">
										{lead.selectedAreas?.map((areaId) => {
											const areaName = getAreaById(areaId)?.label || areaId;
											const areaDetails = lead.areaDetails?.[areaId] || {
												subcategories: {},
											};
											const isExpanded = expandedAreas[areaId] !== false; // Default to expanded

											// Get selected subcategories
											const selectedSubcategories = Object.entries(
												areaDetails.subcategories || {}
											)
												.filter(([_, subcatData]) => subcatData.selected)
												.map(([subcatId, subcatData]) => ({
													id: subcatId,
													data: subcatData,
													details: getSubcategoryById(areaId, subcatId),
												}));

											return (
												<div
													key={areaId}
													className="divide-y divide-gray-100 dark:divide-slate-700/50">
													<div
														className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/30"
														onClick={() => toggleAreaExpansion(areaId)}>
														<div className="flex items-center gap-3">
															<div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
																<Home
																	size={18}
																	className="text-blue-600 dark:text-blue-400"
																/>
															</div>
															<div>
																<h3 className="font-medium text-slate-900 dark:text-white">
																	{areaName}
																</h3>
																<p className="text-sm text-gray-500 dark:text-slate-400">
																	{selectedSubcategories.length} items selected
																</p>
															</div>
														</div>
														{isExpanded ? (
															<ChevronUp
																size={20}
																className="text-slate-500 dark:text-slate-400"
															/>
														) : (
															<ChevronDown
																size={20}
																className="text-slate-500 dark:text-slate-400"
															/>
														)}
													</div>

													{isExpanded && (
														<div className="p-4 bg-gray-50 dark:bg-slate-800/50">
															{selectedSubcategories.length > 0 ? (
																<div className="space-y-6">
																	{selectedSubcategories.map(
																		({
																			id: subcatId,
																			data: subcatData,
																			details: subcategory,
																		}) => {
																			if (!subcategory) return null;

																			// Get material type information
																			const materialInfo = getMaterialTypeLabel(
																				subcategory,
																				subcatData
																			);

																			return (
																				<div
																					key={subcatId}
																					className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
																					<h4 className="font-medium mb-3 text-slate-900 dark:text-white">
																						{subcategory.label}
																					</h4>

																					<div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
																						{/* Material Type */}
																						{materialInfo.type !==
																							"Not specified" && (
																							<div className="flex items-center gap-2">
																								<span className="text-gray-500 dark:text-slate-400">
																									Material:
																								</span>
																								<span className="text-slate-900 dark:text-white">
																									{materialInfo.type}
																								</span>
																								{materialInfo.type ===
																									"Other" &&
																									materialInfo.description && (
																										<span className="text-gray-500 dark:text-slate-400">
																											(
																											{materialInfo.description}
																											)
																										</span>
																									)}
																							</div>
																						)}

																						{/* Customer Provides Materials */}
																						<div className="flex items-center gap-2">
																							<span className="text-gray-500 dark:text-slate-400">
																								Materials:
																							</span>
																							<span className="text-slate-900 dark:text-white">
																								{subcatData.customerProvidesMaterials
																									? "Customer provides"
																									: "Contractor provides"}
																							</span>
																						</div>

																						{/* Measurements */}
																						{subcategory.needsMeasurements &&
																							subcatData.width &&
																							subcatData.length && (
																								<div className="flex items-center gap-2">
																									<span className="text-gray-500 dark:text-slate-400">
																										Dimensions:
																									</span>
																									<span className="text-slate-900 dark:text-white">
																										{subcatData.width} ×{" "}
																										{subcatData.length} ft (
																										{(
																											Number.parseFloat(
																												subcatData.width
																											) *
																											Number.parseFloat(
																												subcatData.length
																											)
																										).toFixed(2)}{" "}
																										ft²)
																									</span>
																								</div>
																							)}

																						{/* Quantity */}
																						{subcatData.quantity && (
																							<div className="flex items-center gap-2">
																								<span className="text-gray-500 dark:text-slate-400">
																									Quantity:
																								</span>
																								<span className="text-slate-900 dark:text-white">
																									{subcatData.quantity}
																								</span>
																							</div>
																						)}

																						{/* Demolition */}
																						{subcategory.canDemolish && (
																							<div className="flex items-center gap-2">
																								<span className="text-gray-500 dark:text-slate-400">
																									Demolition:
																								</span>
																								<span className="text-slate-900 dark:text-white">
																									{subcatData.demolitionRequired
																										? "Required"
																										: "Not required"}
																								</span>
																							</div>
																						)}

																						{/* Wall Options */}
																						{subcategory.hasWallOptions &&
																							subcatData.selectedWallOptions &&
																							subcatData.selectedWallOptions
																								.length > 0 && (
																								<div className="col-span-2">
																									<span className="text-gray-500 dark:text-slate-400">
																										Wall Options:
																									</span>
																									<div className="mt-1 flex flex-wrap gap-2">
																										{subcatData.selectedWallOptions.map(
																											(option) => (
																												<span
																													key={option}
																													className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-xs">
																													{getWallOptionLabel(
																														option
																													)}
																												</span>
																											)
																										)}
																									</div>
																								</div>
																							)}

																						{/* Baseboards */}
																						{subcategory.id === "floor" && (
																							<div className="flex items-center gap-2">
																								<span className="text-gray-500 dark:text-slate-400">
																									Baseboards:
																								</span>
																								<span className="text-slate-900 dark:text-white">
																									{subcatData.baseboardsRequired
																										? "Required"
																										: "Not required"}
																								</span>
																							</div>
																						)}

																						{/* Extra Description */}
																						{subcatData.extraDescription && (
																							<div className="col-span-2 mt-2">
																								<span className="text-gray-500 dark:text-slate-400">
																									Additional Notes:
																								</span>
																								<p className="mt-1 text-sm bg-gray-50 dark:bg-slate-700/30 p-2 rounded text-slate-900 dark:text-white">
																									{subcatData.extraDescription}
																								</p>
																							</div>
																						)}
																					</div>
																				</div>
																			);
																		}
																	)}
																</div>
															) : (
																<p className="text-gray-500 dark:text-slate-400 text-center py-4">
																	No subcategories selected for this area.
																</p>
															)}
														</div>
													)}
												</div>
											);
										})}

										{(!lead.selectedAreas ||
											lead.selectedAreas.length === 0) && (
											<div className="p-6 text-center">
												<p className="text-gray-500 dark:text-slate-400">
													No areas have been selected for this project.
												</p>
											</div>
										)}
									</div>
								</CardContent>
							</Card>

							{/* Project Images */}
							<Card className="overflow-hidden border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
								<CardContent className="p-0">
									<div className="p-5 border-b border-gray-200 dark:border-slate-700">
										<h2 className="text-lg font-semibold text-slate-900 dark:text-white">
											Project Images
										</h2>
									</div>

									<div className="p-5">
										{allImages.length > 0 ? (
											<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
												{allImages.map((image, index) => (
													<div
														key={image.id || index}
														className="aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700 cursor-pointer group relative"
														onClick={() => openImageViewer(image, index)}>
														<img
															src={image.url || "/placeholder.svg"}
															alt={`Project image ${index + 1}`}
															className="w-full h-full object-cover group-hover:scale-105 transition-transform"
														/>
														<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
															<div className="opacity-0 group-hover:opacity-100 transition-opacity">
																<div className="bg-white dark:bg-slate-800 rounded-full p-2">
																	<ImageIcon
																		size={18}
																		className="text-blue-600 dark:text-blue-400"
																	/>
																</div>
															</div>
														</div>
														<div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 translate-y-full group-hover:translate-y-0 transition-transform">
															{image.areaName || "Project Image"}
														</div>
													</div>
												))}
											</div>
										) : (
											<div className="text-center py-10">
												<div className="bg-gray-100 dark:bg-slate-700 rounded-full p-3 inline-flex mb-4">
													<Camera
														size={24}
														className="text-gray-400 dark:text-slate-500"
													/>
												</div>
												<h3 className="text-lg font-medium text-gray-700 dark:text-slate-300">
													No Images Available
												</h3>
												<p className="text-gray-500 dark:text-slate-400 mt-1">
													This project doesn't have any images uploaded.
												</p>
											</div>
										)}
									</div>
								</CardContent>
							</Card>

							{/* Action Buttons */}
							<Card className="overflow-hidden border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
								<CardContent className="p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
									<div className="text-sm text-gray-500 dark:text-slate-400 max-w-md">
										<div className="flex items-start gap-2">
											<Info
												size={16}
												className="text-blue-500 dark:text-blue-400 mt-0.5"
											/>
											<p>
												Please review the project details and estimated cost
												before making your decision.
											</p>
										</div>
									</div>
									<div className="flex gap-3 w-full sm:w-auto">
										<Button
											onClick={() => setInvoiceModalOpen(true)}
											variant="outline"
											className="flex items-center justify-center gap-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700">
											<DollarSign
												size={18}
												className="text-green-500 dark:text-green-400"
											/>
											Create Invoice
										</Button>
										<Button
											onClick={() => setDeclineModalOpen(true)}
											variant="outline"
											className="flex items-center justify-center gap-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700">
											<XCircle
												size={18}
												className="text-red-500 dark:text-red-400"
											/>
											Decline Estimate
										</Button>
										<Button
											onClick={handleAccept}
											className="flex items-center justify-center gap-2">
											<CheckCircle size={18} />
											Accept Estimate
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</main>

			{/* Accept Modal */}
			<CustomModal
				isOpen={acceptModalOpen}
				onClose={() => setAcceptModalOpen(false)}
				title="Accept Project Estimate"
				footer={
					<>
						<Button
							onClick={() => setAcceptModalOpen(false)}
							variant="outline"
							className="border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700">
							Cancel
						</Button>
						<Button
							onClick={handleAcceptConfirm}
							className="bg-green-600 hover:bg-green-700">
							<CheckCircle size={16} className="mr-2" />
							Accept Estimate
						</Button>
					</>
				}>
				<div className="space-y-4">
					<p className="text-slate-600 dark:text-slate-300">
						You're about to accept the project estimate for your remodeling
						request. By accepting, you agree to the estimated timeline and cost.
					</p>

					<div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
						<div className="flex items-start gap-2">
							<Info
								size={16}
								className="text-blue-500 dark:text-blue-400 mt-0.5"
							/>
							<p className="text-sm text-blue-700 dark:text-blue-300">
								A contractor will contact you within 24 hours to discuss next
								steps and schedule an in-person assessment.
							</p>
						</div>
					</div>
				</div>
			</CustomModal>

			{/* Accept Success Modal */}
			<CustomModal
				isOpen={acceptSuccessModalOpen}
				onClose={() => {
					setAcceptSuccessModalOpen(false);
					navigate("/projects");
				}}
				title="Estimate Accepted"
				footer={
					<Button
						onClick={() => {
							setAcceptSuccessModalOpen(false);
							navigate("/projects");
						}}
						className="bg-green-600 hover:bg-green-700">
						View My Projects
					</Button>
				}>
				<div className="text-center py-6">
					<div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
						<CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
					</div>
					<h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
						Estimate Successfully Accepted
					</h3>
					<p className="text-slate-500 dark:text-slate-400">
						Thank you for accepting the estimate. A contractor will contact you
						within 24 hours to schedule the next steps for your project.
					</p>
				</div>
			</CustomModal>

			{/* Decline Modal */}
			<CustomModal
				isOpen={declineModalOpen}
				onClose={() => setDeclineModalOpen(false)}
				title="Decline Estimate"
				footer={
					<>
						<Button
							onClick={() => setDeclineModalOpen(false)}
							variant="outline"
							className="border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700">
							Cancel
						</Button>
						<Button
							onClick={handleDeclineConfirm}
							disabled={declineReason.trim().length < 10}
							variant="destructive">
							<XCircle size={16} className="mr-2" />
							Decline Estimate
						</Button>
					</>
				}>
				<div className="space-y-4">
					<div className="space-y-2">
						<label className="text-sm font-medium text-slate-900 dark:text-white">
							Reason for declining
						</label>
						<Textarea
							value={declineReason}
							onChange={(e) => {
								setDeclineReason(e.target.value);
								if (e.target.value.trim().length >= 10) {
									setDeclineErrorMessage("");
								}
							}}
							placeholder="Please let us know why you're declining this estimate..."
							className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
						/>
						{declineErrorMessage && (
							<p className="text-red-500 dark:text-red-400 text-sm">
								{declineErrorMessage}
							</p>
						)}
					</div>

					<div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
						<div className="flex items-start gap-2">
							<Info
								size={16}
								className="text-amber-500 dark:text-amber-400 mt-0.5"
							/>
							<p className="text-sm text-amber-700 dark:text-amber-300">
								Your feedback helps us improve our estimates. If you'd like to
								request a revised estimate, please mention that in your reason.
							</p>
						</div>
					</div>
				</div>
			</CustomModal>

			{/* Enhanced Image Viewer */}
			<div
				className={`fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center transition-opacity duration-300 ${
					imageViewerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}>
				<div
					className={`relative w-full h-full flex flex-col ${
						isFullscreen ? "p-0" : "p-4 md:p-8"
					}`}>
					{/* Top toolbar */}
					<div className="flex justify-between items-center text-white mb-2 px-2">
						<div className="flex items-center gap-2">
							<h3 className="text-lg font-medium">
								{selectedImage?.name || "Project Image"}
								<span className="text-sm font-normal ml-2 text-gray-300">
									{currentImageIndex + 1} of {allImages.length}
								</span>
							</h3>
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={handleZoomOut}
								className="p-2 rounded-full hover:bg-gray-800 transition-colors"
								title="Zoom Out">
								<ZoomOut size={20} />
							</button>
							<span className="text-sm w-12 text-center">
								{Math.round(zoomLevel * 100)}%
							</span>
							<button
								onClick={handleZoomIn}
								className="p-2 rounded-full hover:bg-gray-800 transition-colors"
								title="Zoom In">
								<ZoomIn size={20} />
							</button>
							<button
								onClick={toggleFullscreen}
								className="p-2 rounded-full hover:bg-gray-800 transition-colors"
								title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
								{isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
							</button>
							<button
								onClick={() => setImageViewerOpen(false)}
								className="p-2 rounded-full hover:bg-gray-800 transition-colors"
								title="Close">
								<X size={20} />
							</button>
						</div>
					</div>

					{/* Main image area */}
					<div className="flex-1 relative overflow-hidden">
						{/* Navigation buttons */}
						<button
							onClick={handlePreviousImage}
							className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-colors z-10"
							title="Previous Image">
							<ChevronLeft size={24} className="text-white" />
						</button>

						<button
							onClick={handleNextImage}
							className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-colors z-10"
							title="Next Image">
							<ChevronRight size={24} className="text-white" />
						</button>

						{/* Image container */}
						<div className="h-full flex items-center justify-center overflow-auto">
							<img
								src={selectedImage?.url || "/placeholder.svg"}
								alt={selectedImage?.name || "Project image"}
								className="transition-transform duration-200 ease-in-out"
								style={{
									transform: `scale(${zoomLevel})`,
									maxHeight: "100%",
									maxWidth: "100%",
									objectFit: "contain",
								}}
							/>
						</div>
					</div>

					{/* Image details panel */}
					<div className="bg-gray-900 text-white p-4 rounded-b-lg mt-2">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<h4 className="font-medium text-lg mb-2">
									{selectedImage?.areaName || "Project Area"}
								</h4>
								<p className="text-gray-300 mb-3">
									{selectedImage?.description || "No description available"}
								</p>

								<div className="flex items-center gap-2 text-sm text-gray-400">
									<Clock size={14} />
									<span>
										Uploaded:{" "}
										{selectedImage?.uploadedAt
											? formatDate(selectedImage.uploadedAt) +
											  " at " +
											  formatTime(selectedImage.uploadedAt)
											: "Unknown"}
									</span>
								</div>
							</div>

							<div className="space-y-2">
								<h5 className="font-medium text-sm text-gray-300">
									Image Details
								</h5>
								<div className="grid grid-cols-2 gap-2 text-sm">
									{selectedImage?.metadata?.dimensions && (
										<div className="flex items-center gap-1 text-gray-400">
											<span className="text-gray-500">Dimensions:</span>
											<span>{selectedImage.metadata.dimensions}</span>
										</div>
									)}

									{selectedImage?.metadata?.size && (
										<div className="flex items-center gap-1 text-gray-400">
											<span className="text-gray-500">Size:</span>
											<span>{selectedImage.metadata.size}</span>
										</div>
									)}

									{selectedImage?.metadata?.type && (
										<div className="flex items-center gap-1 text-gray-400">
											<span className="text-gray-500">Type:</span>
											<span>{selectedImage.metadata.type}</span>
										</div>
									)}
								</div>

								<div className="flex justify-end mt-4">
									<Button
										variant="outline"
										size="sm"
										className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
										<Download size={14} className="mr-1" />
										Download Image
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Invoice Modal */}
			<CustomModal
				isOpen={invoiceModalOpen}
				onClose={() => setInvoiceModalOpen(false)}
				title="Create and Send Invoice"
				maxWidth="4xl"
				closeOnOutsideClick={false}>
				<InvoiceGenerator
					customer={lead}
					projectDetails={lead.areaDetails}
					onSend={handleSendInvoice}
					onClose={() => setInvoiceModalOpen(false)}
				/>
			</CustomModal>

			{/* Invoice Sent Confirmation Modal */}
			<CustomModal
				isOpen={invoiceSentModalOpen}
				onClose={() => setInvoiceSentModalOpen(false)}
				title="Invoice Sent"
				maxWidth="md">
				<InvoiceSentConfirmation
					customer={lead}
					invoiceData={sentInvoiceData}
					onClose={() => setInvoiceSentModalOpen(false)}
				/>
			</CustomModal>
		</div>
	);
}
