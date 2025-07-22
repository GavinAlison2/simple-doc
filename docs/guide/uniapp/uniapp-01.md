# uniapp-01

## todo

- arch
- pages
- globalStyle
- tabBar
- tabBar-list
- condition-list

## 生命周期

- 应用生命周期, App.vue, 控制应用的全局生命周期

  - onLauch,首次启动应用时,初始化全局数据、检查登录状态、获取设备信息等
  - onShow,应用启动或从后台切换到前台时,恢复应用状态、更新数据、跟踪用户行为
  - onHide,应用从前台切换到后台时,保存临时数据、暂停动画或定时器、释放资源
  - onUniNViewMessage,应用报错时,捕获全局错误、记录错误日志、向服务器上报错误信息
  - onUnhandledRejection,未处理的 Promise 拒绝时,捕获未处理的 Promise 异常，避免应用崩溃
  - onPageNotFound,页面不存在时,处理页面不存在的情况，通常用于跳转到 404 页面
  - onThemeChange
  - onLastPageBackPress
  - onExit

- 页面生命周期, 页面生命周期函数在页面组件中定义，控制单个页面的生命周期。

  - onLoad,页面加载时,获取路由参数、初始化页面数据
  - onShow,页面显示时,更新页面数据、获取最新信息
  - onReady,页面初次渲染完成时,操作 DOM（如获取节点信息）、初始化插件
  - onShow,页面显示时,与 onLoad 不同，每次页面显示都会触发（如从其他页面返回）
  - onHide,页面隐藏时,保存临时数据、暂停动画或定时器、释放资源
  - onUnload,页面销毁时,清理定时器、取消网络请求、释放资源
  - onResize,窗口尺寸变化时,响应式布局调整
  - onPullDownRefresh,下拉刷新时,获取最新数据、更新视图
  - onReachBottom,页面滚动到底部时,实现上拉加载更多逻辑,实现上拉加载更多逻辑
  - onShareAppMessage,用户点击分享按钮时,自定义分享内容
  - onPageScroll,页面滚动时,监听页面滚动事件，实现滚动效果（如导航栏变化）
  - onTabItemTap,点击底部 tab 时,处理 tab 切换逻辑
  - onBackPress,用户点击返回按钮时,处理返回逻辑

- 组件生命周期, 在组件中定义，控制组件的生命周期

  - beforeCreate,组件实例初始化之前,此时无法访问 this 和数据
  - created,组件实例初始化完成后,初始化数据、调用 API 获取数据
  - beforeMount,组件挂载到 DOM 前,此时 DOM 尚未生成
  - mounted,组件挂载到 DOM 后,此时 DOM 已生成,操作 DOM、初始化插件、订阅事件
  - beforeUpdate,组件数据更新前, 此时数据已变化，但 DOM 尚未更新
  - updated,组件数据更新后, 此时 DOM 已更新，可以获取更新后的 DOM
  - beforeDestroyed,组件销毁前,此时组件仍然存在于 DOM 中,清理定时器、取消订阅事件、保存临时数据
  - destroyed,组件销毁后,此时组件已从 DOM 中移除,组件实例不存在
  - activated,组件被激活时（仅 keep-alive 组件）,组件从缓存中被恢复时触发
  - deactivated,组件被停用（放入缓存）时（仅 keep-alive 组件）, 组件被移出缓存时触发

- template/vue2/3

## 实践

- 路由参数处理
  - 建议在 onLoad 中获取路由参数，因为此时参数已完全可用。
- DOM 操作
  - 若需操作 DOM（如获取节点信息），应使用 mounted 或 onReady。
- 性能优化
  - 避免在 created 或 onLoad 中执行耗时操作，以免影响页面加载速度。
- 生命周期顺序
  - 了解不同钩子的执行顺序，确保数据在正确的时机初始化
  - created -> onLaunch -> onLoad -> beforeMount -> mounted -> onShow -> onReady -> onShow -> onHide -> onUnload -> destroyed

## 练习

- 模板语法
- 标签, v-text, v-html
- html 文本,{{value}}
- 样式语法
- 样式, class="styleClass"
- 标签,style="color: red", v-bind:style="styleDataVar"
- 标签,:class="styleDataClass"
- 事件绑定
- 标签, v-on:click="methodClick", @click="methodClick2"
- methodClick($event), event 是当前对象, this
- 条件渲染
- 标签 v-if,v-else-if, v-else, templete v-if
- 生命周期
- beforeCreated/created
- beforeMount/mounted
- beforeUpdate/updated
- beforeDestroy/destroyed
- 计算属性
- computed, method, watch
- 父子组件传值, props, emit
