# Chapter 2: CSS Syntax and Selectors

## 1. CSS 基础语法

```css
/* 选择器 */
div {
  /* 属性 */
  color: red;
  font-size: 16px;
}
```

## 2. CSS 选择器

- 标签选择器（如 div、p、h1,Element Selectors
- 类选择器（如 .my-class）,Class Selectors
- ID 选择器（如 #my-id）, ID Selectors
- 属性选择器（如 [type=“text”]）, Attribute Selectors
- 基于部分属性值选择([foo*="bar"]), Attribute Selectors with Particular Values
- 伪类选择器（如 a:hover）, Pseudo-class Selectors
- 组合选择器（如 div.my-class, input[type=“text”]）, Grouping Selectors
- 通配符选择器（如 \*）, Universal Selectors

- 后代选择器（如 ul li）, Descendant Selectors
- 子代选择器（如 ul > li）, Child Selectors
- 相邻兄弟选择器（如 h1 + p）, Adjacent Sibling Selectors
- 伪元素选择器（如 ::before）, Pseudo-element Selectors
- 选中根元素（如 :root）, Selecting the Root Element
- 否定伪类选择器（如 :not(p)）, Negating a Pseudo-class Selector
- 唯一子元素选择器（如 :first-child）, Selecting the First Child Element
- 最后一个子元素选择器（如 :last-child）, Selecting the Last Child Element
- 第 n 个子元素选择器（如 :nth-child(n)）, Selecting the nth Child Element
- 第 n 个类型元素选择器（如 :nth-of-type(n)）, Selecting the nth Type Element
- 第 n 个类型元素选择器（如 :nth-last-of-type(n)）, Selecting the nth Last Type Element
- 第 n 个子元素选择器（如 :first-of-type）, Selecting the First Type Element

## 3. CSS 选择器优先级

- 内联样式（在标签内使用 style 属性）
- ID 选择器
- 类选择器、属性选择器
- 元素选择器（最高优先级）
- 通配符选择器（最低优先级）
- 继承样式（从父元素继承）

## 4. CSS 属性

- color：设置文本颜色
- font-size：设置字体大小
- background-color：设置背景颜色
- margin：设置外边距
- padding：设置内边距
- width：设置元素宽度
- height：设置元素高度
