import { memo } from "react";
import { Heart } from "lucide-react";
import { Dog } from "@/kernel/api-client";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

export const MainSection = memo(function MainSection({
	dogs,
	favorites,
	toggleFavorite,
}: {
	dogs: Dog[];
	favorites: Dog[];
	toggleFavorite: (dog: Dog) => void;
}) {
	return (
		<>
			{dogs.length ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
					{dogs.map((dog) => {
						const isFavorite = favorites.some(
							(fav) => fav.id === dog.id
						);
						return (
							<Card key={dog.id}>
								<CardContent className='p-4'>
									<img
										src={dog.img}
										alt={dog.name}
										className='w-full h-48 object-cover mb-2 rounded'
									/>
									<h2 className='text-xl font-bold'>
										{dog.name}
									</h2>
									<p>Breed: {dog.breed}</p>
									<p>Age: {dog.age} years</p>
									<p>Zip Code: {dog.zip_code}</p>
								</CardContent>
								<CardFooter>
									<Button
										variant={
											isFavorite ? "secondary" : "outline"
										}
										onClick={() => toggleFavorite(dog)}
										className='w-full'
									>
										<Heart
											className={`mr-2 h-4 w-4 ${
												isFavorite ? "fill-current" : ""
											}`}
										/>
										{isFavorite
											? "Favorited"
											: "Add to Favorites"}
									</Button>
								</CardFooter>
							</Card>
						);
					})}
				</div>
			) : (
				<div className='flex justify-center items-center'>
					<span>No Matches Found</span>
				</div>
			)}
		</>
	);
});
