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
import { Search, Filter, Play, Pause, Music2, DollarSign, Activity, Layers } from "lucide-react";
import { useState } from "react";

const stats = [
    { label: "Listed Tokens", value: "1,245", icon: Music2, color: "text-blue-400" },
    { label: "Total Market Cap", value: "$45.2M", icon: DollarSign, color: "text-green-400" },
    { label: "24h Volume", value: "$1.2M", icon: Activity, color: "text-purple-400" },
    { label: "Onboarding", value: "15", icon: Layers, color: "text-pink-400" },
];
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

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-12 relative">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative flex items-center bg-zinc-900 rounded-lg">
                            <Search className="absolute left-4 text-zinc-400 group-hover:text-white transition-colors" size={24} />
                            <Input
                                placeholder="Search for your favorite artists, tracks, or investment opportunities..."
                                className="w-full h-14 pl-12 pr-4 bg-transparent border-0 ring-0 focus-visible:ring-0 text-lg placeholder:text-zinc-500 text-white"
                            />
                            <div className="absolute right-2">
                                <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white font-medium rounded-md h-10 px-6">
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Platform Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-7xl mx-auto">
                    {stats.map((stat, index) => (
                        <GlassCard key={index} className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-full bg-white/5 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                        </GlassCard>
                    ))}
                </div>

                {/* Assets Grid */}
                {/* Assets List */}
                <GlassCard className="p-0 overflow-hidden max-w-7xl mx-auto">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Asset</th>
                                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Price</th>
                                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Movement</th>
                                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">ROI</th>
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
