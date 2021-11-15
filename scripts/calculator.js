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
        buttons.appendChild(button);
    })
}
createButtons();

function resetOperationStorage() {
    operate.operation = '';
    operate.nums = [];
}
resetOperationStorage();

//to do: add clear button functionality
function updateValue(e) {
    populateDisplay(e.target.id);
    document.querySelector('#display').addOn = true;
}

function populateDisplay(value) {
    const display = document.querySelector('#display');
    if(!display.addOn) display.value = '';
    display.value += value;
}

function updateOperation(e) {
    const display = document.querySelector('#display');
    operate.nums.push(display.value);
    display.addOn = false;
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