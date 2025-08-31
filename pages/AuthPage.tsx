
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const AuthPage: React.FC = () => {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const query = useQuery();
    const initialRole = query.get('role') === 'provider' ? UserRole.PROVIDER : UserRole.CUSTOMER;

    const [email, setEmail] = useState('');
    const [role, setRole] = useState<UserRole>(initialRole);
    const [isLoginView, setIsLoginView] = useState(true);

    useEffect(() => {
        if (user) {
            switch (user.role) {
                case UserRole.CUSTOMER:
                    navigate('/customer/dashboard');
                    break;
                case UserRole.PROVIDER:
                    navigate('/provider/dashboard');
                    break;
                case UserRole.ADMIN:
                    navigate('/admin/dashboard');
                    break;
                default:
                    navigate('/');
            }
        }
    }, [user, navigate]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation
        if (email) {
            login(email, role);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
                    {isLoginView ? 'Sign in to your account' : 'Create a new account'}
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <span className="block text-sm font-medium text-gray-700">I am a...</span>
                            <div className="mt-2 grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setRole(UserRole.CUSTOMER)}
                                    className={`py-2 px-4 border rounded-md text-sm font-medium ${role === UserRole.CUSTOMER ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300'}`}
                                >
                                    Customer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole(UserRole.PROVIDER)}
                                    className={`py-2 px-4 border rounded-md text-sm font-medium ${role === UserRole.PROVIDER ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300'}`}
                                >
                                    Provider
                                </button>
                            </div>
                             <div className="mt-2">
                                <button
                                    type="button"
                                    onClick={() => setRole(UserRole.ADMIN)}
                                    className={`w-full py-2 px-4 border rounded-md text-sm font-medium ${role === UserRole.ADMIN ? 'bg-gray-700 text-white border-gray-700' : 'bg-white text-gray-700 border-gray-300'}`}
                                >
                                    Admin (Demo)
                                </button>
                             </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                {isLoginView ? 'Sign in' : 'Sign up'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    {isLoginView ? "Don't have an account?" : "Already have an account?"}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={() => setIsLoginView(!isLoginView)}
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                {isLoginView ? 'Sign up' : 'Sign in'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
