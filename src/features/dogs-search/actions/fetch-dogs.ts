import { Dog, dogsAPI } from "@/kernel/api-client";
import { Filters } from "../model/use-filters";
import { PaginationData } from "../model/use-pagination";
import { getChunk } from "@/shared/lib/utils";

export async function fetchDogs({
	filters,
	favorites,
	filterFavoriteDogs,
	setDogs,
	setPaginationData,
	activePage,
	url,
}: {
	filters: Filters;
	favorites: Dog[];
	filterFavoriteDogs: (dogs: Dog[], appliedFilters: Filters) => Dog[];
	setDogs: (dogs: Dog[]) => void;
	setPaginationData: (data: PaginationData) => void;
	activePage?: number;
	url?: string;
}) {
	let filteredDogs: Dog[] = [];
	let paginationResponseData: PaginationData;

	if (!filters.showFavorites) {
		const response = url
			? await dogsAPI.dogsSearch(null, url)
			: await dogsAPI.dogsSearch(filters);
		paginationResponseData = {
			total: response.total,
			next: response.next,
			prev: response.prev,
			size: filters.size,
		};
		filteredDogs = await dogsAPI.dogs(response.resultIds);
	} else {
		const filteredFavoritesDogs = filterFavoriteDogs(favorites, filters);

		paginationResponseData = {
			total: filteredFavoritesDogs.length,
			next: "next",
			prev: "prev",
			size: filters.size,
		};

		filteredDogs = getChunk(
			filteredFavoritesDogs,
			filters.size,
			url && activePage
				? url === "next"
					? activePage + 1
					: activePage - 1
				: 1
		);
	}

	setPaginationData(paginationResponseData);
	setDogs(filteredDogs);
}
