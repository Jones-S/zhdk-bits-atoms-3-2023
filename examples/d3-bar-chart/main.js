console.log("Displaying simple bar chart");

// Settings
const width = 928;
const height = 1000;
const marginTop = 30;
const marginRight = 0;
const marginBottom = 30;
const marginLeft = 40;
const bandWidth = 20;
const gutter = 10;

async function fetchData() {
  const url = "./data.json";
  let response = await fetch(url);

  if (response.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let json = await response.json();
    console.log("Finally received the response:");
    console.log("Response: ", json);

    drawChart(json);
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

function drawChart(data) {
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
      return marginLeft + index * (bandWidth + gutter);
    })
    .attr("y", (d) => height - d.Above_ground_potential_storage / 10e8)
    .attr("height", (d) => d.Above_ground_potential_storage / 10e8)
    .attr("width", bandWidth);
    .
}

fetchData();
