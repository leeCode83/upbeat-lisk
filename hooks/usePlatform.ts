import { useState } from "react";
import { useReadContract, useWriteContract, usePublicClient } from "wagmi";
import { PLATFORM_ABI, PLATFORM_ADDRESS, TOKEN_ABI } from "@/lib/contracts";
import { toast } from "sonner";
import { Address } from "viem";

export const usePlatform = () => {
    const { writeContractAsync } = useWriteContract();
    const publicClient = usePublicClient();
    const [isLoading, setIsLoading] = useState(false);

    const handleTransaction = async (
        transactionFn: () => Promise<`0x${string}`>,
        successMessage: string = "Transaction successful!"
    ) => {
        setIsLoading(true);
        const toastId = toast.loading("Processing transaction...");

        try {
            const hash = await transactionFn();

            if (!publicClient) {
                throw new Error("Public client not available");
            }

            await publicClient.waitForTransactionReceipt({ hash });

            toast.success(successMessage, { id: toastId });
            return true;
        } catch (error: any) {
            console.error(error);
            const errorMessage = error.message || "Transaction failed";
            // Extract generic error message if possible to be cleaner
            const cleanError = errorMessage.split("\n")[0];
            toast.error(cleanError, { id: toastId });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Write Functions

    const createMusicToken = async (
        name: string,
        symbol: string,
        maxSupply: bigint,
        artist: Address
    ) => {
        return handleTransaction(
            () =>
                writeContractAsync({
                    address: PLATFORM_ADDRESS as Address,
                    abi: PLATFORM_ABI,
                    functionName: "createMusicToken",
                    args: [name, symbol, maxSupply, artist],
                }),
            "Music Token created successfully!"
        );
    };

    const listToken = async (
        tokenAddress: Address,
        amount: bigint,
        pricePerToken: bigint
    ) => {
        return handleTransaction(
            () =>
                writeContractAsync({
                    address: PLATFORM_ADDRESS as Address,
                    abi: PLATFORM_ABI,
                    functionName: "listToken",
                    args: [tokenAddress, amount, pricePerToken],
                }),
            "Token listed successfully!"
        );
    };

    const buyToken = async (listingId: bigint, usdcAmount: bigint) => {
        return handleTransaction(
            () =>
                writeContractAsync({
                    address: PLATFORM_ADDRESS as Address,
                    abi: PLATFORM_ABI,
                    functionName: "buyToken",
                    args: [listingId, usdcAmount],
                }),
            "Token purchased successfully!"
        );
    };

    const cancelListing = async (listingId: bigint) => {
        return handleTransaction(
            () =>
                writeContractAsync({
                    address: PLATFORM_ADDRESS as Address,
                    abi: PLATFORM_ABI,
                    functionName: "cancelListing",
                    args: [listingId],
                }),
            "Listing cancelled successfully!"
        );
    };

    const approveToken = async (tokenAddress: Address, spender: Address, amount: bigint) => {
        return handleTransaction(
            () =>
                writeContractAsync({
                    address: tokenAddress,
                    abi: TOKEN_ABI,
                    functionName: "approve",
                    args: [spender, amount],
                }),
            "Token approval successful!"
        );
    };

    // Read Functions

    const useGetAllListings = () => {
        return useReadContract({
            address: PLATFORM_ADDRESS as Address,
            abi: PLATFORM_ABI,
            functionName: "getAllListings",
        });
    };

    const useGetListing = (listingId: bigint) => {
        return useReadContract({
            address: PLATFORM_ADDRESS as Address,
            abi: PLATFORM_ABI,
            functionName: "getListing",
            args: [listingId],
        });
    };

    const useGetListings = (listingId: bigint) => { // Access the public mapping directly if needed
        return useReadContract({
            address: PLATFORM_ADDRESS as Address,
            abi: PLATFORM_ABI,
            functionName: "listings",
            args: [listingId],
        });
    }


    const getUserTokens = async (userAddress: Address) => {
        if (!publicClient) return [];

        try {
            const logs = await publicClient.getContractEvents({
                address: PLATFORM_ADDRESS as Address,
                abi: PLATFORM_ABI,
                eventName: "MusicTokenCreated",
                args: {
                    creator: userAddress
                },
                fromBlock: BigInt(30503759)
            });

            // Fetch balances for each token
            const tokensWithBalance = await Promise.all(logs.map(async (log) => {
                let balance = BigInt(0);
                try {
                    // We need to read the balance from the token contract itself
                    // Using the TOKEN_ABI which should contain balanceOf
                    const balanceResult = await publicClient.readContract({
                        address: log.args.tokenAddress as Address,
                        abi: TOKEN_ABI,
                        functionName: "balanceOf",
                        args: [userAddress]
                    });
                    balance = balanceResult as bigint;
                } catch (e) {
                    console.warn(`Failed to fetch balance for ${log.args.tokenAddress}`, e);
                }

                return {
                    tokenAddress: log.args.tokenAddress,
                    name: log.args.name,
                    symbol: log.args.symbol,
                    transactionHash: log.transactionHash,
                    balance: balance
                };
            }));

            return tokensWithBalance;
        } catch (error) {
            console.error("Failed to fetch user tokens:", error);
            return [];
        }
    };

    const getUserPortfolio = async (userAddress: Address) => {
        if (!publicClient) return [];

        try {
            // 1. Get all created tokens (global)
            const logs = await publicClient.getContractEvents({
                address: PLATFORM_ADDRESS as Address,
                abi: PLATFORM_ABI,
                eventName: "MusicTokenCreated",
                fromBlock: BigInt(30503759)
            });

            // 2. Get all active listings to map prices
            let priceMap: { [key: string]: bigint } = {};
            try {
                const listings = await publicClient.readContract({
                    address: PLATFORM_ADDRESS as Address,
                    abi: PLATFORM_ABI,
                    functionName: "getAllListings",
                }) as any[];

                listings.forEach((listing: any) => {
                    if (listing.active) {
                        priceMap[listing.tokenAddress] = listing.pricePerToken;
                    }
                });
            } catch (e) {
                console.warn("Failed to fetch listings for price map", e);
            }

            // 3. Check balance for each token
            const portfolio = await Promise.all(logs.map(async (log) => {
                let balance = BigInt(0);
                try {
                    const balanceResult = await publicClient.readContract({
                        address: log.args.tokenAddress as Address,
                        abi: TOKEN_ABI,
                        functionName: "balanceOf",
                        args: [userAddress]
                    });
                    balance = balanceResult as bigint;
                } catch (e) {
                    // Token might be invalid or network issue
                }

                if (balance > BigInt(0)) {
                    return {
                        id: log.transactionHash, // unique key
                        tokenAddress: log.args.tokenAddress,
                        name: log.args.name,
                        symbol: log.args.symbol,
                        balance: balance,
                        price: priceMap[log.args.tokenAddress!] || BigInt(0),
                        // Determine change? Mock for now or requires historical data
                        change: (Math.random() * 10) - 2 // Mock change between -2% and +8%
                    };
                }
                return null;
            }));

            return portfolio.filter(item => item !== null);
        } catch (error) {
            console.error("Failed to fetch user portfolio:", error);
            return [];
        }
    };

    const getUserActivity = async (userAddress: Address) => {
        if (!publicClient) return [];

        try {
            const createdEvents = await publicClient.getContractEvents({
                address: PLATFORM_ADDRESS as Address,
                abi: PLATFORM_ABI,
                eventName: "MusicTokenCreated",
                args: { creator: userAddress },
                fromBlock: BigInt(30503759)
            });

            const listedEvents = await publicClient.getContractEvents({
                address: PLATFORM_ADDRESS as Address,
                abi: PLATFORM_ABI,
                eventName: "TokenListed",
                args: { seller: userAddress },
                fromBlock: BigInt(30503759)
            });

            const boughtEvents = await publicClient.getContractEvents({
                address: PLATFORM_ADDRESS as Address,
                abi: PLATFORM_ABI,
                eventName: "TokenSold",
                args: { buyer: userAddress },
                fromBlock: BigInt(30503759)
            });

            // Combine and format
            const activity = [
                ...createdEvents.map(e => ({
                    type: "Created Token",
                    hash: e.transactionHash,
                    blockNumber: e.blockNumber,
                    description: `Created ${e.args.name} (${e.args.symbol})`,
                    amount: undefined,
                    value: undefined
                })),
                ...listedEvents.map(e => ({
                    type: "Listed Token",
                    hash: e.transactionHash,
                    blockNumber: e.blockNumber,
                    description: `Listed tokens for sale`,
                    amount: e.args.amount,
                    value: e.args.price // This is price per token, maybe calculate total?
                })),
                ...boughtEvents.map(e => ({
                    type: "Bought Token",
                    hash: e.transactionHash,
                    blockNumber: e.blockNumber,
                    description: `Purchased tokens`,
                    amount: e.args.amount,
                    value: e.args.totalPrice
                }))
            ];

            // Sort by block number descending (newest first)
            return activity.sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber));
        } catch (error) {
            console.error("Failed to fetch user activity:", error);
            return [];
        }
    };

    return {
        isLoading,
        createMusicToken,
        listToken,
        buyToken,
        cancelListing,
        approveToken,
        useGetAllListings,
        useGetListing,
        useGetListings,
        getUserTokens,
        getUserPortfolio,
        getUserActivity
    };
};
