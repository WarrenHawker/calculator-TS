import { useState, useEffect } from 'react';
interface OutputProps {
  calcs: any;
}

const Output = ({ calcs }: OutputProps) => {
  const [primaryOutput, setPrimaryOutput] = useState('0');
  const [secondaryOutput, setSecondaryOutput] = useState('');

  /*condition - if second number is empty string, 
  display firstNumber as primary output*/
  useEffect(() => {}, [calcs]);

  return (
    <section className='output'>
      <p className='secondary-output'>{secondaryOutput}</p>
      <p className='primary-output'>{primaryOutput}</p>
    </section>
  );
};

export default Output;
