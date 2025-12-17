import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6",
                hoverEffect && "transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
