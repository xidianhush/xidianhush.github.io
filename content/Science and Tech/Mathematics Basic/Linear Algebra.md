---
title: Linear algebra
tags:
  - "#study"
date: 2024-11-28
progress: 30%
---


# Coordinate system & Vector

## Coordinate system

at the initial moment
For example：In the two‑dimensional case
now we can have the following plane coordinate systems

```image-layout-a
![[Pasted image 20260924093846.png]]
![[Pasted image 20260924093640.png]]
```

## Vector

vector encodes the information of coordinates
whatever coordinate system you use
but in linear situation
it can be like that :

```image-layout-a
![[65c7386b6cbc9bdd557afb82df23bd99.png]]
![[ee3b5f0451b1c3a6179a93f2e7b46316.png]]
```

Still now
When we write a vector
We do not know in which coordinate system the vector lies
Does it lies in the artesian plane？
Or it lies in the oblique coordinate system
## A convention

### This part start with a naive question:

#### Question

When we talk about basis vectors in $\mathbb R^3$:

① When we write

$\begin{bmatrix}1\\0\\0\end{bmatrix}\ \begin{bmatrix}0\\1\\0\end{bmatrix}\ \begin{bmatrix}0\\0\\1\end{bmatrix}$,

does this by default 
correspond to the pairwise‑perpendicular basis 
in 3‑dimensional space (the standard basis)?

② In addition, 
must all non‑standard orthonormal bases that span $\mathbb R^3$ 
be expressed as linear combinations of the standard orthonormal basis?

#### The answer leads to the convention

**① Answer: Essentially correct, with a small rigorous qualification.**

1. **Default convention behind the notation**:

In $\mathbb{R}^3$ (and more generally $\mathbb{R}^n$), 
when we write down these three column vectors,
==we are **already implicitly using the standard inner product (dot product)**==. 
Under this standard inner product, 
their pairwise dot products are zero and each has 
equal to one. Therefore they indeed form an **orthonormal basis**.

Therefore, all vectors we will discuss later 
lie in the coordinate system spanned by an orthonormal basis, 
as shown in the figure below

![[Pasted image 20260924093846.png]]

2. **The essence of coordinates**:
When we ordinarily write a 3‑dimensional vector $\begin{bmatrix}x\\y\\z\end{bmatrix}$, 
this already suggests that the vector is a linear combination of the standard basis:
$x\begin{bmatrix}1\\0\\0\end{bmatrix} + y\begin{bmatrix}0\\1\\0\end{bmatrix} + z\begin{bmatrix}0\\0\\1\end{bmatrix}$.
In this sense, these three vectors 
**by default constitute our reference frame for describing all coordinates**.


---


**② Answer: Yes, this is inevitable, and this is precisely the motivation behind the existence of "coordinates" and "matrices".**

Let us reason this out:
Suppose you pick a completely "skewed" basis inside $\mathbb{R}^3$ (for example three vectors of non‑unit length which are not mutually perpendicular):
$\mathcal{B} = \{v_1, v_2, v_3\}$.
These still span the entire space $\mathbb{R}^3$.

Now a question arises:
**how do we write down these skewed basis vectors on paper?**

Mathematicians solve this problem by **expressing them as linear combinations of the standard basis $\mathcal{E} = \{e_1, e_2, e_3\}$**.

For instance, the skewed basis vector $v_1$ points in some spatial direction;
==it is necessarily a linear combination of the standard basis:==
$$
v_1 = a e_1 + b e_2 + c e_3 = \begin{bmatrix}a\\b\\c\end{bmatrix}
$$
(Here $a,b,c$ are its coordinates with respect to the standard basis.)

Likewise, $v_2$ and $v_3$ can be written in this form. If you place these three skewed basis vectors side‑by‑side to assemble a matrix:
$$
P = \begin{bmatrix} \uparrow & \uparrow & \uparrow \\ v_1 & v_2 & v_3 \\ \downarrow & \downarrow & \downarrow \end{bmatrix} = \begin{bmatrix} a & d & g \\ b & e & h \\ c & f & i \end{bmatrix}
$$

**This matrix $P$ is the change‑of‑basis matrix from the non‑standard basis to the standard basis.**


---


## Visualization

https://xidianhush.github.io/linear-algebra-3d/coordinate-system-and-vector.html

# matrix

Matrix corresponds one to one with space transform
Actually, matrix corresponds to the new coordinate system
the elements in matrix are to represent new base vectors using previous scale 

Visalization:
https://xidianhush.github.io/linear-algebra-3d/matrix.html

matrix include more than one vector
`[ vector1 vector2 ]`
more than 2  vectors make up base vectors of a  coordinate system

## Square matrix
### identity matrix 

the original coordinate system can be represented by identity matrix 
$\begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$
(for example, 3 dimension)
### order square matrix 

the transformed coordinate system can be represented by other square matrix
but in the same dimension

## non-square matrix 

the transformed coordinate system can be represented by non-square matrix
but in the different dimension
# Operation

==mapping==！！！
from ine to one
See the screenshots and the visualized web page for details.
## matrix times vector

now we get the :
+ transformed coordinate system
+ The coordinates of vector in the transformed coordinate system

We want to know:
+ The coordinates of vector in the previous coordinate system


it shows how to represent the
(vector with ==same coordinate but  in transformed coordinate system==)
using (the same scale of the previous coordinate) 
of the original coordinate system 
(maybe in same dimension)

![[0a4fde250b23ea6b19a6415026d31529.png]]

Visualization:
https://xidianhush.github.io/linear-algebra-3d/matrix-vector.html

## Inverse operation of “matrix times vector”

now we get the :
+ transformed coordinate system
+ The coordinates of vector in the previous coordinate system

We want to know:
+ The coordinates of vector in the transformed coordinate system




## matrix times matrix(including composite operation)

it shows how to represent the
(a set of base vectors with ==same coordinate but  in transformed coordinate system==)
using (the same scale of the previous coordinate) 
of the original coordinate system 
(maybe in same dimension)

![[1323e83de8f4c6495104d50158a53db6.png]]
Visualization:
https://xidianhush.github.io/linear-algebra-3d/matrix-matrix.html

exp:
![[Pasted image 20260927155146.png]]

all we talk about are according to [[Linear Algebra#Question]]
only the matix ==🟠on the far left== "set tle tone"
All the transitian & transtomed matix shrould be expresxd
by the linear combination of standard arthondtion basis

## Matrix inversion operation

now we get the :
+ The coordinates of vector in the previous coordinate system
+ transformed coordinate system

We want to know:
+  The coordinates of vector in the transformed coordinate system
## Inner product

### What Inner product does is:

#### Real‑number case: 
 Compute the projection of one vector onto the unit direction vector corresponding to another vector, and then multiply it by the magnitude of the projected vector.
 ![[Pasted image 20261007195138.png]]

![[1791290854305.gif]]
 
#### Complex-number case：
![[Pasted image 20261007195256.png]]

### Calculation method & matrix‑based interpretation

The calculation method for inner product: can derive the form of multiplying coordinates and then adding them up using only elementary algebra

such as

![[Pasted image 20260927204656.png]]

A matrix‑based interpretation of the dot‑product operation : this operation can also correspond to a kind of linear mapping ($\mathbb R^n \to \mathbb R^1$) , from one thing of a space to another thing of another space , which can be represented by matrix times vector

![[5c2eba6e1c7734745e0faa73bf65d3d0.png]]
## Change of basis

你的笔记已经为“基变换”（Change of Basis）打下了很好的基础：  
- 你理解了矩阵的列向量可以看作新坐标系的基向量（用旧基表示）；  
- 你知道了矩阵乘法可以表示“同一个向量在不同坐标系下的坐标转换”；  
- 你甚至写下了“change-of-basis matrix” $P$ 的构造方式。

现在，我们来系统地补充“Change of Basis”这一块。我会从你已有的直觉出发，帮你把零散的知识点串成一条线，并给出具体例子和练习建议。

---

### 1. 核心问题：同一个向量，不同坐标

你笔记里有一句很关键的话：

> “When we write a vector, we do not know in which coordinate system the vector lies.”

这正是基变换要解决的根本问题：  
**一个向量本身是几何对象，不依赖于坐标系；但它的“坐标”是依赖于基的。**  
基变换就是研究：同一个向量，在旧基下的坐标 $[\mathbf{v}]_{\text{old}}$ 和新基下的坐标 $[\mathbf{v}]_{\text{new}}$ 之间如何互相转换。

---

### 2. 过渡矩阵 $P$：从新基到旧基

假设在 $\mathbb{R}^n$ 中：

- 旧基（比如标准基）$\mathcal{E} = \{\mathbf{e}_1, \mathbf{e}_2, \dots, \mathbf{e}_n\}$
- 新基 $\mathcal{B} = \{\mathbf{b}_1, \mathbf{b}_2, \dots, \mathbf{b}_n\}$

你笔记中已经写到了关键构造：

$$
P = \begin{bmatrix} \uparrow & \uparrow & & \uparrow \\ \mathbf{b}_1 & \mathbf{b}_2 & \cdots & \mathbf{b}_n \\ \downarrow & \downarrow & & \downarrow \end{bmatrix}
$$

这里的每一列 $\mathbf{b}_i$ 是**新基向量在旧基下的坐标**。  
所以 $P$ 叫做**从新基 $\mathcal{B}$ 到旧基 $\mathcal{E}$ 的过渡矩阵**（change-of-basis matrix）。

#### 坐标变换公式

- 如果你有一个向量，它在**新基**下的坐标是 $[\mathbf{v}]_{\mathcal{B}}$，那么它在**旧基**下的坐标是：

$$
[\mathbf{v}]_{\mathcal{E}} = P \, [\mathbf{v}]_{\mathcal{B}}
$$

- 反过来，如果知道旧坐标，想求新坐标：

$$
[\mathbf{v}]_{\mathcal{B}} = P^{-1} \, [\mathbf{v}]_{\mathcal{E}}
$$

> **注意方向**：$P$ 的列是新基在旧基下的坐标，所以 $P$ 把“新坐标”映射到“旧坐标”。很多教材把 $P$ 定义为从旧基到新基的过渡矩阵，那样公式会反过来。你要始终检查定义。

---

### 3. 具体例子（二维）

取标准基 $\mathcal{E} = \{\mathbf{e}_1=(1,0), \mathbf{e}_2=(0,1)\}$。  
新基 $\mathcal{B} = \{\mathbf{b}_1=(1,1), \mathbf{b}_2=(-1,1)\}$。

构造 $P$：

$$
P = \begin{bmatrix} 1 & -1 \\ 1 & 1 \end{bmatrix}
$$

假设向量 $\mathbf{v}$ 在新基下的坐标是 $[\mathbf{v}]_{\mathcal{B}} = \begin{bmatrix} 2 \\ 3 \end{bmatrix}$，即  
$\mathbf{v} = 2\mathbf{b}_1 + 3\mathbf{b}_2 = 2(1,1) + 3(-1,1) = (-1, 5)$。

用公式验证旧坐标：

$$
[\mathbf{v}]_{\mathcal{E}} = P [\mathbf{v}]_{\mathcal{B}} = \begin{bmatrix} 1 & -1 \\ 1 & 1 \end{bmatrix} \begin{bmatrix} 2 \\ 3 \end{bmatrix} = \begin{bmatrix} 2-3 \\ 2+3 \end{bmatrix} = \begin{bmatrix} -1 \\ 5 \end{bmatrix}
$$

正确。

反过来，若已知旧坐标 $(-1,5)$，求新坐标：

$$
P^{-1} = \frac{1}{2}\begin{bmatrix} 1 & 1 \\ -1 & 1 \end{bmatrix}
$$

$$
[\mathbf{v}]_{\mathcal{B}} = P^{-1} \begin{bmatrix} -1 \\ 5 \end{bmatrix} = \frac{1}{2}\begin{bmatrix} -1+5 \\ 1+5 \end{bmatrix} = \begin{bmatrix} 2 \\ 3 \end{bmatrix}
$$

---

### Basis Change of Linear Transformations: Similar Matrices
#### Introduction(结论)

"Matrix corresponds to space transformation" has been mentioned.
So, the same linear transformation $T: \mathbb{R}^n \to \mathbb{R}^n$，
What is the relationship between the matrix 
expressing linear transformation under different bases?

设：

- 在旧基 $\mathcal{E}$ 下，$T$ 的矩阵是 $A$；
- 在新基 $\mathcal{B}$ 下，$T$ 的矩阵是 $B$；
- $P$ 是从新基到旧基的过渡矩阵（列是新基在旧基下的坐标）。

那么：

$$
B = P^{-1} A P
$$

这就是**相似矩阵**（similar matrices）的定义。  
它说明：$A$ 和 $B$ 表示同一个线性变换，只是选择了不同的基。  
相似矩阵有相同的特征值、迹、行列式等不变量。

> 笔记中的“matrix times matrix”其实已经隐含了这个思想：矩阵乘法可以表示基变换的复合。

##### The geometric  intuition of basis change



注意这两种重合有本质区别：

满足相似 B=P^{-1}AP 时，配对公式 v_2=B^{-1}P^{-1}Av_1 会自动化简成 v_2=P^{-1}v_1。这时：

	●	两支箭变换前就是同一支（Pv_2=v_1），变换后当然还是同一支；

	●	而且对空间里每一支箭、每一个网格点都成立——整个形变严丝合缝。

不满足相似时，你只能让某一支精心挑选的箭在终点"撞上"：

	●	它们变换前根本不是同一支：你把 v_2=(-1,\tfrac43) 拖回第③段看，粉箭在 P v_2=(-\tfrac23,\tfrac13)，金箭却在 (2,3)，八竿子打不着；

	●	只有变换后那一个终点碰巧相同，动画路径、整个网格的形变全都对不上；

	●	换一支箭，系数又得重算，不存在一个统一的坐标换算。



---
#### Prove


#### 5. 与内积、正交基的联系

你笔记中提到了内积。如果新基是**标准正交基**（orthonormal basis），那么过渡矩阵 $P$ 是**正交矩阵**，满足：

$$
P^{-1} = P^T
$$

这时坐标变换变得特别简单：

$$
[\mathbf{v}]_{\mathcal{B}} = P^T [\mathbf{v}]_{\mathcal{E}}
$$

而且保持内积不变：$\langle \mathbf{u}, \mathbf{v} \rangle = [\mathbf{u}]_{\mathcal{B}}^T [\mathbf{v}]_{\mathcal{B}}$。  
这也是为什么在 $\mathbb{R}^n$ 中我们默认使用标准正交基——它让坐标和几何直觉一致。

你可以进一步学习 **格拉姆-施密特正交化**（Gram-Schmidt），把任意基变成标准正交基。

---

#### 6. 抽象向量空间中的基变换

你的笔记已经扩展到了向量空间、多项式空间、函数空间。  
基变换不仅适用于 $\mathbb{R}^n$，也适用于任何有限维向量空间。

例如，多项式空间 $P_2$（次数 ≤ 2 的多项式）：

- 旧基：$\{1, x, x^2\}$
- 新基：$\{1, 1+x, 1+x+x^2\}$

写出过渡矩阵，就可以在两组坐标之间转换。  
这与你笔记中的“离散有限维、连续无限维”内容自然衔接。

---


## other application

Matrix acts on a single vector
Metric can also act on a set of vectors
Of which the end is a plot in the 3D space
And they can make up a 3D geometric solid
Matrix can act on the 3D geometric solid

## Sumary
### Re‑emphasize geometric intuition

+ from these operations：we can see the ==corresponding mappings of vectors in different spaces== (we can intuitively imagine ==spatial transformations== in low‑dimensional spaces ,however, we still cannot intuitively visualize the high‑dimensional case)
+ from these operations：we can see the ==linear superposition of column vectors== in matrices (==synthesis and superposition of sequences==)




# Extend to complex numbers



# 向量空间的概念

## 1. 向量空间的定义
向量空间（Vector Space）是一个集合 $V$，其元素称为**向量**，定义在一个数域（通常是实数域 $\mathbb{R}$ 或复数域 $\mathbb{C}$）上，并满足以下两个运算和八个公理：

### 1.1 运算
- **加法**：对任意两个向量 $u, v \in V$，向量加法 $u + v \in V$。
- **数乘**：对任意标量（域中的元素） $a \in \mathbb{F}$ 和向量 $v \in V$，数乘 $a \cdot v \in V$。

### 1.2 公理
以下运算满足特定规则：
1. **加法封闭性**：对任意 $u, v \in V$，有 $u + v \in V$。
2. **加法交换律**：对任意 $u, v \in V$，有 $u + v = v + u$。
3. **加法结合律**：对任意 $u, v, w \in V$，有 $(u + v) + w = u + (v + w)$。
4. **加法零元**：存在零向量 $0 \in V$，使得对任意 $v \in V$，有 $v + 0 = v$。
5. **加法逆元**：对任意 $v \in V$，存在 $-v \in V$，使得 $v + (-v) = 0$。
6. **数乘封闭性**：对任意 $a \in \mathbb{F}$ 和 $v \in V$，有 $a \cdot v \in V$。
7. **数乘分配律（标量加法）**：对任意 $a, b \in \mathbb{F}$ 和 $v \in V$，有 $(a + b) \cdot v = a \cdot v + b \cdot v$。
8. **数乘分配律（向量加法）**：对任意 $a \in \mathbb{F}$ 和 $u, v \in V$，有 $a \cdot (u + v) = a \cdot u + a \cdot v$。
9. **标量结合律**：对任意 $a, b \in \mathbb{F}$ 和 $v \in V$，有 $(a \cdot b) \cdot v = a \cdot (b \cdot v)$。
10. **标量单位元**：对任意 $v \in V$，有 $1 \cdot v = v$（$1$ 是数域 $\mathbb{F}$ 的单位元）。

## 2. 向量空间的要素
一个向量空间主要包括以下三个要素：
1. **向量集合 $V$**：向量可以是几何中的箭头、数组、函数等。
2. **标量域 $\mathbb{F}$**：通常是实数域 $\mathbb{R}$ 或复数域 $\mathbb{C}$。
3. **运算规则**：向量加法和数乘规则。

## 3. 向量空间的例子

1. **几何向量空间**：平面上的二维向量空间 $V = \mathbb{R}^2$，三维向量空间 $V = \mathbb{R}^3$。
2. **多项式空间**：所有次数不超过 $n$ 的多项式集合 $P_n$ 构成向量空间。
3. **函数空间**：定义在某区间上的连续函数集合构成向量空间。
4. **矩阵空间**：所有 $m \times n$ 矩阵的集合构成向量空间。


# 7 线性空间与线性变换
## 离散有限维、离散无限维、连续无限维向量

# 认识”线性“与”非线性“

## 7.1 常见的线性与非线性算子



| 分类 | 算子名称 | 算子表达式 | 线性 / 非线性 | 简要判定理由 & 应用场景 |
| ---- | ---- | ---- | ---- | ---- |
| 线性算子 | 常数数乘 | $T[f(t)]=c\cdot f(t)$ | 线性 | 叠加、齐次完全满足；信号幅度缩放 |
| 线性算子 | 加法 / 减法 | $T[f_1,f_2]=f_1(t)\pm f_2(t)$ | 线性 | 线性系统基础运算 |
| 线性算子 | 一阶微分 | $T[f]=\frac{\mathrm{d}f(t)}{\mathrm{d}t}$ | 线性 | $\frac{\mathrm{d}(af+bg)}{\mathrm{d}t}=a\frac{\mathrm{d}f}{\mathrm{d}t}+b\frac{\mathrm{d}g}{\mathrm{d}t}$；电路微分器 |
| 线性算子 | n 阶微分 | $T[f]=\frac{\mathrm{d}^nf(t)}{\mathrm{d}t^n}$ | 线性 | 微分算子天生线性；微分方程 |
| 线性算子 | 定积分（含无穷积分） | $T[f]=\int_{a}^{b}f(t)\mathrm{d}t$ | 线性 | $\int(af+bg)\mathrm{d}t=a\int f\mathrm{d}t+b\int g\mathrm{d}t$；取样积分、能量计算（不含平方） |
| 线性算子 | 不定积分 | $T[f]=\int f(t)\mathrm{d}t$ | 线性 | 积分满足叠加齐次 |
| 线性算子 | 有限求和 | $T[\{x_n\}]=\sum_{n}x_n$ | 线性 | 和的求和 = 求和的和；离散信号累加 |
| 线性算子 | 移位（时移） | $T[f(t)]=f(t-t_0)$ | 线性 | $af(t-t_0)+bg(t-t_0)=T[af+bg]$；信号延迟 |
| 线性算子 | 尺度变换（伸缩） | $T[f(t)]=f(kt),k为常数$ | 线性 | 满足两条线性条件；时域压缩拓展 |
| 线性算子 | 卷积（对单输入函数） | $T_g[f]=f(t)*g(t)=\int_{-\infty}^{\infty}f(\tau)g(t-\tau)\mathrm{d}\tau$ | 线性 | 对 f 线性；线性系统零状态响应 |
| 线性算子 | 冲激取样积分 | $T[f]=\int_{-\infty}^{\infty}f(t)\delta(t-a)\mathrm{d}t=f(a)$ | 线性 | $\int(af+bg)\delta\mathrm{d}t=af(a)+bg(a)$；筛选函数值 |
| 线性算子 | 矩阵乘向量 | $T(\boldsymbol{x})=\boldsymbol{A}\boldsymbol{x}$ | 线性 | $\boldsymbol{A}(a\boldsymbol{x}+b\boldsymbol{y})=a\boldsymbol{A}\boldsymbol{x}+b\boldsymbol{A}\boldsymbol{y}$；线性变换、神经网络全连接层 |
| 非线性算子 | 平方 / 高次幂 | $T[f]=f^k(t),\ k\neq1$ | 非线性 | $T[cf]=c^kf^k\neq cT[f]$；信号能量 $E=\int f^2\mathrm{d}t$、功率 |
| 非线性算子 | 开方、倒数 | $T[f]=\sqrt{f(t)},\ \frac{1}{f(t)}$ | 非线性 | 齐次性失效；欧姆定律变形、均方根 |
| 非线性算子 | 两函数相乘（调制） | $T[f,g]=f(t)\cdot g(t)$ | 非线性 | 双变量耦合，不满足线性；AM 调幅、混频 |
| 非线性算子 | 指数运算 | $T[f]=e^{f(t)},\ a^{f(t)}$ | 非线性 | $e^{f_1+f_2}=e^{f_1}e^{f_2}\neq e^{f_1}+e^{f_2}$；增长模型、sigmoid |
| 非线性算子 | 对数运算 | $T[f]=\ln f(t),\log f(t)$ | 非线性 | $\ln(af)\neq a\ln f$；分贝、音频压缩 |
| 非线性算子 | 三角函数 | $T[f]=\sin f(t),\cos f(t),\tan f(t)$ | 非线性 | $\sin(a+b)\neq \sin a+\sin b$；非线性振动、相位调制 |
| 非线性算子 | 绝对值、模 | $T[f]=|f(t)|$ | 非线性；$-cf = c|f| \neq -c|f|$；整流电路 |
| 非线性算子 | 取最大 / 最小、限幅 | $T[f]=\max(f(t),0),\min(f(t),A)$ | 非线性 | 放大常数倍输出不成正比；ReLU 激活、削波 |
| 非线性算子 | 取整、符号函数 | $T[f]=\lfloor f(t)\rfloor,\ \mathrm{sgn}(f(t))$ | 非线性 | 输入缩放，输出不变 / 跳变；模数量化 |
| 非线性算子 | 平方积分（能量算子） | $T[f]=\int_{-\infty}^{\infty}f^2(t)\mathrm{d}t$ | 非线性 | $T[cf]=c^2T[f]$；信号能量计算 |
| 非线性算子 | 非线性复合微分 | $T[f]=f(t)\cdot f'(t),\ (f'(t))^2$ | 非线性 | 含函数自乘；非线性动力学方程 |
| 非线性算子 | 神经网络激活函数 | $\sigma(x)=\frac{1}{1+e^{-x}},\ \tanh(x)$ | 非线性 | 叠加、齐次全部失效；赋予网络拟合复杂曲线能力 |


