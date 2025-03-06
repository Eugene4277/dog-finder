"use client";

import { useDogFilters } from "../model/use-dog-filters";
import { useFavorites } from "../model/use-favorites";
import { useMatch } from "../model/use-match";

import DogsSearchLayout from "../ui/search-layout";
import { MainSection } from "../ui/main-section";

import { MatchButton } from "../ui/match-button";
import { ApplyFiltersButton } from "../ui/apply-filters-button";
import { ResetFiltersButton } from "../ui/reset-filters-button";

import { FavoritesSwitch } from "../ui/favorites-switch";
import { BreedFilter } from "../ui/breed-filter";
import { LocationFilter } from "../ui/location-filter";
import { AgeFilter } from "../ui/age-filter";
import { SortDropdown } from "../ui/sort-dropdown";
import { ResultsPerPageDropdown } from "../ui/results-per-page-dropdown";

import { PaginationSection } from "../ui/pagination";
import { MatchDialog } from "../ui/match-dialog";

export function DogSearchPage() {
	const { favorites, toggleFavorite } = useFavorites();
	const {
		dogs,
		breeds,
		pendingFilters,
		hasUnappliedChanges,
		openBreeds,
		openStates,
		activePage,
		totalPages,
		isPending,
		applyFilters,
		resetFilters,
		setPendingFilters,
		setOpenBreeds,
		removeBreed,
		setOpenStates,
		removeState,
		goToNextPage,
		goToPrevPage,
	} = useDogFilters(favorites);

	const {
		match,
		matchDialogOpen,
		isMatchPending,
		closeMatchDialog,
		generateMatch,
	} = useMatch(favorites);

	return (
		<>
			<DogsSearchLayout
				isLoading={isPending || isMatchPending}
				actions={
					<>
						<ResetFiltersButton action={resetFilters} />
						<ApplyFiltersButton
							action={applyFilters}
							isDisabled={!hasUnappliedChanges}
						/>
					</>
				}
				matchAction={
					<MatchButton
						isDisabled={!favorites.length}
						action={generateMatch}
					/>
				}
				mainSection={
					<MainSection
						dogs={dogs}
						favorites={favorites}
						toggleFavorite={toggleFavorite}
					/>
				}
				pagination={
					<PaginationSection
						goToNextPage={goToNextPage}
						goToPreviuosPage={goToPrevPage}
						activePage={activePage}
						totalPages={totalPages}
					/>
				}
				matchDialog={
					<MatchDialog
						isOpen={matchDialogOpen}
						onClose={() => closeMatchDialog()}
						matchedDog={match}
					/>
				}
			>
				<FavoritesSwitch
					pendingFilters={pendingFilters}
					setPendingFilters={setPendingFilters}
					favoritesCount={favorites.length}
				/>
				<BreedFilter
					breeds={breeds}
					isOpen={openBreeds}
					pendingFilters={pendingFilters}
					removeBreed={removeBreed}
					setOpenBreeds={setOpenBreeds}
					setPendingFilters={setPendingFilters}
				/>
				<AgeFilter
					pendingFilters={pendingFilters}
					setPendingFilters={setPendingFilters}
				/>
				<SortDropdown
					pendingFilters={pendingFilters}
					setPendingFilters={setPendingFilters}
				/>
				<LocationFilter
					isOpen={openStates}
					pendingFilters={pendingFilters}
					removeState={removeState}
					setOpenStates={setOpenStates}
					setPendingFilters={setPendingFilters}
				/>
				<ResultsPerPageDropdown
					pendingFilters={pendingFilters}
					setPendingFilters={setPendingFilters}
				/>
			</DogsSearchLayout>
		</>
	);
}
