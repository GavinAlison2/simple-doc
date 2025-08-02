# CSS Float

## Float

- 元素向左 / 右浮动
- 文本环绕
- 父元素高度塌陷

解决父元素高度塌陷的方法

浮动元素的父元素高度无法自动扩展，导致布局混乱。

1. 清除浮动

```css
/* /_ 方法 1：使用 clearfix 类 _/ */

.parent::after {
  content: "";
  display: block;
  clear: both;
}

/* /_ 方法 2：设置父元素为 BFC（块级格式化上下文） _/ */
.parent {
  overflow: auto;
  /* /_ 或 display: flow-root _/ */
}
```

## 与其他脱离文档流方式的对比

- 方式,特性
- float,元素向左 / 右浮动，文本环绕，父元素高度塌陷。
- position:absolute,完全脱离文档流，不影响周围元素，定位相对于最近的定位祖先元素。
- position:fixed,完全脱离文档流，固定在视口位置，不随滚动变化。
- position:sticky,混合定位，在滚动时固定在某个位置，但仍占据文档流空间。

> link
>
> 1. https://www.cnblogs.com/ydyxcode/p/18102223
