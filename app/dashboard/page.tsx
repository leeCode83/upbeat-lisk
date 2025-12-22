"use client";

import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { GradientText } from "@/components/shared/GradientText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, Disc, DollarSign, Music, Wallet } from "lucide-react";

import { usePlatform } from "@/hooks/usePlatform";
import { RevenueClaimDialog } from "@/components/dashboard/RevenueClaimDialog";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { formatUnits } from "viem";

export default function Dashboard() {
    const { getUserPortfolio, getUserActivity } = usePlatform();
    const { address } = useAccount();
    const [portfolio, setPortfolio] = useState<any[]>([]);
    const [activity, setActivity] = useState<any[]>([]);
    const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(false);

    useEffect(() => {
        if (address) {
            setIsLoadingPortfolio(true);
            getUserPortfolio(address).then(data => {
                setPortfolio(data);
                setIsLoadingPortfolio(false);
            });
            getUserActivity(address).then(data => {
                setActivity(data);
            });
        }
    }, [address]);
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            {/* <Navbar /> */}

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Welcome back, <GradientText>Alex</GradientText>
                        </h1>
                        <p className="text-muted-foreground">Here's what's happening with your portfolio today.</p>
                    </div>
                    <div className="flex gap-3">

                        <Button variant="outline" className="border-white/10">Withdraw</Button>
                        <Button className="bg-primary hover:bg-primary/90">Deposit Funds</Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <GlassCard>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                <Wallet size={20} />
                            </div>
                            <span className="text-xs font-medium text-green-400 flex items-center">
                                +12.5% <ArrowUpRight size={12} className="ml-1" />
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
                        <h3 className="text-2xl font-bold">12,450.00 USDC</h3>
                    </GlassCard>

                    <GlassCard>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-secondary/20 rounded-lg text-secondary">
                                <Music size={20} />
                            </div>
                            <span className="text-xs font-medium text-green-400 flex items-center">
                                +5.2% <ArrowUpRight size={12} className="ml-1" />
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">Token Value</p>
                        <h3 className="text-2xl font-bold">$8,230.50</h3>
                    </GlassCard>

                    <GlassCard>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-accent/20 rounded-lg text-accent">
                                <DollarSign size={20} />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">
                                Last 30 days
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                        <h3 className="text-2xl font-bold">$450.25</h3>
                    </GlassCard>

                    <GlassCard>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-pink-500/20 rounded-lg text-pink-500">
                                <Disc size={20} />
                            </div>
                            <span className="text-xs font-medium text-green-400 flex items-center">
                                +8.5% <ArrowUpRight size={12} className="ml-1" />
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">Tokenized Works</p>
                        <h3 className="text-2xl font-bold">10</h3>
                    </GlassCard>


                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="portfolio" className="space-y-6">
                    <TabsList className="bg-white/5 border border-white/10 p-1">
                        <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
                        <TabsTrigger value="tokenize">My Tokenize</TabsTrigger>
                        <TabsTrigger value="activity">Activity</TabsTrigger>
                    </TabsList>

                    <TabsContent value="tokenize" className="space-y-8">
                        {/* Section 0: Pending Tokenization */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
                                    Pending Tokenization
                                </h3>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { id: 0, title: "Lost in Echoes", stage: "Minting Policy ID", progress: 75, date: "2024-12-19" },
                                    { id: 1, title: "Solar Flares", stage: "Metadata Verification", progress: 40, date: "2024-12-18" }
                                ].map((item) => (
                                    <GlassCard key={item.id} className="flex items-center gap-4 p-4 border-l-4 border-l-yellow-500">
                                        <div className="h-12 w-12 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                                            <Disc size={24} className="animate-spin-slow" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-1">
                                                <div>
                                                    <div className="font-bold">{item.title}</div>
                                                    <div className="text-xs text-muted-foreground">Started: {item.date}</div>
                                                </div>
                                                <span className="text-xs font-medium text-yellow-500 px-2 py-1 bg-yellow-500/10 rounded-full">
                                                    {item.stage}
                                                </span>
                                            </div>
                                            <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                                                <div
                                                    className="bg-yellow-500 h-1.5 rounded-full transition-all duration-1000"
                                                    style={{ width: `${item.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </div>

                        {/* Section 1: Tokenized User Songs */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Disc size={20} className="text-pink-500" />
                                    Your Tokenized Songs
                                </h3>
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                    View All
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    { id: 101, title: "Midnight Dreams", ticker: "MND", price: 50.00, change: 12.5, image: "bg-gradient-to-br from-purple-500 to-pink-500" },
                                    { id: 102, title: "Neon City Lights", ticker: "NCL", price: 35.00, change: -2.4, image: "bg-gradient-to-br from-fuchsia-600 to-purple-600" },
                                    { id: 103, title: "Cyber Punk 2077", ticker: "CPK", price: 85.00, change: 15.4, image: "bg-gradient-to-br from-pink-500 to-rose-600" }
                                ].map((item) => (
                                    <GlassCard key={item.id} className="p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className={`h-10 w-10 rounded-full ${item.image} flex items-center justify-center text-xs font-bold shadow-lg`}>
                                                {item.ticker[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold group-hover:text-primary transition-colors">{item.title}</div>
                                                <div className="text-xs text-muted-foreground">{item.ticker}</div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <div className="text-xs text-muted-foreground mb-1">Current Price</div>
                                                <div className="font-bold">${item.price.toFixed(2)}</div>
                                            </div>
                                            <div className={`text-xs font-medium ${item.change >= 0 ? 'text-green-400' : 'text-red-400'} flex items-center`}>
                                                {item.change >= 0 ? '+' : ''}{item.change}%
                                                {item.change >= 0 ? <ArrowUpRight size={12} className="ml-1" /> : null}
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="portfolio" className="space-y-8">

                        {/* Section 2: Purchased Tokens */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Wallet size={20} className="text-green-400" />
                                    Purchased Tokens
                                </h3>
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                    View All
                                </Button>
                            </div>
                            <div className="overflow-x-auto rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                                <table className="w-full text-sm">
                                    <thead className="bg-white/5 text-muted-foreground text-left">
                                        <tr>
                                            <th className="p-3 font-medium">Token</th>
                                            <th className="p-3 font-medium text-right">Balance</th>
                                            <th className="p-3 font-medium text-right">Value (USDC)</th>
                                            <th className="p-3 font-medium text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoadingPortfolio ? (
                                            <tr>
                                                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                                                    Loading portfolio...
                                                </td>
                                            </tr>
                                        ) : portfolio.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                                                    You don't own any tokens yet.
                                                </td>
                                            </tr>
                                        ) : (
                                            portfolio.map((token: any) => {
                                                // Calculate Value: (Balance * Price) / 1e18 (to adjust for token decimals)
                                                // Result is in USDC decimals (6)
                                                const value = (BigInt(token.balance) * BigInt(token.price)) / (BigInt(10) ** BigInt(18));

                                                return (
                                                    <tr key={token.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                                        <td className="p-3">
                                                            <div className="font-medium">{token.name}</div>
                                                            <div className="text-xs text-muted-foreground">{token.symbol}</div>
                                                        </td>
                                                        <td className="p-3 text-right">
                                                            {Number(formatUnits(token.balance, 18)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                        </td>
                                                        <td className="p-3 text-right font-medium">
                                                            ${Number(formatUnits(value, 6)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </td>
                                                        <td className="p-3 text-right">
                                                            <RevenueClaimDialog
                                                                tokenAddress={token.tokenAddress}
                                                                tokenSymbol={token.symbol}
                                                                tokenName={token.name}
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Section 3: Owned License NFTs */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Music size={20} className="text-blue-400" />
                                    Owned Licenses
                                </h3>
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                    View All
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { id: 301, track: "Summer Vibes", type: "Commercial Use", user: "BeatMaster", date: "2024-12-10" },
                                    { id: 302, track: "Corporate Motivation", type: "Sync License", user: "MelodyMaker", date: "2024-11-25" }
                                ].map((license) => (
                                    <div key={license.id} className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0 flex items-center justify-center">
                                            <Music size={24} className="text-white" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="font-bold text-lg">{license.track}</div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-xs">{license.type}</span>
                                                <span>• {license.date}</span>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="outline" className="border-white/10">View</Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>



                    <TabsContent value="activity">
                        <GlassCard>
                            <div className="space-y-4">
                                {activity.length === 0 ? (
                                    <div className="text-center text-muted-foreground py-8">
                                        No recent activity found.
                                    </div>
                                ) : (
                                    activity.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                                                    {item.type === "Created Token" && <Disc size={16} className="text-pink-500" />}
                                                    {item.type === "Listed Token" && <DollarSign size={16} className="text-yellow-500" />}
                                                    {item.type === "Bought Token" && <Wallet size={16} className="text-green-500" />}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{item.description}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Block: {Number(item.blockNumber)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                {item.value && (
                                                    <span className="font-bold text-green-400 block">
                                                        {item.type === "Bought Token" ? "-" : "+"}${Number(formatUnits(item.value, 6)).toLocaleString()}
                                                    </span>
                                                )}
                                                {item.amount && (
                                                    <span className="text-xs text-muted-foreground">
                                                        {Number(formatUnits(item.amount, 18)).toLocaleString()} Tokens
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </GlassCard>
                    </TabsContent>
                </Tabs>
            </main>
            <Footer />
        </div>
    );
}
