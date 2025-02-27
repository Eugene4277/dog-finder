export function getChunk<T>(
	items: T[],
	chunkSize: number,
	chunkNumber: number
) {
	if (chunkSize <= 0 || chunkNumber < 1) return [];

	const start = (chunkNumber - 1) * chunkSize;
	const end = start + chunkSize;

	return items.slice(start, end);
}
