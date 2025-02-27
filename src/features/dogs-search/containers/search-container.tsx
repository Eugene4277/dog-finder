"use client";

import { AppLoader } from "@/shared/ui/app-loader";

import { useFilters } from "../model/use-filters";
import { useFavorites } from "../model/use-favorites";
import { useMatch } from "../model/use-match";

import DogsSearchLayout from "../ui/search-layout";
import { MainSection } from "../ui/main-section";

import { MatchButton } from "../ui/match-button";
import { ApplyFiltersButton } from "../ui/apply-filters-button";
import { ResetFiltersButton } from "../ui/reset-filters-button";

import { FavoritesSwitch } from "../ui/favorites-switch";
import { BreedFilter } from "../ui/breed-filter";
import { ZipFilter } from "../ui/zip-filter";
import { AgeFilter } from "../ui/age-filter";
import { SortDropdown } from "../ui/sort-dropdown";
import { ResultsPerPageDropdown } from "../ui/results-per-page-dropdown";

import { PaginationSection } from "../ui/pagination";
import { MatchDialog } from "../ui/match-dialog";

export function DogSearchPage() {
	const { favorites, toggleFavorite, filterFavoriteDogs } = useFavorites();
	const {
		dogs,
		breeds,
		pendingFilters,
		hasUnappliedChanges,
		openBreeds,
		openZipCodes,
		activePage,
		totalPages,
		isPending,
		applyFilters,
		resetFilters,
		setPendingFilters,
		setOpenBreeds,
		removeBreed,
		setOpenZipCodes,
		removeZipCode,
		goToNextPage,
		goToPrevPage,
	} = useFilters(favorites, filterFavoriteDogs);

	const {
		match,
		matchDialogOpen,
		isMatchPending,
		setMatchDialogOpen,
		generateMatch,
	} = useMatch(favorites);

	return (
		<>
			<DogsSearchLayout
				isLoading={isPending || isMatchPending}
				favoritesSwitch={
					<FavoritesSwitch
						pendingFilters={pendingFilters}
						setPendingFilters={setPendingFilters}
						favoritesCount={favorites.length}
					/>
				}
				breedFilter={
					<BreedFilter
						breeds={breeds}
						isOpen={openBreeds}
						pendingFilters={pendingFilters}
						removeBreed={removeBreed}
						setOpenBreeds={setOpenBreeds}
						setPendingFilters={setPendingFilters}
					/>
				}
				zipFilter={
					<ZipFilter
						isOpen={openZipCodes}
						pendingFilters={pendingFilters}
						removeZipCode={removeZipCode}
						setOpenZipCodes={setOpenZipCodes}
						setPendingFilters={setPendingFilters}
					/>
				}
				ageFilter={
					<AgeFilter
						pendingFilters={pendingFilters}
						setPendingFilters={setPendingFilters}
					/>
				}
				sortDropdown={
					<SortDropdown
						pendingFilters={pendingFilters}
						setPendingFilters={setPendingFilters}
					/>
				}
				resultsPerPageDropdown={
					<ResultsPerPageDropdown
						pendingFilters={pendingFilters}
						setPendingFilters={setPendingFilters}
					/>
				}
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
						onClose={() => setMatchDialogOpen(false)}
						matchedDog={match}
					/>
				}
			/>
		</>
	);
}
