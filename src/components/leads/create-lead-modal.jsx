"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Tag, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import Step1CustomerInfo from "./steps/step1-customer-info";
import Step2EstimateDetails from "./steps/step2-estimate-details";
import Step3Images from "./steps/step3-images";
import Step4TeamCost from "./steps/step4-team-cost";
import Step5Review from "./steps/step5-review";

// Mock data for users
const mockUsers = [
	{
		id: 1,
		name: "Amanda Omar",
		email: "amanda@example.com",
		avatar: "/contemplative-woman.png",
	},
	{
		id: 2,
		name: "Amy Davis",
		email: "amy@example.com",
		avatar: "/sunlit-blonde.png",
	},
	{
		id: 3,
		name: "John Smith",
		email: "john@example.com",
		avatar: "/thoughtful-brunette.png",
	},
	{
		id: 4,
		name: "Michael Chen",
		email: "michael@example.com",
		avatar: "/thoughtful-urbanite.png",
	},
	{
		id: 5,
		name: "David Brown",
		email: "david@example.com",
		avatar: "/thoughtful-spectacled-man.png",
	},
	{
		id: 6,
		name: "Emma Wilson",
		email: "emma@example.com",
		avatar: "/fiery-portrait.png",
	},
	{
		id: 7,
		name: "Sarah Johnson",
		email: "sarah@example.com",
		avatar: "/curly-haired-portrait.png",
	},
	{
		id: 8,
		name: "Jill Rawson",
		email: "jill@example.com",
		avatar: "/confident-gaze.png",
	},
	{
		id: 9,
		name: "Colex Mine",
		email: "colex@example.com",
		avatar: "/thoughtful-bearded-man.png",
	},
];

// Country list for dropdown
const countries = [
	"United States",
	"Canada",
	"United Kingdom",
	"Australia",
	"Germany",
	"France",
	"Spain",
	"Italy",
	"Japan",
	"China",
	"India",
	"Brazil",
	"Mexico",
	"South Africa",
	"Russia",
	// Add more countries as needed
];

export default function CreateLeadModal({ isOpen, onClose, onCreateLead }) {
	// Current step state
	const [currentStep, setCurrentStep] = useState(1);
	const totalSteps = 5;

	// Form state
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		telephone: "",
		street: "",
		city: "",
		state: "",
		zipCode: "",
		country: "United States",

		selectedAreas: [],
		areaDetails: {},

		assignedUsers: [],
		estimatedValue: "",
		estimatedTime: "",
	});

	console.log("Form Data:", formData);

	// Validation state
	const [errors, setErrors] = useState({
		firstName: "",
		lastName: "",
		email: "",
		telephone: "",
		street: "",
		city: "",
		state: "",
		zipCode: "",
		country: "",
		estimatedValue: "",
		estimatedTime: "",
	});

	const [isLoading, setIsLoading] = useState(false);
	const [stepCompleted, setStepCompleted] = useState({
		1: false,
		2: false,
		3: false,
		4: false,
		5: false,
	});

	// Handle form field changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear errors when user types
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	// Reset form on close
	const handleClose = () => {
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			telephone: "",
			street: "",
			city: "",
			state: "",
			zipCode: "",
			country: "United States",
			selectedAreas: [],
			areaDetails: {},
			assignedUsers: [],
			estimatedValue: "",
			estimatedTime: "",
		});

		setErrors({});
		setIsLoading(false);
		setCurrentStep(1);
		setStepCompleted({
			1: false,
			2: false,
			3: false,
			4: false,
			5: false,
		});
		onClose();
	};

	// Validate step 1 - Customer Information
	const validateStep1 = () => {
		const newErrors = {
			email: "",
			telephone: "",
			street: "",
			city: "",
			state: "",
			zipCode: "",
			country: "",
		};
		let isValid = true;

		// Validate email (required)
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
			isValid = false;
		}

		// Validate telephone (required) - No format restrictions
		if (!formData.telephone.trim()) {
			newErrors.telephone = "Phone number is required";
			isValid = false;
		}

		// Validate address fields
		if (!formData.street.trim()) {
			newErrors.street = "Street is required";
			isValid = false;
		}

		if (!formData.city.trim()) {
			newErrors.city = "City is required";
			isValid = false;
		}

		if (!formData.state.trim()) {
			newErrors.state = "State is required";
			isValid = false;
		}

		if (!formData.zipCode.trim()) {
			newErrors.zipCode = "ZIP code is required";
			isValid = false;
		}

		// Validate country (required)
		if (!formData.country || formData.country.trim() === "") {
			newErrors.country = "Country is required";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	// Validate step 2 - Estimate Details
	const validateStep2 = () => {
		// Validation logic for step 2
		return true;
	};

	// Validate step 3 - Images
	const validateStep3 = () => {
		// No validation required for step 3, images are optional
		return true;
	};

	// Validate step 4 - Team & Cost
	const validateStep4 = () => {
		const newErrors = {
			estimatedValue: "",
			estimatedTime: "",
		};
		let isValid = true;

		// Validate estimated value if provided
		if (
			formData.estimatedValue &&
			isNaN(Number.parseFloat(formData.estimatedValue))
		) {
			newErrors.estimatedValue = "Value must be a number";
			isValid = false;
		}

		// Validate estimated time if provided
		if (
			formData.estimatedTime &&
			isNaN(Number.parseFloat(formData.estimatedTime))
		) {
			newErrors.estimatedTime = "Time must be a number";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	// Validate step 5 - Review
	const validateStep5 = () => {
		// No validation needed for review step
		return true;
	};

	// Handle next step
	const handleNextStep = () => {
		let isValid = false;

		// Validate current step
		switch (currentStep) {
			case 1:
				isValid = validateStep1();
				break;
			case 2:
				isValid = validateStep2();
				break;
			case 3:
				isValid = validateStep3();
				break;
			case 4:
				isValid = validateStep4();
				break;
			case 5:
				isValid = validateStep5();
				break;
			default:
				isValid = false;
		}

		if (isValid) {
			// Mark current step as completed
			setStepCompleted((prev) => ({ ...prev, [currentStep]: true }));

			// Move to next step if not on the last step
			if (currentStep < totalSteps) {
				setCurrentStep((prev) => prev + 1);
			}
		}
	};

	// Handle previous step
	const handlePrevStep = () => {
		if (currentStep > 1) {
			setCurrentStep((prev) => prev - 1);
		}
	};

	// Handle direct navigation to a step
	const handleStepClick = (step) => {
		// Only allow navigation to completed steps or the current step + 1
		if (stepCompleted[step - 1] || step === 1 || step === currentStep) {
			setCurrentStep(step);
		}
	};

	// Handle form submission (final step)
	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		try {
			// Simulate API call
			setTimeout(() => {
				// Create lead object
				const newLead = {
					contact: {
						firstName: formData.firstName,
						lastName: formData.lastName,
						email: formData.email,
						phone: formData.telephone,
						address: {
							street: formData.street,
							city: formData.city,
							state: formData.state,
							zipCode: formData.zipCode,
							country: formData.country,
						},
					},
					remodelingDetails: {
						selectedAreas: formData.selectedAreas,
						areaDetails: formData.areaDetails,
					},
					assignedUsers: formData.assignedUsers,
					estimate: {
						value: Number.parseFloat(formData.estimatedValue) || 0,
						time: Number.parseFloat(formData.estimatedTime) || 0,
					},
					status: "New",
					category: "Remodeling",
					createdAt: new Date().toLocaleDateString("en-US", {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
					}),
				};

				onCreateLead(newLead);
				setIsLoading(false);
				handleClose();
			}, 1500);
		} catch (error) {
			console.error("Error creating lead:", error);
			setIsLoading(false);
		}
	};

	// Animation variants
	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { duration: 0.3 } },
		exit: { opacity: 0, transition: { duration: 0.2 } },
	};

	const modalVariants = {
		hidden: { opacity: 0, y: 20, scale: 0.95 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: { type: "spring", stiffness: 300, damping: 30 },
		},
		exit: {
			opacity: 0,
			y: 20,
			scale: 0.95,
			transition: { duration: 0.2 },
		},
	};

	// Step indicator component
	const renderStepIndicator = () => {
		return (
			<div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
				{Array.from({ length: totalSteps }).map((_, index) => {
					const stepNumber = index + 1;
					const isActive = currentStep === stepNumber;
					const isCompleted = stepCompleted[stepNumber];
					const isClickable =
						stepCompleted[stepNumber - 1] ||
						stepNumber === 1 ||
						stepNumber === currentStep;

					return (
						<div
							key={stepNumber}
							className={`flex flex-col items-center ${
								isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-60"
							}`}
							onClick={() => isClickable && handleStepClick(stepNumber)}>
							<div className="flex items-center">
								{index > 0 && (
									<div
										className={`h-1 w-10 -ml-5 ${
											isCompleted || stepCompleted[stepNumber]
												? "bg-primary"
												: "bg-slate-200 dark:bg-slate-700"
										}`}
									/>
								)}
								<div
									className={`h-8 w-8 rounded-full flex items-center justify-center ${
										isActive
											? "bg-primary text-white"
											: isCompleted
											? "bg-primary/20 text-primary"
											: "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
									}`}>
									{isCompleted ? (
										<CheckCircle className="h-4 w-4" />
									) : (
										<span className="text-sm font-medium">{stepNumber}</span>
									)}
								</div>
								{index < totalSteps - 1 && (
									<div
										className={`h-1 w-10 -mr-5 ${
											stepCompleted[stepNumber]
												? "bg-primary"
												: "bg-slate-200 dark:bg-slate-700"
										}`}
									/>
								)}
							</div>
							<span
								className={`text-xs mt-1 font-medium ${
									isActive
										? "text-primary"
										: "text-slate-500 dark:text-slate-400"
								}`}>
								{stepNumber === 1 && "Customer Info"}
								{stepNumber === 2 && "Remodeling"}
								{stepNumber === 3 && "Images"}
								{stepNumber === 4 && "Team & Cost"}
								{stepNumber === 5 && "Review"}
							</span>
						</div>
					);
				})}
			</div>
		);
	};

	// Render current step content
	const renderCurrentStep = () => {
		switch (currentStep) {
			case 1:
				return (
					<Step1CustomerInfo
						formData={formData}
						errors={errors}
						handleChange={handleChange}
						countries={countries}
					/>
				);
			case 2:
				return (
					<Step2EstimateDetails
						formData={formData}
						setFormData={setFormData}
						errors={errors}
					/>
				);
			case 3:
				return (
					<Step3Images
						formData={formData}
						setFormData={setFormData}
						errors={errors}
					/>
				);
			case 4:
				return (
					<Step4TeamCost
						formData={formData}
						setFormData={setFormData}
						errors={errors}
						mockUsers={mockUsers}
					/>
				);
			case 5:
				return <Step5Review formData={formData} />;
			default:
				return null;
		}
	};

	if (!isOpen) return null;

	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={overlayVariants}
				onClick={onClose}>
				<motion.div
					className="w-full max-w-2xl bg-white dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 bg-gradient-to-b from-slate-50 to-white rounded-2xl shadow-2xl overflow-hidden relative"
					variants={modalVariants}
					onClick={(e) => e.stopPropagation()}>
					{/* Decorative elements */}
					<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
						<div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl opacity-50"></div>
						<div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl opacity-50"></div>
					</div>

					{/* Top accent */}
					<div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/50"></div>

					{/* Header */}
					<div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
								<Tag className="h-5 w-5 text-primary" />
							</div>
							<h2 className="text-xl font-semibold text-slate-900 dark:text-white">
								Create New Lead
							</h2>
						</div>
						<Button
							variant="ghost"
							size="icon"
							onClick={onClose}
							className="h-8 w-8 rounded-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white">
							<X className="h-5 w-5" />
						</Button>
					</div>

					{/* Step Indicator */}
					{renderStepIndicator()}

					{/* Form */}
					<form className="p-6 h-[60vh] overflow-y-auto">
						{renderCurrentStep()}
					</form>

					{/* Footer with navigation buttons */}
					<div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-between">
						<div>
							{currentStep > 1 && (
								<Button
									type="button"
									variant="outline"
									onClick={handlePrevStep}
									className="border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white flex items-center gap-2">
									<ArrowLeft className="h-4 w-4" />
									Back
								</Button>
							)}
						</div>

						<div>
							{currentStep < totalSteps ? (
								<Button
									type="button"
									onClick={handleNextStep}
									className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
									{currentStep === 1 ? "Save Info" : "Continue"}
									<ArrowRight className="h-4 w-4" />
								</Button>
							) : (
								<Button
									type="button"
									onClick={handleSubmit}
									className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
									disabled={isLoading}>
									{isLoading ? (
										<div className="flex items-center gap-2">
											<div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
											<span>Creating...</span>
										</div>
									) : (
										<div className="flex items-center gap-2">
											<span>Create Lead</span>
											<Tag className="h-4 w-4" />
										</div>
									)}
								</Button>
							)}
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
