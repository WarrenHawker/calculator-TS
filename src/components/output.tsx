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
    //number first input
    //number after operator
    //operator first input
    //operator after first number
    //operator after second number
    //operator after equals
    //reset button
  }, [props]);

  return (
    <section className='output'>
      <p className='secondary-output'>{secondaryOutput}</p>
      <p className='primary-output'>{primaryOutput}</p>
    </section>
  );
};

export default Output;
