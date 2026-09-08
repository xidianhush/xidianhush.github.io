+ 量子力学
	1. 波粒二象性（哪几个实验反应波粒二象性）
	2. 氢原子光谱
	3. [x] 几率波，为什么原来牛顿力学的rp搞不定，这个搞不定那该怎么搞定？ ✅ 2025-01-07
	4. [x] 归一化 ✅ 2025-01-07
	5. [x] 薛定谔方程 ✅ 2025-01-09
	6. 微观粒子S方程
	7. 定态薛定谔方程应用
	8. 主量子数、角量子数说清楚
	9. [x] 粒子流定义 ✅ 2025-01-09
	10. [ ] 力学量，ppt证明：厄米算符。。。为什么力学量用算符表示？
	11. 力学量与算符的关系，有两句话要背一下
	12. 态叠加原理
	13. [x] 记住测不准原理的结论 ✅ 2025-01-09
	14. [x] 两个算符的对易，要会推导 ✅ 2025-01-09
	15. 角量子数、磁量子数
	16. [x] 表象理论，老师说数学基础不用关了 ✅ 2025-01-09
	17. [x] 为什么态和力学量能写成矩阵形式 ✅ 2025-01-09
	18. 力学量变换、态变换，魔怔变换
	19. 非简并定态啥的，推到什么一阶
	20. 硅晶体全能带结构，三种括号区分
	21. 什么解释能带怎么导电那个
	22. 费米电子分布函数要会写
+ 固体物理
	1. 解释能级变能带
	2. 共有化运动
	3. 正格矢量
	4. 描述硅单晶的晶体结构
	5. 全同性原理
	6. 泡利不相容原理

首先量子力学采取了什么样的数学工具
05:00
来充当这个描述
05:03
其二这种描述与现实之间的关系是怎样的
05:08
它并不再像是牛顿力学那样基于经验的连接
05:13
比如说一个物体在哪里
05:15
速度是怎么样的
05:17
而是一种非常抽象的基于概率的联系
05:22
第三我们会向大家介绍这种数学描述之间
05:28
究竟是用什么样的方式连接起来的
05:31
我们是通过什么方式
05:33
通过这些数学描述的间接手段
05:36
来间接地预测未来的情况的啊
# 量子力学中的常用数学符号

## 1. 态矢量与态空间
- **态矢量**：  
  量子态通常表示为 $\ket{\psi}$，也叫“态向量”，是系统在希尔伯特空间中的表示。  
- **对偶态**：  
  $\bra{\phi}$ 是 $\ket{\phi}$ 的对偶态，表示态向量在对偶空间中的线性映射。  
- **内积**：  
  $\braket{\phi|\psi}$ 表示 $\bra{\phi}$ 和 $\ket{\psi}$ 的内积，常用来衡量两个态的重叠程度。 其中$\langle\varphi|\psi\rangle = \int \varphi^*(x)\psi(x)dx$。其中$\varphi^*(x)$是$\varphi(x)$的复共轭。
- **基态**：  
  $\ket{n}$ 是系统的能量本征态，例如 $\ket{0}$ 常表示基态。  
- **希尔伯特空间**：  
  $\mathcal{H}$ 是态矢量的全集，在量子力学中表示所有可能的态。

## 2. 算符
- **算符表示**：  
  一般用 $\hat{A}$ 表示算符，例如哈密顿量算符 $\hat{H}$ 或动量算符 $\hat{p}$。  
- **位置算符**：  
  $\hat{x}$ 用来表示位置算符。  
- **产生与湮灭算符**：  
  $\hat{a}^\dagger$ 是产生算符，$\hat{a}$ 是湮灭算符，广泛用于量子谐振子或量子场论。  
- **时间演化算符**：  
  $\hat{U}(t) = e^{-i\hat{H}t / \hbar}$，表示系统随时间的演化。

## 3. 本征值与本征方程
- **哈密顿方程**：  
  $\hat{H}\ket{\psi} = E\ket{\psi}$，其中 $E$ 是哈密顿量的本征值（能量）。  
- **一般算符本征方程**：  
  $\hat{A}\ket{\psi} = a\ket{\psi}$，其中 $a$ 是算符 $\hat{A}$ 的本征值。

## 4. 普朗克常数
- **简约普朗克常数**：  
  $\hbar = \frac{h}{2\pi}$，常用于公式中，例如薛定谔方程。

## 5. 态演化与薛定谔方程
- **时间演化方程**：  
  $i\hbar \frac{\partial}{\partial t} \ket{\psi} = \hat{H}\ket{\psi}$，描述量子态随时间的变化。  
- **定态薛定谔方程**：  
  $\hat{H}\ket{\psi} = E\ket{\psi}$，是时间独立的薛定谔方程。

## 6. 测量与投影算符
- **投影算符**：  
  $\hat{P} = \ket{\phi}\bra{\phi}$，用于描述量子测量时的投影过程。  
- **测量几率**：  
  测量态 $\ket{\phi}$ 的概率为 $|\braket{\phi|\psi}|^2$。

## 7. 其他常见符号
- **玻恩概率解释**：  
  $\rho(x, t) = |\psi(x, t)|^2$，描述粒子在某点的概率密度。  
- **对易关系**：  
  $[\hat{x}, \hat{p}] = i\hbar$，是位置算符和动量算符的对易关系。

# 位置算符的无限维矩阵表示

## 位置算符的矩阵表示概述
- **位置算符** $\hat{x}$ 可以理解为一个“无限维矩阵”，但严格来说，它是一个算符，在连续基下需要用积分来描述。
- 在连续基中，“矩阵元”不再是离散的数，而是与位置变量相关的分布函数。

---

## 离散基与矩阵表示
- 在有限或离散基下，算符可以表示为矩阵：
  $$
  (\hat{x})_{ij} = \langle i | \hat{x} | j \rangle,
  $$
  其中 $|i\rangle, |j\rangle$ 是离散基。

- 在离散无限维空间中（如谐振子基态和激发态），位置算符对应的矩阵是无限维的。

---

## 连续基下的位置算符
在位置基 $|x\rangle$ 下，位置算符的矩阵元为：
$$
\langle x | \hat{x} | x' \rangle = x' \delta(x - x'),
$$
其中：
- $x'$ 是位置基的特征值（对应的位置坐标）。
- $\delta(x - x')$ 是狄拉克 delta 函数，反映位置基的正交性。

---

## 矩阵运算的积分形式
在连续基下，矩阵运算通过积分实现：
$$
(\hat{A} \psi)(x) = \int_{-\infty}^\infty \langle x | \hat{A} | x' \rangle \psi(x') dx'.
$$
对于位置算符 $\hat{x}$，有：
$$
(\hat{x} \psi)(x) = \int_{-\infty}^\infty x' \delta(x - x') \psi(x') dx' = x \psi(x).
$$
因此，位置算符 $\hat{x}$ 的作用可以看作是对波函数的简单乘法。

---

## 对角化的无限维矩阵
- 在位置基 $|x\rangle$ 表象下，位置算符 $\hat{x}$ 表现为一个“对角矩阵”：
  $$
  \hat{x} \sim \text{diag}(x),
  $$
  但这个对角矩阵是无限维的，对角元素是连续变量 $x$。

---

## 总结
- 位置算符 $\hat{x}$ 在连续基下的“矩阵表示”为：
  $$
  \langle x | \hat{x} | x' \rangle = x' \delta(x - x').
  $$
- 它在连续基下表现为一个无限维的对角化结构，其中积分代替了有限维矩阵中的求和。
- 位置算符的作用本质上是对波函数乘以对应的位置坐标。

# 微扰理论笔记

## 非简并微扰理论

### 一阶修正
给定哈密顿量：
$$
H = H_0 + \lambda H',
$$
其中 $H_0$ 是未微扰哈密顿量，$H'$ 是微扰项，$\lambda$ 是微扰参数。

#### 一阶能量修正公式：
$$
E_n^{(1)} = \langle \phi_n | H' | \phi_n \rangle,
$$
其中 $| \phi_n \rangle$ 是 $H_0$ 的本征态。

#### 一阶本征态修正公式：
$$
| \psi_n^{(1)} \rangle = \sum_{m \neq n} \frac{\langle \phi_m | H' | \phi_n \rangle}{E_n^{(0)} - E_m^{(0)}} | \phi_m \rangle.
$$

---

### 二阶修正
#### 二阶能量修正公式：
$$
E_n^{(2)} = \sum_{m \neq n} \frac{|\langle \phi_m | H' | \phi_n \rangle|^2}{E_n^{(0)} - E_m^{(0)}}.
$$

---

## 简并微扰理论

### 特点
当 $H_0$ 的某些本征值是简并时（即 $E_n^{(0)} = E_m^{(0)}$ 对某些 $n, m$ 成立），上述非简并微扰公式不再适用。

#### 处理方法：
1. **构造微扰作用下的哈密顿矩阵**：  
   在简并子空间内，构造矩阵：
   $$
   W_{ij} = \langle \phi_i | H' | \phi_j \rangle,
   $$
   其中 $| \phi_i \rangle, | \phi_j \rangle$ 是简并子空间的基。

2. **求解矩阵的本征值和本征向量**：  
   - 本征值 $w_k$ 是简并态能量的一阶修正。  
   - 对应的本征向量给出了微扰后简并态的新基。

---

### 二阶修正
#### 二阶能量修正公式（简并情形）：
对于简并态的二阶修正公式需要考虑到简并外态：
$$
E_n^{(2)} = \sum_{m \notin \text{简并子空间}} \frac{|\langle \phi_m | H' | \psi_n \rangle|^2}{E_n^{(0)} - E_m^{(0)}}.
$$

---

### 备注
- **非简并情况下**直接使用公式逐项计算。  
- **简并情况下**需要先在简并子空间内处理微扰哈密顿量，再计算高阶修正。

# 利用微扰理论求矩阵本征值

## 题目
对于矩阵：
$$
A = 
\begin{pmatrix}
1 & 2\lambda & 0 \\
2\lambda & 2 + \lambda & 3\lambda \\
0 & 3\lambda & 3 + 2\lambda
\end{pmatrix},
$$
当 $\lambda$ 是小量时，利用微扰理论求其本征值至 $\lambda$ 的一次项。

---

## 解题过程

### 1. 矩阵分解
将矩阵 $A$ 分解为：
$$
A = A_0 + \lambda A_1,
$$
其中：
$$
A_0 = 
\begin{pmatrix}
1 & 0 & 0 \\
0 & 2 & 0 \\
0 & 0 & 3
\end{pmatrix}, \quad
A_1 =
\begin{pmatrix}
0 & 2 & 0 \\
2 & 1 & 3 \\
0 & 3 & 2
\end{pmatrix}.
$$

---

### 2. 未扰动本征值与本征态
矩阵 $A_0$ 是对角矩阵，其本征值为 $1, 2, 3$，对应的本征态分别为：
$$
|u_1\rangle = 
\begin{pmatrix}
1 \\ 0 \\ 0
\end{pmatrix}, \quad
|u_2\rangle = 
\begin{pmatrix}
0 \\ 1 \\ 0
\end{pmatrix}, \quad
|u_3\rangle = 
\begin{pmatrix}
0 \\ 0 \\ 1
\end{pmatrix}.
$$

---

### 3. 一阶修正的本征值
根据非简并微扰理论，一阶本征值修正为：
$$
\Delta E_n^{(1)} = \langle u_n | A_1 | u_n \rangle.
$$

- 对于 $n = 1$：
$$
\Delta E_1^{(1)} = \langle u_1 | A_1 | u_1 \rangle = 0.
$$

- 对于 $n = 2$：
$$
\Delta E_2^{(1)} = \langle u_2 | A_1 | u_2 \rangle = 1.
$$

- 对于 $n = 3$：
$$
\Delta E_3^{(1)} = \langle u_3 | A_1 | u_3 \rangle = 2.
$$

---

### 4. 本征值结果
矩阵 $A$ 的本征值至 $\lambda$ 的一次项为：
$$
\lambda_1 = 1, \quad 
\lambda_2 = 2 + \lambda, \quad 
\lambda_3 = 3 + 2\lambda.
$$
答案为：$\boxed{1, \ 2 + \lambda, \ 3 + 2\lambda.}$


---

## 最终答案
矩阵的本征值为：
$$
\boxed{1, \ 2 + \lambda, \ 3 + 2\lambda.}
$$

# Hamilton矩阵的一阶能级近似

## 题目
有一粒子，其 Hamilton 量的矩阵形式为：
$$
H = 
\begin{pmatrix}
2 & 0 & a \\
0 & 2 & 0 \\
a & 0 & 2
\end{pmatrix},
$$
其中 $a \ll 1$。求能级的一阶近似。

---

## 解答

### 1. 分解矩阵
将 $H$ 分解为未扰动项 $H_0$ 和微扰项 $H_1$：
$$
H = H_0 + H_1,
$$
其中：
$$
H_0 =
\begin{pmatrix}
2 & 0 & 0 \\
0 & 2 & 0 \\
0 & 0 & 2
\end{pmatrix}, \quad
H_1 =
\begin{pmatrix}
0 & 0 & a \\
0 & 0 & 0 \\
a & 0 & 0
\end{pmatrix}.
$$

---

### 2. 未扰动能级和本征态
$H_0$ 是对角矩阵，其本征值为 $2, 2, 2$，即三个简并能级。  
对应的本征态为标准基向量：
$$
|u_1\rangle =
\begin{pmatrix}
1 \\ 0 \\ 0
\end{pmatrix}, \quad
|u_2\rangle =
\begin{pmatrix}
0 \\ 1 \\ 0
\end{pmatrix}, \quad
|u_3\rangle =
\begin{pmatrix}
0 \\ 0 \\ 1
\end{pmatrix}.
$$

---

### 3. 微扰修正
对于简并态，需对 $H_1$ 在简并子空间上进行矩阵表示：
$$
H_1^{(deg)} =
\begin{pmatrix}
\langle u_1 | H_1 | u_1 \rangle & \langle u_1 | H_1 | u_2 \rangle & \langle u_1 | H_1 | u_3 \rangle \\
\langle u_2 | H_1 | u_1 \rangle & \langle u_2 | H_1 | u_2 \rangle & \langle u_2 | H_1 | u_3 \rangle \\
\langle u_3 | H_1 | u_1 \rangle & \langle u_3 | H_1 | u_2 \rangle & \langle u_3 | H_1 | u_3 \rangle
\end{pmatrix}.
$$

计算各矩阵元素：
- $\langle u_1 | H_1 | u_1 \rangle = 0$；
- $\langle u_1 | H_1 | u_2 \rangle = 0$；
- $\langle u_1 | H_1 | u_3 \rangle = a$；
- $\langle u_2 | H_1 | u_2 \rangle = 0$；
- $\langle u_2 | H_1 | u_3 \rangle = 0$；
- $\langle u_3 | H_1 | u_3 \rangle = 0$。

因此：
$$
H_1^{(deg)} =
\begin{pmatrix}
0 & 0 & a \\
0 & 0 & 0 \\
a & 0 & 0
\end{pmatrix}.
$$

---

### 4. 简并子空间的能级修正
求解 $H_1^{(deg)}$ 的本征值：
$$
\det
\begin{pmatrix}
-\lambda & 0 & a \\
0 & -\lambda & 0 \\
a & 0 & -\lambda
\end{pmatrix}
= -\lambda \left[ \lambda^2 - a^2 \right] = 0.
$$

解得本征值为：
$$
\lambda_1 = 0, \quad \lambda_2 = a, \quad \lambda_3 = -a.
$$

对应的总能级为：
$$
E_1 = 2, \quad E_2 = 2 + a, \quad E_3 = 2 - a.
$$

---

## 答案
能级的一阶近似为：
$$
\boxed{2, \ 2 + a, \ 2 - a.}
$$

如何从德布罗意关系推导出自由粒子的波函数

  

从德布罗意关系推导自由粒子的波函数，可以遵循以下步骤：

  

1. **德布罗意关系**：根据德布罗意假设，粒子的波长 $$\lambda$$ 与动量 $$p$$ 之间的关系为：

$$

\lambda = \frac{h}{p}

$$

其中 $$h$$ 是普朗克常数。

  

2. **动量与波数**：动量也可以表示为：

$$

p = \hbar k

$$

其中 $$\hbar = \frac{h}{2\pi}$$ 是约化普朗克常数，$$k$$ 是波数。

  

3. **频率与能量**：粒子的频率 $$\nu$$ 与能量 $$E$$ 的关系为：

$$

E = h\nu

$$

将频率表达为波数和时间的函数：

$$

\nu = \frac{\omega}{2\pi}

$$

  

4. **波函数形式**：自由粒子的波函数可以表示为平面波形式：

$$

\Psi(x, t) = A e^{i(kx - \omega t)}

$$

其中，$$A$$ 是常数。

  

5. **结合德布罗意关系**：将 $$k$$ 和 $$\omega$$ 用动量和能量替换：

- $$k = \frac{p}{\hbar}$$

- $$\omega = \frac{E}{\hbar}$$

  

6. **最终波函数**：因此，自由粒子的波函数可以写成：

$$

\Psi(x, t) = A e^{-\frac{i}{\hbar}(Et - px)}

$$

  

这个表达式描述了自由粒子的波动性质，体现了其波粒二象性。

$$

H \psi(\mathbf{r}) = E \psi(\mathbf{r})

$$

# 希尔伯特空间和狄拉克记号
## 理解希尔伯特空间

我们说对于一个物理系统来说
它有很多种不同的情况
比如说你扔出去一个小球
它可能在朝上飞
可能在朝下飞
在牛顿力学当中
我们使用速度或者加速度的数值
来表示这些东西
但是在量子力学当中
我们直接使用不同的量子态
也就是不同的数学对象来描述不同的状态
那么显而易见的
对于同一个物理系统来说
它可以找到很多不同的状态
比如说小球在向上飞
过一会儿
它又向下飞了
那么所有这些状态的集合
被称为一个一个希尔伯特空间

记作H希尔伯特空间是一个线性空间
# 观测&哥本哈根诠释
可以简单的把每一个量子态
想象成一个线性空间当中的向量来理解
那么这样的抽象的数学概念
是怎样与现实的物理系统联系在一起的呢
在量子力学当中
这是通过观测measurement来实现的

在这里我们就需要引入量子力学中
可观测量 <mark style="background: #ABF7F7A6;">observable</mark>

## 可观测量(observable)
### 算符的特征值月特征向量
如果一个operator作用在一个量子态$\psi$上
它刚好就等于一个数字乘以这个$\psi$本身
我们就把这个特殊的量子态$\psi$
称为该算子的离子状态特征态
而这个对应的数字C就被称为对应的eigenvalue
### 可观测量定义
在量子力学当中
每一个实际可以被观测的物理量(位置、动量、自旋)
都对应了希尔伯特空间当中的一个observable

+ 可观测量是啥：可观测量是厄米算符（Hermitian Operator）
+ 厄米算符（Hermitian Operator）是啥：如果一个Operator的Hermitian conjugate (共轭转置) 是它自己。那这个Operator 就是 Hermitian Operator。
+ 可观测量，厄米算符的性质：
	+ 特征值一定是一个实数
	+ 他刚好会在N维的希尔伯特空间当中，有N个本征态
	+ 而这个N个本征态刚好可以构成一组正交基，在这个希尔伯特空间当中$\psi$都可以写作这一组正交基的线性组合 $\ket{\psi}=\Sigma c_{n}\ket{\psi_{n}}$。
## 哥本哈根诠释
### 观测物理量的方法

1. 可以找到这个observable的N个eigenstate $\ket{\psi_{n}}$他们都有它们对应的特征值记作$\lambda_{1},\lambda_{2},\dots \lambda_{n}$

2. 你要把这个给你的量子态$\ket{\psi}$ 正交分解到这一组eigenstate $\ket{\psi_{n}}$组成的正交基上: $\ket{\psi}=\Sigma c_{n}\ket{\psi_{n}}$.它们的分解系数是$c_{1},c_{2\dots }c_{n}$等等。这样的正交分解总是可以进行的因为这个 observable 对应于 N 个目标态，正好组成一组正交基
3. 如果你观测这个observable x的值，你会得到N种不同的值：它们分别是从$\lambda_{1}\to \lambda_{n}$这<mark style="background: #ADCCFFA6;">N个Ieigenvalue</mark>，它们都有可能成为你观测出来的值。
4. 而且你观测到它们的概率也是给定的。它恰好等于你把这个量子态$\ket{\psi}$分解到这样一组正交基上的时候的。分解系数模长的平方。![[Pasted image 20250222104546.png]]
# 波函数$\psi(x)$

我们之前讲的希尔伯特空间都是有限维度的
比如说自旋的空间
我们发现它是二维的
因为它的正交基是由向上和向下两个量子态构成的

那么无限维的希尔伯特空间是什么样的呢
我们来考虑一个observable位置
我们说过
每个observable的eigenstate
都组成一组希尔伯特空间的正交基
而在位置这个observable上
很明显
观测的结果可能是任何一个位置可能存在的值
所以eigenvalue
也就是可能的观测结果有无限多个

比如对于一个一维的世界
一个粒子可以存在于数轴上的任何一个位置

所以任何一个值都是位置这个observable的eigenvalue
而每一个eigenvalue又对应了一个eigenstate
所以这个希尔伯特空间有无限个eigenstate组成的正交基
因此它也是无限维的
我们将每一个这样的eigenvalue记作x
请注意这里的X是一个数字
它上面没有那个小帽子
而我们将它对应的eigenstate记作$\ket{x}$
请注意
因为$x$是连续的
所以我们有无限个这样的eigenvalue和对应的eigenstate

那么这种无限维的希尔伯特空间
我们怎么处理呢
平时我们可以把任何一个量子态正交分解
分解的时候
我们是使用这种系数乘以基向量
然后再相加的状态
那么现在由于每一个基向量它们是连续的
我们需要首先使用积分这种方式
$$

\begin{align*}
|\psi\rangle&=\int_{a}^{b}\psi(x)|x\rangle dx
\end{align*}

$$
这里$\psi (x)$就是波函数
## 理解态矢量和波函数的关系
### 理解方法1

就是量子态$\ket{\psi}$是一个<mark style="background: #ADCCFFA6;">一列无限行</mark>的<mark style="background: #ADCCFFA6;">列向量</mark>
而波函数$\Psi(x)$是一个<mark style="background: #ADCCFFA6;">连续的复数函数</mark>
所以可以用波函数中<mark style="background: #ADCCFFA6;">连续无限个函数值</mark>
去代表量子态$\ket{\psi}$这个一列无限行的列向量中<mark style="background: #ADCCFFA6;">无限多个元素
</mark>
![[66499067baad6eb5d58d47b9853629c.jpg|300]]
### 理解方法2（通过将量子态正交分解到基向量上）
反正一个的算符的N个本征态可以构成一组正交基了

+ 离散情况：
![[08609e04ab3934bf99caf7615aeb57b.jpg|425]]

+ 连续情况：
![[b99af55ac89e25c1f2b1278438ef9dc.jpg|425]]



## 引入波函数的哥本哈根诠释
#### 以一维位置算符为例
1. 如果你观测这个observable x的值，你会得到无限种不同的值：它们分别是从$a\to b$中所有的$x$，它们都有可能成为你观测出来的值。
2. 而且你观测到它们的概率也是给定的。它恰好等于你把这个量子态$\ket{\psi}$分解到这样一组正交基上的时候的。分解系数模长的平方。
某粒子在位置$x$出现的概率为：
$$
\begin{align*} P(x)&=|\psi(x)dx|^{2} \end{align*}
$$

写成概率密度形式：
$$
f(x)=|\psi(x)|^{2}
$$

# 薛定谔方程
## 薛定谔方程的形式
## 定态薛定谔方程的解
### 对自由电子$V(\mathbf{r})=0$
####  一维
图中的方程是一维自由粒子的定态薛定谔方程，以下是求解步骤：

1. 对方程进行变形

已知方程  
$$-\frac{\hbar^{2}}{2m_{0}}\cdot\frac{d^{2}\Psi(x)}{dx^{2}} = E\Psi(x)$$  
设 $k^{2}=\frac{2m_{0}E}{\hbar^{2}}$ （这里 $k$ 为波数），将方程两边同时乘以 $-\frac{2m_{0}}{\hbar^{2}}$，得到二阶常系数线性齐次微分方程：  
$$\frac{d^{2}\Psi(x)}{dx^{2}}+k^{2}\Psi(x)=0$$

通解  
$$\Psi(x)=C_1\cos(kx)+C_2\sin(kx)$$  

2. 欧拉公式与三角函数形式解的变换

根据欧拉公式：  
$$e^{i\theta}=\cos\theta + i\sin\theta$$  
$$e^{-i\theta}=\cos\theta - i\sin\theta$$  $$\cos(kx)=\frac{e^{ikx}+e^{-ikx}}{2}$$
$$\sin(kx)=\frac{e^{ikx}-e^{-ikx}}{2i}$$
得到：  
$$\Psi(x)=C_1\cdot\frac{e^{ikx}+e^{-ikx}}{2}+C_2\cdot\frac{e^{ikx}-e^{-ikx}}{2i}$$  
$$=\left(\frac{C_1}{2}+\frac{C_2}{2i}\right)e^{ikx}+\left(\frac{C_1}{2}-\frac{C_2}{2i}\right)e^{-ikx}$$  
3. 重新定义常数并得到指数形式解

令：  
$$A = \frac{C_1}{2}+\frac{C_2}{2i}$$  
$$B=\frac{C_1}{2}-\frac{C_2}{2i}$$  

则通解可写为：  
$$\Psi(x)=Ae^{ikx}+Be^{-ikx}$$  
在描述沿 $x$ 正方向传播的自由粒子时，通常只考虑 $Ae^{ikx}$ 这一项，就得到了指数形式的解。
  

#### 三维

三维情况下的==定态薛定谔方程==为：$$-\frac{\hbar^{2}}{2m}\nabla^{2}\psi(\mathbf{r}) + V(\mathbf{r})\psi(\mathbf{r}) = E\psi(\mathbf{r})$$其中$\nabla^{2}=\frac{\partial^{2}}{\partial x^{2}}+\frac{\partial^{2}}{\partial y^{2}}+\frac{\partial^{2}}{\partial z^{2}}$是拉普拉斯算符，$\mathbf{r}=(x,y,z)$，$\psi(\mathbf{r})$是波函数，$V(\mathbf{r})$是势能函数，$E$是能量本征值，$m$是粒子质量，$\hbar$是约化普朗克常数。

先摆出求解结果：
$$
\psi(\mathbf{r})=Ce^{k_{x}x+k_{y}y+k_{z}z}
$$

$$
\psi(\mathbf{r})=Ce^{\mathbf{k}\cdot \mathbf{r}}
$$

求解方法：


1. ==**变量分离**==：假设波函数$\psi(\mathbf{r})=\psi(x,y,z)=X(x)Y(y)Z(z)$，代入薛定谔方程$$-\frac{\hbar^{2}}{2m}\nabla^{2}\psi(\mathbf{r})=E\psi(\mathbf{r})$$可得$$-\frac{\hbar^{2}}{2m}\left(\frac{1}{X}\frac{d^{2}X}{dx^{2}}+\frac{1}{Y}\frac{d^{2}Y}{dy^{2}}+\frac{1}{Z}\frac{d^{2}Z}{dz^{2}}\right)=E$$令$-\frac{\hbar^{2}}{2m}\frac{1}{X}\frac{d^{2}X}{dx^{2}} = E_x$，$-\frac{\hbar^{2}}{2m}\frac{1}{Y}\frac{d^{2}Y}{dy^{2}} = E_y$，$-\frac{\hbar^{2}}{2m}\frac{1}{Z}\frac{d^{2}Z}{dz^{2}} = E_z$，且$E = E_x+E_y + E_z$。
2. **求解常微分方程**：对于$-\frac{\hbar^{2}}{2m}\frac{d^{2}X}{dx^{2}} = E_xX$，设$k_x^{2}=\frac{2mE_x}{\hbar^{2}}$，其解为$X(x)=A_xe^{ik_x x}+B_xe^{-ik_x x}$。同理，$Y(y)=A_ye^{ik_y y}+B_ye^{-ik_y y}$，$Z(z)=A_ze^{ik_z z}+B_ze^{-ik_z z}$。
3. **得到波函数**：三维自由粒子波函数$\psi(\mathbf{r})=(A_xe^{ik_x x}+B_xe^{-ik_x x})(A_ye^{ik_y y}+B_ye^{-ik_y y})(A_ze^{ik_z z}+B_ze^{-ik_z z})$，也可写成$\psi(\mathbf{r}) = C e^{i\mathbf{k}\cdot\mathbf{r}}$的形式。其中$\mathbf{k}=(k_x,k_y,k_z)$是波矢，$\mathbf{k}\cdot\mathbf{r}=k_x x + k_y y + k_z z$，能量$E=\frac{\hbar^{2}k^{2}}{2m}$，$k = |\mathbf{k}|=\sqrt{k_x^{2}+k_y^{2}+k_z^{2}}$。

假设$B_x = B_y = B_z = 0$主要是为了使波函数$\psi(\vec{r})=(A_{x}e^{ik_{x}x}+B_{x}e^{-ik_{x}x})(A_{y}e^{ik_{y}y}+B_{y}e^{-ik_{y}y})(A_{z}e^{ik_{z}z}+B_{z}e^{-ik_{z}z})$能简化为$\psi(\vec{r}) = Ce^{i\vec{k}\cdot\vec{r}}$的形式，具体原因如下：

- **符合特定条件下的波函数形式**：$B_x = B_y = B_z = 0$时，$\psi(\vec{r})=(A_{x}e^{ik_{x}x})(A_{y}e^{ik_{y}y})(A_{z}e^{ik_{z}z})=A_{x}A_{y}A_{z}e^{i(k_{x}x + k_{y}y + k_{z}z)}$，令$C = A_{x}A_{y}A_{z}$，就得到了$\psi(\vec{r}) = Ce^{i\vec{k}\cdot\vec{r}}$的形式，便于与常见的三维自由粒子波函数形式相统一。
- **物理意义上的简化**：从物理角度看，$e^{ikx}$和$e^{-ikx}$分别代表沿$x$轴正方向和负方向传播的平面波。当只考虑粒子沿一个方向的运动时，比如只关注向正方向的传播，就可以令$B_x = 0$来忽略沿负方向传播的波。在三维情况下，令$B_x = B_y = B_z = 0$，就是只考虑粒子在==三个坐标轴正方向上==的波函数分量，简化了对粒子运动状态的描述，突出主要的传播方向。

# 倒空间


