import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/shared/ui/pagination";

export function PaginationSection({
	totalPages,
	goToNextPage,
	activePage,
	goToPreviuosPage,
}: {
	goToPreviuosPage: () => void;
	goToNextPage: () => void;
	activePage: number;
	totalPages: number;
}) {
	return (
		<>
			{totalPages ? (
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious onClick={goToPreviuosPage} />
						</PaginationItem>
						<span>
							Page {activePage} of {totalPages}
						</span>
						<PaginationItem>
							<PaginationNext onClick={goToNextPage} />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			) : null}
		</>
	);
}
