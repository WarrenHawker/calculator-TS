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
  const [prevInput, setPrevInput] = useState<string>('');
  const [calcs, setCalcs] = useState([
    //display is either "primary", "secondary", "none" or "both"
    {
      name: 'firstNumber',
      value: '0',
      display: 'primary',
      activeChange: true,
    },
    {
      name: 'secondNumber',
      value: '',
      display: 'none',
      activeChange: false,
    },
    {
      name: 'operator',
      value: '',
      display: 'none',
    },
    {
      name: 'result',
      value: '',
      display: 'none',
    },
  ]);

  console.log(calcs);

  const runCalculation = (): string => {
    let newResult: number = 0;
    switch (calcs[2].value) {
      case '+':
        newResult = parseFloat(calcs[0].value) + parseFloat(calcs[1].value);
        break;
      case '-':
        newResult = parseFloat(calcs[0].value) - parseFloat(calcs[1].value);
        break;
      case '/':
        newResult = parseFloat(calcs[0].value) / parseFloat(calcs[1].value);
        break;
      case 'x':
        newResult = parseFloat(calcs[0].value) * parseFloat(calcs[1].value);
        break;
      default:
        return '';
    }
    return newResult.toString();
  };

  const inputNum = (input: string, prevInput: string) => {
    if (prevInput == '=') {
      setCalcs([
        {
          name: 'firstNumber',
          value: input,
          display: 'primary',
          activeChange: true,
        },
        {
          name: 'secondNumber',
          value: '',
          display: 'none',
          activeChange: false,
        },
        {
          name: 'operator',
          value: '',
          display: 'none',
        },
        {
          name: 'result',
          value: '',
          display: 'none',
        },
      ]);
    } else {
      setCalcs((prevCalcs) => {
        return prevCalcs.map((item) => {
          let newValue = '';
          if (item.activeChange) {
            if (item.value == '0' || '') {
              newValue = input;
            } else newValue = item.value += input;
            return { ...item, value: newValue };
          } else return { ...item };
        });
      });
    }
  };

  const inputOperator = (input: string, prevInput: string) => {
    if (prevInput == '=') {
      setCalcs([
        {
          name: 'firstNumber',
          value: calcs[3].value,
          display: 'both',
          activeChange: false,
        },
        {
          name: 'secondNumber',
          value: '',
          display: 'none',
          activeChange: true,
        },
        {
          name: 'operator',
          value: input,
          display: 'secondary',
        },
        {
          name: 'result',
          value: '',
          display: 'none',
        },
      ]);
    } else {
      setCalcs((prevCalcs) => {
        return prevCalcs.map((item) => {
          if (item.name == 'operator') {
            return { ...item, value: input, display: 'secondary' };
          } else if (item.name == 'firstNumber') {
            return { ...item, activeChange: false, display: 'both' };
          } else if (item.name == 'secondNumber') {
            return { ...item, activeChange: true, display: 'primary' };
          } else return { ...item };
        });
      });
    }
  };

  const inputUtil = (input: string, prevInput: string) => {
    if (input == '=') {
      setCalcs((prevCalcs) => {
        return prevCalcs.map((item) => {
          if (item.name == 'result') {
            return { ...item, value: runCalculation(), display: 'primary' };
          } else return { ...item, display: 'secondary' };
        });
      });
    }
    if (input == 'reset') {
      setCalcs([
        {
          name: 'firstNumber',
          value: '0',
          display: 'primary',
          activeChange: true,
        },
        {
          name: 'secondNumber',
          value: '',
          display: 'none',
          activeChange: false,
        },
        {
          name: 'operator',
          value: '',
          display: 'none',
        },
        {
          name: 'result',
          value: '',
          display: 'none',
        },
      ]);
    }
    if (input == 'del') {
      setCalcs((prevCalcs) => {
        return prevCalcs.map((item) => {
          let newValue = '';
          if (item.activeChange) {
            if (item.value.length < 2) {
              newValue = '0';
            } else newValue = item.value.substring(0, item.value.length - 1);
            return { ...item, value: newValue };
          } else return { ...item };
        });
      });
    }
    if (input == '.') {
      setCalcs((prevCalcs) => {
        return prevCalcs.map((item) => {
          if (item.activeChange) {
            if (item.value.includes('.')) {
              return { ...item };
            }
            let newValue = (item.value += input);
            return { ...item, value: newValue };
          } else return { ...item };
        });
      });
    }
  };

  const pressKey = (input: string | number) => {
    if (typeof input == 'number') {
      inputNum(input.toString(), prevInput);
    } else if (checkOperator(input.toString())) {
      inputOperator(input.toString(), prevInput);
    } else {
      inputUtil(input.toString(), prevInput);
    }
    setPrevInput(input.toString());
  };
  return (
    <div className='app-container'>
      <main>
        <Output calcs={calcs} />
        <Keypad pressKey={pressKey} />
      </main>
      <aside>
        <History />
      </aside>
    </div>
  );
}

export default App;
