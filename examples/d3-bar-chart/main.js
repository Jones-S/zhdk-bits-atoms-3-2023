console.log("Displaying simple bar chart");

// Settings
const width = 1000;
const height = 600;
const barWidth = 20;
const gutter = 10;
const marginLeft = 30;
const marginBottom = 30;
const maxBarHeight = 500;

const data = [
  {
    Above_ground_potential_storage: 514335905421.954 / 10e8,
    Habitat_name: "Forest",
  },
  {
    Above_ground_potential_storage: 48233596224.5023 / 10e8,
    Habitat_name: "Savanna",
  },
  {
    Above_ground_potential_storage: 31659400958.1418 / 10e8,
    Habitat_name: "Shrubland",
  },
];

function drawChart(data) {
  const scale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.Above_ground_potential_storage)])
    .range([0, maxBarHeight]);

  // Create the SVG container.
  const svg = d3
    .select("#d3")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height]);

  svg
    .append("g")
    .attr("fill", "steelblue")
    // selecting is necessary, but we can add a random selector here ('whatever')
    // the return value is an empty selection:
    // https://github.com/d3/d3-selection/blob/v3.0.0/README.md#selectAll
    // if you ask yourself why:
    // https://stackoverflow.com/questions/17452508/what-is-the-point-of-calling-selectall-when-there-are-no-existing-nodes-yet-on-d
    .selectAll()
    .data(data)
    .join("rect")
    // .append("rect")
    .attr("x", (d, index) => {
      return marginLeft + index * (barWidth + gutter);
    })
    .attr("y", (d) => height - d.Above_ground_potential_storage)
    .attr("height", (d) => d.Above_ground_potential_storage)
    .attr("width", barWidth);

  // Add the x-axis and label.
  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisLeft(scale).tickSizeOuter(0));
}

drawChart(data);
