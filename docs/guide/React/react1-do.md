# 练习命令

```shell
# 
npx create-react-app hello-world 
cd hello-world
npm start

```

npx create-react-app 的执行流程

```markdown
当你运行 npx create-react-app my-app 命令时（其中 my-app 是你想要创建的应用的名称）：

npx 会首先检查本地是否已安装 create-react-app。
如果没有安装，npx 会从 npm 仓库下载并临时安装 create-react-app 及其依赖。 
安装完成后，create-react-app 会根据你的项目名称（在这个例子中是 my-app）生成一个新的 React 项目结构。 
生成的项目结构通常包括：

public 文件夹：用于存放静态资源，如 HTML 文件、图片等。 
  public/index.html：应用的入口 HTML 文件。 
src 文件夹：包含所有的源代码，如组件、样式表等。 
  src/index.js：应用的入口 JavaScript 文件。
package.json 文件：项目的配置文件，包含项目依赖、脚本等信息。 
node_modules 文件夹：存放项目依赖的 npm 包。
```

create-react-app 是一个官方提供的 React 脚手架工具，用于快速搭建 React 应用的基础结构

