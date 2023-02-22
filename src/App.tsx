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

    //number first input
    if (!firstNumber && typeof input == 'number') {
      setFirstNumber(input.toString());
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
    //equals
    if (input == '=') {
      runCalculation();
      setFirstNumber('');
      setSecondNumber('');
      setOperator('');
    }

    if (input == 'reset') {
      setFirstNumber('');
      setSecondNumber('');
      setOperator('');
      setResult('');
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
