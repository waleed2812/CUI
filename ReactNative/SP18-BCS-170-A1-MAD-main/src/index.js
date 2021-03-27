import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Fetching all the buttons
let btns = document.getElementsByTagName('button');

// Assigning click response to all buttons
for (let i  = 0 ; i < btns.length ; i++ )
    btns.item(i).addEventListener("click", btn_touch);

// Variables to help in computation
var operands = [], btn_clicked, clear_res=false, history = [],
    current_operation = document.getElementsByTagName('input').item(0),
    result = document.getElementsByTagName('input').item(1);

// Function to respond to button touch on screen
function btn_touch() {
    // The target button's inner html
    // to be used as input string
    btn_clicked = arguments[0].target.innerHTML;
    btn_click();
}

// Function to perform to button actions
function btn_click() {

    // Then Map the response to each operator
    switch (btn_clicked) {
        case "+":
        case "-":
        case "X":
        case "/":
        case "%":
        case "=":
            perform_calculations(btn_clicked);
            break;
        case "CE":
            reset_val(true);
            break;
        case "C":
            reset_val();
            break;
        case "&lt;-":
            result.value = result.value.substring(0, result.value.length-1);
            break;
        case "History":
            show_history();
            break;
        case "Close":
            close_history();
            break;
        default:
            // Default value will be for a number or dot.
            digit_click(btn_clicked);
    }
}

// Function to append the digit on text screen
function digit_click() {

    // Clearing display if something written
    if(clear_res) {
        result.value = "";

        clear_res = false;
    }

    // Checking if decimal point is appended and user wants to
    // Append again
    if(result.value.includes(".") && arguments[0] === ".") return ;

    // Appending Value
    result.value = result.value + arguments[0];

}

// Function which performs calculations
function perform_calculations() {

    // Fetching the number on input field.
    // If it is empty, don't perform calculation
    if (result.value === "") return  ;


    // Reset input field next time
    clear_res = true;

    // Pushing the current value and operator
    // If there is no operand
    if (operands.length < 2) {
        if (btn_clicked === "=") return ;
        operands.push(result.value);
        operands.push(btn_clicked);
        current_operation.value = result.value + " " + btn_clicked;
        return;
    }

    // Getting the operator
    let operator = operands.pop();

    // Getting the previous operand
    let num1 = parseFloat(operands.pop());

    // Getting the current operand
    let num2 = parseFloat(result.value);

    switch (operator) {
        case "+":
            // Calculating
            result.value = num1 + num2;
            break;
        case "-":
            // Calculating
            result.value = num1 - num2;
            break;
        case "X":
            // Calculating
            result.value = num1 * num2;
            break;
        case "/":
            // Calculating
            result.value = num1 / num2;
            break;
        default:
            // Calculating
            result.value = num1 % num2;
            break;
    }


    // Saving History
    history.push(num1 + operator + num2 + " = " + result.value);

    console.log(history);

    // If the equals too is not pressed.
    // Then we push the current result
    // as a Operand. And Button pressed as
    // next operator
    if(btn_clicked !== "=") {
        operands.push(result.value);
        operands.push(btn_clicked);
        current_operation.value = result.value + " " + btn_clicked;
    } else {
        current_operation.value = num1 + operator + num2 + " = " + result.value;
    }

}

// A Function to reset values
function reset_val() {
    // Resetting Displayed Result
    result.value = ""

    // Clearing current operations performed
    current_operation.value = ""

    // Resetting Variables
    operands = [];

    if(arguments[0] === true)
        history = [];
}

// Function to show History
function show_history() {

    if(history.length === 0) {
        document.getElementsByClassName("show_history").item(0).firstChild.style.display = "inline-block";
        setTimeout(() => {
            document.getElementsByClassName("show_history").item(0).firstChild.style.display = "none";
            }, 2000);
        return ;
    }


    // Changing the div to append
    let history_div = document.getElementsByClassName("history_items").item(0);

    // Appending History
    let component = [];

    for (let i = 0 ; i < history.length ; i++)
        component.push( <><br/><p>{history[i]}</p> <hr/></> );

    ReactDOM.render(component, history_div);

    // Showing History Div
    history_div = document.getElementsByClassName("history").item(0);
    history_div.style.height = "auto";
    history_div.style.overflowY = "auto";

}

// Function to hide history
function close_history() {
    let history_main_div = document.getElementsByClassName("history").item(0);
    history_main_div.style.height = "0";
}
