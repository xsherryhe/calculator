const buttons = document.querySelector('#buttons'),
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
    if(['+', '-', 'x', '÷', '='].includes(symbol))
        updateOperation(symbol);
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
    populateDisplay.replaceLast = true;
    populateDisplay(0);
    setOperationStorage();
}
clearCalculator();

function populateDisplay(value) {
    if(populateDisplay.replaceLast) display.value = '';
    display.value += value;
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function storeValue(value) {
    if(storeValue.replaceLast) operate.nums.pop();
    operate.nums.push(value);
}

function updateValue(value) {
    if(value == '.') {
        if(populateDisplay.replaceLast) value = '0.';
        else if(display.value.includes('.')) return;
    }
    if(value == 'Delete') deleteLast();
    else populateDisplay(value);
    populateDisplay.replaceLast = display.value == '0';
    storeValue(display.value);
    storeValue.replaceLast = true;
}

function updateOperation(operation) {
    populateDisplay.replaceLast = true;
    storeValue.replaceLast = operation == '=';
    if(operate.nums.length == 2 && operate.operation) operate();
    if(operation !== '=') operate.operation = operation;
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