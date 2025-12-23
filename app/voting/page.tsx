"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { GradientText } from "@/components/shared/GradientText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Users, Vote, ExternalLink, CheckCircle2, Lock } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// Dummy Data
const VOTING_DATA = [
    {
        id: 1,
        title: "Choose the Next Album Cover Art",
        description: "We are deciding between three concept arts for the upcoming 'Midnight' album. As a fan token holder, your voice defines our visual identity.",
        image: "bg-gradient-to-br from-purple-600 to-blue-600",
        startDate: "2024-10-25",
        endDate: "2024-11-01",
        requiredToken: "MND (Midnight Dreams)",
        requiredAmount: 10,
        status: "active",
        totalVotes: 1250,
        options: [
            { id: 1, label: "Concept A: Neon City", percentage: 45 },
            { id: 2, label: "Concept B: Abstract Void", percentage: 30 },
            { id: 3, label: "Concept C: Retro Future", percentage: 25 },
        ]
    },
    {
        id: 2,
        title: "Select Tour City for 2025",
        description: "Help us plan the next leg of the world tour! Which city should we visit next summer?",
        image: "bg-gradient-to-br from-orange-500 to-red-600",
        startDate: "2024-11-05",
        endDate: "2024-11-20",
        requiredToken: "RKSTAR (Rockstar)",
        requiredAmount: 50,
        status: "upcoming",
        totalVotes: 0,
        options: [
            { id: 1, label: "Tokyo, Japan", percentage: 0 },
            { id: 2, label: "Berlin, Germany", percentage: 0 },
            { id: 3, label: "Sao Paulo, Brazil", percentage: 0 },
            { id: 4, label: "Sydney, Australia", percentage: 0 },
        ]
    },
    {
        id: 3,
        title: "Remix Contest Winner",
        description: "Vote for the best fan remix of 'Echoes'. The winner gets an official release on Spotify.",
        image: "bg-gradient-to-br from-green-400 to-emerald-600",
        startDate: "2024-10-01",
        endDate: "2024-10-15",
        requiredToken: "ECHO (Echoes)",
        requiredAmount: 5,
        status: "ended",
        totalVotes: 3400,
        options: [
            { id: 1, label: "DJ Solstice Remix", percentage: 60 },
            { id: 2, label: "Nightcore Version", percentage: 15 },
            { id: 3, label: "Acoustic Rework", percentage: 25 },
        ]
    }
];

export default function VotingPage() {
    const [filter, setFilter] = useState("all");

    const filteredData = filter === "all"
        ? VOTING_DATA
        : VOTING_DATA.filter(item => item.status === filter);

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            {/* <Navbar /> */}

            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-5xl font-bold tracking-tight">
                        Fan <GradientText>Governance</GradientText>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Use your fan tokens to vote on key decisions, influence artist careers, and shape the future of music.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white/5 p-1 rounded-full border border-white/10 flex gap-2">
                        {["all", "active", "upcoming", "ended"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === status
                                        ? "bg-primary text-primary-foreground shadow-lg"
                                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                    } capitalization`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Voting Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredData.map((vote) => (
                        <GlassCard key={vote.id} className="p-0 overflow-hidden group flex flex-col h-full hover:border-primary/50 transition-colors">
                            {/* Image Header */}
                            <div className={`h-48 ${vote.image} relative p-6 flex flex-col justify-end`}>
                                <div className="absolute top-4 right-4">
                                    <Badge variant="secondary" className={`
                                        backdrop-blur-md border-0
                                        ${vote.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                            vote.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' :
                                                'bg-zinc-500/50 text-zinc-300'}
                                    `}>
                                        {vote.status === 'active' && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Active</span>}
                                        {vote.status === 'upcoming' && <span className="flex items-center gap-1"><Clock size={12} /> Upcoming</span>}
                                        {vote.status === 'ended' && <span className="flex items-center gap-1"><CheckCircle2 size={12} /> Ended</span>}
                                    </Badge>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                                <h3 className="text-2xl font-bold relative z-10 leading-tight">{vote.title}</h3>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-grow flex flex-col">
                                <p className="text-muted-foreground mb-6 line-clamp-2">
                                    {vote.description}
                                </p>

                                {/* Meta Info */}
                                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                        <p className="text-muted-foreground text-xs mb-1">Duration</p>
                                        <div className="flex items-center gap-2 font-medium">
                                            <Calendar size={14} className="text-primary" />
                                            <span>{vote.endDate}</span>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                        <p className="text-muted-foreground text-xs mb-1">Requirement</p>
                                        <div className="flex items-center gap-2 font-medium">
                                            <Lock size={14} className="text-primary" />
                                            <span>{vote.requiredAmount} {vote.requiredToken.split(' ')[0]}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Options Preview */}
                                <div className="space-y-3 mb-8 flex-grow">
                                    <p className="text-sm font-semibold flex items-center gap-2">
                                        <Vote size={16} /> Vote Options
                                    </p>
                                    {vote.options.map((option) => (
                                        <div key={option.id} className="text-sm">
                                            <div className="flex justify-between mb-1">
                                                <span>{option.label}</span>
                                                {vote.status !== 'upcoming' && <span className="text-muted-foreground">{option.percentage}%</span>}
                                            </div>
                                            {vote.status !== 'upcoming' && (
                                                <Progress value={option.percentage} className="h-1.5" />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Action Button */}
                                <Button
                                    className="w-full h-12 text-lg font-bold"
                                    variant={vote.status === 'active' ? "default" : "secondary"}
                                    disabled={vote.status !== 'active'}
                                >
                                    {vote.status === 'active' ? "Cast Your Vote" :
                                        vote.status === 'upcoming' ? "Coming Soon" : "View Results"}
                                </Button>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
