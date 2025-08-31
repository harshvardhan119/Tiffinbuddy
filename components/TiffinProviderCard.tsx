
import React from 'react';
import { Link } from 'react-router-dom';
import { TiffinProvider } from '../types';
import { StarIcon } from './icons/Icon';

interface TiffinProviderCardProps {
    provider: TiffinProvider;
}

const TiffinProviderCard: React.FC<TiffinProviderCardProps> = ({ provider }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Link to={`/provider/${provider.id}`}>
                <img className="w-full h-48 object-cover" src={provider.coverImage} alt={provider.name} />
                <div className="p-4">
                    <div className="flex justify-between items-start">
                         <h3 className="text-xl font-bold text-gray-800 mb-1">{provider.name}</h3>
                         {provider.isVerified && <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified</span>}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{provider.cuisine}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{provider.description}</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <StarIcon filled className="w-5 h-5 text-yellow-500" />
                            <span className="ml-1 text-gray-700 font-semibold">{provider.rating}</span>
                            <span className="ml-2 text-gray-500 text-sm">({provider.reviews.length} reviews)</span>
                        </div>
                         <span className="text-primary font-semibold">View Menu</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default TiffinProviderCard;
