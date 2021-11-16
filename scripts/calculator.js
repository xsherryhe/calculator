function createButtons() {
    const buttons = document.querySelector('#buttons');
    [7, 8, 9, '÷', 4, 5, 6, 'x', 1, 2, 3, '-', '.', 0, '=', '+', 'Clear']
    .forEach(symbol => {
        const button = document.createElement('button');
        button.classList.add('button');
        button.id = symbol;
        button.textContent = symbol;
        if(typeof symbol == 'number' || symbol == '.') 
            button.addEventListener('click', updateValue);
        if(['+', '-', 'x', '÷', '='].includes(symbol))
            button.addEventListener('click', updateOperation);
        if(symbol == 'Clear')
            button.addEventListener('click', clearCalculator);
        buttons.appendChild(button);
    })
}
createButtons();

function setOperationStorage() {
    operate.operation = '';
    operate.nums = [...arguments];
}

function clearCalculator() {
    populateDisplay.replaceLast = true;
    populateDisplay(0);
    setOperationStorage();
}
clearCalculator();

function populateDisplay(value) {
    const display = document.querySelector('#display');
    if(populateDisplay.replaceLast) display.value = '';
    display.value += value;
}

function storeValue(value) {
    if(storeValue.replaceLast) operate.nums.pop();
    operate.nums.push(value);
}

function updateValue(e) {
    let value = e.target.id,
        display = document.querySelector('#display');
    if(value == '.') {
        if(populateDisplay.replaceLast) value = '0.';
        else if(display.value.includes('.')) return;
    }
    populateDisplay(value);
    populateDisplay.replaceLast = false;
    storeValue(display.value);
    storeValue.replaceLast = true;
}

function updateOperation(e) {
    populateDisplay.replaceLast = true;
    storeValue.replaceLast = e.target.id == '=';
    if(operate.nums.length == 2 && operate.operation) operate();
    if(e.target.id !== '=') operate.operation = e.target.id;
}

function operate() {
    let [x, y] = operate.nums.map(Number);
    if(y == 0 && operate.operation == '÷') {
        alert('No dividing by zero!');
        [x, y] = [0, 1];
    }

    let result;
    switch(operate.operation) {
        case '+': result = x + y; break;
        case '-': result = x - y; break;
        case 'x': result = x * y; break;
        case '÷': result = x / y; break;
    }
    result = Math.round((result + Number.EPSILON) * 10**14) / 10**14;
    populateDisplay(result);
    setOperationStorage(result);
    return result;
}