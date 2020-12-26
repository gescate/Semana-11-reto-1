const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');
const clear = document.querySelector('.clear');
const buttonKeys = document.querySelectorAll('.key');
                      
const targetEvent = e => {
   
   const key = e.target;
   const action = key.dataset.action;
   const keyContent = key.textContent;
   const displayedNum = display.textContent.substring(0,11);
   const previousKeyType = calculator.dataset.previousKeyType;
   const calculate = (n1, operator, n2) => {
      const firstNum = parseFloat(n1);
      const secondNum = parseFloat(n2);
      if (operator === 'add') { return firstNum + secondNum; }
      if (operator === 'substract') { return firstNum - secondNum; }
      if (operator === 'multiply') { return firstNum * secondNum; }
      if (operator === 'divide') { return firstNum / secondNum; }
   };
   const keyPress = document.querySelector(`button[data-key="${e.keyCode}"]`);

   if (key.matches('button')) {
      
      Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
      
      if (!action) {
         if (
            displayedNum === "0" || 
            previousKeyType === 'operator' || 
            previousKeyType === 'calculate'
         ) {
            display.textContent = keyContent;
         } else if (displayedNum.length === 11) {
            display.textContent = displayedNum;
         } else {
            display.textContent = displayedNum + keyContent;
         }
         calculator.dataset.previousKeyType = 'number';
      } 

      if (action === 'add' || action === 'substract' || action === 'multiply' || action === 'divide') {
         const firstValue = calculator.dataset.firstValue;
         const operator = calculator.dataset.operator;
         const secondValue = displayedNum;
         if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
            const calcValue = calculate(firstValue, operator, secondValue);
            display.textContent = calcValue;
            calculator.dataset.firstValue = calcValue;
         } else {
            calculator.dataset.firstValue = displayedNum;
         }
         
         key.classList.add('is-depressed');
         calculator.dataset.previousKeyType = 'operator';
         calculator.dataset.operator = action;
      }
      
      if (action === 'decimal') {
         if (!displayedNum.includes('.') && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
            display.textContent = displayedNum + '.';  
         } else {
            display.textContent = '0.';
         }
         calculator.dataset.previousKeyType = 'decimal';
      }

      if (action === 'clear') {
         const previousOperator = calculator.dataset.operator;
         const previousOperatorKey = calculator.querySelector(`[data-action='${previousOperator}']`)
         if (key.textContent === 'AC') {
            calculator.dataset.firstValue = '';
            calculator.dataset.operator = '';
            calculator.dataset.modValue = '';
            calculator.dataset.previousKeyType = '';
         } else if (previousOperator) {
            key.textContent = 'AC';
            previousOperatorKey.classList.add('is-depressed');
         } else {
            key.textContent = 'AC';
         }
         display.textContent = '0';
         calculator.dataset.previousKeyType = 'clear';
      }
      
      if (action !== 'clear') {
         const clearButton = calculator.querySelector('[data-action=clear]');
         clearButton.textContent = 'CE';
      }

      if (action === 'calculate') {
         let firstValue = calculator.dataset.firstValue;
         const operator = calculator.dataset.operator;
         let secondValue = displayedNum;
         if (firstValue) {
            if (previousKeyType === 'calculate') {
               firstValue = displayedNum;
               secondValue = calculator.dataset.modValue;
            }
            display.textContent = calculate(firstValue, operator, secondValue);
         }
         calculator.dataset.modValue = secondValue;
         calculator.dataset.previousKeyType = 'calculate';
      }
      
   }
   if (keyPress) {
      const pressContent = keyPress.textContent;
      const keyAction = keyPress.dataset.action;
      keyPress.classList.add('is-pressed');
      Array.from(keyPress.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
      function removeTransition(e) {
         if (e.propertyName !== "opacity") return;
         this.classList.remove('is-pressed');
      }
      buttonKeys.forEach(b => b.addEventListener('transitionend', removeTransition));
      
      if (!keyAction) {
         if (displayedNum === "0" || previousKeyType === 'operator' || previousKeyType ==='calculate') {
            display.textContent = pressContent;
         } else if (displayedNum.length === 11) {
            display.textContent = displayedNum;
         } else {
            display.textContent = displayedNum + pressContent;
         }
         calculator.dataset.previousKeyType = 'number';
      }
      
      if (keyAction === 'add' || keyAction === 'substract' || keyAction === 'multiply' || keyAction === 'divide') {
         const firstValue = calculator.dataset.firstValue;
         const operator = calculator.dataset.operator;
         const secondValue = displayedNum;
         if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
            const calcValue = calculate(firstValue, operator, secondValue);
            display.textContent = calcValue;
            calculator.dataset.firstValue = calcValue;
         } else {
            calculator.dataset.firstValue = displayedNum;
         }
         
         keyPress.classList.add('is-depressed');
         calculator.dataset.previousKeyType = 'operator';
         calculator.dataset.operator = keyAction;
      }
      if (keyAction === 'decimal') {
         if (!displayedNum.includes('.') && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
            display.textContent = displayedNum + '.';  
         } else {
            display.textContent = '0.';
         }
         calculator.dataset.previousKeyType = 'decimal';
      }
      
      if (keyAction === 'clear') {
         const previousOperator = calculator.dataset.operator;
         const previousOperatorKey = calculator.querySelector(`[data-action='${previousOperator}']`)
         if (keyPress.textContent === 'AC') {
            calculator.dataset.firstValue = '';
            calculator.dataset.operator = '';
            calculator.dataset.modValue = '';
            calculator.dataset.previousKeyType = '';
         } else {
            keyPress.textContent = 'AC';
            previousOperatorKey.classList.add('is-depressed');
         }
         display.textContent = '0';
         calculator.dataset.previousKeyType = 'clear';
      }
      
      if (keyAction !== 'clear') {
         const clearButton = calculator.querySelector('[data-action=clear]');
         clearButton.textContent = 'CE';
      }

      if (keyAction === 'calculate') {
         let firstValue = calculator.dataset.firstValue;
         const operator = calculator.dataset.operator;
         let secondValue = displayedNum;
         if (firstValue) {
            if (previousKeyType === 'calculate') {
               firstValue = displayedNum;
               secondValue = calculator.dataset.modValue;
            }
            display.textContent = calculate(firstValue, operator, secondValue);
         }
         calculator.dataset.modValue = secondValue;
         calculator.dataset.previousKeyType = 'calculate';
      }
};
   
}
keys.addEventListener('click', targetEvent, false);
document.addEventListener('keydown', targetEvent, false);
