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
import { Play, Pause, ArrowLeft, Share2, Heart, Clock, DollarSign, TrendingUp, Users, Wallet, Zap, Ticket, Vote, Gift } from "lucide-react";
import { useState, use, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { StreamingChart } from "@/components/charts/StreamingChart";
import { toast } from "sonner";
import { usePlatform } from "@/hooks/usePlatform";
import { useAccount, useReadContract } from "wagmi";
import { formatUnits, parseUnits, Address } from "viem";
import { TOKEN_ABI, USDC_ABI, USDC_ADDRESS, PLATFORM_ADDRESS } from "@/lib/contracts";

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
    // We use the ID from params to fetch the listing
    const resolvedParams = use(params);
    const listingId = BigInt(resolvedParams.id);

    const { address } = useAccount();
    const { useGetListing, buyToken, approveToken } = usePlatform();

    // Fetch Listing Data
    const { data: listingData, isLoading: isListingLoading } = useGetListing(listingId);

    // Safely cast listing data
    const listing = listingData as any;

    // Fetch Token Details (Name, Symbol)
    const { data: tokenName } = useReadContract({
        address: listing?.tokenAddress,
        abi: TOKEN_ABI,
        functionName: "name",
        query: { enabled: !!listing?.tokenAddress }
    });

    const { data: tokenSymbol } = useReadContract({
        address: listing?.tokenAddress,
        abi: TOKEN_ABI,
        functionName: "symbol",
        query: { enabled: !!listing?.tokenAddress }
    });

    // Fetch User USDC Balance
    const { data: usdcBalance, refetch: refetchUsdcBalance } = useReadContract({
        address: USDC_ADDRESS as Address,
        abi: USDC_ABI,
        functionName: "balanceOf",
        args: [address as Address],
        query: { enabled: !!address }
    });

    const [playing, setPlaying] = useState(false);

    const router = useRouter();
    const [usdcAmount, setUsdcAmount] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // Derived State
    const pricePerToken = listing?.pricePerToken ? Number(formatUnits(listing.pricePerToken, 6)) : 0;
    const availableTokens = listing?.amount ? Number(formatUnits(listing.amount, 18)) : 0;

    const estimatedTokens = (usdcAmount && pricePerToken > 0)
        ? Number(usdcAmount) / pricePerToken
        : 0;

    // Merge Mock Data with Real Data
    const asset = {
        ...tokenData,
        title: tokenName as string || "Loading...",
        artist: listing?.seller || "Unknown Artist",
        price: pricePerToken,
        tokenAddress: listing?.tokenAddress,
        availableTokens: availableTokens,
        totalTokens: availableTokens, // Using available as total for now or fetch maxSupply
    };

    const handleBuy = async () => {
        if (!usdcAmount || !listing) return;
        setIsProcessing(true);

        try {
            const usdcAmountWei = parseUnits(usdcAmount, 6);

            // 1. Approve USDC
            const approved = await approveToken(USDC_ADDRESS as Address, PLATFORM_ADDRESS as Address, usdcAmountWei);
            if (!approved) throw new Error("Approval failed");

            // 2. Buy Token
            const success = await buyToken(listingId, usdcAmountWei);

            if (success) {
                setUsdcAmount("");
                refetchUsdcBalance();
                // Optionally refetch listing to update available amount
                router.refresh();
            }
        } catch (error) {
            console.error("Buy failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (isListingLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <p>Loading token details...</p>
            </div>
        );
    }

    if (!listing || !listing.active) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-4">
                <p>Listing not found or inactive.</p>
                <Link href="/tokenization">
                    <Button variant="outline">Back to Marketplace</Button>
                </Link>
            </div>
        );
    }

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
                            <div className={`aspect-square ${tokenData.image} relative flex items-center justify-center`}>
                                <button
                                    onClick={() => setPlaying(!playing)}
                                    className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:scale-110 transition-all shadow-lg"
                                >
                                    {playing ? <Pause fill="white" size={32} /> : <Play fill="white" size={32} className="ml-1" />}
                                </button>
                                <Badge className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border-0 text-lg py-1 px-3">
                                    {tokenData.genre}
                                </Badge>
                            </div>
                            <div className="p-6">
                                <h1 className="text-3xl font-bold mb-1">{asset.title}</h1>
                                <p className="text-xl text-primary mb-4 truncate" title={asset.artist as string}>{asset.artist}</p>
                                <div className="text-xs text-muted-foreground mb-4 font-mono break-all">{asset.tokenAddress}</div>

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
                                        <TrendingUp size={14} className="mr-1" /> +{tokenData.roi}% ROI
                                    </Badge>
                                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                                        <Users size={14} className="mr-1" /> {tokenData.id * 123 + 50} Investors
                                    </Badge>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                <div className="bg-white/5 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                        <DollarSign size={16} />
                                        <span className="text-sm">Available Tokens</span>
                                    </div>
                                    <p className="text-xl font-bold">{asset.availableTokens.toLocaleString()} {tokenSymbol as string}</p>
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
                                    <p className="text-xl font-bold text-green-400">{tokenData.roi}%</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-bold mb-4">About the Track</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {tokenData.description}
                                </p>
                            </div>

                            {/* Fan Utility History - Mock Data */}
                            <div className="mb-6 pt-6 border-t border-white/10">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    Fan Utility History <Badge variant="outline" className="text-xs font-normal">Perks & Voting</Badge>
                                </h3>
                                <div className="space-y-3">
                                    {tokenData.utilityHistory.map((item) => (
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
                                    <StreamingChart data={tokenData.streamingHistory} />
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>

                {/* Section 2: Buy Interface */}
                <div className="max-w-xl mx-auto">
                    <GlassCard>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Wallet className="text-primary" />
                            Buy Tokens
                        </h2>

                        <div className="space-y-6">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-muted-foreground">Your USDC Balance</span>
                                    <span className="font-mono font-bold text-green-400">
                                        {usdcBalance ? formatUnits(usdcBalance, 6) : "0.00"} USDC
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="usdc-amount">Investment Amount (USDC)</Label>
                                    <div className="relative">
                                        <Input
                                            id="usdc-amount"
                                            type="number"
                                            placeholder="0.00"
                                            value={usdcAmount}
                                            onChange={(e) => setUsdcAmount(e.target.value)}
                                            className="h-12 bg-black/20 border-white/10 text-lg pl-4 pr-16"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                                            USDC
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Price: ${asset.price} per token
                                    </p>
                                </div>

                                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 flex justify-between items-center">
                                    <span className="text-sm font-medium">Estimated Tokens to Receive:</span>
                                    <span className="text-xl font-bold text-primary">
                                        {estimatedTokens.toLocaleString(undefined, { maximumFractionDigits: 4 })} {tokenSymbol as string}
                                    </span>
                                </div>

                                <Button
                                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/20"
                                    onClick={handleBuy}
                                    disabled={!usdcAmount || Number(usdcAmount) <= 0 || isProcessing || !address}
                                >
                                    {isProcessing ? "Processing..." : "Buy Now"}
                                </Button>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </main>
            <Footer />
        </div>
    );
}
