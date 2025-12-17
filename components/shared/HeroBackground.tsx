"use client";

export function HeroBackground() {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60"
            >
                <source src="/upbeats-mascot.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
        </div>
    );
}
