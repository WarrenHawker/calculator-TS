import { useState, useEffect } from 'react';
import { checkOperator } from '../App';

interface OutputProps {
  firstNumber: string;
  secondNumber: string;
  operator: string;
  result: string;
  currentInput: string | number;
}

const Output = (props: OutputProps) => {
  const [primaryOutput, setPrimaryOutput] = useState('0');
  const [secondaryOutput, setSecondaryOutput] = useState('');

  useEffect(() => {
    //number first input
    if (
      typeof props.currentInput == 'number' &&
      !props.secondNumber &&
      !props.operator &&
      !props.result
    ) {
      setPrimaryOutput(props.firstNumber);
      setSecondaryOutput('');
    }
    //number after operator
    else if (
      typeof props.currentInput == 'number' &&
      props.operator &&
      !props.result
    ) {
      setPrimaryOutput(props.secondNumber);
      setSecondaryOutput(`${props.firstNumber} ${props.operator}`);
    }

    //operator first input

    //operator after first number
    else if (
      typeof checkOperator(props.currentInput.toString()) &&
      props.operator &&
      !props.result
    ) {
      setSecondaryOutput(`${props.firstNumber} ${props.operator}`);
      setPrimaryOutput(props.firstNumber);
    }

    //operator after second number
    else if (
      checkOperator(props.currentInput.toString()) &&
      !props.secondNumber
    ) {
      setSecondaryOutput(`${props.firstNumber} ${props.operator}`);
      setPrimaryOutput(props.firstNumber);
    }

    //operator after equals

    if (props.currentInput == '=') {
      setSecondaryOutput(
        `${props.firstNumber} ${props.operator} ${props.secondNumber} =`
      );
      setPrimaryOutput(props.result);
    }
    //reset button
    else if (props.currentInput == 'reset') {
      setSecondaryOutput('');
      setPrimaryOutput('0');
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
