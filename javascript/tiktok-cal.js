function pushSymbol(symbol) {
    if (currentInput === '0' || shouldResetDisplay) {
        if (symbol === '.'){
        currentInput += '0.';
        
    } else if (symbol === '&') {
        currentInput += Math.PI.toString();
    } else if (symbol === 'e') {
        currentInput += Math.E.toString();
    } else if (symbol === 'EXP') {
        currentInput += '0*10^';
    } else {
        currentInput += symbol;
    }
    shouldResetDisplay = false;
 } else {
    console.log("three");
    if (symbol === '&') {
        currentInput += Math.PI;
    } else if (symbol === 'e') {
        currentInput += Math.E;
    } else if (symbol === 'EXP') {
        currentInput += '*10^';
    } else {
        currentInput += symbol;
    }
}

updateDisplay();
}

function pushFunction(func) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput += func;
        shouldResetDisplay = false;
    } else {
        currentInput += func;
    }
    updateDisplay();
}





// function pushSymbol(symbol) {
//     if (currentInput === '0' || shouldResetDisplay) {
//         if (symbol === '.') {
//             currentInput += '0.';
//         } else if (symbol === '&') {
//             currentInput +=
//         }

//     }

// }
