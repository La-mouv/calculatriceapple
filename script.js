
document.addEventListener("DOMContentLoaded", function() {
    
    const display = document.getElementById("currentInput");
    let currentInput = "";
    let previousInput = "";
    let operation = undefined;
    
    function updateDisplay() {
        if (previousInput && operation) {
            display.textContent = previousInput + " " + operation + " " + currentInput;
        } else {
            display.textContent = currentInput;
        }
    }

    document.querySelector(".buttons").addEventListener("click", function(event) {
        const buttonValue = event.target.getAttribute("data-value");
        if (!buttonValue) return;

        switch(buttonValue) {
            case "AC":
                currentInput = "";
                previousInput = "";
                operation = undefined;
                break;
            case "+/-":
                currentInput = String(-1 * parseFloat(currentInput));
                break;
            case "=":
                if (previousInput && currentInput && operation) {
                    currentInput = String(operate(previousInput, currentInput, operation));
                    previousInput = "";
                    operation = undefined;
                }
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                if (currentInput) {
                    if (previousInput && operation) {
                        previousInput = String(operate(previousInput, currentInput, operation));
                        currentInput = "";
                    } else {                        operation = buttonValue;
                        previousInput = currentInput;
                        currentInput = "";
                    }
                }
                break;
            case ".":
            if (!currentInput.includes(".")) {
                currentInput += ".";
            }
            break;
        default:
            currentInput += buttonValue;
            break;
    }

    updateDisplay();
});

function operate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch(op) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b !== 0) {
                return a / b;
            } else {
                alert("Division par zéro!");
                return "";
            }
    }
});

