let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector("#screen");

function buttonClick(value) {
  if (isNaN(parseFloat(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerenderScreen();
}

function handleNumber(number) {
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
  buffer = parseFloat(buffer).toString();
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;

    case "=":
      if (previousOperator === null) {
        // Need numbers to do math
        return;
      }
      console.log(runningTotal);
      calculate(parseFloat(runningTotal));
      buffer = "" + runningTotal;
      runningTotal = 0;
      previousOperator = null;
      break;

    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;

    case "+":
    case "-":
      if (previousOperator === null) {
        previousOperator = symbol;
        runningTotal = parseFloat(buffer);
      } else {
        calculate(parseFloat(buffer));
        previousOperator = symbol;
      }
      buffer = "0";
      break;

    case "x":
    case "÷":
      if (previousOperator === null) {
        previousOperator = symbol;
        runningTotal = parseFloat(buffer);
      } else {
        // Check if a number has been entered before clicking the operator
        if (buffer === "0") {
          previousOperator = symbol;
        } else {
          calculate(parseFloat(buffer));
          previousOperator = symbol;
        }
      }
      buffer = "0";
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    // do nothing
    return;
  }

  let intBuffer = parseFloat(buffer);

  if (buffer[0] === "-") {
    intBuffer = -intBuffer;
  }

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    calculate(intBuffer);
  }

  previousOperator = symbol;
  buffer = "0";
}

function calculate(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "x") {
    runningTotal *= intBuffer;
  } else if (previousOperator === "÷") {
    if (intBuffer === 0) {
      buffer = "Error: Division by 0";
      runningTotal = 0;
      previousOperator = null;
      return;
    }
    runningTotal /= intBuffer;
  }
}

function init() {
  document
    .querySelector("#buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

function rerenderScreen() {
  screen.innerText = buffer;
}

init();
