import { ApiError } from '@/lib/api/types';

interface ErrorDisplayProps {
    error: ApiError;
    onRetry?: () => void;
    className?: string;
}

export function ErrorDisplay({ error, onRetry, className = '' }: ErrorDisplayProps) {
    const getErrorMessage = (error: ApiError) => {
        switch (error.type) {
            case 'NETWORK_ERROR':
                return 'Unable to connect to the server. Please check your internet connection.';
            case 'API_ERROR':
                return error.message || 'An error occurred while processing your request.';
            case 'REQUEST_ERROR':
                return error.message || 'Request failed. Please try again.';
            default:
                return 'An unexpected error occurred.';
        }
    };

    const getErrorIcon = (type: ApiError['type']) => {
        switch (type) {
            case 'NETWORK_ERROR':
                return (
                    <svg className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                );
            case 'API_ERROR':
                return (
                    <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            default:
                return (
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    return (
        <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    {getErrorIcon(error.type)}
                </div>
                <div className="ml-3 w-0 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                        {error.type === 'NETWORK_ERROR' ? 'Connection Error' : 'Error'}
                    </h3>
                    <div className="mt-2 text-sm text-gray-500">
                        <p>{getErrorMessage(error)}</p>
                        {error.status > 0 && (
                            <p className="mt-1 text-xs text-gray-400">
                                Status Code: {error.status}
                            </p>
                        )}
                    </div>
                    {onRetry && (
                        <div className="mt-4">
                            <button
                                onClick={onRetry}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}