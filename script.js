let displaySum = document.getElementById("sum");

let count = [];
let saveOperation;

const maxLength = 9;

function NewNumber(num) {
  if (displaySum.innerHTML.length < maxLength) {
    displaySum.innerHTML += num;
  }
}

function Calculate(operation) {
  let currNumber = displaySum.innerHTML;

  if (currNumber.length === 0) {
    return;
  }

  count.push(Number(displaySum.innerHTML));

  document.getElementById(
    "acc"
  ).innerHTML += `${displaySum.innerHTML} ${operation}`;
  displaySum.innerHTML = "";

  count.push(operation);
}

function Comma() {
  let currNumber = displaySum.innerHTML;

  if (!currNumber.includes(".")) {
    displaySum.innerHTML += ".";
  }
}

function Operations(num1, num2, operation) {
  switch (operation) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "x":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }
}

function RunResult() {
  let action = null;
  let current = null;

  let sum = 0;

  if (isNaN(count[count.length - 1])) {
    count.pop();
  }

  count.forEach((e) => {
    if (!isNaN(e)) {
      if (current == null) {
        current = e;
      } else {
        sum += Operations(current, e, action);
        current = null;
      }
    } else {
      action = e;
      saveOperation = e;
    }
  });

  if (current != null) {
    sum = Operations(sum, current, action);
  }

  displaySum.innerHTML = sum.toString().substring(0, maxLength);
  count = [];
}

function Result() {
  currAcc = document.getElementById("acc").innerHTML;
  currNumber = displaySum.innerHTML;

  if (currAcc[currAcc.length - 1] === "=" && currNumber.length > 0) {
    displaySum.innerHTML = Operations(
      Number(currNumber),
      Number(currNumber),
      saveOperation
    )
      .toString()
      .substring(0, maxLength);
  }

  if (count.length === 0) {
    return;
  }

  count.push(Number(displaySum.innerHTML));
  document.getElementById("acc").innerHTML += ` ${displaySum.innerHTML} =`;
  RunResult();
}

function Reset() {
  displaySum.innerHTML = "";
  document.getElementById("acc").innerHTML = "";
  count = [];
}
