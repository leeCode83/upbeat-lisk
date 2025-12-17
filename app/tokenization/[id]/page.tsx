"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { GradientText } from "@/components/shared/GradientText";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Play, Pause, ArrowLeft, Share2, Heart, Clock, DollarSign, TrendingUp, Users, Wallet, Zap, Ticket, Vote, Gift } from "lucide-react";
import { useState, use, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { StreamingChart } from "@/components/charts/StreamingChart";
import { toast } from "sonner";

// Single Mock Token Data
const tokenData = {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    genre: "Pop",
    price: 50,
    roi: 12.5,
    funded: 75,
    image: "bg-gradient-to-br from-purple-500 to-pink-500",
    description: "A synth-pop anthem exploring the mysteries of the night. Luna Eclipse brings her signature ethereal vocals to a driving beat that's sure to be a summer hit.",
    releaseDate: "Oct 15, 2024",
    totalTokens: 10000,
    availableTokens: 2500,
    streamingHistory: [
        { month: "Jan", streams: 12000, spotify: 6000, youtube: 4000, apple: 2000 },
        { month: "Feb", streams: 15000, spotify: 7500, youtube: 5000, apple: 2500 },
        { month: "Mar", streams: 18000, spotify: 9000, youtube: 6000, apple: 3000 },
        { month: "Apr", streams: 22000, spotify: 11000, youtube: 7000, apple: 4000 },
        { month: "May", streams: 25000, spotify: 12500, youtube: 8000, apple: 4500 },
        { month: "Jun", streams: 30000, spotify: 15000, youtube: 10000, apple: 5000 },
        { month: "Jul", streams: 35000, spotify: 17500, youtube: 11500, apple: 6000 },
        { month: "Aug", streams: 38000, spotify: 19000, youtube: 12500, apple: 6500 },
        { month: "Sep", streams: 42000, spotify: 21000, youtube: 14000, apple: 7000 },
        { month: "Oct", streams: 45000, spotify: 22500, youtube: 15000, apple: 7500 },
        { month: "Nov", streams: 48000, spotify: 24000, youtube: 16000, apple: 8000 },
        { month: "Dec", streams: 52000, spotify: 26000, youtube: 17500, apple: 8500 },
    ],
    utilityHistory: [
        { id: 1, date: "2024-11-05", event: "VIP Backstage Access", type: "access", cost: 50, description: "Redeemed for backstage pass at Neon Lights Tour London." },
        { id: 2, date: "2024-10-20", event: "Album Cover Voter", type: "vote", cost: 0, description: "Card holders voted on the alternative album cover art." },
        { id: 3, date: "2024-09-15", event: "Exclusive Merch Drop", type: "merch", cost: 20, description: "Early access to limited edition signed vinyl." },
    ]
};

// Mock Orderbook Data
const mockOrderBook = {
    asks: [
        { price: 52.5, amount: 120, total: 6300 },
        { price: 52.0, amount: 80, total: 4160 },
        { price: 51.5, amount: 200, total: 10300 },
        { price: 51.0, amount: 50, total: 2550 },
        { price: 50.5, amount: 150, total: 7575 },
    ],
    bids: [
        { price: 50.0, amount: 150, total: 7500 },
        { price: 49.5, amount: 100, total: 4950 },
        { price: 49.0, amount: 300, total: 14700 },
        { price: 48.5, amount: 500, total: 24250 },
        { price: 48.0, amount: 250, total: 12000 },
    ]
};

export default function TokenDetail({ params }: { params: Promise<{ id: string }> }) {
    // We ignore the actual ID param for now as we only have one mock token
    const resolvedParams = use(params);
    const asset = tokenData;

    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const router = useRouter();
    const [amount, setAmount] = useState(10);
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeTab, setActiveTab] = useState("buy");

    // Recalculate cost based on input
    const totalCost = amount * asset.price;

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(asset.funded);
        }, 500);
        return () => clearTimeout(timer);
    }, [asset.funded]);

    const handleTrade = async () => {
        setIsProcessing(true);
        // Simulate API Processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsProcessing(false);

        // Use a simple random success/fail simulation for demonstration, 
        // or default to success as the previous code did, but with toast.
        // The user asked "jika berhasil ... hijau, dan merah jika gagal".
        // I'll default to success for now as it's a happy path demo.
        const success = true;

        if (success) {
            toast.success(`Market ${activeTab === 'buy' ? 'Buy' : 'Sell'} Order Filled`, {
                description: `Successfully ${activeTab === 'buy' ? 'bought' : 'sold'} ${amount} tokens for $${totalCost.toLocaleString()}`,
                style: {
                    background: '#09090b', // zinc-950
                    border: '1px solid #22c55e', // green-500
                    color: '#fff',
                },
            });
            // router.refresh();
        } else {
            toast.error("Transaction Failed", {
                description: "Could not place order. Please try again.",
                style: {
                    background: '#09090b',
                    border: '1px solid #ef4444', // red-500
                    color: '#fff',
                },
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            {/* <Navbar /> */}

            <main className="flex-grow container mx-auto px-4 py-8">
                <Link href="/tokenization" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Marketplace
                </Link>

                {/* Section 1: Token Details & Performance */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Left: Media & Key Actions */}
                    <div className="lg:col-span-1 space-y-6">
                        <GlassCard className="p-0 overflow-hidden">
                            <div className={`aspect-square ${asset.image} relative flex items-center justify-center`}>
                                <button
                                    onClick={() => setPlaying(!playing)}
                                    className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:scale-110 transition-all shadow-lg"
                                >
                                    {playing ? <Pause fill="white" size={32} /> : <Play fill="white" size={32} className="ml-1" />}
                                </button>
                                <Badge className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border-0 text-lg py-1 px-3">
                                    {asset.genre}
                                </Badge>
                            </div>
                            <div className="p-6">
                                <h1 className="text-3xl font-bold mb-1">{asset.title}</h1>
                                <p className="text-xl text-primary mb-4">{asset.artist}</p>

                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1 border-white/10 gap-2">
                                        <Heart size={18} /> Save
                                    </Button>
                                    <Button variant="outline" className="flex-1 border-white/10 gap-2">
                                        <Share2 size={18} /> Share
                                    </Button>
                                    <Button variant="outline" className="flex-1 border-white/10 gap-2">
                                        <Wallet size={18} /> Contract
                                    </Button>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Right: Info & Charts */}
                    <div className="lg:col-span-2 space-y-6">
                        <GlassCard>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                <div>
                                    <p className="text-muted-foreground mb-1">Current Token Price</p>
                                    <h2 className="text-4xl font-bold flex items-center gap-2">
                                        ${asset.price} <span className="text-sm font-normal text-muted-foreground">/ token</span>
                                    </h2>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                                        <TrendingUp size={14} className="mr-1" /> +{asset.roi}% ROI
                                    </Badge>
                                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                                        <Users size={14} className="mr-1" /> {asset.id * 123 + 50} Investors
                                    </Badge>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                <div className="bg-white/5 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                        <DollarSign size={16} />
                                        <span className="text-sm">Market Cap</span>
                                    </div>
                                    <p className="text-xl font-bold">${(asset.totalTokens * asset.price).toLocaleString('en-US')}</p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                        <Clock size={16} />
                                        <span className="text-sm">Royalty Term</span>
                                    </div>
                                    <p className="text-xl font-bold">Permanent</p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                        <TrendingUp size={16} />
                                        <span className="text-sm">Est. Annual Yield</span>
                                    </div>
                                    <p className="text-xl font-bold text-green-400">{asset.roi}%</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-bold mb-4">About the Track</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {asset.description}
                                </p>
                            </div>

                            {/* Fan Utility History */}
                            <div className="mb-6 pt-6 border-t border-white/10">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    Fan Utility History <Badge variant="outline" className="text-xs font-normal">Perks & Voting</Badge>
                                </h3>
                                <div className="space-y-3">
                                    {asset.utilityHistory.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors">
                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${item.type === 'access' ? 'bg-purple-500/20 text-purple-400' :
                                                    item.type === 'vote' ? 'bg-blue-500/20 text-blue-400' :
                                                        'bg-pink-500/20 text-pink-400'
                                                }`}>
                                                {item.type === 'access' && <Ticket size={18} />}
                                                {item.type === 'vote' && <Vote size={18} />}
                                                {item.type === 'merch' && <Gift size={18} />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-center mb-1">
                                                    <h4 className="font-semibold text-sm truncate">{item.event}</h4>
                                                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.date}</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                                            </div>
                                            {item.cost > 0 && (
                                                <div className="text-right shrink-0">
                                                    <Badge className="bg-white/10 hover:bg-white/20 whitespace-nowrap">
                                                        {item.cost} Tokens
                                                    </Badge>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold">Streaming Performance</h3>
                                    <div className="flex gap-4 text-xs">
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#1DB954]" /> Spotify</div>
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#FF0000]" /> YouTube</div>
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#FFFFFF]" /> Apple</div>
                                    </div>
                                </div>
                                <div className="h-64 w-full">
                                    <StreamingChart data={asset.streamingHistory} />
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>

                {/* Section 2: Trading Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Trade Form */}
                    <div className="lg:col-span-1">
                        <GlassCard className="h-full">
                            <Tabs defaultValue="buy" className="w-full" onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/5">
                                    <TabsTrigger
                                        value="buy"
                                        className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                                    >
                                        Buy
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="sell"
                                        className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                                    >
                                        Sell
                                    </TabsTrigger>
                                </TabsList>

                                <div className="space-y-6">
                                    {/* Market Order Indicator */}
                                    <div className="flex items-center gap-2 mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20 text-primary">
                                        <Zap size={16} fill="currentColor" />
                                        <span className="text-sm font-bold">Market Mode Active</span>
                                        <span className="ml-auto text-xs opacity-70">Best available price</span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="price">Current Market Price (USDT)</Label>
                                            <div className="relative">
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    value={asset.price}
                                                    disabled
                                                    className="bg-white/5 border-white/10 pr-12 font-bold opacity-80"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">USDT</span>
                                            </div>
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="amount">Amount</Label>
                                            <div className="relative">
                                                <Input
                                                    id="amount"
                                                    type="number"
                                                    value={amount}
                                                    onChange={(e) => setAmount(Number(e.target.value))}
                                                    className="bg-white/5 border-white/10 pr-12"
                                                    min={1}
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">Tokens</span>
                                            </div>
                                        </div>

                                        <div className="grid gap-2">
                                            <div className="flex justify-between text-xs text-muted-foreground mb-2">
                                                <span>0%</span>
                                                <span>25%</span>
                                                <span>50%</span>
                                                <span>75%</span>
                                                <span>100%</span>
                                            </div>
                                            <Slider
                                                value={[amount]}
                                                min={0}
                                                max={asset.availableTokens}
                                                step={1}
                                                onValueChange={(vals) => setAmount(vals[0])}
                                                className="py-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-lg space-y-2 mt-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Available Balance</span>
                                            <span>1,000.00 USDT</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Est. Fee</span>
                                            <span>$2.00</span>
                                        </div>
                                        <div className="border-t border-white/10 my-2 pt-2 flex justify-between font-bold">
                                            <span>Total (Est.)</span>
                                            <span>${totalCost.toLocaleString()} USDT</span>
                                        </div>
                                    </div>

                                    <Button
                                        className={`w-full h-12 text-lg font-bold ${activeTab === 'buy'
                                                ? 'bg-green-500 hover:bg-green-600'
                                                : 'bg-red-500 hover:bg-red-600'
                                            }`}
                                        onClick={handleTrade}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? "Processing..." : `${activeTab === 'buy' ? 'Market Buy' : 'Market Sell'} Now`}
                                    </Button>
                                </div>
                            </Tabs>
                        </GlassCard>
                    </div>

                    {/* Order Book */}
                    <div className="lg:col-span-2">
                        <GlassCard className="h-full">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg">Order Book</h3>
                                <div className="flex gap-2">
                                    <div className="text-sm text-muted-foreground">Spread: <span className="text-foreground">0.5</span></div>
                                </div>
                            </div>

                            {/* Asks (Sellers) */}
                            <div className="mb-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-white/10 hover:bg-transparent">
                                            <TableHead className="text-left w-1/3">Price (USDT)</TableHead>
                                            <TableHead className="text-right w-1/3">Amount</TableHead>
                                            <TableHead className="text-right w-1/3">Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mockOrderBook.asks.map((ask, i) => (
                                            <TableRow key={i} className="border-0 hover:bg-white/5">
                                                <TableCell className="text-red-400 font-mono py-1">{ask.price.toFixed(2)}</TableCell>
                                                <TableCell className="text-right font-mono py-1">{ask.amount}</TableCell>
                                                <TableCell className="text-right font-mono py-1 text-muted-foreground">{ask.total.toLocaleString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Current Price Indicator */}
                            <div className="py-3 px-4 my-2 bg-white/5 rounded flex justify-between items-center">
                                <span className={`text-xl font-bold ${asset.roi > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    ${asset.price.toFixed(2)}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    ≈ ${asset.price.toFixed(2)} USD
                                </span>
                            </div>

                            {/* Bids (Buyers) */}
                            <div>
                                <Table>
                                    <TableBody>
                                        {mockOrderBook.bids.map((bid, i) => (
                                            <TableRow key={i} className="border-0 hover:bg-white/5">
                                                <TableCell className="text-green-400 font-mono py-1 w-1/3">{bid.price.toFixed(2)}</TableCell>
                                                <TableCell className="text-right font-mono py-1 w-1/3">{bid.amount}</TableCell>
                                                <TableCell className="text-right font-mono py-1 w-1/3 text-muted-foreground">{bid.total.toLocaleString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
