import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  // const divContent = 'Hello World !';
  const divTitle = 'hello title';
  // const [divContent, setDivContent] = useState('http')
  // let divContent = '';
  // const flag = true;
  // useEffect(() => {
  //   if (flag) {
  //     // divContent = 'http://www.baidu.com';
  //     setDivContent('http://www.baidu.com');
  //   } else {
  //     // divContent = 'https://www.google.com';
  //     setDivContent('https://www.google.com');
  //   }
  // }, [flag]);

  // let divContent = '';
  // const flag = true;
  // if (flag) {
  //   divContent = 'http://www.baidu.com';
  // } else {
  //   divContent = 'https://www.google.com';
  // }
  // function clickChange() {
  //   // divContent = 'https://www.google.com';
  //   // setDivContent('https://www.google.com');
  //   divContent = 'com';
  // }

  const names = [
    { id: 1, firstname: 'Bob' },
    { id: 2, firstname: 'Tom' },
    { id: 3, firstname: 'Jerry' }
  ];
  const listContent = names.map((name) => {
    return <div key={name.id}>{name.firstname}</div>;
  });

  const [content, setContent] = useState('Hello World');
  // useEffect(() => {
  //   setContent('Hello World');
  // }, [content]);

  const handlerClick = () => {
    if (content === 'Hello World') {
      setContent('新内容');
    }
    // console.log('click');
  };

  const [data, setData] = useState({
    title: 'default title',
    content: 'default content',
  })
  const objClick = () => {
    setData({
      ...data,
      content: 'new content',
    })
  }

  const [dataArr, setDataArr] = useState([
    { id: 1, firstname: 'Bob' },
    { id: 2, firstname: 'Tom' },
    { id: 3, firstname: 'Jerry' }
  ]);
  let id = 3;
  const arrClick = () => {

    setDataArr([
      ...dataArr,
      { id: ++id, firstname: 'Lily' }
    ]);
  }
  const arrContent = dataArr.map((name) => {
    return <div key={name.id}>{name.firstname}</div>;
  });

  const arrRemove = (i) => {
    setDataArr(dataArr.filter((item, index) => index !== i - 1));
  }



  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
      <h1>Hello World</h1>
      {/* <button onclick={clickChange}>click</button> */}
      {/* <div title={divTitle}>{divContent}</div> */}
      {listContent}
      <p>----</p>
      <div>{content}</div>
      <p>----</p>
      <div>{data.content}</div>
      <br />
      <div> {arrContent}</div>
      <button onClick={arrClick}>click</button>
      <button onClick={arrRemove.bind(this, 1)}>remove arr</button>
    </div>
  );
}

export default App;
