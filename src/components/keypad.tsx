const buttons = [
  {
    id: 7,
    size: 'small',
  },
  {
    id: 8,
    size: 'small',
  },
  {
    id: 9,
    size: 'small',
  },
  {
    id: 'del',
    size: 'small',
  },
  {
    id: 4,
    size: 'small',
  },
  {
    id: 5,
    size: 'small',
  },
  {
    id: 6,
    size: 'small',
  },
  {
    id: '+',
    size: 'small',
  },
  {
    id: 1,
    size: 'small',
  },
  {
    id: 2,
    size: 'small',
  },
  {
    id: 3,
    size: 'small',
  },
  {
    id: '-',
    size: 'small',
  },
  {
    id: '.',
    size: 'small',
  },
  {
    id: 0,
    size: 'small',
  },
  {
    id: '/',
    size: 'small',
  },
  {
    id: 'x',
    size: 'small',
  },
  {
    id: 'reset',
    size: 'large',
  },
  {
    id: '=',
    size: 'large',
  },
];

interface KeyPadProps {
  pressKey: (input: string | number) => void;
}

const Keypad = ({ pressKey }: KeyPadProps) => {
  return (
    <section className='keypad'>
      {buttons.map((button) => {
        return (
          <button
            className={button.size == 'large' ? 'large' : ''}
            onClick={() => pressKey(button.id)}
            key={button.id}>
            {button.id}
          </button>
        );
      })}
    </section>
  );
};

export default Keypad;
