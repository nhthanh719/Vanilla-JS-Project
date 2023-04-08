let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector("#screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerenderScreen();
}

function handleNumber(number) {
  if (buffer === '0') {
    buffer = number;
  } else {
    buffer += number;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case 'C':
      buffer = '0';
      previousOperator = null;
      break;

    case '=':
      if (previousOperator === null) {
        //Need numbers to do math
        return;
      } else {

        calculate(parseInt(buffer));
        buffer = "" + runningTotal; 
      } 
      
      runningTotal = 0;
      previousOperator = null;
      break;


    case '←':
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;

    case '+':
    case '-':
    case 'x':
    case '÷':
      handleMath(symbol);
      buffer = '0';
      break;
  }
}

function handleMath(symbol) {
  if (buffer === '0') {
    //do nothing
    return
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    calculate(intBuffer);
  }

  previousOperator = symbol;
  buffer = '0';
}

function calculate(intBuffer) {
  if (previousOperator === '+') {
    runningTotal += intBuffer;
  } else if (previousOperator === '-') {
    runningTotal -= intBuffer;
  } else if (previousOperator === 'x') {
    runningTotal *= intBuffer;
  } else if (previousOperator === '÷') {
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
