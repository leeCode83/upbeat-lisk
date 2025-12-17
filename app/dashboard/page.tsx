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

export default function Dashboard() {
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
                        <h3 className="text-2xl font-bold">$12,450.00</h3>
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

                        <TabsTrigger value="activity">Activity</TabsTrigger>
                    </TabsList>

                    <TabsContent value="portfolio" className="space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Your Assets</h2>
                            <div className="flex gap-2">
                                <Input placeholder="Search assets..." className="w-64 bg-white/5 border-white/10" />
                            </div>
                        </div>

                        <GlassCard className="p-0 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-white/5 border-b border-white/10">
                                        <tr>
                                            <th className="text-left p-4 text-sm font-medium text-muted-foreground">Asset</th>
                                            <th className="text-right p-4 text-sm font-medium text-muted-foreground">Price</th>
                                            <th className="text-right p-4 text-sm font-medium text-muted-foreground">24h Change</th>
                                            <th className="text-right p-4 text-sm font-medium text-muted-foreground">Market Cap</th>
                                            <th className="p-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            {
                                                id: 1,
                                                name: "Midnight Dreams",
                                                ticker: "MND",
                                                price: 50.00,
                                                marketCap: 500000,
                                                change24h: 12.5,
                                                image: "bg-gradient-to-br from-purple-500 to-pink-500"
                                            },
                                            {
                                                id: 2,
                                                name: "Neon City Lights",
                                                ticker: "NCL",
                                                price: 35.00,
                                                marketCap: 350000,
                                                change24h: -2.4,
                                                image: "bg-gradient-to-br from-fuchsia-600 to-purple-600"
                                            },
                                            {
                                                id: 3,
                                                name: "Acoustic Soul",
                                                ticker: "ACS",
                                                price: 25.00,
                                                marketCap: 250000,
                                                change24h: 5.8,
                                                image: "bg-gradient-to-br from-pink-500 to-rose-500"
                                            },
                                            {
                                                id: 4,
                                                name: "Electric Horizon",
                                                ticker: "ELH",
                                                price: 42.50,
                                                marketCap: 425000,
                                                change24h: 8.2,
                                                image: "bg-gradient-to-br from-purple-400 to-pink-400"
                                            },
                                            {
                                                id: 5,
                                                name: "Jazz Cafe",
                                                ticker: "JZC",
                                                price: 60.00,
                                                marketCap: 600000,
                                                change24h: 1.5,
                                                image: "bg-gradient-to-br from-rose-400 to-pink-600"
                                            },
                                            {
                                                id: 6,
                                                name: "Lo-Fi Study Beats",
                                                ticker: "LFS",
                                                price: 18.75,
                                                marketCap: 187500,
                                                change24h: -0.8,
                                                image: "bg-gradient-to-br from-purple-300 to-pink-300"
                                            },
                                            {
                                                id: 7,
                                                name: "Cyber Punk 2077",
                                                ticker: "CPK",
                                                price: 85.00,
                                                marketCap: 850000,
                                                change24h: 15.4,
                                                image: "bg-gradient-to-br from-pink-500 to-rose-600"
                                            },
                                            {
                                                id: 8,
                                                name: "Classical Symphony",
                                                ticker: "CLS",
                                                price: 120.00,
                                                marketCap: 1200000,
                                                change24h: 3.2,
                                                image: "bg-gradient-to-br from-purple-800 to-fuchsia-900"
                                            },
                                            {
                                                id: 9,
                                                name: "Hip Hop Flow",
                                                ticker: "HHF",
                                                price: 55.50,
                                                marketCap: 555000,
                                                change24h: 6.7,
                                                image: "bg-gradient-to-br from-rose-500 to-pink-600"
                                            },
                                            {
                                                id: 10,
                                                name: "Ambient Soundscapes",
                                                ticker: "AMB",
                                                price: 22.00,
                                                marketCap: 220000,
                                                change24h: -1.2,
                                                image: "bg-gradient-to-br from-purple-400 to-pink-500"
                                            }
                                        ].map((item) => (
                                            <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`h-10 w-10 rounded-full ${item.image} flex items-center justify-center text-xs font-bold`}>
                                                            {item.ticker[0]}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{item.name}</div>
                                                            <div className="text-xs text-muted-foreground">{item.ticker}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-right font-medium">
                                                    ${item.price.toFixed(2)}
                                                </td>
                                                <td className={`p-4 text-right font-medium ${item.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {item.change24h >= 0 ? '+' : ''}{item.change24h}%
                                                </td>
                                                <td className="p-4 text-right text-muted-foreground">
                                                    ${item.marketCap.toLocaleString('en-US')}
                                                </td>
                                                <td className="p-4 text-right">
                                                    <Button asChild variant="ghost" size="sm">
                                                        <Link href={`/tokenization/${item.id}`}>Detail</Link>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </GlassCard>
                    </TabsContent>



                    <TabsContent value="activity">
                        <GlassCard>
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                                                <DollarSign size={16} />
                                            </div>
                                            <div>
                                                <p className="font-medium">Revenue Distribution</p>
                                                <p className="text-xs text-muted-foreground">Midnight Dreams - Oct 2024</p>
                                            </div>
                                        </div>
                                        <span className="font-bold text-green-400">+$45.20</span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </TabsContent>
                </Tabs>
            </main>
            <Footer />
        </div>
    );
}
