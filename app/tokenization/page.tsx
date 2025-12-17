"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { GlassCard } from "@/components/shared/GlassCard";
import { GradientText } from "@/components/shared/GradientText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Play, Pause } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const mockAssets = [
    {
        id: 1,
        title: "Midnight Dreams",
        artist: "Luna Eclipse",
        genre: "Pop",
        price: 50,
        roi: 12.5,
        change24h: 2.5,
        funded: 75,
        image: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
        id: 2,
        title: "Neon City Lights",
        artist: "The Cyberpunks",
        genre: "Electronic",
        price: 35,
        roi: 15.2,
        change24h: -1.2,
        funded: 40,
        image: "bg-gradient-to-br from-fuchsia-600 to-purple-600",
    },
    {
        id: 3,
        title: "Acoustic Soul",
        artist: "Sarah Jenkins",
        genre: "Indie",
        price: 25,
        roi: 8.5,
        change24h: 0.8,
        funded: 90,
        image: "bg-gradient-to-br from-pink-500 to-rose-500",
    },
    {
        id: 4,
        title: "Heavy Metal Thunder",
        artist: "Iron Forge",
        genre: "Rock",
        price: 45,
        roi: 11.0,
        change24h: 3.4,
        funded: 20,
        image: "bg-gradient-to-br from-purple-900 to-fuchsia-900",
    },
    {
        id: 5,
        title: "Jazz Cafe",
        artist: "Blue Note Quartet",
        genre: "Jazz",
        price: 60,
        roi: 9.8,
        change24h: -0.5,
        funded: 60,
        image: "bg-gradient-to-br from-rose-400 to-pink-600",
    },
    {
        id: 6,
        title: "Summer Vibes",
        artist: "DJ Sunny",
        genre: "House",
        price: 40,
        roi: 13.5,
        change24h: 1.2,
        funded: 10,
        image: "bg-gradient-to-br from-purple-400 to-pink-300",
    },
];

export default function Tokenization() {
    const [playing, setPlaying] = useState<number | null>(null);
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            {/* <Navbar /> */}

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        Invest in the <GradientText>Next Big Hit</GradientText>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Discover rising artists, buy royalty tokens, and earn passive income from streaming revenue.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <Input placeholder="Search artists, songs, or genres..." className="pl-10 bg-white/5 border-white/10" />
                    </div>
                    <Button variant="outline" className="border-white/10 gap-2">
                        <Filter size={20} /> Filters
                    </Button>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {["All", "Pop", "Electronic", "Rock", "Hip-Hop", "Jazz"].map((genre) => (
                            <Badge key={genre} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white transition-colors px-4 py-2">
                                {genre}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Assets Grid */}
                {/* Assets List */}
                <GlassCard className="p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Asset</th>
                                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Price</th>
                                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Movement</th>
                                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">ROI</th>
                                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Funded</th>
                                    <th className="p-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockAssets.map((asset, index) => (
                                    <motion.tr
                                        key={asset.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                                        className="border-b border-white/5 cursor-pointer relative"
                                        onClick={() => router.push(`/tokenization/${asset.id}`)}
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-10 w-10 rounded-full ${asset.image} flex items-center justify-center text-xs font-bold`}>
                                                    {asset.title[0]}
                                                </div>
                                                <div>
                                                    <div className="font-bold">{asset.title}</div>
                                                    <div className="text-xs text-muted-foreground">{asset.artist}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right font-medium">
                                            ${asset.price.toFixed(2)}
                                        </td>
                                        <td className={`p-4 text-right font-medium ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                                        </td>
                                        <td className="p-4 text-right text-green-400 font-medium">
                                            {asset.roi}%
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <span className="text-sm font-medium">{asset.funded}%</span>
                                                <Progress value={asset.funded} className="h-1.5 w-16" />
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            {/* Stop propagation so clicking the button doesn't trigger the row click twice if wired up, though here it's fine. 
                                                Actually, adding Link back makes the button work independently even if row fails. */}
                                            <Button asChild variant="ghost" size="sm">
                                                <Link href={`/tokenization/${asset.id}`} onClick={(e) => e.stopPropagation()}>Detail</Link>
                                            </Button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>
            </main>
            <Footer />
        </div>
    );
}
