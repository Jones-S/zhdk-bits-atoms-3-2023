console.log("Loading the data ...");

function displayData(data) {
  const ul = document.getElementsByClassName("habitat-list")[0];

  data.forEach((habitat) => {
    const text = `${habitat.Habitat_name}: ${habitat.Above_ground_potential_storage}`;
    const li = document.createElement("li");
    li.innerHTML = text;
    ul.appendChild(li);
  });
}

async function fetchData() {
  const url = "./data.json";
  let response = await fetch(url);

  if (response.ok) {
    let json = await response.json();
    displayData(json);
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

fetchData();
console.log("This is executed before the asynchronous call is finished");
