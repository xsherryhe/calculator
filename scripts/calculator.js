function createButtons() {
    const buttons = document.querySelector('#buttons');
    [7, 8, 9, '÷', 4, 5, 6, 'x', 1, 2, 3, '-', 0, '.', '=', '+', 'Clear']
    .forEach(symbol => {
        const button = document.createElement('button');
        button.classList.add('button');
        button.id = symbol;
        button.textContent = symbol;
        if(typeof symbol == 'number' || symbol == '.') 
            button.addEventListener('click', addToDisplay);
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

function addToDisplay(e) {
    const display = document.querySelector('#display');
    if(!display.addOn) display.value = '';
    document.querySelector('#display').value += e.target.id;
    display.addOn = true;
}

function updateOperation(e) {
    const display = document.querySelector('#display');
    operate.nums.push(display.value);
    if(e.target.id == '=') operate();
    else operate.operation = e.target.id;
    display.addOn = false;
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
    document.querySelector('#display').value = result;
}