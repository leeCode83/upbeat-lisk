"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Star, Music } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const topMusicData = [
    {
        id: 1,
        title: "Midnight Drive",
        artist: "Neon Systems",
        price: "$500",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500",
        color: "from-purple-500/20 to-blue-500/20",
        featured: true,
        genre: "Synthwave"
    },
    {
        id: 2,
        title: "Ethereal Dreams",
        artist: "Luna Skies",
        price: "$350",
        image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=500",
        color: "from-pink-500/20 to-purple-500/20",
        featured: true,
        genre: "Ambient"
    },
    {
        id: 3,
        title: "Urban Pulse",
        artist: "Metro Beats",
        price: "$750",
        image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=500",
        color: "from-blue-500/20 to-cyan-500/20",
        featured: true,
        genre: "Hip Hop"
    },
    {
        id: 4,
        title: "Cinematic Horizons",
        artist: "Orchestra One",
        price: "$1,200",
        image: "/images/cinematic-horizons.png",
        color: "from-indigo-500/20 to-blue-500/20",
        featured: true,
        genre: "Orchestral"
    },
    {
        id: 5,
        title: "Summer Vibes",
        artist: "Coastal Kids",
        price: "$400",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=500",
        color: "from-green-500/20 to-emerald-500/20",
        featured: true,
        genre: "Pop"
    },
];

export function TopMusicCarousel() {
    return (
        <div className="w-full py-8">
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 3000,
                    }),
                ]}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {topMusicData.map((item) => (
                        <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/4 xl:basis-1/4">
                            <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors">
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-30 group-hover:opacity-50 transition-opacity`} />

                                <div className="relative aspect-square overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {item.featured && (
                                        <div className="absolute top-3 left-3 bg-yellow-500/90 text-black text-xs font-bold px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm">
                                            <Star size={10} fill="currentColor" />
                                            Featured
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 relative z-10 bg-gradient-to-t from-black/90 to-transparent pt-10 -mt-10">
                                    <h3 className="font-bold text-lg leading-tight mb-1">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground flex items-center justify-between">
                                        <span className="flex items-center gap-1"><Music size={12} /> {item.artist}</span>
                                        <span className="font-bold text-white">{item.price}</span>
                                    </p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
