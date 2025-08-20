//Selecting Elements
const display = document.getElementById("display");
const preview = document.getElementById("preview");
const keys = document.getElementById("keys");

let currentInput = "";

// Always remove focus from input
display.setAttribute("readonly", true);
display.blur();

// Append value
function appendValue(value) {
  currentInput += value;
  display.value = currentInput;
}

// Clear all
function clearAll() {
  currentInput = "";
  display.value = "";
  preview.textContent = "0";
}

// Delete last
function deleteOne() {
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
}

// Calculate
function equals() {
  if (currentInput === "") return;
  try {
    const result = eval(currentInput);
    preview.textContent = currentInput;
    display.value = result;
    currentInput = result.toString();
  } catch {
    display.value = "Error";
    currentInput = "";
  }
}
// Handle button clicks
keys.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;
  const value = btn.dataset.value;

  if (action === "clear") return clearAll();
  if (action === "delete") return deleteOne();
  if (action === "equals") return equals();
  if (value !== undefined) return appendValue(value);
});

// ✅ Keyboard support 
window.addEventListener("keydown", (e) => {
  const key = e.key;

// Prevent double input from input box
  e.preventDefault();

  if (!isNaN(key)) {
    appendValue(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    appendValue(key);
  } else if (key === "Enter" || key === "=") {
    equals();
  } else if (key === "Backspace") {
    deleteOne();
  } else if (key === "Escape") {
    clearAll();
  } else if (key === ".") {
    appendValue(".");
  } else if (action === 'percent') {
    display.value = parseFloat(display.value) / 100;
}
});
