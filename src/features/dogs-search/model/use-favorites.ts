import { useCallback, useEffect, useState } from "react";

import {
	getFavoritesFromLocalStorage,
	setFavoritesToLocalStorage,
} from "@/shared/lib/local-storage";
import { DogDomain } from "@/entities/dog";

export function useFavorites() {
	const [favorites, setFavorites] = useState<DogDomain.Dog[]>(() => {
		if (typeof window !== "undefined") {
			return getFavoritesFromLocalStorage();
		}
		return [];
	});

	useEffect(() => {
		setFavoritesToLocalStorage(favorites);
	}, [favorites]);

	const toggleFavorite = useCallback((dog: DogDomain.Dog) => {
		setFavorites((prev) => {
			const isFavorite = prev.some((fav) => fav.id === dog.id);
			if (isFavorite) {
				return prev.filter((fav) => fav.id !== dog.id);
			} else {
				return [...prev, dog];
			}
		});
	}, []);

	return { favorites, toggleFavorite };
}
