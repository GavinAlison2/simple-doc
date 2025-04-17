import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppIncrement from './App-useState-useReducer';
import AppRef from './App-ref';
import AppEffect from './App-effect';
import AppMemo from './App-useMemo-useCallback';
import AppProps from './App-props';
import AppTodo from './App-todo'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <AppIncrement /> */}
    {/* <AppRef /> */}
    {/* <AppEffect /> */}
    {/* <AppMemo /> */}
    {/* <AppProps /> */}
    <AppTodo />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
