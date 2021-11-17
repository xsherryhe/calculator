const buttons = document.querySelector('#buttons'),
      memory = document.querySelector('#memory'),
      display = document.querySelector('#display');

function createButtons() {
    ['Clear', 'Delete', 7, 8, 9, '÷', 4, 5, 6, 'x', 1, 2, 3, '-', '.', 0, '=', '+']
    .forEach(symbol => {
        const button = document.createElement('button');
        button.classList.add('button');
        button.id = symbol;
        button.textContent = symbol;
        button.addEventListener('click', routeButton);
        buttons.appendChild(button);
    })
}
createButtons();

function routeButton(e) {
    e.target.blur();
    const symbol = e.target.id;
    if(!Number.isNaN(+symbol) || symbol == '.' || symbol == 'Delete')
        updateValue(symbol);
    if(['+', '-', 'x', '÷'].includes(symbol))
        updateOperation(symbol);
    if(symbol == '=')
        finishOperation();
    if(symbol == 'Clear')
        clearCalculator();
}

function enableKeyboard() {
    window.addEventListener('keyup', routeKey);
}
enableKeyboard();

function routeKey(e) {
    const conversions = {'*': 'x', 
                         '/': '÷', 
                         Backspace: 'Delete', 
                         Enter: '='};
    let symbol = e.key;
    if(conversions[symbol]) symbol = conversions[symbol];
    const button = [...buttons.children].find(button => button.id == symbol);
    if(button) button.click();
}

function setOperationStorage() {
    operate.operation = '';
    operate.nums = [...arguments];
}

function clearCalculator() {
    memory.textContent = '';
    populateDisplay.replaceLast = true;
    populateDisplay(0);
    setOperationStorage();
}
clearCalculator();

function populateMemory(symbol) {
    const numsLength = operate.nums.length;
    if(numsLength <= 1) memory.textContent = '';
    memory.textContent += ' ' + operate.nums[numsLength - 1] + ' ' + symbol;
}

function populateDisplay(value) {
    if(populateDisplay.replaceLast) display.textContent = '';
    display.textContent += value;
}

function deleteLast() {
    display.textContent = display.textContent.slice(0, -1);
}

function storeValue(value) {
    if(storeValue.replaceLast) operate.nums.pop();
    operate.nums.push(value);
}

function updateValue(value) {
    if(value == '.') {
        if(populateDisplay.replaceLast) value = '0.';
        else if(display.textContent.includes('.')) return;
    }
    if(value == 'Delete') deleteLast();
    else populateDisplay(value);
    populateDisplay.replaceLast = display.textContent == '0';
    storeValue(display.textContent);
    storeValue.replaceLast = true;
}

function updateOperation(operation) {
    populateDisplay.replaceLast = true;
    storeValue.replaceLast = false;
    if(operate.nums.length == 2 && operate.operation) operate();
    populateMemory(operation);
    operate.operation = operation;
}

function finishOperation() {
    populateDisplay.replaceLast = true;
    storeValue.replaceLast = true;
    populateMemory('=');
    if(operate.nums.length == 2 && operate.operation) operate();
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