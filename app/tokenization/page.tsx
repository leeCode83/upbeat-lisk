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
import { usePlatform } from "@/hooks/usePlatform";
import { useReadContracts } from "wagmi";
import { TOKEN_ABI, Listing } from "@/lib/contracts"; // Added Listing import
import { formatUnits } from "viem";

// mockAssets removed


export default function Tokenization() {
    const router = useRouter();
    const { useGetAllListings } = usePlatform();
    const { data: listings, isLoading: isListingsLoading } = useGetAllListings();

    const activeListings = listings?.filter((l: Listing) => l.active) || [];

    // Fetch token details for all active listings
    const { data: tokenData, isLoading: isTokenDataLoading } = useReadContracts({
        contracts: activeListings.map((listing) => ({
            address: listing.tokenAddress as `0x${string}`,
            abi: TOKEN_ABI,
            functionName: "name",
        })),
    });

    const isLoading = isListingsLoading || isTokenDataLoading;

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
                                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Amount Available</th>
                                    <th className="p-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-muted-foreground">
                                            Loading listings...
                                        </td>
                                    </tr>
                                ) : activeListings && activeListings.length > 0 ? (
                                    activeListings.map((listing: Listing, index: number) => {
                                        const tokenName = tokenData?.[index]?.result as string || "Unknown Token";

                                        return (
                                            <motion.tr
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                                                className="border-b border-white/5 cursor-pointer relative"
                                                onClick={() => router.push(`/tokenization/${index}`)}
                                            >
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold`}>
                                                            {tokenName[0]}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{tokenName}</div>
                                                            <div className="text-xs text-muted-foreground truncate max-w-[150px]">{listing.tokenAddress}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-right font-medium">
                                                    ${formatUnits(listing.pricePerToken as unknown as bigint, 6)} USDC
                                                </td>
                                                <td className="p-4 text-right font-medium">
                                                    {formatUnits(listing.amount as unknown as bigint, 18)}
                                                </td>
                                                <td className="p-4 text-right">
                                                    <Button asChild variant="ghost" size="sm">
                                                        <Link href={`/tokenization/${index}`} onClick={(e) => e.stopPropagation()}>Detail</Link>
                                                    </Button>
                                                </td>
                                            </motion.tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-muted-foreground">
                                            No tokens listed yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>
            </main>
            <Footer />
        </div>
    );
}
