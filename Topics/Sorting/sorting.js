let arr = [];
let visualization = null;
let speed = 300;

// --- Sleep Utility
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Render Bars
function renderArray(array, highlightIndices = []) {
  if (!visualization) return;
  visualization.innerHTML = "";

  array.forEach((val, i) => {
    const barContainer = document.createElement("div");
    barContainer.style.display = "inline-block";
    barContainer.style.margin = "0 4px";
    barContainer.style.textAlign = "center";

    // number label
    const label = document.createElement("div");
    label.innerText = val;
    label.style.fontSize = "12px";
    label.style.marginBottom = "2px";

    // bar
    const bar = document.createElement("div");
    bar.style.height = (val * 2) + "px";
    bar.style.width = "25px";
    bar.style.backgroundColor = highlightIndices.includes(i) ? "red" : "teal";
    bar.style.borderRadius = "5px";

    barContainer.appendChild(label);
    barContainer.appendChild(bar);
    visualization.appendChild(barContainer);
  });
}

// --- Parse User Array
function prepareBubbleSort() {
  const input = document.getElementById("userArray").value.trim();
  if (!input) {
    alert("Please enter some numbers!");
    return;
  }
  arr = input.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x));
  if (arr.length === 0) {
    alert("Invalid input!");
    return;
  }
  renderArray(arr);
  document.getElementById("logicPanel").innerText = "Array ready. Click ▶ Start Visualization to begin.";
}

// --- Bubble Sort Visualization
async function startBubbleSort() {
  if (arr.length === 0) {
    alert("Please enter an array first.");
    return;
  }

  speed = parseInt(document.getElementById("speedControl").value);
  document.getElementById("speedLabel").innerText = speed + " ms";

  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      renderArray(arr, [j, j+1]);
      updateLogic(`Comparing ${arr[j]} and ${arr[j+1]}...`);
      await sleep(speed);

      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]; // swap
        renderArray(arr, [j, j+1]);
        updateLogic(`Swapped → ${arr[j]} and ${arr[j+1]}`);
        await sleep(speed);
      }
    }
    updateLogic(`Pass ${i+1} completed`);
  }

  renderArray(arr);
  updateLogic("✅ Array Sorted!");
}

// --- Logic Panel Updates
function updateLogic(text) {
  const panel = document.getElementById("logicPanel");
  panel.innerText = text;
}
