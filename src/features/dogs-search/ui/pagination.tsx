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
			{totalPages > 1 ? (
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious onClick={goToPreviuosPage} />
						</PaginationItem>
						<PaginationItem className='cursor-default'>
							Page {activePage} of {totalPages}
						</PaginationItem>
						<PaginationItem>
							<PaginationNext onClick={goToNextPage} />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			) : null}
		</>
	);
}
