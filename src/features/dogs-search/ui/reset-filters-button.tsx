import { Button } from "@/shared/ui/button";

export function ResetFiltersButton({ action }: { action: () => void }) {
	return (
		<Button onClick={action} variant='outline' className='w-full'>
			Reset Filters
		</Button>
	);
}
