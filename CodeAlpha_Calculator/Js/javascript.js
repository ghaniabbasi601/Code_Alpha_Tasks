// Calculator Application
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const currentOperationDisplay = document.getElementById('currentOperation');
    const previousOperationDisplay = document.getElementById('previousOperation');
    const numberButtons = document.querySelectorAll('.number-btn');
    const operatorButtons = document.querySelectorAll('.operator-btn');
    const equalsButton = document.querySelector('.equals-btn');
    const clearButton = document.querySelector('.clear-btn');
    const deleteButton = document.querySelector('.delete-btn');
    const decimalButton = document.querySelector('.decimal-btn');
    
    // Calculator state
    let currentOperation = '0';
    let previousOperation = '';
    let operator = null;
    let resetCurrentOperation = false;
    
    // Update the display
    function updateDisplay() {
        currentOperationDisplay.textContent = currentOperation;
        previousOperationDisplay.textContent = previousOperation;
        
        // Auto-scroll to the end for long numbers
        currentOperationDisplay.scrollLeft = currentOperationDisplay.scrollWidth;
    }
    
    // Add a number to the current operation
    function addNumber(number) {
        if (currentOperation === '0' || resetCurrentOperation) {
            currentOperation = number;
            resetCurrentOperation = false;
        } else {
            currentOperation += number;
        }
        updateDisplay();
    }
    
    // Add a decimal point
    function addDecimal() {
        if (resetCurrentOperation) {
            currentOperation = '0.';
            resetCurrentOperation = false;
        } else if (!currentOperation.includes('.')) {
            currentOperation += '.';
        }
        updateDisplay();
    }
    
    // Handle operator selection
    function selectOperator(selectedOperator) {
        if (currentOperation === '0' && previousOperation === '') return;
        
        if (operator !== null && !resetCurrentOperation) {
            calculateResult();
        }
        
        operator = selectedOperator;
        previousOperation = `${currentOperation} ${getOperatorSymbol(operator)}`;
        resetCurrentOperation = true;
        updateDisplay();
    }
    
    // Calculate the result
    function calculateResult() {
        if (operator === null || resetCurrentOperation) return;
        
        const prev = parseFloat(previousOperation.split(' ')[0]);
        const current = parseFloat(currentOperation);
        let result;
        
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert("Cannot divide by zero!");
                    clearCalculator();
                    return;
                }
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }
        
        // Format result to avoid floating point issues
        result = parseFloat(result.toFixed(10));
        
        previousOperation = `${prev} ${getOperatorSymbol(operator)} ${current} =`;
        currentOperation = result.toString();
        operator = null;
        resetCurrentOperation = true;
        updateDisplay();
    }
    
    // Clear the calculator
    function clearCalculator() {
        currentOperation = '0';
        previousOperation = '';
        operator = null;
        resetCurrentOperation = false;
        updateDisplay();
    }
    
    // Delete the last character
    function deleteLastCharacter() {
        if (currentOperation.length === 1 || (currentOperation.length === 2 && currentOperation.startsWith('-'))) {
            currentOperation = '0';
        } else {
            currentOperation = currentOperation.slice(0, -1);
        }
        updateDisplay();
    }
    
    // Get symbol for operator
    function getOperatorSymbol(op) {
        switch (op) {
            case '+': return '+';
            case '-': return '-';
            case '*': return '×';
            case '/': return '÷';
            case '%': return '%';
            default: return op;
        }
    }
    
    // Button press animation
    function animateButton(button) {
        button.classList.add('pressed');
        setTimeout(() => {
            button.classList.remove('pressed');
        }, 200);
    }
    
    // Add event listeners to number buttons
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            animateButton(button);
            addNumber(button.dataset.number);
        });
    });
    
    // Add event listener to decimal button
    decimalButton.addEventListener('click', () => {
        animateButton(decimalButton);
        addDecimal();
    });
    
    // Add event listeners to operator buttons
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            animateButton(button);
            selectOperator(button.dataset.operator);
        });
    });
    
    // Add event listener to equals button
    equalsButton.addEventListener('click', () => {
        animateButton(equalsButton);
        calculateResult();
    });
    
    // Add event listener to clear button
    clearButton.addEventListener('click', () => {
        animateButton(clearButton);
        clearCalculator();
    });
    
    // Add event listener to delete button
    deleteButton.addEventListener('click', () => {
        animateButton(deleteButton);
        deleteLastCharacter();
    });
    
    // Keyboard support
    document.addEventListener('keydown', event => {
        // Prevent default behavior for calculator keys
        if (event.key.match(/[0-9]/)) {
            event.preventDefault();
            addNumber(event.key);
            
            // Find and animate the corresponding button
            const button = document.querySelector(`.number-btn[data-number="${event.key}"]`);
            if (button) animateButton(button);
        }
        
        if (event.key === '.') {
            event.preventDefault();
            addDecimal();
            animateButton(decimalButton);
        }
        
        if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/' || event.key === '%') {
            event.preventDefault();
            let operatorKey = event.key;
            
            // Map * to × for display
            if (operatorKey === '*') operatorKey = '*';
            if (operatorKey === '/') operatorKey = '/';
            
            selectOperator(operatorKey);
            
            // Find and animate the corresponding button
            const button = document.querySelector(`.operator-btn[data-operator="${operatorKey}"]`);
            if (button) animateButton(button);
        }
        
        if (event.key === 'Enter' || event.key === '=') {
            event.preventDefault();
            calculateResult();
            animateButton(equalsButton);
        }
        
        if (event.key === 'Escape' || event.key === 'Delete') {
            event.preventDefault();
            clearCalculator();
            animateButton(clearButton);
        }
        
        if (event.key === 'Backspace') {
            event.preventDefault();
            deleteLastCharacter();
            animateButton(deleteButton);
        }
    });
    
    // Initial display update
    updateDisplay();
    
    // Add some visual feedback on load
    setTimeout(() => {
        document.querySelector('.calculator').style.transform = 'scale(1)';
        document.querySelector('.calculator').style.opacity = '1';
    }, 100);
});