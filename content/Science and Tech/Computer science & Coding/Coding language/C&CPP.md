# C语言编译
# 应用
## **C 语言开发场景与编译器对比表**

| **开发场景**      | **典型编译器**                             | **目标文件格式**                          | **特点**                   |
| ------------- | ------------------------------------- | ----------------------------------- | ------------------------ |
| 桌面应用（Windows） | Microsoft Visual C++  <br>MinGW/MSYS2 | `.exe`（可执行文件）  <br>`.dll`（动态链接库）    | 依赖 Windows API，支持 COM 组件 |
| 桌面应用（Linux）   | GCC、Clang                             | ELF（Executable and Linkable Format） | 支持动态链接（`.so`）和静态链接（`.a`） |
| 桌面应用（macOS）   | Clang（Xcode）                          | Mach-O（Mach Object File Format）     | 支持 ARC（自动引用计数）           |
| 嵌入式系统（ARM）    | arm-none-eabi-gcc  <br>Keil MDK       | `.elf`（调试用）  <br>`.bin`/`.hex`（烧录用） | 需手动配置内存布局（如`.ld`链接脚本）    |
| 嵌入式系统（AVR）    | AVR-GCC                               | `.hex`（Intel Hex 格式）                | 常用于 Arduino 等 8 位单片机     |
| 操作系统内核        | GCC、Clang                             | 自定义格式（如 Linux 内核`.bzImage`）         | 无标准库依赖，直接操作硬件            |
| 游戏引擎          | GCC、Clang、MSVC                        | 跨平台格式（如`.o`/`.obj`中间文件）             | 需优化内存管理和图形渲染             |
| 高性能计算         | Intel ICC、GCC                         | ELF（Linux）/PE（Windows）              | 支持 OpenMP、MPI 等并行编程模型    |
| 数据库系统         | GCC、Clang、MSVC                        | ELF/Mach-O/PE                       | 优化内存管理和并发操作              |
# C语言编译过程
## C语言编译器
![[Pasted image 20250428165838.png]]
## 简单的流程
![[Pasted image 20250428174953.png]]
![[Pasted image 20250428175012.png]]
## 理解`main.c`作为入口
### 概述

在一个典型的 C 项目中，`main.c`（或更准确地说，`main` 函数）就是程序在“托管环境”（如操作系统下）的入口点，负责所有初始化和主循环的执行 ([Entry point](https://en.wikipedia.org/wiki/Entry_point?utm_source=chatgpt.com), [Main function - cppreference.com](https://en.cppreference.com/w/c/language/main_function?utm_source=chatgpt.com))。编译器在编译阶段仅根据 `main.c` 中的声明生成对外部符号（如 `OLED_DrawImage`）的调用指令；而真正的函数实现则编译进 `oled.o`，由链接器在链接阶段完成符号解析和地址修正 ([Linker (computing)](https://en.wikipedia.org/wiki/Linker_%28computing%29?utm_source=chatgpt.com), [Linker | GeeksforGeeks](https://www.geeksforgeeks.org/linker/?utm_source=chatgpt.com))。

---

### `main.c` 作为项目入口

- **`main` 在 C 标准中的角色**  
    C 语言要求在托管环境下定义一个 `main` 函数，编译器/运行时会在启动时调用它，从而开始程序的执行 ([Main function - cppreference.com](https://en.cppreference.com/w/c/language/main_function?utm_source=chatgpt.com), [C syntax](https://en.wikipedia.org/wiki/C_syntax?utm_source=chatgpt.com))。
    
- **嵌入式与裸机环境的差异**  
    在裸机（freestanding）环境中，入口点由实现定义（如复位向量或 `_start`），系统启动后再跳转到 `main`；但在常见的嵌入式板卡上，启动汇编代码通常初始化堆栈、全局变量，再最终调用 `main` ([Why is it a bad practice to call the C/C++ entry point main? - Reddit](https://www.reddit.com/r/osdev/comments/9crj95/why_is_it_a_bad_practice_to_call_the_cc_entry/?utm_source=chatgpt.com), [Why do we use main function in almost all the programming ...](https://cs.stackexchange.com/questions/160004/why-do-we-use-main-function-in-almost-all-the-programming-languages?utm_source=chatgpt.com))。
    
- **`main.c` 的编译作用**  
    当你将 `main.c` 添加到工程并包含相应头文件后，编译器会把它单独编译成 `main.o`，其中包含了对 `main` 本身以及所有被调用外部函数（如 `OLED_DrawImage`）的符号引用。
    

---

### 链接阶段的符号解析与重定位

- **符号引用与定义**  
    链接器维护一个全局符号表：每遇到一个目标文件（`.o`），它就把其中定义的全局符号加入表中；同时也记录所有未定义（undefined）的外部符号引用 ([Symbol Processing (Linker and Libraries Guide)](https://docs.oracle.com/cd/E19683-01/817-3677/chapter2-14824/index.html?utm_source=chatgpt.com), [Linker (computing)](https://en.wikipedia.org/wiki/Linker_%28computing%29?utm_source=chatgpt.com))。
    
- **符号解析**  
    当链接器在 `main.o` 中发现对 `OLED_DrawImage` 的未定义引用时，就会在已加载的 `oled.o` （或库文件）中寻找同名定义；找到后，链接器将引用绑定到该定义，实现“谁调用谁” ([Symbol Processing - Linker and Libraries Guide](https://docs.oracle.com/cd/E23824_01/html/819-0690/chapter2-90421.html?utm_source=chatgpt.com), [Linker | GeeksforGeeks](https://www.geeksforgeeks.org/linker/?utm_source=chatgpt.com))。
    
- **地址重定位**  
    链接器不仅匹配符号，还要计算函数和变量在最终可执行映像（如 ELF 或固件镜像）中的实际地址，然后补写（relocation）到每个目标文件的机器码中。这样，`main.o` 中的调用指令才能跳转到 `oled.o` 中对应函数的正确地址 ([Symbol resolution & relocation - Static Linking - ElseWhere](https://duetorun.com/blog/20230627/symbol-resolution-relocation/?utm_source=chatgpt.com), [Linker (computing)](https://en.wikipedia.org/wiki/Linker_%28computing%29?utm_source=chatgpt.com))。
    
- **最终输出**  
    完成符号解析和重定位后，链接器生成一个可执行文件（或嵌入式固件），其中 `main` 调用 `OLED_DrawImage` 时，CPU 就会执行 `oled.o` 编译出的机器码。
    

---

### 小结

- `main.c`（及其 `main` 函数）是托管环境下程序的入口点；在裸机环境中，入口（如复位向量）通常最终也跳转到 `main`。
    
- 编译阶段为每个 `.c` 文件生成目标 `.o`，其中包含对函数的调用符号引用但不包含实现。
    
- 链接阶段，链接器把所有目标文件的符号引用和定义对应起来，并修正调用指令的地址，实现跨模块调用。
    
- 因此，尽管 `main.c` 中调用了 `OLED_DrawImage`，真正的实现代码保存在 `oled.o` 中，只有在链接时才被合并并使调用生效。
## 函数调用
## 具体例子:在`mian.c`中调用`oled.c`中的`OLED_DrawImage`
### 简单介绍此时编译器工作流程
当你在 `main.c` 中这样写：

```c
#include "oled.h"

int main(void) {
    // … 初始化代码 …
    OLED_DrawImage(0, 0, &myImage, OLED_COLOR_NORMAL);
    // …
}
```

整个流程大致分为两个阶段：**编译（compile）** 和 **链接（link）**，再加上预处理（pre-processing）其实就是编译前的第一步。下面分步说明编译器和链接器都在做什么。

---

#### 1. 预处理（Pre-processing）

在这一步，编译器的预处理器会把 `#include "oled.h"` 当成“把 `oled.h` 里所有的文本<mark style="background: #ADCCFFA6;">原封不动地插入到 `main.c` 当前这一行</mark>”，<mark style="background: #ADCCFFA6;">其实就是复制粘贴</mark>，并且处理掉所有的宏定义、条件编译等。

- **结果**：生成一个“融合过头文件”的中间 C 源码，比如
    
    ```c
    // …oled.h 中的内容都插到这里…
    typedef enum { … } OLED_ColorMode;
    void OLED_DrawImage(uint8_t x, uint8_t y, const Image *img, OLED_ColorMode color);
    // …然后才接着 main.c 的代码…
    int main(void) { … }
    ```
    

---

#### 2. 编译（Compile）

预处理后得到的每个 `.c` 文件，编译器会把它转换成对应的 **目标文件**（object file），通常是 `.o` 或 `.obj`。

- 编译器在这一阶段**只关注当前翻译单元（translation unit）**——也就是它手里那个融合过头文件的 `.c`。
    
- 它会看到 `OLED_DrawImage(...)` 的**声明**（prototype），知道函数名、参数类型和返回值类型，于是它在调用点生成一条“对符号 `OLED_DrawImage` 的外部调用”（external call）。
    
- 它并不会去找 `oled.c`，也不知道具体实现，编译器只保证调用的参数和返回值类型是合法的。
    

编译结束后，你会得到两个或更多的 `.o` 文件，比如 `main.o` 和 `oled.o`。

---

#### 3. 链接（Link）

链接器会把所有的目标文件（`main.o`、`oled.o` …）以及你可能还用到的库文件（比如 HAL 库）一起拿来：

1. 它看到在 `main.o` 里有一个对 `OLED_DrawImage` 的符号引用（reference）。
    
2. 在 `oled.o` 里，它找到一个同名的符号定义（definition），也就是 `OLED_DrawImage` 的那段机器码。
    
3. 链接器就把二者“粘”到一起，修正调用地址，让 `main` 里调用 `OLED_DrawImage` 时跳转到 `oled.o` 中的实现。
    

最终产出一个可执行文件（在嵌入式环境下通常是 `.elf` 或烧录镜像），里面已经把所有函数的实现和调用地址都串联好了。

---

#### 小结

1. **`#include "oled.h"`** 只在预处理阶段把函数声明、类型定义拷贝进来，保证编译器知道你要用什么接口。
    
2. 编译器编译每个 `.c`，根据头文件里的声明生成对外部符号（函数）的调用指令，但不去展开函数体。
    
3. 链接器把各个 `.o` 文件中“谁调用谁”和“谁实现谁”对应起来，最终把调用 `OLED_DrawImage` 的指令和它在 `oled.o` 中的实现连接到一起。
    

这样就实现了“接口（声明）与实现（定义）分离”，也是 C 语言常见的模块化编程方式。

### 那oled.c这个文件会在什么时候发挥作用？

`oled.c` 的“作用时机”主要体现在两步：

1. **编译阶段**
    
    - 当你在工程（比如 STM32CubeIDE 或 Makefile）里把 `oled.c` 加入到源文件列表后，IDE／编译系统就会把它当作一个独立的翻译单元（translation unit）去编译，生成一个目标文件 `oled.o`（或类似扩展名）。
        
    - 在这一步，编译器会把 `oled.c` 里的所有函数体（包括 `OLED_DrawImage`、`OLED_Init` 等）翻译成机器码，打包到 `oled.o` 里。
        
2. **链接阶段**
    
    - 链接器（Linker）把你工程里所有的目标文件（`main.o`、`oled.o`、HAL 库对应的 `.o`／`.a` 等）拉到一起，查找每个外部符号（external symbol）的“引用”与“定义”并将它们粘合起来。
        
    - 例如，<mark style="background: #ADCCFFA6;">在 `main.o` 里看到对 `OLED_DrawImage` 的调用符号引用，就到 `oled.o` 里去找同名的函数实现（definition），然后把调用地址修正到那段机器码上</mark>。
        

简单来说：

- **编译时**，`oled.c` 负责把 OLED 驱动的源码变成可链接的机器码（`oled.o`）。
    
- **链接时**，`oled.o` 中的那些机器码才真正被合并到最终的固件（`.elf` 或二进制镜像）里；
    
- **运行时**，当程序执行到 `OLED_DrawImage()`、`OLED_Init()` 等函数调用时，CPU 就会跳到 `oled.o`（已加载到 Flash/RAM）里的那段代码去执行。
    

如果你把 `oled.h` 包含进了 `main.c`，但忘了把 `oled.c` 加入工程，那么在链接阶段就会出现“undefined reference to `OLED_DrawImage`”之类的错误，因为链接器找不到对应的函数实现。只要 `oled.c` 在工程里、能正常编译并参与链接，它就会在最终固件中发挥作用。

## 预编译指令

下面以这段代码为例，详细讲解 C 语言中预编译指令（特别是`#define`）的作用：

### **一、预编译指令概述**

预编译指令是 C 语言编译过程中的**第一步**，由预处理器（Preprocessor）执行。它们以`#`开头，在代码正式编译前进行文本替换或条件处理。常见指令包括：
  
- `#define`：宏定义，文本替换
- `#include`：文件包含
- `#ifdef/#ifndef`：条件编译
- `#pragma`：编译器特定指令


### **二、宏定义 代码中`#define`的作用分析**

#### **1. 常量定义（数值宏）**

c

运行

```c
#define AD9850_OSC_FREQ		125000000u	/* AD9850 模块外接的晶振频率, 单位Hz */
```

  

- **作用**：用`AD9850_OSC_FREQ`代替`125000000u`（`u`表示无符号整数）。
- **优势**：
    - **可读性**：直接看到`AD9850_OSC_FREQ`就知道是晶振频率。
    - **可维护性**：若晶振频率改变，只需修改一处。
    - **避免硬编码**：减少重复输入和错误。
#### **2. 硬件引脚映射（标识符宏）**

c

运行

```c
#define DDS_RESET_PORT	RESET_GPIO_Port
#define DDS_RESET_PIN	RESET_Pin
// ... 其他引脚定义 ...
```

  

- **作用**：将硬件相关的端口（如`RESET_GPIO_Port`）和引脚（如`RESET_Pin`）映射为自定义名称（如`DDS_RESET_PORT`）。
- **优势**：
    - **与硬件解耦**：若更换引脚（如从 PA3 改为 PB5），只需修改此处，无需改动后续代码。
    - **提高可读性**：`DDS_RESET_PORT`比`RESET_GPIO_Port`更直观地表明用途。

#### **3. 函数式宏（带参数的宏）**

c

运行

```c
#define DDS_RESET_1()	HAL_GPIO_WritePin(DDS_RESET_PORT,DDS_RESET_PIN,GPIO_PIN_SET)
#define DDS_RESET_0()	HAL_GPIO_WritePin(DDS_RESET_PORT,DDS_RESET_PIN,GPIO_PIN_RESET)
// ... 其他IO操作宏 ...
```

  

- **作用**：用简单的宏（如`DDS_RESET_1()`）代替复杂的 GPIO 操作函数。
- **优势**：
    - **简化代码**：将冗长的函数调用简化为`DDS_RESET_1()`，提高代码清晰度。
    - **避免函数调用开销**：宏在编译时直接展开，无需像函数一样压栈、出栈，适合高频操作。
- **注意**：宏参数没有类型检查，可能导致意外错误（需谨慎设计）。

### **三、预编译指令的执行流程**

1. **预编译阶段**：
    - 编译器读取代码，遇到`#define`时，将所有后续出现的宏名称替换为对应文本。
    - 例如：`DDS_RESET_1()` → `HAL_GPIO_WritePin(RESET_GPIO_Port,RESET_Pin,GPIO_PIN_SET)`。
2. **编译阶段**：
    - 替换后的代码进入正式编译，生成机器码。

### **四、使用预编译指令的好处**

1. **代码复用**：通过宏定义减少重复代码。
2. **条件编译**：结合`#ifdef`可针对不同硬件平台选择编译不同代码。
3. **性能优化**：函数式宏避免函数调用开销，适合嵌入式系统。
4. **可维护性**：集中管理硬件配置（如引脚定义），修改时只需改动一处。
# 内置数据类型
## 不同数据类型以及其存储方式
![[Pasted image 20250309162050.png]]
## 不同数据类型的运算处理方式

• 如果运算符两侧的数中有一个是`float`或`double`类型，结果将是`double`类型。这是因为系统会先将所有`float`类型的数据转换为`double`类型，然后再进行运算。

• 如果`int`类型与`float`或`double`类型进行运算，先将`int`和`float`类型转换为`double`类型，然后再进行运算，结果也是`double`类型。

• 字符型（`char`）数据与整型数据进行运算时，实际上是将字符的ASCII码与整型数据进行运算。例如，字符'A'的ASCII码是65，所以`12 + 'A'`相当于`12 + 65`，结果为77。如果字符型数据与实型数据进行运算，则先将字符的ASCII码转换为`double`类型数据，然后再进行运算。


```c
#include <stdio.h>

// 定义一个枚举类型表示颜色
enum Color {
    Red = 1,
    Green = 2,
    Blue = 4
};

int main() {
    // 声明一个枚举类型的变量
    enum Color favoriteColor;

    // 给枚举变量赋值
    favoriteColor = Green;

    // 打印枚举变量的值
    printf("我最喜欢的颜色对应的数值是%d\n", favoriteColor);

    return 0;
}
```

```c
#include <stdio.h>

// 定义一个枚举类型表示星期
enum Weekday {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
};

int main() {
    // 声明一个枚举类型的变量
    enum Weekday today;

    // 给枚举变量赋值
    today = Wednesday;

    // 打印枚举变量的值
    printf("今天是星期%d\n", today);

    return 0;
}
```

## 其它知识点
### 浮点数的表示

在 C 语言中，浮点数常量默认是 `double` 类型（双精度浮点数）。`double` 类型通常占用 8 个字节，能提供更高的精度和更大的数值范围。而 `float` 类型（单精度浮点数）占用 4 个字节，精度相对较低，但占用的内存空间也更小，运算速度可能更快。

### `f` 后缀的作用

  
当你在一个浮点数常量后面加上 `f` 或者 `F` 后缀时，就明确指定了这个常量是 `float` 类型。所以 `1000000.0f` 表示的是一个 `float` 类型的常量，其值为 1000000.0。
# 运算符
## `!`
是不是在c语言中==所有非零的数==，==用！取反后都==变为0(false)?

==是的==，在 C 语言里，`!` 作为逻辑取反运算符，对于所有非零的数，使用它取反后结果都会变为 `0`

```c
#include <stdio.h>

int main() {
    int num1 = 1;
    int num2 = -1;
    int num3 = 100;

    printf("!num1: %d\n",!num1); 
    printf("!num2: %d\n",!num2); 
    printf("!num3: %d\n",!num3); 

    return 0;
}
```
## 取反`~`
```c
#include <stdio.h>
#include <stdint.h>

int main() {
    uint8_t received_data = 0x55;  // 定义接收到的数据
    uint8_t inverted_data = ~received_data;  // 按位取反操作

    // 打印原始数据和取反后的数据
    printf("Received data: 0x%02X\n", received_data);
    printf("Inverted data: 0x%02X\n", inverted_data);

    return 0;
}
```
## 左移`<<`和右移 `>>`
### 左移
在C语言中，<< 是 左移位操作符，用于将一个数的二进制位向左移动指定的位数。每次左移一位，相当于将该数乘以2。

具体例子：

假设我们有一个整数 x = 5，其二进制表示为 0000000000000101（8位表示）。
```c
#include <stdio.h>

int main() {
    int x = 5; // 5 的二进制是 0000000000000101
    int result = x << 1; // 左移 1 位
    printf("x = %d, x << 1 = %d\n", x, result); 
    return 0;
}
```

输出：

x = 5, x << 1 = 10

解释：
	•	原始的 x = 5 的二进制是 0000000000000101。
	•	执行 x << 1 时，二进制的所有位向左移动一位，空出的右边位置补零，结果是 0000000000001010，即十进制的 10。

左移 1 位，相当于将 5 乘以 2，所以结果是 10。

更多示例：
	•	x << 2 相当于将 x 乘以 4（即左移两位）。
	•	x << n 相当于将 x 乘以 2^n。

# 语句
## if&else条件语句
在代码 `if (!DL_GPIO_readPins(GPIO_SWITCHES_PORT, GPIO_SWITCHES_USER_SWITCH_1_PIN))` 里，`if` 语句块会在满足特定条件时执行，下面详细分析：

### 函数 `DL_GPIO_readPins` 的作用

`DL_GPIO_readPins` 这个函数的功能是读取指定端口（`GPIO_SWITCHES_PORT`）上指定引脚（`GPIO_SWITCHES_USER_SWITCH_1_PIN`）的电平状态。一般而言，该函数的返回值会遵循如下规则：

  

- 当引脚为高电平时，函数返回非零值。
- 当引脚为低电平时，函数返回 `0`。

### `!` 运算符的作用

`!` 是逻辑取反运算符，它会把操作数的逻辑值取反，也就是将真变为假，将假变为真。在 C 语言里，`0` 代表假（`false`），非零值代表真（`true`）。

### `if` 语句执行的条件

结合 `DL_GPIO_readPins` 函数的返回值和 `!` 运算符的作用，`if` 语句块会在下面的条件下执行：

  

- 当 `DL_GPIO_readPins(GPIO_SWITCHES_PORT, GPIO_SWITCHES_USER_SWITCH_1_PIN)` 返回 `0`（即引脚为低电平）时，`!` 运算符会将其取反为 `1`（真），==此时 `if` 语句的条件为真==，`if` 语句块会被执行。
- 当 `DL_GPIO_readPins(GPIO_SWITCHES_PORT, GPIO_SWITCHES_USER_SWITCH_1_PIN)` 返回非零值（即引脚为高电平）时，`!` 运算符会将其取反为 `0`（假），==此时 `if` 语句的条件为假==，`if` 语句块不会被执行，而是执行 `else` 语句块（如果存在）。

### 结合实际应用场景

在实际应用中，`GPIO_SWITCHES_USER_SWITCH_1_PIN` 往往连接着一个开关。当开关按下时，引脚可能会接地从而变为低电平，`DL_GPIO_readPins` 返回 `0`，`if` 语句块执行；当开关松开时，引脚可能通过上拉电阻变为高电平，`DL_GPIO_readPins` 返回非零值，`if` 语句块不执行。

综上所述，`if` 语句块会在 `GPIO_SWITCHES_USER_SWITCH_1_PIN` 引脚为低电平时执行。
### 与条件语句有关的“三目运算符”
在 C 语言中，三目运算符也被称为条件运算符，它是 C 语言里唯一的一个需要三个操作数的运算符。下面为你详细介绍它的语法、使用场景、示例及注意事项。

### 语法结构

三目运算符的基本语法格式如下：

  

plaintext

```plaintext
条件表达式? 表达式1 : 表达式2
```

  

具体执行逻辑为：

  

1. 首先对条件表达式进行求值判断。
2. 若条件表达式的值为真（非零），则整个三目运算符表达式的值为表达式 1 的值。
3. 若条件表达式的值为假（零），则整个三目运算符表达式的值为表达式 2 的值。

### 使用场景

三目运算符常用于简单的条件判断场景，用来替代简单的`if - else`语句，使代码更加简洁。比如根据条件给变量赋值、在函数参数中进行条件选择等。

### 示例代码

#### 示例 1：根据条件给变量赋值

c

```c
#include <stdio.h>

int main() {
    int num = 15;
    int result;

    // 使用三目运算符判断 num 是否大于 10
    result = (num > 10)? 1 : 0;

    printf("结果是: %d\n", result);
    return 0;
}
```

  

在这个示例中，若`num`大于 10，`result`的值就为 1；反之，`result`的值为 0。

#### 示例 2：在函数参数中进行条件选择

c

```c
#include <stdio.h>

int max(int a, int b) {
    return (a > b)? a : b;
}

int main() {
    int x = 20;
    int y = 30;
    int maximum = max(x, y);

    printf("较大的数是: %d\n", maximum);
    return 0;
}
```

  

  

  

  

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAAAgCAYAAADTydBfAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANASURBVHgB7ZqxktMwEIZXN3RQXMXQ4XuDo6Bj5swTkFxFF7cUTCjpSJ6A4wlwXuAuj+CboaPg3uB8HUOVAmqzG5Q5e0+yJcux42G/GU2SlWQ50m9ptZYqzs9uASCCYcjV5fUJCAfDEQwnBhi4bcHAEQhCCRGEUEEEIVR4BCOgKIpj/DiGDlBK5SFt2Oq3BduNmGmDbWzAk9A+2v2vUQgCmWD6Ch2AHfca/3xmyLrANHOoT4O1xrQMFYcWwy0z32B6Af443X/NvWz7RZYMf+gpTDD9wE6cQBifDLZTvG4MAyGCaA8J4woH7xTaE1vscxgIEUQ4V9ACFFIC9jhMrH2C3hmFIHBtS5UFzD4xlK8js7SRNNTbtbVmVaOWU3zdek9i+AAeuNy/S7/IDOEBdlqOaYpfM5YVgwfamYwbir2BARBBtOOO/X4OfiQG2xf2exDncizbzkODC+AO/ODLRYZpoe1l32ECD2cjI/9bHOIg0J1OO4CYZd04XgL0VjVi5hUOyAbzVlDdYczQtlBugapO4hAiCA12CHVo07ptegrJr1iDOzND/VR/p+vMWXsJ/BvsXhBB3EOdH4E/S9eC2pnkwazV7gs9oVgmg+oMRCLtTRDiVIaxLD3dLpgimyn7zZ3LuE/nUmaIdtCaPrXFNGrgEchUPXwfkunr+zqXFLdYQHu2fooI4h6allNLHg0IX9u90E95xMwrXk47lzRLlN9zNDqXOs/F+axFBKHBDrXuFHAwKI9vCentq895UJMzmVnKkjjLgujNuRQfwgH99HHnkULWC5f62plMmHnZ0F7GzL1ELsNmiMdPAF6+civ7/RvAn98wVnCQLnBgaVDiknmONpMfwIkNtgzqWbJ6W+fSNqvQfUBAHALpIA5Bgnj/0a3su7ejFoSGDxJN5Z8xTRvq8XMPjSLSW9A2zmUQsmR4oJ9O7ghO6raFrs6kBb4Fne37tbgIwh/a3nFvvu54n48zyeFO5M653BuqOD8rIISnz9zK/fppNKvLawWB8IOqquODsIb2TCFs4+HY0EO0rvU7OIi8vW74ttMy0H2ybwEY2nPe84fem2v9ruIQsmQIFUQQQgURhFCBBJHDcOQgHBR/AbtjHODF1pruAAAAAElFTkSuQmCC)

  

此示例中，`max`函数借助三目运算符返回两个数中的较大值。

  

## Switch条件语句
### 基本语法
在 C 语言里，`switch`语句属于一种多分支选择语句，它可以依据表达式的值来选择执行不同的代码块。以下会从语法结构、执行流程、使用示例、注意事项等方面对`switch`语句展开详细介绍。

#### 语法结构

`switch`语句的基本语法如下：

```c
switch (表达式) {
    case 常量表达式1:
        语句块1;
        break;
    case 常量表达式2:
        语句块2;
        break;
    // 可以有更多的 case 分支
    ...
    default:
        语句块n;
        break;
}
```


1. 对`switch`后面括号里的表达式进行求值。
2. 把表达式的值和各个`case`后面的常量表达式进行对比。
3. 若表达式的值与某个`case`后面的常量表达式的值相等，就执行该`case`后面的语句块，直至碰到`break`语句，然后跳出`switch`语句。
4. 若表达式的值和所有`case`后面的常量表达式的值都不相等，就执行`default`后面的语句块（`default`部分是可选的）。

#### 使用示例


```c
#include <stdio.h>

int main() {
    int day = 3;

    switch (day) {
        case 1:
            printf("星期一\n");
            break;
        case 2:
            printf("星期二\n");
            break;
        case 3:
            printf("星期三\n");
            break;
        case 4:
            printf("星期四\n");
            break;
        case 5:
            printf("星期五\n");
            break;
        case 6:
            printf("星期六\n");
            break;
        case 7:
            printf("星期日\n");
            break;
        default:
            printf("输入的数字不在 1 - 7 范围内\n");
            break;
    }

    return 0;
}
```



在这个示例中，`switch`语句依据`day`的值来输出对应的星期信息。由于`day`的值为 3，所以会执行`case 3`后面的语句块，输出 “星期三”。

#### 注意事项

- **`break`语句**：`break`语句的作用是跳出`switch`语句。若某个`case`后面没有`break`语句，程序会继续执行下一个`case`的语句块，直至碰到`break`或者`switch`语句结束。例如：


```c
#include <stdio.h>

int main() {
    int num = 1;
    switch (num) {
        case 1:
            printf("执行 case 1\n");
            // 没有 break 语句
        case 2:
            printf("执行 case 2\n");
            break;
        default:
            printf("执行 default\n");
            break;
    }
    return 0;
}
```

  

在上述代码中，由于`case 1`后面没有`break`语句，当`num`的值为 1 时，程序会先执行`case 1`后面的语句，接着继续执行`case 2`后面的语句，直至碰到`break`。

  

- **常量表达式**：`case`后面必须是常量表达式，不能是变量或者带有变量的表达式。
- **`default`的位置**：`default`部分可以放在`switch`语句的任意位置，不过通常把它放在最后。
 

综上所述，`switch`语句适用于多分支选择的场景，能够让代码的结构更加清晰，增强可读性。

如果某个case里面的执行语句不止一行呢？

在`switch`语句里，若某个`case`中的执行语句不止一行，你可以把这些语句用花括号`{}`括起来，形成一个代码块。这样做可以让多行语句作为一个整体来执行，并且在代码块内还能定义局部变量。

### `case`里包含多行执行语句：
#### 示例代码

下面是一个示例，其中`case`里包含多行执行语句：

  

c

```c
#include <stdio.h>

int main() {
    int choice = 2;
    switch (choice) {
        case 1:
            printf("你选择了 1。\n");
            printf("这是第一个选项的附加信息。\n");
            break;
        case 2: {
            // 使用花括号括起多行语句
            int num = 10;
            printf("你选择了 2。\n");
            printf("在这个代码块里，我们定义了一个局部变量 num，它的值是 %d。\n", num);
            break;
        }
        case 3:
            printf("你选择了 3。\n");
            printf("这是第三个选项的附加信息。\n");
            break;
        default:
            printf("无效的选择。\n");
            break;
    }
    return 0;
}
```

#### 代码解释

- 在这个示例中，`case 1`和`case 3`虽然有多行执行语句，但由于没有局部变量的定义，所以可以不使用花括号。不过为了增强代码的可读性和一致性，也可以选择使用花括号。
- `case 2`中使用了花括号`{}`将多行语句括起来，并且在代码块内部定义了一个局部变量`num`。局部变量的作用域仅限于这个代码块，在代码块外部无法访问。

### Switch语句里面break的作用

#### 作用

👉 **`break` 的作用是跳出 `switch` 语句本身。**在执行完每一个 `case` 块后，阻止程序继续进入下一个 `case`。

如果没有 `break`，**程序会继续往下执行后面的 `case`，即使条件不匹配**（这叫“case 穿透”或“fall-through”），而这是很多新手出错的地方。

#### 例子

```c
switch (DL_TimerG_getPendingInterrupt(CAPTURE_0_INST)) {
    case DL_TIMERG_IIDX_CC1_DN:
        // 检测到了 PWM 信号
        // 处理数据并更新 OLED 显示
        break;

    case DL_TIMERG_IIDX_ZERO:
        // 没有检测到 PWM 信号，需要重新同步
        break;

    default:
        // 其他情况（未知中断类型）
        break;
}

```


## 循环语句
### 循环语句中`break`的作用
#### 作用

`break` 是用来<mark style="background: #BBFABBA6;">跳出最近一层循环结构</mark>（比如 `for`、`while` 或 `switch`）的控制语句。

在这段代码中，`break;` 会跳出的是外层的 `for (i = 0; i <= RX_BUFFER_SIZE - 8; i++)` 循环。

#### 例子(break之后会怎么执行？)

```c
void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
  if (huart->Instance == USART2)
  {
    // 遍历查找帧头 0xAA
    for (i = 0; i <= RX_BUFFER_SIZE - 8; i++) // 确保帧头后还有 7 字节，只在RX_BUFFER_SIZE - 8处便利，后面不用找了
    {
      if ((received_data[i] == 0x91) && (received_data[i + 1] == 0x20))
      {
        memcpy(data_buff, &received_data[i + 2], 6); // 复制帧头后面的7字节数据到data_buff，后面分析databuff就行了
        
        for (int j = 0; j < 6; j++) // 从databuff第0位往后开始解析7字节
        {
          value |= ((uint64_t)data_buff[j]) << (8 * j); // 按位或运算，把databuff的每一位左移8位，然后加到value上
        }

        printf("FPGA发来的有效64位数据是（十进制）：%llu\r\n", value);

        break;  // 只处理一帧，找到就退出
      }
    }
    
    memset(received_data, 0, RX_BUFFER_SIZE); // 清空缓冲区以防旧数据残留

    HAL_Delay(100); // 等待100ms，确保数据处理完成

    // 启动下一次接收
    //HAL_UART_Receive_IT(&huart2, received_data, RX_BUFFER_SIZE);
  }
}
```

**2. break 之后程序执行流程**

执行到 `break;` 后，程序的控制流会直接跳出 `for` 循环，**从循环后面紧跟的第一条语句开始继续执行**。在你的代码中，`for` 循环后面是：
```c
memset(received_data, 0, RX_BUFFER_SIZE); // 清空缓冲区 HAL_Delay(100);                           // 等待100ms //HAL_UART_Receive_IT(&huart2, received_data, RX_BUFFER_SIZE); // (注释掉的代码)
```

所以程序会继续按顺序执行：

1. 清空 `received_data`；
    
2. 延时 100 毫秒；
    
3. 然后（如果取消注释的话）调用 `HAL_UART_Receive_IT()` 开始下一次中断接收。

### 循环语句中`continue`的作用
#### 作用

跳过本次循环剩下的内容，进入下一次循环

### 辨析
| 语句         | 作用范围        | 作用                  |
| ---------- | ----------- | ------------------- |
| `break`    | 循环 / switch | 退出循环或 switch 语句块    |
| `continue` | 循环          | 跳过本次循环剩下的内容，进入下一次循环 |
| `return`   | 函数          | 结束整个函数，并可返回一个值      |
# 函数
## 局部变量和全局变量

### 概念

1. **全局变量**：
    
    - `globalVar` 是全局变量，定义在所有函数外部。
    - 作用域是整个程序，所有函数都可以访问和修改它。
    - 在 `main` 函数和 `testFunction` 中都可以直接使用 `globalVar`。
2. **局部变量**：
    
    - `localVar` 是 `main` 函数的局部变量，只能在 `main` 函数内部使用。
    - `x` 是 `testFunction` 的局部变量，只能在 `testFunction` 内部使用。
    - 不同函数的局部变量互相独立，即使名称相同也互不影响。
3. **作用域规则**：
    
    - 局部变量的作用域从定义位置开始，到函数结束为止。
    - 全局变量的作用域从定义位置开始，到文件结束为止。如果需要在定义之前使用，需要用 `extern` 声明。

# 自定义数据类型：结构体
以下是你请求的Obsidian笔记格式，使用Markdown语法并符合公式渲染要求：

## C语言中的 `->` 操作符

在C语言中，`->` 符号是用于访问结构体或联合体指针成员的操作符。它是对结构体指针的解引用并同时访问成员的一种简写方式。



假设你有一个结构体类型和一个指向该结构体的指针：

```c
struct Person {
    char name[50];
    int age;
};

struct Person *ptr;
```

使用 -> 操作符访问成员

ptr->age = 25;  // 等同于 (*ptr).age = 25;
strcpy(ptr->name, "Alice");  // 等同于 strcpy((*ptr).name, "Alice");

等价关系

pre->name 和 (*pre).name 是等价的：
	•	pre->name 使用了 -> 操作符，通过指向结构体的指针 pre 访问结构体成员 name。
	•	(*pre).name 则首先解引用指针 pre（即 *pre），然后通过 . 操作符访问解引用后的结构体的成员 name。

这两种方式效果相同，pre->name 是更常用且更简洁的写法。



## 用`typedef`创建结构体
在 C 语言中，`typedef` 关键字可用于为已有的数据类型创建一个新的类型名，这在定义结构体时非常有用，能让代码更加简洁易读。下面详细介绍如何使用 `typedef` 来定义结构体变量。
### 基本语法
使用 `typedef` 定义结构体的基本语法如下：

```c
typedef struct {
    // 结构体成员声明
    数据类型 成员名1;
    数据类型 成员名2;
    // 可以有更多成员
} 新类型名;
```

在上述语法中，`struct` 后面的花括号内是结构体的成员定义，`新类型名` 是你为这个结构体类型定义的新名称。之后就可以使用这个新类型名来声明结构体变量。

### 示例代码

以下是几个使用 `typedef` 定义结构体变量的示例：
#### 示例 1：简单结构体

```c
#include <stdio.h>

// 使用typedef定义一个名为Person的结构体类型
typedef struct {
    char name[50];
    int age;
} Person;

int main() {
    // 使用新类型名Person声明结构体变量p
    Person p;

    // 初始化结构体成员
    sprintf(p.name, "John");
    p.age = 30;

    // 输出结构体成员的值
    printf("Name: %s\n", p.name);
    printf("Age: %d\n", p.age);

    return 0;
}
```

**代码解释**：
- 首先使用 `typedef` 定义了一个名为 `Person` 的结构体类型，该结构体包含两个成员：一个字符数组 `name` 用于存储姓名，一个整数 `age` 用于存储年龄。
- 在 `main` 函数中，使用 `Person` 类型声明了一个结构体变量 `p`。
- 然后对结构体成员进行初始化并输出。
## 应用
### 嵌入式stm32外设配置
[[stm32基础#理解stm32的每一个外设都对应一个结构体]]
# 指针
![[95413aa49e121b7e08bf0eafcdac3b5.jpg]]

## 数组名/数组元素指针做函数参数
+ 函数定义
```c
float calculate_precise_frequency(float* fft_output, int maxIndex, float sample_rate, int fft_size) {

    // 边界保护

    if (maxIndex <= 0 || maxIndex >= FFT_SIZE - 1) return (float)maxIndex * sample_rate / FFT_SIZE;

  

    // 抛物线插值

    float y0 = fft_output[maxIndex - 1];

    float y1 = fft_output[maxIndex];

    float y2 = fft_output[maxIndex + 1];

    delta = 0.5f * (y0 - y2) / (y0 - 2*y1 + y2);

    result_index = (maxIndex + delta) * (sample_rate / FFT_SIZE);

    // 计算修正频率

    return result_index;

}
```

+ 函数调用
```c
float32_t fftOutput[FFT_SIZE];        // FFT幅度谱

calculate_precise_frequency(&fftOutput[0], maxIndex,  sample_rate, FFT_SIZE);  //用插值的
```
# 自定义数据类型：类以及实例化对象
## 类

### 类的继承和派生


继承允许一个类（==派生类==，也称为==子类==）继承另一个类（==基类==，也称为==父类==）的属性和方法。通过继承，派生类可以复用基类的代码，并且可以在此基础上添加新的功能或修改现有的功能，从而提高代码的可维护性和可扩展性。

#### 语法示例

以下是一个简单的 C++ 继承示例

```cpp
#include <iostream>
// 基类
class Animal {
public:
    // 基类的成员函数
    void eat() {
        std::cout << "Animal is eating." << std::endl;
    }
};

// 派生类，继承自Animal
class Dog : public Animal {
public:
    // 派生类新增的成员函数
    void bark() {
        std::cout << "Dog is barking." << std::endl;
    }
};

int main() {
    Dog dog;
    // 调用从基类继承的函数
    dog.eat(); 
    // 调用派生类自己的函数
    dog.bark(); 
    return 0;
}
```

1. **基类（`Animal`）**：定义了一个名为`Animal`的类，其中包含一个成员函数`eat()`，用于表示动物进食的行为。
2. **派生类（`Dog`）**：定义了一个名为`Dog`的类，它通过`public`关键字继承自`Animal`类。这意味着`Dog`类可以访问`Animal`类中所有`public`和`protected`的成员。`Dog`类还新增了一个成员函数`bark()`，用于表示狗叫的行为。
3. **`main`函数**：创建了一个`Dog`类的对象`dog`，并分别调用了从基类继承的`eat()`函数和派生类自己的`bark()`函数。

#### 继承方式

在 C++ 中，有三种继承方式：

- **`public`继承**：基类的`public`成员在派生类中仍然是`public`的，基类的`protected`成员在派生类中仍然是`protected`的。这是最常用的继承方式，用于实现 “is-a” 关系，即派生类对象也是基类对象。
- **`protected`继承**：基类的`public`和`protected`成员在派生类中都变为`protected`的。
- **`private`继承**：基类的`public`和`protected`成员在派生类中都变为`private`的。

#### 注意事项

  

- 继承可以形成多级继承结构，即一个派生类可以作为另一个派生类的基类。
- 派生类可以重写基类的虚函数，以实现多态性，这是面向对象编程的另一个重要特性。
- 构造函数和析构函数不会被继承，但派生类的构造函数会自动调用基类的构造函数，析构函数则相反，先调用派生类的析构函数，再调用基类的析构函数。


### 成员函数（一般成员函数&构造函数）
在你提到的 C++ 代码示例中，`void display()` 不是构造函数，而是类 `Person` 的一个普通成员函数。下面为你详细解释构造函数和普通成员函数的区别：

#### 构造函数

后面有更详细的解释，在这里先做简单说明

- **定义**：==构造函数==是类中的==特殊成员函数==，用于在创建对象时对对象进行初始化操作。
- **命名规则**：在 C++ 里，==构造函数的名称==必须==与类名相同==。
- **特点**：构造函数没有返回类型，包括 `void` 也不能有。
- **示例代码中的构造函数**：

```cpp
#include <iostream>
class Person {
private:
    std::string name;
    int age;
public:
    // 这是构造函数，名称与类名 Person 相同，且无返回类型
    Person(std::string n, int a) : name(n), age(a) {}

    void display() {
        std::cout << "Name: " << name << ", Age: " << age << std::endl;
    }
};

int main() {
    // 创建 Person 对象时调用构造函数进行初始化
    Person p("John", 25);
    p.display();
    return 0;
}
```


在上述代码中，`Person(std::string n, int a) : name(n), age(a) {}` 就是 `Person` 类的构造函数，它接收两个参数并使用成员初始化列表对对象的 `name` 和 `age` 成员变量进行初始化。

#### 普通成员函数

- **定义**：普通成员函数是类中用于实现特定功能的函数，它们可以访问和修改类的成员变量，也可以执行其他操作。
- **命名规则**：普通成员函数的名称可以根据其功能自由命名，不需要与类名相同。
- **特点**：普通成员函数有返回类型，如 `void`、`int`、`double` 等，也可以有参数列表。
- **示例代码中的普通成员函数**：

```cpp
void display() {
    std::cout << "Name: " << name << ", Age: " << age << std::endl;
}
```


这里的 `display()` 函数是 `Person` 类的一个普通成员函数，返回类型为 `void`，它的作用是输出 `Person` 对象的 `name` 和 `age` 信息。

综上所述，`void display()` 是一个普通成员函数，不是构造函数，因为它有返回类型 `void` 且名称与类名不同。


### 重点介绍构造函数
在 C++ 中，构造函数是一种特殊的成员函数，用于在<mark style="background: #ABF7F7A6;">创建对象时</mark><mark style="background: #BBFABBA6;">初始化</mark>对象的数据成员。以下为你详细介绍构造函数初始化类的几种常见方式，并给出具体示例。

#### 1. 默认构造函数


默认构造函数是没有参数的构造函数。如果类中没有显式定义任何构造函数，编译器会自动生成一个默认构造函数。但一旦显式定义了构造函数，编译器就不会再生成默认构造函数。


```cpp
#include <iostream>
class Rectangle {
private:
    double length;
    double width;
public:
    // 默认构造函数
    Rectangle() {
        length = 0;
        width = 0;
    }

    void display() {
        std::cout << "Length: " << length << ", Width: " << width << std::endl;
    }
};

int main() {
    // 使用默认构造函数创建对象
    Rectangle rect;
    rect.display();
    return 0;
}
```

#### 2. 带参数的构造函数

  

带参数的构造函数允许在创建对象时传递初始值，以便更灵活地初始化对象的数据成员。



```cpp
#include <iostream>
class Rectangle {
private:
    double length;
    double width;
public:
    // 带参数的构造函数
    Rectangle(double l, double w) {
        length = l;
        width = w;
    }

    void display() {
        std::cout << "Length: " << length << ", Width: " << width << std::endl;
    }
};

int main() {
    // 使用带参数的构造函数创建对象
    Rectangle rect(5.0, 3.0);
    rect.display();
    return 0;
}
```

可类比dart语言中的记忆[[Dart&Flutter#将类实例化的方法]]

#### 3. 初始化列表

  
初始化列表是在构造函数的参数列表之后使用冒号分隔，用于初始化类的数据成员。它比在构造函数体内赋值更高效，尤其对于常量成员和引用成员。


```cpp
#include <iostream>
class Rectangle {
private:
    double length;
    double width;
public:
    // 使用初始化列表的构造函数
    Rectangle(double l, double w) : length(l), width(w) {}

    void display() {
        std::cout << "Length: " << length << ", Width: " << width << std::endl;
    }
};

int main() {
    // 使用带初始化列表的构造函数创建对象
    Rectangle rect(5.0, 3.0);
    rect.display();
    return 0;
}
```

#### 4. 委托构造函数

## 对象&从类实例化出一个对象的方法

用构造函数，有的还需要给它传入参数，就可以从类实例化出来一个对象

例子
```cpp
#include <iostream>
#include <string>
using namespace std;

// 定义一个“汽车类”——这是模板，描述所有汽车的共同特征和行为
class Car {
// 成员变量（属性）：所有汽车都有的特征
private:
    string brand;  // 品牌
    string color;  // 颜色
    int speed;     // 当前速度

// 成员函数（行为）：所有汽车都能做的动作
public:
    // 构造函数：创建对象时初始化属性（实例化的核心步骤）
    Car(string b, string c) : brand(b), color(c), speed(0) {}

    // 加速行为
    void accelerate(int add) {
        speed += add;
        cout << brand << " 加速到 " << speed << " km/h" << endl;
    }

    // 刹车行为
    void brake() {
        speed = 0;
        cout << brand << " 已刹车，速度为 0" << endl;
    }

    // 显示汽车信息
    void showInfo() {
        cout << "汽车信息：品牌=" << brand << "，颜色=" << color << endl;
    }
};

int main() {
    // 实例化对象1：根据Car类创建具体的“黑色宝马”对象
    Car bmw("宝马", "黑色");
    bmw.showInfo();   // 调用对象的行为
    bmw.accelerate(60);
    bmw.brake();

    cout << "------------------------" << endl;

    // 实例化对象2：根据Car类创建具体的“白色特斯拉”对象
    Car tesla("特斯拉", "白色");
    tesla.showInfo();
    tesla.accelerate(80);
    tesla.brake();

    return 0;
}
```


## 面向对象变成应用
### 例子：Dart中的widget类实例化后的对象
[[Dart&Flutter]]

# C语言中的extern关键字

`extern`关键字在C语言中用于==声明变量或函数==，==表示其定义位于其他地方==。它的主要作用是实现变量或函数的跨文件共享和引用。

## 1. 声明外部变量
当一个全局变量需要在多个源文件中访问时，可以在一个源文件中定义该变量，然后在其他源文件中使用`extern`关键字声明它。

### 示例
- **定义变量（file1.c）**
```c
  int globalVar = 10;  // 定义全局变量
```
•  声明变量（file2.c）
```c

extern int globalVar;  // 声明外部变量
```

这样，file2.c中的代码就可以访问file1.c中定义的globalVar。
## 2. 声明外部函数
如果一个函数需要在多个源文件中调用，可以在一个源文件中定义该函数，然后在其他源文件中使用extern关键字声明它。虽然函数默认具有外部链接性，但显式声明可以增加代码的可读性。
示例
•  定义函数（file1.c）
```c
void printMessage() {
    printf("Hello, World!\n");
}

```

•  声明函数（file2.c）
```c
extern void printMessage();  // 声明外部函数
```


然后在file2.c中调用printMessage()。

## 3. 在头文件中声明
通常，extern声明会放在头文件中，方便多个源文件包含同一个头文件，从而共享变量或函数。
示例
•  头文件（global.h）
```c
extern int globalVar;  // 声明外部变量
extern void printMessage();  // 声明外部函数

```

•  定义文件（file1.c）
```c
#include "global.h"

int globalVar = 10;  // 定义全局变量
void printMessage() {
    printf("Hello, World!\n");
}

```

•  使用文件（file2.c）
```c
#include "global.h"

int main() {
    globalVar = 20;  // 修改全局变量
    printMessage();  // 调用函数
    return 0;
}
```


4. 作用总结
•  extern用于声明外部变量或函数，表示其定义在其他地方。
•  对于全局变量，必须在一个源文件中定义，然后在其他文件中使用extern声明。

# 有用的函数
## `roundf()`

在 C 语言里，`roundf`函数的功能是将一个单精度浮点数四舍五入为最接近的整数。要是遇到两个整数中间的数，就会朝绝对值大的方向舍入。下面为你举例说明它的具体作用：


```c
#include <stdio.h>
#include <math.h>

int main() {
    printf("roundf(2.3) = %.1f\n", roundf(2.3));  // 输出 2.0
    printf("roundf(2.7) = %.1f\n", roundf(2.7));  // 输出 3.0
    printf("roundf(-2.3) = %.1f\n", roundf(-2.3));  // 输出 -2.0
    printf("roundf(-2.7) = %.1f\n", roundf(-2.7));  // 输出 -3.0
    printf("roundf(2.5) = %.1f\n", roundf(2.5));  // 输出 3.0
    printf("roundf(-2.5) = %.1f\n", roundf(-2.5));  // 输出 -3.0
    return 0;
}
```

  

从这些例子能够看出：

  

1. 当小数部分不足 0.5 时，会直接舍去小数部分，例如`roundf(2.3)`的结果是 2.0。
2. 当小数部分达到或超过 0.5 时，会向整数部分进 1，例如`roundf(2.7)`的结果是 3.0。
3. 对于负数，也是按照相同的规则进行舍入，例如`roundf(-2.7)`的结果是 - 3.0。
4. 当数值刚好处于两个整数中间时，会朝远离 0 的方向舍入，比如`roundf(2.5)`的结果是 3.0，`roundf(-2.5)`的结果是 - 3.0。

  

要使用`roundf`函数，需要包含`<math.h>`头文件，并且在编译时要链接数学库，也就是加上`-lm`选项。f

### 数据宽度的概念

在计算机系统中，数据宽度用于描述一次能够处理或传输的数据量。常见的数据宽度有字节（Byte）、半字（Half Word）、字（Word） 和双字（Double Word）等 。它们在不同的处理器架构下，对应的比特数可能有所差异，在 STM32 微控制器（基于 ARM Cortex-M 架构）中：

  

- **字节（Byte）**：1 Byte = 8 bits，是最基本的数据存储和处理单元。
- **半字（Half Word）**：1 Half Word = 16 bits ，也就是 2 个字节。
- **字（Word）**：1 Word = 32 bits，即 4 个字节。
- **双字（Double Word）**：1 Double Word = 64 bits，等于 8 个字节。