console.log("Displaying simple bar chart");

// Settings
const width = 928;
const height = 500;

async function fetchData() {
  const url = "./data.json";
  let response = await fetch(url);

  if (response.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let json = await response.json();
    console.log("Finally received the response:");
    console.log("Response: ", json);

    drawChart();
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

function drawChart() {
  // Create the SVG container.
  const svg = d3
    .select("#d3")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
}

fetchData();
