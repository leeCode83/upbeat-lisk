import { useState } from "react";
import { useReadContract, useWriteContract, usePublicClient } from "wagmi";
import { TOKEN_ABI, USDC_ABI, USDC_ADDRESS } from "@/lib/contracts"; // Assuming USDC_ABI is available or use TOKEN_ABI if it's generic ERC20
import { toast } from "sonner";
import { Address } from "viem";

export const useToken = () => {
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

    const depositRevenue = async (tokenAddress: Address, amount: bigint) => {
        // First we might need to approve USDC spending? 
        // Logic: The UI should handle approval separately or we can chain it here if we want to be fancy.
        // For now, let's assume the user handles approval or we add a separate approve function.
        // NOTE: The contract uses transferFrom, so allowance is required.

        return handleTransaction(
            () =>
                writeContractAsync({
                    address: tokenAddress,
                    abi: TOKEN_ABI,
                    functionName: "depositRevenue",
                    args: [amount],
                }),
            "Revenue deposited successfully!"
        );
    };

    const withdrawRevenue = async (tokenAddress: Address) => {
        return handleTransaction(
            () =>
                writeContractAsync({
                    address: tokenAddress,
                    abi: TOKEN_ABI,
                    functionName: "withdrawRevenue",
                    args: [],
                }),
            "Revenue withdrawn successfully!"
        );
    };

    const approve = async (tokenAddress: Address, spender: Address, amount: bigint) => {
        return handleTransaction(
            () =>
                writeContractAsync({
                    address: tokenAddress,
                    abi: TOKEN_ABI,
                    functionName: "approve",
                    args: [spender, amount],
                }),
            "Approval successful!"
        );
    };

    const approveUSDC = async (spender: Address, amount: bigint) => {
        return handleTransaction(
            () =>
                writeContractAsync({
                    address: USDC_ADDRESS as Address,
                    abi: USDC_ABI,
                    functionName: "approve",
                    args: [spender, amount],
                }),
            "USDC Approval successful!"
        );
    }

    // Read Functions

    const usePendingRevenue = (tokenAddress: Address, userAddress: Address) => {
        return useReadContract({
            address: tokenAddress,
            abi: TOKEN_ABI,
            functionName: "pendingRevenue",
            args: [userAddress],
        });
    };

    const useClaimableRevenue = (tokenAddress: Address, userAddress: Address) => {
        return useReadContract({
            address: tokenAddress,
            abi: TOKEN_ABI,
            functionName: "claimableRevenue",
            args: [userAddress],
        });
    }

    const useBalanceOf = (tokenAddress: Address, userAddress: Address) => {
        return useReadContract({
            address: tokenAddress,
            abi: TOKEN_ABI,
            functionName: "balanceOf",
            args: [userAddress],
        });
    };

    const useTotalRevenuePerShare = (tokenAddress: Address) => {
        return useReadContract({
            address: tokenAddress,
            abi: TOKEN_ABI,
            functionName: "getTotalRevenuePerShare",
        });
    };

    const useTotalSupply = (tokenAddress: Address) => {
        return useReadContract({
            address: tokenAddress,
            abi: TOKEN_ABI,
            functionName: "totalSupply",
        });
    };

    return {
        isLoading,
        depositRevenue,
        withdrawRevenue,
        approve,
        approveUSDC,
        usePendingRevenue,
        useClaimableRevenue,
        useBalanceOf,
        useTotalRevenuePerShare,
        useTotalSupply
    };
};
