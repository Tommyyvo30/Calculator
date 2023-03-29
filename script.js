function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    // Display error message if user tries to divide by zero
    return "Error: Cannot divide by zero";
  }
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return NaN;
  }
}

const display = document.querySelector(".screen-text");
const prev = document.querySelector(".previous-value");

let firstNum = null;
let operator = null;
let secondNum = null;
let isNewOperand = true;
let previousValue = null;

function clear() {
  prev.textContent = "";
  display.textContent = "0";
  firstNum = null;
  operator = null;
  secondNum = null;
  isNewOperand = true;
}

function updateDisplay(value) {
  if (display.textContent === "0" || isNewOperand) {
    display.textContent = value;
    isNewOperand = false;
  } else {
    display.textContent += value;
  }
}

function handleNumberClick(event) {
  const number = event.target.dataset.number;
  updateDisplay(number);
}

function handleOperatorClick(event) {
  const newOperator = event.target.dataset.operator;

  if (firstNum === null) {
    firstNum = parseFloat(display.textContent);
  } else if (operator !== null) {
    secondNum = parseFloat(display.textContent);
    const result = operate(operator, firstNum, secondNum);
    display.textContent = result;
    firstNum = result;
  }

  operator = newOperator;
  isNewOperand = true;

  if (secondNum === null) {
    previousValue = `${firstNum} ${operator}`;
  } else {
    previousValue = `${firstNum} ${operator} ${secondNum}`;
  }
  document.querySelector(".previous-value").textContent = previousValue;
  secondNum = null;
}
function handleEqualsClick() {
  if (operator !== null && secondNum === null) {
    secondNum = parseFloat(display.textContent);
    const result = operate(operator, firstNum, secondNum);
    previousValue = `${firstNum} ${operator} ${secondNum}`;
    document.querySelector(".previous-value").textContent = previousValue;
    display.textContent = result;
    firstNum = result;
    operator = null;
    secondNum = null;
  }
  isNewOperand = true;
}

const numberButtons = document.querySelectorAll(".calc-btn[data-number]");
numberButtons.forEach((button) => {
  button.addEventListener("click", handleNumberClick);
});

const operatorButtons = document.querySelectorAll(
  ".operator-btn[data-operator]"
);
operatorButtons.forEach((button) => {
  button.addEventListener("click", handleOperatorClick);
});

const equalsButton = document.querySelector(".equals-btn");
equalsButton.addEventListener("click", handleEqualsClick);

const clearButton = document.querySelector(".clear-btn");
clearButton.addEventListener("click", clear);

// Added event listeners for decimal and backspace buttons
const decimalButton = document.querySelector(".decimal-btn");
decimalButton.addEventListener("click", handleDecimalClick);

const backspaceButton = document.querySelector(".backspace-btn");
backspaceButton.addEventListener("click", handleBackspaceClick);

function handleDecimalClick() {
  if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
}

function handleBackspaceClick() {
  if (display.textContent.length === 1) {
    display.textContent = "0";
  } else {
    display.textContent = display.textContent.slice(0, -1);
  }
}

function handleChangeSignClick() {
  const currentValue = parseFloat(display.textContent);
  if (!isNaN(currentValue)) {
    display.textContent = (-1 * currentValue).toString();
  }
}

const changeSignButton = document.querySelector(".change-sign-btn");
changeSignButton.addEventListener("click", handleChangeSignClick);
