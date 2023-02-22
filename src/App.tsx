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

  console.log('first number: ', firstNumber);
  console.log('second number: ', secondNumber);
  console.log('operator: ', operator);
  console.log('result: ', result);
  console.log('input: ', currentInput);

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

  const pressKey = async (input: string | number) => {
    setCurrentInput(input);

    //number first input
    if (typeof input == 'number' && !secondNumber && !operator && !result) {
      setFirstNumber((prevNumber) => (prevNumber += input.toString()));
    }

    //number after operator
    if (typeof input == 'number' && operator && !result) {
      setSecondNumber((prevNumber) => (prevNumber += input.toString()));
    }

    //number after equals
    if (typeof input == 'number' && result) {
      setFirstNumber(input.toString());
      setResult('');
      setOperator('');
      setSecondNumber('');
    }

    //operator first input

    //operator after first number
    if (
      checkOperator(input.toString()) &&
      firstNumber &&
      !secondNumber &&
      !result
    ) {
      setOperator(input.toString());
    }
    //operator after second number
    if (checkOperator(input.toString()) && secondNumber) {
      setFirstNumber(runCalculation());
      setSecondNumber('');
      setOperator(input.toString());
    }

    //operator after equals

    if (input == '=') {
      runCalculation();
    }

    if (input == 'reset') {
      setFirstNumber('');
      setSecondNumber('');
      setOperator('');
      setResult('');
    }

    if (input == 'del' && result) {
      return;
    }

    if (input == 'del' && !operator) {
      setFirstNumber((prevNumber) => {
        return prevNumber.substring(0, prevNumber.length - 1);
      });
    }

    if (input == 'del' && operator) {
      setSecondNumber((prevNumber) => {
        return prevNumber.substring(0, prevNumber.length - 1);
      });
    }
  };
  return (
    <div className='app-container'>
      <main>
        <Output
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
