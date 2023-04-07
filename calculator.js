let buffer = "0";

const screen = document.querySelector("#screen");

function buttonClick(value) {
  if (isNaN(parseInt(value)) === true) {
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

  console.log(`buffer now is ${buffer}`);
}

function handleSymbol(symbol) {
  if (symbol === 'C') {
    buffer = '0';
    rerenderScreen();
  } elseif (symbol === '=') {
      
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
