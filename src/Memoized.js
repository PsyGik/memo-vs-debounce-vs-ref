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

const useRenderCounter = (thing) => {
  const renderCount = React.useRef(1);
  React.useEffect(() => {
    renderCount.current += 1;
  });
  return `Render count for ${thing} (${renderCount.current})`;
};

const InputCard = ({ userInput, setUserInput }) => {
  const renderCount = useRenderCounter('InputCard');
  const [input, setInput] = React.useState(userInput);

  React.useEffect(() => {
    setUserInput(input);
  }, [input]);

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

  const QuestionCardMemoized = React.memo(
    () => QuestionCard({ userInput, setUserInput }),
    [userInput, setUserInput]
  );

  const AnswerCardMemoized = React.memo(
    () => AnswerCard({ userInput, setUserInput }),
    [userInput, setUserInput]
  );

  return (
    <div style={Border.BLUE}>
      <span>{renderCount}</span>
      <QuestionCardMemoized />
      <AnswerCardMemoized />
      <InputCard userInput={userInput} setUserInput={setUserInput} />
    </div>
  );
}
