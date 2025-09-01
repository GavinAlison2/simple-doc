# width 失效的问题

## 问题描述

当 `width=100%`, 实际会被内部元素或者当前元素撑开

```css
/*
div.container
  div.inner
*/

div.container {
  width: 300px;
  height: 200px;
  border: 5px solid black;
}
div.inner {
  width: 100%;
  height: 100px;
  /*  box-sizing:content-box||默认, 内部元素撑开, width=300+5*2=315px */
  border: 5px solid red;
}
```

## 解决方案

设置 `box-sizing: border-box;` 即可解决
