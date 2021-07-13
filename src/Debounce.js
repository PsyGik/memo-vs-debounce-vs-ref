import './styles.css';
import React from 'react';

const Border = {
  RED: {
    border: '1px solid red',
    margin: '12px 0',
    padding: '4px'
  },
  GREEN: {
    border: '1px solid green',
    margin: '12px 0',
    padding: '4px'
  },
  BLUE: {
    border: '1px solid blue',
    margin: '12px 0',
    padding: '4px'
  },
  MAGENTA: {
    border: '1px solid magenta',
    margin: '12px 0',
    padding: '4px'
  }
};

const MARGIN = { margin: '12px' };

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

const useRenderCounter = (thing) => {
  const renderCount = React.useRef(1);
  React.useEffect(() => {
    renderCount.current += 1;
  });
  return `Render count for ${thing} ${renderCount.current}`;
};

const InputCard = ({ userInput, setUserInput }) => {
  const renderCount = useRenderCounter('InputCard');
  const [input, setInput] = React.useState(userInput);
  const debouncedValue = useDebounce(input, 750);

  React.useEffect(() => {
    setUserInput(debouncedValue);
  }, [debouncedValue]);

  return (
    <div style={Border.MAGENTA}>
      <span>{renderCount}</span>
      <div style={MARGIN}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id="userQuery"
        />
      </div>
    </div>
  );
};

const QuestionCard = ({ userInput, setUserInput }) => {
  const renderCount = useRenderCounter('QuestionCard');
  return (
    <div style={Border.RED}>
      <span>{renderCount}</span>
      <div style={MARGIN}>User Input: {userInput}</div>
    </div>
  );
};

const AnswerCard = ({ userInput, setUserInput }) => {
  const renderCount = useRenderCounter('AnswerCard');
  return (
    <div style={Border.GREEN}>
      <span>{renderCount}</span>
      <div style={MARGIN}>User Input: {userInput}</div>
    </div>
  );
};

export default function App() {
  const renderCount = useRenderCounter('App');
  const [userInput, setUserInput] = React.useState('');

  return (
    <div style={Border.BLUE}>
      <span>{renderCount}</span>
      <QuestionCard userInput={userInput} setUserInput={setUserInput} />
      <AnswerCard userInput={userInput} setUserInput={setUserInput} />
      <InputCard userInput={userInput} setUserInput={setUserInput} />
    </div>
  );
}
