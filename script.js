//make functions for calculator:
const add = function(a, b) {
    return a + b;
}
//subtract:
const subtract = function (a,b) {
    return a - b;
}

//multiply:
const multiply = function (a, b) {
    return a*b;
}
//divide:
const divide = function (a, b) {
    return a/b;
}
//exponentiate:
const exp = function(a, b) {
    return a**b;
}
//make function for clear button:
const clear = function(){
    num = '';
    oldNum = ''
    operator = {};
    updateDisplay();
    return;
}
//refactor to store numbers as array to handle multiple operators?

//update the display:
const updateDisplay = function (){
    const digitDisplays = Array.from(document.getElementsByClassName('digit'))
    digitDisplays.forEach((digit) => {
        digit.textContent = '';
    })
    if (num.length>0) {
        let numberArray = num.split('');
        console.log(numberArray)
        for (let i = numberArray.length-1; i>=0; i--){
            digitDisplays[i].textContent = numberArray[i];
        }
    }
}
//operate function:
const operate = function (oldNum, num, operator) {
    let a = +oldNum;
    let b = +num;
    if (operator === 'add'){
        return add(a,b);
    } else if (operator === 'minus'){
        return subtract(a, b);
    } else if (operator === 'times') {
        return multiply(a, b);
    } else if (operator === 'divide') {
        return divide(a, b);
    } else if (operator === 'exp') {
        return exp(a, b);
    }
    //oldNum = '';
   // updateDisplay();
}
//initialize num and operator variables to store user input:
let num = '';
let oldNum = '';
let operator = {};

//function that concatenates existing number string and input number string:
const addInputToNumber = function(oldNum, num) {
    return oldNum + num;
}

//Make digit divs inside digitholder:
digitHolder = document.getElementById('digitHolder')
for (let i = 9; i>0; i--) {
    let div = document.createElement('div');
    div.id = `digit-${i}`;
    div.classList.add('digit')
    div.textContent = " ";
    digitHolder.appendChild(div);
    
}
//make buttons for numbers and append to buttons div:
    let buttons = document.getElementById('buttons');
    for (let i= 0; i<11; i++) {
        let btn = document.createElement('button');
        btn.classList.add('btn');
        btn.classList.add('number')
        if (i<10){
            btn.id = `btn-${i}`;
            btn.textContent = i;
        }
        else {
            btn.id = 'btn-decimal';
            btn.txtContent = 'decimal';
            
        }
        buttons.appendChild(btn);
    }

//make buttons for operators and append to buttons div:
const operators = ['exp', 'C', '÷', 'X', '-', '+', '=']
for (let i = 0; i<7; i++) {
    let btn = document.createElement('button');
    btn.classList.add('btn');
    btn.classList.add('operator');
    if (operators[i] === '+') {
        btn.id='btn-plus';
    } else if (operators[i] === '=') {
        btn.id='btn-equals';
    } 
    else {
    btn.id = `btn-${operators[i]}`;
    }
    btn.textContent = `${operators[i]}`;
    
    buttons.appendChild(btn);
}

//make event listeners for digits
let digitButtons = document.getElementsByClassName('number');
for (let i = 0; i<digitButtons.length; i++) {
    digitButtons[i].addEventListener('click',  e => {
        if (num.length < 9) {
            num = addInputToNumber(num, e.target.textContent);
            updateDisplay();
        }
        
    })
}
//make event listeners for operators
let operatorButtons = Array.from(document.getElementsByClassName('operator'));
operatorButtons.forEach((button)=>{ 
    console.log('going through buttons')
    button.addEventListener('click', (e) => {
        
        switch (e.target.id) {
            case 'btn-exp':
                oldNum = num;
                num = '';
                operator = 'exp';
                break;
            case 'btn-C':
                clear()
                break;
            case 'btn-÷':
                oldNum = num;
                num = '';
                operator = 'divide';
                break;
            case 'btn-X':
                oldNum = num;
                num = '';
                operator = 'times';
                break;
            case 'btn--':
                oldNum = num;
                num = '';
                operator = 'minus';
                break;
            case 'btn-plus':
                oldNum = num;
                num = '';
                operator = 'add';
                break;
            case 'btn-equals':
                console.log('equals')
                num = String(operate(oldNum, num, operator));
                updateDisplay();
                return;
        }
        updateDisplay();
    })
})

