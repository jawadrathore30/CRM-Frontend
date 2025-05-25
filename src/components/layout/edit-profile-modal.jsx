"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	X,
	Save,
	Camera,
	Edit,
	Mail,
	Phone,
	MapPin,
	Clock,
	User,
	Check,
	AlertCircle,
	MessageSquare,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserSuccess } from "../../redux/user/userSlice";

export default function UpdateProfileModal({ isOpen, onClose }) {
	const { currentUser } = useSelector((state) => state.user);
	const [formData, setFormData] = useState({
		firstName: currentUser?.firstName || "",
		lastName: currentUser?.lastName || "",
		email: currentUser?.email || "",
		telephone: currentUser?.telephone || "",
		position: currentUser?.position || "",
		timeZone: currentUser?.timeZone || "",
		socialProfile: false,
		telegram: currentUser?.telegram || "",
		whatsapp: currentUser?.whatsapp || "",
		profilePicture: currentUser?.profilePicture || "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [preview, setPreview] = useState(null);
	const [completionPercentage, setCompletionPercentage] = useState(0);
	const fileInputRef = useRef(null);
	const [activeTab, setActiveTab] = useState("personal");
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const dispatch = useDispatch();

	// Calculate profile completion percentage
	useEffect(() => {
		const requiredFields = ["firstName", "lastName", "email"];
		const optionalFields = [
			"telephone",
			"profilePicture",
			"position",
			"timeZone",
			"telegram",
			"whatsapp",
		];

		// Required fields count for 40% of completion
		const requiredFieldsCompleted = requiredFields.filter((field) =>
			formData[field]?.trim()
		).length;
		const requiredPercentage =
			(requiredFieldsCompleted / requiredFields.length) * 40;

		// Optional fields count for 60% of completion
		const optionalFieldsCompleted = optionalFields.filter((field) =>
			formData[field]?.trim()
		).length;
		const optionalPercentage =
			(optionalFieldsCompleted / optionalFields.length) * 60;

		setCompletionPercentage(
			Math.round(requiredPercentage + optionalPercentage)
		);
	}, [formData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSwitchChange = (checked) => {
		setFormData((prev) => ({ ...prev, socialProfile: checked }));
	};

	const handleTimeZoneChange = (value) => {
		setFormData((prev) => ({ ...prev, timeZone: value }));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
				setFormData({ ...formData, avatar: reader.result });
			};
			reader.readAsDataURL(file);
		}
	};

	const handleAvatarClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (fileInputRef.current) {
			fileInputRef.current.click();
		} else {
			console.log("fileInputRef is not set");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		// Trim string values
		const trimmedData = {};
		for (const key in formData) {
			if (typeof formData[key] === "string") {
				trimmedData[key] = formData[key].trim();
			} else {
				trimmedData[key] = formData[key];
			}
		}

		try {
			const response = await fetch(`/api/user/update/${currentUser?._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(trimmedData), // Sending trimmed data
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Something went wrong!");
			}

			const result = await response.json();
			// console.log("Updated User:", result);
			dispatch(updateUserSuccess(result)); // Dispatch the updated user data to Redux store

			setShowSuccessMessage(true);

			// Close after showing success message
			setTimeout(() => {
				setShowSuccessMessage(false);
				onClose();
			}, 3000);
		} catch (error) {
			console.error("Update failed:", error.message);
			alert(error.message); // You can replace this with UI error handling
		} finally {
			setIsLoading(false);
		}
	};

	const handleClose = () => {
		setFormData({
			firstName: currentUser?.firstName || "",
			lastName: currentUser?.lastName || "",
			email: currentUser?.email || "",
			telephone: currentUser?.telephone || "",
			position: currentUser?.position || "",
			timeZone: currentUser?.timeZone || "",
			socialProfile: false,
			telegram: currentUser?.telegram || "",
			whatsapp: currentUser?.whatsapp || "",
			profilePicture: currentUser?.profilePicture || "",
		});
		setShowSuccessMessage(false);
		setPreview(null);
		setCompletionPercentage(0);
		onClose();
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

	const successVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { type: "spring", stiffness: 300, damping: 20 },
		},
		exit: {
			opacity: 0,
			scale: 0.8,
			transition: { duration: 0.2 },
		},
	};

	const timeZones = [
		{ label: "(UTC−12:00) Baker Island Time", value: "UTC−12:00" },
		{
			label: "(UTC−11:00) Niue Time / Samoa Standard Time",
			value: "UTC−11:00",
		},
		{ label: "(UTC−10:00) Hawaii-Aleutian Standard Time", value: "UTC−10:00" },
		{ label: "(UTC−09:30) Marquesas Islands Time", value: "UTC−09:30" },
		{ label: "(UTC−09:00) Alaska Standard Time", value: "UTC−09:00" },
		{ label: "(UTC−08:00) Pacific Standard Time", value: "UTC−08:00" },
		{ label: "(UTC−07:00) Mountain Standard Time", value: "UTC−07:00" },
		{ label: "(UTC−06:00) Central Standard Time", value: "UTC−06:00" },
		{ label: "(UTC−05:00) Eastern Standard Time", value: "UTC−05:00" },
		{ label: "(UTC−04:00) Atlantic Standard Time", value: "UTC−04:00" },
		{ label: "(UTC−03:30) Newfoundland Standard Time", value: "UTC−03:30" },
		{ label: "(UTC−03:00) Argentina Time / Brasília Time", value: "UTC−03:00" },
		{ label: "(UTC−02:00) South Georgia Time", value: "UTC−02:00" },
		{ label: "(UTC−01:00) Azores Standard Time", value: "UTC−01:00" },
		{ label: "(UTC±00:00) Greenwich Mean Time / UTC", value: "UTC±00:00" },
		{
			label: "(UTC+01:00) Central European Time / West Africa Time",
			value: "UTC+01:00",
		},
		{
			label: "(UTC+02:00) Eastern European Time / Central Africa Time",
			value: "UTC+02:00",
		},
		{ label: "(UTC+03:00) Moscow Time / East Africa Time", value: "UTC+03:00" },
		{ label: "(UTC+03:30) Iran Standard Time", value: "UTC+03:30" },
		{ label: "(UTC+04:00) Gulf Standard Time", value: "UTC+04:00" },
		{ label: "(UTC+04:30) Afghanistan Time", value: "UTC+04:30" },
		{ label: "(UTC+05:00) Pakistan Standard Time", value: "UTC+05:00" },
		{ label: "(UTC+05:30) Indian Standard Time", value: "UTC+05:30" },
		{ label: "(UTC+05:45) Nepal Time", value: "UTC+05:45" },
		{ label: "(UTC+06:00) Bangladesh Standard Time", value: "UTC+06:00" },
		{ label: "(UTC+06:30) Cocos Islands / Myanmar Time", value: "UTC+06:30" },
		{ label: "(UTC+07:00) Indochina Time", value: "UTC+07:00" },
		{ label: "(UTC+08:00) China Standard Time / AWST", value: "UTC+08:00" },
		{
			label: "(UTC+08:45) Australian Central Western Standard Time",
			value: "UTC+08:45",
		},
		{
			label: "(UTC+09:00) Japan Standard Time / Korea Standard Time",
			value: "UTC+09:00",
		},
		{
			label: "(UTC+09:30) Australian Central Standard Time",
			value: "UTC+09:30",
		},
		{
			label: "(UTC+10:00) Australian Eastern Standard Time",
			value: "UTC+10:00",
		},
		{ label: "(UTC+10:30) Lord Howe Standard Time", value: "UTC+10:30" },
		{ label: "(UTC+11:00) Solomon Islands Time", value: "UTC+11:00" },
		{
			label: "(UTC+12:00) New Zealand Standard Time / Fiji Time",
			value: "UTC+12:00",
		},
		{ label: "(UTC+12:45) Chatham Islands Time", value: "UTC+12:45" },
		{
			label: "(UTC+13:00) Tonga Time / Phoenix Islands Time",
			value: "UTC+13:00",
		},
		{ label: "(UTC+14:00) Line Islands Time", value: "UTC+14:00" },
	];

	if (!isOpen) return null;

	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={overlayVariants}
				onClick={(e) => {
					if (e.target === e.currentTarget) onClose();
				}}>
				{showSuccessMessage ? (
					<motion.div
						className="bg-white dark:bg-slate-800 rounded-2xl p-8 flex flex-col items-center max-w-md mx-auto shadow-2xl border border-slate-200 dark:border-slate-700/50"
						variants={successVariants}
						initial="hidden"
						animate="visible"
						exit="exit">
						<div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center mb-6">
							<Check className="h-10 w-10 text-green-600 dark:text-green-500" />
						</div>
						<h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
							Profile Updated!
						</h2>
						<p className="text-slate-600 dark:text-slate-400 text-center mb-6">
							Your profile has been successfully updated.
						</p>
						<Button
							onClick={handleClose}
							className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white">
							Close
						</Button>
					</motion.div>
				) : (
					<motion.div
						className="w-full max-w-3xl bg-white dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 bg-gradient-to-b from-slate-50 to-white rounded-2xl shadow-2xl overflow-hidden relative"
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={(e) => e.stopPropagation()}>
						{/* Decorative elements */}
						<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
							<div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl opacity-50"></div>
							<div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl opacity-50"></div>
						</div>

						{/* Top accent */}
						<div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/50"></div>

						{/* Header */}
						<div className="relative flex items-center justify-between px-8 py-6 ">
							<div className="flex flex-col">
								<h2 className="text-2xl font-bold text-slate-900 dark:text-white">
									Profile Settings
								</h2>
								<p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
									Update your personal information and settings
								</p>
							</div>
							<Button
								variant="ghost"
								size="icon"
								onClick={handleClose}
								className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-full h-10 w-10 absolute">
								<X className="h-5 w-5" />
							</Button>
						</div>

						{/* Profile completion */}
						<div className="px-8 pb-6 border-b border-slate-200 dark:border-slate-700">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm text-slate-500 dark:text-slate-400">
									Profile Completion
								</span>
								<span className="text-sm font-medium text-slate-900 dark:text-white">
									{completionPercentage}%
								</span>
							</div>
							<div className="relative h-2 w-full bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
								<motion.div
									className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
									initial={{ width: 0 }}
									animate={{ width: `${completionPercentage}%` }}
									transition={{ duration: 0.5, ease: "easeOut" }}></motion.div>
							</div>
						</div>

						{/* Form */}
						<form
							onSubmit={handleSubmit}
							className="p-8 max-h-[60vh] overflow-y-auto">
							<div className="grid gap-6">
								<div className="flex flex-col items-center gap-4 mb-4">
									<div className="relative group">
										<div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary/60 blur-lg opacity-20 dark:opacity-30 group-hover:opacity-30 dark:group-hover:opacity-40 transition-opacity"></div>
										<div onClick={handleAvatarClick}>
											<Avatar
												className="h-28 w-28 border-4 border-slate-200 dark:border-slate-700/50 group-hover:border-primary/20 dark:group-hover:border-primary/30 transition-all duration-300 relative"
												onClick={handleAvatarClick}>
												<AvatarImage
													src={
														formData.profilePicture !==
														"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
															? formData.profilePicture
															: "/placeholder.svg?height=112&width=112" ||
															  "/placeholder.svg"
													}
													alt="Avatar"
													className="object-cover"
												/>
												<AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 text-slate-900 dark:text-white text-xl font-semibold">
													{formData.firstName.charAt(0).toUpperCase()}
													{formData.lastName.charAt(0).toUpperCase()}
												</AvatarFallback>
											</Avatar>
											<div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
												<Camera className="h-8 w-8 text-white" />
											</div>
											<div className="absolute bottom-0 right-0 h-8 w-8 bg-primary rounded-full flex items-center justify-center shadow-lg transform translate-x-1 translate-y-1 cursor-pointer hover:bg-primary/90 transition-colors">
												<Edit className="h-4 w-4 text-white" />
											</div>
										</div>
										<input
											type="file"
											accept="image/*"
											ref={fileInputRef}
											onChange={handleFileChange}
											className="hidden"
										/>
									</div>
									<div className="text-center">
										<h3 className="text-lg font-medium text-slate-900 dark:text-white">{`${formData.firstName} ${formData.lastName}`}</h3>
										<p className="text-slate-500 dark:text-slate-400 text-sm">
											{formData.position}
										</p>
									</div>
								</div>

								<div className="grid md:grid-cols-2 gap-6">
									<motion.div
										custom={0}
										variants={formItemVariants}
										initial="hidden"
										animate="visible"
										className="space-y-2">
										<Label
											htmlFor="firstName"
											className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
											<User className="h-4 w-4 text-primary/70" />
											First Name*
										</Label>
										<Input
											id="firstName"
											name="firstName"
											value={formData.firstName}
											onChange={handleChange}
											className="h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
											required
										/>
									</motion.div>

									<motion.div
										custom={1}
										variants={formItemVariants}
										initial="hidden"
										animate="visible"
										className="space-y-2">
										<Label
											htmlFor="lastName"
											className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
											<User className="h-4 w-4 text-primary/70" />
											Last Name*
										</Label>
										<Input
											id="lastName"
											name="lastName"
											value={formData.lastName}
											onChange={handleChange}
											className="h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
											required
										/>
									</motion.div>

									<motion.div
										custom={2}
										variants={formItemVariants}
										initial="hidden"
										animate="visible"
										className="space-y-2">
										<Label
											htmlFor="email"
											className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
											<Mail className="h-4 w-4 text-primary/70" />
											Email Address*
										</Label>
										<Input
											id="email"
											name="email"
											type="email"
											value={formData.email}
											onChange={handleChange}
											className="h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
											readOnly
											disabled
										/>
										<p className="text-xs text-slate-500 dark:text-slate-400">
											Email cannot be changed
										</p>
									</motion.div>

									<motion.div
										custom={3}
										variants={formItemVariants}
										initial="hidden"
										animate="visible"
										className="space-y-2">
										<Label
											htmlFor="telephone"
											className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
											<Phone className="h-4 w-4 text-primary/70" />
											Telephone
										</Label>
										<Input
											id="telephone"
											name="telephone"
											value={formData.telephone}
											onChange={handleChange}
											className="h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
										/>
									</motion.div>

									<motion.div
										custom={5}
										variants={formItemVariants}
										initial="hidden"
										animate="visible"
										className="space-y-2">
										<Label
											htmlFor="position"
											className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
											<MapPin className="h-4 w-4 text-primary/70" />
											Position
										</Label>
										<Input
											id="position"
											name="position"
											value={formData.position}
											onChange={handleChange}
											className="h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
										/>
									</motion.div>

									<motion.div
										custom={6}
										variants={formItemVariants}
										initial="hidden"
										animate="visible"
										className="space-y-2 w-full">
										<Label
											htmlFor="timeZone"
											className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
											<Clock className="h-4 w-4 text-primary/70" />
											Time Zone
										</Label>

										<Select
											value={formData.timeZone}
											onValueChange={handleTimeZoneChange}>
											<SelectTrigger className="h-14 w-full rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white">
												<SelectValue placeholder="Select your time zone" />
											</SelectTrigger>
											<SelectContent className="bg-white max-h-60 dark:bg-slate-800 border-slate-200 dark:border-slate-700/50 text-slate-900 dark:text-white">
												{timeZones.map((tz) => (
													<SelectItem key={tz} value={tz.value}>
														{tz.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</motion.div>
								</div>
							</div>

							<motion.div
								custom={7}
								variants={formItemVariants}
								initial="hidden"
								animate="visible"
								className="flex mt-10 items-center justify-between bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 mb-6">
								<div className="flex flex-col">
									<Label
										htmlFor="socialProfile"
										className="text-sm font-medium text-slate-900 dark:text-white">
										Enable Social Profiles
									</Label>
									<p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
										Display your social media profiles on your account
									</p>
								</div>
								<Switch
									id="socialProfile"
									checked={formData.socialProfile}
									onCheckedChange={handleSwitchChange}
									className="data-[state=checked]:bg-primary"
								/>
							</motion.div>

							{formData.socialProfile && (
								<div className="grid md:grid-cols-2 gap-6">
									<motion.div
										custom={8}
										variants={formItemVariants}
										initial="hidden"
										animate="visible"
										className="space-y-2">
										<Label
											htmlFor="telegram"
											className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
											<MessageSquare className="h-4 w-4 text-[#0088cc]" />
											Telegram
										</Label>
										<div className="relative">
											<Input
												id="telegram"
												name="telegram"
												value={formData.telegram}
												onChange={handleChange}
												className="h-11 pl-10 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
											/>
											<div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
												@
											</div>
										</div>
									</motion.div>

									<motion.div
										custom={9}
										variants={formItemVariants}
										initial="hidden"
										animate="visible"
										className="space-y-2">
										<Label
											htmlFor="whatsapp"
											className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
											<Phone className="h-4 w-4 text-[#25D366]" />
											WhatsApp
										</Label>
										<div className="relative">
											<Input
												id="whatsapp"
												name="whatsapp"
												value={formData.whatsapp}
												onChange={handleChange}
												className="h-11 pl-10 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
											/>
											<div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
												+
											</div>
										</div>
									</motion.div>
								</div>
							)}

							<div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50">
								<motion.p
									custom={14}
									variants={formItemVariants}
									initial="hidden"
									animate="visible"
									className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
									<AlertCircle className="h-3 w-3 text-primary/70" />
									Required fields are marked with *
								</motion.p>

								<motion.div
									custom={15}
									variants={formItemVariants}
									initial="hidden"
									animate="visible"
									className="flex gap-3">
									<Button
										type="button"
										variant="outline"
										onClick={handleClose}
										className="border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white">
										Cancel
									</Button>
									<Button
										type="submit"
										className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
										disabled={isLoading}>
										{isLoading ? (
											<div className="flex items-center gap-2">
												<div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
												<span>Saving...</span>
											</div>
										) : (
											<div className="flex items-center gap-2">
												<span>Save Changes</span>
												<Save className="h-4 w-4" />
											</div>
										)}
									</Button>
								</motion.div>
							</div>
						</form>
					</motion.div>
				)}
			</motion.div>
		</AnimatePresence>
	);
}
