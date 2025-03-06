const localStorageItemKeyMap = {
	userName: "userName",
	userEmailEncoded: "userEmailEncoded",
	dogFavorites: "dogFavorites",
};

const clearLocalStorage = () => {
	localStorage.removeItem(localStorageItemKeyMap.userEmailEncoded);
	localStorage.removeItem(localStorageItemKeyMap.userName);
};

const getFavoritesFromLocalStorage = (): [] => {
	const dogFavorites = localStorage.getItem(
		localStorageItemKeyMap.dogFavorites
	);
	if (!dogFavorites) return [];

	const parsedFavorites = JSON.parse(dogFavorites);

	return (
		parsedFavorites[
			localStorage.getItem(localStorageItemKeyMap.userEmailEncoded) ?? ""
		] ?? []
	);
};

const setFavoritesToLocalStorage = <T>(favorites: T[]) => {
	const dogFavorites = localStorage.getItem(
		localStorageItemKeyMap.dogFavorites
	);
	const encodedEmail =
		localStorage.getItem(localStorageItemKeyMap.userEmailEncoded) ?? "";
	if (dogFavorites) {
		const parsedFavorites = JSON.parse(dogFavorites);

		if (encodedEmail) {
			parsedFavorites[encodedEmail] = favorites;
			localStorage.setItem(
				localStorageItemKeyMap.dogFavorites,
				JSON.stringify(parsedFavorites)
			);
		}
	} else {
		if (encodedEmail) {
			localStorage.setItem(
				localStorageItemKeyMap.dogFavorites,
				JSON.stringify({ [encodedEmail]: favorites })
			);
		}
	}
};

export {
	localStorageItemKeyMap,
	clearLocalStorage,
	getFavoritesFromLocalStorage,
	setFavoritesToLocalStorage,
};
