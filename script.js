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
        screen.value =current;
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
    } else if (clickValue === "+" ||
               clickValue === "-" ||
               clickValue === "x" ||
               clickValue === "÷" ){
        sym = clickValue;
        numArr[1] = sym;
        if(numArr[0]) {
            numArr[2] = current;
        } else {
            console.log(`hello`);
            numArr[0] = current;
        }
        if (numArr[0] && numArr[1] && numArr[2]) {
            console.log("I have three");

            console.log(numArr[0], numArr[1], numArr[2]);
            switch (numArr[1]) {
            case "+":
                result = operate.sum(numArr[0], numArr[2]);
                break;
            case "-":
                result = operate.sub(numArr[0], numArr[2]);
                break;
            case "*":
                result = operate.mul(numArr[0], numArr[2]);
                break;
            case "÷":
                result = operate.div(numArr[0], numArr[2]);
                break;
            }
            current = "";
            // numArray = [];
            screen.value = result;
            console.log(result);

        }


        current = current + sym;
        // screen.value = current;


    }
    console.log(numArr[0], numArr[1], numArr[2]);
    console.log(numArr);
    // console.log(numA);
    // screen.value = current;
});


function sum(numA, numB) {
    return Number(numA) + Number(numB);
}



const operate = {
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

