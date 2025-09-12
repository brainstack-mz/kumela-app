 // components/universal-components/ViewContainer.tsx
"use client";

import { ReactNode } from "react";

export default function ViewContainer({ header, children }: { header: string, children: ReactNode }) {
    return (
        <div className="px-0 pb-2 mt-1 md:px-0 md:pb-4 md:mt-2 transition-all duration-300">
            <div className="w-full max-w-7xl mx-auto text-gray-800 bg-white rounded-3xl shadow-2xl px-6 pb-6 pt-4 md:px-10 md:pb-10 md:pt-6 border
             border-gray-200 transform hover:scale-[1.01] transition-transform duration-300">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 text-center mb-4 md:mb-6 leading-tight tracking-wide">
                    {header}
                </h1>
                {children}
            </div>
        </div>
    );
}