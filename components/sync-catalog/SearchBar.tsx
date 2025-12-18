"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SearchBar() {
    const [activeFilter, setActiveFilter] = useState("Trending");
    const [activeSort, setActiveSort] = useState("Newest");

    const filters = ["Trending", "Cinematic", "Pop", "Lo-Fi"];
    const sorts = ["Newest", "Price: Low to High", "Price: High to Low"];

    return (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full max-w-7xl mx-auto py-6">
            <div className="flex gap-2 mr-auto">
                {filters.map((filter) => (
                    <Button
                        key={filter}
                        variant={activeFilter === filter ? "secondary" : "ghost"}
                        className={`rounded-full px-6 font-medium border-none transition-all ${activeFilter === filter
                                ? "bg-white/10 hover:bg-white/20 text-white"
                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                            }`}
                        onClick={() => setActiveFilter(filter)}
                    >
                        {filter}
                    </Button>
                ))}
            </div>

            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search tracks, artists, or genres..."
                    className="pl-10 bg-black/20 border-white/10 rounded-full text-sm focus-visible:ring-primary/50"
                />
            </div>

            <div className="flex gap-2 items-center">
                <div className="flex bg-black/20 rounded-lg p-1 border border-white/5">
                    {sorts.map((sort) => (
                        <button
                            key={sort}
                            className={`px-3 py-1 text-xs font-medium rounded transition-all ${activeSort === sort
                                    ? "bg-white/10 text-white"
                                    : "text-muted-foreground hover:text-white"
                                }`}
                            onClick={() => setActiveSort(sort)}
                        >
                            {sort}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
