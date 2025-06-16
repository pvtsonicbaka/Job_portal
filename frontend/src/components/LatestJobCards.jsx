import React from 'react';
import { Badge } from './ui/badge';

const LatestJobCards = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="mb-4">
                <h1 className="text-xl font-bold text-gray-800">Company Name</h1>
                <p className="text-gray-500">India</p>
            </div>
            <div className="mb-4">
                <h1 className="text-lg font-semibold text-gray-700">Job Title</h1>
                <p className="text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, ipsum!
                </p>
            </div>
            <div className="flex flex-wrap gap-2">
                <Badge className="text-blue-700 bg-blue-100 font-bold px-3 py-1 rounded-full">
                    12 Positions
                </Badge>
                <Badge className="text-green-700 bg-green-100 font-bold px-3 py-1 rounded-full">
                    Part Time
                </Badge>
                <Badge className="text-purple-700 bg-purple-100 font-bold px-3 py-1 rounded-full">
                    25 LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
