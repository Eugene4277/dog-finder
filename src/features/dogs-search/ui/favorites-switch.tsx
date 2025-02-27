import { Filters } from "../model/use-filters";
import { Switch } from "@/shared/ui/switch";

export function FavoritesSwitch({
	pendingFilters,
	setPendingFilters,
	favoritesCount,
}: {
	pendingFilters: Filters;
	setPendingFilters: (filters: Filters) => void;
	favoritesCount: number;
}) {
	return (
		<div className='flex items-center justify-between space-x-2'>
			<div className='space-y-0.5'>
				<label className='text-sm font-medium'>
					Show Favorites Only
				</label>
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
