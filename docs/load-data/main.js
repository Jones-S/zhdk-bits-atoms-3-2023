console.log("Loading the data ...");

async function fetchData() {
  const url = "./data.json";
  let response = await fetch(url);

  if (response.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let json = await response.json();
    console.log("Finally received the response:");
    console.log("Response: ", json);
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

fetchData();
console.log("This is executed before the asynchronous call is finished");
