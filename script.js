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
    //TO DO:
    return;
}
//operate function:
const operate = function (a, b, operator) {
    if (operator === 'plus'){
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
//Make digit divs inside digitholder:
digitHolder = document.getElementById('digitHolder')
for (let i = 16; i>0; i--) {
    let div = document.createElement('div');
    div.id = `digit-${i}`;
    div.classList.add('digit')
    div.textContent = i;
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