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

let entered = document.getElementById('entered');
//update the display:
const updateDisplay = function (){
    const digitDisplays = Array.from(document.getElementsByClassName('digit'))
    digitDisplays.forEach((digit) => {
        digit.textContent = '';
    })
    
    if (num.length>0 && num != undefined) {
        let numberArray = num.split('');
        
        let j = digitDisplays.length-1;
        for (let i = numberArray.length-1; i>=0; i--){
            digitDisplays[j].textContent = numberArray[i];
            j--;
        }
    //update the upper display too:
    }
    updateUpperDisplay();
    
}   
function updateUpperDisplay(){
    //entered values:
    let str = '';
    const operatorDict = {
        'add': '+',
        'minus': '-',
        'times': 'X',
        'divide': '÷',
        'exp': 'exp',
    }
    
    if (operator !== [] && numArray !== []) {
        console.log("numbers:", numArray)
        for (let i = 0; i<operator.length; i++) {
            str += numArray[i]
            
            str += operatorDict[operator[i]];
        }
    }
    entered.textContent = str
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
    div.textContent = ' ';
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
// make backspace button:
let backspace = document.createElement('button');
backspace.classList.add('btn');
backspace.id = 'backspace';
backspace.addEventListener('click', (e) => {
    num = num.slice(0, num.length-1);
    updateDisplay();
})
backspace.style.gridRowStart = '1';
backspace.style.gridColumnStart = '1';
backspace.textContent = 'Del';
backspace.style.backgroundColor = '#FA8072';

buttons.appendChild(backspace);


//make event listeners for digits
let digitButtons = document.getElementsByClassName('number');
for (let i = 0; i<digitButtons.length; i++) {
    digitButtons[i].addEventListener('click',  e => {
        if (num.length < 9) {
            if (digitButtons[i].id === 'btn-decimal' ) {
                if (num.indexOf(".") === -1) {
                    num = addInputToNumber(num, e.target.textContent);
                    updateDisplay();
                }
            } else {
            num = addInputToNumber(num, e.target.textContent);
            updateDisplay();
            }
        }
        
    })
}
//make event listeners for operators
let operatorButtons = Array.from(document.getElementsByClassName('operator'));
operatorButtons.forEach((button)=>{ 
   
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
                numArray.push(num);
                num = String(round(unpack(numArray, operator)));
                updateDisplay();
                clear();
                updateUpperDisplay()
                return;
        } 
        updateDisplay();
    })
})

//Add keyboard support:
document.addEventListener('keydown', keyboardInput);

function keyboardInput(e) {
    if (e.keyCode === 8) {//Delete
        num = num.slice(0, num.length-1);
        updateDisplay();
        } else //number or operator
        { let char = String.fromCharCode(e.keyCode);
        switch (char) {//if number add number to numArray, 
                       //if operator add it to operator array
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
                if (e.shiftKey) {//multiplication
                    numArray.push(num);
                    num = '';
                    operator.push('times');
                    updateDisplay();
                    break;
                    }
            case '9':
            case '0':
                num = addInputToNumber(num, char);
                updateDisplay();
                break;
            case '=':
                if (!e.shiftKey) {
                    //equals
                    numArray.push(num);
                    num = String(round(unpack(numArray, operator)));
                    updateDisplay();
                    clear();
                    return;
                } else {
                    //plus
                    numArray.push(num);
                    num = '';
                    operator.push('add');
                    updateDisplay();
                    break;
                }
                
            case '-'://minus
                numArray.push(num);
                num = '';
                operator.push('minus');
                updateDisplay();
                break;
            case '/'://division
                numArray.push(num);
                num = '';
                operator.push('divide');
                updateDisplay();
                break;
            case '':
                break;
        }
}
}