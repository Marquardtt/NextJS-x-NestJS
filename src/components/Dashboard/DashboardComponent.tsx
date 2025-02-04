"use client";

import { userService } from "@/services/userService";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export const DashboardComponent = () => {
  const svgRef1 = useRef<SVGSVGElement | null>(null);
  const svgRef2 = useRef<SVGSVGElement | null>(null);
  const [ageCounts, setAgeCounts] = useState<{ age: number; count: number }[]>([]);

  useEffect(() => {
    const fetchAgeData = async () => {
      const allUsers = await userService.getAll();
      const ages = allUsers.map(user => Number(user.age));
      const ageFrequency = d3.rollup(ages, v => v.length, d => d);
      const ageData = Array.from(ageFrequency, ([age, count]) => ({ age, count }));

      setAgeCounts(ageData);
    };

    fetchAgeData();
  }, []);

  useEffect(() => {
    if (!ageCounts.length || !svgRef1.current) return;
    const width = 600, height = 300, margin = 40;
    const xScale = d3.scaleBand()
      .domain(ageCounts.map(d => d.age.toString()))
      .range([margin, width - margin])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(ageCounts, d => d.count) as number])
      .nice()
      .range([height - margin, margin]);

    const svg = d3.select(svgRef1.current);
    svg.selectAll("*").remove();

    svg.append("g")
      .attr("transform", `translate(0,${height - margin})`)
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .attr("transform", `translate(${margin},0)`)
      .call(d3.axisLeft(yScale));

    svg.selectAll(".bar")
      .data(ageCounts)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.age.toString()) as number)
      .attr("y", d => yScale(d.count))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - margin - yScale(d.count))
      .attr("fill", "steelblue");
  }, [ageCounts]);

  useEffect(() => {
    if (!ageCounts.length || !svgRef2.current) return;

    const width = 300, height = 300, radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie<{ age: number, count: number }>()
      .value(d => d.count)(ageCounts);

    const arc = d3.arc<d3.PieArcDatum<{ age: number, count: number }>>()
      .innerRadius(80)
      .outerRadius(radius);

    const svg = d3.select(svgRef2.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    svg.selectAll("path")
      .data(pie)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i.toString()))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    svg.selectAll("text")
      .data(pie)
      .enter()
      .append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "white")
      .text(d => d.data.age.toString());

  }, [ageCounts]);

  return (
    <div className="w-full h-full pt-14">
      <div className="flex justify-center ">
        {/* <span className="cursor-pointer pi pi-window-maximize text-lg p-3" onClick={() => document.documentElement.requestFullscreen()}></span> */}
      </div>

      <div className="flex justify-center items-center w-full">
        <div className="w-fit grid grid-cols-2 grid-rows-2 gap-10">
          <div className="col-start-1 row-start-1 flex flex-col items-center w-fit text-black dark:text-white">
            <h2 className="text-xl font-bold mb-4">Teste</h2>
            <svg ref={svgRef1} width={600} height={300} className=" rounded-md "></svg>
          </div>
          <div className="col-start-1 row-start-2 flex flex-col items-center w-fit text-black dark:text-white">
            <h2 className="text-xl font-bold mb-4">Idades</h2>
            <svg ref={svgRef2} width={600} height={300} className=" rounded-md"></svg>
          </div>
          <div className="col-start-2 row-span-2 flex flex-col items-center w-fit text-black dark:text-white">
            <h2 className="text-xl font-bold mb-4">Teste</h2>
            <svg ref={null} width={800} className="w-full h-full border rounded-md "></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
