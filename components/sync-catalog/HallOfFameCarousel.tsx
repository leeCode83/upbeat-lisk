"use client";

import { GlassCard } from "@/components/shared/GlassCard";
import { Trophy, Music } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Timeline, set } from "animejs";

const hallOfFameData = [
    {
        id: 1,
        title: "Neon Lights",
        artist: "Cyber Punk",
        licenses: 150,
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmVvbiUyMG5pZ2h0fGVufDB8fDB8fHww",
    },
    {
        id: 2,
        title: "Urban Flow",
        artist: "Street Beats",
        licenses: 120,
        image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
        id: 3,
        title: "Cosmic Journey",
        artist: "Star Walker",
        licenses: 95,
        image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29zbWljfGVufDB8fDB8fHww",
    },
];

export function HallOfFameCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Reset opacity/transform before animating
        set(".hof-card", { opacity: 0, translateY: 100 });

        const timeline = new Timeline();

        timeline
            .add(".hof-card-2", { // 2nd place (left)
                opacity: [0, 1],
                translateY: [100, 0],
                duration: 1000,
                delay: 200,
                easing: "easeOutElastic(1, .6)",
            })
            .add(".hof-card-3", { // 3rd place (right)
                opacity: [0, 1],
                translateY: [100, 0],
                duration: 1000,
                easing: "easeOutElastic(1, .6)",
            }, "-=800")
            .add(".hof-card-1", { // 1st place (center)
                opacity: [0, 1],
                translateY: [150, 0], // Comes from further down
                scale: [0.8, 1.1, 1], // Pop effect
                duration: 1200,
                easing: "easeOutElastic(1, .6)",
            }, "-=800");

    }, []);

    // Reorder for podium: 2nd, 1st, 3rd
    const podiumOrder = [hallOfFameData[1], hallOfFameData[0], hallOfFameData[2]];

    return (
        <div className="w-full py-20 relative overflow-hidden" ref={containerRef}>
            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="text-center mb-16 relative z-10">
                <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10 mb-4">
                    <Trophy className="text-yellow-400 w-5 h-5" />
                    <span className="text-sm font-medium tracking-wider uppercase text-yellow-400">Top Performers</span>
                </div>
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
                    Hall of Fame
                </h2>
            </div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-4 lg:gap-8 h-[500px] md:h-auto">
                    {podiumOrder.map((item, index) => {
                        // Determine rank based on original data index
                        const rank = item.id; // 1, 2, or 3
                        let podiumClass = "";
                        let heightClass = "";
                        let orderClass = "";
                        let colorClass = "";

                        if (rank === 1) {
                            podiumClass = "hof-card-1 z-20 md:-mt-12 mb-12 md:mb-0 order-1 md:order-2";
                            heightClass = "md:w-[380px] md:h-[480px]";
                            colorClass = "text-yellow-400 border-yellow-400/50 shadow-[0_0_30px_-5px_rgba(250,204,21,0.3)]";
                        } else if (rank === 2) {
                            podiumClass = "hof-card-2 z-10 order-2 md:order-1";
                            heightClass = "md:w-[320px] md:h-[400px]";
                            colorClass = "text-gray-300 border-gray-300/50";
                        } else {
                            podiumClass = "hof-card-3 z-10 order-3 md:order-3";
                            heightClass = "md:w-[320px] md:h-[400px]";
                            colorClass = "text-amber-700 border-amber-700/50";
                        }

                        return (
                            <div key={item.id} className={`hof-card ${podiumClass} relative group w-full max-w-[320px] md:max-w-none`}>
                                <GlassCard
                                    className={`h-full flex flex-col relative overflow-hidden transition-all duration-300 ${rank === 1 ? 'border-primary/50' : ''}`}
                                    hoverEffect={false} // We'll handle hover manually or via CSS
                                >
                                    {/* Rank Badge */}
                                    <div className={`absolute top-4 left-4 z-20 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg bg-black/60 backdrop-blur-md border ${colorClass}`}>
                                        {rank}
                                    </div>

                                    {/* Image */}
                                    <div className={`relative w-full ${rank === 1 ? 'h-64' : 'h-48'} overflow-hidden rounded-t-xl`}>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-grow flex flex-col justify-end relative">
                                        <h3 className={`font-bold ${rank === 1 ? 'text-2xl' : 'text-xl'} mb-1`}>{item.title}</h3>
                                        <p className="text-muted-foreground mb-4 flex items-center gap-2">
                                            <Music size={14} />
                                            {item.artist}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                                            <span className="text-xs uppercase tracking-wider text-muted-foreground">Total Licenses</span>
                                            <span className={`font-bold text-xl ${rank === 1 ? 'text-primary' : 'text-white'}`}>
                                                {item.licenses}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Glow Effect for #1 */}
                                    {rank === 1 && (
                                        <div className="absolute inset-0 border-2 border-primary/30 rounded-xl pointer-events-none animate-pulse" />
                                    )}
                                </GlassCard>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
