
import React, { useState, useCallback } from 'react';
import { generateMealPlanSuggestion } from '../services/geminiService';
import { MOCK_PROVIDERS } from '../data/mockData';
import { GeminiMealSuggestion } from '../types';
import { SparklesIcon, XIcon } from './icons/Icon';

const GeminiMealSuggester: React.FC = () => {
    const [preferences, setPreferences] = useState('');
    const [suggestion, setSuggestion] = useState<GeminiMealSuggestion | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuggester, setShowSuggester] = useState(false);

    const handleGenerateSuggestion = useCallback(async () => {
        if (!preferences.trim()) {
            setError('Please enter your preferences.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuggestion(null);

        try {
            const responseText = await generateMealPlanSuggestion(preferences, MOCK_PROVIDERS);
            const parsedResponse = JSON.parse(responseText);
            if (parsedResponse.error) {
                setError(parsedResponse.error);
            } else {
                setSuggestion(parsedResponse);
            }
        } catch (e) {
            console.error(e);
            setError('Failed to parse suggestion. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [preferences]);

    if (!showSuggester) {
        return (
            <div className="text-center my-8">
                <button
                    onClick={() => setShowSuggester(true)}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-primary to-amber-600 hover:from-amber-600 hover:to-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    Get AI Meal Plan Suggestion
                </button>
            </div>
        );
    }

    return (
        <div className="bg-amber-50 border-2 border-primary border-dashed rounded-lg p-6 my-8 relative">
             <button
                onClick={() => setShowSuggester(false)}
                className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-800"
                aria-label="Close"
            >
                <XIcon className="w-5 h-5" />
            </button>
            <div className="text-center">
                <SparklesIcon className="mx-auto h-12 w-12 text-primary" />
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">AI-Powered Meal Planner</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Tell us your dietary needs, and our AI will find the perfect tiffin plan for you!
                </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    placeholder="e.g., vegetarian, high-protein, low-carb"
                    className="flex-grow block w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    disabled={isLoading}
                />
                <button
                    onClick={handleGenerateSuggestion}
                    disabled={isLoading}
                    className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400"
                >
                    {isLoading ? 'Thinking...' : 'Generate'}
                </button>
            </div>

            {error && <p className="mt-4 text-center text-red-600">{error}</p>}
            
            {isLoading && (
                 <div className="mt-8 text-center">
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5424 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                     <p className="mt-4 text-gray-600">Our AI chef is crafting the perfect plan for you...</p>
                 </div>
            )}
            
            {suggestion && (
                <div className="mt-8 bg-white p-6 rounded-lg shadow">
                    <h3 className="text-2xl font-bold text-gray-900">{suggestion.planTitle}</h3>
                    <p className="mt-2 text-gray-600">{suggestion.justification}</p>
                    <div className="mt-6 space-y-4">
                        {suggestion.suggestedTiffins.map((tiff, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <p className="font-bold text-primary">{tiff.providerName}</p>
                                <p className="font-semibold text-gray-800">{tiff.planName}</p>
                                <p className="text-gray-600 text-sm">{tiff.reason}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeminiMealSuggester;
