import logo from './logo.svg';
import { useState, useReducer } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


function countReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function AppIncrement() {

  const [count, setCount] = useState(0);

  const [state, dispatch] = useReducer(countReducer, { count: 0 });
  const decrementHandler = () => dispatch({ type: 'decrement' });
  const incrementHandler = () => dispatch({ type: 'increment' });

  const decrement = () => setCount(count - 1);
  const increment = () => setCount(count + 1);

  const divStyle = {
    width: 400,
    height: 200,
    padding: 10
  }
  const divSpanStyle = {
    width: 100,
    height: 50,
    margin: '0 10px',
  }
  return (
    <div style={divStyle} >
      <Button onClick={decrementHandler} variant="primary">-</Button>
      {/* <span style={divSpanStyle}>{count}</span> */}
      <span style={divSpanStyle}>{state.count}</span>
      <Button onClick={incrementHandler} variant="primary">+</Button>
    </div >
  );
}

export default AppIncrement;
