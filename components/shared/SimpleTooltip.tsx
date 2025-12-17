import React from 'react';

interface SimpleTooltipProps {
    content: string;
    children: React.ReactNode;
}

export const SimpleTooltip: React.FC<SimpleTooltipProps> = ({ content, children }) => {
    return (
        <div className="group relative flex items-center">
            {children}
            <div className="absolute bottom-full left-1/2 mb-2 hidden w-max -translate-x-1/2 rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100 z-50 pointer-events-none">
                {content}
                {/* Arrow */}
                <div className="absolute left-1/2 top-full -mt-1 h-2 w-2 -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
            </div>
        </div>
    );
};
