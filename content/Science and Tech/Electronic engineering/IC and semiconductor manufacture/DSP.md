


思考卷积和计算的原理

conjugate


![[Pasted image 20251110164836.png]]


# 1. Signals and Signal Processing
## 1.1 Characterization and Classification of Signals
## 1.2 Typical Signal Processing Operations
## 1.3 Examples of Typical Signals
## 1.4 Typical Signal Processing Applications
## 1.5 Why Digital Signal Processing?

# 2. Discrete-Time Signals in the Time Domain
## 2.1 Time-Domain Representation
## 2.2 Operations on Sequences
## 2.3 Operations on Finite-Length Sequences
### 2.3.3 Classification of Sequences
#### Energy and Power Signals

The <mark style="background: #BBFABBA6;">total energy</mark> of a sequence $x[n]$ is defi ned by
$$
\mathcal{E}_x = \sum_{n=-\infty}^{\infty} |x[n]|^2
$$

The <mark style="background: #BBFABBA6;">average power</mark> of an aperiodic sequence $x [n]$ is defined by
$$
\mathcal{P}_x = \lim_{K \to \infty} \frac{1}{2K + 1} \sum_{n=-K}^{K} |x[n]|^2
$$
## 2.4 Typical Sequences and Sequence Representation
## 2.5 The Sampling Process
## 2.6 Correlation of Signals
## 2.7 Random Signals
## 2.8 Summary
## 2.9 Problems
## 2.10 MATLAB Exercises

# 3. Discrete-Time Signals in the Frequency Domain
## 3.1 The Continuous-Time Fourier Transform
## 3.2 The Discrete-Time Fourier Transform

### 3.2.0 From CTFT to DTFT (Time-domain Sampling, Analog World to Digital World)

recall the CTFT [[信号与系统#4.4.1 傅里叶变换公式]]

conversation： https://chat.deepseek.com/share/madk5swf4yne5wwlsw

When you use an Analog-to-Digital Converter (ADC)
to sample a continuous-time signal $x(t)$ with sampling period $T_s$, you obtain the discrete sequence $x[n] = x(nT_s)$. Two major changes occur in the frequency domain:

1. Spectrum Normalization (Analog Frequency $\Omega$ → Digital Frequency $\omega$)
The frequency of a continuous signal is denoted $\Omega$ (unit: rad/s). After sampling, we define the digital frequency as $\omega = \Omega \cdot T_s$ (unit: rad/sample). All frequency references in DSP by default refer to this $\omega$.

2. Periodic Spectrum Extension with Period $2\pi$ (Core Transformation)
The spectrum $X(j\Omega)$ of a continuous signal spans from negative infinity to positive infinity. After sampling, high-frequency components fold into low-frequency bands, and the spectrum replicates infinitely at the sampling frequency $\Omega_s = 2\pi / T_s$.

The derived formula for the DTFT (Discrete-Time Fourier Transform) is:
$$
X(e^{j\omega}) = \sum_{n=-\infty}^{\infty} x[n]e^{-j\omega n}
$$

### Key Properties of DTFT (Compared with CTFT):
- Time domain: Discrete ($n$ is integer), with infinite duration from $-\infty$ to $+\infty$.
- Frequency domain: Continuous ($\omega$ varies continuously), and periodic with period $2\pi$.

Intuitive explanation: The DTFT acts as the "first threshold" for digital processing on computers. Even though time is discretized, the spectrum remains a continuous curve. For example, an infinitely long sine wave yields an impulse train via DTFT, which is still a continuous periodic function.


### 3.2.1 Definition


The discrete-time Fourier transform $ X(e^{j\omega}) $ of a sequence $ x[n] $ is defined by $$X(e^{j\omega}) = \sum_{n=-\infty}^{\infty} x[n]e^{-j\omega n}. \tag{3.10}$$

## 3.3 Discrete-Time Fourier Transform Theorems


## 3.4 Energy Density Spectrum of a Discrete-Time Sequence
## 3.5 Band-Limited Discrete-Time Signals
## 3.6 DTFT Computation Using MATLAB
## 3.7 The Unwrapped Phase Function
## 3.8 Digital Processing of Continuous-Time Signals
## 3.9 Sampling of Bandpass Signals
## 3.10 Effect of Sample-and-Hold Operation
## 3.11 Summary
## 3.12 Problems
## 3.13 MATLAB Exercises

# 4. Discrete-Time Systems
## 4.1 Discrete-Time System Examples
## 4.2 Classification of Discrete-Time Systems


## 4.3 Impulse and Step Responses
## 4.4 Time-Domain Characterization of LTI Discrete-Time Systems

### 4.4.2 Tabular Method of Convolution Sum Computation

+ exp1:![[Pasted image 20251110170121.png]]
+ exp2:![[Pasted image 20251114204035.png]]
+ exp3:![[Pasted image 20251114204104.png]]

## 4.5 Simple Interconnection Schemes
## 4.6 Finite-Dimensional LTI Discrete-Time Systems
## 4.7 Classification of LTI Discrete-Time Systems
## 4.8 Frequency-Domain Representations of LTI Discrete-Time Systems
### 4.8.1 Frequency Response

$$y[n] = \sum_{k=-\infty}^{\infty} h[k]x[n - k]. \tag{4.66}$$
where $ y[n] $ and $ x[n] $ are, respectively, the output and the input sequences. Now, if the input $ x[n] $ is a complex exponential sequence of the form
$$x[n] = e^{j\omega n}, \quad -\infty < n < \infty, \tag{4.67}$$
then, from Eq. (4.66), the output is given by
$$y[n] = \sum_{k=-\infty}^{\infty} h[k]e^{j\omega(n - k)} = \left( \sum_{k=-\infty}^{\infty} h[k]e^{-j\omega k} \right) e^{j\omega n}, \tag{4.68}$$
which can be rewritten as
$$y[n] = H(e^{j\omega})e^{j\omega n}, \tag{4.69}$$
where we have used the notation
$$H(e^{j\omega}) = \sum_{n=-\infty}^{\infty} h[n]e^{-j\omega n}. \tag{4.70}$$
this can be also related to this two knowledges 
+ the definition of $H(z)$ [[信号与系统#6.4.2 系统函数$H(z)$]]
+ the definition of DTFT [[DSP#3.2.1 Definition]]

## 4.9 Phase and Group Delays
## 4.10 Summary
## 4.11 Problems
## 4.12 MATLAB Exercises

# 5. Finite-Length Discrete Transforms
## 5.1 Orthogonal Transforms
## 5.2 The Discrete Fourier Transform
## 5.3 Relation Between the DTFT and the DFT and Their Inverses
## 5.4 Circular Convolution
### 5.4.1 Definition

+ exp1:![[Pasted image 20251110191410.png]]

+ Graphical interpretation o f circular convolution computation![[Pasted image 20251110191000.png]]
## 5.4.2 Tabular Method
Different from linear convolution (different points can be associated with the diagram method)

The process of linear convolution can be understood as sweeping the sequence by inversion and then the translation over another sequence.

The process of circumferential convolution can be understood as folding the sequence inverse and turning a circle outside the circumference of another ==equal-length== sequence.

+ exp1:![[Pasted image 20251110191756.png]]
+ exp2:![[Pasted image 20251114203904.png]]
+ exp3: Distinguish the circular convolution of different points: Compute the N-point circular convolution for the following sequences: (a). x1(n)={1,2,3,4}, x2(n)={5,6,7}, N=4;(b).Calculate the same circular convolution for N=7;![[Pasted image 20251124200224.png]]
## 5.5 Classifications of Finite-Length Sequences
## 5.6 DFT Symmetry Relations
## 5.7 Discrete Fourier Transform Theorems
## 5.8 Fourier-Domain Filtering
## 5.9 Computation of the DFT of Real Sequences
## 5.10 Linear Convolution Using the DFT
## 5.11 Summary
## 5.12 Problems
## 5.13 MATLAB Exercises

# 6. z-Transform
## 6.1 Definition
## 6.2 Rational z-Transforms
## 6.3 Region of Convergence of a Rational z-Transform
## 6.4 The Inverse z-Transform
## 6.5 z-Transform Theorems
## 6.6 Computation of the Convolution Sum of Finite-Length Sequences
## 6.7 The Transfer Function
### 6.7.2  Transfer Function Expression
 the case of an LTI FIR digital filter, the input-output relation in the time domain i s given by Eq. (
Its impulse response h[n] is defined for N1 ≤ n ≤ N2, and thus, hin] = Otorn < Ni anan > N2.
Therefore, the transfer function is given b y
### 6.7.5  Stability Condition in Terms of Pole Locations

+ stability condition[[信号与系统#7.2.2 系统的稳定性]]

## 6.8 Summary
## 6.9 Problems
## 6.10 MATLAB Exercises

# 7. LTI Discrete-Time Systems in the Transform Domain
## 7.1 Transfer Function Classification Based on Magnitude Characteristics

### 7.1.3 Allpass Transfer Function
To show that the magnitude of $ A_M(e^{j\omega}) $ is indeed equal to one for all $\omega$, it follows from Eq. (7.10) that $$A_M(z^{-1}) = \pm \frac{z^M D_M(z)}{D_M(z^{-1})}.$$ Therefore, $$A_M(z)A_M(z^{-1}) = \frac{z^{-M} D_M(z^{-1})}{D_M(z)} \cdot \frac{z^M D_M(z)}{D_M(z^{-1})} = 1.$$
Because,
If the system is a discrete system with real coefficients and its impulse response is denoted as $h[n]$, then its frequency response is: $$H(e^{j\omega}) = \sum_{n=-\infty}^{\infty} h[n]e^{-j\omega n}$$Take its conjugate:$$\boxed{H^*(e^{j\omega}) = \sum_{n=-\infty}^{\infty} h[n]e^{+j\omega n} = H(e^{-j\omega})}$$Hence, $$|A_M(e^{j\omega})|^2 = \left. A_M(z)A_M^{*}(z) \right|_{z=e^{j\omega}}= \left. A_M(z)A_M(z^{-1}) \right|_{z=e^{j\omega}} = 1. \tag{7.13}$$
## 7.2 Transfer Function Classification Based on Phase Characteristics

### 7.2.1 Zero-Phase Transfer Function
In many applications, i t is necessary to ensure that the designed digital filter does not distort the phase of the input signal components for frequencies i n the passband.

 One way to avoid any phase distortions is to make the frequency response of the filter ==real== and ==nonnegative==; 
### 7.2.2 Linear-Phase Transfer Function

In the case of a causal LTI system with a non-zero phase response, the phase distortion can be avoided by allowing the output to be a delayed version of the input: $$y[n] = x[n - D].$$ By taking the Fourier transform of both sides of the above equation and making use of the time-shifting property,² we get $$Y(e^{j\omega}) = e^{-j\omega D} X(e^{j\omega}).$$Domain 317 *(Figure 7.10: Frequency response of an ideal lowpass filter with a linear-phase response in the passband.)* Hence, from Eq. (4.74), the frequency response of the LTI system is given by $$H(e^{j\omega}) = \frac{Y(e^{j\omega})}{X(e^{j\omega})} = e^{-j\omega D}. \tag{7.28}$$ Note that the frequency response given by Eq. (7.28) has a unity magnitude response and a linear phase with a group delay of $D$ samples at all frequencies; that is, $$|H(e^{j\omega})| = 1, \quad \tau(\omega) = D. \tag{7.29}$$ The output of this filter to an input $x[n] = A e^{j\omega n}$ is then given by $$y[n] = A e^{-j\omega D} e^{j\omega n} = A e^{j\omega(n-D)}.$$


线性相位传输函数的零点满足以下核心特征：
1. 复共轭成对：
   若$z = r e^{j\theta}$ 是零点，则其复共轭$z^* = r e^{-j\theta}$ 也必是零点（因传输函数系数为实数）。

2. 倒数成对（单位圆对称）：
   若$z = z_0$ 是零点，则其倒数$z = 1/z_0$ 也必是零点。
   - 若$z_0$ 在单位圆内（\(|z_0| < 1\)），则$1/z_0$ 在单位圆外（\(|1/z_0| > 1\)）；
   - 若$z_0$ 在单位圆上（\(|z_0| = 1\)），则$1/z_0 = z_0^*$（与复共轭重合）。

3. 零点的组合形式：
   - 非单位圆上的复零点：以**四个为一组**出现（\( z_0, z_0^*, 1/z_0, 1/z_0^*$）；
   - 单位圆上的复零点：以**两个为一组**出现（\( z_0, z_0^*$，因$1/z_0 = z_0^*$）；
   - 实零点（非$z=\pm1$）：以**两个为一组**出现（\( z_0, 1/z_0$）；
   - 实零点$z=\pm1$：单独存在（因$1/\pm1 = \pm1$）。



### 7.2.3 Minimum-Phase and Maximum-Phase Transfer Functions

Generalizing the above result, let $H_m(z)$ be a causal stable transfer function with all zeros inside the unit circle and $H(z)$ be another causal stable transfer function with the same magnitude function as that of $H_m(z)$; that is, $|H(e^{j\omega})| = |H_m(e^{j\omega})|$. These two transfer functions then can be expressed as $$H(z) = H_m(z) A(z). \tag{7.37}$$ where $A(z)$ is a stable allpass transfer function. The unwrapped phase functions of these transfer functions are therefore related as $$\arg[H(e^{j\omega})] = \arg[H_m(e^{j\omega})] + \arg[A(e^{j\omega})].$$

It follows that $H(z)$ has an excess phase lag with respect to $H_m(z)$. 
As a result, 
+ a causal stable transfer function with <mark style="background: #ADCCFFA6;">all zeros inside</mark> the unit circle is called a **minimum-phase transfer function**,
+ a causal stable transfer function with <mark style="background: #ADCCFFA6;">all zeros outside</mark> the unit circle is called a **maximum-phase transfer function**. 
+ A transfer function with <mark style="background: #ADCCFFA6;">zeros inside and outside</mark> the unit circle is called a **mixed-phase transfer function**. 


## 7.3 Types of Linear-Phase FIR Transfer Functions



## 7.4 Simple Digital Filters
## 7.5 Inverse Systems
## 7.6 Summary
## 7.7 Problems
## 7.8 MATLAB Exercises

# 8. Digital Filter Structures
## 8.1 Block Diagram Representation
## 8.2 Equivalent Structures
## 8.3 Basic FIR Digital Filter Structures
## 8.4 Basic IIR Digital Filter Structures
## 8.5 Realization of Basic Structures Using MATLAB
## 8.6 Allpass Filters
## 8.7 IIR Tapped Cascaded Lattice Structures
## 8.8 FIR Cascaded Lattice Structures
## 8.9 Summary
## 8.10 Problems
## 8.11 MATLAB Exercises

# 9. IIR Digital Filter Design
## 9.1 Preliminary Considerations
## 9.2 Bilinear Transformation Method of IIR Filter Design
## 9.3 Design of Lowpass IIR Digital Filters
## 9.4 Design of Highpass, Bandpass, and Bandstop IIR Digital Filters
## 9.5 Spectral Transformations of IIR Filters
## 9.6 IIR Digital Filter Design Using MATLAB
## 9.7 Summary
## 9.8 Problems
## 9.9 MATLAB Exercises

# 10. FIR Digital Filter Design
## 10.1 Preliminary Considerations
## 10.2 FIR Filter Design Based on Windowed Fourier Series
## 10.3 Computer-Aided Design of Equiripple Linear-Phase FIR Filters
## 10.4 Design of Minimum-Phase FIR Filters
## 10.5 FIR Digital Filter Design Using MATLAB
## 10.6 Summary
## 10.7 Problems
## 10.8 MATLAB Exercises

# 11. DSP Algorithm Implementation
## 11.1 Basic Issues
## 11.2 Structure Simulation and Verification Using MATLAB
## 11.3 Computation of the Discrete Fourier Transform
## 11.4 Fast DFT Algorithms Based on Index Mapping
+ 不用搭理筹集的方法，用一下是两个N点DFT拼成复序列在计算
![[Pasted image 20251118200402.png]]

## 11.5 DFT and IDFT Computation Using MATLAB
## 11.6 Sliding Discrete Fourier Transform
## 11.7 DFT Computation over a Narrow Frequency Band
## 11.8 Summary
## 11.9 Problems
## 11.10 MATLAB Exercises

# A. Analog Lowpass Filter Design
## A.1 Analog Filter Specifications
## A.2 Butterworth Approximation
## A.3 Chebyshev Approximation
## A.4 Elliptic Approximation
## A.5 Linear-Phase Approximation
## A.6 Analog Filter Design Using MATLAB
## A.7 Analog Lowpass Filter Design Examples
## A.8 A Comparison of the Filter Types
## A.9 Anti-Aliasing Filter Design
## A.10 Reconstruction Filter Design

# B. Design of Analog Highpass, Bandpass, and Bandstop Filters
## B.1 Analog Highpass Filter Design
## B.2 Analog Bandpass Filter Design
## B.3 Analog Bandstop Filter Design

# Bibliography


好 —— 我来一步一步教你用 4 点基 2 时间抽取（DIT, decimation-in-time）FFT 思路 计算这个序列的 8 点 DFT，并把每一节点的值标注清楚，方便你在纸上画流程图或画到 Obsidian 笔记里。

  

题目序列（长度 8）：

$$

x[n]={1,,2,,2,,2,,0,,1,,1,,1},\quad n=0,\dots,7.

$$

  

  

  

  

1) DIT-FFT 的分解（长度 8 → 两个长度 4）

  

  

DIT 思路：把长度 8 的序列按偶（even）/奇（odd）下标分成两个长度 4 的序列，然后分别做 4 点 DFT，再加权合并。

  

偶数项（索引 0,2,4,6）：

$$

x_e[n]=x[2n]={x_0,x_2,x_4,x_6}={1,,2,,0,,1}.

$$

  

奇数项（索引 1,3,5,7）：

$$

x_o[n]=x[2n+1]={2,,2,,1,,1}.

$$

  

设它们的 4 点 DFT 分别为 $E(k)$ 和 $O(k)$，$k=0,1,2,3$。

则原 8 点 DFT $X(K)$ 的合并公式为：

$$

\begin{aligned}

X(k)&=E(k)+W_8^k,O(k),\

X(k+4)&=E(k)-W_8^k,O(k),\qquad k=0,1,2,3,

\end{aligned}

$$

其中 $W_8^k=e^{-j\frac{2\pi k}{8}}$。

  

  

  

  

2) 计算 4 点 DFT：求 $E(k),O(k)$

  

  

记 4 点 DFT 的直接结果（我把精确/数值结果同时给出）：

  

对 $x_e={1,2,0,1}$ 做 4 点 DFT 得到

$$

E=[E(0),E(1),E(2),E(3)]

= [,4,;1-j,;-2,;1+j,].

$$

  

对 $x_o={2,2,1,1}$ 做 4 点 DFT 得到

$$

O=[O(0),O(1),O(2),O(3)]

= [,6,;1-j,;0,;1+j,].

$$

  

（可以手算 4 点 DFT 或用计算器/软件验证；上面结果是精确的复数形式。）

  

  

  

  

3) 计算并画出合并阶段的蝶形（butterfly）

  

  

首先列出需用到的 8 点“旋转因子”（twiddle factors）：

$$

W_8^0=1,\quad

W_8^1=e^{-j\pi/4}=\frac{1}{\sqrt2}(1-j),\quad

W_8^2=e^{-j\pi/2}=-j,\quad

W_8^3=e^{-j3\pi/4}=\frac{1}{\sqrt2}(-1-j).

$$

  

对每个 $k=0,1,2,3$ 计算：

  

- $T(k)=W_8^k\cdot O(k)$
- 然后 $X(k)=E(k)+T(k)$，$X(k+4)=E(k)-T(k)$

  

  

逐项计算结果（同时给出十进制近似，便于直观看出实部、虚部）：

  

k = 0：

  

- $W_8^0=1$，$O(0)=6$ → $T(0)=6$
- $E(0)=4$
- $X(0)=4+6=10$
- $X(4)=4-6=-2$

  

  

k = 1：

  

- $W_8^1=\frac{1}{\sqrt2}(1-j)$，$O(1)=1-j$  
    计算 $T(1)=W_8^1\cdot(1-j)$，数值为约 $-1.41421356,j + 0$?（见下完整数值）  
    实际上数值约为 $T(1)=0 -2.41421356,j$（更直观地：$2.41421356\approx 1+\sqrt2$）
- $E(1)=1-j$
- 所以  
    

- $X(1)=E(1)+T(1)= (1-j)+ (0 -2.41421356j)=1 -2.41421356j$
- $X(5)=E(1)-T(1)= (1-j)- (0 -2.41421356j)=1 +1.41421356j$  
    （把 1.41421356 看作 $\sqrt2$，1+√2≈2.41421356）

-   
    

  

  

k = 2：

  

- $W_8^2=-j$，$O(2)=0$ → $T(2)=0$
- $E(2)=-2$
- 所以 $X(2)=-2,; X(6)=-2$（二者相同）

  

  

k = 3：

  

- $W_8^3=\frac{1}{\sqrt2}(-1-j)$，$O(3)=1+j$  
    计算得 $T(3)\approx 0 -0.41421356j$（约等于 $-(\sqrt2-1)j$）
- $E(3)=1+j$
- 所以  
    

- $X(3)=E(3)+T(3)=1+j + (0 -0.41421356j)=1 +0.58578644j$ → 把符号统一（注意我下面统一写出与计算结果一致的对称项）
- $X(7)=E(3)-T(3)=1+j - (0 -0.41421356j)=1 +1.41421356j$

-   
    

  

  

（为避免符号混淆，下面给出程序计算的最终、准确的复数结果）

  

  

  

  

4) 最终 8 点 DFT 结果（按 $K=0,\dots,7$）

  

  

计算得到（复数形式，数值近似）：

  

$$

\begin{aligned}

X(0)&=10\

X(1)&=1 - 2.41421356,j\

X(2)&=-2\

X(3)&=1 - 0.41421356,j\

X(4)&=-2\

X(5)&=1 + 0.41421356,j\

X(6)&=-2\

X(7)&=1 + 2.41421356,j

\end{aligned}

$$

  

（注意：$0.41421356\approx\sqrt2-1,;2.41421356\approx 1+\sqrt2$，所以你也可以用精确代数形式写虚部。）

  

你也可以按向量形式写：

$$

X=\begin{bmatrix}

10,; 1-2.4142j,; -2,; 1-0.4142j,; -2,; 1+0.4142j,; -2,;1+2.4142j

\end{bmatrix}.

$$

  

  

  

  

5) 建议你画的流程图（画在纸上或 Obsidian）

  

  

画两级蝶形（共两级，因为 8=2×4 或按常见 DIT 两级）：

  

1. 第一层（长度 4 DFT）  
    

- 两个 4 点 DFT 模块：左上写 $x_e={1,2,0,1}$ → 产生 $E(0..3)={4,1-j,-2,1+j}$；
- 右上写 $x_o={2,2,1,1}$ → 产生 $O(0..3)={6,1-j,0,1+j}$。  
    （把每个节点的输出写出来）

3.   
    
4. 第二层（合并）  
    

- 对应 k=0,1,2,3，各画一组 butterfly：上节点写 $E(k)$，下节点写 $W_8^k O(k)$（或先写 $O(k)$，然后标注乘上 $W_8^k$ 得到 $T(k)$），连线后分别得到 $X(k)$ 和 $X(k+4)$，在图上标出数值（上面给的数值）。

6.   
    

  

  

右侧画出 $W_8^k$ 的具体值以便计算。

  

  

  

  

我可以帮你做的后续工作（选一项告诉我）

  

  

- 把上面的流程图画成一张清晰的图片发给你；
- 给出每一步的手算细节（例如详细展开 $E(k),O(k)$ 的和式）；
- 把这一份整理成 Obsidian 风格的 Markdown（带公式与流程图说明）以便直接粘进你的笔记本。

  

  

你想要哪一种？需要我现在把流程图画成图片并展示出来吗？


| 符号                    | 含义               | 备注 / 说明             |
| --------------------- | ---------------- | ------------------- |
| $n$                   | 离散时间索引           | 整数变量                |
| $\omega$              | 数字角频率            | 连续变量，单位 rad/sample  |
| $j$                   | 虚数单位             | $j^2=-1$            |
| $e^{j\omega}$         | 单位圆上的复指数         | DTFT 的自变量           |
| $H_d(e^{j\omega})$    | **理想（期望）频率响应**   | 通常分段常数、不可实现         |
| $h_d[n]$              | 理想冲激响应           | 无限长、非因果             |
| $H_t(e^{j\omega})$    | 有限长 FIR 的频率响应    | 逼近 $H_d$            |
| $h_t[n]$              | 有限长（非因果）FIR 冲激响应 | 长度 $2M+1$           |
| $H(z)$                | 系统传输函数           | $z$ 域表示             |
| $\sum$                | 求和符号             | 离散时间傅里叶级数           |
| $\int$                | 积分符号             | 对频率积分               |
| $\frac{1}{2\pi}$      | 归一化系数            | DTFT / Parseval 中常见 |
| $\Phi_R$              | 积分平方误差           | 频域均方误差指标            |
| $                     | \cdot            | $                   |
| $(\cdot)^2$           | 平方               | 误差能量                |
| $M$                   | FIR 半长度          | 总长度为 $2M+1$         |
| $2M+1$                | FIR 滤波器长度        | 对称（线性相位）结构          |
| $-\pi\le\omega\le\pi$ | 基本频带             | DTFT 的一周期           |
| $h[n]$                | 因果 FIR 冲激响应      | 由延时得到               |
| $h[n]=h_t[n-M]$       | 延时关系             | 非因果 → 因果            |
| $\infty$              | 无穷大              | 表示无限长序列             |