console.log("Loading the data ...");

async function fetchData() {
  const url = "./data.json";
  let response = await fetch(url);

  if (response.ok) {
    let json = await response.json();
    console.log("json: ", json);
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

fetchData();
console.log("This is executed before the asynchronous call is finished");
