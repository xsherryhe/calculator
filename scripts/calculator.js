function createButtons() {
    const buttons = document.querySelector('#buttons');
    [7, 8, 9, '÷', 4, 5, 6, 'x', 1, 2, 3, '-', 0, '.', '=', '+', 'Clear']
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
            button.addEventListener('click', clearDisplay);
        buttons.appendChild(button);
    })
}
createButtons();

function resetOperationStorage() {
    operate.operation = '';
    operate.nums = [];
}
resetOperationStorage();

function populateDisplay(value) {
    if (!populateDisplay.addOn) display.value = '';
    document.querySelector('#display').value += value;
}

function clearDisplay() {
    populateDisplay.addOn = false;
    populateDisplay(0);
}

function updateValue(e) {
    populateDisplay(e.target.id);
    populateDisplay.addOn = true;
}

function updateOperation(e) {
    operate.nums.push(document.querySelector('#display').value);
    populateDisplay.addOn = false;
    if(e.target.id == '=') operate();
    else operate.operation = e.target.id;
}

function operate() {
    if(operate.nums.length < 2 || !operate.operation) return;
    const [x, y] = operate.nums.map(Number);
    let result;
    switch(operate.operation) {
        case '+': result = x + y; break;
        case '-': result = x - y; break;
        case 'x': result = x * y; break;
        case '÷': result = x / y; break;
    }
    resetOperationStorage();
    populateDisplay(result);
}