import { useState } from "react";
import { fetchDogs } from "../actions/fetch-dogs";
import { useRequestTransition } from "@/shared/lib/hooks/use-request-transition";
import { DogDomain } from "@/entities/dog";
import { PaginationData, DogFilters } from "../domain";

export function usePagination(
	filters: DogFilters,
	favorites: DogDomain.Dog[],
	setDogs: (dogs: DogDomain.Dog[]) => void
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
