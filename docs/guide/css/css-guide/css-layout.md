# CSS Layout

CSS 布局

- 文档流
- float,浮动布局
- position: absolute/relative/fixed, 定位布局
- flexbox,弹性布局,适合一维布局
- grid,网格布局,适合二维布局
- table,网格布局
- 多列布局,column-count,适合文本分栏
- 媒体查询

## 1. 文档流

HTML 文档的默认排版方式是从上到下，从左到右的顺序，即文档流。

文档流的特点：

1. 块级元素会独占一行，而行内元素则会在同一行显示。
2. 块级元素会在垂直方向上一个接一个地排列，而行内元素则会在水平方向上一个接一个地排列。
3. 块级元素的宽度默认是 100%，即占满整个父元素的宽度。

## 2. float, 浮动布局

利用 float 属性使元素脱离文档流, 并使其在左或右浮动。

float 属性可以设置元素的浮动方向，可以是 left、right、none。

```html
<div class="box">
  <div class="left">左浮动</div>
  <div class="right">右浮动</div>
</div>

<style>
  .box {
    border: 1px solid #000;
    width: 300px;
    height: 200px;
  }

  .left {
    float: left;
    width: 100px;
    height: 100px;
    background-color: #f00;
  }

  .right {
    float: right;
    width: 100px;
    height: 100px;
    background-color: #0f0;
  }
</style>
```

## 3. position: absolute/relative/fixed, 定位布局

position 属性可以设置元素的定位方式，可以是 absolute、relative、fixed。

absolute：相对于最近的已定位的祖先元素进行定位。 根据父对象的 relactive、fixed、static 属性决定自己的位置。如果父对象没有,就相对于 body 进行定位。

relative：相对于其正常位置进行定位。搭配 `top/bottom/left/right` 四个属性可以设置元素的位置。

fixed：相对于浏览器窗口进行定位。

static：默认值，没有定位，元素出现在正常的流中。

只有 relactive, static 在文档流内,其他的定位方式都不在文档流内。

relative、absolute、fixed这三个属性值有一个共同点，都是相对于某个基点的定位，不同之处仅仅在于基点不同。所以，只要理解了它们的基点是什么，就很容易掌握这三个属性值。

- relative 基点 是元素的默认位置，即元素在文档流中原本的位置。`top/bottom/left/right`
- absolute 基点 是离当前元素最近的已定位的祖先元素的左上角。`top/bottom/left/right`
- absolute 有一个重要的限制条件：定位基点（一般是父元素）不能是static定位，否则定位基点就会变成整个网页的根元素html
- fixed 基点 是浏览器窗口。`top/bottom/left/right`

```html
<div class="box">
  <div class="left">左边</div>
  <div class="right">右边</div>
</div>

<style>
  .box {
    border: 1px solid #000;
    width: 300px;
    height: 200px;
    position: relative;
  }

  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background-color: #f00;
  }

  .right {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background-color: #0f0;
  }
</style>
```

## 4. flexbox, 弹性布局

flexbox 是 CSS3 新增的一种布局方式，可以更加灵活地对元素进行布局。

```html
<div class="box">
  <div class="left">左边</div>
  <div class="right">右边</div>
</div>

<style>
  .box {
    display: flex;
    border: 1px solid #000;
    width: 300px;
    height: 200px;
  }

  .left {
    width: 100px;
    height: 100px;
    background-color: #f00;
  }

  .right {
    width: 100px;
    height: 100px;
    background-color: #0f0;
  }
</style>
```

## 5. grid, 网格布局

grid 是 CSS3 新增的一种布局方式，可以更加精细地控制元素的位置。

```html
<div class="box">
  <div class="left">左边</div>
  <div class="right">右边</div>
</div>

<style>
  .box {
    display: grid;
    grid-template-columns: 100px 100px;
    grid-template-rows: 100px 100px;
    border: 1px solid #000;
    width: 300px;
    height: 200px;
  }

  .left {
    background-color: #f00;
  }

  .right {
    background-color: #0f0;
  }
</style>
```

## 6. table, 网格布局

table 是 HTML 中的一种布局方式，可以创建表格。

```html
<table>
  <tr>
    <td>左边</td>
    <td>右边</td>
  </tr>
</table>

<style>
  table {
    border-collapse: collapse;
    width: 300px;
    height: 200px;
  }

  td {
    border: 1px solid #000;
    width: 100px;
    height: 100px;
    text-align: center;
    vertical-align: middle;
  }

  .left {
    background-color: #f00;
  }

  .right {
    background-color: #0f0;
  }
</style>
```

## 7. 多列布局

多列布局是 CSS3 新增的一种布局方式，可以将元素分为多列并设置每列的宽度。

```html
<div class="box">
  <div class="left">左边</div>
  <div class="right">右边</div>
</div>

<style>
  .box {
    display: multi-column;
    column-count: 2;
    column-gap: 10px;
    border: 1px solid #000;
    width: 300px;
    height: 200px;
  }

  .left {
    background-color: #f00;
  }

  .right {
    background-color: #0f0;
  }
</style>
```

## 8. 媒体查询

媒体查询是一种针对不同的屏幕尺寸和设备类型进行网页设计的技术。

```html
<div class="box">
  <div class="left">左边</div>
  <div class="right">右边</div>
</div>
<style>
  .box {
    border: 1px solid #000;
    width: 300px;
    height: 200px;
  }

  .left {
    width: 100px;
    height: 100px;
    background-color: #f00;
  }

  .right {
    width: 100px;
    height: 100px;
    background-color: #0f0;
  }

  @media screen and (max-width: 768px) {
    .box {
      width: 100%;
      height: auto;
    }
  }
</style>
```

在上面的代码中，我们设置了一个媒体查询，当屏幕宽度小于 768px 时，将 box 的宽度设置为 100%，高度设置为 auto，即使内容超出了屏幕，也不会影响布局。  
媒体查询可以针对不同的屏幕尺寸、设备类型、浏览器版本等进行不同的样式设置，提高网页的适应性和可用性。
