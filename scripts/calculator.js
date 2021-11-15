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
        if(['+', '-', 'x', '÷'].includes(symbol))
            button.addEventListener('click', updateOperation);
        if(symbol == '=')
            button.addEventListener('click', finishOperation);
        if(symbol == 'Clear')
            button.addEventListener('click', clearCalculator);
        buttons.appendChild(button);
    })
}
createButtons();

function resetOperationStorage() {
    operate.operation = '';
    operate.nums = [];
}
resetOperationStorage();

function clearCalculator() {
    updateValue.addOn = false;
    populateDisplay(0);
    resetOperationStorage();
}

function populateDisplay(value) {
    const display = document.querySelector('#display');
    if (!updateValue.addOn) display.value = '';
    display.value += value;
}

function storeValue(value) {
    if(updateValue.addOn) 
        operate.nums[operate.nums.length - 1] += '' + value;
    else operate.nums.push(value);
}

function updateValue(e) {
    populateDisplay(e.target.id);
    storeValue(e.target.id);
    updateValue.addOn = true;
}

function updateOperation(e) {
    updateValue.addOn = false;
    if(operate.nums.length == 2 && operate.operation) {
        let operationResult = operate();
        storeValue(operationResult);
    }
    operate.operation = e.target.id;
}

function finishOperation() {
    updateValue.addOn = false;
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
    result = Math.round((result + Number.EPSILON) * 10**15) / 10**15;
    populateDisplay(result);
    resetOperationStorage();
    return result;
}