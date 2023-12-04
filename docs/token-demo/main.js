const colorWheel = document.querySelector(".color-wheel");
const selectorWheel = document.querySelector(".selector-wheel");
const background = document.querySelector("#background");

function updateColorWheel(tokenData) {
  // select the inner wheel to adjust the rotation
  const innerWheel = colorWheel.querySelector(".inner-wheel");

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

  const wheelSize = 350; // has to match the size set in style.css
  // Remark: It would be better if this size was save in 1 place, so adjusting it would not break our app...

  colorWheel.style.top = `calc(${yPosPercentage}% - ${wheelSize / 2}px)`;
  colorWheel.style.left = `calc(${xPosPercentage}% - ${wheelSize / 2}px)`;
}

function updateSelector(tokenData) {
  // select the inner wheel to adjust the rotation
  const innerWheel = selectorWheel.querySelector(".inner-wheel");

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

  const wheelSize = 350; // has to match the size set in style.css
  // Remark: It would be better if this size was save in 1 place, so adjusting it would not break our app...

  selectorWheel.style.top = `calc(${yPosPercentage}% - ${wheelSize / 2}px)`;
  selectorWheel.style.left = `calc(${xPosPercentage}% - ${wheelSize / 2}px)`;
}

function addColorWheel(tokenData) {
  colorWheel.classList.add("is-visible");
}

function addSelectorWheel(tokenData) {
  selectorWheel.classList.add("is-visible");
}

function removeColorWheel(tokenData) {
  colorWheel.classList.remove("is-visible");
}

function removeSelectorWheel(tokenData) {
  selectorWheel.classList.remove("is-visible");
}

function udpateBackground(tokenData) {
  let color;

  // detecting in what quarter of the wheel we are
  if (0 <= tokenData.rotation && tokenData.rotation < 90) {
    color = "yellow";
  } else if (90 <= tokenData.rotation && tokenData.rotation < 180) {
    color = "blue";
  } else if (180 <= tokenData.rotation && tokenData.rotation < 270) {
    color = "red";
  } else if (270 <= tokenData.rotation && tokenData.rotation <= 360) {
    color = "green";
  }
  console.log("background: ", background);
  background.classList.remove(...background.classList); // quick way to remove all classes which are in the classList
  background.classList.add(`is-${color}`);
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
    console.log("🖲️ New data from token: ", data, json);

    if (json?.type === "/tracker/add") {
      if (data.id === 0) {
        addColorWheel(data);
      } else {
        addSelectorWheel(data);
      }
    } else if (json?.type === "/tracker/remove") {
      if (data.id === 0) {
        removeColorWheel(data);
      } else {
        removeSelectorWheel(data);
      }
    } else if (json?.type === "/tracker/update") {
      if (data.id === 0) {
        updateColorWheel(data);
        udpateBackground(data);
      } else {
        updateSelector(data);
      }
    }
  };
}

listenToTokens();
