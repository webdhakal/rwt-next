'use client';

import { useState } from 'react';
import { usersApi } from '@/lib/api/endpoints';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { ApiError } from '@/lib/api/types';

export default function HomePage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<ApiError | null>(null);

    const testApiCall = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        const response = await usersApi.getUsers({ page: 1, limit: 5 });

        setLoading(false);

        if (response.success) {
            setResult(response.data);
        } else {
            setError(response.error || {
                type: 'REQUEST_ERROR',
                message: 'Unknown error occurred',
                status: 0,
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Next.js with Axios
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    A robust setup for API calls with error handling
                </p>

                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-semibold mb-6">API Test</h2>

                    <button
                        onClick={testApiCall}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors mb-6"
                    >
                        {loading ? 'Testing API...' : 'Test API Call'}
                    </button>

                    {loading && (
                        <div className="my-6">
                            <LoadingSpinner text="Fetching data..." />
                        </div>
                    )}

                    {error && (
                        <div className="my-6">
                            <ErrorDisplay error={error} onRetry={testApiCall} />
                        </div>
                    )}

                    {result && (
                        <div className="my-6 text-left">
                            <h3 className="text-lg font-medium mb-3">API Response:</h3>
                            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                                {JSON.stringify(result, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>

                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2">🔧 Axios Setup</h3>
                        <p className="text-gray-600">
                            Pre-configured Axios client with interceptors, authentication, and error handling.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2">🛡️ Error Handling</h3>
                        <p className="text-gray-600">
                            Comprehensive error boundaries and user-friendly error displays for better UX.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2">🎯 TypeScript</h3>
                        <p className="text-gray-600">
                            Full TypeScript support with proper typing for API responses and errors.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}