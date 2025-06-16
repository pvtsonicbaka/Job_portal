import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';

const categories = [
    "Frontend Dev",
    "Backend Dev",
    "Data Scientist",
    "Graphic Designer",
    "FullStack Dev"
    // can add more
];

const CategoryCarousel = () => {
    return (
        <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 py-10">
            <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
                Explore Categories
            </h2>
            <Carousel className="w-full max-w-4xl mx-auto my-10  rounded-lg overflow-hidden">
                <CarouselContent className="flex gap-4">
                    {
                        categories.map((category, index) => (
                            <CarouselItem
                                key={index}
                                className="flex justify-center items-center md:basis-1/2 lg:basis-1/3"
                            >
                                <Button
                                    variant="outline"
                                    className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
                                >
                                    {category}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md transition-all duration-300">
                    <span className="text-gray-600 text-lg font-bold">{'<'}</span>
                </CarouselPrevious>
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md transition-all duration-300">
                    <span className="text-gray-600 text-lg font-bold">{'>'}</span>
                </CarouselNext>
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;