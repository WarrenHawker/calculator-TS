import { useState, useEffect } from 'react';
import { checkOperator } from '../App';

interface OutputProps {
  firstNumber: string;
  secondNumber: string;
  operator: string;
  result: string;
  currentInput: string | number;
  previousInput: string | number;
}

const Output = (props: OutputProps) => {
  const [primaryOutput, setPrimaryOutput] = useState('0');
  const [secondaryOutput, setSecondaryOutput] = useState('');

  useEffect(() => {
    //dot first input
    if (!props.previousInput && props.currentInput == '.') {
      setPrimaryOutput(props.firstNumber);
      setSecondaryOutput('');
    }
    //dot after first number
    if (
      !props.operator &&
      typeof props.previousInput == 'number' &&
      props.currentInput == '.'
    ) {
      setPrimaryOutput(props.firstNumber);
      setSecondaryOutput('');
    }

    //dot after second number
    if (
      props.operator &&
      typeof props.previousInput == 'number' &&
      props.currentInput == '.'
    ) {
      setPrimaryOutput(props.secondNumber);
      setSecondaryOutput(`${props.firstNumber} ${props.operator}`);
    }

    //dot after operator
    if (
      checkOperator(props.previousInput.toString()) &&
      props.currentInput == '.'
    ) {
      setPrimaryOutput('0.');
      setSecondaryOutput(`${props.firstNumber} ${props.operator}`);
    }
    //dot after reset
    if (props.currentInput == '.' && props.previousInput == 'reset') {
      setPrimaryOutput('0.');
      setSecondaryOutput('');
    }

    //dot after equals
    if (props.currentInput == '.' && props.previousInput == '=') {
      setPrimaryOutput('0.');
      setSecondaryOutput('');
    }

    //first number after dot
    if (
      !props.secondNumber &&
      typeof props.currentInput == 'number' &&
      props.previousInput == '.'
    ) {
      setPrimaryOutput(props.firstNumber);
      setSecondaryOutput('');
    }

    //second number after dot
    if (
      typeof props.currentInput == 'number' &&
      props.previousInput == '.' &&
      props.operator
    ) {
      setPrimaryOutput(props.secondNumber);
      setSecondaryOutput(`${props.firstNumber} ${props.operator}`);
    }
    //number first input
    if (!props.previousInput && typeof props.currentInput == 'number') {
      setPrimaryOutput(props.firstNumber);
      setSecondaryOutput('');
    }

    //number after equals
    if (props.previousInput == '=' && typeof props.currentInput == 'number') {
      setSecondaryOutput('');
      setPrimaryOutput(props.firstNumber);
    }
    //additional numbers before operator
    if (
      typeof props.previousInput == 'number' &&
      typeof props.currentInput == 'number' &&
      !props.operator
    ) {
      setPrimaryOutput(props.firstNumber);
    }
    //number after operator
    if (
      typeof props.currentInput == 'number' &&
      checkOperator(props.previousInput.toString())
    ) {
      setPrimaryOutput(props.secondNumber);
      setSecondaryOutput(`${props.firstNumber} ${props.operator}`);
    }
    //additional numbers after operator
    if (
      typeof props.previousInput == 'number' &&
      typeof props.currentInput == 'number' &&
      props.operator
    ) {
      setPrimaryOutput(props.secondNumber);
      setSecondaryOutput(`${props.firstNumber} ${props.operator}`);
    }
    //operator first input
    if (
      checkOperator(props.currentInput.toString()) &&
      !props.firstNumber &&
      !props.secondNumber
    ) {
      setPrimaryOutput(props.firstNumber);
      setSecondaryOutput(`${props.firstNumber} ${props.operator}`);
    }
    //operator after first number
    if (
      checkOperator(props.currentInput.toString()) &&
      props.firstNumber &&
      !props.secondNumber
    ) {
      setPrimaryOutput(props.firstNumber);
      setSecondaryOutput(`${props.firstNumber} ${props.operator}`);
    }

    //operator after equals
    if (
      checkOperator(props.currentInput.toString()) &&
      props.previousInput == '='
    ) {
      setPrimaryOutput(props.result);
      setSecondaryOutput(`${props.result} ${props.operator}`);
    }

    //operator after operator
    if (
      checkOperator(props.currentInput.toString()) &&
      checkOperator(props.previousInput.toString())
    ) {
      setPrimaryOutput(props.result);
      setSecondaryOutput(`${props.result} ${props.operator}`);
    }
    //equals
    if (props.currentInput == '=') {
      setPrimaryOutput(props.result || props.firstNumber);
      setSecondaryOutput(
        `${props.firstNumber} ${props.operator} ${props.secondNumber} = `
      );
    }
    //reset
    if (props.currentInput == 'reset') {
      setPrimaryOutput('0');
      setSecondaryOutput('');
    }

    //first number after reset
    if (
      typeof props.currentInput == 'number' &&
      props.previousInput == 'reset'
    ) {
      setPrimaryOutput(props.firstNumber);
      setSecondaryOutput('');
    }

    //del on first number
    if (props.currentInput == 'del' && !props.operator) {
      setPrimaryOutput(props.firstNumber);
      setSecondaryOutput('');
    }

    //del on second number
    if (props.currentInput == 'del' && props.operator) {
      setPrimaryOutput(props.secondNumber);
      setSecondaryOutput(`${props.firstNumber} ${props.operator}`);
    }

    //first number after del
    if (
      typeof props.currentInput == 'number' &&
      props.previousInput == 'del' &&
      !props.operator
    ) {
      setPrimaryOutput(props.firstNumber);
      setSecondaryOutput('');
    }

    //second number after del
    if (
      typeof props.currentInput == 'number' &&
      props.previousInput == 'del' &&
      props.operator
    ) {
      setPrimaryOutput(props.secondNumber);
      setSecondaryOutput(`${props.firstNumber} ${props.operator}`);
    }
  }, [props]);

  return (
    <section className='output'>
      <p className='secondary-output'>{secondaryOutput}</p>
      <p className='primary-output'>{primaryOutput}</p>
    </section>
  );
};

export default Output;
