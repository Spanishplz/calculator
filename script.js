// first buttons
let numbers = [ 0, ".", "=", 1, 2, 3, 4, 5, 6, 7, 8, 9];
let operations = ["+", "-", "x", "÷", "del", "ac" ].reverse();

const calculatorResults = document.querySelector("#calculatorResults");
const numbersDiv = document.querySelector("#numbers");
const symbolsDiv = document.querySelector("#symbols");

// create screen
const screen = document.createElement("input");
screen.setAttribute("id", "screen");
screen.setAttribute("type", "text");
screen.readOnly = true;
screen.style.textAlign = "right";



calculatorResults.appendChild(screen);

// create number buttons
numbers.forEach((elem) => {
    const button = document.createElement("div");
    button.classList.add("button");
    button.classList.add("numbers");
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
        logic(value);
    }
});

// keyboard support
let hotkeys = [ 0, ".", "=", 1, 2, 3, 4, 5, 6, 7, 8, 9, "+", "-", "x", "÷", "del", "ac"];
document.addEventListener("keydown", (e)=> {
    // e.preventDefault();
    const keyStrings = hotkeys.map((key) => key.toString());
    let keyName = e.key;
    switch(keyName) {
    case "*":
        keyName = "x";
        break;
    case "Escape":
        keyName = "ac";
        break;
    case "Backspace":
        keyName = "del";
        break;
    case "Enter":
        keyName = "=";
        break;
    case "/":
        keyName = "÷";
        break;
    default:
        keyName = e.key;
    }

    if(keyStrings.includes(keyName)) {
        logic(keyName);
    }
});

let sym = "";
let numArr = [];
let current = "";
let result = "";



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

// mouseover buttons
allButtons.forEach((elem) => {
    elem.addEventListener("mouseenter", (e)=> {
        elem.classList.toggle("mouseEnter");
    });
    elem.addEventListener("mouseleave", (e)=> {
        elem.classList.toggle("mouseEnter");
    });

    elem.addEventListener("mousedown", (e)=> {
        elem.classList.toggle("mousedown");
    });
    elem.addEventListener("mouseup", (e)=> {
        elem.classList.toggle("mousedown");
    });
});

function logic(value) {
    let clickValue = value;
        if(!isNaN(+clickValue)) {
            if(current.length === 10) {
                console.log(`Maxlength reached: ${current.length}`);
            } else if (numArr[0] && sym === "=") {
            console.log("new start");
            current = "";
            numArr = [];
            numArr[0] = "";
            numArr[1] = "";
            result = "";
            current = current.concat(clickValue);
            screen.value = current;

        } else if (numArr[0] && sym){
            current = current.concat(clickValue);
            screen.value = numArr[0] + sym + current;

        }else {
            current = current.concat(clickValue);
            screen.value = current;
        }

    } else if (clickValue === ".") {
        let dot;
        for(const num of current) {
            if(num === ".") {
                dot = true;
            }
        }
        if(!dot) {
            current = current.concat(clickValue);
            screen.value = screen.value + clickValue;
        }

    } else if(clickValue === "ac") {
        current = "";
        numArr = [];
        sym = "";
        numArr[0] = "";
        numArr[1] = "";
        result = "";
        screen.value = "";
    } else if(clickValue === "del") {
        if (current === "" && numArr[0]  && sym) {
            sym = "";
            current = numArr[0];
            numArr[0] = "";
            screen.value = current;
         } else if (current === "" && numArr[0]  && !sym) {
            numArr[0] = numArr[0].slice(0,-1);
            screen.value = numArr[0];
        }  else if (isNaN(current.at(-1))) {
            current = current.slice(0, -1);
            console.log(screen.value);
            screen.value = screen.value.slice(0, -1);
        } else {
            current = current.slice(0, -1);
            screen.value = screen.value.slice(0, -1);
        }
        console.log(`num1: ${numArr[0]}
num2: ${numArr[1]}
current: ${current}
symbol: ${sym}`);
    } else {
        if (numArr[0]) {
            numArr[1] = current;

        } else {
            numArr[0] = current;
        }
        if(numArr[0] && !numArr[1] && clickValue === "=") {

        } else if (numArr[0] && !numArr[1] && clickValue === "=" && sym) {

        }else if (numArr[0] && numArr[1] && sym) {
            console.log(`Three values:${numArr} and ${sym}`);
            if(numArr[1] === "0" && sym === "÷") {

            } else {
                result = operate(numArr[0], numArr[1], sym).toString();
                if (result > 99999999999999999999) {
                    screen.value = "NUMBER TOO BIG";
                    current = "";
                    numArr = [];
                    sym = "";
                    numArr[0] = "";
                    numArr[1] = "";
                    result = "";
                }

                console.log(`The result is: ${result}`);
                let resultArray = result.split("");
                let dotExists = resultArray.includes(".");
                if(dotExists) {
                    result = Number(result).toFixed(4).toString();

                }

                console.log(resultArray);
            }


            numArr[0] = result;
            numArr[1] = "";
            if (result === "") {
                current = "";
                numArr = [];
                sym = "";
                numArr[0] = "";
                numArr[1] = "";
                screen.value = "ERRRRRRROOOOOORRRR!!!!!";
            } else {
                screen.value = result;
            }

            console.log(`The result is: ${result}`);
        }
        sym = clickValue;

        if(numArr[0] && sym  !== "="  && !result && !numArr[1]) {
            screen.value = numArr[0] + sym;
        } else if (numArr[0] && result && sym !== "=") {
            screen.value = result + sym;
        }

         current = "";
    }
}


// hotkey info
let hotkeysSymbols = [ 0, ".", "=/↵", 1, 2, 3, 4, 5, 6, 7, 8, 9, "esc", "⌫", "/", "*/x", "-", "+"];

allButtons.forEach((elem, index) => {
    const hotkey = document.createElement("div");
    hotkey.classList.add("hotkeyBox");
    hotkey.textContent = `${hotkeysSymbols[index]}`;
    elem.appendChild(hotkey);
});

// key effect in buttons
document.addEventListener("keydown", (e)=> {
    let buttonKey = e.key;
    switch(buttonKey) {
    case "*":
        buttonKey = "x";
        break;
    case "Escape":
        buttonKey = "ac";
        break;
    case "Backspace":
        buttonKey = "del";
        break;
    case "Enter":
        buttonKey = "=";
        break;
    case "/":
        buttonKey = "÷";
        break;
    default:
        buttonKey = e.key;
    }

    allButtons.forEach(elem => {
        let buttonValue = elem.getAttribute("value");
        if (buttonKey === buttonValue) {
            console.log("equals!");
            console.log(elem);
            elem.classList.toggle("mousedown");

        }
    });
});

// keyboard events
document.addEventListener("keyup", (e)=> {
    let buttonKey = e.key;
    switch(buttonKey) {
    case "*":
        buttonKey = "x";
        break;
    case "Escape":
        buttonKey = "ac";
        break;
    case "Backspace":
        buttonKey = "del";
        break;
    case "Enter":
        buttonKey = "=";
        break;
    case "/":
        buttonKey = "÷";
        break;
    default:
        buttonKey = e.key;
    }

    allButtons.forEach(elem => {
        let buttonValue = elem.getAttribute("value");
        if (buttonKey === buttonValue) {
            console.log("equals!");
            console.log(elem);
            elem.classList.toggle("mousedown");
        }
    });
});

focus();
