"use client";

import { Footer } from "@/components/layout/Footer";
import { MasterRecordingList } from "@/components/sync-catalog/MasterRecordingList";
import { SearchBar } from "@/components/sync-catalog/SearchBar";
import { TopMusicCarousel } from "@/components/sync-catalog/TopMusicCarousel";
import { useState } from "react";

export default function SyncCatalog() {
    const [activeSection, setActiveSection] = useState("Featured Tracks");
    const [activeCategory, setActiveCategory] = useState("All Genres");

    const categories = ["All Genres", "Vocals", "Instrumental", "Moods", "Acoustic", "Electronic"];

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <main className="flex-grow pt-8">
                {/* Search & Filter Section */}
                <section className="container mx-auto px-4 sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/5 pb-2">
                    <SearchBar />
                </section>

                {/* Top Music Carousel Section */}
                <section className="container mx-auto px-4 mt-6">
                    <div className="flex items-center gap-4 mb-4">
                        {["Featured Tracks", "New Arrivals"].map((section) => (
                            <h2
                                key={section}
                                onClick={() => setActiveSection(section)}
                                className={`text-xl font-bold pb-1 cursor-pointer transition-colors ${activeSection === section
                                        ? "border-b-2 border-primary text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {section}
                            </h2>
                        ))}
                    </div>
                    <TopMusicCarousel />
                </section>

                {/* Song List / Leaderboard Section */}
                <section className="container mx-auto px-4 mt-8 pb-20">
                    <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === category
                                        ? "bg-white/10 text-white"
                                        : "hover:bg-white/5 text-muted-foreground hover:text-white"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <MasterRecordingList />
                </section>
            </main>
            <Footer />
        </div>
    );
}
