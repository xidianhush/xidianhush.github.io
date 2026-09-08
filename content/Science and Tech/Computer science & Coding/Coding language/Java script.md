# 先了解node,js

简单来说，Node.js 不是一门编程语言，也不是一个框架，而是一个**基于 Chrome V8 引擎的 JavaScript <mark style="background: #ABF7F7A6;">运行环境</mark> —— 它让 JavaScript 可以脱离浏览器，运行在服务器端（比如你的电脑、云服务器）。

### 一、核心概念拆解

1. **本质：JavaScript 的「运行时」**
    
    我们都知道 JavaScript 原本只能在浏览器里跑（比如控制网页交互），而 Node.js 把浏览器里的 JS 引擎（Chrome V8，目前最快的 JS 引擎）抽出来，搭配了一套操作系统级的 API（文件读写、网络请求、进程管理等），让 JS 能做更多事：
    
    - 读写本地文件（浏览器里 JS 做不到）
    - 搭建 Web 服务器（替代 Apache/Nginx 这类服务器）
    - 对接数据库、处理接口请求
    - 开发桌面应用（Electron 基于 Node.js）
2. **核心特点**
    
    - **单线程 + 非阻塞 I/O**：Node.js 用单线程处理请求，但通过「事件循环」机制处理异步操作（比如读取大文件、网络请求），效率极高，特别适合高并发的场景（比如聊天应用、API 接口）。
    - **跨平台**：能在 Windows、Mac、Linux 上运行。
    - **npm 生态**：Node.js 自带的包管理工具 npm，是全球最大的开源软件库，有上百万个现成的包（比如 Express、React、Vue 的构建工具都依赖它），能快速复用别人的代码。
# 语法
## 数据类型

例子：
```html
<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Document</title>

</head>

<body>

<script>

 let str = '123qwe中'

 let num = 123

 let bool1 = true

 let bool2 = false

  

 console.log(str,bool2)

  

 str = '修改后的字符串'

 console.log(str)

</script>

  
  

</body>

</html>
```
效果图：![[Pasted image 20250117163511.png]]