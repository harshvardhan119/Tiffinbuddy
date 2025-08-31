
import React from 'react';
import { Link } from 'react-router-dom';
import TiffinProviderCard from '../components/TiffinProviderCard';
import { MOCK_PROVIDERS } from '../data/mockData';

const LandingPage: React.FC = () => {
    const featuredProviders = MOCK_PROVIDERS.slice(0, 3);

    return (
        <div className="bg-base-200">
            {/* Hero Section */}
            <section className="bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                        Homemade Meals, <br />
                        <span className="text-primary">Delivered Daily.</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        Discover authentic, homemade tiffin services in your area. Healthy, hygienic, and delicious food delivered right to your doorstep.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Link
                            to="/browse"
                            className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-amber-600 transition duration-300"
                        >
                            Find Your Tiffin
                        </Link>
                        <Link
                            to="/auth?role=provider"
                            className="inline-block bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition duration-300"
                        >
                            Become a Provider
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How TiffinBuddy Works</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary text-white mx-auto mb-4">
                                <span className="text-3xl font-bold">1</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Discover</h3>
                            <p className="text-gray-600">Browse a variety of tiffin services and find the perfect homemade meal plan for you.</p>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary text-white mx-auto mb-4">
                                <span className="text-3xl font-bold">2</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Subscribe</h3>
                            <p className="text-gray-600">Choose a weekly or monthly plan, and subscribe with just a few clicks.</p>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary text-white mx-auto mb-4">
                                <span className="text-3xl font-bold">3</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Enjoy</h3>
                            <p className="text-gray-600">Get fresh, delicious, and hygienic homemade food delivered to your door.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Providers Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Tiffin Providers</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProviders.map((provider) => (
                            <TiffinProviderCard key={provider.id} provider={provider} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
