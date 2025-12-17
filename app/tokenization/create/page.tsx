"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { GradientText } from "@/components/shared/GradientText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SimpleTooltip } from "@/components/shared/SimpleTooltip";
import { Info, Upload, CheckCircle, ArrowRight, ArrowLeft, Music, DollarSign, FileText } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function CreateTokenizationPage() {
    const router = useRouter();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: "",
        artist: "",
        genre: "",
        releaseDate: "",
        percentage: 50,
        valuation: 10000,
        description: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const renderStepIndicator = () => (
        <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= s ? 'bg-primary text-white shadow-[0_0_15px_rgba(var(--primary),0.5)]' : 'bg-white/10 text-muted-foreground'}`}>
                            {step > s ? <CheckCircle size={20} /> : s}
                        </div>
                        {s < 3 && <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${step > s ? 'bg-primary' : 'bg-white/10'}`} />}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            {/* <Navbar /> */}

            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold mb-4">
                        Tokenize Your <GradientText>Masterpiece</GradientText>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Turn your music into a digital asset. Raise funds, share royalties, and connect with your fans on a deeper level.
                    </p>
                </div>

                {renderStepIndicator()}

                <div className="max-w-3xl mx-auto">
                    <GlassCard className="p-8 relative overflow-hidden">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                            <Music size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">Song Details</h2>
                                            <p className="text-sm text-muted-foreground">Tell us about the track you want to tokenize.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium flex items-center gap-2">
                                                Track Title
                                                <SimpleTooltip content="The official title of your song as it will appear on streaming platforms.">
                                                    <Info size={14} className="text-muted-foreground cursor-help" />
                                                </SimpleTooltip>
                                            </label>
                                            <Input
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Midnight Dreams"
                                                className="bg-white/5 border-white/10"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Artist Name</label>
                                            <Input
                                                name="artist"
                                                value={formData.artist}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Luna Eclipse"
                                                className="bg-white/5 border-white/10"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Genre</label>
                                            <select
                                                name="genre"
                                                value={formData.genre}
                                                onChange={handleInputChange}
                                                className="w-full h-10 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            >
                                                <option value="" disabled>Select a genre</option>
                                                <option value="pop">Pop</option>
                                                <option value="rock">Rock</option>
                                                <option value="hiphop">Hip Hop</option>
                                                <option value="electronic">Electronic</option>
                                                <option value="jazz">Jazz</option>
                                                <option value="classical">Classical</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Release Date</label>
                                            <Input
                                                type="date"
                                                name="releaseDate"
                                                value={formData.releaseDate}
                                                onChange={handleInputChange}
                                                className="bg-white/5 border-white/10"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Tell the story behind your song..."
                                            className="w-full min-h-[100px] rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                            <DollarSign size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">Rights & Valuation</h2>
                                            <p className="text-sm text-muted-foreground">Define how much you want to sell and for how much.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <label className="text-sm font-medium flex items-center gap-2">
                                                Percentage to Tokenize
                                                <SimpleTooltip content="The portion of master recording rights you are selling to investors.">
                                                    <Info size={14} className="text-muted-foreground cursor-help" />
                                                </SimpleTooltip>
                                            </label>
                                            <div className="space-y-3">
                                                <div className="relative h-2 w-full">
                                                    {/* Track & Fill */}
                                                    <div className="absolute inset-0 rounded-full bg-white/10 overflow-hidden pointer-events-none">
                                                        <div
                                                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-100 ease-out"
                                                            style={{ width: `${formData.percentage}%` }}
                                                        />
                                                    </div>

                                                    {/* Thumb Indicator */}
                                                    <div
                                                        className="absolute top-1/2 h-6 w-6 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-100 ease-out flex items-center justify-center"
                                                        style={{ left: `${formData.percentage}%` }}
                                                    >
                                                        <div className="w-2 h-2 bg-purple-600 rounded-full" />
                                                    </div>

                                                    {/* Invisible Range Input for Interaction */}
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="100"
                                                        name="percentage"
                                                        value={formData.percentage}
                                                        onChange={handleInputChange}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    />
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-muted-foreground">1%</span>
                                                    <span className="font-bold text-xl text-primary">{formData.percentage}%</span>
                                                    <span className="text-xs text-muted-foreground">100%</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-muted-foreground">You will retain {100 - formData.percentage}% of the rights.</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium flex items-center gap-2">
                                                Total Valuation ($)
                                                <SimpleTooltip content="The estimated total value of your song's master rights.">
                                                    <Info size={14} className="text-muted-foreground cursor-help" />
                                                </SimpleTooltip>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                                <Input
                                                    type="number"
                                                    name="valuation"
                                                    value={formData.valuation}
                                                    onChange={handleInputChange}
                                                    className="pl-8 bg-white/5 border-white/10"
                                                />
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                                            <h4 className="font-semibold mb-2 text-primary">Summary</h4>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-muted-foreground">Rights for Sale:</span>
                                                <span>{formData.percentage}%</span>
                                            </div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-muted-foreground">Fundraising Goal:</span>
                                                <span className="font-bold">${((formData.valuation * formData.percentage) / 100).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">Assets & Review</h2>
                                            <p className="text-sm text-muted-foreground">Upload your files and review your proposal.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Cover Artwork</label>
                                            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group h-48">
                                                <div className="p-4 rounded-full bg-white/5 mb-4 group-hover:scale-110 transition-transform">
                                                    <Upload size={24} className="text-muted-foreground" />
                                                </div>
                                                <p className="font-medium text-sm">Upload Artwork</p>
                                                <p className="text-xs text-muted-foreground mt-1">JPG, PNG (Max 5MB)</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Master Recording</label>
                                            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group h-48">
                                                <div className="p-4 rounded-full bg-white/5 mb-4 group-hover:scale-110 transition-transform">
                                                    <Music size={24} className="text-muted-foreground" />
                                                </div>
                                                <p className="font-medium text-sm">Upload Audio</p>
                                                <p className="text-xs text-muted-foreground mt-1">WAV, FLAC (Max 50MB)</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium flex items-center gap-2">
                                                Ownership Document
                                                <SimpleTooltip content="Legal document proving your ownership of the master recording rights.">
                                                    <Info size={14} className="text-muted-foreground cursor-help" />
                                                </SimpleTooltip>
                                            </label>
                                            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group h-48">
                                                <div className="p-4 rounded-full bg-white/5 mb-4 group-hover:scale-110 transition-transform">
                                                    <FileText size={24} className="text-muted-foreground" />
                                                </div>
                                                <p className="font-medium text-sm">Upload PDF</p>
                                                <p className="text-xs text-muted-foreground mt-1">PDF (Max 10MB)</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-sm">
                                        <Info className="shrink-0 mt-0.5" size={16} />
                                        <p>
                                            By submitting this proposal, you certify that you own 100% of the master recording rights and have the legal authority to tokenize them.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                            <Button
                                variant="ghost"
                                onClick={prevStep}
                                disabled={step === 1}
                                className="gap-2"
                            >
                                <ArrowLeft size={16} /> Back
                            </Button>

                            {step < 3 ? (
                                <Button onClick={nextStep} className="gap-2">
                                    Next Step <ArrowRight size={16} />
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => setIsSuccessModalOpen(true)}
                                    className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                                >
                                    Submit Proposal <CheckCircle size={16} />
                                </Button>
                            )}
                        </div>
                    </GlassCard>

                    <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
                        <DialogContent className="sm:max-w-md bg-zinc-900 border-white/10 text-white">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2 text-xl">
                                    <CheckCircle className="text-green-500" size={24} />
                                    Proposal Submitted Successfully
                                </DialogTitle>
                                <DialogDescription className="text-zinc-400 pt-2">
                                    Your tokenization proposal has been received. We will process your submission within a maximum of <strong>2 business days</strong>.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-start mt-4">
                                <Button
                                    className="w-full bg-primary hover:bg-primary/90"
                                    onClick={() => router.push("/dashboard")}
                                >
                                    Go to Dashboard
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </main>
            <Footer />
        </div>
    );
}
