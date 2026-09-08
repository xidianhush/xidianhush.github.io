# 目标
## 创新点
1. 非常优秀的可视化
2. 非常方便的操作
3. 像git那样的版本系统，有分支
4. 集成遇到困难思考系统，看notability![[Pasted image 20250129200326.png]]
5. 逼你看长期目标的操作
6. 软件名字可以根据用户名变化
7. 日计划可以根据事件的重要大小定字体大小，字体大的更重要，更醒目
## 效果
1. 先完成一天的视图
2. 再完成像无边际那样可缩放的视图
3. 做成可发行的app或小程序
4. 拓展planA和planB的branch功能，像git那样的版本系统，有分支
5. 要==方便的创建很多个重复的事件==（不要像obsidian和todo那样重复创建很多的事件要一直重复操作），可以参考输入法的快捷输入，或者直接由用户自己设定
6. 可以有条移动的时间轴
7. 可以加==做的事情==，也可以==加不做的事情==
8. 添加事件逻辑
## UI设计
这是为了逼用户关注用户关注长远目标![[Pasted image 20250129222450.png]]
交互逻辑![[Pasted image 20250203205728.png]]
## 操作方式

您可以按照以下方法实现日程管理可视化软件：

1. **前端框架**：使用React或Vue.js构建用户界面，以便于管理组件和状态。
2. **画布库**：利用Fabric.js或Konva.js来实现可缩放和可交互的画布功能，支持横竖方向的缩放。
3. **时间轴**：在画布左侧集成一个时间轴，可以使用D3.js进行时间轴的可视化处理。
4. **事件创建**：监听画布的右键点击事件，弹出一个表单窗口让用户输入事件的起始时间和类别。
5. **数据管理**：使用Redux或Vuex来管理事件数据，确保事件的添加、更新和显示的同步。
6. **样式与布局**：使用CSS Flexbox或Grid进行布局设计，确保界面的响应式和美观性。
直接去GitHub上找day planner的插件让copilot改
## 宣传
### 目标
1. 做一个效果➕使用教程
2. 做一个开发目的和开发历程
### 文案
只要把这篇笔记的全部内容理清叙述顺序就行，因为内容都在这
+ 灵感
	1. 视频中提到和传统todoapp搞清楚在要干什么事复杂度的对比
	2. 提到所有的创新点

# 方法
==用boltnew试一试==
用通义灵码那个vs code插件试一试
用roo cline和deep seek试一试
==产品调研==，看看app store，安卓商店，GitHub上有没有类似产品
决定用==flutter==框架了
试试字节trae编辑器

# 与通义灵码的聊天记录
我想做一个可以将日程管理可视化的软件。1、用户可以在一个大画布上在某个位置，鼠标右键建立新日程（这个日程可以自己设定起止时间）。2、日程会以小框框的形式出现在一个canvas上。3、这个canvas在顶部有一个横坐标，显示的是时间轴。4、整个canvas可以用鼠标滚轮缩放，用鼠标中键拖动，缩放的同时时间轴的坐标值也会连续变化。（功能类似于CAD软件的图纸）

为了实现这个日程管理可视化软件，我们需要创建一个HTML页面，其中包含一个`<canvas>`元素，并使用JavaScript来处理用户交互（如右键点击、鼠标滚轮缩放和鼠标中键拖动）。我们将使用HTML5 Canvas API来绘制日程和时间轴。 以下是需要修改或创建的文件： 1. `index.html` - 创建HTML页面结构。 2. `style.css` - 添加样式以美化页面。 3. `script.js` - 编写JavaScript代码来处理用户交互和绘制日程。 ### 1. `index.html` ```html::d:\what_i_am_doing\Tech\Schedule_app\index.html::f00fa789-7429-4e8a-9b6f-87cbac842499 ``` ### 2. `style.css` ```css::d:\what_i_am_doing\Tech\Schedule_app\style.css::be39572a-fe50-42f1-9a26-0e343784ed8b ``` ### 3. `script.js` ```javascript::d:\what_i_am_doing\Tech\Schedule_app\script.js::dd6290a8-e2c7-4abb-a7a2-4ab08cf7c636 ``` ### 说明 1. **`index.html`**: 创建了一个基本的HTML页面结构，包含一个`<canvas>`元素和引入的CSS和JavaScript文件。 2. **`style.css`**: 添加了一些基本样式，使页面居中并为`<canvas>`添加边框。 3. **`script.js`**: - 处理用户交互，包括右键点击、鼠标滚轮缩放和鼠标中键拖动。 - 绘制时间轴和日程。 - 使用`requestAnimationFrame`进行重绘。 - 处理日程的创建和绘制。 这些代码将实现一个基本的日程管理可视化软件，满足需求中的所有功能。


# 开发笔记
## 准备工作
### 将电脑设置成开发者模式
```
start ms-settings:developers
```
## Step1:选择Flutter框架的理由

### 项目背景
本项目旨在开发一款跨平台的应用，该应用将用户自定义的信息通过多层重叠的画布进行可视化展示。用户可以通过缩放手势查看不同层次的信息，且在缩放过程中，画布的透明度和动画效果需要平滑过渡，以增强用户体验。

### 选择Flutter框架的理由

#### 1. 动画和交互效果
- **复杂动画支持**：Flutter的自绘引擎和丰富的动画库（如`Animated`组件、`Tween`、`GestureDetector`等）能够轻松实现复杂的动画效果，包括透明度变化、缩放动画、深度效果等。
- **流畅性**：Flutter的动画性能接近原生应用，能够确保动画的流畅性，尤其是在处理复杂的UI和多层画布时，表现优于React Native。

#### 2. 跨平台支持
- **多平台覆盖**：Flutter支持iOS、Android和Windows桌面端，可以实现一套代码覆盖多平台。这不仅节省了开发时间和成本，还能确保不同平台上的功能和设计保持一致。
- **Windows支持**：Flutter对Windows桌面端的支持已经相当成熟，可以很好地满足项目需求。

#### 3. 性能优势
- **高性能**：Flutter的性能接近原生应用，尤其在处理复杂的UI和动画时，表现优异。这对于确保动画的流畅性和用户体验非常重要。
- **渲染引擎**：Flutter使用自己的渲染引擎，而不是依赖WebView或原生组件，这使得它在性能和一致性方面具有优势。

#### 4. 开发效率
- **热重载**：Flutter的热重载功能非常强大，可以让你在开发过程中实时看到代码更改的效果，大大提高了开发效率。
- **丰富的组件库**：Flutter自带了一套丰富的Material Design和Cupertino组件库，可以快速搭建美观的界面。

#### 5. 社区和资源
- **社区支持**：虽然Flutter的社区规模相对React Native较小，但也在不断壮大。你可以轻松找到大量的教程、文档、开源代码和插件来帮助你解决问题。
- **官方文档**：Flutter的官方文档非常详细，是学习和开发的重要资源。

#### 6. 未来扩展性
- **Web和桌面支持**：Flutter不仅支持移动端，还支持Web和桌面端开发。这意味着你可以通过一套代码实现多平台部署，未来扩展性更强。
- **持续更新**：Flutter团队不断更新和优化框架，确保其性能和功能的提升。

### 总结
基于上述理由，Flutter框架非常适合本项目的需求。它不仅能够满足复杂的动画和交互效果，还提供了强大的跨平台支持和高性能表现。此外，Flutter的开发效率高，社区资源丰富，未来扩展性强，能够为项目的长期发展提供有力支持。
## Step2:学习dart语言和flutter框架
### dart语法
链接：[Dart 编程语言主页 | Dart 中文文档 | Dart](https://dart.cn/)
### flutter框架
链接：[开发 Android 应用 | Flutter 中文文档 - Flutter 中文开发者网站 - Flutter](https://docs.flutter.cn/get-started/install/windows/mobile#configure-a-text-editor-or-ide)

不懂的东西
1. SDK：SDK 是 Software Development Kit 的缩写，中文名为 “软件开发工具包”。它是一系列相关工具、文档、代码示例、库文件以及其他资源的集合，旨在帮助开发者更高效地开发软件应用程序，通常针对特定的操作系统、平台或编程语言。
### 遇到的问题
#### 1. 连接不上手机
是ADK环境变量的问题
#### 2. 连接上手机但是国内拉取太慢
用这两个文档的方法，修改以下的文件
`build.gradle`
```
// Top-level build file where you can add configuration options common to all sub-projects/modules.  
  
buildscript {  
    ext.kotlin_version = '1.6.21'  
    repositories {  
        // google()  
        // jcenter()        maven { url "https://www.jitpack.io"}  
        maven { url "https://maven.aliyun.com/repository/releases"}  
        maven { url "https://maven.aliyun.com/repository/google"}  
        maven { url "https://maven.aliyun.com/repository/central"}  
        maven { url "https://maven.aliyun.com/repository/gradle-plugin"}  
        maven { url "https://maven.aliyun.com/repository/public"}  
    }    dependencies {  
        classpath 'com.android.tools.build:gradle:4.1.1'  
  
  
        // NOTE: Do not place your application dependencies here; they belong  
        // in the individual module build.gradle files    }  
}  
  
allprojects {  
    repositories {  
        // google()  
        // jcenter()        maven { url "https://www.jitpack.io"}  
        maven { url "https://maven.aliyun.com/repository/releases"}  
        maven { url "https://maven.aliyun.com/repository/google"}  
        maven { url "https://maven.aliyun.com/repository/central"}  
        maven { url "https://maven.aliyun.com/repository/gradle-plugin"}  
        maven { url "https://maven.aliyun.com/repository/public"}  
    }}  
  
tasks.register("clean", Delete) {  
    delete rootProject.buildDir  
}
```
`gradle.properties`
```
org.gradle.jvmargs=-Xmx4G -XX:MaxMetaspaceSize=2G -XX:+HeapDumpOnOutOfMemoryError  
android.useAndroidX=true  
android.enableJetifier=true
```
`setting.gradal`
```
dependencyResolutionManagement {  
    repositoriesMode.set(RepositoriesMode.PREFER_PROJECT)  
    repositories {  
        // 这里可以保留空的 repositories 块，或者根据需要添加仓库  
    }  
}  
  
// 包含 app 模块  
include ':app'  
  
rootProject.name = "hello_flutter" // 根据你的项目名称修改
```
#### 3. kotlin id not found
### 不懂的东西
#### gradle和kotlin
Gradle 是一个开源的自动化构建工具。它可以用于构建、测试、部署各种软件项目，尤其是 Java 项目。Gradle 使用一种基于 Groovy 或 Kotlin 的领域特定语言（DSL）来定义构建脚本，具有高度的灵活性和可扩展性。它能够高效地管理项目的依赖关系、执行各种任务，并且可以与其他工具和技术进行集成。
## Step3 还是要用树结构+stack组件

# 延申
## 甚至可以延申成日记软件