import { Button } from "@/shared/ui/button";
import { Filter } from "lucide-react";

export function ApplyFiltersButton({
	action,
	isDisabled,
}: {
	action: () => void;
	isDisabled: boolean;
}) {
	return (
		<Button onClick={action} className='w-full' disabled={isDisabled}>
			<Filter className='mr-2 h-4 w-4' />
			Apply Filters
		</Button>
	);
}
