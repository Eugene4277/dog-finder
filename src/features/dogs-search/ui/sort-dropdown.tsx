import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/ui/select";
import { Filters } from "../model/use-filters";

type SortOption = {
	value: `${"breed" | "name" | "age"}:${"asc" | "desc"}`;
	label: string;
};

const sortOptions: SortOption[] = [
	{ value: "breed:asc", label: "Breed (A-Z)" },
	{ value: "breed:desc", label: "Breed (Z-A)" },
	{ value: "name:asc", label: "Name (A-Z)" },
	{ value: "name:desc", label: "Name (Z-A)" },
	{ value: "age:asc", label: "Age (Youngest)" },
	{ value: "age:desc", label: "Age (Oldest)" },
];

export function SortDropdown({
	pendingFilters,
	setPendingFilters,
}: {
	pendingFilters: Filters;
	setPendingFilters: (filters: Filters) => void;
}) {
	return (
		<div className='space-y-2'>
			<label className='text-sm font-medium'>Sort By</label>
			<Select
				onValueChange={(value) =>
					setPendingFilters({
						...pendingFilters,
						sort: value as SortOption["value"],
					})
				}
				value={pendingFilters.sort}
			>
				<SelectTrigger>
					<SelectValue placeholder='Sort by...' />
				</SelectTrigger>
				<SelectContent>
					{sortOptions.map(({ value, label }) => (
						<SelectItem key={value} value={value}>
							{label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
