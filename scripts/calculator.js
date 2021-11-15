function createButtons() {
    const buttons = document.querySelector('#buttons');
    [7, 8, 9, '÷', 4, 5, 6, 'x', 1, 2, 3, '-', 0, '.', '=', '+', 'Clear']
    .forEach(symbol => {
        const button = document.createElement('button');
        button.classList.add('button');
        button.id = symbol;
        button.textContent = symbol;
        if(typeof symbol == 'number' || symbol == '.') 
            button.addEventListener('click', populateDisplay);
        buttons.appendChild(button);
    })
}
createButtons();

function populateDisplay(e) {
    const display = document.querySelector('#display');
    if(display.value == '0') display.value = '';
    document.querySelector('#display').value += e.target.id;
}

function operate() {
    const [x, y] = operate.nums;
    let result;
    switch(operate.operation) {
        case '+': result = x + y; break;
        case '-': result = x - y; break;
        case 'x': result = x * y; break;
        case '÷': result = x / y; break;
    }
    operate.operation = '';
    operate.nums = [];
}