
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_PROVIDERS } from '../../data/mockData';
import { StarIcon } from '../../components/icons/Icon';
import { Meal, Menu, MealPlan } from '../../types';

const TiffinProviderDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const provider = MOCK_PROVIDERS.find(p => p.id === id);
    const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);

    if (!provider) {
        return <div className="text-center py-10">Provider not found.</div>;
    }

    const renderMeal = (meal: Meal) => (
        <div key={meal.id} className="p-2 border-b">
            <p className="font-semibold text-gray-700">{meal.name} <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${meal.type === 'veg' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{meal.type}</span></p>
            <p className="text-sm text-gray-500">{meal.description}</p>
        </div>
    );

    const renderMenuDay = (menuDay: Menu) => (
        <div key={menuDay.day} className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-lg font-bold text-gray-800 mb-2">{menuDay.day}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h5 className="font-semibold text-primary mb-1">Lunch</h5>
                    <div className="space-y-1">{menuDay.lunch.map(renderMeal)}</div>
                </div>
                 <div>
                    <h5 className="font-semibold text-primary mb-1">Dinner</h5>
                    <div className="space-y-1">{menuDay.dinner.map(renderMeal)}</div>
                </div>
            </div>
        </div>
    );
    
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="relative h-64 rounded-lg overflow-hidden mb-8">
                    <img src={provider.coverImage} alt={provider.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                        <h1 className="text-4xl font-bold text-white">{provider.name}</h1>
                        <p className="text-lg text-gray-200">{provider.cuisine}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">About Us</h2>
                            <p className="text-gray-600 leading-relaxed">{provider.description}</p>
                        </div>
                        
                        {/* Menu */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Weekly Menu</h2>
                            <div className="space-y-4">
                                {provider.menu.map(renderMenuDay)}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews ({provider.reviews.length})</h2>
                            <div className="space-y-4">
                                {provider.reviews.map(review => (
                                    <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon key={i} filled={i < review.rating} />
                                                ))}
                                            </div>
                                            <p className="ml-4 font-semibold text-gray-800">{review.userName}</p>
                                        </div>
                                        <p className="text-gray-600">{review.comment}</p>
                                        <p className="text-xs text-gray-400 mt-2 text-right">{review.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar with Plans */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Subscription Plans</h3>
                                <div className="space-y-4">
                                    {provider.plans.map(plan => (
                                        <div 
                                            key={plan.id} 
                                            onClick={() => setSelectedPlan(plan)}
                                            className={`p-4 border rounded-lg cursor-pointer transition ${selectedPlan?.id === plan.id ? 'border-primary ring-2 ring-primary' : 'border-gray-200 hover:border-gray-400'}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-semibold text-lg">{plan.name}</h4>
                                                <p className="font-bold text-primary text-lg">₹{plan.price}</p>
                                            </div>
                                            <p className="text-sm text-gray-600 capitalize">{plan.type} Plan</p>
                                            <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    disabled={!selectedPlan}
                                    className="mt-6 w-full bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-amber-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    Subscribe Now
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default TiffinProviderDetail;
