import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, FileQuestion } from "lucide-react";

import { Button } from "../components/ui/button";

export default function NotFound() {
	return (
		<div className="min-h-screen mx-auto bg-background text-foreground light-pattern dark:dark-pattern">
			<motion.main
				className="container max-w-4xl mx-auto px-4"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
				<div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="relative mb-8">
						<div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-400/30 to-slate-500/10 dark:from-slate-300/30 dark:to-slate-400/10 blur-xl opacity-70"></div>
						<div className="relative w-32 h-32 rounded-full bg-slate-200/30 dark:bg-slate-700/30 flex items-center justify-center">
							<FileQuestion className="h-16 w-16 text-slate-600 dark:text-slate-300" />
						</div>
					</motion.div>

					<motion.h1
						className="text-4xl md:text-6xl font-bold pb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500 dark:from-slate-200 dark:via-slate-300 dark:to-slate-400"
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.5 }}>
						Page Not Found
					</motion.h1>

					<motion.p
						className="text-lg text-muted-foreground mb-8 max-w-lg"
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.4, duration: 0.5 }}>
						The page you're looking for doesn't exist or has been moved.
					</motion.p>

					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.5 }}>
						<Button asChild size="lg" className="rounded-full px-6">
							<Link to="/" className="flex items-center gap-2">
								<ArrowLeft className="h-4 w-4" />
								Back to Home
							</Link>
						</Button>
					</motion.div>
				</div>
			</motion.main>
		</div>
	);
}
