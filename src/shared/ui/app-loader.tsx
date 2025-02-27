import React from "react"; // Import your Loader component
import { Spinner } from "@/shared/ui/spinner";
import { cn } from "@/shared/lib/css";

interface IOverlayProps {
	className?: string; // Optional additional styles
}

const AppLoader = ({ className }: IOverlayProps) => {
	return (
		<div
			className={cn(
				"fixed inset-0 z-50 flex items-center justify-center bg-black/25",
				className
			)}
		>
			<Spinner size={48} />
		</div>
	);
};

export { AppLoader };
