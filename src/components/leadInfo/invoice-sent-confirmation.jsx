"use client";

import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InvoiceSentConfirmation({ customer, invoiceData, onClose }) {
	return (
		<div className="flex flex-col items-center justify-center py-8 text-center">
			<div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
				<CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
			</div>

			<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
				Invoice Sent Successfully
			</h2>

			<p className="text-gray-500 dark:text-slate-400 mb-6 max-w-md">
				Invoice #{invoiceData.invoiceNumber} has been sent to{" "}
				{customer.firstName} {customer.lastName} at {customer.email}.
			</p>

			<div className="w-full max-w-md bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4 mb-6">
				<div className="flex justify-between text-sm mb-2">
					<span className="text-gray-500 dark:text-slate-400">
						Invoice Number:
					</span>
					<span className="font-medium text-gray-900 dark:text-white">
						{invoiceData.invoiceNumber}
					</span>
				</div>
				<div className="flex justify-between text-sm mb-2">
					<span className="text-gray-500 dark:text-slate-400">Amount:</span>
					<span className="font-medium text-gray-900 dark:text-white">
						${invoiceData.total.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-gray-500 dark:text-slate-400">Due Date:</span>
					<span className="font-medium text-gray-900 dark:text-white">
						{invoiceData.dueDate}
					</span>
				</div>
			</div>

			<div className="flex gap-4">
				<Button variant="outline" onClick={onClose}>
					Close
				</Button>
				<Button onClick={onClose}>
					View Invoices <ArrowRight className="ml-2 h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
