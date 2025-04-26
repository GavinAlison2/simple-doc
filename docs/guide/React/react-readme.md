# react

## React 教程

什么是 React？

>React 是用于 Web 和原生用户界面的库。在本教程系列中，我们将重点介绍 React 的 Web 应用。

React 主要做两件事

- 显示 HTML。
- 当用户与应用程序交互时更改 HTML。

>在 React 中，组件是一个 函数，它返回 JSX。JSX 代表 JavaScript XML。JSX 是 JavaScript 的扩展语法，允许您在 JavaScript 代码中直接编写类似 HTML 的代码。

以下示例展示了如何创建一个 App 组件，该组件显示包含文本 "Hello, World!" 的 h1 标签。

```jsx
function App() {
  return <h1>Hello, World!</h1>;
}
```

>React 从 App 组件接收 JSX，将其转换为 JavaScript，并在屏幕上显示组件。在本例中，React 在屏幕上渲染 `<h1>` 标签。    
>通常，React 应用程序包含许多协同工作的组件。每个组件都显示用户界面 (UI) 的一部分。   
>为了快速学习 React，建议编写许多 React 应用程序，从简单的应用程序开始，逐步过渡到实际 项目。

## 第 1 节。 React 入门

本节将通过解释 React 的工作原理，帮助您快速开始使用 React。

- React Hello World – 让我们创建一个简单的 React 应用程序。
  - babel 转换 JavaScript 代码。
  - Webpack 打包 JavaScript 代码为 bundle.js 文件。
- JSX – 了解 JSX 以及如何在 React 应用程序中正确编写 JSX 元素。
- Props – 学习如何使用 React Props 系统将数据从父组件传递到子组件。
- Key Prop – 向您展示如何使用 key 属性在 React 应用程序中正确渲染列表。
- 条件渲染 – 学习如何根据条件渲染 JSX 元素。
- 事件 – 指导您使用 React 事件处理鼠标点击或表单提交等事件。
- 状态 – 向您展示如何使用 React 状态和事件创建交互式 React 组件。

## 第 2 节。 与 API 交互

本节展示如何创建使用外部 API 的 React 应用程序。

- React API 调用 – 向您展示如何在 React 中创建一个维基百科搜索应用程序。

## 第 3 节。 待办事项应用程序

在本节中，我们将逐步在 React 中创建三个版本的待办事项应用程序。

- React 待办事项应用程序 – 逐步学习如何创建 React 待办事项应用程序。
- 使用 API 的 React 待办事项应用程序 – 创建一个使用 API 进行数据持久化的待办事项应用程序。
- 使用 Context 的 React 待办事项应用程序 – 使用 Context 在整个 React 应用程序中共享状态。

## 第 4 节。 深入了解 React Hooks

- useState – 学习如何使用 useState 钩子向组件添加状态变量。
- useEffect – 指导您如何在组件中运行副作用函数。
- useReducer – 向您展示如何使用 useReducer 钩子更有效地管理多个紧密相关的状态。
- useRef – 学习如何使用 useRef 钩子直接访问 DOM 元素，并在不导致重新渲染的情况下修改状态。


>link
1. https://tutorial.javascript.ac.cn/react-tutorial/
2. https://zh-hans.react.dev/learn/passing-data-deeply-with-context
3. https://www.bilibili.com/video/BV1xM41197cZ?spm_id_from=333.788.videopod.sections&vd_source=5a41e8ae8c0a4c2c6809a5ccf977c1a9
