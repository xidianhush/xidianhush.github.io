
# Git 
## 浅浅认识git存储的方式

### 例子

假设你有一个项目，里面有 3 个文件：`a.txt`、`b.txt`、`c.txt`，初始版本（v1）时三个文件都是全新的。


- **第一次提交（v1）**：  
    Git 会给这三个文件都创建完整快照并存储，此时仓库里有 `a.txt`、`b.txt`、`c.txt` 的完整内容。
    
- **第二次提交（v2）**：  
    你只修改了 `b.txt`，`a.txt` 和 `c.txt` 没动。
    
    - 如果是**重复存储**：会把 `a.txt`（未改）、`b.txt`（修改后）、`c.txt`（未改）三个文件的完整内容再存一遍，导致 `a.txt` 和 `c.txt` 被重复保存，浪费空间。
    - 而 Git 的**硬链接复用**：只会真正存储修改后的 `b.txt` 新内容，`a.txt` 和 `c.txt` 因为没变化，直接用 v1 中已有的快照（通过硬链接指向原来的存储位置），不占用新空间。
  
简单说，硬链接复用就像 “共享文件”，没改的文件直接用之前的副本；重复存储则是 “复制粘贴”，不管改没改都重新存一份，前者更高效省空间。
### git存储与物理内存的关系

所以就是在首次提交之后，真正占用新存储空间的，是后续提交中有改动的文件，对吗？

是的，你可以这么理解。

具体来说：
- 首次提交时，所有文件都是新的，因此会占用对应存储空间来保存这些文件的完整内容。
- 后续提交中，**只有被修改过的文件**会产生新的内容并占用新的存储空间。
- 未修改的文件不会重复存储，而是通过硬链接复用之前版本中已有的存储，不额外占用空间。


比如前面例子中，v1 提交后存储了 a、b、c 三个文件；v2 只修改了 b.txt，所以 v2 提交只会新增 b.txt 的新内容，a 和 c 仍用 v1 的存储，整体新增空间仅来自修改后的 b.txt。


## 个人用途常用命令
### Git 常用命令表

| 命令                          | 示例代码                                                                                                                                                            | 功能说明                                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `mkdir`                     | `mkdir learngit`                                                                                                                                                | 创建一个新的目录，例如创建 `learngit` 目录。                                                                           |
| `cd`                        | `$ cd "D:\what_i_am_doing\Tech\App_develop\basic_practise"<br>`                                                                                                 | 切换到工作目录 。                                                                                              |
| `pwd`                       | `pwd`                                                                                                                                                           | 查看当前工作路径。                                                                                              |
| `git init`                  | `git init`                                                                                                                                                      | 初始化一个新的 Git 仓库。                                                                                        |
| `git add`&`git add .`       | `git add readme.txt`                                                                                                                                            | 将文件 `readme.txt` 添加到暂存区。                                                                               |
| `git commit`                | `git commit -m "描述"`                                                                                                                                            | 提交更改到本地仓库，添加提交信息。                                                                                      |
| `git status`                | `git status`                                                                                                                                                    | 显示工作目录的状态，包括已修改和未跟踪的文件。                                                                                |
| `git log`                   | `git log`                                                                                                                                                       | 查看提交历史记录，包括提交哈希值和作者信息等。                                                                                |
| `git reflog`                | `git reflog`                                                                                                                                                    | 查看所有操作记录（包括提交、分支切换等）。                                                                                  |
| `git diff`                  | `git diff`                                                                                                                                                      | 比较工作区和暂存区的差异。                                                                                          |
| `git reset`                 | `git reset HEAD~1`                                                                                                                                              | 回滚到上一个提交，可用于撤销提交或清除暂存区更改。                                                                              |
| `git checkout -b solution1` | `git checkout -b solution1`                                                                                                                                     | 作用是创建一个新的分支并同时切换到该分支。这里我们创建了名为 `solution1` 的分支                                                         |
| `git checkout  `            | ```<br>git checkout solution1<br># 查看方案 1 的代码和运行效果<br><br>git checkout solution2<br># 查看方案 2 的代码和运行效果<br><br>git checkout solution3<br># 查看方案 3 的代码和运行效果<br>``` | 可以使用 `git checkout` 命令在不同分支之间切换，查看不同方案的代码和运行效果                                                         |
| `amend`                     | `git commit --amend -m "新的提交信息"`                                                                                                                                | 修改提交信息,补充遗漏文件                                                                                          |
| `branch`                    | <br>`git branch -m 旧分支名称 新分支名称`                                                                                                                                 | 如果你想修改的分支不是当前所在的分支，需要指定旧分支名称和新分支名称，命令如下                                                                |
| `git remote add origin`     | `git remote add origin https://github.com/xidianhush/Compulsory_lessons_code.git<br>`                                                                           | 把一个已有的本地仓库与远程库关联                                                                                       |
| `git remote add origin`     | ` git remote add origin git@github.com:xidianhush/Compulsory_lessons_code.git`                                                                                  | 把一个已有的本地仓库与远程库关联                                                                                       |
| `git push`                  | `git push -u origin 分支名`                                                                                                                                        | 把本地仓库的内容推送到GitHub仓库                                                                                    |
| `git pull`                  | `git pull origin main`                                                                                                                                          | 从 `origin` 远程仓库的 `main` 分支下载最新的提交信息，并将其合并到本地的 `main` 分支。                                               |
| `git clone`                 | `git clone git@github.com:xidianhush/ti_dsp_empty.git`                                                                                                          | 克隆远程库，==用这个命令开梯子可行==，==不行就是网络问题==                                                                      |
| `git clone`                 | `git clone https://github.com/thatSaneKid/fourier.git Fourier_Transform`                                                                                        | 从 GitHub 拉取 `thatSaneKid/fourier` 完整代码仓库，**存进当前目录下名为 `Fourier_Transform` 的文件夹**，而不是默认生成的 `fourier` 文件夹 |
| `git remote set-url`        | `git remote set-url origin git@github.com:xidianhush/hush-ob-bucket.git`                                                                                        | 切换远程库地址（https<->ssh）                                                                                   |
|                             |                                                                                                                                                                 |                                                                                                        |


## 团队协作常用命令
### 问题
#### 问题一
##### 问题
![[Pasted image 20250626094424.png]]
这个提示是说 **本地的 `master` 分支还没有对应的远程分支** ，VS Code 在问你 “要不要把这个本地 `master` 分支推送到远程仓库，创建对应的远程分支呀”，背后涉及 Git 本地分支和远程分支关联的知识，给你拆解下：

##### 方法
当本地 Git 仓库默认是 `master` 分支，而 GitHub 远程仓库默认是 `main` 分支时，有以下几种**解决思路**，可根据实际需求选择：

###### 一、让本地分支名和远程统一（推荐，符合新规范）

GitHub 等平台新仓库默认用 `main` 替代 `master` 作为主分支名，统一分支名能减少后续协作和操作的混淆。步骤如下：

1. **重命名本地 `master` 分支为 `main`**  
    打开终端，进入本地仓库目录，执行：


```bash
git branch -m master main
```

### 1. 分支关联逻辑

其实一台电脑上也是可以克隆多个版本库的，只要不在同一个目录下
## Vscode内置Git使用
### 打开之前的版本对比或参照
![[ebcbbf73cb04c6fdacbc37ab1f0af97.jpg]]
## 学习文档
文档链接：
https://liaoxuefeng.com/books/git/what-is-git/index.html
# GitHub
## Github基础个人配置
### 用户名何显示名称
![[Pasted image 20250626104551.png|221]]
#### `xidianhush`

这是 **GitHub 账号的用户名（Login）** ，是用户在 GitHub 系统里唯一的身份标识，用于登录、仓库地址路径（比如 `https://github.com/xidianhush/xxx` ）等，其他人通过这个用户名可以找到对应的 GitHub 主页 。

#### `Dage He`

这是 **该账号设置的显示名称（Name）** ，GitHub 允许用户在个人资料中自定义一个对外展示的名字，和登录用的用户名区分开，方便让他人更直观识别账号归属者，你可以理解成类似 “昵称” 或 “真实姓名展示” ，属于个性化的显示内容，可在个人资料编辑里修改 。
## Github和Github Page
### 区别

•  GitHub 是一个全面的代码托管和协作平台，主要用于开发和管理项目。
•  GitHub Pages 是 GitHub 提供的静态网站托管服务，用于==将代码仓库中的内容部署为网站==。
简单来说，GitHub 是“后台”，用于开发和管理代码；GitHub Pages 是“前台”，用于展示内容。
### 查看仓库中代码部署成网站的效果
点击这个链接
![[Pasted image 20250220151615.png]]

# 团队合作步骤
1. 先建立一个远程库
2. 分别从远程库克隆(用vscode)![[Pasted image 20250626105356.png]]

# 使用时遇到的报错总结

1. 在uid华丽： https://www.doubao.com/thread/w9f1ffcf486e19b46
2. 部署网页报错: https://www.doubao.com/thread/w80e8d19da2938112
3. 网络连接不上，代理问题： [【完美解决】GitHub连接超时问题 Recv failure: Connection was reset-CSDN博客](https://blog.csdn.net/weixin_44223180/article/details/133059575)

报错信息
```bash
PS D:\what_i_am_doing\Compulsory_lessons\LTI_analysis\Fourier_Transform\Fourier_Transform> git push -u origin main
fatal: unable to access 'https://github.com/xidianhush/Fourier_Series_and_Fourier_Transform_Visualization.git/': Recv failure: Connection was aborted
```

补充：更换代理软件可能还需要重新配置git代理ip端口
https://chatgpt.com/s/t_6a9934745d9081918265e7e37222857e、
4. 网络SSL的问题

```bash
PS C:\Users\29144\Desktop\painting\frontend> git push origin feat/v3-deca-mesh
fatal: unable to access 'https://github.com/xidianhush/Face_Painting_by_Math_Lab.git/': OpenSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443 
```
