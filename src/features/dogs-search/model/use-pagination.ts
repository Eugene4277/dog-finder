import { useState } from "react";
import { Dog } from "@/kernel/api-client";
import { Filters } from "./use-filters";
import { fetchDogs } from "../actions/fetch-dogs";
import { useRequestTransition } from "@/shared/lib/hooks/use-request-transition";

export type PaginationData = {
	total: number;
	size: number;
	next?: string;
	prev?: string;
};

export function usePagination(
	filters: Filters,
	favorites: Dog[],
	filterFavoriteDogs: (dogs: Dog[], appliedFilters: Filters) => Dog[],
	setDogs: (dogs: Dog[]) => void
) {
	const [isPending, executeSafeTransition] = useRequestTransition();
	const [paginationData, setPaginationData] = useState<PaginationData>({
		total: 0,
		size: filters.size,
		next: undefined,
		prev: undefined,
	});

	const [activePage, setActivePage] = useState<number>(1);
	const totalPages = Math.ceil(paginationData.total / paginationData.size);

	const goToNextPage = () => {
		if (paginationData.next && activePage < totalPages) {
			executeSafeTransition(async () => {
				setActivePage((prev) => prev + 1);
				await fetchDogs({
					filters,
					setDogs,
					setPaginationData,
					favorites,
					filterFavoriteDogs,
					url: paginationData.next,
					activePage,
				});
			});
		}
	};

	const goToPrevPage = () => {
		if (paginationData.prev && activePage > 1) {
			executeSafeTransition(async () => {
				setActivePage((prev) => prev - 1);
				await fetchDogs({
					filters,
					setDogs,
					setPaginationData,
					favorites,
					filterFavoriteDogs,
					url: paginationData.prev,
					activePage,
				});
			});
		}
	};

	return {
		setPaginationData,
		activePage,
		setActivePage,
		totalPages,
		goToNextPage,
		goToPrevPage,
		isPagintaionPending: isPending,
	};
}
