import { useEffect, useState } from "react";
import { Dog, dogsAPI } from "@/kernel/api-client";
import { usePagination } from "./use-pagination";
import { fetchDogs } from "../actions/fetch-dogs";
import { useRequestTransition } from "@/shared/lib/hooks/use-request-transition";

export type Filters = {
	breeds: string[];
	zipCodes: string[];
	size: number;
	sort: `${"breed" | "name" | "age"}:${"asc" | "desc"}`;
	ageMin?: number;
	ageMax?: number;
	from?: string;
	showFavorites: boolean;
};

export type PaginationData = {
	total: number;
	size: number;
	next?: string;
	prev?: string;
};

const initalFilters: Filters = {
	breeds: [],
	zipCodes: [],
	size: 25,
	sort: "breed:asc",
	showFavorites: false,
};

export function useFilters(
	favorites: Dog[],
	filterFavoriteDogs: (dogs: Dog[], appliedFilters: Filters) => Dog[]
) {
	const [dogs, setDogs] = useState<Dog[]>([]);
	const [breeds, setBreeds] = useState<string[]>([]);

	const [appliedFilters, setAppliedFilters] =
		useState<Filters>(initalFilters);

	const [pendingFilters, setPendingFilters] =
		useState<Filters>(appliedFilters);

	const hasUnappliedChanges =
		JSON.stringify(pendingFilters) !== JSON.stringify(appliedFilters);

	const [openBreeds, setOpenBreeds] = useState(false);
	const [openZipCodes, setOpenZipCodes] = useState(false);

	const [isFiltersPending, executeSafeTransition] = useRequestTransition();

	const {
		setPaginationData,
		activePage,
		setActivePage,
		totalPages,
		goToNextPage,
		goToPrevPage,
		isPagintaionPending,
	} = usePagination(pendingFilters, favorites, filterFavoriteDogs, setDogs);

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
				filterFavoriteDogs,
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
				filterFavoriteDogs,
			});
		});
	};

	const removeBreed = (breed: string) => {
		setPendingFilters((prev) => ({
			...prev,
			breeds: prev.breeds.filter((b) => b !== breed),
		}));
	};

	const removeZipCode = (zipCode: string) => {
		setPendingFilters((prev) => ({
			...prev,
			zipCodes: prev.zipCodes.filter((z) => z !== zipCode),
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
				filterFavoriteDogs,
			});
		});
	}, []);

	return {
		removeBreed,
		removeZipCode,
		applyFilters,
		resetFilters,
		hasUnappliedChanges,
		pendingFilters,
		setPendingFilters,
		dogs,
		openBreeds,
		setOpenBreeds,
		openZipCodes,
		setOpenZipCodes,
		breeds,
		isPending: isPagintaionPending || isFiltersPending,
		activePage,
		totalPages,
		goToNextPage,
		goToPrevPage,
	};
}
