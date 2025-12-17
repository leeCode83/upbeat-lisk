"use client";

import { WagmiProvider, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig, darkTheme } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";
import "@rainbow-me/rainbowkit/styles.css";

const storyOdyssey = defineChain({
  id: 1516,
  name: "Story Protocol Odyssey",
  network: "story-odyssey",
  nativeCurrency: {
    decimals: 18,
    name: "IP",
    symbol: "IP",
  },
  rpcUrls: {
    default: { http: ["https://odyssey.storyrpc.io"] },
    public: { http: ["https://odyssey.storyrpc.io"] },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://odyssey.storyscan.xyz" },
  },
  testnet: true,
});

const config = getDefaultConfig({
  appName: "Upbeats",
  projectId: "e1692f11caa0591c6c3fcfe171905766", // Replace with your actual Project ID from WalletConnect
  chains: [storyOdyssey],
  transports: {
    [storyOdyssey.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
