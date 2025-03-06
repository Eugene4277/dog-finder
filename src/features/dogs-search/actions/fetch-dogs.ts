import { DogDomain } from "@/entities/dog";
import { DogFilters, PaginationData } from "../domain";
import {
	fetchDogsData,
	fetchFavoriteDogsData,
	getLocationZipCodes,
} from "../services/dogs";

export async function fetchDogs({
	filters,
	favorites,
	setDogs,
	setPaginationData,
	activePage,
	url,
}: {
	filters: DogFilters;
	favorites: DogDomain.Dog[];
	setDogs: (dogs: DogDomain.Dog[]) => void;
	setPaginationData: (data: PaginationData) => void;
	activePage?: number;
	url?: string;
}) {
	const updatedFilters = {
		...filters,
		zipCodes: await getLocationZipCodes(filters),
	};

	const { dogs, pagination } = filters.showFavorites
		? fetchFavoriteDogsData(favorites, updatedFilters, url, activePage)
		: await fetchDogsData(updatedFilters, url);

	setPaginationData(pagination);
	setDogs(dogs);
}
