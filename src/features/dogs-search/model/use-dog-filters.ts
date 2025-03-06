import { useEffect, useState } from "react";
import { dogsAPI } from "@/kernel/api-client";
import { usePagination } from "./use-pagination";
import { fetchDogs } from "../actions/fetch-dogs";
import { useRequestTransition } from "@/shared/lib/hooks/use-request-transition";
import { DogDomain } from "@/entities/dog";
import { DogFilters } from "../domain";

const initalFilters: DogFilters = {
	breeds: [],
	zipCodes: [],
	size: 25,
	sort: "breed:asc",
	showFavorites: false,
	city: "",
	states: [],
};

export function useDogFilters(favorites: DogDomain.Dog[]) {
	const [dogs, setDogs] = useState<DogDomain.Dog[]>([]);
	const [breeds, setBreeds] = useState<string[]>([]);

	const [appliedFilters, setAppliedFilters] =
		useState<DogFilters>(initalFilters);

	const [pendingFilters, setPendingFilters] =
		useState<DogFilters>(appliedFilters);

	const hasUnappliedChanges =
		JSON.stringify(pendingFilters) !== JSON.stringify(appliedFilters);

	const [openBreeds, setOpenBreeds] = useState(false);
	const [openStates, setOpenStates] = useState(false);

	const [isFiltersPending, executeSafeTransition] = useRequestTransition();

	const {
		setPaginationData,
		activePage,
		setActivePage,
		totalPages,
		goToNextPage,
		goToPrevPage,
		isPagintaionPending,
	} = usePagination(pendingFilters, favorites, setDogs);

	const fetchDogBreeds = async () => {
		const fetchedBreeds = await dogsAPI.dogsBreeds();
		setBreeds(fetchedBreeds);
	};

	const applyFilters = () => {
		executeSafeTransition(async () => {
			setAppliedFilters(pendingFilters);
			setActivePage(1);
			await fetchDogs({
				filters: pendingFilters,
				setDogs,
				setPaginationData,
				favorites,
			});
		});
	};

	const resetFilters = () => {
		executeSafeTransition(async () => {
			setPendingFilters(initalFilters);
			setActivePage(1);
			await fetchDogs({
				filters: initalFilters,
				setDogs,
				setPaginationData,
				favorites,
			});
		});
	};

	const removeBreed = (breed: string) => {
		setPendingFilters((prev) => ({
			...prev,
			breeds: prev.breeds.filter((b) => b !== breed),
		}));
	};

	const removeState = (state: string) => {
		setPendingFilters((prev) => ({
			...prev,
			states: prev.states.filter((s) => s !== state),
		}));
	};

	useEffect(() => {
		executeSafeTransition(async () => {
			await fetchDogBreeds();
			await fetchDogs({
				filters: appliedFilters,
				setDogs,
				setPaginationData,
				favorites,
			});
		});
	}, []);

	return {
		applyFilters,
		resetFilters,
		hasUnappliedChanges,
		pendingFilters,
		setPendingFilters,
		dogs,
		removeBreed,
		openBreeds,
		setOpenBreeds,
		removeState,
		openStates,
		setOpenStates,
		breeds,
		isPending: isPagintaionPending || isFiltersPending,
		activePage,
		totalPages,
		goToNextPage,
		goToPrevPage,
	};
}
