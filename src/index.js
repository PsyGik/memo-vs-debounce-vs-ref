import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Debounce from './Debounce';
import Memoized from './Memoized';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <>
    <h1>App</h1>
    <App />
    <h1>Debounce</h1>
    <Debounce />
    <h1>Memoized</h1>
    <Memoized />
  </>,
  rootElement
);
