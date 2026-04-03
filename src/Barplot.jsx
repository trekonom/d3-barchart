import { useState } from "react";
import * as d3 from "d3";
import "./Barplot.css";

// Initialize React Component
function Barplot({ data, width, height }) {
  // 1️⃣ Do some math with D3
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.students)])
    .range([0, width - 175]);
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, height - 100 - 20]);

  const offsetx = 130;
  const offsety = 95;

  const axisMargin = 5;

  const ySource = height - 5;

  // 2️⃣ Render with React (JSX!) using the D3 maths
  return (
    <svg width={width} height={height} className="barplot">
      <rect x={0} y={0} width={width} height={height} className="plot-bg" />
      <text x={5} y={25} className="title">
        Which countries punch above their weight in student representation?
      </text>
      <text x={5} y={50} className="subtitle">
        <tspan dy={0}>
          Although the United States accounts for the largest number of students
          in absolute terms,
        </tspan>
        <tspan dy="1.2em" x={5}>
          <tspan fontWeight="bold" fill="var(--green)">
            Ireland
          </tspan>
          ,{" "}
          <tspan fontWeight="bold" fill="var(--red)">
            Switzerland
          </tspan>
          , and{" "}
          <tspan fontWeight="bold" fill="var(--darkblue)">
            Singapore
          </tspan>{" "}
          stand out most on a per-capita basis.
        </tspan>
      </text>
      {data.map((d, i) => {
        const x = xScale(d.students);
        const yLabel = yScale(d.country) + offsety + yScale.bandwidth() / 2 + 1;
        const yBar = yScale(d.country) + offsety;
        const align = d.students < 30 ? "left" : "right";
        const textOffset = d.students < 30 ? 5 : -5;

        return (
          <g key={i}>
            <text
              key={"x-" + i}
              x={axisMargin}
              y={yLabel}
              className="xAxisText"
            >
              {d.country}
            </text>
            <rect
              key={"bar-" + i}
              x={offsetx}
              y={yBar}
              width={xScale(d.students)}
              height={yScale.bandwidth() - 5}
              fill={d.color}
              className="bar"
            />
            <text
              key={"label-" + i}
              x={offsetx + textOffset + xScale(d.students)}
              y={yLabel}
              className={`label ${align}`}
            >
              {d.students}
              {i === 0 ? " students" : ""} ({d.students_per_million}
              {i === 0 ? " students per million inhabitants" : ""})
            </text>
          </g>
        );
      })}

      <text x={5} y={ySource} className="source">
        Data Source: Yan Holtz (student numbers),{" "}
        <a
          href="https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population_%28United_Nations%29"
          target="_blank"
          rel="noopener noreferrer"
        >
          <tspan className="svg-link">Wikipedia</tspan>
        </a>{" "}
        (population numbers)
      </text>
    </svg>
  );
}

export default Barplot;
