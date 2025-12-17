"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "Neon Horizon",
        artist: "Cyber Collective",
        genre: "Synthwave",
        year: "2024",
        description: "A journey through the digital soundscapes of a retro-futuristic world. Neon Horizon blends analog synths with modern production.",
        image: "/images/showcase/neon-horizon.png",
        streams: "1.2M"
    },
    {
        id: 2,
        title: "Ethereal Echoes",
        artist: "Luna Moth",
        genre: "Ambient",
        year: "2023",
        description: "Drift away into a dreamlike state with Ethereal Echoes. Soft textures and haunting vocals create an immersive experience.",
        image: "/images/showcase/ethereal-echoes.png",
        streams: "850K"
    },
    {
        id: 3,
        title: "Urban Jungle",
        artist: "The Beatsmiths",
        genre: "Hip Hop",
        year: "2024",
        description: "Raw energy and gritty beats define Urban Jungle. A tribute to the streets and the stories they hold.",
        image: "/images/showcase/urban-jungle.png",
        streams: "2.5M"
    },
    {
        id: 4,
        title: "Midnight Jazz",
        artist: "Blue Note Quartet",
        genre: "Jazz",
        year: "2022",
        description: "Smooth saxophones and walking basslines for late-night contemplation. Recorded live in New York City.",
        image: "/images/showcase/midnight-jazz.png",
        streams: "500K"
    },
    {
        id: 5,
        title: "Solar Flare",
        artist: "Star Dust",
        genre: "Pop",
        year: "2025",
        description: "Explosive pop anthems that shine as bright as the sun. Catchy hooks and danceable rhythms.",
        image: "/images/showcase/solar-flare.png",
        streams: "3.1M"
    }
];

export function ShowcaseGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const [expandedId, setExpandedId] = useState<number | null>(null);

    // Initial ScrollTrigger setup
    useGSAP(() => {
        const pin = gsap.fromTo(
            sectionRef.current,
            {
                x: 0,
            },
            {
                x: () => -(sectionRef.current!.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: () => `+=${sectionRef.current!.scrollWidth - window.innerWidth}`,
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            }
        );

        return () => {
            pin.kill();
        };
    }, { scope: containerRef });

    // Handle Card Expansion Animation
    useGSAP(() => {
        // Animate all cards based on state
        projects.forEach((project) => {
            const isExpanded = expandedId === project.id;
            const cardSelector = `.card-${project.id}`;
            const imageSelector = `.image-${project.id}`;
            const overlaySelector = `.overlay-${project.id}`;
            const titleSelector = `.title-${project.id}`;
            const detailsSelector = `.details-${project.id}`;

            // Card Width
            gsap.to(cardSelector, {
                width: isExpanded ? "60vw" : "20vw",
                duration: 1,
                ease: "power3.inOut",
                onUpdate: () => ScrollTrigger.refresh() // Refresh scroll calculation during animation
            });

            // Image Scale
            gsap.to(imageSelector, {
                scale: isExpanded ? 1 : 1.1,
                duration: 1,
                ease: "power3.inOut"
            });

            // Overlay Opacity
            gsap.to(overlaySelector, {
                opacity: isExpanded ? 0.2 : 0.4,
                duration: 1,
                ease: "power3.inOut"
            });

            // Title Size & Position
            // Note: className toggling is handled by React, but we can animate properties if needed.
            // For font-size, standard CSS transition is often smoother as it triggers layout reflow,
            // but GSAP can handle it too. Here we stick to width/scale primarily for performance.

            // Details Section
            if (isExpanded) {
                gsap.to(detailsSelector, {
                    height: "auto",
                    opacity: 1,
                    marginTop: "1.5rem",
                    duration: 1,
                    ease: "power3.inOut"
                });
            } else {
                gsap.to(detailsSelector, {
                    height: 0,
                    opacity: 0,
                    marginTop: 0,
                    duration: 1,
                    ease: "power3.inOut"
                });
            }
        });

    }, { dependencies: [expandedId], scope: sectionRef });

    const handleCardClick = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div ref={containerRef} className="overflow-x-hidden">
            <div ref={triggerRef} className="h-screen w-screen flex items-center overflow-hidden bg-black relative">

                <div ref={sectionRef} className="flex flex-nowrap h-full items-center pl-20 gap-8">
                    <div className="min-w-[40vw] h-[60vh] flex flex-col justify-center shrink-0">
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Discover <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                                Sonic Landscapes
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-md">
                            Immerse yourself in a curated collection of groundbreaking audio experiences.
                        </p>
                    </div>

                    {projects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => handleCardClick(project.id)}
                            className={`card-${project.id} relative h-[60vh] rounded-3xl overflow-hidden cursor-pointer shrink-0 border border-white/10`}
                            style={{ width: "20vw" }} // Initial width handled by GSAP mostly, but safe default
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 w-full h-full">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className={`image-${project.id} w-full h-full object-cover scale-110`}
                                />
                                <div className={`overlay-${project.id} absolute inset-0 bg-black/40`} />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8">
                                <div>
                                    <h3 className={`title-${project.id} font-bold mb-1 leading-tight ${expandedId === project.id ? "text-4xl" : "text-2xl"}`}>
                                        {project.title}
                                    </h3>
                                    <p className="text-lg text-gray-300 font-medium">{project.artist}</p>

                                    {/* Expanded Details */}
                                    <div className={`details-${project.id} overflow-hidden h-0 opacity-0`}>
                                        <div className="min-h-0 pt-2">
                                            <div className="flex flex-wrap gap-3 mb-6">
                                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium tracking-wide uppercase">
                                                    {project.genre}
                                                </span>
                                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium tracking-wide">
                                                    {project.year}
                                                </span>
                                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium tracking-wide flex items-center gap-1">
                                                    <Play className="w-3 h-3 fill-current" /> {project.streams}
                                                </span>
                                            </div>

                                            <p className="text-gray-200 text-lg leading-relaxed mb-8 max-w-2xl">
                                                {project.description}
                                            </p>

                                            <div className="flex items-center gap-4">
                                                <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200 px-8">
                                                    <Play className="w-4 h-4 mr-2 fill-current" /> Listen Now
                                                </Button>
                                                <Button variant="outline" size="icon" className="rounded-full border-white/30 hover:bg-white/10 w-12 h-12">
                                                    <Heart className="w-5 h-5" />
                                                </Button>
                                                <Button variant="outline" size="icon" className="rounded-full border-white/30 hover:bg-white/10 w-12 h-12">
                                                    <Share2 className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
