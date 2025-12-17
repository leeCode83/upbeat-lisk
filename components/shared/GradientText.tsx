import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    className?: string;
}

export function GradientText({ children, className, ...props }: GradientTextProps) {
    return (
        <span
            className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 animate-gradient-x",
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
