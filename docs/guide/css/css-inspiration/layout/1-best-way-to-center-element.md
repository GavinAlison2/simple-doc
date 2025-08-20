# 实现水平垂直居中最便捷的方法

```css
dispaly: flex;
//子容器
margin: auto; // 在垂直方向上居中元素
```

```html
<div class="g-container">
  <div class="g-box"></div>
</div>

<style>
.g-container {
  width: 100vw;
  height: 100vh;
  display: flex;
}
.g-box {
  width: 40vmin;
  height: 40vmin;
  background: #000;
  margin: auto; // 在垂直方向上居中元素
}

```
