import { DogDomain } from "@/entities/dog";
import { dogsAPI } from "@/kernel/api-client";
import { useRequestTransition } from "@/shared/lib/hooks/use-request-transition";
import { useState } from "react";

export function useMatch(favorites: DogDomain.Dog[]) {
	const [match, setMatch] = useState<DogDomain.Dog | null>(null);
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

			if (matchedDog) {
				setMatch(matchedDog);
				setMatchDialogOpen(true);
			}
		});
	};

	const closeMatchDialog = () => {
		setMatchDialogOpen(false);
	};

	return {
		isMatchPending: isPending,
		match,
		matchDialogOpen,
		generateMatch,
		closeMatchDialog,
	};
}
