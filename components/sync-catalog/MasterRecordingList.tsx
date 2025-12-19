"use client";

import { Button } from "@/components/ui/button";
import { Play, Pause, ShoppingCart, CheckCircle, Clock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const recordingsData = [
    {
        id: 1,
        title: "Golden Hour",
        artist: "Sunset Collective",
        genre: "Chillhop",
        bpm: 85,
        duration: "3:45",
        price: "$150",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60",
    },
    {
        id: 2,
        title: "Neon Nights",
        artist: "Cyberwave",
        genre: "Synthwave",
        bpm: 120,
        duration: "4:02",
        price: "$200",
        image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&auto=format&fit=crop&q=60",
    },
    {
        id: 3,
        title: "Deep Forests",
        artist: "Nature Sounds",
        genre: "Ambient",
        bpm: 60,
        duration: "5:15",
        price: "$100",
        image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=500&auto=format&fit=crop&q=60",
    },
    {
        id: 4,
        title: "Street Hustle",
        artist: "Urban Beats",
        genre: "Hip Hop",
        bpm: 95,
        duration: "3:10",
        price: "$250",
        image: "https://images.unsplash.com/photo-1642132652859-3ef5a9216fd2?w=500&auto=format&fit=crop&q=60",
    },
    {
        id: 5,
        title: "Morning Coffee",
        artist: "Acoustic Vibes",
        genre: "Folk",
        bpm: 100,
        duration: "2:55",
        price: "$120",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=60",
    },
    {
        id: 6,
        title: "High Voltage",
        artist: "Rock Stars",
        genre: "Rock",
        bpm: 140,
        duration: "3:30",
        price: "$180",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60",
    },
    {
        id: 7,
        title: "Piano Sonata",
        artist: "Classical One",
        genre: "Classical",
        bpm: 70,
        duration: "6:10",
        price: "$300",
        image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop&q=60",
    },
];

export function MasterRecordingList() {
    const [playing, setPlaying] = useState<number | null>(null);
    const [selectedRecording, setSelectedRecording] = useState<typeof recordingsData[0] | null>(null);
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [purchasePurpose, setPurchasePurpose] = useState("");

    const togglePlay = (id: number) => {
        if (playing === id) {
            setPlaying(null);
        } else {
            setPlaying(id);
        }
    };

    const handlePurchaseClick = (recording: typeof recordingsData[0]) => {
        setSelectedRecording(recording);
        setIsPurchaseModalOpen(true);
    };

    const confirmPurchase = () => {
        setIsPurchaseModalOpen(false);
        setIsSuccessModalOpen(true);
    };

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
        setPurchasePurpose(""); // Reset form
        setSelectedRecording(null);
    };

    return (
        <div className="py-2">
            <div className="flex flex-col space-y-1">
                {/* Header Row */}
                <div className="grid grid-cols-[50px_2fr_1fr_1fr_1fr_1fr_100px] gap-4 px-4 py-3 text-sm font-medium text-muted-foreground border-b border-white/5 uppercase tracking-wider">
                    <div className="text-center">#</div>
                    <div className="pl-4">Track</div>
                    <div>Genre</div>
                    <div className="text-center">BPM</div>
                    <div className="text-right">Duration</div>
                    <div className="text-right">License Fee</div>
                    <div className="text-right">Action</div>
                </div>

                {recordingsData.map((item, index) => (
                    <div
                        key={item.id}
                        className="group grid grid-cols-[50px_2fr_1fr_1fr_1fr_1fr_100px] gap-4 items-center px-4 py-3 hover:bg-white/5 transition-colors rounded-lg text-sm"
                    >
                        {/* Index Column */}
                        <div className="text-center font-medium text-muted-foreground group-hover:text-white flex justify-center">
                            <button
                                onClick={() => togglePlay(item.id)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                            >
                                {playing === item.id ? <Pause size={14} className="text-primary" /> : <span className="group-hover:hidden">{index + 1}</span>}
                                {playing !== item.id && <Play size={14} className="hidden group-hover:block text-white" />}
                            </button>
                        </div>

                        {/* Track Column */}
                        <div className="flex items-center gap-3 pl-4">
                            <div className="relative h-10 w-10 rounded overflow-hidden flex-shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-white leading-tight">{item.title}</h3>
                                <p className="text-xs text-muted-foreground">{item.artist}</p>
                            </div>
                        </div>

                        {/* Genre */}
                        <div className="text-muted-foreground">{item.genre}</div>

                        {/* BPM */}
                        <div className="text-center text-muted-foreground">{item.bpm}</div>

                        {/* Duration */}
                        <div className="text-right text-muted-foreground">{item.duration}</div>

                        {/* Price */}
                        <div className="text-right font-bold text-primary">{item.price}</div>

                        {/* Action */}
                        <div className="text-right flex justify-end">
                            <Button
                                size="sm"
                                variant="default"
                                className="h-8 px-3 text-xs bg-primary text-white hover:bg-primary/90 transition-colors shadow-md"
                                onClick={() => handlePurchaseClick(item)}
                            >
                                License
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Purchase Confirmation Modal */}
            <Dialog open={isPurchaseModalOpen} onOpenChange={setIsPurchaseModalOpen}>
                <DialogContent className="sm:max-w-md bg-zinc-900 border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle>Complete License Purchase</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            You are purchasing a perpetual license for <strong>{selectedRecording?.title}</strong> by {selectedRecording?.artist}.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <span className="text-muted-foreground">Total Fee</span>
                            <span className="font-bold text-xl text-primary">{selectedRecording?.price}</span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Clock size={16} className="text-primary" />
                                <Label htmlFor="purpose">Usage / Project Name</Label>
                            </div>
                            <Input
                                id="purpose"
                                placeholder="e.g. YouTube Vlog #42"
                                className="bg-white/5 border-white/10"
                                value={purchasePurpose}
                                onChange={(e) => setPurchasePurpose(e.target.value)}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPurchaseModalOpen(false)} className="border-white/10 hover:bg-white/10 text-white">Cancel</Button>
                        <Button onClick={confirmPurchase} className="bg-primary hover:bg-primary/90">Confirm License</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Success Modal */}
            <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
                <DialogContent className="sm:max-w-md bg-zinc-900 border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <CheckCircle className="text-green-500" size={24} />
                            License Acquired
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400 pt-2">
                            The license for <strong>{selectedRecording?.title}</strong> has been minted to your wallet.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            className="w-full bg-primary hover:bg-primary/90"
                            onClick={closeSuccessModal}
                        >
                            Return to Catalog
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}
