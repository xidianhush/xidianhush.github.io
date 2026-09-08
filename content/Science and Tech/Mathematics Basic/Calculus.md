# 1 函数与极限

## 1.2 数列的极限
### 1.2.1 数列极限的定义
### 1.2.2 数列极限的性质
## 1.3 函数的极限
### 1.3.1 函数极限的定义
### 1.3.2 函数极限的性质

# 2 导数与微分
## 2.1 导数概念

### 2.1.2 导数定义

定义 设函数 $y = f(x)$ 在点 $x_0$ 的某个邻域内有定义，
当自变量 $x$ 在 $x_0$ 处取得增量 $\Delta x$（点 $x_0 + \Delta x$ 仍在该邻域内）时，
相应地，因变量取得增量 $\Delta y = f(x_0 + \Delta x) - f(x_0)$；
如果 $\Delta y$ 与 $\Delta x$ 之比当 $\Delta x \to 0$ 时的极限存在，
那么称函数 $y = f(x)$ 在点 $x_0$ 处可导，
并称这个极限为函数 $y = f(x)$ 在点 $x_0$ 处的导数，
记为 $f'(x_0)$，
即 $f'(x_0) = \lim_{\Delta x \to 0} \frac{\Delta y}{\Delta x} = \lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$
$f'(x_{0})=\lim\limits _{\Delta x\to 0}\frac {\Delta y}{\Delta x}=\lim\limits _{\Delta x\to 0}\frac {f(x_{0}+\Delta x)-f(x_{0})}{\Delta x}, \tag{1-4}$ 
也可记作$y'|_{x=x_{0}}$，$\frac {dy}{dx}|_{x=x_{0}}$或$\frac {df(x)}{dx}|_{x=x_{0}}$ 。 

函数$f(x)$在点$x_{0}$处可导有时也说成$f(x)$在点$x_{0}$具有导数或导数存在。 
导数的定义式$(1 - 4)$也可取不同的形式，常见的有 $$f'(x_{0})=\lim\limits _{h\to 0}\frac {f(x_{0}+h)-f(x_{0})}{h} \tag{1-5}$$ 和 $$f'(x_{0})=\lim\limits _{x\to x_{0}}\frac {f(x)-f(x_{0})}{x - x_{0}} \tag{1-6}$$ $(1 - 5)$式中的$h$即自变量的增量$\Delta x$ 。 
在实际中，需要讨论各种具有不同意义的变量的变化“快慢”问题，
在数学上就是所谓函数的变化率问题。
导数概念就是函数变化率这一概念的精确描述。它撇开了自变量和因变量所代表的几何或物理等方面的特殊意义，纯粹从数量方面来刻画变化率的本质：因变量增量与自变量增量之比$\frac {\Delta y}{\Delta x}$是因变量$y$在以$x_{0}$和$x_{0}+\Delta x$为端点的区间上的平均变化率，而导数$f'(x_{0})$则是因变量$y$在点$x_{0}$处的变化率，它反映了因变量随自变量的变化而变化的快慢程度。 如果极限$(1 - 4)$不存在，就说函数$y = f(x)$在点$x_{0}$处不可导。如果不可导的原因是由于$\Delta x\to 0$时，比式$\frac {\Delta y}{\Delta x}\to\infty$，为了方便起见，也往往说函数$y = f(x)$在点$x_{0}$处的导数为无穷大。

上面讲的是函数在一点处可导。如果函数$y = f(x)$在开区间$I$内的每点处都可导，那么就称函数$f(x)$在开区间$I$内可导。这时，对于任一$x\in I$，都对应着$f(x)$的一个确定的导数值。这样就构成了一个新的函数，这个函数叫做原来函数$y = f(x)$的导函数，记作$y'$，$f'(x)$，$\frac {dy}{dx}$或$\frac {df(x)}{dx}$ 。==$dx$就是函数的自变量==。 在$(1 - 4)$式或$(1 - 5)$式中把$x_{0}$换成$x$，即得导函数的定义式 $$y'=\lim\limits _{\Delta x\to 0}\frac {f(x+\Delta x)-f(x)}{\Delta x}$$ 或 $$f'(x)=\lim\limits _{h\to 0}\frac {f(x+h)-f(x)}{h}$$
# 实变函数中连续、可导、可微的关系

## 1. **连续性**
函数 $f(x)$ 在某点 $x_0$ 连续的条件：
1. $f(x_0)$ 有定义；
2. 极限 $\lim_{x \to x_0} f(x)$ 存在；
3. $\lim_{x \to x_0} f(x) = f(x_0)$。

**连续性是可导和可微的基础条件**。

---

## 2. **可导性**
函数 $f(x)$ 在某点 $x_0$ 可导的条件：
1. $f(x)$ 在 $x_0$ 连续；
2. 导数 $f'(x_0) = \lim_{h \to 0} \frac{f(x_0 + h) - f(x_0)}{h}$ 存在。

### **性质**
- **可导性 $\Rightarrow$ 连续性**：若 $f(x)$ 在 $x_0$ 可导，则 $f(x)$ 必定在 $x_0$ 连续。
- **连续性 $\nRightarrow$ 可导性**：连续函数未必可导。例如：  
  $f(x) = |x|$ 在 $x = 0$ 连续但不可导。

---

## 3. **可微性**
在实变函数中，“可微性”通常与“可导性”等价：
- $f(x)$ 在某点 $x_0$ 可微，当且仅当其在 $x_0$ 可导。

### **备注**
在更高层次的讨论中，可微性可能会包含函数更强的光滑性，但在实变函数中通常等价于可导。

---


# 3 微分中值定理与导数的应用
## 3.3 泰勒公式

若函数 $ f(x) $ 在包含 $ x_0 $ 的某个开区间 $ (a, b) $ 内具有 $ n+1 $ 阶导数，则对任意 $ x \in (a, b) $，有：

$$
f(x) = f(x_0) + f'(x_0)(x - x_0) + \frac{f''(x_0)}{2!}(x - x_0)^2 + \cdots + \frac{f^{(n)}(x_0)}{n!}(x - x_0)^n + R_n(x)
$$

其中余项 $R_n(x)$ 为拉格朗日形式：
$$
R_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}(x - x_0)^{n+1}
$$
（$ \xi $ 是介于 $ x_0 $ 和 $ x $ 之间的某个值）

## 4. **三者关系总结**
1. **可导 $\Rightarrow$ 连续**，但连续未必可导；
2. 在单变量情况下，可导与可微等价；
3. 存在以下典型例子：
   - 连续但不可导：$f(x) = |x|$ 在 $x = 0$。
   - 不连续且不可导：$f(x) = \frac{1}{x}$ 在 $x = 0$ 不连续，故不可导。

---
# 5 定积分
## 5.1 定积分的概念和性质
### 5.1.2 定积分的定义(本质是求和的极限)


抽象出下述定积分的定义： 

**定义** 

设函数 $f(x)$ 在 $[a,b]$ 上有界，在 $[a,b]$ 中任意插入若干个分点 $$a = x_0 < x_1 < x_2 < \dots < x_{n-1} < x_n = b,$$把区间 $[a,b]$ 分成 $n$ 个小区间 $$[x_0,x_1],\ [x_1,x_2],\ \dots,\ [x_{n-1},x_n],$$ 各个小区间的长度依次为 $$\Delta x_1 = x_1 - x_0,\ \Delta x_2 = x_2 - x_1,\ \dots,\ \Delta x_n = x_n - x_{n-1}.$$在每个小区间 $[x_{i-1},x_i]$ 上任取一点 $\xi_i\ (x_{i-1} \le \xi_i \le x_i)$，
作函数值 $f(\xi_i)$ 与小区间长度 $\Delta x_i$ 的乘积 $f(\xi_i)\Delta x_i\ (i=1,2,\dots,n)$，
并作出和 $$S = \sum_{i=1}^{n} f(\xi_i)\Delta x_i. \tag{1-1}$$记 $\lambda = \max\{\Delta x_1,\Delta x_2,\dots,\Delta x_n\}$，
如果当 $\lambda \to 0$ 时，这和的极限总存在，
且与闭区间 $[a,b]$ 的分法及点 $\xi_i$ 的取法无关，
那么称这个极限 $I$ 为函数 $f(x)$ 在区间 $[a,b]$ 上的定积分（简称积分），
记作 $\int_{a}^{b} f(x)\mathrm{d}x$，即 $$\int_{a}^{b} f(x)\mathrm{d}x = I = \lim_{\lambda \to 0} \sum_{i=1}^{n} f(\xi_i)\Delta x_i, \tag{1-2}$$其中 $f(x)$ 叫做被积函数，
$f(x)\mathrm{d}x$ 叫做被积表达式，
$x$ 叫做积分变量，
$a$ 叫做积分下限，
$b$ 叫做积分上限，
$[a,b]$ 叫做积分区间。 

图示(==注意这里的图示只适用于被积函数是实函数的情况，而不适用于被积函数是负函数的情况==)
被积函数与横坐标围成的面积

![[426671e3083465e81b45949427d537c0.jpg]]
# 定积分的计算
### 用性质简化运算
1. 偶倍奇零
### 用性质简化运算的应用
[[概率论]]
### 计算定积分的易错点：
+ 定积分换元，积分上下限可能要变
## 5. **图示关系**

# 微分方程
## 变量可分离的微分方程
## 齐次方程&可化为齐次方程的方程
## 一阶线性微分方程
## 可降阶的高阶微分方程
## 高阶线性微分方程
### 常系数齐次线性微分方程
#### 二阶常系数齐次微分方程的解法

##### 方程形式
二阶常系数齐次微分方程一般形如：
$$
ay'' + by' + cy = 0 \quad (a, b, c \text{为常数，} a \neq 0)
$$

---

##### 解题步骤

###### 1. 写出特征方程
将微分方程转化为二次代数方程：
$$
ar^2 + br + c = 0
$$

###### 2. 求解特征根
根据判别式 $\Delta = b^2 - 4ac$，有以下三种情况：

情况 1：$\Delta > 0$（两个不相等的实根 $r_1, r_2$）
特征方程有两个实根 $r_1, r_2$。通解为：
$$
y(x) = C_1 e^{r_1 x} + C_2 e^{r_2 x}
$$

情况 2：$\Delta = 0$（两个相等的实根 $r$）
特征方程有一个重根 $r$。通解为：
$$
y(x) = (C_1 + C_2 x) e^{r x}
$$

情况 3：$\Delta < 0$（两个共轭复根 $r = \alpha \pm \beta i$）
特征方程有两个复根 $r = \alpha \pm \beta i$。通解为：
$$
y(x) = e^{\alpha x} \big(C_1 \cos(\beta x) + C_2 \sin(\beta x)\big)
$$

---

###### 3. 确定通解
通过初始条件（如果给出），如 $y(0)$ 和 $y'(0)$，代入通解求出常数 $C_1, C_2$。

---

##### 示例

###### 示例 1：$y'' - 3y' + 2y = 0$
1. 特征方程：$r^2 - 3r + 2 = 0$  
2. 求根：$r_1 = 1, r_2 = 2$  
3. 通解：
   $$
   y(x) = C_1 e^x + C_2 e^{2x}
   $$

---

###### 示例 2：$y'' + 4y' + 4y = 0$
1. 特征方程：$r^2 + 4r + 4 = 0$  
2. 求根：$r = -2$（重根）  
3. 通解：
   $$
   y(x) = (C_1 + C_2 x) e^{-2x}
   $$

---

###### 示例 3：$y'' + 2y' + 5y = 0$
1. 特征方程：$r^2 + 2r + 5 = 0$  
2. 求根：$r = -1 \pm 2i$  
3. 通解：
   $$
   y(x) = e^{-x} \big(C_1 \cos(2x) + C_2 \sin(2x)\big)
   $$
### 常系数非齐次线性微分方程
#### 二阶常系数非齐次微分方程的通解求解步骤

给定方程：
$$
y'' + a y' + b y = f(x)
$$
其中 $a, b$ 为常数，$f(x)$ 是已知的非齐次项。

---

##### **第一步：求解对应的齐次方程**
先求解对应的齐次方程[[Calculus#二阶常系数齐次微分方程的解法]]：
$$
y'' + a y' + b y = 0
$$

##### **第二步：求非齐次方程的特解**
根据 $f(x)$ 的形式，选取适当的特解 $y_p$：

###### **1. 若 $f(x) = e^{\lambda x} P_m(x)$**
设特解为：
$$
y_p = e^{\lambda x} Q_m(x)
$$
其中 $Q_m(x)$ 是与 $P_m(x)$ 同阶的多项式。

- 若 $\lambda$ **不是特征根**，直接代入求解。
- 若 $\lambda$ **是特征根的单重解**，需乘 $x$：
  $$
  y_p = x e^{\lambda x} Q_m(x)
  $$
- 若 $\lambda$ **是特征根的二重解**，需乘 $x^2$：
  $$
  y_p = x^2 e^{\lambda x} Q_m(x)
  $$

---

###### **2. 若 $f(x) = e^{\lambda x} [P_l(x) \cos \omega x + Q_n(x) \sin \omega x]$**
设特解为：
$$
y_p = e^{\lambda x} [ R_l(x) \cos \omega x + S_n(x) \sin \omega x ]
$$
其中 $R_l(x)$ 和 $S_n(x)$ 是与 $P_l(x), Q_n(x)$ **同阶** 的多项式。

- 若 $\lambda$ 和 $e^{\lambda x} \sin \omega x$ **不是特征根**，直接代入求解。
- 若 $\lambda$ **是特征根的单重解**，需乘 $x$：
  $$
  y_p = x e^{\lambda x} [ R_l(x) \cos \omega x + S_n(x) \sin \omega x ]
  $$
- 若 $\lambda$ **是特征根的二重解**，需乘 $x^2$：
  $$
  y_p = x^2 e^{\lambda x} [ R_l(x) \cos \omega x + S_n(x) \sin \omega x ]
  $$

---

##### **第三步：写出通解**
通解由**齐次解**和**特解**之和给出：
$$
y = y_h + y_p
$$
其中：
- $y_h$ 是齐次解（包含两个待定常数）。
- $y_p$ 是特解（已经完全确定）。

---
##### 示例1
###### **题目**  
求解微分方程：
$$
y'' - 5y' + 6y = x e^{2x}
$$

---


###### **1. 求齐次方程通解**  
齐次方程：
$$
y'' - 5y' + 6y = 0
$$
特征方程：
$$
r^2 - 5r + 6 = 0 \quad \Rightarrow \quad r_1 = 2, \quad r_2 = 3
$$
通解：
$$
y_h = C_1 e^{2x} + C_2 e^{3x}
$$

---

###### **2. 求非齐次方程的特解**  
非齐次项 $f(x) = x e^{2x}$，其中 $\lambda = 2$ 是特征方程的单根，因此设：
$$
y^* = x (b_0 x + b_1) e^{2x}
$$
代入方程，整理得：
$$
-2b_0 x + 2b_0 - b_1 = x
$$
比较系数：
$$
\begin{cases}
-2b_0 = 1 \\
2b_0 - b_1 = 0
\end{cases}
$$
解得：
$$
b_0 = -\frac{1}{2}, \quad b_1 = -1
$$
所以特解为：
$$
y^* = x \left(-\frac{1}{2} x - 1\right) e^{2x}
$$

---

###### **3. 写出通解**  
$$
y = C_1 e^{2x} + C_2 e^{3x} - \frac{1}{2} (x^2 + 2x) e^{2x}
$$





# 10 多重积分
## 10.2 二重积分的计算法

### 10.2.1 直角坐标计算二重积分

$\iint\limits_{D} f(x,y) \mathrm{d}\sigma = \int_{a}^{b} \mathrm{d}x \int_{\varphi_{1}(x)}^{\varphi_{2}(x)} f(x,y) \mathrm{d}y$

+ 图示理解直角坐标系计算二重积分：![[4907f757cacc5f23b666fa4bb96598cd.jpg]]

# 11 曲线积分和曲面积分

## 1. 标量场的曲线积分

对于标量场 $f(x, y, z)$，曲线积分可以表示为：

$$
\int_C f(x, y, z) \, \mathrm{d}s
$$

其中，$\mathrm{d}s$ 是曲线上的微小弧长元素。对于参数化的曲线，弧长微分 $\mathrm{d}s$ 可以表示为：

$$
\mathrm{d}s = \left\| \frac{\mathrm{d}\vec{r}}{\mathrm{d}t} \right\| \, \mathrm{d}t
$$

因此，曲线积分变为：

$$
\int_C f(x, y, z) \, \mathrm{d}s = \int_a^b f(x(t), y(t), z(t)) \left\| \frac{\mathrm{d}\vec{r}}{\mathrm{d}t} \right\| \, \mathrm{d}t
$$

其中，$\frac{\mathrm{d}\vec{r}}{\mathrm{d}t} = \left( \frac{dx}{dt}, \frac{dy}{dt}, \frac{dz}{dt} \right)$ 是曲线的速度向量，$\left\| \frac{\mathrm{d}\vec{r}}{\mathrm{d}t} \right\|$ 是它的模长，即曲线上的微小长度元素。

## 2. 向量场的曲线积分
![[Pasted image 20241212152936.png]]
对于向量场 $\vec{F} = (P(x, y, z), Q(x, y, z), R(x, y, z))$，沿着曲线 $C$ 的曲线积分可以表示为：

$$
\int_C \vec{F} \cdot \mathrm{d}\vec{r} = \int_a^b \left[ P(x(t), y(t), z(t)) \frac{dx}{dt} + Q(x(t), y(t), z(t)) \frac{dy}{dt} + R(x(t), y(t), z(t)) \frac{dz}{dt} \right] \, \mathrm{d}t
$$

其中，$\mathrm{d}\vec{r} = (dx, dy, dz)$ 是沿着曲线的微小位移。

### 计算方法

- 将曲线用参数方程表示，曲线积分可以转化为对参数 $t$ 的积分。
- 对应的向量场分量函数（$P, Q, R$）在曲线的参数化下代入。
- 计算对应的速度分量（$\frac{dx}{dt}, \frac{dy}{dt}, \frac{dz}{dt}$），并进行积分。

## 3. 参数方程下的曲线积分

当曲线用参数方程表示时，曲线积分可以转化为对参数 $t$ 的积分。设曲线 $C$ 由参数方程 $\vec{r}(t) = (x(t), y(t), z(t))$ 给出，其中 $t$ 取值区间为 $[a, b]$。

- 对于标量场的曲线积分：

$$
\int_C f(x, y, z) \, \mathrm{d}s = \int_a^b f(x(t), y(t), z(t)) \left\| \frac{\mathrm{d}\vec{r}}{\mathrm{d}t} \right\| \, \mathrm{d}t
$$

- 对于向量场的曲线积分：

$$
\int_C \vec{F} \cdot \mathrm{d}\vec{r} = \int_a^b \left[ P(x(t), y(t), z(t)) \frac{dx}{dt} + Q(x(t), y(t), z(t)) \frac{dy}{dt} + R(x(t), y(t), z(t)) \frac{dz}{dt} \right] \, \mathrm{d}t
$$
## 11.6 高斯定理与通量、散度

### 1. **高斯定理的定义**

高斯定理（散度定理）是一个数学定理，描述了矢量场在体积和其边界之间的关系：

> 某闭曲面包含空间内流量的散度(即某一点“源”或“汇”的强度)=流出该闭曲面的流量和曲面法向量的点积之和
 
$$
\iiint_V (\nabla \cdot \vec{F}) \, \mathrm{d}V = \oint_{\partial V} \vec{F} \cdot \mathrm{d}\vec{A}
$$
$$
\iiint_{V} (\nabla \cdot \mathbf{F}) \, dV = \iint_{\partial V} \mathbf{F} \cdot \mathbf{n} \, dS 
$$
$$
\iiint_{V} (\nabla \cdot \mathbf{F}) \, dV = \iint_{\partial V} \mathbf{F} \cdot  d\mathbf{S} 
$$
#### 含义：
1. **左侧**：体积 $V$ 内矢量场 $\vec{F}$ 的散度的三重积分。
2. **右侧**：矢量场 $\vec{F}$ 在体积 $V$ 的边界 $\partial V$ 上的通量总和。

高斯定理表明，**体积内的源或汇的总强度等于边界表面的净通量**。

---

### 2. **通量的定义**
通量描述了<mark style="background: #BBFABBA6;">矢量场穿过一个表面的总“流量”</mark>，公式为：

$$
\Phi = \iint_S \vec{F} \cdot \mathrm{d}\vec{A}
$$

#### 含义：
- $\vec{F}$：矢量场（如电场 $\vec{E}$、速度场 $\vec{v}$ 等）。
- $\mathrm{d}\vec{A}$：微小面积的法向矢量，方向垂直于面积。
- $\vec{F} \cdot \mathrm{d}\vec{A}$：矢量场在面积法向方向的分量。

通量表示矢量场“流出”或“流入”该表面的强度。

---

### 3. **散度的定义**
散度是<mark style="background: #BBFABBA6;">矢量场在某一点的“源”或“汇”的强度</mark>，是一个标量量，定义为：

$$
\nabla \cdot \vec{F} = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y} + \frac{\partial F_z}{\partial z}
$$

#### 含义：
- **正散度**：表示该点附近矢量场是“源”（流出为主）。
- **负散度**：表示该点附近矢量场是“汇”（流入为主）。
- **零散度**：表示该点附近无净流入或流出。

##### 几何意义：
散度描述了矢量场线的“发散”程度。例如：
- **点电荷**的电场：正电荷为正散度，负电荷为负散度。
- **不可压缩流体**的速度场：散度为零。

---

### 4. **高斯定理与通量、散度的关系**
通过高斯定理，通量和散度之间的关系可以统一起来：
1. **局部（点）描述**：散度 $\nabla \cdot \vec{F}$ 表示场在某点的净流出或净流入强度。
2. **整体描述**：通量 $\Phi = \oint_{\partial V} \vec{F} \cdot \mathrm{d}\vec{A}$ 是整个边界上的流量。
3. **高斯定理桥接二者**：
   $$
   \iiint_V (\nabla \cdot \vec{F}) \, \mathrm{d}V = \oint_{\partial V} \vec{F} \cdot \mathrm{d}\vec{A}
   $$

---

### 5. **物理意义与应用**
#### **电磁学中的应用**
1. **高斯定律（电场）**：
   $$
   \oint_S \vec{E} \cdot \mathrm{d}\vec{A} = \frac{Q_{\text{enc}}}{\epsilon_0}
   $$
 


# 7 环量、旋度与斯托克斯公式

## 7.1 环量
**定义**：  
环量是一个场在闭合路径 $C$ 上的线积分，用来表示场沿路径的累积作用。  
数学表达式为：
$$
\oint_C \vec{F} \cdot \mathrm{d}\vec{r}
$$

---

## 7.2 旋度
**定义**：  
旋度表示矢量场的局部旋转性质，是矢量场的一个偏导数操作。  
数学表达式为：
$$
\vec{\nabla} \times \vec{F}
$$

行列式计算方法为：

$$

\vec{\nabla} \times \vec{F} =

\begin{vmatrix}

\hat{i} & \hat{j} & \hat{k} \\

\frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\

F_x & F_y & F_z

\end{vmatrix}

$$

结果是一个矢量

**几何意义**：  
旋度是单位面积内环量的极限，方向由右手法则决定。

---

## 7.3 斯托克斯公式
**定义**：  
	斯托克斯公式在三维空间中表述了环量与旋度通量的关系
表达式为：
$$
\iint_S (\vec{\nabla} \times \vec{F}) \cdot \mathrm{d}\vec{S} = \oint_C \vec{F} \cdot \mathrm{d}\vec{r}  
$$
- 左侧是旋度穿过曲面 $S$ 的通量。
- 右侧是沿路径 $C$ 的环量。

行列式的形式：

$$
\iint_\Sigma 
\begin{vmatrix} 
\mathrm{d}y \mathrm{d}z & \mathrm{d}z \mathrm{d}x & \mathrm{d}x \mathrm{d}y \\ 
\frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ 
P & Q & R 
\end{vmatrix}
= \oint_{\partial \Sigma} P \, \mathrm{d}x + Q \, \mathrm{d}y + R \, \mathrm{d}z
$$

展开后可以表示为：

$$
\iint_\Sigma \left( 
\left( \frac{\partial R}{\partial y} - \frac{\partial Q}{\partial z} \right) \mathrm{d}y \mathrm{d}z + 
\left( \frac{\partial P}{\partial z} - \frac{\partial R}{\partial x} \right) \mathrm{d}z \mathrm{d}x + 
\left( \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} \right) \mathrm{d}x \mathrm{d}y 
\right)
$$

$$
=\oint_{\partial \Sigma} P \, \mathrm{d}x + Q \, \mathrm{d}y + R \, \mathrm{d}z
$$
- 左侧是旋度穿过曲面 $\Sigma$ 的通量。
- 右侧是沿路径 $\partial \Sigma$ 的环量。


---

## 7.4 电磁学中的三维例子
### 背景
假设一个磁场为：
$$
\vec{B} = -y \hat{i} + x \hat{j} + z^2 \hat{k}
$$
我们分析：
1. 磁场在 **路径 $C$** 上的环量。
2. 磁场的 **旋度**。
3. 验证斯托克斯公式。

### 场景描述
- 曲面 $S$ 是半径为 $R$，位于 $z = 0$ 平面的圆盘。
- 闭合路径 $C$ 是圆盘边界，沿逆时针方向。

---

### 环量计算
环量为：
$$
\oint_C \vec{B} \cdot \mathrm{d}\vec{r}
$$

1. **路径参数化**：  
   $$
   \vec{r}(\theta) = R \cos\theta \, \hat{i} + R \sin\theta \, \hat{j}
   $$
   $$
   \mathrm{d}\vec{r} = -R\sin\theta \, \hat{i} + R\cos\theta \, \hat{j} \, \mathrm{d}\theta
   $$

2. **磁场分量**：  
   在路径上：
   $$
   \vec{B} = -R\sin\theta \, \hat{i} + R\cos\theta \, \hat{j}
   $$

3. **路径积分**：  
   $$
   \oint_C \vec{B} \cdot \mathrm{d}\vec{r} = \int_0^{2\pi} \big[ (-R\sin\theta)(-R\sin\theta) + (R\cos\theta)(R\cos\theta) \big] \, \mathrm{d}\theta
   $$
   $$
   = \int_0^{2\pi} \big(R^2\sin^2\theta + R^2\cos^2\theta \big) \, \mathrm{d}\theta
   $$
   $$
   = R^2 \int_0^{2\pi} 1 \, \mathrm{d}\theta = 2\pi R^2
   $$

---

### 旋度计算
旋度为：
$$
\vec{\nabla} \times \vec{B}
$$

使用行列式计算旋度：
$$
\vec{\nabla} \times \vec{B} =
\begin{vmatrix}
\hat{i} & \hat{j} & \hat{k} \\
\frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\
-y & x & z^2
\end{vmatrix}
$$

展开行列式：
$$
\vec{\nabla} \times \vec{B} = \hat{i} \left(\frac{\partial z^2}{\partial y} - \frac{\partial x}{\partial z}\right) 
- \hat{j} \left(\frac{\partial z^2}{\partial x} - \frac{\partial (-y)}{\partial z}\right) 
+ \hat{k} \left(\frac{\partial x}{\partial y} - \frac{\partial (-y)}{\partial x}\right)
$$
计算得到：
$$
\vec{\nabla} \times \vec{B} = \hat{i} (0 - 0) - \hat{j} (0 - 0) + \hat{k} (1 - (-1))
$$
$$
\vec{\nabla} \times \vec{B} = 2 \hat{k}
$$

---

### 验证斯托克斯公式
1. **旋度通量**：  
   通过曲面 $S$ 的旋度通量为：
   $$
   \iint_S (\vec{\nabla} \times \vec{B}) \cdot \mathrm{d}\vec{S}
   $$
   $$
   \mathrm{d}\vec{S} = \hat{k} \, \mathrm{d}A
   $$
   $$
   \iint_S (0, 0, 2) \cdot (0, 0, 1) \, \mathrm{d}A = 2 \iint_S \mathrm{d}A = 2 \pi R^2
   $$

2. **路径环量**：  
   前面已计算，路径环量为：
   $$
   \oint_C \vec{B} \cdot \mathrm{d}\vec{r} = 2 \pi R^2
   $$

3. **验证公式**：  
   根据斯托克斯公式：
   $$
   \oint_C \vec{B} \cdot \mathrm{d}\vec{r} = \iint_S (\vec{\nabla} \times \vec{B}) \cdot \mathrm{d}\vec{S}
   $$
   左右两边均为 $2 \pi R^2$，验证成立。


# 12 无穷级数  

## 12.1 常数项级数的概念和性质
### 12.1.1 常数项级数的概念
- **无穷级数的定义**：  
  若 $\{a_n\}$ 是一个数列，$\sum_{n=1}^\infty a_n$ 表示其对应的无穷级数。  
- **部分和**：  
  定义无穷级数的部分和为  
  $$ S_n = \sum_{k=1}^n a_k $$  
  若 $\lim_{n \to \infty} S_n$ 存在，则称 $\sum_{n=1}^\infty a_n$ **收敛**，否则称为**发散**。  
- **收敛级数的性质**：  
  1. 收敛级数的通项 $\{a_n\}$ 必须趋于 0。  
  2. 级数的线性运算：若 $\sum a_n$ 和 $\sum b_n$ 收敛，则 $c \sum a_n + d \sum b_n$ 也收敛（$c, d$ 为常数）。  

## 12.2 常数项级数的审敛法  

### 12.2.1 正项级数及其审敛法  
正项级数是所有项 $a_n \geq 0$ 的无穷级数。  

#### 比较审敛法  
- 若 $a_n \geq 0, b_n \geq 0$ 且存在正常数 $M$，使得 $a_n \leq b_n$，则：  
  1. 若 $\sum b_n$ 收敛，则 $\sum a_n$ 收敛。  
  2. 若 $\sum a_n$ 发散，则 $\sum b_n$ 发散。  

#### 比较审敛法的极限形式  
- 若 $\lim_{n \to \infty} \frac{a_n}{b_n} = c$，其中 $c \in (0, \infty)$，则 $a_n$ 与 $b_n$ 具有相同的敛散性。  

#### 比值审敛法  
- 若 $\lim_{n \to \infty} \frac{a_{n+1}}{a_n} = L$：  
  1. 若 $L < 1$，则 $\sum a_n$ 收敛。  
  2. 若 $L > 1$ 或 $L = \infty$，则 $\sum a_n$ 发散。  
  3. 若 $L = 1$，无法判断。  

#### 根值审敛法  
- 若 $\lim_{n \to \infty} \sqrt[n]{a_n} = L$：  
  1. 若 $L < 1$，则 $\sum a_n$ 收敛。  
  2. 若 $L > 1$ 或 $L = \infty$，则 $\sum a_n$ 发散。  
  3. 若 $L = 1$，无法判断。  

### 12.2.2 交错级数及其审敛法  
交错级数是符号交替变化的级数，通常可表示为  
$$ \sum_{n=1}^\infty (-1)^{n-1} a_n, \quad a_n > 0 。$$  

#### 莱布尼茨定理  
若 $\{a_n\}$ 满足以下条件：  
1. $a_n > 0$；  
2. $a_n$ 单调递减；  
3. $\lim_{n \to \infty} a_n = 0$，  
则交错级数 $\sum_{n=1}^\infty (-1)^{n-1} a_n$ 收敛。  

#### 绝对收敛和条件收敛  
- 若 $\sum |a_n|$ 收敛，则称 $\sum a_n$ **绝对收敛**，绝对收敛的级数一定收敛。  
- 若 $\sum a_n$ 收敛但 $\sum |a_n|$ 发散，则称 $\sum a_n$ **条件收敛**。  

## 12.3 幂级数  
### 12.3.1 幂级数的概念
形式为 $\sum_{n=0}^\infty c_n (x-a)^n$ 的级数称为幂级数。  

### 12.3.2 幂级数及其敛散性
- 阿贝尔定理：若幂级数在某点 $x = x_0$ 收敛，则在以 $a$ 为中心、$|x - a| < |x_0 - a|$ 的开区间内必收敛。  

#### 比值法求收敛半径  
令 $R = \lim_{n \to \infty} \frac{|c_n|}{|c_{n+1}|}$，则幂级数的收敛半径为 $R$。  

#### 根值法求收敛半径  
令 $R = \frac{1}{\limsup_{n \to \infty} \sqrt[n]{|c_n|}}$，则幂级数的收敛半径为 $R$。  

## 12.4 函数展开成幂级数
## 12.7 傅立叶级数
### 12.7.1 三角级数和三角级数的正交性
#### 与线性代数向量正交性的关系

三角函数里的正交性和线性代数里的正交向量有没有联系？




##### 一、核心统一：正交性的本质——内积为零
无论是线性代数的向量，还是三角函数（函数空间的“元素”），**正交的定义完全一致**：两个对象的“内积”等于零。内积是衡量两个对象“相关性”的数学工具，内积为零意味着二者“完全无关”，这是正交性的本质。

###### 1. 内积的统一形式
内积需满足“正定性”“对称性”“线性性”三大公理，向量内积和三角函数内积是公理在不同空间的具体实现：
- **有限维向量空间（线性代数）**：  
  对n维向量 $\boldsymbol{u} = (u_1, u_2, ..., u_n)$ 和 $\boldsymbol{v} = (v_1, v_2, ..., v_n)$，内积是**离散求和**：  
  $$\langle \boldsymbol{u}, \boldsymbol{v} \rangle = u_1v_1 + u_2v_2 + ... + u_nv_n = \sum_{i=1}^n u_i v_i$$  
  例：二维向量 $\boldsymbol{u}=(1,0)$ 和 $\boldsymbol{v}=(0,1)$，内积 $1×0 + 0×1 = 0$，故正交（平面直角坐标系的x轴、y轴单位向量）。

- **无穷维函数空间（三角函数）**：  
  对区间 $[a,b]$ 上的函数 $f(x)$ 和 $g(x)$，内积是**连续积分**（可理解为“无穷多个离散点的求和”）：  
  $$\langle f, g \rangle = \int_{a}^{b} f(x) g(x) dx$$  
  例：三角函数 $\sin(nx)$ 和 $\cos(mx)$ 在区间 $[-\pi, \pi]$ 上，当 $n,m$ 为正整数时，内积 $\int_{-\pi}^{\pi} \sin(nx)\cos(mx)dx = 0$，故正交。


##### 二、核心联系：“基”与“分解”的统一逻辑
正交性的核心用途是“构建基、实现分解”——无论是向量还是函数，都能通过正交基分解为“互不干扰”的分量，这是两者最深刻的联系。

###### 1. 有限维向量空间（线性代数）
- **正交基**：如标准正交基 $\boldsymbol{e}_1=(1,0,...,0), \boldsymbol{e}_2=(0,1,...,0), ..., \boldsymbol{e}_n=(0,0,...,1)$，满足 $\langle \boldsymbol{e}_i, \boldsymbol{e}_j \rangle = 0$（$i≠j$），且 $\langle \boldsymbol{e}_i, \boldsymbol{e}_i \rangle = 1$（单位长度）。
- **向量分解**：任何n维向量 $\boldsymbol{u}$ 都能唯一分解为正交基的线性组合：  
  $$\boldsymbol{u} = c_1\boldsymbol{e}_1 + c_2\boldsymbol{e}_2 + ... + c_n\boldsymbol{e}_n$$  
  其中系数 $c_i = \langle \boldsymbol{u}, \boldsymbol{e}_i \rangle$（向量在基 $\boldsymbol{e}_i$ 上的“投影”），且分量之间互不干扰（因基正交）。

##### 2. 无穷维函数空间（三角函数）
- **正交基函数**：三角函数系 $\{1, \cos(x), \sin(x), \cos(2x), \sin(2x), ...\}$ 在区间 $[-\pi, \pi]$ 上是正交基，满足：  
  - $\int_{-\pi}^{\pi} 1×\cos(nx)dx = 0$（常数项与余弦函数正交）；  
  - $\int_{-\pi}^{\pi} \sin(nx)\cos(mx)dx = 0$（正弦与余弦正交）；  
  - $\int_{-\pi}^{\pi} \sin(nx)\sin(mx)dx = 0$（$n≠m$ 时，正弦与正弦正交）；  
  - $\int_{-\pi}^{\pi} \cos(nx)\cos(mx)dx = 0$（$n≠m$ 时，余弦与余弦正交）。  
- **函数分解（傅里叶级数）**：任何周期为 $2\pi$ 的“性质良好”函数 $f(x)$，都能唯一分解为三角函数基的线性组合：  
  $$f(x) = \frac{a_0}{2} + \sum_{n=1}^{\infty} \left[ a_n\cos(nx) + b_n\sin(nx) \right]$$  
  其中系数 $a_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\cos(nx)dx$、$b_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\sin(nx)dx$，本质是函数在正交基 $\cos(nx)$、$\sin(nx)$ 上的“投影”——与向量分解的系数公式完全对应！


##### 三、核心区别：有限维 vs 无穷维的“量变到质变”
虽然本质统一，但空间维度的差异导致了具体性质的区别，核心是“离散”与“连续”、“有限项”与“无穷项”的差异：

| 对比维度 | 线性代数（正交向量）       | 三角函数（正交函数）       |
| ---- | ---------------- | ---------------- |
| 空间维度 | 有限维（n维，n为正整数）    | 无穷维（基函数有无穷多个）    |
| 内积计算 | 离散求和（有限项）        | 连续积分（无穷项的“极限求和”） |
| 分解形式 | 有限项线性组合（唯一确定）    | 无穷项级数（需考虑收敛性）    |
| 几何意义 | 直观（如三维空间的“垂直”）   | 抽象（函数空间的“无关性”）   |
| 典型应用 | 向量投影、方程组求解、PCA降维 | 信号分解（傅里叶分析）、图像处理 |


##### 四、直观类比：把函数看作“无穷维向量”
为了更好理解，可以做一个通俗类比：
- 有限维向量：如“3个数字组成的向量”，可以看作“3个离散点的信息”（如三维空间的坐标）；  
- 函数：如“区间 $[a,b]$ 上的 $f(x)$”，可以看作“无穷多个离散点的信息”（每个 $x$ 对应一个 $f(x)$，即“无穷维向量的分量”）；  
- 三角函数正交：相当于“无穷维向量的两个分量完全无关”，因此用它们构建的“基”能无重叠地分解任何函数（就像用x轴、y轴分解平面向量一样）。


##### 总结：数学概念的“一致性”魅力
三角函数的正交性并非独立于线性代数的新概念，而是**正交性在无穷维函数空间的自然推广**——两者共享“内积为零”的定义核心，共享“正交基分解”的应用逻辑，只是因空间维度（有限/无穷）的差异，表现为“离散求和”与“连续积分”的不同形式。

这种“从有限到无穷、从离散到连续”的概念延伸，正是数学理论的统一性所在：看似不同的分支（线性代数、傅里叶分析），实则由同一套逻辑串联，这也是理解高深数学（如泛函分析，专门研究无穷维空间）的关键基础。



### 12.7.2 周期为$2l$的函数展开成傅里叶级数
####  周期为$2l$的函数展开成傅里叶级数公式
对一个==周期为2l==的==周期函数==，傅立叶级数是将一个周期函数用正弦函数和余弦函数的无穷级数表示的形式，定义为：

$$
f(x) = \frac{a_0}{2} + \sum_{n=1}^\infty \left( a_n \cos\frac{n\pi x}{l} + b_n \sin\frac{n\pi x}{l} \right)
$$

其中：
- $2l$：函数的周期；
- $a_0$、$a_n$、$b_n$：傅立叶系数，通过下列公式计算：

$$
a_0 = \frac{1}{l} \int_{-l}^{l} f(x) dx
$$

$$
a_n = \frac{1}{l} \int_{-l}^{l} f(x) \cos\frac{n\pi x}{l} dx
$$

$$
b_n = \frac{1}{l} \int_{-l}^{l} f(x) \sin\frac{n\pi x}{l} dx
$$
#### 示例1：将方波信号作傅里叶级数展开

1. 将方波信号展开陈给傅里叶级数的效果图：
![[Pasted image 20250302164539.png]]

2. 代码：[[Python for math#周期函数展开成傅里叶级数]]
3. 错误地进行奇延拓后得到的结果[[Calculus#示例4：正确的奇延拓展开出了错误的结果]]
---

### 12.7.2 <mark style="background: #ADCCFFA6;">非周期</mark>函数展开成傅里叶级数
#### ==目的==
+ 对于一个$0$到$l$上的非周期函数，想进行傅里叶展开
+ 例子：假设一个非周期信号 f(t) 表示为某设备的振动位移数据，在时间$[0,T]$内采集到了数据。可以使用傅里叶级数可以分析振动的主要频率成分，从而判断设备是否存在异常频率。
#### 手段：作奇延拓或偶延拓出现周期$2l$
- **奇延拓**：将定义在 $[0, l]$ 上的函数 $f(x)$ 扩展到 $[-l, l]$，使得扩展后的函数 $F(x)$ 满足奇函数的性质：
  $$
  F(x) = \begin{cases} 
  f(x), & 0 \leq x \leq l \\
  -f(-x), & -l \leq x < 0
  \end{cases}
  $$
  奇延拓后，$F(x)$ 展开为傅立叶正弦级数。

- **偶延拓**：将定义在 $[0, l]$ 上的函数 $f(x)$ 扩展到 $[-l, l]$，使得扩展后的函数 $F(x)$ 满足偶函数的性质：
  $$
  F(x) = \begin{cases} 
  f(x), & 0 \leq x \leq l \\
  f(-x), & -l \leq x < 0
  \end{cases}
  $$
  偶延拓后，$F(x)$ 展开为傅立叶余弦级数。

---

#### 奇延拓的傅立叶正弦级数公式
如果 $f(x)$ 在 $[0, l]$ 上定义为某函数，其奇延拓后可以展开为：
$$
f(x) = \sum_{n=1}^\infty b_n \sin \frac{n\pi x}{l}
$$

其中：
$$
b_n = \frac{2}{l} \int_{0}^{l} f(x) \sin \frac{n\pi x}{l} dx
$$

---

#### 偶延拓的傅立叶余弦级数公式
如果 $f(x)$ 在 $[0, l]$ 上定义为某函数，其偶延拓后可以展开为：
$$
f(x) = \frac{a_0}{2} + \sum_{n=1}^\infty a_n \cos \frac{n\pi x}{l}
$$

其中：
$$
a_0 = \frac{2}{l} \int_{0}^{l} f(x) dx
$$

$$
a_n = \frac{2}{l} \int_{0}^{l} f(x) \cos \frac{n\pi x}{l} dx
$$

---

#### 奇延拓与偶延拓的差异
对于不同的函数，奇延拓与偶延拓所得到的傅立叶级数展开可能不同：
1. **常数函数**（如 $f(x) = C$）：
   - 奇延拓结果为 $0$；
   - 偶延拓结果为 $C$；
   - 原因：奇延拓中正弦项的积分为 $0$，而偶延拓中余弦项保留常数。

2. **非对称函数**（如 $f(x) = x^2$）：
   - 奇延拓强调正弦项；
   - 偶延拓强调余弦项。

3. **对称性函数**：
   - 若 $f(x)$ 在 $[0, l]$ 上是奇函数，则奇延拓后傅立叶正弦级数等于原函数；
   - 若 $f(x)$ 在 $[0, l]$ 上是偶函数，则偶延拓后傅立叶余弦级数等于原函数。

---

#### 示例1：$f(x) = C$ 在 $[0, l]$ 上的奇延拓和偶延拓后的傅里叶级数展开

##### 奇延拓
1. **延拓函数定义**：  
   将 $f(x) = C$，$x \in [0, l]$ 进行奇延拓，得到 $F(x)$：
   $$
   F(x) =
   \begin{cases}
   C, & 0 < x \leq l \\
   0, & x = 0 \\
   -C, & -l \leq x < 0
   \end{cases}
   $$
2. **傅里叶系数计算**：
   - $a_0 = \frac{1}{l} \int_{-l}^{l} F(x)dx = 0$
   - $a_n = \frac{1}{l} \int_{-l}^{l} F(x) \cos\frac{n\pi x}{l}dx = 0$，$n = 1,2,\cdots$
   - $b_n = \frac{1}{l} \int_{-l}^{l} F(x) \sin\frac{n\pi x}{l}dx = \frac{2}{l} \int_{0}^{l} C\sin\frac{n\pi x}{l}dx = \frac{2C}{n\pi}(1 - \cos n\pi)$

   当 $n = 2k$（$k\in \mathbb{Z}$）时，$b_{2k} = 0$；  
   当 $n = 2k + 1$（$k\in \mathbb{Z}$）时，$b_{2k + 1} = \frac{4C}{(2k + 1)\pi}$。

3. **傅里叶级数展开结果**：
   $$
   f(x) = \frac{4C}{\pi} \sum_{k = 0}^{\infty} \frac{1}{2k + 1} \sin\frac{(2k + 1)\pi x}{l}
   $$

##### 偶延拓
1. **延拓函数定义**：  
   把 $f(x) = C$，$x\in[0,l]$ 进行偶延拓，得到 $G(x)$：
   $$
   G(x) = C, \quad -l \leq x \leq l
   $$
2. **傅里叶系数计算**：
   - $a_0 = \frac{1}{l} \int_{-l}^{l} G(x)dx = 2C$
   - $a_n = \frac{2}{l} \int_{0}^{l} C\cos\frac{n\pi x}{l}dx = \frac{2C}{n\pi} \sin n\pi = 0$，$n = 1,2,\cdots$
   - $b_n = \frac{1}{l} \int_{-l}^{l} G(x) \sin\frac{n\pi x}{l}dx = 0$，$n = 1,2,\cdots$

3. **傅里叶级数展开结果**：
   $$
   f(x) = C + \frac{2C}{\pi} \sum_{n = 1}^{\infty} \frac{0\times\cos\frac{n\pi x}{l}+0\times\sin\frac{n\pi x}{l}}{1} = C
   $$
   即函数本身。

---

#### 示例 2：$f(x) = x$ 在 $[0, \pi]$ 上的奇延拓和偶延拓
1. **奇延拓**：
   $$
   f(x) = 2 \sum_{n=1}^\infty \frac{(-1)^{n+1}}{n} \sin n x
   $$

2. **偶延拓**：
   $$
   f(x) = \frac{\pi}{2} - \frac{4}{\pi} \sum_{k=1}^\infty \frac{1}{(2k-1)^2} \cos (2k-1) x
   $$

---
#### 示例3：画图理解奇延拓和偶延拓是==逼近函数==的==不同方式==

1. $f(x)=x,x>0$分别用奇延拓和偶延拓否，再展开成傅里叶级数的效果：

![[Pasted image 20250302160937.png]]

1. 代码：[[Python for math#傅里叶变换的奇延拓和偶延拓]]

#### 示例4：正确的奇延拓展开出了错误的结果

1. 将方波信号展开陈给傅里叶级数的效果图：
![[right_odd _extension_but _wrong_answer.png]]
2. 代码:
#### 总结
1. 奇延拓得到傅立叶正弦级数，仅包含正弦项；
2. 偶延拓得到傅立叶余弦级数，仅包含余弦项；
3. 延拓方式影响傅立叶级数展开的形式，但在原定义区间内的结果与原函数一致。
复变函数中的级数也要用到这些内容[[复变函数#4 无穷级数（复数范围）]]
# 易错点
21. 定积分换元积分法可能要换上下限
# 附录
## 希腊公式latex表

| 大写符号 | LaTeX 写法   | 小写符号 | LaTeX 写法    |
| ---- | ---------- | ---- | ----------- |
| Α    | `A`        | α    | `\alpha`    |
| Β    | `B`        | β    | `\beta`     |
| Γ    | `\Gamma`   | γ    | `\gamma`    |
| Δ    | `\Delta`   | δ    | `\delta`    |
| Ε    | `E`        | ε    | `\epsilon`  |
| Ζ    | `Z`        | ζ    | `\zeta`     |
| Η    | `H`        | η    | `\eta`      |
| Θ    | `\Theta`   | θ    | `\theta`    |
|      |            | ϑ    | `\vartheta` |
| Ι    | `I`        | ι    | `\iota`     |
| Κ    | `K`        | κ    | `\kappa`    |
| Λ    | `\Lambda`  | λ    | `\lambda`   |
| Μ    | `M`        | μ    | `\mu`       |
| Ν    | `N`        | ν    | `\nu`       |
| Ξ    | `\Xi`      | ξ    | `\xi`       |
| Ο    | `O`        | ο    | `o`         |
| Π    | `\Pi`      | π    | `\pi`       |
|      |            | ϖ    | `\varpi`    |
| Ρ    | `P`        | ρ    | `\rho`      |
|      |            | ϱ    | `\varrho`   |
| Σ    | `\Sigma`   | σ    | `\sigma`    |
|      |            | ς    | `\varsigma` |
| Τ    | `T`        | τ    | `\tau`      |
| Υ    | `\Upsilon` | υ    | `\upsilon`  |
| Φ    | `\Phi`     | φ    | `\phi`      |
|      |            | ϕ    | `\varphi`   |
| Χ    | `X`        | χ    | `\chi`      |
| Ψ    | `\Psi`     | ψ    | `\psi`      |
| Ω    | `\Omega`   | ω    | `\omega`    |
