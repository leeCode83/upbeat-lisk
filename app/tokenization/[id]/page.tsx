"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { GradientText } from "@/components/shared/GradientText";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, ArrowLeft, Share2, Heart, Clock, DollarSign, TrendingUp, Users } from "lucide-react";
import { useState, use, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { StreamingChart } from "@/components/charts/StreamingChart";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

// Mock data - in a real app this would come from an API or context
const mockAssets = [
    {
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
        ]
    },
    {
        id: 2,
        title: "Neon City Lights",
        artist: "The Cyberpunks",
        genre: "Electronic",
        price: 35,
        roi: 15.2,
        funded: 40,
        image: "bg-gradient-to-br from-fuchsia-600 to-purple-600",
        description: "High-energy electronic track perfectly capturing the vibe of a futuristic metropolis. Heavy basslines and soaring synths make this a club favorite.",
        releaseDate: "Nov 01, 2024",
        totalTokens: 8000,
        availableTokens: 4800,
        streamingHistory: [
            { month: "Jan", streams: 8000, spotify: 4000, youtube: 3000, apple: 1000 },
            { month: "Feb", streams: 9500, spotify: 4500, youtube: 3500, apple: 1500 },
            { month: "Mar", streams: 11000, spotify: 5500, youtube: 4000, apple: 1500 },
            { month: "Apr", streams: 13000, spotify: 6500, youtube: 4500, apple: 2000 },
            { month: "May", streams: 16000, spotify: 8000, youtube: 5500, apple: 2500 },
            { month: "Jun", streams: 18000, spotify: 9000, youtube: 6000, apple: 3000 },
            { month: "Jul", streams: 20000, spotify: 10000, youtube: 7000, apple: 3000 },
            { month: "Aug", streams: 22000, spotify: 11000, youtube: 7500, apple: 3500 },
            { month: "Sep", streams: 25000, spotify: 12500, youtube: 8500, apple: 4000 },
            { month: "Oct", streams: 28000, spotify: 14000, youtube: 9500, apple: 4500 },
            { month: "Nov", streams: 30000, spotify: 15000, youtube: 10000, apple: 5000 },
            { month: "Dec", streams: 35000, spotify: 17500, youtube: 12000, apple: 5500 },
        ]
    },
    {
        id: 3,
        title: "Acoustic Soul",
        artist: "Sarah Jenkins",
        genre: "Indie",
        price: 25,
        roi: 8.5,
        funded: 90,
        image: "bg-gradient-to-br from-pink-500 to-rose-500",
        description: "Raw, emotional acoustic performance that touches the heart. Sarah's powerful voice shines over a simple guitar arrangement.",
        releaseDate: "Sep 20, 2024",
        totalTokens: 5000,
        availableTokens: 500,
        streamingHistory: [
            { month: "Jan", streams: 5000, spotify: 2500, youtube: 1500, apple: 1000 },
            { month: "Feb", streams: 5200, spotify: 2600, youtube: 1600, apple: 1000 },
            { month: "Mar", streams: 5500, spotify: 2750, youtube: 1750, apple: 1000 },
            { month: "Apr", streams: 5800, spotify: 2900, youtube: 1900, apple: 1000 },
            { month: "May", streams: 6000, spotify: 3000, youtube: 2000, apple: 1000 },
            { month: "Jun", streams: 6500, spotify: 3250, youtube: 2250, apple: 1000 },
            { month: "Jul", streams: 7000, spotify: 3500, youtube: 2500, apple: 1000 },
            { month: "Aug", streams: 7500, spotify: 3750, youtube: 2750, apple: 1000 },
            { month: "Sep", streams: 8000, spotify: 4000, youtube: 3000, apple: 1000 },
            { month: "Oct", streams: 9000, spotify: 4500, youtube: 3500, apple: 1000 },
            { month: "Nov", streams: 10000, spotify: 5000, youtube: 4000, apple: 1000 },
            { month: "Dec", streams: 12000, spotify: 6000, youtube: 4500, apple: 1500 },
        ]
    },
    // ... add other mock assets if needed to match dashboard list
];

export default function TokenDetail({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const id = parseInt(resolvedParams.id);
    const asset = mockAssets.find(a => a.id === id) || mockAssets[0]; // Fallback to first asset if not found
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const router = useRouter();
    const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
    const [buyAmount, setBuyAmount] = useState(10); // Default to 10 tokens
    const [isProcessing, setIsProcessing] = useState(false);

    const totalCost = buyAmount * asset.price;

    const handleBuy = async () => {
        setIsProcessing(true);
        // Simulate API Processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsProcessing(false);
        setIsBuyModalOpen(false);
        // Alert is used here as a placeholder for a Toast notification since no Toast component was found in components/ui
        alert(`Successfully purchased ${buyAmount} tokens for $${totalCost.toLocaleString()}!`);
        router.push("/tokenization");
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(asset.funded);
        }, 500);
        return () => clearTimeout(timer);
    }, [asset.funded]);

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            {/* <Navbar /> */}

            <main className="flex-grow container mx-auto px-4 py-8">
                <Link href="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Image & Media */}
                    <div className="lg:col-span-1 space-y-6">
                        <GlassCard className="p-0 overflow-hidden">
                            <div className={`aspect-square ${asset.image} relative flex items-center justify-center`}>
                                <button
                                    onClick={() => setPlaying(!playing)}
                                    className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:scale-110 transition-all"
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
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard>
                            <h3 className="font-bold mb-4">About the Track</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {asset.description}
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-muted-foreground">Release Date</p>
                                    <p className="font-medium">{asset.releaseDate}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Label</p>
                                    <p className="font-medium">Upbeats Records</p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Right Column: Investment Stats & Action */}
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

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-muted-foreground">Funding Progress</span>
                                        <span className="font-bold">{asset.funded}%</span>
                                    </div>
                                    <Progress value={progress} className="h-3" />
                                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                        <span>${(asset.totalTokens * asset.price * asset.funded / 100).toLocaleString('en-US')} raised</span>
                                        <span>Goal: ${(asset.totalTokens * asset.price).toLocaleString('en-US')}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

                                <div className="pt-6 border-t border-white/10">
                                    <h3 className="font-bold mb-4">Invest Now</h3>
                                    <div className="flex gap-4">
                                        <Button className="flex-1 bg-primary hover:bg-primary/90 h-12 text-lg" asChild>
                                            <Dialog open={isBuyModalOpen} onOpenChange={setIsBuyModalOpen}>
                                                <DialogTrigger asChild>
                                                    <Button className="flex-1 bg-primary hover:bg-primary/90 h-12 text-lg">
                                                        Buy Tokens
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-xl border-white/10 text-foreground">
                                                    <DialogHeader>
                                                        <DialogTitle>Buy Tokens: {asset.title}</DialogTitle>
                                                        <DialogDescription>
                                                            Invest in this asset to earn future royalties.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-6 py-4">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="amount">Number of Tokens</Label>
                                                            <div className="flex items-center gap-4">
                                                                <Input
                                                                    id="amount"
                                                                    type="number"
                                                                    value={buyAmount}
                                                                    onChange={(e) => setBuyAmount(Number(e.target.value))}
                                                                    className="bg-white/5 border-white/10"
                                                                    min={1}
                                                                    max={asset.availableTokens}
                                                                />
                                                                <span className="text-sm text-muted-foreground whitespace-nowrap">
                                                                    Max: {asset.availableTokens}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Slider
                                                                value={[buyAmount]}
                                                                onValueChange={(vals) => setBuyAmount(vals[0])}
                                                                max={asset.availableTokens}
                                                                step={1}
                                                                className="py-4"
                                                            />
                                                        </div>
                                                        <div className="bg-white/5 p-4 rounded-lg space-y-2">
                                                            <div className="flex justify-between text-sm">
                                                                <span className="text-muted-foreground">Price per Token</span>
                                                                <span>${asset.price.toLocaleString()}</span>
                                                            </div>
                                                            <div className="flex justify-between text-sm">
                                                                <span className="text-muted-foreground">Quantity</span>
                                                                <span>{buyAmount}</span>
                                                            </div>
                                                            <div className="border-t border-white/10 my-2 pt-2 flex justify-between font-bold text-lg">
                                                                <span>Total Cost</span>
                                                                <span className="text-green-400">${totalCost.toLocaleString()} USDT</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button
                                                            onClick={handleBuy}
                                                            disabled={isProcessing || buyAmount <= 0}
                                                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                                                        >
                                                            {isProcessing ? "Processing..." : "Confirm Purchase"}
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </Button>
                                        <Button variant="outline" className="flex-1 border-white/10 h-12 text-lg">
                                            View Contract
                                        </Button>
                                    </div>
                                    <p className="text-xs text-center text-muted-foreground mt-4">
                                        By investing, you agree to the Terms of Service and Token Purchase Agreement.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold">Streaming Performance</h3>
                                <div className="flex gap-4 text-xs">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-[#1DB954]" /> Spotify
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-[#FF0000]" /> YouTube
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-[#FFFFFF]" /> Apple Music
                                    </div>
                                </div>
                            </div>

                            <div className="h-64 w-full">
                                {asset.streamingHistory.length > 0 ? (
                                    <StreamingChart data={asset.streamingHistory} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                        No streaming data available yet.
                                    </div>
                                )}
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
