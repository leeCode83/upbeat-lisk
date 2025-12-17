"use client";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import { GradientText } from "@/components/shared/GradientText";
import { GlassCard } from "@/components/shared/GlassCard";
import { HeroBackground } from "@/components/shared/HeroBackground";
import { ArrowRight, Music, Coins, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ShowcaseGallery } from "@/components/showcase/ShowcaseGallery";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden">
          {/* Background Elements */}
          <HeroBackground />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-2">
                The Future of <br />
                Music Investment
              </h1>
              <div className="h-1 w-64 bg-gradient-to-r from-purple-600 to-transparent mb-8 opacity-80" />

              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                Connect with your favorite artists, invest in their success, and earn royalties through blockchain technology.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-purple-600/80 to-purple-900/80 text-lg h-14 px-10 rounded-full font-semibold shadow-lg shadow-primary/25">
                  Start Investing <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg h-14 px-10 rounded-full border-white/20 hover:bg-white/10">
                  For Artists
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Showcase Section */}
        <ShowcaseGallery />

        {/* Features Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 flex flex-col items-center">
              <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600/80 to-purple-900/80 text-white text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
                Why Choose Us?
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Upbeats?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                We provide a comprehensive ecosystem for artists and fans to grow together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Tokenization Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group relative h-[500px] rounded-3xl overflow-hidden bg-neutral-900/50 border border-white/5"
              >
                {/* Image Placeholder */}
                <img
                  src="https://images.unsplash.com/photo-1672911640671-65d5dfa97d26?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Tokenization"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Content Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-50">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <Coins className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">Tokenization</h3>
                    <p className="text-gray-300 text-sm leading-relaxed pr-12">
                      Artists can tokenize their master recordings. Fans buy tokens to own a share of the revenue.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* DeFi Lending Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative h-[500px] rounded-3xl overflow-hidden bg-neutral-900/50 border border-white/5"
              >
                {/* Image Placeholder */}
                <img
                  src="https://plus.unsplash.com/premium_photo-1733342554594-102b8e2d0623?q=80&w=1431&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Tokenization"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Content Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-50">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">DeFi Lending</h3>
                    <p className="text-gray-300 text-sm leading-relaxed pr-12">
                      Artists can use their future streaming revenue as collateral to get instant loans for production.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Fan Engagement Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group relative h-[500px] rounded-3xl overflow-hidden bg-neutral-900/50 border border-white/5"
              >
                {/* Image Placeholder */}
                <img
                  src="https://images.unsplash.com/photo-1622675363311-3e1904dc1885?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Tokenization"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Content Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-50">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">Fan Engagement</h3>
                    <p className="text-gray-300 text-sm leading-relaxed pr-12">
                      Token holders get exclusive perks like meet & greets, voting rights, and VIP concert tickets.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked <GradientText>Questions</GradientText>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about Upbeats, tokenization, and lending.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <GlassCard>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="hover:no-underline">What is Upbeats?</AccordionTrigger>
                    <AccordionContent>
                      Upbeats is a blockchain-based platform that connects independent artists with fans and investors. It allows artists to tokenize their master recordings to raise funds and provides instant liquidity through DeFi lending.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="hover:no-underline">How does tokenization work?</AccordionTrigger>
                    <AccordionContent>
                      Tokenization involves creating digital assets (tokens) that represent a share of the ownership or future revenue of a song. Fans can buy these tokens to support the artist and earn a portion of the streaming royalties.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="hover:no-underline">Is my investment safe?</AccordionTrigger>
                    <AccordionContent>
                      All transactions are recorded on the blockchain for transparency. However, like all investments, there are risks involved. We recommend diversifying your portfolio and doing your own research.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="hover:no-underline">How do I apply for a loan?</AccordionTrigger>
                    <AccordionContent>
                      Artists can apply for a loan by connecting their streaming accounts and wallet. Our system analyzes your streaming history to determine your borrowing limit. If approved, you can use your future revenue as collateral to get instant funds.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="hover:no-underline">What are the fees?</AccordionTrigger>
                    <AccordionContent>
                      Upbeats charges a small platform fee on token sales and loan originations. Specific fee structures are detailed in the terms of service for each transaction.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 pointer-events-none" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to join the revolution?</h2>
            <Link href="/tokenization">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 text-lg h-14 px-10 rounded-full font-bold">
                Explore Marketplace
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
