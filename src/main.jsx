import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Barplot from "./Barplot.jsx";

const data = [
  { country: "United States", students: 68, population: 343477335 },
  { country: "France", students: 21, population: 66438822 },
  { country: "United Kingdom", students: 21, population: 68682962 },
  { country: "Germany", students: 20, population: 84548231 },
  { country: "Switzerland", students: 13, population: 8870561 },
  { country: "Spain", students: 10, population: 47911579 },
  { country: "Netherlands", students: 9, population: 18092524 },
  { country: "India", students: 9, population: 1438069596 },
  { country: "Singapore", students: 8, population: 5789090 },
  { country: "Ireland", students: 8, population: 5196630 },
  { country: "Sweden", students: 7, population: 10551494 },
  { country: "Australia", students: 7, population: 26451124 },
  { country: "Canada", students: 6, population: 39299105 },
  { country: "Finland", students: 5, population: 5601185 },
  { country: "Mexico", students: 4, population: 129739759 },
  { country: "Brazil", students: 4, population: 211140729 },
  { country: "Saudi Arabia", students: 3, population: 32264292 },
  { country: "Romania", students: 3, population: 19118479 },
  { country: "Philippines", students: 3, population: 114891199 },
  { country: "New Zealand", students: 3, population: 5172836 },
];

const colorMap = {
  Switzerland: "var(--red)",
  Ireland: "var(--green)",
  Singapore: "var(--darkblue)",
};

const transformedData = data
  .map((d) => ({
    ...d,
    students_per_million: Number(
      (d.students / (d.population / 1_000_000)).toFixed(2),
    ),
    color: colorMap[d.country] ?? "var(--blue)",
  }))
  .filter((d, i) => i < 18);

// The chart dimensions (often passed as prop too)
const width = 750;
const height = 600;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Barplot data={transformedData} width={width} height={height} />
  </StrictMode>,
);
