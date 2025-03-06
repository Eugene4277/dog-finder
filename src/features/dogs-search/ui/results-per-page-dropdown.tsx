import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";
import { DogFilters } from "../domain";

export function ResultsPerPageDropdown({
	pendingFilters,
	setPendingFilters,
}: {
	pendingFilters: DogFilters;
	setPendingFilters: (filters: DogFilters) => void;
}) {
	return (
		<div className='space-y-2'>
			<Label>Results per page</Label>
			<Select
				onValueChange={(value) =>
					setPendingFilters({
						...pendingFilters,
						size: Number(value),
					})
				}
				value={pendingFilters.size.toString()}
			>
				<SelectTrigger>
					<SelectValue placeholder='Results per page' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='25'>25</SelectItem>
					<SelectItem value='50'>50</SelectItem>
					<SelectItem value='100'>100</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
