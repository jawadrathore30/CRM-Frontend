"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const AvatarGroup = React.forwardRef(
	({ className, children, max = 3, ...props }, ref) => {
		const childrenArray = React.Children.toArray(children);
		const maxAvatars = max > 0 ? max : 3;
		const displayAvatars = childrenArray.slice(0, maxAvatars);
		const remainingAvatars = childrenArray.length - maxAvatars;

		return (
			<div ref={ref} className={cn("flex -space-x-2", className)} {...props}>
				{displayAvatars}
				{remainingAvatars > 0 && (
					<div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-100 dark:border-slate-800 dark:bg-slate-700">
						<span className="text-xs font-medium text-slate-600 dark:text-slate-300">
							+{remainingAvatars}
						</span>
					</div>
				)}
			</div>
		);
	}
);

AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
