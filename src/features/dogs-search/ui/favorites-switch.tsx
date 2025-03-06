import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { DogFilters } from "../domain";

export function FavoritesSwitch({
	pendingFilters,
	setPendingFilters,
	favoritesCount,
}: {
	pendingFilters: DogFilters;
	setPendingFilters: (filters: DogFilters) => void;
	favoritesCount: number;
}) {
	return (
		<div className='flex items-center justify-between space-x-2'>
			<div className='space-y-0.5'>
				<Label>Show Favorites Only</Label>
				<p className='text-xs text-muted-foreground'>
					{favoritesCount} dog{favoritesCount === 1 ? "" : "s"}{" "}
					favorited
				</p>
			</div>
			<Switch
				checked={pendingFilters.showFavorites}
				onCheckedChange={(checked) =>
					setPendingFilters({
						...pendingFilters,
						showFavorites: checked,
					})
				}
			/>
		</div>
	);
}
