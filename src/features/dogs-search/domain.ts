export type DogFilters = {
	breeds: string[];
	zipCodes: string[];
	size: number;
	sort: `${"breed" | "name" | "age"}:${"asc" | "desc"}`;
	ageMin?: number;
	ageMax?: number;
	from?: string;
	showFavorites: boolean;
	city: string;
	states: string[];
};

export type PaginationData = {
	total: number;
	size: number;
	next?: string;
	prev?: string;
};
