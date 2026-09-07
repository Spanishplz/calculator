// first buttons
let numbers = [ 0, ".", "=", 1, 2, 3, 4, 5, 6, 7, 8, 9];
let operations = ["+", "-", "x", "÷", "delete", "clear" ].reverse();

const calculatorResults = document.querySelector("#calculatorResults");
const numbersDiv = document.querySelector("#numbers");
const symbolsDiv = document.querySelector("#symbols");

// create screen
const screen = document.createElement("input");
screen.setAttribute("id", "screen");
screen.setAttribute("type", "text");
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
                name: "Sofi",
                last: "Cáceres",
            }
        });
        screen.value = screen.value + value;
        screen.dispatchEvent(screenUpdate);

            // if (!isNaN(value)) {
        //     screen.value = screen.value + value;
        // } else if(value === "delete" || value === "clear") {
        //     screen.value = "";
        // } else {
        //     screen.value = screen.value + value;
        // }

    }
    // console.log(e);
});
// console.log(screen);











//screen numbers event listener
let screenUpdate = new Event("input");
let number = "";
let numberA = "";
let numArray = [];
let symbol = "";
let lastSymbol = "";
let numberB = "";
let total = "";
screen.addEventListener("input", (e) => {
    // console.log(e.detail.buttonValue);
    const clickValue = e.detail.buttonValue;
    // console.log(e.target.value);
    // if (!isNaN(clickValue)) {
    //     numberString = numberString + clickValue;
    // }
    switch(clickValue) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case ".":
        number = number + clickValue;
        if(symbol) {
            numberB = number;
            break;
        } else {
            numberA = number;
            break;
        }

    case "+":
    case "-":
    case "x":
    case "÷":
        if(numberA && numberB && symbol) {
            switch(symbol) {
            case "+":
                symbol = "+";
                total = operationsObj.sum(numberA, numberB);
                // screen.value = total;
                numberA = total.toString();
                break;
            case "-":
                symbol = "-";
                total = operationsObj.sub(numberA, numberB);
                // screen.value = total;
                numberA = total.toString();
                break;
            case "x":
                symbol = "x";
                total = operationsObj.mul(numberA, numberB);
                numberA = total.toString();
                // screen.value = total;
                break;
            case "÷":
                symbol = "÷";
                total = operationsObj.div(numberA, numberB);
                numberA = total.toString();
                // screen.value = total;;
                break;
            }
        }
        symbol = clickValue;
        if(numberA && !numberB) {
            screen.value = numberA + symbol;
        } else {
            screen.value = total + symbol;

        }
        number = "";
        break;

        // also works
    case "=":
        if(numberA && numberB && symbol) {
            switch(symbol) {
            case "+":
                total = operationsObj.sum(numberA, numberB);
                screen.value = total;
                numberA = total;
                break;
            case "-":
                total = operationsObj.sub(numberA, numberB);
                screen.value = total;
                numberA = total;
                break;
            case "x":
                total = operationsObj.mul(numberA, numberB);
                screen.value = total;
                numberA = total;
                break;
            case "÷":
                total = operationsObj.div(numberA, numberB);
                screen.value = total;
                numberA = total;
                break;
            }

        }
        number = "";

        console.log(total);
        screen.value.concat(symbol);
        screen.value = total;

        break;

        // working clear
    case "clear":
        number = "";
        numberA = "";
        numberB = "";
        symbol = "";
        total = "";
        console.log(numberA, numberB);
        screen.value = "";
        break;
    case "delete":

    default:
        break;
    }

    console.log(numberA, symbol, numberB,total);

});


function sum(numA, numB) {
    return Number(numA) + Number(numB);
}



const operationsObj = {
    sum: function sum(numA, numB) {
        return Number(numA) + Number(numB);
    },
    sub: function sub(numA, numB) {
        return Number(numA) - Number(numB);
    },
    mul: function mul(numA, numB) {
        return Number(numA) * Number(numB);
    },
    div: function div(numA, numB) {
        return Number(numA) / Number(numB);
    },
};



// switch(symbol) {
// case "+":
//     total = operationsObj.sum(numberB, numberA);
//     break;
// case "-":
//     total = operationsObj.sub(numberB, numberA);
//     break;
// case "x":
//     total = operationsObj.mul(numberB, numberA);
//     break;
// case "÷":
//     total = operationsObj.div(numberB, numberA);
//     break;
// }
