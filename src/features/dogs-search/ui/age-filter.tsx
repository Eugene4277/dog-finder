import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { DogFilters } from "../domain";

export function AgeFilter({
	pendingFilters,
	setPendingFilters,
}: {
	pendingFilters: DogFilters;
	setPendingFilters: (filters: DogFilters) => void;
}) {
	return (
		<div className='space-y-2'>
			<Label>Age Range</Label>
			<div className='grid grid-cols-2 gap-2'>
				<Input
					type='number'
					placeholder='Min age'
					min={0}
					value={pendingFilters.ageMin || ""}
					onChange={(e) =>
						setPendingFilters({
							...pendingFilters,
							ageMin: e.target.value
								? Number(e.target.value)
								: undefined,
						})
					}
				/>
				<Input
					type='number'
					placeholder='Max age'
					min={0}
					value={pendingFilters.ageMax || ""}
					onChange={(e) =>
						setPendingFilters({
							...pendingFilters,
							ageMax: e.target.value
								? Number(e.target.value)
								: undefined,
						})
					}
				/>
			</div>
		</div>
	);
}
