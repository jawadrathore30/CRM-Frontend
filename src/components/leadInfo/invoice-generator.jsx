"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Printer, Download, Plus, Trash2, Mail, FileText } from "lucide-react";
import { format } from "date-fns";

export function InvoiceGenerator({
	customer,
	projectDetails,
	onSend,
	onClose,
}) {
	const [invoiceItems, setInvoiceItems] = useState([
		{ id: 1, description: "", quantity: 1, unitPrice: 0, amount: 0 },
	]);
	const [invoiceData, setInvoiceData] = useState({
		invoiceNumber: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
		issueDate: format(new Date(), "yyyy-MM-dd"),
		dueDate: format(
			new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
			"yyyy-MM-dd"
		),
		paymentTerms: "30",
		notes: "",
		taxRate: 0,
	});
	const [emailData, setEmailData] = useState({
		to: customer?.email || "",
		subject: `Invoice #${invoiceData.invoiceNumber} for your project`,
		message: `Dear ${
			customer?.firstName || "Customer"
		},\n\nPlease find attached your invoice #${
			invoiceData.invoiceNumber
		} for your recent project.\n\nPayment is due by ${format(
			new Date(invoiceData.dueDate),
			"MMMM dd, yyyy"
		)}.\n\nThank you for your business.\n\nBest regards,\nYour Company`,
	});
	const [activeTab, setActiveTab] = useState("create");

	// Calculate subtotal
	const subtotal = invoiceItems.reduce(
		(sum, item) => sum + item.quantity * item.unitPrice,
		0
	);

	// Calculate tax
	const taxAmount = subtotal * (invoiceData.taxRate / 100);

	// Calculate total
	const total = subtotal + taxAmount;

	// Handle adding a new line item
	const handleAddItem = () => {
		setInvoiceItems([
			...invoiceItems,
			{
				id: invoiceItems.length + 1,
				description: "",
				quantity: 1,
				unitPrice: 0,
				amount: 0,
			},
		]);
	};

	// Handle removing a line item
	const handleRemoveItem = (id) => {
		if (invoiceItems.length > 1) {
			setInvoiceItems(invoiceItems.filter((item) => item.id !== id));
		}
	};

	// Handle updating a line item
	const handleItemChange = (id, field, value) => {
		setInvoiceItems(
			invoiceItems.map((item) => {
				if (item.id === id) {
					const updatedItem = { ...item, [field]: value };

					// Recalculate amount if quantity or unitPrice changes
					if (field === "quantity" || field === "unitPrice") {
						updatedItem.amount = updatedItem.quantity * updatedItem.unitPrice;
					}

					return updatedItem;
				}
				return item;
			})
		);
	};

	// Handle invoice data changes
	const handleInvoiceDataChange = (field, value) => {
		setInvoiceData({ ...invoiceData, [field]: value });
	};

	// Handle email data changes
	const handleEmailDataChange = (field, value) => {
		setEmailData({ ...emailData, [field]: value });
	};

	// Handle sending the invoice
	const handleSendInvoice = () => {
		const invoicePayload = {
			customer,
			invoiceData,
			invoiceItems,
			subtotal,
			taxAmount,
			total,
			emailData,
		};

		onSend(invoicePayload);
	};

	return (
		<div className="flex flex-col h-full">
			{/* Tabs */}
			<div className="flex border-b border-gray-200 dark:border-slate-700 mb-4">
				<button
					className={`px-4 py-2 font-medium text-sm ${
						activeTab === "create"
							? "border-b-2 border-primary text-primary dark:text-primary"
							: "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300"
					}`}
					onClick={() => setActiveTab("create")}>
					<FileText className="w-4 h-4 inline mr-2" />
					Create Invoice
				</button>
				<button
					className={`px-4 py-2 font-medium text-sm ${
						activeTab === "send"
							? "border-b-2 border-primary text-primary dark:text-primary"
							: "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300"
					}`}
					onClick={() => setActiveTab("send")}>
					<Mail className="w-4 h-4 inline mr-2" />
					Send Invoice
				</button>
			</div>

			{activeTab === "create" ? (
				<div className="flex-1 overflow-y-auto">
					<div className="space-y-6">
						{/* Invoice Header */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<Label htmlFor="invoiceNumber">Invoice Number</Label>
								<Input
									id="invoiceNumber"
									value={invoiceData.invoiceNumber}
									onChange={(e) =>
										handleInvoiceDataChange("invoiceNumber", e.target.value)
									}
									className="mt-1"
								/>
							</div>
							<div>
								<Label htmlFor="issueDate">Issue Date</Label>
								<Input
									id="issueDate"
									type="date"
									value={invoiceData.issueDate}
									onChange={(e) =>
										handleInvoiceDataChange("issueDate", e.target.value)
									}
									className="mt-1"
								/>
							</div>
							<div>
								<Label htmlFor="dueDate">Due Date</Label>
								<Input
									id="dueDate"
									type="date"
									value={invoiceData.dueDate}
									onChange={(e) =>
										handleInvoiceDataChange("dueDate", e.target.value)
									}
									className="mt-1"
								/>
							</div>
							<div>
								<Label htmlFor="paymentTerms">Payment Terms</Label>
								<Select
									value={invoiceData.paymentTerms}
									onValueChange={(value) =>
										handleInvoiceDataChange("paymentTerms", value)
									}>
									<SelectTrigger id="paymentTerms" className="mt-1">
										<SelectValue placeholder="Select payment terms" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="0">Due on Receipt</SelectItem>
										<SelectItem value="7">Net 7 Days</SelectItem>
										<SelectItem value="15">Net 15 Days</SelectItem>
										<SelectItem value="30">Net 30 Days</SelectItem>
										<SelectItem value="60">Net 60 Days</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						{/* Customer Information */}
						<div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg">
							<h3 className="font-medium text-gray-900 dark:text-white mb-2">
								Customer Information
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
								<div>
									<p className="text-gray-500 dark:text-slate-400">Name:</p>
									<p className="font-medium text-gray-900 dark:text-white">
										{customer?.firstName} {customer?.lastName}
									</p>
								</div>
								<div>
									<p className="text-gray-500 dark:text-slate-400">Email:</p>
									<p className="font-medium text-gray-900 dark:text-white">
										{customer?.email}
									</p>
								</div>
								<div>
									<p className="text-gray-500 dark:text-slate-400">Phone:</p>
									<p className="font-medium text-gray-900 dark:text-white">
										{customer?.telephone}
									</p>
								</div>
								<div>
									<p className="text-gray-500 dark:text-slate-400">Address:</p>
									<p className="font-medium text-gray-900 dark:text-white">
										{customer?.street}, {customer?.city}, {customer?.state}{" "}
										{customer?.zipCode}
									</p>
								</div>
							</div>
						</div>

						{/* Invoice Items */}
						<div>
							<div className="flex justify-between items-center mb-2">
								<h3 className="font-medium text-gray-900 dark:text-white">
									Invoice Items
								</h3>
								<Button
									variant="outline"
									size="sm"
									onClick={handleAddItem}
									className="h-8">
									<Plus className="h-4 w-4 mr-1" /> Add Item
								</Button>
							</div>

							<div className="border rounded-lg overflow-hidden border-gray-200 dark:border-slate-700">
								<Table>
									<TableHeader>
										<TableRow className="bg-gray-50 dark:bg-slate-800">
											<TableHead className="w-[50%]">Description</TableHead>
											<TableHead className="text-right">Quantity</TableHead>
											<TableHead className="text-right">Unit Price</TableHead>
											<TableHead className="text-right">Amount</TableHead>
											<TableHead className="w-[50px]"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{invoiceItems.map((item) => (
											<TableRow key={item.id}>
												<TableCell>
													<Input
														value={item.description}
														onChange={(e) =>
															handleItemChange(
																item.id,
																"description",
																e.target.value
															)
														}
														placeholder="Item description"
													/>
												</TableCell>
												<TableCell className="text-right">
													<Input
														type="number"
														min="1"
														value={item.quantity}
														onChange={(e) =>
															handleItemChange(
																item.id,
																"quantity",
																Number.parseInt(e.target.value) || 0
															)
														}
														className="w-20 ml-auto"
													/>
												</TableCell>
												<TableCell className="text-right">
													<div className="flex items-center justify-end">
														<span className="mr-1">$</span>
														<Input
															type="number"
															min="0"
															step="0.01"
															value={item.unitPrice}
															onChange={(e) =>
																handleItemChange(
																	item.id,
																	"unitPrice",
																	Number.parseFloat(e.target.value) || 0
																)
															}
															className="w-24"
														/>
													</div>
												</TableCell>
												<TableCell className="text-right font-medium">
													${(item.quantity * item.unitPrice).toFixed(2)}
												</TableCell>
												<TableCell>
													<Button
														variant="ghost"
														size="icon"
														onClick={() => handleRemoveItem(item.id)}
														disabled={invoiceItems.length === 1}
														className="h-8 w-8 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
														<Trash2 className="h-4 w-4" />
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</div>

						{/* Invoice Summary */}
						<div className="flex justify-end">
							<div className="w-full md:w-72 space-y-2">
								<div className="flex justify-between py-1">
									<span className="text-gray-600 dark:text-slate-400">
										Subtotal:
									</span>
									<span className="font-medium text-gray-900 dark:text-white">
										${subtotal.toFixed(2)}
									</span>
								</div>

								<div className="flex items-center justify-between py-1">
									<div className="flex items-center">
										<span className="text-gray-600 dark:text-slate-400 mr-2">
											Tax Rate:
										</span>
										<Input
											type="number"
											min="0"
											max="100"
											value={invoiceData.taxRate}
											onChange={(e) =>
												handleInvoiceDataChange(
													"taxRate",
													Number.parseFloat(e.target.value) || 0
												)
											}
											className="w-16 h-8 text-right"
										/>
										<span className="ml-1 text-gray-600 dark:text-slate-400">
											%
										</span>
									</div>
									<span className="font-medium text-gray-900 dark:text-white">
										${taxAmount.toFixed(2)}
									</span>
								</div>

								<div className="flex justify-between py-2 border-t border-gray-200 dark:border-slate-700">
									<span className="font-semibold text-gray-900 dark:text-white">
										Total:
									</span>
									<span className="font-semibold text-gray-900 dark:text-white">
										${total.toFixed(2)}
									</span>
								</div>
							</div>
						</div>

						{/* Notes */}
						<div>
							<Label htmlFor="notes">Notes</Label>
							<Textarea
								id="notes"
								value={invoiceData.notes}
								onChange={(e) =>
									handleInvoiceDataChange("notes", e.target.value)
								}
								placeholder="Add any additional notes or payment instructions..."
								className="mt-1 h-24"
							/>
						</div>
					</div>
				</div>
			) : (
				<div className="flex-1 overflow-y-auto">
					<div className="space-y-6">
						{/* Email Form */}
						<div className="space-y-4">
							<div>
								<Label htmlFor="emailTo">To</Label>
								<Input
									id="emailTo"
									value={emailData.to}
									onChange={(e) => handleEmailDataChange("to", e.target.value)}
									className="mt-1"
								/>
							</div>
							<div>
								<Label htmlFor="emailSubject">Subject</Label>
								<Input
									id="emailSubject"
									value={emailData.subject}
									onChange={(e) =>
										handleEmailDataChange("subject", e.target.value)
									}
									className="mt-1"
								/>
							</div>
							<div>
								<Label htmlFor="emailMessage">Message</Label>
								<Textarea
									id="emailMessage"
									value={emailData.message}
									onChange={(e) =>
										handleEmailDataChange("message", e.target.value)
									}
									className="mt-1 h-40"
								/>
							</div>
						</div>

						{/* Invoice Preview */}
						<div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4">
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-medium text-gray-900 dark:text-white">
									Invoice Preview
								</h3>
								<div className="flex gap-2">
									<Button variant="outline" size="sm" className="h-8">
										<Printer className="h-4 w-4 mr-1" /> Print
									</Button>
									<Button variant="outline" size="sm" className="h-8">
										<Download className="h-4 w-4 mr-1" /> Download
									</Button>
								</div>
							</div>

							<div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4 max-h-96 overflow-y-auto">
								<div className="flex justify-between items-start mb-6">
									<div>
										<h2 className="text-xl font-bold text-gray-900 dark:text-white">
											INVOICE
										</h2>
										<p className="text-gray-500 dark:text-slate-400 text-sm">
											# {invoiceData.invoiceNumber}
										</p>
									</div>
									<div className="text-right">
										<p className="text-sm text-gray-500 dark:text-slate-400">
											Issue Date:{" "}
											{format(new Date(invoiceData.issueDate), "MMMM dd, yyyy")}
										</p>
										<p className="text-sm text-gray-500 dark:text-slate-400">
											Due Date:{" "}
											{format(new Date(invoiceData.dueDate), "MMMM dd, yyyy")}
										</p>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-6 mb-6">
									<div>
										<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
											From
										</h3>
										<p className="text-sm text-gray-500 dark:text-slate-400">
											Your Company Name
										</p>
										<p className="text-sm text-gray-500 dark:text-slate-400">
											123 Business Street
										</p>
										<p className="text-sm text-gray-500 dark:text-slate-400">
											City, State 12345
										</p>
									</div>
									<div>
										<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
											Bill To
										</h3>
										<p className="text-sm text-gray-500 dark:text-slate-400">
											{customer?.firstName} {customer?.lastName}
										</p>
										<p className="text-sm text-gray-500 dark:text-slate-400">
											{customer?.street}
										</p>
										<p className="text-sm text-gray-500 dark:text-slate-400">
											{customer?.city}, {customer?.state} {customer?.zipCode}
										</p>
									</div>
								</div>

								<table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 mb-6">
									<thead>
										<tr>
											<th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
												Description
											</th>
											<th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
												Qty
											</th>
											<th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
												Unit Price
											</th>
											<th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
												Amount
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200 dark:divide-slate-700">
										{invoiceItems.map((item) => (
											<tr key={item.id}>
												<td className="px-3 py-2 text-sm text-gray-900 dark:text-white">
													{item.description || "Item description"}
												</td>
												<td className="px-3 py-2 text-sm text-gray-900 dark:text-white text-right">
													{item.quantity}
												</td>
												<td className="px-3 py-2 text-sm text-gray-900 dark:text-white text-right">
													${item.unitPrice.toFixed(2)}
												</td>
												<td className="px-3 py-2 text-sm text-gray-900 dark:text-white text-right">
													${(item.quantity * item.unitPrice).toFixed(2)}
												</td>
											</tr>
										))}
									</tbody>
								</table>

								<div className="flex justify-end mb-6">
									<div className="w-64">
										<div className="flex justify-between py-1 text-sm">
											<span className="text-gray-500 dark:text-slate-400">
												Subtotal:
											</span>
											<span className="text-gray-900 dark:text-white">
												${subtotal.toFixed(2)}
											</span>
										</div>
										<div className="flex justify-between py-1 text-sm">
											<span className="text-gray-500 dark:text-slate-400">
												Tax ({invoiceData.taxRate}%):
											</span>
											<span className="text-gray-900 dark:text-white">
												${taxAmount.toFixed(2)}
											</span>
										</div>
										<div className="flex justify-between py-1 text-sm font-medium border-t border-gray-200 dark:border-slate-700 mt-1 pt-1">
											<span className="text-gray-900 dark:text-white">
												Total:
											</span>
											<span className="text-gray-900 dark:text-white">
												${total.toFixed(2)}
											</span>
										</div>
									</div>
								</div>

								{invoiceData.notes && (
									<div className="border-t border-gray-200 dark:border-slate-700 pt-4">
										<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
											Notes
										</h3>
										<p className="text-sm text-gray-500 dark:text-slate-400 whitespace-pre-line">
											{invoiceData.notes}
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Footer Actions */}
			<div className="flex justify-between pt-4 mt-4 border-t border-gray-200 dark:border-slate-700">
				<Button variant="outline" onClick={onClose}>
					Cancel
				</Button>

				{activeTab === "create" ? (
					<Button onClick={() => setActiveTab("send")}>
						Continue to Send <Mail className="ml-2 h-4 w-4" />
					</Button>
				) : (
					<Button onClick={handleSendInvoice}>
						Send Invoice <Mail className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
		</div>
	);
}
