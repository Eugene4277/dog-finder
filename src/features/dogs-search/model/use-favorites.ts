import { useCallback, useEffect, useState } from "react";

import {
	getFavoritesFromLocalStorage,
	setFavoritesToLocalStorage,
} from "@/kernel/local-storage";
import { Dog } from "@/kernel/api-client";
import { Filters } from "./use-filters";

export function useFavorites() {
	const [favorites, setFavorites] = useState<Dog[]>(() => {
		if (typeof window !== "undefined") {
			return getFavoritesFromLocalStorage();
		}
		return [];
	});

	useEffect(() => {
		setFavoritesToLocalStorage(favorites);
	}, [favorites]);

	const toggleFavorite = useCallback((dog: Dog) => {
		setFavorites((prev) => {
			const isFavorite = prev.some((fav) => fav.id === dog.id);
			if (isFavorite) {
				return prev.filter((fav) => fav.id !== dog.id);
			} else {
				return [...prev, dog];
			}
		});
	}, []);

	const filterFavoriteDogs = (dogs: Dog[], appliedFilters: Filters) => {
		if (appliedFilters.breeds.length > 0) {
			dogs = dogs.filter((dog) =>
				appliedFilters.breeds.includes(dog.breed)
			);
		}

		if (appliedFilters.zipCodes.length > 0) {
			dogs = dogs.filter((dog) =>
				appliedFilters.zipCodes.includes(dog.zip_code)
			);
		}

		if (appliedFilters.ageMin !== undefined) {
			dogs = dogs.filter((dog) => dog.age >= appliedFilters.ageMin!);
		}

		if (appliedFilters.ageMax !== undefined) {
			dogs = dogs.filter((dog) => dog.age <= appliedFilters.ageMax!);
		}

		const [field, direction] = appliedFilters.sort.split(":");
		dogs.sort((a, b) => {
			const aValue = a[field as keyof Dog];
			const bValue = b[field as keyof Dog];

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
	};

	return { favorites, toggleFavorite, filterFavoriteDogs };
}
