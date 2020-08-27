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
    if (b !=0 ) return a/b;
    else return 'ERROR';
}
//exponentiate:
const exp = function(a, b) {
    return a**b;
}
//make function for clear button:
const clear = function(){
    num = '';
    
    numArray = [];
    operator = [];
    return;
}

//round to 9 sig figs, or return error if too large:
const round = function (num) {
    num = String(num);
    if (num.indexOf('.') > 1 && num.length > 9) {
        num = num.slice(0,9)
    } 
    else if (num.length > 9) { 
        return "ERROR"; }

    return +num;
}


//update the display:
const updateDisplay = function (){
    const digitDisplays = Array.from(document.getElementsByClassName('digit'))
    digitDisplays.forEach((digit) => {
        digit.textContent = '';
    })
    console.log('num = ', num)
    if (num.length>0 && num != undefined) {
        let numberArray = num.split('');
        console.log(numberArray)
        let j = digitDisplays.length-1;
        for (let i = numberArray.length-1; i>=0; i--){
            digitDisplays[j].textContent = numberArray[i];
            j--;
        }
    
    }
}
//operate function:
const operate = function (oldNum, num, operator) {
    let a = +oldNum;
    let b = +num;
    if (operator === {} || oldNum === '') {return b;}
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
    
}

//function to walk through input history and unpack it:
const unpack = function(numArray, operator) {
    let result = numArray[0];
    let first;
    let op;
    let second;
    for (let i = 0; i<operator.length; i++) {
        first = result;
        op = operator[i];
        second = numArray[i+1]
        result = operate(first, second, op);
    }
    return result;
}
//initialize num and operator variables to store user input:
let numArray = [];
let num = '';
let operator = [];

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
            btn.textContent = '.';
            
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
                numArray.push(num);
                num = ''
                operator.push('exp');
                break;
            case 'btn-C':
                clear();
                updateDisplay();
                break;
            case 'btn-÷':
                numArray.push(num);
                num = '';
                operator.push('divide');
                break;
            case 'btn-X':
                numArray.push(num);
                num = '';
                operator.push('times');
                break;
            case 'btn--':
                numArray.push(num);
                num = '';
                operator.push('minus');
                break;
            case 'btn-plus':
                numArray.push(num);
                num = '';
                operator.push('add');
                break;
            case 'btn-equals':
                console.log(numArray);
                console.log(operator);
                numArray.push(num);
                num = String(round(unpack(numArray, operator)));
                updateDisplay();
                clear();
                return;
        } 
        updateDisplay();
    })
})

