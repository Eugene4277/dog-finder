import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

import { Badge } from "@/shared/ui/badge";
import { ChevronsUpDown, X } from "lucide-react";
import { Filters } from "../model/use-filters";
import { Label } from "@/shared/ui/label";

export function ZipFilter({
	pendingFilters,
	setPendingFilters,
	isOpen,
	removeZipCode,
	setOpenZipCodes,
}: {
	pendingFilters: Filters;
	setPendingFilters: (filters: Filters) => void;
	isOpen: boolean;
	removeZipCode: (zipCode: string) => void;
	setOpenZipCodes: (state: boolean) => void;
}) {
	return (
		<div className='space-y-2'>
			<Label>Zip Codes</Label>
			<Popover open={isOpen} onOpenChange={setOpenZipCodes}>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						role='combobox'
						aria-expanded={isOpen}
						className='w-full justify-between'
					>
						Add zip codes...
						<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-full p-4'>
					<div className='space-y-2'>
						<Input
							placeholder='Enter zip code'
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									const input = e.currentTarget;
									const zipCode = input.value.trim();
									if (
										zipCode &&
										!pendingFilters.zipCodes.includes(
											zipCode
										)
									) {
										setPendingFilters({
											...pendingFilters,
											zipCodes: [
												...pendingFilters.zipCodes,
												zipCode,
											],
										});
										input.value = "";
									}
								}
							}}
						/>
						<p className='text-xs text-muted-foreground'>
							Press Enter to add
						</p>
					</div>
				</PopoverContent>
			</Popover>
			{pendingFilters.zipCodes.length > 0 && (
				<div className='flex flex-wrap gap-2'>
					{pendingFilters.zipCodes.map((zipCode) => (
						<Badge key={zipCode} variant='secondary'>
							{zipCode}
							<button
								className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
								onClick={() => removeZipCode(zipCode)}
							>
								<X className='h-3 w-3' />
								<span className='sr-only'>
									Remove {zipCode}
								</span>
							</button>
						</Badge>
					))}
				</div>
			)}
		</div>
	);
}
