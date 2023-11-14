const colorWheel = document.querySelector(".color-wheel");

function updateColorWheel(tokenData) {
  console.log("update color wheel");

  // select the inner wheel to adjust the rotation
  const innerWheel = colorWheel.querySelector(".inner-wheel");
  console.log("innerWheel: ", innerWheel);

  // The center is indicating around what point we are rotating
  // The SVG itself has a size of 387.52 (which is visible in the index.hml -> SVGs viewbox: viewBox="0 0 387.52 387.52")
  // We want to rotate exactly around the center of it, so we divide by 2.
  const centerX = 387.52 / 2;
  const centerY = 387.52 / 2;

  // adjust the current rotation
  // innerWheel.style.transform = `rotate(${tokenData.rotation})`;
  innerWheel.setAttribute(
    "transform",
    `rotate(${tokenData.rotation}, ${centerX}, ${centerY})`
  );

  // adjust the position
  const xPosPercentage = tokenData.relativeX * 100;
  const yPosPercentage = tokenData.relativeY * 100;

  const wheelSize = 200; // has to match the size set in style.css
  // Remark: It would be better if this size was save in 1 place, so adjusting it would not break our app...

  console.log("colorWheel: ", colorWheel);
  colorWheel.style.top = `calc(${yPosPercentage}% - ${wheelSize / 2}px)`;
  colorWheel.style.left = `calc(${xPosPercentage}% - ${wheelSize / 2}px)`;
}

function addColorWheel(tokenData) {
  console.log("add color wheel");
  colorWheel.classList.add("is-visible");
}

function listenToTokens() {
  const server = `ws://localhost:6050`;
  const ws = new WebSocket(server);

  ws.onopen = () => {
    console.log("🧦 Websocket connection established.");
  };

  ws.onerror = (error) => {
    console.log(`WebSocket error: `, error);
  };

  ws.onmessage = (msg) => {
    let json;

    // sometimes (for example the first message)
    // is no stringified JSON, then we don't want to proceed
    try {
      json = JSON.parse(msg?.data);
    } catch (error) {
      return;
    }

    const data = json.args;
    console.log("🖲️ New data from token: ", data);

    if (json?.type === "/tracker/add") {
      addColorWheel(data);
    } else if (json?.type === "/tracker/update") {
      updateColorWheel(data);
    }
  };
}

listenToTokens();
