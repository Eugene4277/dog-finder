import { Dog, dogsAPI } from "@/kernel/api-client";
import { useRequestTransition } from "@/shared/lib/hooks/use-request-transition";
import { useState } from "react";

export function useMatch(favorites: Dog[]) {
	const [match, setMatch] = useState<Dog | null>(null);
	const [matchDialogOpen, setMatchDialogOpen] = useState(false);
	const [isPending, executeSafeTransition] = useRequestTransition();
	const generateMatch = async () => {
		executeSafeTransition(async () => {
			const matchResponse = await dogsAPI.dogsMatch(
				favorites.map((fav) => fav.id)
			);

			const matchedDog = favorites.find(
				(fav) => fav.id === matchResponse.match
			);

			setMatch((prev) => matchedDog ?? prev);
			if (matchedDog) {
				setMatchDialogOpen(true);
			}
		});
	};

	return {
		generateMatch,
		match,
		setMatchDialogOpen,
		matchDialogOpen,
		isMatchPending: isPending,
	};
}
