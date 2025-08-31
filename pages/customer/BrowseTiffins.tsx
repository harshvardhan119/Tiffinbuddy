
import React, { useState, useMemo } from 'react';
import { MOCK_PROVIDERS } from '../../data/mockData';
import TiffinProviderCard from '../../components/TiffinProviderCard';
import { SearchIcon } from '../../components/icons/Icon';
import GeminiMealSuggester from '../../components/GeminiMealSuggester';

const BrowseTiffins: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cuisineFilter, setCuisineFilter] = useState('all');

    const cuisines = useMemo(() => ['all', ...Array.from(new Set(MOCK_PROVIDERS.map(p => p.cuisine)))], []);

    const filteredProviders = useMemo(() => {
        return MOCK_PROVIDERS.filter(provider => {
            const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                provider.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCuisine = cuisineFilter === 'all' || provider.cuisine === cuisineFilter;
            return matchesSearch && matchesCuisine;
        });
    }, [searchTerm, cuisineFilter]);

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Find Your Perfect Meal</h1>
                    <p className="mt-2 text-lg text-gray-600">Explore a wide range of homemade tiffin services.</p>
                </div>
                
                <GeminiMealSuggester />

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-grow w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div className="w-full md:w-auto">
                        <select
                            value={cuisineFilter}
                            onChange={(e) => setCuisineFilter(e.target.value)}
                            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        >
                            {cuisines.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                        </select>
                    </div>
                </div>

                {/* Tiffin List */}
                {filteredProviders.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProviders.map((provider) => (
                            <TiffinProviderCard key={provider.id} provider={provider} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-semibold text-gray-700">No Tiffin Services Found</h3>
                        <p className="mt-2 text-gray-500">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowseTiffins;
