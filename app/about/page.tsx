"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GradientText } from "@/components/shared/GradientText";
import Image from "next/image";

export default function About() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
            {/* <Navbar /> */}

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="pt-20 pb-12 text-center container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Empowering the <br />
                        <GradientText>Creative Community</GradientText>
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-12">
                        Upbeats is on a mission to democratize music investment and
                        provide artists with the financial freedom they deserve.
                    </p>

                    {/* Hero Image Placeholder */}
                    <div className="w-full max-w-5xl mx-auto aspect-[21/9] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
                        <Image
                            src="/images/about/hero.png"
                            alt="Empowering Creative Community"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Overlay gradient (opsional, hapus jika tidak ingin ada efek warna di atas gambar) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 opacity-50 z-10" />
                    </div>
                </section>

                {/* Mission / Intro Section */}
                <section className="py-20 container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                                Empowering the <br />
                                Music <span className="text-white">Industry</span>
                            </h2>
                        </div>
                        <div className="md:w-1/2">
                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                                <br /><br />
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                            {/* Decorative Dots */}
                            <div className="flex gap-3 justify-end">
                                <div className="w-4 h-4 rounded-full bg-white/20" />
                                <div className="w-4 h-4 rounded-full bg-white/40" />
                                <div className="w-4 h-4 rounded-full bg-white/80" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Story / Numbered Features */}
                <section className="py-20 container mx-auto px-4">
                    <h3 className="text-2xl font-bold mb-12">Our Story</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Item 01 */}
                        <div className="border-t border-white/10 pt-8">
                            <div className="flex items-baseline gap-4 mb-4">
                                <span className="text-5xl font-bold text-white">01</span>
                                <span className="text-xl font-semibold text-gray-300">Community First</span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                We believe in the power of fans and artists working together.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Quisque faucibus ex sapien, vitae pellentesque sem placerat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                        </div>

                        {/* Item 02 */}
                        <div className="border-t border-white/10 pt-8">
                            <div className="flex items-baseline gap-4 mb-4">
                                <span className="text-5xl font-bold text-white">02</span>
                                <span className="text-xl font-semibold text-gray-300">Global Access</span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                Music knows no borders, and neither should investment opportunities.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Alternating Feature Sections */}
                <section className="py-20 container mx-auto px-4 space-y-32">
                    {/* Feature 1: Community First (Text Left, Image Right) */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Community First</h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                We believe in the power of fans and artists working together.
                                Lorem ipsum dolor sit amet consectetur adipiscing elit.
                                Quisque faucibus ex sapien vitae pellentesque sem placerat.
                            </p>
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-white/30" />
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="w-full aspect-square bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                                <Image
                                    src="/images/about/community.png"
                                    alt="Community First"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent opacity-50 z-10" />
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: Global Access (Image Left, Text Right) */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Global Access</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Music knows no borders, and neither should investment opportunities.
                                Lorem ipsum dolor sit amet consectetur adipiscing elit.
                                Quisque faucibus ex sapien vitae pellentesque sem placerat.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <div className="w-full aspect-square bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                                <Image
                                    src="/images/about/global-access.png"
                                    alt="Global Access"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-bl from-pink-900/20 to-transparent opacity-50 z-10" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-24 container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet The Team</h2>
                        <p className="text-muted-foreground">Behind our project</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                id: 1,
                                name: "Alex Rivera",
                                role: "CEO & Founder",
                                image: "/images/about/team-1.png",
                                bio: "Visionary leader with 10+ years in the music industry and blockchain development."
                            },
                            {
                                id: 2,
                                name: "Sarah Chen",
                                role: "Creative Director",
                                image: "/images/about/team-2.png",
                                bio: "Award-winning designer passionate about bridging the gap between art and technology."
                            },
                            {
                                id: 3,
                                name: "Marcus Johnson",
                                role: "Head of Technology",
                                image: "/images/about/team-3.png",
                                bio: "Blockchain architect and full-stack developer with a focus on decentralized systems."
                            }
                        ].map((member) => (
                            <div key={member.id} className="group">
                                <div className="aspect-[3/4] bg-white/5 rounded-2xl border border-white/10 mb-6 flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:border-purple-500/30">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                    <p className="text-purple-400 text-sm font-medium mb-3">{member.role}</p>
                                    <p className="text-xs text-muted-foreground max-w-[250px] mx-auto leading-relaxed">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
