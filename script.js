// first buttons
let numbers = [ 0, ".", "=", 1, 2, 3, 4, 5, 6, 7, 8, 9];
let operations = ["+", "-", "x", "÷", "delete", "clear" ].reverse();

const calculatorResults = document.querySelector("#calculatorResults");
const numbersDiv = document.querySelector("#numbers");
const symbolsDiv = document.querySelector("#symbols");

// create screen
const screen = document.createElement("input");
screen.setAttribute("id", "screen");
// screen.setAttribute("type", "text");
screen.style.textAlign = "right";


calculatorResults.appendChild(screen);

// create number buttons
numbers.forEach((elem) => {
    const button = document.createElement("div");
    button.classList.add("button");
    numbersDiv.appendChild(button);
    button.textContent = elem.toString();
    button.setAttribute("value", `${elem}`);

});

// create symbols buttons
operations.forEach((elem) => {
    const symButton = document.createElement("div");
    symButton.classList.add("button");
    symButton.classList.add("symbols");
    symButton.textContent = elem.toString();
    symButton.setAttribute("value", `${elem}`);
    symbolsDiv.appendChild(symButton);
});

// click events for buttons values
const calculator = document.querySelector("#content");
const  allButtonsNodelist = document.querySelectorAll("#content .button");
const allButtons = Array.from(allButtonsNodelist);
calculator.addEventListener("click", (e) => {
    const button = e.target;
    const value = e.target.getAttribute("value");
    if(allButtons.includes(button)) {
        let screenUpdate = new CustomEvent("input", {
            detail: {
                buttonValue: value,
            }
        });
        screen.dispatchEvent(screenUpdate);

    }
    // console.log(e);
});


let numA;
let sym = "";
let numB;
let numArr = [];
let current = "";
let result = "";

//screen numbers event listener
let screenUpdate = new Event("input");
screen.addEventListener("input", (e) => {
    const clickValue = e.detail.buttonValue;
    // console.log(clickValue);

    if(!isNaN(+clickValue)) {
        current = current.concat(clickValue);
        screen.value = current;
    } else if (clickValue === ".") {
        let dot;
        for(const num of current) {
            if(num === ".") {
                dot = true;
            }
        }
        if(!dot) {
            current = current.concat(clickValue);
            screen.value = current;
        }

    } else if(clickValue === "clear") {
        numArr = [];
        sym = "";
        numArr[0] = "";
        numArr[1] = "";
        result = "";
        screen.value = "";


    } else {
        if (numArr[0]) {
            numArr[1] = current;

        } else {
            numArr[0] = current;
        }

        if (numArr[0] && numArr[1] && sym) {
            result = operate(numArr[0], numArr[1], sym).toString();
            if(sym === "+" ||
               sym === "-" ||
               sym === "*" ||
               sym === "÷") {
                numArr[0] = result;
                numArr[1] = "";
            } else  if (sym === "="){
                numArr[0] = "";
                numArr[1] = "";
                sym = "";
            }
            screen.value = result;
            console.log(result);
        }
        sym = clickValue;
        console.log(`My symbol: ${clickValue}`);
        current = "";
    }
    console.log(numArr);
    // screen.value = result;
});


function sum(numA, numB) {
    return Number(numA) + Number(numB);
}



function operate(numA, numB, sym) {
    let total = "";
    switch (sym) {
    case "+":
        total = Number(numA) + Number(numB);
        break;
    case "-":
        total = Number(numA) - Number(numB);
        break;
    case "x":
        total = Number(numA) * Number(numB);
        break;
    case "÷":
        total = Number(numA) / Number(numB);
        break;
    default:
        break;
    }
    return total;
}
