
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useToken } from "@/hooks/useToken";
import { Address, formatUnits } from "viem";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface TokenDetailDialogProps {
    tokenAddress: Address;
    tokenSymbol: string;
    tokenName: string;
}

export function TokenDetailDialog({ tokenAddress, tokenSymbol, tokenName }: TokenDetailDialogProps) {
    const {
        useTotalRevenuePerShare,
        useTotalSupply,
    } = useToken();
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    // Fetch data
    const { data: accRevenuePerShare } = useTotalRevenuePerShare(tokenAddress);
    const { data: totalSupply } = useTotalSupply(tokenAddress);

    // Calculate Total Revenue
    // Revenue Per Share is stored with 1e18 precision.
    // Total Revenue = (accRevenuePerShare * totalSupply) / 1e18
    // Assuming USDC has 6 decimals, the result of this calculation should be treated as USDC units.
    const totalRevenue = (accRevenuePerShare && totalSupply)
        ? (BigInt(accRevenuePerShare) * BigInt(totalSupply)) / BigInt(1e18)
        : BigInt(0);

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(tokenAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Detail
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{tokenName} ({tokenSymbol})</DialogTitle>
                    <DialogDescription>
                        Contract Details and Performance
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    {/* Token Info */}
                    <div className="space-y-4">
                        {/* Address */}
                        <div>
                            <label className="text-sm font-medium text-muted-foreground block mb-1">
                                Token Address
                            </label>
                            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-white/5">
                                <code className="text-xs flex-grow font-mono truncate">
                                    {tokenAddress}
                                </code>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                    onClick={handleCopyAddress}
                                    title="Copy Address"
                                >
                                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                </Button>
                            </div>
                        </div>

                        {/* Supply & Revenue Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1 p-3 bg-muted/50 rounded-lg border border-white/5">
                                <span className="text-xs text-muted-foreground">Total Supply</span>
                                <span className="text-lg font-bold font-mono">
                                    {totalSupply ? Number(formatUnits(totalSupply, 18)).toLocaleString() : "Loading..."}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1 p-3 bg-muted/50 rounded-lg border border-white/5">
                                <span className="text-xs text-muted-foreground">Total Revenue</span>
                                <span className="text-lg font-bold font-mono text-green-400">
                                    ${Number(formatUnits(totalRevenue, 6)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Link href="/tokenization/create?tab=my-tokens" className="w-full">
                        <Button className="w-full mt-2 bg-primary hover:bg-primary/90">
                            Listing to Marketplace
                        </Button>
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
}
