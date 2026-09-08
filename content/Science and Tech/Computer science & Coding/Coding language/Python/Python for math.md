# python for 高数
## 周期函数展开成傅里叶级数
### 示例1：将方波信号作傅里叶级数展开
```python
import numpy as np
import matplotlib.pyplot as plt

def square_wave(t, duty_cycle=0.5, period=2):
    """
    生成一个占空比为50%的方波。
    
    参数:
    t (numpy.ndarray): 时间数组
    duty_cycle (float): 占空比,默认为0.5
    period (float): 方波的周期,默认为2
    
    返回:
    numpy.ndarray: 方波信号
    """
    return np.where((t % period) < duty_cycle * period, 10, 0)


# 定义要被拟合的函数
def f(x):
    """
    返回函数的函数值
    
    参数:
    x (numpy.ndarray): 自变量数组
    
    返回:
    numpy.ndarray: 默认是方波信号的函数值
    """
    return square_wave(x, duty_cycle=0.5, period=2)

# 计算傅里叶余弦级数系数
def cosine_series_coefficients(f, n, L):
    """
    计算傅里叶余弦级数系数
    
    参数:
    f (function): 原函数
    n (int): 级数的阶数
    L (float): 延拓后函数的半个周期
    
    返回:
    numpy.ndarray:  傅里叶余弦级数系数数组a_n(n是傅里叶级数的阶数)
    """
    a_n = np.zeros(n+1)
    for k in range(0, n+1):
        integrand = lambda x: f(x) * np.cos(k * np.pi * x / L)
        a_n[k] = (1 / L) * np.trapz(integrand(np.linspace(-L, L, 2000)), np.linspace(-L, L, 2000))
    return a_n

# 计算傅里叶正弦级数系数
def sine_series_coefficients(f, n, L):
    """
    计算傅里叶正弦级数系数
    
    参数:
    f (function): 原函数
    n (int): 级数的阶数
    L (float): 延拓后函数的半个周期
    
    返回:
    numpy.ndarray:  傅里叶正弦级数系数数组b_n(n是傅里叶级数的阶数)
    """
    b_n = np.zeros(n+1)
    for k in range(1, n+1):
        integrand = lambda x: f(x) * np.sin(k * np.pi * x / L)
        b_n[k] = (1 / L) * np.trapz(integrand(np.linspace(-L, L, 2000)), np.linspace(-L, L, 2000))
    return b_n


# 计算傅里叶余弦级数
def cosine_series(x, a_n, L):
    """
    计算傅里叶余弦级数
    
    参数:
    x (numpy.ndarray): 自变量数组
    a_n (numpy.ndarray): 傅里叶余弦级数系数数组
    L (float): 延拓后函数的半个周期
    
    返回:
    numpy.ndarray: 用n阶傅里叶余弦级数你和后的函数的函数近似值的数组
    """
    series = np.full_like(x, a_n[0] / 2) 
    for k in range(1, len(a_n)):
        series += a_n[k] * np.cos(k * np.pi * x / L)
    return series

# 计算傅里叶正弦级数
def sine_series(x, b_n, L):
    """
    计算傅里叶正弦级数
    
    参数:
    x (numpy.ndarray): 自变量数组
    a_n (numpy.ndarray): 傅里叶正弦级数系数数组
    L (float): 延拓后函数的半个周期
    
    返回:
    numpy.ndarray: 用n阶傅里叶正弦级数你和后的函数的函数近似值的数组
    """
    series = np.zeros_like(x)
    for k in range(1, len(b_n)):
        series += b_n[k] * np.sin(k * np.pi * x / L)
    return series

# 设置参数
L = 1
n_terms = 10
x = np.linspace(-4*L, 4*L, 1000)

# 计算余弦函数拟合的结果
b_n_cos = cosine_series_coefficients(f, n_terms, L)
# 计算傅里叶余弦级数前几项叠加后的值
f_cosine_series = cosine_series(x, b_n_cos, L)

# 计算傅里叶正弦级数系数
a_n_sin = sine_series_coefficients(f, n_terms, L)
# 计算傅里叶正弦级数前几项叠加后的值
f_sine_series = sine_series(x, a_n_sin, L)




# 绘制原始函数和傅里叶级数前几项叠加后的图像
# 设置背景颜色为黑色
plt.rcParams['figure.facecolor'] = 'black'
plt.rcParams['axes.facecolor'] = 'black'
plt.rcParams['savefig.facecolor'] = 'black'
plt.rcParams['axes.edgecolor'] = 'white'
plt.rcParams['axes.labelcolor'] = 'white'
plt.rcParams['xtick.color'] = 'white'
plt.rcParams['ytick.color'] = 'white'
plt.rcParams['legend.facecolor'] = 'black'
plt.rcParams['legend.edgecolor'] = 'white'
plt.rcParams['text.color'] = 'white'

# 绘制原始函数和傅里叶级数前几项叠加后的图像
plt.figure(figsize=(8, 8))

# 奇延拓展开成正弦级数
plt.subplot(2, 1, 1)
plt.plot(x, f(x), label='primitive function', color='white')
plt.title('primitive function', color='white')
plt.xlabel('x', color='white')
plt.ylabel('f(x)', color='white')
plt.legend(loc='upper right', facecolor='black', edgecolor='white')  

plt.subplot(2, 1, 2)
plt.plot(x, f(x), label='The Effect of Fitting Functions', color='white')
plt.plot(x, f_cosine_series + f_sine_series, label='Fourier series approximation', color='cyan')
plt.title('Function after superimposing the first few terms of Fourier sine series', color='white')
plt.xlabel('x', color='white')
plt.ylabel('f(x)', color='white')
plt.legend(loc='upper right', facecolor='black', edgecolor='white')  

plt.tight_layout(rect=[0, 0, 0.8, 1])
plt.show()
```
## 非周期函数先奇/偶延拓再展开成傅里叶级数
### 示例1：画图理解奇延拓和偶延拓是==逼近函数==的==不同方式==
1. 准备工作

```python

import numpy as np

import matplotlib.pyplot as plt

from matplotlib.font_manager import FontProperties

  
  

# 设置中文字体

font = FontProperties(fname='C:/Windows/Fonts/simsun.ttc', size=12)  # 你可以根据实际情况选择其他字体文件

```

1. 定义函数


```python

# 定义非周期函数

def f(x):

    return x**2

```

1. 定义奇延拓和偶延拓，返回一个函数

```python

# 奇延拓函数

def odd_extension(f, x, L):

    return np.where(x < 0, -f(-x), f(x))

  

#偶延拓函数

def even_extension(f, x, L):

    return np.where(x < 0, f(-x), f(x))

```

1. 计算正弦级数和余弦级数的系数

```python

# 计算傅里叶正弦级数系数

def sine_series_coefficients(f, n, L):

    a_n = np.zeros(n+1)

    for k in range(1, n+1):

        integrand = lambda x: f(x) * np.sin(k * np.pi * x / L)

        a_n[k] = (2 / L) * np.trapz(integrand(np.linspace(0, L, 1000)), np.linspace(0, L, 1000))

    return a_n

  

# 计算傅里叶余弦级数系数

def cosine_series_coefficients(f, n, L):

    a_n = np.zeros(n+1)

    for k in range(0, n+1):

        integrand = lambda x: f(x) * np.cos(k * np.pi * x / L)

        a_n[k] = (2 / L) * np.trapz(integrand(np.linspace(0, L, 1000)), np.linspace(0, L, 1000))

    return a_n

```

1. 计算每个点，前几项正弦/余弦级数的值，得到y的列表


```python

# 计算傅里叶正弦级数

def sine_series(x, a_n, L):

    series = np.zeros_like(x)

    for k in range(1, len(a_n)):

        series += a_n[k] * np.sin(k * np.pi * x / L)

    return series

  

# 计算傅里叶余弦级数

def cosine_series(x, a_n, L):

    series = np.full_like(x, a_n[0] / 2)

    for k in range(1, len(a_n)):

        series += a_n[k] * np.cos(k * np.pi * x / L)

    return series

```


1. 设置参数 

```python

# 设置参数

L = 2

n_terms = 5

x = np.linspace(-4*L, 4*L, 1000)

```

1. 计算


```python

# 计算余弦函数拟合的结果

# 计算奇延拓后的函数值

f_odd = odd_extension(f, x, L)

# 计算傅里叶正弦级数系数

a_n_sin = sine_series_coefficients(f, n_terms, L)

# 计算傅里叶正弦级数前几项叠加后的值

f_sine_series = sine_series(x, a_n_sin, L)

  

# 计算余弦函数拟合的结果

# 计算偶延拓后的函数值

f_even = even_extension(f, x, L)

# 计算傅里叶余弦级数系数

a_n_cos = cosine_series_coefficients(f, n_terms, L)

# 计算傅里叶余弦级数前几项叠加后的值

f_cosine_series = cosine_series(x, a_n_cos, L)

```

1. 绘图
  

```python

# Plot the original function and the Fourier series after several terms are superimposed

plt.figure(figsize=(12, 12))

  

# Odd extension expanded into a sine series

plt.subplot(2, 2, 1)

plt.plot(x, f_odd, label='Odd extension of the function')

plt.title('Odd extension of the function', fontproperties=font)

plt.xlabel('x', fontproperties=font)

plt.ylabel('f(x)', fontproperties=font)

plt.legend(prop=font)

  

plt.subplot(2, 2, 2)

plt.plot(x, f_odd, label='Odd extension of the function')

plt.plot(x, f_sine_series, label='Fourier sine series after several terms are superimposed')

plt.title('Fourier sine series after several terms are superimposed', fontproperties=font)

plt.xlabel('x', fontproperties=font)

plt.ylabel('f(x)', fontproperties=font)

plt.legend(prop=font)

  

# Even extension expanded into a cosine series

plt.subplot(2, 2, 3)

plt.plot(x, f_even, label='Even extension of the function')

plt.title('Even extension of the function', fontproperties=font)

plt.xlabel('x', fontproperties=font)

plt.ylabel('f(x)', fontproperties=font)

plt.legend(prop=font)

  

plt.subplot(2, 2, 4)

plt.plot(x, f_even, label='Even extension of the function')

plt.plot(x, f_cosine_series, label='Fourier cosine series after several terms are superimposed')

plt.title('Fourier cosine series after several terms are superimposed', fontproperties=font)

plt.xlabel('x', fontproperties=font)

plt.ylabel('f(x)', fontproperties=font)

plt.legend(prop=font)

  

plt.tight_layout()

plt.show()

```

### 示例2：正确的奇延拓展开出了错误的结果

```python
import numpy as np
import matplotlib.pyplot as plt

def square_wave(t, duty_cycle=0.5, period=2):
    """
    生成一个占空比为50%的方波。
    
    参数:
    t (numpy.ndarray): 时间数组
    duty_cycle (float): 占空比,默认为0.5
    period (float): 方波的周期,默认为2
    
    返回:
    numpy.ndarray: 方波信号
    """
    return np.where((t % period) < duty_cycle * period, 10, 0)
    


# 定义要被拟合的函数
def f(x):
    """
    返回函数的函数值
    
    参数:
    x (numpy.ndarray): 自变量数组
    
    返回:
    numpy.ndarray: 默认是方波信号的函数值
    """
    return square_wave(x, duty_cycle=0.5, period=2)

# 奇延拓函数
def odd_extension(f, x, L):
    """
    返回奇延拓后函数的函数值
    
    参数:
    f (function): 原函数
    x (numpy.ndarray): 自变量数组
    L (float): 延拓后函数的半个周期
    
    返回:
    numpy.ndarray: 奇延拓后的函数值数组
    """
    return np.where(x < 0, -f(-x), f(x))

# 计算傅里叶正弦级数系数
def sine_series_coefficients(f, n, L):
    """
    计算傅里叶正弦级数系数
    
    参数:
    f (function): 原函数
    n (int): 级数的阶数
    L (float): 延拓后函数的半个周期
    
    返回:
    numpy.ndarray:  傅里叶正弦级数系数数组b_n(n是傅里叶级数的阶数)
    """
    b_n = np.zeros(n+1)
    for k in range(1, n+1):
        integrand = lambda x: f(x) * np.sin(k * np.pi * x / L)
        b_n[k] = (2 / L) * np.trapz(integrand(np.linspace(0, L, 1000)), np.linspace(0, L, 1000))
    return b_n


# 计算傅里叶正弦级数
def sine_series(x, b_n, L):
    """
    计算傅里叶正弦级数
    
    参数:
    x (numpy.ndarray): 自变量数组
    b_n (numpy.ndarray): 傅里叶正弦级数系数数组
    L (float): 延拓后函数的半个周期
    
    返回:
    numpy.ndarray: 用n阶傅里叶正弦级数你和后的函数的函数近似值的数组
    """
    series = np.zeros_like(x)
    for k in range(1, len(b_n)):
        series += b_n[k] * np.sin(k * np.pi * x / L)
    return series


# 设置参数
L = 1
n_terms = 20
x = np.linspace(-4*L, 4*L, 1000)

# 计算余弦函数拟合的结果
# 计算奇延拓后的函数值
f_odd = odd_extension(f, x, L)
# 计算傅里叶正弦级数系数
b_n_sin = sine_series_coefficients(f, n_terms, L)
# 计算傅里叶正弦级数前几项叠加后的值
f_sine_series = sine_series(x, b_n_sin, L)


# 设置背景颜色为黑色
plt.rcParams['figure.facecolor'] = 'black'
plt.rcParams['axes.facecolor'] = 'black'
plt.rcParams['savefig.facecolor'] = 'black'
plt.rcParams['axes.edgecolor'] = 'white'
plt.rcParams['axes.labelcolor'] = 'white'
plt.rcParams['xtick.color'] = 'white'
plt.rcParams['ytick.color'] = 'white'
plt.rcParams['legend.facecolor'] = 'black'
plt.rcParams['legend.edgecolor'] = 'white'

# 绘制原始函数和傅里叶级数前几项叠加后的图像
plt.figure(figsize=(8, 8))

# 奇延拓展开成正弦级数
plt.subplot(2, 1, 1)
plt.plot(x, f_odd, label='Function after odd extension', color='white')
plt.title('Function after odd extension', color='white')
plt.xlabel('x', color='white')
plt.ylabel('f(x)', color='white')
plt.legend(loc='upper right', facecolor='black', edgecolor='white', labelcolor='white')

plt.subplot(2, 1, 2)
plt.plot(x, f_odd, label='Function after odd extension', color='white')
plt.plot(x, f_sine_series, label='First few terms of Fourier sine series', color='cyan')
plt.title('Function after superimposing the first few terms of Fourier sine series', color='white')
plt.xlabel('x', color='white')
plt.ylabel('f(x)', color='white')
plt.legend(loc='upper right', facecolor='black', edgecolor='white', labelcolor='white')

plt.tight_layout()
plt.show()
```
# `SymPy`库
SymPy 是一个用于符号数学计算的 Python 库，具有广泛的应用。以下是一些主要的应用：

1. **符号表达式**：创建和操作符号表达式。
2. **方程求解**：求解代数方程和微分方程。
3. **微积分**：进行积分、微分、极限等操作。
4. **矩阵运算**：进行矩阵的符号运算和数值运算。
5. **简化表达式**：简化复杂的数学表达式。
6. **级数展开**：进行泰勒级数和傅里叶级数展开。
7. **几何**：处理几何对象和计算几何属性。
8. **逻辑运算**：进行逻辑表达式的操作和简化。

以下是一些示例代码，展示了 SymPy 的基本用法：

```python


import sympy as sp

# 定义符号变量
x, y = sp.symbols('x y')

# 创建符号表达式
expr = x**2 + 2*x + 1

# 求导
derivative = sp.diff(expr, x)
print(f"导数: {derivative}")

# 积分
integral = sp.integrate(expr, x)
print(f"积分: {integral}")

# 求解方程
solution = sp.solve(expr, x)
print(f"方程解: {solution}")

# 矩阵运算
matrix = sp.Matrix([[1, 2], [3, 4]])
det = matrix.det()
print(f"行列式: {det}")

# 简化表达式
simplified_expr = sp.simplify(expr)
print(f"简化表达式: {simplified_expr}")
```

这些示例展示了 SymPy 在符号计算中的一些基本应用。你可以根据需要进一步探索 SymPy 的其他功能。