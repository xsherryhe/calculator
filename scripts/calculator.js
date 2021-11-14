function operate([x, operation, y]) {
    switch(operation) {
        case '+': return x + y;
        case '-': return x - y;
        case 'x': return x * y;
        case '÷': return x / y;
    }
}