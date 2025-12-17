"use client";

import { Footer } from "@/components/layout/Footer";
import { HallOfFameCarousel } from "@/components/sync-catalog/HallOfFameCarousel";
import { MasterRecordingList } from "@/components/sync-catalog/MasterRecordingList";
import { GradientText } from "@/components/shared/GradientText";
import { motion } from "framer-motion";

export default function SyncCatalog() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <main className="flex-grow">
                {/* Header Section */}
                {/* Header Section */}
                <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/images/sync-catalog-header-bg.png"
                            alt="Sync Catalog Background"
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
                    </div>

                    {/* Animated Content */}
                    <div className="relative z-10 container mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                                Sync <GradientText>Catalog</GradientText>
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        >
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                                Discover premium master recordings for your next film, game, or commercial project.
                                <br className="hidden md:block" />
                                <span className="text-foreground font-medium">Direct licensing on the blockchain.</span>
                            </p>
                        </motion.div>

                        {/* Interactive Floating Elements */}
                        <motion.div
                            className="absolute top-1/4 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl"
                            animate={{
                                x: [0, 30, 0],
                                y: [0, -30, 0],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
                            animate={{
                                x: [0, -40, 0],
                                y: [0, 40, 0],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1,
                            }}
                        />
                    </div>
                </section>

                {/* Hall of Fame Carousel */}
                <section className="mb-10 container mx-auto px-4">
                    <HallOfFameCarousel />
                </section>

                {/* Catalog List */}
                <section className="container mx-auto px-4 pb-20">
                    <MasterRecordingList />
                </section>
            </main>
            <Footer />
        </div>
    );
}
