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

            return logs.map(log => ({
                tokenAddress: log.args.tokenAddress,
                name: log.args.name,
                symbol: log.args.symbol,
                transactionHash: log.transactionHash
            }));
        } catch (error) {
            console.error("Failed to fetch user tokens:", error);
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
        getUserTokens
    };
};
