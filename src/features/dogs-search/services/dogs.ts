import { dogsAPI } from "@/kernel/api-client";

import { getChunk } from "@/shared/lib/utils";
import { DogDomain } from "@/entities/dog";
import { DogFilters, PaginationData } from "../domain";

function filterFavoriteDogs(dogs: DogDomain.Dog[], appliedFilters: DogFilters) {
	if (appliedFilters.breeds.length > 0) {
		dogs = dogs.filter((dog) => appliedFilters.breeds.includes(dog.breed));
	}

	if (appliedFilters.zipCodes.length > 0) {
		dogs = dogs.filter((dog) =>
			appliedFilters.zipCodes.includes(dog.location.zip_code)
		);
	}

	if (appliedFilters.ageMin !== undefined) {
		dogs = dogs.filter((dog) => dog.age >= appliedFilters.ageMin!);
	}

	if (appliedFilters.ageMax !== undefined) {
		dogs = dogs.filter((dog) => dog.age <= appliedFilters.ageMax!);
	}

	if (appliedFilters.states.length > 0) {
		dogs = dogs.filter((dog) =>
			appliedFilters.states.includes(dog.location.state)
		);
	}

	if (appliedFilters.city) {
		dogs = dogs.filter((dog) =>
			dog.location.city
				.toLocaleLowerCase()
				.includes(appliedFilters.city.toLocaleLowerCase())
		);
	}

	const [field, direction] = appliedFilters.sort.split(":");
	dogs.sort((a, b) => {
		const aValue = a[field as keyof DogDomain.Dog];
		const bValue = b[field as keyof DogDomain.Dog];

		if (typeof aValue === "string" && typeof bValue === "string") {
			return direction === "asc"
				? aValue.localeCompare(bValue)
				: bValue.localeCompare(aValue);
		}

		if (typeof aValue === "number" && typeof bValue === "number") {
			return direction === "asc" ? aValue - bValue : bValue - aValue;
		}

		return 0;
	});

	return dogs;
}

async function getLocationZipCodes(filters: DogFilters): Promise<string[]> {
	if (!filters.city && !filters.states.length) return [];

	const locationResponse = await dogsAPI.locationsSearch({
		city: filters.city,
		size: filters.size,
		states: filters.states,
	});

	return locationResponse.results.map((location) => location.zip_code);
}

async function fetchDogsData(filters: DogFilters, url?: string) {
	const response = url
		? await dogsAPI.dogsSearch(null, url)
		: await dogsAPI.dogsSearch(filters);
	const pagination: PaginationData = {
		total: response.total,
		next: response.next,
		prev: response.prev,
		size: filters.size,
	};

	const dogsResponse = await dogsAPI.dogs(response.resultIds);
	if (dogsResponse.length === 0)
		return {
			dogs: [],
			pagination,
		};

	const zipCodes = dogsResponse.map((dog) => dog.zip_code).filter(Boolean);
	const locationResponse = zipCodes.length
		? await dogsAPI.locations(zipCodes)
		: [];

	const dogsWithLocations = DogDomain.dogsToDogsWithLocations(
		dogsResponse,
		locationResponse
	);
	return { dogs: dogsWithLocations, pagination };
}

function fetchFavoriteDogsData(
	favorites: DogDomain.Dog[],
	filters: DogFilters,
	url?: string,
	activePage?: number
) {
	const filteredFavoritesDogs = filterFavoriteDogs(favorites, filters);

	const pagination: PaginationData = {
		total: filteredFavoritesDogs.length,
		next: "next",
		prev: "prev",
		size: filters.size,
	};

	const chunkedDogs = getChunk(
		filteredFavoritesDogs,
		filters.size,
		url && activePage
			? url === "next"
				? activePage + 1
				: activePage - 1
			: 1
	);

	return { dogs: chunkedDogs, pagination };
}

export { getLocationZipCodes, fetchDogsData, fetchFavoriteDogsData };
