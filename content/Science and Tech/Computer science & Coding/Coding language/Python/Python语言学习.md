![[Pasted image 20250307225748.png]]
# 数据类型
在Python中，int 是一个内置的类，而不是传统意义上像C++或Java中的“基本类型”。这种设计反映了Python的面向对象特性，即**“一切皆对象”**（Everything is an object）。以下是一些关键原因，解释为什么Python中的int是一个类：

1. Python的面向对象设计
Python是一种面向对象的语言，其核心设计哲学是将所有事物都视为对象。这意味着所有数据类型（包括整数、浮点数、字符串、列表等）都是类的实例。int作为类的一个实例，继承了类的所有特性，例如可以拥有方法和属性。
示例：
a = 10
print(type(a))  # <class 'int'>

# int 类型也有方法
print(a.bit_length())  # 输出 a 的二进制表示的长度
print(a.to_bytes(2, byteorder='big'))  # 将整数转换为字节

----
2. 动态类型和可变性
Python是一种动态类型语言，变量的类型在运行时确定，而不是在编译时。int作为一个类，允许Python在运行时灵活地处理整数类型。例如，Python中的整数可以自动扩展为任意精度的整数（int），而不需要像C语言中的int那样有固定的大小限制。
示例：
a = 123456789012345678901234567890
print(a)  # Python 可以轻松处理大整数

----
3. 继承和扩展
将int设计为类，使得开发者可以继承和扩展它。你可以通过继承int类来创建自己的整数类型，并添加新的方法或修改现有行为。
示例：
class MyInt(int):
    def __init__(self, value):
        super().__init__()
        self.value = value

    def __add__(self, other):
        return MyInt(self.value + other.value)

a = MyInt(5)
b = MyInt(10)
print(a + b)  # 输出 MyInt(15)

----
4. 方法和属性
作为类的实例，int类型可以拥有方法和属性。这使得Python可以为整数提供丰富的内置方法，而不仅仅是简单的数值类型。
示例：
print(10.bit_length())  # 输出 4
print(10.denominator)   # 输出 1（因为 int 是有理数的子类）

----
5. 与其他语言的对比
在C语言中，int是一个基本数据类型，它没有方法或属性，只是一个简单的数值类型。而在Python中，int是一个类，它继承自object，并提供了丰富的功能。
对比：
•  C语言中的int：
int a = 10;
printf("%d\n", a);  // 只能进行简单的数值操作

•  Python中的int：
a = 10
print(a.bit_length())  # 可以调用方法

----
6. Python的设计哲学
Python的设计哲学强调简洁和一致性。将int设计为类，使得整数类型与Python中的其他对象（如字符串、列表等）保持一致的处理方式。这种设计使得Python的语法更加统一，也更容易理解和使用。
----
总结
Python中的int是一个类，而不是基本类型，这反映了Python的面向对象设计和“一切皆对象”的哲学。这种设计使得Python可以为整数提供丰富的功能，支持动态类型和可变性，并允许开发者通过继承和扩展来定制自己的整数类型。

## 布尔值
### `a>b`返回布尔值
是的，`a > b` 会返回一个布尔值数组（或布尔值），具体取决于 `a` 和 `b` 的类型和形状。

### 示例

假设 `a` 和 `b` 是两个标量（单个数值）：

```python
a = 3
b = 2

result = a > b
print("标量比较结果：", result)
print("类型：", type(result))
```


### 输出结果

```
标量比较结果： True
类型： <class 'bool'>
```

DiffCopyInsert

在这个例子中，`a > b` 返回一个布尔值 `True`，因为 3 大于 2。

### 数组示例

假设 `a` 和 `b` 是两个 NumPy 数组：

```python
import numpy as np

a = np.array([1, 2, 3, 4, 5])
b = np.array([2, 2, 3, 3, 3])

result = a > b
print("数组比较结果：", result)
print("类型：", type(result))
```

DiffCopyInsert

### 输出结果

```
数组比较结果： [False False False  True  True]
类型： <class 'numpy.ndarray'>
```

DiffCopyInsert

在这个例子中，`a > b` 返回一个布尔数组 `[False, False, False, True, True]`，因为只有 `a` 的第4个和第5个元素大于 `b` 对应的元素。
Python 中内置的数据结构主要包括以下几种：

## **列表（List）**：
   - 有序、可变的集合，可以包含不同类型的元素。
   - 使用方括号 `[]` 定义。
   - 示例：
     ```python
     lst = [1, 2, 3, 'a', 'b', 'c']
     ```
+ <mark style="background: #ADCCFFA6;">列表相加相当于拼接两个列表，nparray相加就是对应index的元素相加</mark>
## **元组（Tuple）**：
   - 有序、不可变的集合，可以包含不同类型的元素。
   - 使用圆括号 `()` 定义。
   - 示例：
     ```python
     tpl = (1, 2, 3, 'a', 'b', 'c')
     ```

## **集合（Set）**：
   - 无序、不重复的元素集合。
   - 使用花括号 `{}` 定义。
   - 示例：
     ```python
     st = {1, 2, 3, 'a', 'b', 'c'}
     ```

## **字典（Dictionary）**：
   - 无序的键值对集合，键必须是唯一的。
   - 使用花括号 `{}` 定义，键值对用冒号 `:` 分隔。
   - 示例：
     ```python
     dct = {'key1': 'value1', 'key2': 'value2'}
     ```

## **字符串（String）**：
   - 有序的字符序列，不可变。
   - 使用单引号 `'` 或双引号 `"` 定义。
   - 示例：
     ```python
     s = "Hello, World!"
     ```

这些数据结构各有特点，适用于不同的场景。列表和元组用于有序集合，集合用于无序且不重复的元素集合，字典用于键值对存储，字符串用于文本数据处理。

## 区分c语言中的整形和浮点型
在 Python 中，虽然不像 C 语言那样严格区分整形和浮点型数据，但它们仍然是不同的数据类型。Python 中的主要数值类型包括：

1. **整数（int）**：
   - 表示没有小数部分的数字。
   - 示例：
     ```python
     a = 5
     print(type(a))  # <class 'int'>
     ```

2. **浮点数（float）**：
   - 表示带有小数部分的数字。
   - 示例：
     ```python
     b = 5.0
     print(type(b))  # <class 'float'>
     ```

虽然 Python 不需要像 C 语言那样显式声明变量类型，但它们在内部仍然有类型区分，并且可以通过 `type()` 函数查看变量的类型。
# 循环语句
### `for` 循环
`for` 循环用于遍历序列（如列表、元组、字符串）中的元素。

```python


# for 循环示例
numbers = [1, 2, 3, 4, 5]
for number in numbers:
    print(number)
```

### `while` 循环
`while` 循环在给定条件为真时重复执行代码块。

```python


# while 循环示例
count = 0
while count < 5:
    print(count)
    count += 1
```

### 嵌套循环
循环可以嵌套使用，即在一个循环内部使用另一个循环。

```python


# 嵌套循环示例
for i in range(3):
    for j in range(2):
        print(f"i: {i}, j: {j}")
```

### `break` 和 `continue` 语句
- `break` 语句用于终止循环。
- `continue` 语句用于跳过当前循环的剩余部分，并继续下一次循环。

```python


# break 和 continue 示例
for number in range(10):
    if number == 5:
        break  # 终止循环
    if number % 2 == 0:
        continue  # 跳过偶数
    print(number)
```


你可以将这些代码片段添加到你的1.py文件中，并运行它们以理解每种循环语句的工作原理。
在 Python 中，循环变量不一定是整形数据。你可以使用任何可迭代对象（如列表、元组、字符串等）作为循环变量。以下是一些示例：

### 使用字符串作为循环变量
```python


# 使用字符串作为循环变量
for char in "hello":
    print(char)
```

### 使用列表作为循环变量
```python


# 使用列表作为循环变量
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```

### 使用元组作为循环变量
```python


# 使用元组作为循环变量
coordinates = [(0, 0), (1, 2), (3, 4)]
for x, y in coordinates:
    print(f"x: {x}, y: {y}")
```

### 使用字典作为循环变量
```python


# 使用字典作为循环变量
person = {"name": "Alice", "age": 25, "city": "New York"}
for key, value in person.items():
    print(f"{key}: {value}")
```

这些示例展示了如何在 `for` 循环中使用不同类型的变量。你可以将这些代码片段添加到你的 1.py文件中，并运行它们以理解每种循环变量的工作原理。

是的，只要循环变量在一个可迭代对象（如列表、元组、字符串等）中，就可以使用循环语句。以下是一些示例，展示了如何在列表中使用循环变量：

### 示例：遍历列表
```python


# 遍历列表
numbers = [1, 2, 3, 4, 5]
for number in numbers:
    print(number)
```

### 示例：遍历列表并计算总和
```python


# 遍历列表并计算总和
numbers = [1, 2, 3, 4, 5]
total = 0
for number in numbers:
    total += number
print("Total:", total)
```

### 示例：遍历列表并修改元素
```python


# 遍历列表并修改元素
numbers = [1, 2, 3, 4, 5]
for i in range(len(numbers)):
    numbers[i] *= 2
print("Modified list:", numbers)
```

### 示例：使用 `enumerate` 遍历列表并获取索引
```python


# 使用 enumerate 遍历列表并获取索引
numbers = [1, 2, 3, 4, 5]
for index, number in enumerate(numbers):
    print(f"Index: {index}, Number: {number}")
```

Python 中的  range()  函数返回一个可迭代对象，称为“range对象”。这个对象生成一系列数字，通常用于  for  循环中。 range()  函数可以接收一到三个参数：
1. 当只有一个参数  stop  时， range()  生成一个从 0 到  stop-1  的整数序列。
2. 当有两个参数  start  和  stop  时， range()  生成一个从  start  到  stop-1  的整数序列。
3. 当有三个参数  start 、 stop  和  step  时， range()  生成一个从  start  开始，每次增加  step ，直到  stop-1  的整数序列。
 range()  函数生成的数字序列是惰性求值的，这意味着它们在实际需要时才会被计算，而不是在  range()  函数被调用时一次性生成所有值。这使得  range()  可以处理非常大的范围而不会消耗大量内存。
例如：
如果你需要一个列表而不是可迭代对象，可以使用  list(range())  来将  range  对象转换为列表。

# 自定义函数
## 具名函数
### 例子
```python
#定义m_k,n_k阈值函数

def m_k(RSI_k, I, k):

    if RSI_k < I:

        return 1

    else:

        return 0

#print(m_k(0.5, 1, 1))

  

def n_k(RSI_K, O, k):

    if RSI_K > O:

        return 1

    else:

        return 0

#print(n_k(0.5, 1, 1))   #输出1
```

## 匿名函数
### 例子1

假设我们有一个简单的任务：计算两个数的和。我们可以使用匿名函数来实现这个功能。

```python
# 定义一个匿名函数来计算两个数的和 
add = lambda x, y: x + y 

# 使用匿名函数 
result = add(3, 5) 
print(result) # 输出: 8
```

### 例子2
```python
integrand = lambda x: f(x) * np.sin(k * np.pi * x / L)
```

### 解释

- `lambda x, y: x + y` 定义了一个匿名函数，该函数接受两个参数 `x` 和 `y`，并返回它们的和。
- `add` 是这个匿名函数的引用，可以通过 `add(3, 5)` 来调用这个函数。
# 常用函数
## `np.where`
```python
import numpy as np

a = np.arange(10)
print(a)
# 输出: array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

result = np.where(a < 5, a, 10*a)
print(result)
# 输出: array([ 0,  1,  2,  3,  4, 50, 60, 70, 80, 90])
```

## `np.linspace`和`np.arange`
好的，以下是对np.linspace和np.arange
这两个函数的详细介绍：
### `np.linspace`
np.linspace函数用于生成指定范围内的等间隔数值序列。它的常用参数如下：

```python
np.linspace(start, stop, num=50, endpoint=True, retstep=False, dtype=None, axis=0)
```

- `start`：序列的起始值。
- `stop`：序列的终止值。
- `num`：生成的样本数量，默认为50。
- `endpoint`：如果为True，`stop`是序列中的最后一个值。默认为True。
- `retstep`：如果为True，返回样本间距。默认为False。
- `dtype`：输出数组的数据类型。如果未指定，则根据输入推断。
- `axis`：结果数组中的轴。默认为0。

示例：

```python
import numpy as np

x = np.linspace(1, 10, 10)
print('x=', x)
# 输出: x= [ 1.  2.  3.  4.  5.  6.  7.  8.  9. 10.]
```

### `np.arange`
np.arange函数用于生成指定范围内的等间隔数值序列。它的常用参数如下：

```python
np.arange([start, ]stop, [step, ]dtype=None)
```

- `start`：序列的起始值，默认为0。
- `stop`：序列的终止值（不包含）。
- `step`：两个连续值之间的间隔，默认为1。
- `dtype`：输出数组的数据类型。如果未指定，则根据其他参数推断。

示例：

```python
import numpy as np

# 示例 1：生成从 0 到 9 的数组
arr1 = np.arange(10)
print(arr1)  # 输出: [0 1 2 3 4 5 6 7 8 9]

# 示例 2：生成从 1 到 9 的数组
arr2 = np.arange(1, 10)
print(arr2)  # 输出: [1 2 3 4 5 6 7 8 9]

# 示例 3：生成从 1 到 9，步长为 2 的数组
arr3 = np.arange(1, 10, 2)
print(arr3)  # 输出: [1 3 5 7 9]

# 示例 4：生成从 0 到 1，步长为 0.1 的数组
arr4 = np.arange(0, 1, 0.1)
print(arr4)  # 输出: [0.  0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9]
```
区别

- np.linspace生成的数组包含在指定范围内的等间隔数值，默认情况下包括终止值。
- np.arange生成的数组包含在指定范围内的等间隔数值，不包括终止值，步长可以指定。

这两个函数都返回一个NumPy数组（`numpy.ndarray`），但它们的用途和生成的数组内容有所不同。

## 其他一些函数可以用来给一个变量赋初值
在NumPy中，除了`np.zeros_like`之外，还有其他一些函数可以用来给一个变量赋初值。以下是一些常用的函数：

### 1. `np.zeros_like`
创建一个与给定数组形状相同的全零数组。

```python
import micropip 
await micropip.install("numpy")
import numpy as np

x = np.array([1, 2, 3])
zeros = np.zeros_like(x)
print(zeros)  # 输出: [0 0 0]
```

### 2. `np.ones_like`
创建一个与给定数组形状相同的全一数组。

```python
ones = np.ones_like(x)
print(ones)  # 输出: [1 1 1]
```

### 3. `np.full_like`
创建一个与给定数组形状相同的数组，并用指定的值填充。

```python
full = np.full_like(x, fill_value=7)
print(full)  # 输出: [7 7 7]
```

### 4. `np.empty_like`
创建一个与给定数组形状相同的未初始化数组（数组中的值是未定义的）。

```python
empty = np.empty_like(x)
print(empty)  # 输出: 数组中的值是未定义的
```

### 5. `np.copy`
创建一个与给定数组形状和内容相同的数组。

```python
copy = np.copy(x)
print(copy)  # 输出: [1 2 3]
```

### 示例：使用`np.full_like`给变量赋初值

假设你想给一个变量赋初值为某个特定值，可以使用`np.full_like`函数：

```python
import numpy as np

# 定义一个数组
x = np.array([1, 2, 3])

# 使用 np.full_like 给变量赋初值
initial_value = 7
variable = np.full_like(x, fill_value=initial_value)
print(variable)  # 输出: [7 7 7]
```

### 总结

- `np.zeros_like`：创建一个全零数组。
- `np.ones_like`：创建一个全一数组。
- `np.full_like`：创建一个用指定值填充的数组。
- `np.empty_like`：创建一个未初始化的数组。
- `np.copy`：创建一个与给定数组形状和内容相同的数组。

这些函数都可以用来给一个变量赋初值，根据具体需求选择合适的函数即可。

这个循环条件`for k in range(1, len(a_n))`用于遍历从1到`len(a_n) - 1`的整数。以下是对这个循环条件的详细解释：

## `range`&`len`

1. **`range`函数**：
   ```python
   range(1, len(a_n))
   ```
   - `range(start, stop)`函数生成一个从`start`到`stop - 1`的整数序列。
   - 在这个例子中，`start`是1，`stop`是`len(a_n)`，所以生成的整数序列是从1到`len(a_n) - 1`。

2. **`len`函数**：
   ```python
   len(a_n)
   ```
   - `len`函数返回数组`a_n`的长度，即数组中元素的个数。

3. **`for`循环**：
   ```python
   for k in range(1, len(a_n)):
   ```
   - `for`循环遍历由`range(1, len(a_n))`生成的整数序列。
   - `k`在每次迭代中依次取值1, 2, 3, ..., `len(a_n) - 1`。

### 示例

假设数组`a_n`的长度为5，即`a_n = [a0, a1, a2, a3, a4]`，那么`len(a_n)`的值为5。`range(1, len(a_n))`生成的整数序列是`[1, 2, 3, 4]`。

以下是一个示例代码，展示如何使用这个循环条件：

```python
a_n = [0, 1, 2, 3, 4]

for k in range(1, len(a_n)):
    print(f"k = {k}, a_n[k] = {a_n[k]}")
```

### 输出

运行上述代码，输出如下：

```
k = 1, a_n[k] = 1
k = 2, a_n[k] = 2
k = 3, a_n[k] = 3
k = 4, a_n[k] = 4
```

### 总结

- `for k in range(1, len(a_n))`用于遍历从1到`len(a_n) - 1`的整数。
- `range(1, len(a_n))`生成一个从1到`len(a_n) - 1`的整数序列。
- `len(a_n)`返回数组`a_n`的长度。
- 在每次迭代中，`k`依次取值1, 2, 3, ..., `len(a_n) - 1`，可以用于访问数组`a_n`中的相应元素。
### 总结

- `for k in range(1, len(a_n))`用于遍历从1到`len(a_n) - 1`的整数。
- `range(1, len(a_n))`生成一个从1到`len(a_n) - 1`的整数序列。
- `len(a_n)`返回数组`a_n`的长度。
- 在每次迭代中，`k`依次取值1, 2, 3, ..., `len(a_n) - 1`，可以用于访问数组`a_n`中的相应元素。

当然，以下是一个简单的例子，展示了在`for`循环中使用两个参数和

enumerate

函数的用法：

### 示例代码

```python
# 创建一个列表
fruits = ['apple', 'banana', 'cherry', 'date']

# 使用 enumerate 函数在 for 循环中同时获取索引和元素
for index, fruit in enumerate(fruits, start=1):
    print(f"Index: {index}, Fruit: {fruit}")
```

### 解释

1. **创建一个列表**：
   ```python
   fruits = ['apple', 'banana', 'cherry', 'date']
   ```
   - 创建一个包含四个水果名称的列表`fruits`。

2. **使用

enumerate

函数在`for`循环中同时获取索引和元素**：
   ```python
   for index, fruit in enumerate(fruits, start=1):
       print(f"Index: {index}, Fruit: {fruit}")
   ```
   - 

enumerate(fruits, start=1)

：

enumerate

函数用于同时获取列表`fruits`中的元素及其对应的索引。
     - `fruits`：要枚举的列表。
     - `start=1`：指定索引从1开始，而不是默认的0。
   - `for index, fruit in enumerate(fruits, start=1)`：`for`循环遍历`fruits`中的每个元素`fruit`，并同时获取其对应的索引`index`。
     - `index`：当前元素`fruit`的索引，从1开始。
     - `fruit`：当前元素，即水果名称。

3. **打印索引和元素**：
   ```python
   print(f"Index: {index}, Fruit: {fruit}")
   ```
   - 在循环体中，打印当前元素的索引和名称。

### 输出

运行上述代码，输出如下：

```
Index: 1, Fruit: apple
Index: 2, Fruit: banana
Index: 3, Fruit: cherry
Index: 4, Fruit: date
```

### 总结

- 

enumerate

函数用于同时获取列表或数组中的元素及其对应的索引。
- 在`for`循环中使用两个参数（如`index`和`fruit`），可以同时访问元素及其索引。
- 这种用法在需要同时处理元素及其索引的情况下非常有用，提高了代码的可读性和简洁性。

如果code emitter不能导入numpy
```Python
import micropip 
await micropip.install("numpy")
```

## `np.concatenate`

### 函数签名

```python
numpy.concatenate((a1, a2, ...), axis=0, out=None)
```

就是把矩阵按行或者列拼接一下

### 参数

- **a1, a2, ...**: 这些是要连接的数组，可以是任意数量的数组。
- **axis**: 指定沿着哪个轴进行连接。默认值是0，即沿着行方向连接。
    - 如果 `axis=0`，则会沿着第一个轴（即行）进行连接，相当于将多个数组堆叠在一起。
    - 如果 `axis=1`，则会沿着第二个轴（即列）进行连接，相当于将多个数组并列在一起。
- **out**: 可选参数，用于指定输出数组的位置。通常不需要使用这个参数。

### 返回值

- 返回一个新的数组，该数组是沿着指定轴连接后的结果。

### 示例

假设我们有两个数组 `a` 和 `b`：

```python
import numpy as np

a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

# 沿着行方向（axis=0）连接
result_row = np.concatenate((a, b), axis=0)
print("沿着行方向连接的结果：")
print(result_row)

# 沿着列方向（axis=1）连接
result_col = np.concatenate((a, b), axis=1)
print("沿着列方向连接的结果：")
print(result_col)
```

CopyInsert

#### 输出结果

```
沿着行方向连接的结果：
[[1 2]
 [3 4]
 [5 6]
 [7 8]]

沿着列方向连接的结果：
[[1 2 5 6]
 [3 4 7 8]]
```

CopyInsert

### 在您的代码中的应用

在您的代码中：

```python
preds = np.concatenate([preds1, preds2], axis=0)
```

CopyInsert

- `preds1` 和 `preds2` 是两个一维数组，分别表示第一个选手和第二个选手的预测结果。
- `axis=0` 表示沿着行方向进行连接，将两个一维数组堆叠在一起，形成一个新的一维数组 `preds`。

这样，`preds` 数组就包含了所有选手的预测结果，用于后续的精度计算和结果保存。

### 注意事项

- 确保所有要连接的数组在指定轴上的其他维度大小相同。例如，如果沿着 `axis=1` 进行连接，`a` 和 `b` 的行数必须相同。
- 如果数组的维度不同，`np.concatenate` 会抛出错误。

希望这个解释对您有所帮助！如果有其他问题，欢迎继续提问。

## `bool_array.astype(int)`
### 示例


假设我们有一个布尔数组 `bool_array`，我们希望将其转换为整数数组。

```python
import numpy as np

# 创建一个布尔数组
bool_array = np.array([True, False, True, False, True])

# 使用 astype(int) 将布尔数组转换为整数数组
int_array = bool_array.astype(int)

print("布尔数组：", bool_array)
print("转换为整数数组：", int_array)
```

DiffCopyInsert

### 输出结果

```
布尔数组： [ True False  True False  True]
转换为整数数组： [1 0 1 0 1]
```

DiffCopyInsert

### 解释

- `bool_array` 是一个包含布尔值的数组。
- `bool_array.astype(int)` 将 `bool_array` 中的每个 `True` 值转换为1，每个 `False` 值转换为0。
- 结果 `int_array` 是一个包含整数值的数组，其中1表示 `True`，0表示 `False`。

### 另一个示例

再举一个稍微复杂一点的例子，假设我们有一个浮点数组，我们希望将其二值化并转换为整数数组。

```python
import numpy as np

# 创建一个浮点数组
float_array = np.array([0.2, 0.7, 0.4, 0.8, 0.5])

# 比较浮点数组中的元素与0.5
bool_array = float_array > 0.5

# 使用 astype(int) 将布尔数组转换为整数数组
int_array = bool_array.astype(int)

print("浮点数组：", float_array)
print("比较后的布尔数组：", bool_array)
print("转换为整数数组：", int_array)
```

DiffCopyInsert

### 输出结果

```
浮点数组： [0.2 0.7 0.4 0.8 0.5]
比较后的布尔数组： [False  True False  True False]
转换为整数数组： [0 1 0 1 0]
```

DiffCopyInsert

### 解释

- `float_array` 是一个包含浮点数的数组。
- `float_array > 0.5` 会生成一个布尔数组，其中每个元素大于0.5的位置为 `True`，否则为 `False`。
- `bool_array` 的结果是 `np.array([False, True, False, True, False])`。
- `bool_array.astype(int)` 将布尔数组中的 `True` 值转换为1，`False` 值转换为0。
- 结果 `int_array` 是 `np.array([0, 1, 0, 1, 0])`，其中1表示预测结果大于0.5，0表示预测结果小于或等于0.5。
## print
在 Python 中，格式化字符串可以让你更方便地插入变量的值到字符串中。常用的格式化字符串方法有三种：百分号 `%`、`str.format()` 方法和 f-string（格式化字符串字面量）。以下是每种方法的示例：

1. **百分号 `%` 格式化**：
    ```python
    name = "Alice"
    age = 30
    print("My name is %s and I am %d years old." % (name, age))
    ```

2. **`str.format()` 方法**：
    ```python
    name = "Alice"
    age = 30
    print("My name is {} and I am {} years old.".format(name, age))
    ```

3. **f-string（格式化字符串字面量）**：
    ```python
    name = "Alice"
    age = 30
    print(f"My name is {name} and I am {age} years old.")
    ```

f-string 是 Python 3.6 引入的一种格式化字符串的方法，它使用起来更加简洁和直观。以下是一个更复杂的示例，展示了如何在 f-string 中进行表达式计算和调用函数：

```python
import math

radius = 5
area = math.pi * radius ** 2
print(f"The area of a circle with radius {radius} is {area:.2f}")
```

在这个示例中，`{area:.2f}` 表示将 `area` 的值格式化为小数点后两位。

你可以根据需要选择适合的格式化方法。

## `len`
在Python中，可以使用内置的`len()`函数来查看一个数组（列表）的长度。以下是一个简单的示例：

```python
# 示例列表
my_list = [1, 2, 3, 4, 5]

# 查看列表的长度
length_of_list = len(my_list)

# 打印列表的长度
print("列表的长度是:", length_of_list)
```

CopyInsert

在这个示例中，`len(my_list)`会返回列表`my_list`的长度，即5。`len()`函数适用于任何序列类型的数据结构，如列表、元组、字符串等。

对于您之前提到的代码中的列表`k`，您可以使用以下方式查看其长度：

```python
# 查看列表k的长度
length_of_k = len(k)

# 打印列表k的长度
print("列表k的长度是:", length_of_k)
```


这样就可以得到列表`k`中元素的数量。

## `zip`
### 基础用法
`zip`函数是 Python 中一个非常实用的内置函数，它用于将多个可迭代对象（如列表、元组等）中的元素一一对应地组合成元组，然后返回一个由这些元组组成的迭代器。以下是一个具体的例子：


```python
# 定义两个列表
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]

# 使用zip函数将两个列表合并
zipped_data = zip(names, ages)

# 将zip对象转换为列表进行查看
result_list = list(zipped_data)

print(result_list)
```


在上述代码中：

- 首先定义了两个列表`names`和`ages`，分别存储了三个人的名字和年龄。
- 然后使用`zip`函数将`names`和`ages`两个列表进行合并，`zip`函数会将两个列表中对应位置的元素组合成一个元组，比如`names`列表中的第一个元素`'Alice'`和`ages`列表中的第一个元素`25`组合成一个元组`('Alice', 25)`。
- 由于`zip`函数返回的是一个迭代器，为了方便查看结果，将其转换为了列表。最后打印出转换后的列表，可以看到输出结果为`[('Alice', 25), ('Bob', 30), ('Charlie', 35)]`。

`zip`函数还可以用于多个可迭代对象的合并，例如：

```python
# 定义三个列表
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]
genders = ['Female', 'Male', 'Male']

# 使用zip函数将三个列表合并
zipped_data = zip(names, ages, genders)

# 将zip对象转换为列表进行查看
result_list = list(zipped_data)

print(result_list)
```

上述代码中，`zip`函数将`names`、`ages`和`genders`三个列表合并，输出结果为`[('Alice', 25, 'Female'), ('Bob', 30, 'Male'), ('Charlie', 35, 'Male')]`。


另外，如果多个可迭代对象的长度不一致，`zip`函数会以最短的可迭代对象为基准进行组合，例如：

```python
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30]

zipped_data = zip(names, ages)
result_list = list(zipped_data)

print(result_list)
```


此时输出结果为`[('Alice', 25), ('Bob', 30)]`，因为`ages`列表的长度较短，所以只组合到第二个元素。
### 与for循环结合

#### 原理
`zip`函数会把多个可迭代对象对应位置的元素组合成元组，而在`for`循环里可以设置和元组元素数量一致的变量，这样每次循环时，这些变量就能分别接收元组里的不同元素。
#### 示例代码1

```python
# 定义两个列表
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]

# 使用zip函数和for循环
for name, age in zip(names, ages):
    print(f"{name} is {age} years old.")
```

- `zip(names, ages)`：把`names`和`ages`两个列表对应位置的元素组合成元组，形成一个迭代器。例如，第一个元组是`('Alice', 25)`，第二个是`('Bob', 30)`，第三个是`('Charlie', 35)`。
- `for name, age in zip(names, ages)`：在`for`循环里，`name`和`age`这两个变量会依次接收`zip`生成的元组里的元素。第一次循环时，`name`为`'Alice'`，`age`为`25`；第二次循环，`name`为`'Bob'`，`age`为`30`，依此类推。
- `print(f"{name} is {age} years old.")`：每次循环都会输出一个人的名字和年龄信息。
#### 事例代码2
```python
# 定义m_k, n_k阈值函数
def m_k(RSI_k, I):
    return [1 if rsi < i else 0 for rsi, i in zip(RSI_k, I)]

def n_k(RSI_k, O):
    return [1 if rsi > o else 0 for rsi, o in zip(RSI_k, O)]
```
## `enumerate`
`enumerate`是 Python 的一个内置函数，主要用于将一个可迭代对象（如列表、元组、字符串等）组合为一个带有索引的枚举对象，这样在遍历可迭代对象时，==既能获取元素的值，又能获取元素的索引==。以下为你详细介绍：
### 基本语法

```python
enumerate(iterable, start=0)
```

- `iterable`：必需参数，代表要进行枚举的可迭代对象。
- `start`：可选参数，用于指定索引的起始值，默认从 0 开始。

### 示例代码

#### 1. 遍历列表并获取索引和元素


```python
fruits = ['apple', 'banana', 'cherry']
for index, fruit in enumerate(fruits):
    print(f"Index {index}: {fruit}")
```

**代码解释**：
- `enumerate(fruits)`会将`fruits`列表转换为一个枚举对象，其中每个元素是一个包含索引和对应元素值的元组。
- 在`for`循环中，使用`index`和`fruit`两个变量分别接收元组中的索引和元素值。
- 循环依次输出每个元素的索引和值。

#### 2. 指定索引起始值


```python
fruits = ['apple', 'banana', 'cherry']
for index, fruit in enumerate(fruits, start=1):
    print(f"Index {index}: {fruit}")
```

**代码解释**：
- 通过设置`start=1`，使索引从 1 开始，而不是默认的 0。
#### 3. 用于字符串

```python
word = "hello"
for index, char in enumerate(word):
    print(f"Character at index {index}: {char}")
```

**代码解释**：
- 这里的可迭代对象是字符串`"hello"`，`enumerate`同样能将其转换为包含索引和字符的枚举对象，在循环中输出每个字符及其索引。
### 应用场景

- **列表元素的位置跟踪**：在处理列表时，若需要知道元素所在的位置，`enumerate`函数就能方便地实现。
- **条件索引操作**：在遍历可迭代对象时，可根据元素的索引进行特定操作，如只处理奇数索引位置的元素。

```python
numbers = [10, 20, 30, 40, 50]
for index, num in enumerate(numbers):
    if index % 2 != 0:
        print(f"Element at odd index {index}: {num}")
```


通过上述示例可以看出，`enumerate`函数在需要同时获取可迭代对象的索引和元素值时非常实用，能让代码更加简洁易读。
# Python与Excel结合
## 读取文件
例子：
```python
import pandas as pd

# 指定Excel文件的路径
file_path = r'D:\what_i_am_doing\Competition\Math modeling\2025美赛训练\第二次训练\2022C\data\总表.xlsx'

# 读取Excel文件中的Sheet1
df = pd.read_excel(file_path, sheet_name='Sheet1')

# 读取B2:B11单元格的数据
data_list = df.iloc[1:11, 1].tolist()

# 打印数据列表
print(data_list)

```
是的，你可以根据列名来提取特定列中的某些单元格的值。`pandas`库提供了多种方法来实现这一点，其中最常用的是`loc`方法。`loc`方法允许你根据标签（即列名和行名）来选择数据。

假设你的Excel文件的`Sheet1`中，B列的列名是`'ColumnNameB'`，你可以使用以下代码来提取B2到B11单元格的值：

```python
import pandas as pd

# 指定Excel文件的路径
file_path = r'D:\what_i_am_doing\Competition\Math modeling\2025美赛训练\第二次训练\2022C\data\总表.xlsx'

# 读取Excel文件中的Sheet1，并将第一行作为列名
df = pd.read_excel(file_path, sheet_name='Sheet1', header=0)

# 读取B2:B11单元格的数据，根据列名
data_list = df.loc[1:10, 'ColumnNameB'].tolist()

# 打印数据列表
print(data_list)
```

在这段代码中：

1. **`df.loc[1:10, 'ColumnNameB']`**:
    
    - `loc`是基于标签的定位方法。
    - `1:10`表示选择行索引从1到10的行（即实际的第二行到第十行）。
    - `'ColumnNameB'`是B列的列名。
2. **`.tolist()`**: 将选择的数据转换为Python列表。
    

请确保将`'ColumnNameB'`替换为实际的列名。

总结一下，使用`loc`方法可以根据列名来选择特定列中的某些单元格的值
## 写入文件
### 代码示例

```python
#写入文件

result_df = pd.DataFrame({
    'python_index': k,
    'B_k': B_k,
    'G_k': G_k
})

# 指定新文件的路径

new_file_path = r'D:\what_i_am_doing\Competition\Math modeling\2025美赛训练\第二次训练\2022C\data\新数据.xlsx'

# 将新的DataFrame写入Excel文件

result_df.to_excel(new_file_path, index=False)

print(f"B_k和G_k已保存到 {new_file_path}")
```


这段代码使用`pandas`库创建了一个新的DataFrame `result_df`。DataFrame是一个二维表格数据结构，类似于电子表格或SQL表格。具体解释如下：

1. **`pd.DataFrame`**: 这是`pandas`库中的一个函数，用于创建一个新的DataFrame对象。`pd.DataFrame()`函数就是让我传进去一个字典。
    
2. **字典参数**:
    
    - **`'python_index': k`**: 这里将列表 `k` 赋值给DataFrame的列 `'python_index'`。列表 `k` 包含时间数据，这些数据将作为DataFrame的第一列。
    - **`'B_k': B_k`**: 这里将列表 `B_k` 赋值给DataFrame的列 `'B_k'`。列表 `B_k` 包含优化后的比特币持有量的数据，这些数据将作为DataFrame的第二列。
    - **`'G_k': G_k`**: 这里将列表 `G_k` 赋值给DataFrame的列 `'G_k'`。列表 `G_k` 包含优化后的黄金持有量的数据，这些数据将作为DataFrame的第三列。
### Dataframe格式
+ 问：
	是不是Python中，字典的key可以是字符串，value可以是列表。而在`result_df = pd.DataFrame({ 'python_index': k, 'B_k': B_k, 'G_k': G_k })`函数中，key就是dataframe的列名，value就是对应列的值？
+ 答：
	是的，您的理解完全正确。在 Python 中，字典的键（key）可以是字符串，值（value）可以是列表或其他任何数据类型。在 `pd.DataFrame` 函数中，字典的键被用作 DataFrame 的列名，而字典的值被用作对应列的数据。

# Python画图(matplotlib库)
## 基本画图格式&步骤

### 步骤

```python
# 绘制折线图

#STEP1: 创建一个新的图形窗口，设置图形的大小为宽 10 个单位、高 6 个单位。
plt.figure(figsize=(10, 6))

#STEP2：画出图的具体内容 
plt.plot(range(63), Momentum_1[:63], label='Player 1', color='blue', linestyle='-', marker='o', alpha=0.7)
plt.plot(range(63), Momentum_2[:63], label='Player 2', color='red', linestyle='--', marker='x', alpha=0.7) 
plt.xlabel('Points', fontsize=14)
plt.ylabel('Momentum', fontsize=14)
plt.title('Set1 Players\'momentum Line Graph', fontsize=16)
plt.legend(fontsize=12)
plt.grid(True)
plt.xticks(fontsize=12)
plt.yticks(fontsize=12)

plt.tight_layout()

#STEP3: 显示绘制的图形
plt.show()
```

## 画对数坐标图
```python
import micropip 
await micropip.install("numpy")
await micropip.install("matplotlib")
import matplotlib.pyplot as plt
import numpy as np

x = np.logspace(0.1, 2, 100)  # 10^0.1 到 10^2
y = np.sqrt(x)

plt.plot(x, y)
plt.xscale('log')  # 设置X轴为对数坐标
plt.xlabel('log(x)')
plt.ylabel('y')
plt.title('X轴对数坐标图')
plt.grid(True, which="both", ls="--")
plt.show()
```

## 画子图
### 代码示例
```python
# 奇延拓展开成正弦级数

plt.subplot(2, 2, 1) #这段代码的功能是创建一个2行2列的子图布局，并选择第一个子图进行绘制

plt.plot(x, f_odd, label='奇延拓后的函数')

plt.title('奇延拓后的函数')

plt.title('奇延拓后的函数')

plt.xlabel('x')

plt.ylabel('f(x)')

plt.legend()
```

## 画三维图

### `np.meshgrid()`函数
#### 用``函数画三维图的原理：
![[Pasted image 20250307141317.png]]
+ 文字描述：程序需要计算每一个x下对应的所有y的f(x, y)
+ 伪代码描述
```
fot(int x = 1； x<4; x++){
	for(int y = 5; y<7; y++){
		f = f(x, y)
	}
}
```


#### 示例1：用`np.meshgrid`来画三维图

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# 定义 x 和 y 的取值范围
x = np.linspace(-5, 5, 100)
y = np.linspace(-5, 5, 100)

# 生成二维网格坐标矩阵，返回的X, Y
X, Y = np.meshgrid(x, y)

# 计算函数值
Z = X**2 + Y**2

# 创建 3D 图形对象
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

# 绘制三维曲面图
ax.plot_surface(X, Y, Z)

# 设置坐标轴标签
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')

# 显示图形
plt.show()
```

  
## 用`matplotlib.animation`库画动态图
### 代码原理
![[6f9ba782e10b0fafd7e8f3c3f368b69.jpg]]
### 代码示例
```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from mpl_toolkits.mplot3d import Axes3D

# 波参数设置
A = 1.0       # 振幅
kx, ky = 2.0, 2.0  # 波矢分量
omega = 3.0   # 角频率
v = omega / np.sqrt(kx**2 + ky**2)  # 波速计算

# 创建3D坐标系
fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')

# 生成网格（可调整范围）
x = np.linspace(-5, 5, 100)
y = np.linspace(-5, 5, 100)
X, Y = np.meshgrid(x, y)

# 初始化 表面图
surf = [ax.plot_surface(X, Y, np.zeros_like(X),
                       cmap='viridis',
                       rstride=2,
                       cstride=2)]

# 动画更新函数
def update(frame):
    global surf
    t = frame * 0.1
    # 平面波公式：Z = A*cos(kxX + kyY - ωt)
    Z = A * np.cos(kx*X + ky*Y - omega*t)
    
    # 更新表面
    surf[0].remove()
    surf[0] = ax.plot_surface(X, Y, Z,
                             cmap='viridis',
                             rstride=2,
                             cstride=2,
                             vmin=-1,
                             vmax=1)
    return surf

# 坐标轴设置
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Amplitude')
ax.set_zlim(-1.5, 1.5)
ax.view_init(elev=45, azim=30)  # 最佳观察角度

# 添加波矢箭头
ax.quiver(0, 0, 0,          # 起点坐标
          kx, ky, 0,        # 方向分量
          length=3,         # 箭头长度
          color='red',      # 箭头颜色
          arrow_length_ratio=0.1,
          label='Wave Vector')

plt.legend()

# 创建并保存动画
ani = animation.FuncAnimation(fig, update, frames=100, interval=50)
ani.save('2d_plane_wave.gif', writer='pillow', fps=20, dpi=80)

plt.show()
```

# 其它
### 引用外部变量
#### Python 中的 `extern` 类似功能

##### 1. **`global` 关键字（类似 `extern` 引用全局变量）**
在 Python 中，如果要在**函数内部**修改全局变量，需要使用 `global` 关键字。

```python
x = 10  # 全局变量

def modify_x():
    global x  # 说明 x 来自外部（全局）
    x += 5

modify_x()
print(x)  # 输出 15
```
##### 2. 使用 import 访问外部变量（类似 extern 引用外部变量）

如果变量定义在另一个 Python 文件中，可以用 import 引入，而不是 extern。

文件1（config.py）
```python
count = 10  # 变量定义

```
文件2（main.py）
```python

import config  # 相当于 C 语言的 extern int count;

print(config.count)  # 输出 10

如果想在 main.py 中修改 config.py 里的 count，需要 import 后直接赋值：

config.count += 5
print(config.count)  # 输出 15
```



## 切片操作
在 Python 中，切片操作是一种用于从序列（如列表、元组、字符串或 `pandas` 的 `Index` 对象）中提取部分元素的方法。它允许你通过指定起始索引、结束索引和步长来选择一个子序列。切片操作使用方括号 `[]` 并在其中使用冒号 `:` 分隔索引和步长。 以下是切片操作的基本语法： ```python sequence[start:stop:step] ``` - `start`：切片开始的索引位置（包含）。如果不指定，默认为序列的开始。 - `stop`：切片结束的索引位置（不包含）。如果不指定，默认为序列的结束。 - `step`：切片的步长。如果不指定，默认为 1。 **列表切片示例**： ```python my_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] # 从索引 2 开始到索引 5 结束（不包括 5） print(my_list[2:5]) # 输出: [2, 3, 4] # 从开始到索引 5 结束（不包括 5） print(my_list[:5]) # 输出: [0, 1, 2, 3, 4] # 从索引 2 开始到结束 print(my_list[2:]) # 输出: [2, 3, 4, 5, 6, 7, 8, 9] # 从开始到结束，步长为 2 print(my_list[::2]) # 输出: [0, 2, 4, 6, 8] # 从索引 1 开始到索引 8 结束，步长为 3 print(my_list[1:8:3]) # 输出: [1, 4, 7] ``` **字符串切片示例**： ```python my_string = "Hello, World!" # 从索引 7 开始到索引 12 结束（不包括 12） print(my_string[7:12]) # 输出: World # 从开始到索引 5 结束（不包括 5） print(my_string[:5]) # 输出: Hello # 从索引 7 开始到结束 print(my_string[7:]) # 输出: World! # 从开始到结束，步长为 2 print(my_string[::2]) # 输出: Hlo ol! # 从索引 1 开始到索引 8 结束，步长为 3 print(my_string[1:8:3]) # 输出: el ``` **`pandas` 的 `Index` 对象切片示例**： 假设 `df` 是一个 `pandas` 的 `DataFrame`，你可以对 `df.columns` 进行切片操作： ```python import pandas as pd data = {'A': [1, 2, 3], 'B': [4, 5, 6], 'C': [7, 8, 9], 'D': [10, 11, 12]} df = pd.DataFrame(data) # 获取部分列名 print(df.columns[1:3]) # 输出: Index(['B', 'C'], dtype='object') # 获取偶数位置的列名 print(df.columns[::2]) # 输出: Index(['A', 'C'], dtype='object') ``` **注意事项**： - 切片操作不会修改原始序列，而是返回一个新的序列。 - 对于负数索引，它从序列的末尾开始计数。例如，`my_list[-1]` 是列表的最后一个元素，`my_list[-3:-1]` 是从倒数第三个元素到倒数第二个元素（不包括倒数第一个元素）。 **使用场景**： - **数据提取**：当你只需要序列中的一部分数据时，例如从一个较长的列表中提取中间的几个元素。 - **数据采样**：当你想以一定的间隔提取元素时，使用步长进行采样。 - **数据分割**：在处理字符串时，你可以使用切片将其分成不同的部分，例如提取日期中的年、月、日部分。 切片操作是 Python 中一种非常灵活和强大的工具，能让你更方便地操作序列数据，在数据处理、字符串操作和 `pandas` 数据分析中都有广泛的应用。在你之前计算 RSI 的代码中，切片操作可以用来选择数据集中的部分数据进行计算，比如选取特定日期范围的数据进行 RSI 的计算或仅处理数据集中的部分列。

# 调试方法
## 创建配置文件
在 Visual Studio Code 中，创建 `launch.json` 文件并配置调试器后，你可以调试整个文件中的代码。具体步骤如下：

1. **创建 `launch.json` 文件**：
   - 打开命令面板（快捷键 `Ctrl+Shift+P`）。
   - 输入并选择 `Debug: Open launch.json`。
   - 如果提示选择环境，选择 `Python`。
   - 这将会在 

.vscode

 文件夹中创建一个 `launch.json` 文件。

2. **配置 `launch.json` 文件**：
   在 `launch.json` 文件中添加以下配置，以便调试当前文件：

   ```json
   {
       "version": "0.2.0",
       "configurations": [
           {
               "name": "Python: 当前文件",
               "type": "python",
               "request": "launch",
               "program": "${file}",
               "console": "integratedTerminal"
           }
       ]
   }
   ```

   这个配置的作用是：
   - `"name"`：配置的名称，可以是任意描述性的字符串。
   - `"type"`：调试器的类型，这里是 `python`。
   - `"request"`：请求类型，这里是 `launch`，表示启动程序。
   - `"program"`：要调试的程序，这里使用 `${file}` 表示当前打开的文件。
   - `"console"`：指定调试输出的控制台，这里是 `integratedTerminal`，表示使用集成终端。

3. **启动调试**：
   - 打开你要调试的 Python 文件（例如 

draft.py

）。
   - 设置断点：在你想调试的行上点击行号左侧的灰色区域，设置一个断点。
   - 打开调试面板（快捷键 `Ctrl+Shift+D`）。
   - 选择你在 `launch.json` 中配置的调试配置（例如 "Python: 当前文件"）。
   - 点击绿色的播放按钮（或按 `F5`）启动调试。

通过这些步骤，你可以调试整个文件中的代码。`launch.json` 文件的配置使得你可以方便地启动和调试当前文件。

找到具有 2 个许可证类型的类似代码

``
## 按钮作用
在调试过程中，继续、逐过程和单步调试是三种常用的调试操作，它们的作用如下：

1. **继续 (Continue)**：
   - **作用**：继续执行程序，直到遇到下一个断点或程序结束。
   - **快捷键**：`F5`
   - **使用场景**：当你设置了多个断点，并希望程序运行到下一个断点时使用。

2. **逐过程 (Step Over)**：
   - **作用**：逐行执行代码，但如果遇到函数调用，不会进入函数内部，而是直接执行完函数调用后跳到下一行。
   - **快捷键**：`F10`
   - **使用场景**：当你希望逐行查看代码执行情况，但不需要查看函数内部的执行细节时使用。

3. **单步调试 (Step Into)**：
   - **作用**：逐行执行代码，如果遇到函数调用，会进入函数内部，逐行查看函数内部的执行情况。
   - **快捷键**：`F11`
   - **使用场景**：当你希望查看函数内部的执行细节时使用。

4. **跳出 (Step Out)**：
   - **作用**：执行完当前函数的剩余代码，并返回到调用该函数的地方。
   - **快捷键**：`Shift+F11`
   - **使用场景**：当你在函数内部调试时，希望快速跳出函数，返回到上一级调用位置时使用。

这些调试操作可以帮助你更好地理解代码的执行流程，定位和修复问题。通过合理使用这些操作，你可以高效地进行代码调试。

在 VS Code 中调试 Python 循环时，确实会遇到需要快速跳转到特定循环次数的情况。以下是几种高效的方法：

## 对循环语句方便的调试方法

### 1. **条件断点（最推荐）**
   - 在循环内设置断点后**右键点击断点** → 选择 **"Edit Breakpoint"**
   - 输入条件表达式（例如）：
     ```python
     i == 9  # 跳到第10次循环（从0开始计数）
     ```
     ```python
     iteration >= 100  # 变量名根据你的代码调整
     ```
   - 当条件满足时断点才会触发

### 2. **调试控制台临时修改变量**
   当循环暂停时：
   - 打开调试控制台（Debug Console）
   - 直接输入命令修改循环变量：
     ```python
     i = 99  # 直接跳到第100次迭代
     ```
   - 点击继续执行（F5）

### 3. **使用 `breakpoint()` 函数**
   在代码中插入条件判断：
   ```python
   for i in range(1000):
       if i == 100:  # 在第100次循环时暂停
           breakpoint()  # Python 3.7+
       # 循环体
   ```

### 4. **Logpoint（无暂停输出）**
   - 右键点击行号 → Add Logpoint
   - 输入日志信息（例如）：
     ```
     Iteration {i}, value={x}
     ```
   - 会在调试时输出日志而不会暂停

### 5. **调试快捷键加速**
   - `F10`：单步跳过（不进入函数）
   - `F11`：单步进入（进入函数）
   - `Shift+F11`：跳出当前函数
   - `Ctrl+F5`：继续到下一个断点

### 进阶技巧：
对于复杂循环，可以：
1. 在循环前添加临时条件判断缩短循环次数
   ```python
   for i in range(100000):
       if i < 99000: continue  # 临时跳过前99000次
       # 调试代码
   ```
2. 使用 VS Code 的 **"Run to Cursor"** 功能（右键菜单）

> ⚠️ 注意：修改循环变量值时需确保不会导致逻辑错误（如跳过必要的初始化）。

这些方法组合使用可以极大提高调试循环的效率，特别是处理大数据集或复杂算法时。

# 常见报错类型

在 Python 里，存在许多常见的报错类型，下面为你详细介绍几种常见错误及其产生原因和示例：
## 最常见的一些
### 1. `IndexError`


- **含义**：当你尝试访问序列（像列表、元组、字符串等）中不存在的索引时，就会引发`IndexError`。也就是说，索引超出了序列的有效范围。
- **示例代码**：

```python
my_list = [1, 2, 3]
print(my_list[3])  # 列表索引范围是0到2，访问索引3会引发IndexError
```

- **错误原因**：`my_list`只有 3 个元素，索引范围是从 0 到 2，而代码中尝试访问索引为 3 的元素，这超出了列表的有效索引范围，因此触发`IndexError`。

### 2. `ValueError`


- **含义**：当函数接收到一个类型正确但值不合法的参数时，会抛出`ValueError`。
- **示例代码**：

```python
num = int("abc")  # 尝试将非数字字符串转换为整数会引发ValueError
```

- **错误原因**：`int()`函数用于将字符串转换为整数，但传入的字符串`"abc"`不能被转换为有效的整数，所以引发`ValueError`。
### 3. `TypeError`


- **含义**：当操作或函数应用于不兼容类型的对象时，就会产生`TypeError`。例如，对不同类型的对象使用不恰当的运算符，或者给函数传入类型错误的参数。
- **示例代码**：
  
```python
result = "hello" + 1  # 字符串和整数不能直接相加，会引发TypeError
```

- **错误原因**：在 Python 里，字符串和整数不能直接使用`+`运算符进行拼接或相加操作，所以会触发`TypeError`。

### 4. `KeyError`

- **含义**：在尝试访问字典中不存在的键时，会抛出`KeyError`。
- **示例代码**：

```python
my_dict = {"name": "Alice", "age": 25}
print(my_dict["city"])  # 字典中没有"city"这个键，会引发KeyError
```

- **错误原因**：`my_dict`这个字典里没有`"city"`这个键，当尝试通过该键访问值时，就会引发`KeyError`。

### 5. `SyntaxError`


- **含义**：`SyntaxError`表示代码存在语法错误，通常是由于代码不符合 Python 的语法规则而导致的，比如拼写错误、缺少必要的符号等。
- **示例代码**：


```python
if x = 5:  # 正确的语法是使用 == 进行比较，这里会引发SyntaxError
    print("x is 5")
```

- **错误原因**：在 Python 中，`=`是赋值运算符，`==`才是比较运算符。代码里使用`=`进行条件判断，不符合 Python 的语法规则，因此引发`SyntaxError`。


### 6. `NameError`


- **含义**：当你尝试使用一个未定义的变量或函数名时，会出现`NameError`。
- **示例代码**：

```python
print(y)  # 变量y未定义，会引发NameError
```

- **错误原因**：代码中尝试打印变量`y`，但`y`在使用前并未被定义，所以触发`NameError`。
## 还有一些
### 读取excel文件路径时犯的错
这个错误 `OSError: [Errno 22] Invalid argument` 通常表示你传递给 `open` 函数（`pandas` 在读取文件时会调用它）的文件路径参数存在问题。具体到你给出的错误信息，问题可能出在文件路径里包含了多余的引号。

  

错误信息里的文件路径是 `"D:\\what_i_am_doing\\Competition\\Math modeling\\2025美 赛\\2025C\\intermediate_file\\processed_summerOly_athletes2.csv"`，可以看到路径的首尾有多余的双引号 `"`，这会让 Python 把包含引号的整个字符串当作路径，而操作系统并不认为这样带引号的路径是有效的，所以就抛出了 `Invalid argument` 错误
# 其它
## 加注释
用`#`

```python
#return np.where((t % period) < duty_cycle * period, 10, 0)
```

注意不像c语言用`//`来注释
## 如果code emitter不能导入numpy
```python
import micropip 
await micropip.install("numpy")
```
## 不能导入tensorflow
我直接去安装路径查看了一下，发现tensorflow和keras的包是独立的，也就是keras没有在tensorflow包下面，我在想那是不是可以直接从keras导入呢？