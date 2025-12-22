"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatUnits } from "viem";
import Link from "next/link";
import { ExternalLink, User } from "lucide-react";
import { Listing } from "@/lib/contracts";

interface TokenListingsDialogProps {
    tokenName: string;
    tokenSymbol: string;
    listings: any[]; // Using any to accommodate the extended Listing interface with ID
}

export function TokenListingsDialog({ tokenName, tokenSymbol, listings }: TokenListingsDialogProps) {
    if (!listings || listings.length === 0) return null;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                    View Listings
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-zinc-900 border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        Listings for <span className="text-primary">{tokenName}</span> ({tokenSymbol})
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                    <div className="rounded-lg border border-white/10 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="p-3 text-left font-medium text-muted-foreground">Seller</th>
                                    <th className="p-3 text-right font-medium text-muted-foreground">Price</th>
                                    <th className="p-3 text-right font-medium text-muted-foreground">Amount</th>
                                    <th className="p-3 text-right"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listings.map((listing) => (
                                    <tr key={listing.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-3">
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                                                    <User size={12} />
                                                </div>
                                                <span className="font-mono text-xs text-muted-foreground truncate max-w-[100px]">
                                                    {listing.seller}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-right font-medium">
                                            ${formatUnits(listing.pricePerToken as unknown as bigint, 6)} <span className="text-xs text-muted-foreground">USDC</span>
                                        </td>
                                        <td className="p-3 text-right font-mono text-muted-foreground">
                                            {formatUnits(listing.amount as unknown as bigint, 18)}
                                        </td>
                                        <td className="p-3 text-right">
                                            <Button asChild size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <Link href={`/tokenization/${listing.id}`}>
                                                    <ExternalLink size={14} />
                                                </Link>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
