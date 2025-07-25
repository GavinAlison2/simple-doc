# Chapter 5: CSS text

- text properties
- text-indent, 段落缩进
- text-align, 段落对齐, left, right, center, justify
- height, line-height, 行高
- vertical-align, 垂直对齐, top, middle, bottom

- work-spacing, 单词间距, Hello world!单词间空格变宽
- letter-spacing, 字符间距,H e l l o w o r l d !,字母间间距均匀增加
- text-decoration, 文本装饰, underline, line-through, overline
- text-transform, 文本大小写转换
- text-shadow, 文本阴影
- text-overflow, 文本溢出处理, clip, ellipsis
- white-space, 空白处理, normal, pre, nowrap, pre-line
- word-wrap, 长单词换行, break-word, normal
- word-break, 长单词断行

```css
line-height: 18px; /* 行高 */
font-size: 16px; /* 字体大小 */
/* 18px - 16px = 2px 空白 文字形成18px的高度的内联框 */
```

## vertical-align

- top: 顶端对齐
- middle: 垂直居中
- baseline: 基线对齐
- bottom: 底端对齐

vertical-align 属性用于调整行内元素或表格单元格内容的垂直位置

- 行内元素(span/img/input),行内块元素(inline/inline-block),表格单元格(td/th) 有效

失效场景

- 非行内元素, div, p 失效

```html
<!-- 无效, 更正添加display: inline-block;display: inline; -->
<div style="vertical-align: middle;">垂直居中</div>
```

- 父元素非行内

```html
<!-- 无效, 父元素非行内, 更正为 display: inline-block; -->
<div style=" display: block; ">
  <span style="vertical-align: middle;">垂直居中 </span>
</div>
```

- flex,table-cell 下未明确高度

```html
<!-- 无效, 父元素为flex, 未明确高度, 更正为 height: 200px; -->
<div style="display: flex;">
  <span style="vertical-align: middle;">垂直居中</span>
</div>
```

- 浮动/绝对定位元素失效

float: left/right 或 position: absolute/fixed 会使元素脱离文档流，导致 vertical-align 失效

```html
<!-- 无效, 父元素为float/absolute, 子元素为inline, 失效,更正float删除,display: inline-block; -->
<div style="float: left;">
  <span style="vertical-align: middle;">垂直居中</span>
</div>
```
