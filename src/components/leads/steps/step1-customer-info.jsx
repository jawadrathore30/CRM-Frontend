"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorHighlight } from "@/components/ui/form-error";
import { User, Mail, Phone, MapPin, Search } from "lucide-react";

export default function Step1CustomerInfo({
	formData,
	errors,
	handleChange,
	countries,
}) {
	const [countrySearchQuery, setCountrySearchQuery] = useState("");
	const [filteredCountries, setFilteredCountries] = useState(countries);
	const [showCountryDropdown, setShowCountryDropdown] = useState(false);

	const countryInputRef = useRef(null);
	const countryDropdownRef = useRef(null);

	// Filter countries based on search query
	useEffect(() => {
		if (countrySearchQuery.trim() === "") {
			setFilteredCountries(countries);
		} else {
			setFilteredCountries(
				countries.filter((country) =>
					country.toLowerCase().includes(countrySearchQuery.toLowerCase())
				)
			);
		}
	}, [countrySearchQuery, countries]);

	// Handle click outside to close country dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				countryDropdownRef.current &&
				!countryDropdownRef.current.contains(event.target) &&
				countryInputRef.current &&
				!countryInputRef.current.contains(event.target)
			) {
				setShowCountryDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Select country
	const handleSelectCountry = (country) => {
		const event = {
			target: {
				name: "country",
				value: country,
			},
		};
		handleChange(event);
		setCountrySearchQuery("");
		setShowCountryDropdown(false);
	};

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

	return (
		<div className="grid md:grid-cols-2 gap-6">
			<motion.div
				custom={0}
				variants={formItemVariants}
				initial="hidden"
				animate="visible"
				className="space-y-2 md:col-span-2">
				<h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
					Customer Information
				</h3>
				<p className="text-sm text-slate-500 dark:text-slate-400">
					Enter the customer's contact information. Required fields are marked
					with an asterisk (*).
				</p>
			</motion.div>

			{/* First Name */}
			<motion.div
				custom={1}
				variants={formItemVariants}
				initial="hidden"
				animate="visible"
				className="space-y-2">
				<Label
					htmlFor="firstName"
					className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
					<User className="h-4 w-4 text-primary/70" />
					First Name
				</Label>
				<ErrorHighlight
					isError={!!errors.firstName}
					errorMessage={errors.firstName}>
					<Input
						id="firstName"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						placeholder="First name"
						maxLength={50}
						className="h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
					/>
				</ErrorHighlight>
			</motion.div>

			{/* Last Name */}
			<motion.div
				custom={2}
				variants={formItemVariants}
				initial="hidden"
				animate="visible"
				className="space-y-2">
				<Label
					htmlFor="lastName"
					className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
					<User className="h-4 w-4 text-primary/70" />
					Last Name
				</Label>
				<ErrorHighlight
					isError={!!errors.lastName}
					errorMessage={errors.lastName}>
					<Input
						id="lastName"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						placeholder="Last name"
						maxLength={50}
						className="h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
					/>
				</ErrorHighlight>
			</motion.div>

			{/* Email */}
			<motion.div
				custom={3}
				variants={formItemVariants}
				initial="hidden"
				animate="visible"
				className="space-y-2">
				<Label
					htmlFor="email"
					className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
					<Mail className="h-4 w-4 text-primary/70" />
					Email*
				</Label>
				<ErrorHighlight isError={!!errors.email} errorMessage={errors.email}>
					<Input
						id="email"
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="email@example.com"
						required
						className="h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
					/>
				</ErrorHighlight>
			</motion.div>

			{/* Phone Number - No validation restrictions */}
			<motion.div
				custom={4}
				variants={formItemVariants}
				initial="hidden"
				animate="visible"
				className="space-y-2">
				<Label
					htmlFor="telephone"
					className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
					<Phone className="h-4 w-4 text-primary/70" />
					Phone Number*
				</Label>
				<ErrorHighlight
					isError={!!errors.telephone}
					errorMessage={errors.telephone}>
					<Input
						id="telephone"
						name="telephone"
						type="tel"
						value={formData.telephone}
						onChange={handleChange}
						placeholder="+1 (555) 123-4567"
						required
						className="h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
					/>
				</ErrorHighlight>
			</motion.div>

			{/* Address Section Header */}
			<motion.div
				custom={5}
				variants={formItemVariants}
				initial="hidden"
				animate="visible"
				className="md:col-span-2 mt-2">
				<div className="flex items-center gap-2 mb-4">
					<MapPin className="h-4 w-4 text-primary/70" />
					<h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
						Address
					</h3>
				</div>
			</motion.div>

			{/* Always Visible Address Fields */}
			<motion.div
				custom={6}
				variants={formItemVariants}
				initial="hidden"
				animate="visible"
				className="md:col-span-2 grid md:grid-cols-2 gap-4">
				{/* Street */}
				<div className="space-y-2 md:col-span-2">
					<Label
						htmlFor="street"
						className="text-sm font-medium text-slate-700 dark:text-slate-300">
						Street*
					</Label>
					<ErrorHighlight
						isError={!!errors.street}
						errorMessage={errors.street}>
						<Input
							id="street"
							name="street"
							value={formData.street}
							onChange={handleChange}
							placeholder="123 Main St"
							required
							className="h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
						/>
					</ErrorHighlight>
				</div>

				{/* City */}
				<div className="space-y-2">
					<Label
						htmlFor="city"
						className="text-sm font-medium text-slate-700 dark:text-slate-300">
						City*
					</Label>
					<ErrorHighlight isError={!!errors.city} errorMessage={errors.city}>
						<Input
							id="city"
							name="city"
							value={formData.city}
							onChange={handleChange}
							placeholder="New York"
							required
							className="h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
						/>
					</ErrorHighlight>
				</div>

				{/* State */}
				<div className="space-y-2">
					<Label
						htmlFor="state"
						className="text-sm font-medium text-slate-700 dark:text-slate-300">
						State / Prov.*
					</Label>
					<ErrorHighlight isError={!!errors.state} errorMessage={errors.state}>
						<Input
							id="state"
							name="state"
							value={formData.state}
							onChange={handleChange}
							placeholder="NY"
							required
							className="h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
						/>
					</ErrorHighlight>
				</div>

				{/* ZIP Code */}
				<div className="space-y-2">
					<Label
						htmlFor="zipCode"
						className="text-sm font-medium text-slate-700 dark:text-slate-300">
						ZIP / Postal*
					</Label>
					<ErrorHighlight
						isError={!!errors.zipCode}
						errorMessage={errors.zipCode}>
						<Input
							id="zipCode"
							name="zipCode"
							value={formData.zipCode}
							onChange={handleChange}
							placeholder="10001"
							required
							className="h-11 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
						/>
					</ErrorHighlight>
				</div>

				{/* Country - Searchable Dropdown (Above Input) */}
				<div className="space-y-2">
					<Label
						htmlFor="country"
						className="text-sm font-medium text-slate-700 dark:text-slate-300">
						Country*
					</Label>
					<ErrorHighlight
						isError={!!errors.country}
						errorMessage={errors.country}>
						<div className="relative">
							{/* Country Dropdown (Above Input) */}
							{showCountryDropdown && (
								<div
									ref={countryDropdownRef}
									className="absolute z-10 bottom-full mb-1 w-full bg-white dark:bg-slate-800 rounded-md shadow-lg border border-slate-200 dark:border-slate-700 max-h-54 overflow-auto"
									style={{ maxHeight: "200px" }}>
									{filteredCountries.length === 0 ? (
										<div className="p-2 text-sm text-slate-500 dark:text-slate-400 text-center">
											No countries found
										</div>
									) : (
										<ul className="py-1">
											{filteredCountries.map((country) => (
												<li key={country}>
													<button
														type="button"
														className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
														onClick={() => handleSelectCountry(country)}>
														{country}
													</button>
												</li>
											))}
										</ul>
									)}
								</div>
							)}

							{/* Search Input */}
							<div className="relative">
								<Search className="absolute left-2.5 top-3 h-4 w-4 text-slate-400" />
								<Input
									id="country"
									ref={countryInputRef}
									value={countrySearchQuery || formData.country}
									onChange={(e) => {
										setCountrySearchQuery(e.target.value);
										// Don't update the formData country value while searching
										// The actual country value will only be updated when a country is selected
									}}
									onFocus={() => setShowCountryDropdown(true)}
									onBlur={() => {
										// When input loses focus, reset the search query and show the selected country
										setTimeout(() => {
											setCountrySearchQuery("");
											setShowCountryDropdown(false);
										}, 200);
									}}
									placeholder="Search country..."
									className="h-11 pl-9 rounded-lg border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 focus:ring-primary text-slate-900 dark:text-white"
								/>
							</div>
						</div>
					</ErrorHighlight>
				</div>
			</motion.div>
		</div>
	);
}
