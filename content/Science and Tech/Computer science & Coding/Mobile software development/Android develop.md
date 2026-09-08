
# Gradle
<mark style="background: #ABF7F7A6;">Gradle 是一个强大的开源构建自动化工具</mark>，广泛应用于软件开发领域，尤其在 Java、Kotlin、Android 等项目的构建中使用频繁，以下为你详细介绍它的用途和功能：

### 主要用途


  

- **项目构建**：Gradle 能够将项目源代码编译成可执行文件、库文件或者其他分发格式。以 Java 项目为例，它可以把 Java 源代码（`.java` 文件）编译成字节码文件（`.class` 文件），并打包成 JAR 文件。
- **依赖管理**：在现代软件开发中，项目往往依赖大量的第三方库。Gradle 可以帮助开发者自动下载和管理这些依赖项。例如，在开发一个 Spring Boot 项目时，你只需要在配置文件中声明对 Spring 框架、数据库驱动等依赖，Gradle 就会从 Maven 中央仓库等远程仓库下载这些依赖到本地，并在项目中正确配置和使用。

### 具体功能

  

- **灵活的配置**：Gradle 使用基于 Groovy 或 Kotlin 的领域特定语言（DSL）来编写构建脚本，开发者可以根据项目的具体需求灵活定制构建过程。例如，你可以自定义编译任务、打包任务、测试任务等，还可以配置不同的构建环境，如开发环境、测试环境和生产环境。
- **多项目构建支持**：对于大型项目，通常会拆分成多个子项目进行开发和管理。Gradle 支持多项目构建，可以方便地管理和协调各个子项目之间的依赖关系和构建顺序。比如一个大型的企业级应用可能包含多个模块，每个模块都是一个独立的子项目，Gradle 可以确保这些子项目按照正确的顺序进行构建和集成。
- **任务自动化**：Gradle 允许开发者定义各种任务，并可以将这些任务组合和自动化执行。例如，你可以定义一个任务，在每次代码提交前自动运行单元测试、代码检查等操作，确保代码质量。还可以定义一个发布任务，将项目打包并上传到指定的仓库。
- **增量构建**：Gradle 具有智能的增量构建功能，它会记录项目文件的变化，只对发生变化的部分进行重新构建，大大提高了构建效率。比如在一个大型项目中，你只修改了一个 Java 文件，Gradle 只会重新编译这个文件以及受其影响的其他文件，而不会重新编译整个项目。

# 遇到的问题&解决方法
## 1. 问题：gradle版本过低

```bash
Plugin (AGP) versions less than 8.2.1, │ │ when │ │ 1. setting a value for SourceCompatibility and │ │ 2. using Java 21 or above. │ │ To fix this error, please upgrade your AGP version to at least 8.2.1. The version of AGP that │ │ your project uses is likely defined in: │ │ D:\what_i_am_doing\Tech\App_develop\todolist_practise2\android\settings.gradle, │ │ in the 'plugins' closure (by the number following "com.android.application"). │ │ Alternatively, if your project was created with an older version of the templates, it is likely │ │ in the buildscript.dependencies closure of the top-level build.gradle: │ │ D:\what_i_am_doing\Tech\App_develop\todolist_practise2\android\build.gradle, │ │ as the number following "com.android.tools.build:gradle:".
```
## 2. 方法：在setting.gardle里更新安卓包

从报错信息可知，这是因为使用了低于 8.2.1 版本的 Android Gradle Plugin（AGP），同时设置了 `SourceCompatibility` 并且使用了 Java 21 或更高版本，导致出现了已知的 bug。下面为你详细介绍解决该问题的步骤：

### 方法一：升级 Android Gradle Plugin 到至少 8.2.1 版本

#### 情况 1：在 `settings.gradle` 中定义 AGP 版本

  

若 AGP 版本是在 `settings.gradle` 文件里的 `plugins` 闭包中定义的，你需要进行如下修改：

1. 打开 `D:\what_i_am_doing\Tech\App_develop\todolist_practise2\android\settings.gradle` 文件。
2. 找到类似如下的代码：

```groovy
pluginManagement {
    repositories {
        gradlePluginPortal()
        google()
        mavenCentral()
    }
    plugins {
        id 'com.android.application' version '旧版本号' apply false
        id 'com.android.library' version '旧版本号' apply false
    }
}
```

下面这段代码忘了干嘛的：
```bash
Got dependencies in `..\todolist_practise2`.
Wrote 130 files.

All done!
You can find general documentation for Flutter at: https://docs.flutter.dev/
Detailed API documentation is available at: https://api.flutter.dev/
If you prefer video documentation, consider: https://www.youtube.com/c/flutterdev

In order to run your application, type:

  $ cd ..\todolist_practise2
  $ flutter run

Your application code is in ..\todolist_practise2\lib\main.dart.

The configured version of Java detected may conflict with the Gradle version in your new Flutter app.

To keep the default AGP version Gradle version 8.3, download a compatible Java version
(Java 17 <= (Java 17 <= compatible Java version < Java 21) Java version < Java 21). Configure this Java version
globally for Flutter by running:

  flutter config --jdk-dir=<JDK_DIRECTORY>


Alternatively, to continue using your configured Java version, update the Gradle
version specified in the following file to a compatible Gradle version (compatible Gradle version range: 8.4 - 8.7):
D:\what_i_am_doing\Tech\App_develop\todolist_practise2\android/gradle/wrapper/gradle-wrapper.properties

You may also update the Gradle version used by running
`./gradlew wrapper --gradle-version=<COMPATIBLE_GRADLE_VERSION>`.

See
https://docs.gradle.org/current/userguide/compatibility.html#java for details
on compatible Java/Gradle versions, and see
https://docs.gradle.org/current/userguide/gradle_wrapper.html#sec:upgrading_wrapper
for more details on using the Gradle Wrapper command to update the Gradle version
used.



PS D:\what_i_am_doing\Tech\App_develop\todolist_practise> 

```

## 2. 问题：下载依赖太慢然后失败
## 2. 方法：挂上梯子，关掉vscode然后重新打开