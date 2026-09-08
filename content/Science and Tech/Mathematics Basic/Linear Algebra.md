---
title: 复变函数笔记
tags:
  - "#study"
date: 2024-11-28
progress: 30%
---

# 0 认识”线性“与”非线性“

## 0.0 常见的线性与非线性算子



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



# ?

at the initial moment
In the two‑dimensional case
now we have the following Plane rectangular coordinate system

## 解线性方程组
## 1 克拉姆法则
![[Pasted image 20241004095003.png]]

![[Pasted image 20241004094403.png]]
^lin_eq_block
## 初等行变换

## 求方阵的特征值
# 特征向量

## 1. 概念

对于一个矩阵 \( A \)，如果存在一个非零向量 \( \mathbf{v} \) 和标量 \( \lambda \)，使得

$$
A \mathbf{v} = \lambda \mathbf{v}
$$

那么，\( \mathbf{v} \) 是**特征向量**，\( \lambda \) 是对应的**特征值**。

- **特征向量**：在变换下方向不变的向量。
- **特征值**：缩放或反向因子。

## 2. 几何意义

特征向量在矩阵  A  的作用下仅发生缩放或反向变化，但不改变方向。特征向量和特征值的关系为：

• 当 $\lambda > 1$  时，特征向量被放大。

• 当  0 < \lambda < 1  时，特征向量被缩小。

• 当  \lambda = 1  时，特征向量长度不变。

• 当  \lambda = 0  时，特征向量被映射到零向量。

• 当  \lambda < 0  时，特征向量被反向。

## 3. 求解步骤

1. **求特征值**：解 \( \det(A - \lambda I) = 0 \)
2. **求特征向量**：对每个 \( \lambda \)，解 \( (A - \lambda I)\mathbf{v} = 0 \)

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