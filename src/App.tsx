import History from './components/history';
import Keypad from './components/keypad';
import Output from './components/output';
import { useState } from 'react';

export const checkOperator = (input: string) => {
  if (input == '+' || input == '-' || input == '/' || input == 'x') {
    return true;
  } else return false;
};

function App() {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState('');
  const [operator, setOperator] = useState('');
  const [currentInput, setCurrentInput] = useState<string | number>('');
  const [previousInput, setPreviousInput] = useState<string | number>('');

  console.log('first number: ', firstNumber);
  console.log('second number: ', secondNumber);
  console.log('operator: ', operator);
  console.log('result: ', result);
  console.log('current input: ', currentInput);
  console.log('previous input: ', previousInput);
  console.log('-----------------');

  const runCalculation = (): string => {
    let newResult: number = 0;
    switch (operator) {
      case '+':
        newResult = parseFloat(firstNumber) + parseFloat(secondNumber);
        break;
      case '-':
        newResult = parseFloat(firstNumber) - parseFloat(secondNumber);
        break;
      case '/':
        newResult = parseFloat(firstNumber) / parseFloat(secondNumber);
        break;
      case 'x':
        newResult = parseFloat(firstNumber) * parseFloat(secondNumber);
        break;
      default:
        return '';
    }
    setResult(newResult.toString());
    return newResult.toString();
  };

  const pressKey = (input: string | number) => {
    setPreviousInput(currentInput);
    setCurrentInput(input);

    //dot first input
    if (!currentInput && input == '.') {
      setFirstNumber('0.');
    }
    //dot after first number
    if (typeof currentInput == 'number' && input == '.' && !operator) {
      if (firstNumber.includes('.')) {
        return;
      } else {
        setFirstNumber((prevNumber) => (prevNumber += input.toString()));
      }
    }

    //dot after second number
    if (typeof currentInput == 'number' && input == '.' && operator) {
      if (secondNumber.includes('.')) {
        return;
      } else {
        setSecondNumber((prevNumber) => (prevNumber += input.toString()));
      }
    }

    //dot after operator
    if (checkOperator(currentInput.toString()) && input == '.') {
      setSecondNumber('0.');
    }

    //dot after reset
    if (currentInput == 'reset' && input == '.') {
      setFirstNumber('0.');
    }

    //dot after equals
    if (currentInput == '=' && input == '.') {
      setFirstNumber('0.');
    }

    //first number after dot
    if (currentInput == '.' && typeof input == 'number' && !operator) {
      setFirstNumber((prevNumber) => (prevNumber += input.toString()));
    }

    //second number after dot
    if (currentInput == '.' && typeof input == 'number' && operator) {
      setSecondNumber((prevNumber) => (prevNumber += input.toString()));
    }

    //number first input
    if (!previousInput && typeof input == 'number') {
      setFirstNumber(input.toString());
      setSecondNumber('');
      setOperator('');
    }

    //number after equals
    if (currentInput == '=' && typeof input == 'number') {
      setFirstNumber(input.toString());
      setSecondNumber('');
      setOperator('');
    }

    //additional numbers before operator
    if (
      typeof currentInput == 'number' &&
      typeof input == 'number' &&
      !secondNumber
    ) {
      setFirstNumber((prevNumber) => (prevNumber += input));
    }

    //number after operator
    if (checkOperator(currentInput.toString()) && typeof input == 'number') {
      setSecondNumber(input.toString());
    }

    //additional numbers after operator
    if (
      typeof currentInput == 'number' &&
      typeof input == 'number' &&
      secondNumber
    ) {
      setSecondNumber((prevNumber) => (prevNumber += input));
    }
    //operator first input
    if (!currentInput && checkOperator(input.toString())) {
      setFirstNumber('0');
      setOperator(input.toString());
    }
    //operator after first number
    if (typeof currentInput == 'number' && checkOperator(input.toString())) {
      setOperator(input.toString());
    }
    //operator after second number
    if (checkOperator(input.toString()) && firstNumber && secondNumber) {
      setFirstNumber(runCalculation());
      setOperator(input.toString());
      setSecondNumber('');
    }
    //operator after equals
    if (checkOperator(input.toString()) && currentInput == '=') {
      setOperator(input.toString());
      setFirstNumber(result);
    }

    //operator after operator
    if (
      checkOperator(input.toString()) &&
      checkOperator(currentInput.toString())
    ) {
      setOperator(input.toString());
    }
    //equals
    if (input == '=') {
      runCalculation();
    }
    //reset
    if (input == 'reset') {
      setFirstNumber('');
      setSecondNumber('');
      setOperator('');
      setResult('');
    }

    //first number after reset
    if (typeof input == 'number' && currentInput == 'reset') {
      setFirstNumber(input.toString());
    }
  };
  return (
    <div className='app-container'>
      <main>
        <Output
          previousInput={previousInput}
          currentInput={currentInput}
          firstNumber={firstNumber}
          secondNumber={secondNumber}
          operator={operator}
          result={result}
        />
        <Keypad pressKey={pressKey} />
      </main>
      <aside>
        <History />
      </aside>
    </div>
  );
}

export default App;
