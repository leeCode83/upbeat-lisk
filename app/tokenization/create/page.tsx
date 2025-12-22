"use client";

import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { GradientText } from "@/components/shared/GradientText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, Music, DollarSign, Wallet, RefreshCw, ListPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePlatform } from "@/hooks/usePlatform";
import { useAccount } from "wagmi";
import { Address, parseUnits, formatUnits } from "viem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PLATFORM_ADDRESS } from "@/lib/contracts";

export default function CreateTokenizationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { createMusicToken, getUserTokens, approveToken, listToken, isLoading } = usePlatform();
    const { address } = useAccount();

    const [formData, setFormData] = useState({
        name: "",
        symbol: "",
        maxSupply: "",
        artistAddress: "",
    });

    const [activeTab, setActiveTab] = useState("create");

    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab && (tab === "create" || tab === "my-tokens")) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    // My Tokens Tab State
    const [userTokens, setUserTokens] = useState<any[]>([]);
    const [isFetchingTokens, setIsFetchingTokens] = useState(false);
    const [listings, setListings] = useState<{ [key: string]: { amount: string; price: string } }>({});

    useEffect(() => {
        if (address) {
            fetchUserTokens();
        }
    }, [address]);

    const fetchUserTokens = async () => {
        if (!address) return;
        setIsFetchingTokens(true);
        const tokens = await getUserTokens(address);
        setUserTokens(tokens.reverse()); // Show newest first
        setIsFetchingTokens(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUseMyAddress = () => {
        if (address) {
            setFormData(prev => ({ ...prev, artistAddress: address }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.symbol || !formData.maxSupply || !formData.artistAddress) {
            return;
        }

        try {
            const success = await createMusicToken(
                formData.name,
                formData.symbol,
                parseUnits(formData.maxSupply, 18),
                formData.artistAddress as Address
            );

            if (success) {
                // Refresh tokens after creation
                fetchUserTokens();
                // Switch to "my-tokens" tab
                setActiveTab("my-tokens");
            }
        } catch (error) {
            console.error("Failed to create token:", error);
        }
    };

    const handleListingChange = (tokenAddress: string, field: 'amount' | 'price', value: string) => {
        setListings(prev => ({
            ...prev,
            [tokenAddress]: {
                ...prev[tokenAddress],
                [field]: value
            }
        }));
    };

    const handleListToken = async (e: React.FormEvent, token: any) => {
        e.preventDefault();
        const listingData = listings[token.tokenAddress];
        if (!listingData?.amount || !listingData?.price) return;

        try {
            const amountWei = parseUnits(listingData.amount, 18);
            const priceWei = parseUnits(listingData.price, 6); // USDC uses 6 decimals

            // 1. Approve Platform
            const approved = await approveToken(token.tokenAddress, PLATFORM_ADDRESS as Address, amountWei);
            if (!approved) return;

            // 2. List Token
            const listed = await listToken(token.tokenAddress, amountWei, priceWei);

            if (listed) {
                setListings(prev => ({ ...prev, [token.tokenAddress]: { amount: "", price: "" } }));
                router.push("/tokenization");
            }
        } catch (error) {
            console.error("Failed to list token:", error);
        }
    };


    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            {/* <Navbar /> */}

            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold mb-4">
                        Manage Your <GradientText>Music Tokens</GradientText>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Create new tokens or list your existing assets on the marketplace.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/5 border border-white/10">
                            <TabsTrigger value="create">Create New Token</TabsTrigger>
                            <TabsTrigger value="my-tokens">My Tokens</TabsTrigger>
                        </TabsList>

                        <TabsContent value="create">
                            <GlassCard className="p-8 relative overflow-hidden max-w-2xl mx-auto">
                                {/* Decorative background elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                            <Music size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">Token Details</h2>
                                            <p className="text-sm text-muted-foreground">Define the properties of your new token.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Token Name</label>
                                                <Input
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. Midnight Dreams"
                                                    className="bg-white/5 border-white/10"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Token Symbol</label>
                                                <Input
                                                    name="symbol"
                                                    value={formData.symbol}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. MND"
                                                    className="bg-white/5 border-white/10"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Max Supply (Normal Units)</label>
                                            <div className="relative">
                                                <Input
                                                    type="number"
                                                    name="maxSupply"
                                                    value={formData.maxSupply}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. 1000000"
                                                    className="bg-white/5 border-white/10 pl-10"
                                                    required
                                                    min="1"
                                                />
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                            </div>
                                            <p className="text-xs text-muted-foreground">The total number of tokens. System will convert to 18 decimals automatically.</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium flex justify-between items-center">
                                                <span>Artist Address (Owner)</span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-6 text-xs text-primary hover:text-primary/80 px-2"
                                                    onClick={handleUseMyAddress}
                                                    disabled={!address}
                                                >
                                                    <Wallet size={12} className="mr-1" />
                                                    Use My Address
                                                </Button>
                                            </label>
                                            <Input
                                                name="artistAddress"
                                                value={formData.artistAddress}
                                                onChange={handleInputChange}
                                                placeholder="0x..."
                                                className="bg-white/5 border-white/10"
                                                required
                                            />
                                            <p className="text-xs text-muted-foreground">This address will receive the initial supply and royalties.</p>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 h-12 text-lg"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Creating Token..." : "Create Token"}
                                        </Button>
                                    </div>
                                </form>
                            </GlassCard>
                        </TabsContent>

                        <TabsContent value="my-tokens">
                            <div className="space-y-6">
                                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                                    <div>
                                        <h2 className="text-xl font-bold">My Deployed Tokens</h2>
                                        <p className="text-sm text-muted-foreground">Tokens created by your wallet address.</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={fetchUserTokens} disabled={isFetchingTokens}>
                                        <RefreshCw size={16} className={`mr-2 ${isFetchingTokens ? 'animate-spin' : ''}`} />
                                        Refresh
                                    </Button>
                                </div>

                                {userTokens.length === 0 && !isFetchingTokens ? (
                                    <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10 border-dashed">
                                        <Music className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                                        <h3 className="text-lg font-semibold">No tokens found</h3>
                                        <p className="text-muted-foreground">You haven't created any music tokens yet.</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-6">
                                        {userTokens.map((token: any) => (
                                            <GlassCard key={token.tokenAddress} className="p-6 relative overflow-hidden group">
                                                {/* Decorative background gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                                {/* Header: Title and Balance */}
                                                <div className="flex justify-between items-start mb-1 relative z-10">
                                                    <h3 className="text-2xl font-bold font-handwriting">{token.name}</h3>
                                                    <div className="text-right">
                                                        <span className="text-xs text-muted-foreground block">Token Balance</span>
                                                        <span className="font-mono font-bold text-primary">
                                                            {token.balance ? formatUnits(token.balance, 18) : "0"} {token.symbol}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Address */}
                                                <div className="mb-6 relative z-10">
                                                    <p className="text-xs text-muted-foreground font-mono break-all opacity-70">
                                                        {token.tokenAddress}
                                                    </p>
                                                </div>

                                                {/* Listing Form */}
                                                <form onSubmit={(e) => handleListToken(e, token)} className="space-y-4 relative z-10">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-medium text-muted-foreground ml-1">Amount to list</label>
                                                            <Input
                                                                type="number"
                                                                className="bg-white/5 border-white/10"
                                                                value={listings[token.tokenAddress]?.amount || ""}
                                                                onChange={(e) => handleListingChange(token.tokenAddress, 'amount', e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-medium text-muted-foreground ml-1">Token Price (USDC)</label>
                                                            <Input
                                                                type="number"
                                                                className="bg-white/5 border-white/10"
                                                                value={listings[token.tokenAddress]?.price || ""}
                                                                onChange={(e) => handleListingChange(token.tokenAddress, 'price', e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <Button
                                                        type="submit"
                                                        className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 mt-2"
                                                        disabled={isLoading}
                                                    >
                                                        {isLoading ? "Processing..." : "Approve & List"}
                                                    </Button>
                                                </form>
                                            </GlassCard>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </div>
    );
}
