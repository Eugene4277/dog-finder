import { DogResponse, Location } from "@/kernel/api-client";
import { DogId } from "@/kernel/ids";

export type Dog = {
	id: DogId;
	img: string;
	name: string;
	age: number;
	breed: string;
	location: Location;
};

export function dogsToDogsWithLocations(
	dogs: DogResponse[],
	locations: Location[]
): Dog[] {
	const locationMap = locations
		.filter((loc) => loc && loc.zip_code)
		.reduce((acc, location) => {
			acc[`${location.zip_code}`] = location;
			return acc;
		}, {} as Record<Location["zip_code"], Location>);

	return dogs.reduce((acc, dog) => {
		const { zip_code, ...rest } = dog;

		const location = zip_code ? locationMap[zip_code] : null;

		const dogWithLocation = {
			...rest,
			location: location || {
				zip_code,
				city: "Unknown",
				state: "Unknown",
				latitude: 0,
				longitude: 0,
				county: "Unknown",
			},
		};
		acc.push(dogWithLocation);
		return acc;
	}, [] as Dog[]);
}
