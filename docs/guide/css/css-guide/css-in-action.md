# CSS in Action

> css 的使用技巧

## 1. 文字水平居中

```html
<div class="container">
  <p>This is a paragraph.</p>
</div>
<style>
  /* 将一段文字置于容器的水平中点，只要设置text-align属性即可： */
  .container {
    text-align: center;
  }
</style>
```

## 2. 容器的水平居中

```html
<div class="container">
  <div class="inner">
    <p>This is a paragraph.</p>
  </div>
</div>
<style>
  /* 先为该容器设置一个明确宽度，然后将margin的水平值设为auto即可。 */
  div.container {
    width: 760px;
    margin: 0 auto;
  }
</style>
```

## 3. 文字的垂直居中

```html
<div class="container">
  <p>This is a paragraph.</p>
</div>
<style>
  /* 
给文字设置line-height和height属性，使其高度与容器高度一致，然后设置vertical-align属性为middle即可。 
单行文字的垂直居中，只要将行高与容器高设为相等即可。
*/
  .container {
    height: 100px;
  }

  .container p {
    line-height: 100px;
    height: 100px;
    vertical-align: middle;
  }
</style>
```

## 4. 容器的垂直居中

```html
<div class="container">
  <div class="inner">
    <p>This is a paragraph.</p>
  </div>
</div>
<style>
  div.container {
    posiiton: relative;
    height: 200px;
  }
  div.inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
```

## 5. 文字的换行

```html
<div class="container">
  <p>This is a very long paragraph that should not be wrapped.</p>
  <p>This is a short paragraph that should be wrapped.</p>
</div>
<style>
  /* 给文字设置white-space属性为nowrap，即可禁止文本自动换行。 */
  .container p {
    white-space: nowrap;
  }
</style>
```

## 6. 文字的阴影

```css
/* 给文字设置box-shadow属性即可，语法为：box-shadow: x-offset y-offset blur color。 */
.container p {
  box-shadow: 2px 2px 5px #888888;
}
```

## 7. 图片宽度的自适应

如何使得较大的图片，能够自动适应小容器的宽度

```html
<div class="container">
  <img src="image.jpg" alt="image" />
</div>
<style>
  .container {
    width: 200px;
    height: 200px;
    overflow: hidden;
  }
  .container img {
    width: 100%;
    max-width: 100%;
    height: auto;
  }
</style>
```

## 8. 3D 按钮

```html
<button class="button">Click me</button>
<style>
  .button {
    background-color: #4caf50;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border: none;
    border-radius: 6px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
</style>
```

## 9. font 属性的快捷写法

```css
body {
　　　　font: font-style font-variant font-weight font-size line-height font-family;
　　}
/*
body {
　　　　font-family: Arial, Helvetica, sans-serif;
　　　　font-size: 13px;
　　　　font-weight: normal;
　　　　font-variant: small-caps;
　　　　font-style: italic;
　　　　line-height: 150%;
　　}
*/
/* == */
body {
　　　　font: italic small-caps normal 13px 150% Arial, Helvetica, sans-serif;
　　}
```

## 10. link 状态的设置顺序

link 的四种状态，需要按照下面的前后顺序进行设置：

```md
- a:link
- a:visited
- a:hover
- a:active
```

## 11. CSS 的优先性

行内样式 > id 样式 > class 样式 > 标签名样式

```html
<!-- 有一个元素： -->
　
<div id="ID" class="CLASS" style="color:black;"></div>

<!-- 　div < .class < div.class < #id < div#id < #id.class < div#id.class -->
```

## 12. IE6 的 min-height

IE6 不支持 min-height，有两种方法可以解决这个问题：

```css
.element { 　　　　
  min-height: 500px; 　　　　
  height: auto !important;
  height: 500px; 　
   /*第三句是针对IE设置最小高度  */
}
```

## 13. font-size 基准

浏览器的缺省字体大小是 16px.

```css
h1 {
  font-size: 2.4 em;
}
```

## 14. Text-transform 和 Font Variant

Text-transform 用于将所有字母变成小写字母、大写字母或首字母大写：

Font Variant 用于将字体变成小型的大写字母（即与小写字母等高的大写字母）。

```css
　　p {
  text-transform: uppercase;
}
　　p {
  text-transform: lowercase;
}
　　p {
  text-transform: capitalize;
}
　p {
  font-variant: small-caps;
}
```

## 15. CSS 三角形

```html
<div class="triangle"></div>
<style>
  　.triangle {
        /* up */
  　　　　border-color: transparent transparent green transparent;
        /* down */
  　　　　border-color: green transparent transparent  transparent;
        /* left */
  　　　　border-color: transparent green transparent  transparent;
        /* right */
  　　　　border-color: transparent transparent  transparent green;

  　　　　border-style: solid;
  　　　　border-width: 0px 300px 300px 300px;
  　　　　height: 0px;
  　　　　width: 0px;
  　　}
</style>
```

## 16. 禁止自动换行

```css
.container p {
  white-space: nowrap;
}
```

## 17. 固定位置的页首

<!-- position: fixed -->

```html
<html>
  <head> </head>
  <body>
    <div class="header">
      <h1>Page Title</h1>
    </div>
    <div class="content">
      <p>Page content goes here.</p>
    </div>
    <style>
        　body{ margin:0;padding:100px 0 0 0;}

      　　.header{
      　　　　position:absolute;
      　　　　top:0;
      　　　　left:0;
      　　　　width:100%;
      　　　　height: 50px;
      　　　　background-color: #333;
      　　}

      　　@media screen{
      　　　　body>div#header{position: fixed;}
      　　}
    </style>
  </body>
</html>
```

## 18. 容器的水平和垂直居中

```html
<div class="container">
  <div class="inner">
    <p>This is a paragraph.</p>
  </div>
</div>
<style>
  /* 1. 给容器设置高度和宽度 */
  .container {
    height: 200px;
    width: 200px;
    /* 2. 给容器设置定位 */
    position: relative;
  }
  /* 3. 给内部元素设置定位 */
  .inner {
    text-align: center;
    vertical-align: middle;
  }
</style>
```
