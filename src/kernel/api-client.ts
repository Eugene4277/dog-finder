import axios from "axios";
import { DogId } from "@/kernel/ids";

const apiClient = axios.create({
	baseURL: "https://frontend-take-home-service.fetch.com",
	withCredentials: true,
});

// Requests types

export type LoginData = {
	name: string;
	email: string;
};

export type DogsData = string[];

export type DogsMatchData = string[];

export type DogsSearchData = {
	breeds?: string[];
	zipCodes?: string[];
	ageMin?: number;
	ageMax?: number;

	size?: number;
	from?: string;
	sort?: `${"breed" | "name" | "age"}:${"asc" | "desc"}`;
};

export type LocationsData = string[];

export type LocationsSearchData = {
	city?: string;
	states?: string[];
	geoBoundingBox?: {
		top?: Coordinates;
		left?: Coordinates;
		bottom?: Coordinates;
		right?: Coordinates;
		bottom_left?: Coordinates;
		top_left?: Coordinates;
	};
	size?: number;
	from?: number;
};

// Responses types

export type LoginResponseData = string;

export type LogoutResponseData = string;

export type Dog = {
	id: DogId;
	img: string;
	name: string;
	age: number;
	zip_code: string;
	breed: string;
};

export type DogsBreedsResponseData = string[];

export type DogsSearchResponseData = {
	resultIds: DogId[];
	total: number;
	next?: string;
	prev?: string;
};

export type DogsMatchResponseData = {
	match: DogId;
};

// Locations-related responses
export type Location = {
	zip_code: string;
	latitude: number;
	longitude: number;
	city: string;
	state: string;
	county: string;
};

export type Coordinates = {
	lat: number;
	lon: number;
};

export type LocationsSearchResponseData = {
	results: Location[];
	total: number;
};

const dogsAPI = {
	login: (data: LoginData): Promise<LoginResponseData> =>
		apiClient.post("/auth/login", data).then((response) => response.data),

	logout: (): Promise<LogoutResponseData> =>
		apiClient.post("/auth/logout").then((response) => response.data),

	dogs: (data: DogsData): Promise<Dog[]> =>
		apiClient.post("/dogs", data).then((response) => response.data),

	dogsBreeds: (): Promise<DogsBreedsResponseData> =>
		apiClient.get("/dogs/breeds").then((response) => response.data),

	dogsSearch: (
		params: DogsSearchData | null,
		url?: string
	): Promise<DogsSearchResponseData> =>
		apiClient
			.get(url ?? "/dogs/search", { params })
			.then((response) => response.data),

	dogsMatch: (data: DogsMatchData): Promise<DogsMatchResponseData> =>
		apiClient.post("/dogs/match", data).then((response) => response.data),

	locations: (data: LocationsData): Promise<Location[]> =>
		apiClient.post("/locations", data).then((response) => response.data),

	locationsSearch: (
		params: LocationsSearchData
	): Promise<LocationsSearchResponseData> =>
		apiClient
			.get("/locations/search", { params })
			.then((response) => response.data),
};

const isAuthenticated = async () => {
	try {
		const response = await dogsAPI.dogsBreeds();

		return Array.isArray(response);
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 401) {
			return false;
		}
		return false;
	}
};

export { apiClient, dogsAPI, isAuthenticated };
