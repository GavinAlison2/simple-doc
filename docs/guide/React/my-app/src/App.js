import logo from './logo.svg';
import { useState } from 'react';
import { createContext, useContext } from 'react';
import './App.css';


function Detail({ content, active }) {
  return (
    <div>
      <p>{content}</p>
      <p>状态: {active ? 'active true' : 'active false'}</p>
    </div>
  )
}

function Article({ title, content, active }) {
  return (
    <div>
      <h1>{title}</h1>
      {/* <p>{content}</p> */}
      {/* <p>状态: {active ? 'active true' : 'active false'}</p> */}
      <Detail {...{ content, active }} />
    </div>
  )
}
function List({ title, children, footer = <div>默认底部</div> }) {
  return (
    <>
      <h2>{title}</h2>
      <ul >
        {children}
      </ul>
      {footer}
    </>
  );
}

/**
 * ButtonDetail 组件
 *
 * 该组件显示一个按钮和一个段落。点击按钮会切换段落的显示状态。
 */
function ButtonDetail({ onActive }) {
  const [status, setStatus] = useState(false);

  const handleClick = () => {
    setStatus(!status);
    onActive(!status);
  }
  return (
    <div>
      <button onClick={handleClick}>点击我</button>
      <p style={{
        display: status ? 'block' : 'none',
      }}> button detail 内容</p>
    </div>
  )
}

function Heading({ children, level }) {
  const headContent = () => {
    switch (level) {
      case 1:
        return <h1>{children}</h1>;
      case 2:
        return <h2>{children}</h2>;
      case 3:
        return <h3>{children}</h3>;
      case 4:
        return <h4>{children}</h4>;
      case 5:
        return <h5>{children}</h5>;
      case 6:
        return <h6>{children}</h6>;
      default:
        return <p>{children}</p>;
    }
  }
  return (
    headContent()
  )
}
function Section({ children }) {
  return (
    <section>
      {children}
    </section>
  )
}

const LevelContent = createContext(0);
function Sections({ children }) {
  const level = useContext(LevelContent) + 1;
  return (
    <section className="section">
      <LevelContent.Provider value={level}>
        {children}
      </LevelContent.Provider>
    </section>
  )
}

function Headings({ children }) {
  const level = useContext(LevelContent)
  const headContent = () => {
    switch (level) {
      case 0:
        return <p>{children}</p>;
      case 1:
        return <h1>{children}</h1>;
      case 2:
        return <h2>{children}</h2>;
      case 3:
        return <h3>{children}</h3>;
      case 4:
        return <h4>{children}</h4>;
      case 5:
        return <h5>{children}</h5>;
      case 6:
        return <h6>{children}</h6>;
      default:
        return <p>{children}</p>;
    }
  }
  return (
    headContent()
  )
}
function App() {
  const imgStyle = {
    width: '400px',
    height: '400px',
  }
  const imgData = {
    src: logo,
    alt: 'logo',
    style: imgStyle
  }
  // 使用 Array.map 方法替代 for 循环
  const articles = Array.from({ length: 3 }).map((_, index) => (
    <Article key={index} title={`hello ${index + 1}`} content={`world ${index + 1}`} active={index === 0} />
  ));
  const handlerActive = (active) => {
    console.log('active:', active);
  }
  return (
    <div className="App">
      <header className="App-header">
        <Sections  >
          <Headings>关于</Headings>
          <Sections>
            <Headings>照片</Headings>
            <Sections>
              <Headings>视频</Headings>
            </Sections>
          </Sections>
        </Sections>
        <p>-----------</p>
        <Section>
          <Heading level={1}>主标题</Heading>
          <Heading level={2}>副标题</Heading>
          <Heading level={3}>子标题</Heading>
          <Heading level={4}>子子标题</Heading>
          <Heading level={5}>子子子标题</Heading>
          <Heading level={6}>子子子子标题</Heading>
        </Section>
        <p>-----------</p>
        <ButtonDetail onActive={handlerActive} />
        <List title="article" footer={<div>这是底部1</div>}>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </List>
        <p>-----------</p>
        {articles}
        <p>-----------</p>
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={imgStyle}
        />
        <p>-----------</p>
        <img key="img1" alt=""
          {...imgData}
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div >
  );
}

export default App;
