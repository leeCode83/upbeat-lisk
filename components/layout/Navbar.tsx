"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { GradientText } from "@/components/shared/GradientText";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Sync Catalog", href: "/sync-catalog" },
    { name: "Token Market", href: "/tokenization" },
    { name: "Tokenize", href: "/tokenization/create" },
    { name: "About", href: "/about" },
    { name: "Dashboard", href: "/dashboard" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "sticky z-50 transition-all duration-500 ease-in-out border-white/10 inset-x-0 mx-auto",
                scrolled
                    ? "top-6 w-[95%] max-w-6xl rounded-full border bg-[#050505]/70 backdrop-blur-xl shadow-2xl shadow-black/50"
                    : "top-0 w-full border-b bg-black/20 backdrop-blur-sm",
                isOpen && scrolled && "rounded-3xl" // Adjust shape when mobile menu is open and floating
            )}
        >
            <div className="px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 shrink-0">
                    <GradientText className="text-2xl font-bold tracking-tighter">
                        Upbeats
                    </GradientText>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center justify-center space-x-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                                pathname === item.href
                                    ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center space-x-3 shrink-0">
                    {/* <Link href="/dashboard">
                        <Button suppressHydrationWarning={true} variant="ghost" className="rounded-full text-muted-foreground hover:text-white hover:bg-white/5">
                            Dashboard
                        </Button>
                    </Link> */}
                    <ConnectButton.Custom>
                        {({
                            account,
                            chain,
                            openAccountModal,
                            openChainModal,
                            openConnectModal,
                            authenticationStatus,
                            mounted,
                        }) => {
                            const ready = mounted && authenticationStatus !== 'loading';
                            const connected =
                                ready &&
                                account &&
                                chain &&
                                (!authenticationStatus ||
                                    authenticationStatus === 'authenticated');

                            return (
                                <div
                                    {...(!ready && {
                                        'aria-hidden': true,
                                        'style': {
                                            opacity: 0,
                                            pointerEvents: 'none',
                                            userSelect: 'none',
                                        },
                                    })}
                                >
                                    {(() => {
                                        if (!connected) {
                                            return (
                                                <Button
                                                    suppressHydrationWarning={true}
                                                    onClick={openConnectModal}
                                                    className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                                >
                                                    Connect Wallet
                                                </Button>
                                            );
                                        }

                                        if (chain.unsupported) {
                                            return (
                                                <Button
                                                    suppressHydrationWarning={true}
                                                    onClick={openChainModal}
                                                    variant="destructive"
                                                    className="rounded-full"
                                                >
                                                    Wrong network
                                                </Button>
                                            );
                                        }

                                        return (
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    suppressHydrationWarning={true}
                                                    onClick={openChainModal}
                                                    variant="outline"
                                                    className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white hidden lg:flex items-center gap-2 h-9"
                                                >
                                                    {chain.hasIcon && (
                                                        <div
                                                            style={{
                                                                background: chain.iconBackground,
                                                                width: 16,
                                                                height: 16,
                                                                borderRadius: 999,
                                                                overflow: 'hidden',
                                                            }}
                                                        >
                                                            {chain.iconUrl && (
                                                                <img
                                                                    alt={chain.name ?? 'Chain icon'}
                                                                    src={chain.iconUrl}
                                                                    style={{ width: 16, height: 16 }}
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                                    {chain.name}
                                                </Button>

                                                <Button
                                                    suppressHydrationWarning={true}
                                                    onClick={openAccountModal}
                                                    className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] h-9"
                                                >
                                                    {account.displayName}
                                                    {account.displayBalance
                                                        ? ` (${account.displayBalance})`
                                                        : ''}
                                                </Button>
                                            </div>
                                        );
                                    })()}
                                </div>
                            );
                        }}
                    </ConnectButton.Custom>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-muted-foreground hover:text-white transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-white/5 bg-transparent pb-6 px-2">
                    <div className="px-4 py-4 flex flex-col space-y-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "block px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                                    pathname === item.href
                                        ? "bg-white/10 text-white"
                                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="pt-4 flex flex-col space-y-3">
                            <Button suppressHydrationWarning={true} variant="ghost" className="w-full justify-start rounded-xl hover:bg-white/5">
                                Log in
                            </Button>
                            <Button suppressHydrationWarning={true} className="w-full rounded-xl bg-primary hover:bg-primary/90">
                                Sign up
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
