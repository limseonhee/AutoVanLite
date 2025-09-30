"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // Log the error to console for debugging
        console.error("Error boundary caught an error:", error);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        if (error.digest) {
            console.error("Error digest:", error.digest);
        }
    }, [error]);

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-[#F9FAFC] dark:bg-gray-900">
            <div className="rounded-lg bg-white dark:bg-gray-800 p-8 shadow-lg max-w-md w-full mx-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">오류가 발생했습니다</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    페이지를 로드하는 중에 문제가 발생했습니다. 다시 시도해보세요.
                </p>
                {process.env.NODE_ENV === "development" && (
                    <details className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                        <summary className="cursor-pointer text-red-700 dark:text-red-400 font-medium">
                            개발자 정보 (클릭하여 펼치기)
                        </summary>
                        <pre className="mt-2 text-xs text-red-600 dark:text-red-300 overflow-auto">
                            {error.message}
                            {error.stack && `\n\n${error.stack}`}
                        </pre>
                    </details>
                )}
                <button
                    className="w-full rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => reset()}
                >
                    다시 시도
                </button>
            </div>
        </div>
    );
}
