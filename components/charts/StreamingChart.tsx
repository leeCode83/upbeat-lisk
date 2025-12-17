"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface StreamingData {
    month: string;
    streams?: number;
    spotify: number;
    youtube: number;
    apple: number;
}

interface StreamingChartProps {
    data: StreamingData[];
}

function useResizeObserver<T extends HTMLElement>(ref: React.RefObject<T | null>) {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!ref.current) return;

        // Initial size
        setSize({
            width: ref.current.clientWidth,
            height: ref.current.clientHeight
        });

        const observer = new ResizeObserver((entries) => {
            if (!entries || entries.length === 0) return;
            const { width, height } = entries[0].contentRect;
            setSize({ width, height });
        });

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref]);

    return size;
}

export function StreamingChart({ data }: StreamingChartProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const dimensions = useResizeObserver(containerRef);

    useEffect(() => {
        if (!data || data.length === 0 || dimensions.width === 0 || dimensions.height === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous render

        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = dimensions.width - margin.left - margin.right;
        const height = dimensions.height - margin.top - margin.bottom;

        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X Axis
        const x = d3.scalePoint()
            .domain(data.map(d => d.month))
            .range([0, width]);

        // Y Axis
        const maxY = d3.max(data, d => Math.max(d.spotify, d.youtube, d.apple)) || 0;
        const y = d3.scaleLinear()
            .domain([0, maxY * 1.1]) // Add some headroom
            .range([height, 0]);

        // Gridlines
        const makeYLines = () => d3.axisLeft(y).ticks(5);
        g.append("g")
            .attr("class", "grid opacity-10")
            .call(makeYLines().tickSize(-width).tickFormat(() => ""));

        // Axes
        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("color", "currentColor") // Use current text color
            .style("fill", "currentColor")
            .style("font-size", "10px")
            .style("opacity", 0.7);

        g.select(".domain").remove(); // Remove axis line

        g.append("g")
            .call(d3.axisLeft(y).ticks(5).tickFormat(d => d.valueOf() >= 1000 ? `${d.valueOf() / 1000}k` : `${d}`))
            .selectAll("text")
            .style("color", "currentColor")
            .style("fill", "currentColor")
            .style("font-size", "10px")
            .style("opacity", 0.7);

        g.select(".domain").remove(); // Remove axis line

        // Line Generators
        const lineSpotify = d3.line<StreamingData>()
            .x(d => x(d.month) || 0)
            .y(d => y(d.spotify))
            .curve(d3.curveMonotoneX);

        const lineYoutube = d3.line<StreamingData>()
            .x(d => x(d.month) || 0)
            .y(d => y(d.youtube))
            .curve(d3.curveMonotoneX);

        const lineApple = d3.line<StreamingData>()
            .x(d => x(d.month) || 0)
            .y(d => y(d.apple))
            .curve(d3.curveMonotoneX);

        // Add Lines
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#1DB954")
            .attr("stroke-width", 2)
            .attr("d", lineSpotify);

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#FF0000")
            .attr("stroke-width", 2)
            .attr("d", lineYoutube);

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#FFFFFF")
            .attr("stroke-width", 2)
            .attr("d", lineApple);

        // Add Dots + Tooltips (Simple implementation)
        const addDots = (streamKey: keyof Pick<StreamingData, 'spotify' | 'youtube' | 'apple'>, color: string) => {
            g.selectAll(`.dot-${streamKey}`)
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", d => x(d.month) || 0)
                .attr("cy", d => y(d[streamKey] as number))
                .attr("r", 4)
                .attr("fill", color)
                .attr("stroke", "#000")
                .attr("stroke-width", 1)
                .style("opacity", 0.8)
        };

        addDots("spotify", "#1DB954");
        addDots("youtube", "#FF0000");
        addDots("apple", "#FFFFFF");

    }, [data, dimensions]);

    return (
        <div ref={containerRef} className="w-full h-full min-h-[300px]">
            <svg ref={svgRef} width={dimensions.width} height={dimensions.height} className="overflow-visible" />
        </div>
    );
}
