"use client";

import { Button } from "@/components/ui/button";
import { Play, Pause, ShoppingCart, Clock, Target, CheckCircle, Info } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const recordingsData = [
    {
        id: 1,
        title: "Sunset Boulevard",
        artist: "City Lights",
        genre: "Pop",
        duration: "3:45",
        price: "$500",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
        id: 2,
        title: "Electric Dreams",
        artist: "Synth Wave",
        genre: "Electronic",
        duration: "4:20",
        price: "$750",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
        id: 3,
        title: "Acoustic Soul",
        artist: "Wooden Guitar",
        genre: "Folk",
        duration: "3:10",
        price: "$300",
        image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
        id: 4,
        title: "Heavy Metal Thunder",
        artist: "Iron Clad",
        genre: "Metal",
        duration: "5:00",
        price: "$600",
        image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
        id: 5,
        title: "Jazz Cafe",
        artist: "Smooth Sax",
        genre: "Jazz",
        duration: "4:15",
        price: "$450",
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
        id: 6,
        title: "Orchestral Epic",
        artist: "Symphony X",
        genre: "Classical",
        duration: "6:30",
        price: "$1200",
        image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
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
        <div className="py-10">
            <h2 className="text-3xl font-bold mb-8">Available Master Recordings</h2>

            <div className="flex flex-col space-y-2">
                {/* Header Row */}
                <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-4 py-2 text-sm text-muted-foreground border-b border-white/10 uppercase tracking-wider">
                    <div className="w-12 text-center">#</div>
                    <div>Title</div>
                    <div className="text-right w-24">Duration</div>
                    <div className="text-right w-32">License</div>
                </div>

                {recordingsData.map((item, index) => (
                    <div
                        key={item.id}
                        className="group grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        {/* Play/Index Column */}
                        <div className="w-12 flex justify-center">
                            <button
                                onClick={() => togglePlay(item.id)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-muted-foreground group-hover:text-white transition-colors"
                            >
                                {playing === item.id ? <Pause size={16} /> : <Play size={16} />}
                            </button>
                        </div>

                        {/* Title & Artist Column */}
                        <div className="flex items-center gap-4">
                            <div className="relative h-12 w-12 rounded overflow-hidden flex-shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-base group-hover:text-primary transition-colors">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.artist}</p>
                            </div>
                        </div>

                        {/* Duration/Genre Column */}
                        <div className="text-right w-24 text-sm text-muted-foreground">
                            {item.duration}
                        </div>

                        {/* Price & Action Column */}
                        <div className="text-right w-32 flex items-center justify-end gap-4">
                            <span className="font-bold text-primary">{item.price}</span>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 rounded-full hover:bg-primary hover:text-white"
                                onClick={() => handlePurchaseClick(item)}
                            >
                                <ShoppingCart size={16} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Purchase Confirmation Modal */}
            <Dialog open={isPurchaseModalOpen} onOpenChange={setIsPurchaseModalOpen}>
                <DialogContent className="sm:max-w-md bg-zinc-900 border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle>Complete Purchase</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Review the license details for <strong>{selectedRecording?.title}</strong>.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <span className="text-muted-foreground">Price</span>
                            <span className="font-bold text-xl text-primary">{selectedRecording?.price}</span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Clock size={16} className="text-primary" />
                                <span>License Validity</span>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg text-sm text-zinc-300 border border-white/5">
                                Perpetual (Lifetime)
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Target size={16} className="text-primary" />
                                <Label htmlFor="purpose">Usage Purpose</Label>
                            </div>
                            <Input
                                id="purpose"
                                placeholder="e.g. Commercial, YouTube Video, Film"
                                className="bg-white/5 border-white/10"
                                value={purchasePurpose}
                                onChange={(e) => setPurchasePurpose(e.target.value)}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPurchaseModalOpen(false)} className="border-white/10 hover:bg-white/10 text-white">Cancel</Button>
                        <Button onClick={confirmPurchase} className="bg-primary hover:bg-primary/90">Confirm Purchase</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Success Modal */}
            <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
                <DialogContent className="sm:max-w-md bg-zinc-900 border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <CheckCircle className="text-green-500" size={24} />
                            Transaction Successful
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400 pt-2">
                            You have successfully purchased the license for <strong>{selectedRecording?.title}</strong>.
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
