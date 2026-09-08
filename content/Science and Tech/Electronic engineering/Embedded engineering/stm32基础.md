

# 嵌入式系统基本概念

## 1. 单片机（Microcontroller）
- **定义**：单片机是一种集成电路，内部集成了中央处理器（CPU）、存储器（RAM和ROM）、输入/输出接口等多个功能，形成一个完整的微型计算机系统。
- **特点**：
  - 高度集成，适合小型化设计。
  - 主要用于控制任务，如家电、汽车电子等。
- **应用**：广泛应用于嵌入式系统中，常见的单片机有51单片机、PIC系列和STM32系列。

## 2. 微控制器（Microcontroller）
- **定义**：微控制器通常指的是具有更高性能和更多外设功能的单片机，适用于复杂应用。
- **特点**：
  - 性能强大，支持多任务处理。
  - 通常用于工业控制、医疗设备和物联网等领域。

## 3. 开发板（Development Board）
- **定义**：开发板是一种用于快速原型开发和测试的平台，通常集成了微控制器及多种外设。
- **组成**：
  - 包含微控制器、输入输出接口（如USB、GPIO等）、显示屏、传感器等。
- **目的**：为开发者提供一个完整的环境，以便快速设计和实现项目。

## 4. 最小系统板（Minimum System Board）
- **定义**：最小系统板是一个精简的电路设计，仅包含使微控制器正常工作所需的基本组件。
- **组成**：
  - 通常包括微控制器本体、复位电路、时钟电路等基础电路。
- **特点**：
  - 精简设计，适合测试和验证微控制器的基本功能。
  - 常用于教学和基础实验。

### 最小系统的三要素
1. **电源**：为单片机提供必要的电压。
2. **晶振**：提供基准时钟信号，使单片机能够正常运行。
3. **复位电路**：确保单片机在上电或故障时能够重置到初始状态。

## 总结
- 单片机是一种集成度高的小型计算系统，用于特定控制任务。
- 微控制器是更强大的版本，适合复杂应用。
- 开发板提供丰富功能以支持多样化项目，而最小系统板则专注于核心功能，适合基础学习和实验。

# 嵌入式开发工具与 ARM Cortex-M 详解

## 1. 工具链相关概念

### 1.1 编译链（Toolchain）
编译链是将源码转换为目标可执行文件的一套工具集合，包括以下组成部分：
- **预处理器：** 处理宏定义、头文件等。
- **编译器：** 将源码转换为汇编代码。
- **汇编器：** 将汇编代码转换为机器指令。
- **链接器：** 将各部分目标代码整合为一个可执行文件。
- **调试工具：** 如 GDB，用于调试程序。

### 1.2 环境变量 `PATH`
将工具链的可执行文件路径（如 `bin` 文件夹）添加到系统环境变量 `PATH` 中，目的是：
- 在终端任意目录下直接调用工具命令，而无需指定完整路径。

### 1.3 `bin` 文件夹
`bin` 是工具链或软件的二进制可执行文件存储目录，包含常用命令工具（如编译器、调试工具等）。

---

## 2. CMake 和构建系统

### 2.1 什么是 CMake？
CMake 是一个**跨平台的构建系统生成工具**，用于管理复杂项目的构建过程。
- **核心功能：** 通过配置文件（如 `CMakeLists.txt`）定义项目结构、依赖关系和构建规则。
- **输出结果：** 生成具体平台上的构建文件（如 Makefile、Ninja 文件）。

### 2.2 CMake 的作用
1. **跨平台支持：** 可在 Windows、Linux 和 macOS 上使用。
2. **简化构建过程：** 自动处理文件依赖关系和编译选项。
3. **模块化设计：** 便于大型项目的分模块管理。

### 2.3 构建系统（如 Makefile 和 Ninja）
- **Makefile：** GNU Make 使用的文件，描述如何编译和链接代码。
- **Ninja：** 一个更高效的构建系统，专注于快速增量构建。

---

## 3. 交叉编译工具链（gcc-arm-none-eabi）

### 3.1 什么是交叉编译？
交叉编译是指在一种平台上编译出可供另一种平台使用的程序。例如：
- **开发平台：** x86 架构的 PC。
- **目标平台：** ARM 架构的嵌入式设备。

### 3.2 gcc-arm-none-eabi 工具链
- **gcc：** GNU 编译器集合。
- **arm：** 目标平台为 ARM 处理器。
- **none：** 无操作系统（裸机开发）。
- **eabi：** 嵌入式应用程序二进制接口（Embedded ABI）。

#### 功能：
1. 将 C/C++ 源码编译为 ARM 指令。
2. 支持链接和生成目标可执行文件（如 `.elf` 和 `.bin`）。
![[Pasted image 20241122215318.jpg]]

---

## 4. ARM Cortex-M 详解

### 4.1 ARM 的概述
ARM 是一种低功耗、高性能的 RISC 处理器架构，广泛应用于嵌入式设备。

#### ARM 的三个主要系列：
| 系列         | 应用领域                       | 特点                                     |
|--------------|------------------------------|------------------------------------------|
| **Cortex-A** | 智能手机、平板电脑            | 高性能，支持复杂操作系统（如 Linux）。   |
| **Cortex-R** | 实时系统，如汽车电子、存储设备 | 高实时性，适合需要确定时延的应用。       |
| **Cortex-M** | 嵌入式系统、物联网设备        | 超低功耗，适合裸机开发或轻量级 RTOS。   |

### 4.2 Cortex-M 的关键特点
1. **低功耗设计：** 适合电池供电设备。
2. **实时性能：** 快速中断响应，支持中断优先级。
3. **简化设计：** 易于开发和调试。
4. **裸机开发：** 可直接运行在硬件上，也支持轻量级实时操作系统。
5. **高性价比：** 硬件成本低，集成度高。

### 4.3 Cortex-M 的子系列
| 内核          | 特点                                            | 典型应用                     |
|---------------|-----------------------------------------------|----------------------------|
| **Cortex-M0** | 超低功耗，指令集最小，适合极简设计              | 简单传感器、低功耗 IoT 设备 |
| **Cortex-M0+**| 更高能效（比 M0 功耗更低）                     | 电池供电设备                |
| **Cortex-M3** | 平衡性能与功耗，支持更复杂的实时系统            | 工业控制、智能家居设备      |
| **Cortex-M4** | 增加 DSP 指令，支持简单信号处理任务             | 音频处理、运动控制系统      |
| **Cortex-M7** | 高性能版本，带有更强的 DSP 和浮点运算能力       | 高性能嵌入式设备            |
| **Cortex-M23**| 支持 ARM TrustZone（增强的安全性）             | 需要安全特性的 IoT 设备     |
| **Cortex-M33**| 支持 TrustZone 和 DSP，综合性能更强             | 医疗设备、工业物联网        |

---

## 5. Cortex-M 的应用场景

1. **物联网设备：** 温湿度传感器、智能灯。
2. **工业控制：** 电机控制、PLC。
3. **医疗设备：** 血压计、心率监测仪。
4. **消费类电子：** 电视遥控器、玩具。
5. **汽车电子：** TPMS（轮胎压力监测系统）、ECU（电子控制单元）。

---

## 6. 一些编译原理

### 流程图内容解读：
1. **CMake 和 Ninja：**  
   - CMake 定义项目结构，Ninja 负责实际执行构建。
2. **交叉编译工具链（gcc-arm-none-eabi）：**  
   - 将源代码编译成嵌入式设备可以运行的 `.elf` 或 `.bin` 文件。
3. **OpenOCD 和 ST-LINK：**  
   - 使用 ST-LINK 下载二进制文件到目标硬件板子。
### 工具链组成 (Toolchain)
+ 概念：工具链是一组软件工具的集合，负责将程序从源代码转换为设备能运行的可执行文件，常用于程序的开发、编译、调试和上传等环节。 
+ 工具链的组成：
	1. 编译器
		将源代码（如 C/C++）转换为汇编代码。
		示例：
		```c
		int add(int a, int b) {
		
		    return a + b;
		
		}
		```
		编译后变成汇编代码Assembly Code：👇
		```asm
		add:
			mov  r0,r0
			add  r0,r0,r1
			bx   lr
		```
	2. 汇编器
		将汇编代码翻译为目标代码（机器码）。
		示例（目标代码，十六进制）：
		```asm
		add:
			mov  r0,r0
			add  r0,r0,r1
			bx   lr
		```
		汇编后变成目标代码Object Code：👇
		```hex
		00 00 A0 E1 00 10 80 E0 1E FF 2F E1
		```
	3. 链接器
		将多个目标文件链接为可执行文件，解决符号引用，生成完整的程序。
		示例（ELF 文件，十六进制片段）：
		链接后变为可执行文件：👇
		```hex
		00 00 A0 E1 00 10 80 E0 1E FF 2F E1
		```
![[compiler_picture.png]]
### 总结
嵌入式工具链：gcc-arm-none-eabi
• 针对 ARM Cortex-M 系列的交叉编译工具链，生成裸机环境运行的代码。
• 常用工具：
	1. arm-none-eabi-gcc：编译器
	2. arm-none-eabi-ld：链接器
	3. arm-none-eabi-objcopy：生成二进制文件（如 .bin）

  




# 单片机组成
## 对应冯诺伊曼体系
| **冯·诺伊曼架构部分** | **STM32 单片机中的对应部分**                                                                 |
|-------------------------|---------------------------------------------------------------------------------------------|
| **存储器（Memory）**    | - **Flash 存储器**：用于存储程序代码和常量数据。<br>- **SRAM（静态随机存取存储器）**：用于存储运行时变量和数据。 |
| **运算器（ALU）**       | - **Cortex-M 内核**：CPU 的核心部分，负责执行算术运算和逻辑运算。                              |
| **控制器（CU）**        | - **Cortex-M 内核**：CPU 的控制单元，负责从存储器中读取指令并解码执行。                       |
| **输入设备**            | - **GPIO（通用输入/输出端口）**：用于接收外部输入信号。<br>- **ADC（模数转换器）**：将模拟信号转换为数字信号。<br>- **CAN/LIN 接口**：接收特定通信协议的信号。 |
| **输出设备**            | - **GPIO**：用于控制外部输出信号。<br>- **PWM（脉宽调制）**：用于驱动电机等设备。<br>- **UART/SPI/I2C/CAN/LIN**：用于与其他设备通信。 |
| **总线（Bus）**         | - **AHB（高级高性能总线）**：连接高速外设（如 Flash 控制器、DMA 等）。<br>- **APB（先进外设总线）**：连接低速外设（如 GPIO、UART 等）。 |
 
---
 


## 对应电脑的部分


| **特性**             | **电脑**                                                                 | **STM32单片机**                                                                 |
|----------------------|--------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| **存储器**           | - **硬盘/SSD**：非易失性存储，用于长期存储操作系统、程序和数据。<br>- **内存（RAM）**：易失性存储，用于临时存储运行中的程序和数据，断电丢失。 | - **Flash存储器**：非易失性存储，用于长期存储程序代码和数据，断电不丢失。<br>- **SRAM**：易失性存储，用于运行时的动态数据存储，断电丢失。 |
| **操作系统**         | - 通用操作系统（如Windows、Linux、macOS）<br>- 可运行复杂多任务，支持多用户、多进程、图形界面等。 | - 嵌入式操作系统（如FreeRTOS、μC/OS-II、RT-Thread）<br>- 轻量级、实时性，专注于多任务调度和资源管理，通常无图形界面。 |
| **启动过程**         | - 从硬盘加载引导程序到内存，启动操作系统内核，加载驱动程序和服务。       | - 从Flash存储器加载引导程序到SRAM，启动主程序或操作系统内核（如果有）。       |
| **运行模式**         | - 多任务、多进程、多线程，支持复杂应用程序和后台服务。                   | - 单任务或有限多任务，专注于实时性任务处理，资源受限。                         |
| **硬件资源**         | - 内存容量大（GB级别），硬盘容量大（TB级别），处理能力强。               | - 内存容量小（KB到MB级别），Flash容量有限，处理能力适中。                       |
| **应用场景**         | - 通用计算、办公、娱乐、服务器等。                                       | - 嵌入式设备、物联网、工业控制、消费电子等。                                     |
| **处理器（CPU）**    | - 复杂的多核处理器，支持多线程和高级指令集。<br>- 高性能、高功耗。       | - 单核处理器，支持简单的指令集（如ARM Cortex-M系列）。<br>- 低功耗、性能适中。 |
| **输入/输出设备**    | - 键盘、鼠标、显示器、打印机等复杂外设。<br>- 通过USB、HDMI、PCIe等接口连接。 | - GPIO（通用输入输出）、ADC（模数转换）、UART（串口通信）等简单外设。<br>- 通过GPIO、SPI、I2C等接口连接。 |
| **总线系统**         | - 多种高速总线（如PCIe、SATA、USB）用于连接外设和扩展卡。               | - 内部总线（如APB、AHB）用于连接外设和处理器。                                   |
| **电源管理**         | - 外部电源适配器或电池，支持高功率输出。                                 | - 内部电源管理模块，支持低功耗模式（如睡眠、待机）。                             |
| **通信接口**         | - 以太网、Wi-Fi、蓝牙等复杂通信模块。                                   | - UART、SPI、I2C、CAN等简单通信接口，用于设备间通信。                           |


# 未整理的基本概念
## 告诉我openocd,cubeMX和cubeCLT是干嘛的？

- **OpenOCD**：OpenOCD（Open On-Chip Debugger）是一个开源的硬件调试器，旨在为嵌入式系统提供芯片级编程和调试支持 。通过其分层架构，支持多种 JTAG 接口和 TAP（Test Access Port），能够实现自动化边界扫描、FPGA/CPLD 编程、调试目标支持（如 ARM、MIPS）、闪存芯片驱动（如 CFI、NAND、内部闪存）等功能。
    - **特点和优势**：开源免费，用户可免费使用并按需修改扩展；支持多种调试目标和 JTAG 适配器，硬件平台覆盖范围广；支持 telnet、TCL、GDB 等多种网络接口，便于远程调试和控制；内置嵌入式 TCL 解释器，方便编写脚本进行自动化操作；有详细的开发者手册和用户指南。
    - **应用场景**：常用于嵌入式系统开发过程中的芯片级编程和调试；借助其 (X) SVF 播放功能，实现 FPGA/CPLD 的自动化编程；通过 GDB 服务器功能，配合 GNU GDB 进行源码级调试，支持单步执行、断点 / 观察点设置、gprof 性能分析等功能。
- **Stm32CubeMX**：是意法半导体（ST）官方推出的图形化配置工具，用于快速生成 STM32 微控制器的初始化代码（基于 HAL 库或 LL 库） 。
    - **核心功能**：可视化配置 GPIO 引脚分配与复用功能；以图形化方式设置系统时钟、外设时钟（如 PLL、HSE、HSI） ；自动生成 HAL 库等外设初始化代码，涵盖 I2S、SPI、DMA 等众多外设 ；支持 FreeRTOS 、FatFS、USB 等中间件的快速配置；能生成 Keil 、IAR、STM32CubeIDE 等不同 IDE 的工程文件；还能生成引脚配置信息的 pdf 和 txt 文档，也可进行功耗评估。
    - **应用场景**：在开发 STM32 相关项目时，可快速完成芯片外设和中间件的配置，并生成对应的初始化代码，极大提升开发效率，减少手动配置寄存器等繁琐操作。
- **Stm32CubeCLT**：是一个一体化的多操作系统命令行工具集，是 STM32Cube 生态系统的一部分，也是第三方集成开发环境 (IDE) 提供商的工具集，允许在他们自己的 IDE 框架内使用意法半导体专有工具 。它为整个 STM32 单片机组合提供系统视图描述符，并将每个 STM32 单片机和开发板与适当的 SVD（System View Description）相关联。此外，其安装目录内包含了 CMake 等跨平台构建工具，用于支持 STM32CubeMX 生成 CMake 项目的编译构建 。
# 标准库介绍
## 理解标准库
### 理解stm32的每一个外设都对应一个结构体
以下是一个典型的GPIO结构体定义及其变量：
```c
typedef struct {
    __IO uint32_t CRH;
    __IO uint32_t CRL;
    __IO uint32_t IDR;
    __IO uint32_t ODR;
    __IO uint32_t BSRR;
    __IO uint32_t BRR;
    __IO uint32_t LCKR;
} GPIO_TypeDef;
 
#define GPIOA_BASE         (0x40010800UL)
#define GPIOB_BASE         (0x40010C00UL)
 
extern GPIO_TypeDef GPIOA;
extern GPIO_TypeDef GPIOB;
```
### 可以直接通过修改外设结构体中的寄存器来配置GPIO模式
#### 直接通过修改外设结构体中的寄存器来配置GPIO模式事例

虽然标准库提供了方便的初始化函数（如 GPIO_Init ），但也可以直接通过修改结构体中的寄存器来配置GPIO模式。以下是一个示例
+ 示例：配置GPIOA_Pin_5为推挽输出
```c
// 定义GPIOA的结构体变量 
GPIO_TypeDef* GPIOA = (GPIO_TypeDef*) GPIOA_BASE;
 
// 配置GPIOA_Pin_5为推挽输出 
// 计算CRH寄存器的偏移量 
uint32_t pinPosition = 5 * 2; // 每个引脚占用2位 
uint32_t mode = 0b00; // 推挽输出 
 
// 修改CRH寄存器 
GPIOA->CRH &= ~(0b11 << pinPosition); // 清除原来的模式位 
GPIOA->CRH |= (mode << pinPosition); // 设置新的模式位
```
### 可以使用标准库函数来配置GPIO模式
#### 使用标准库函数来配置GPIO模式事例

虽然可以直接修改结构体中的寄存器，但为了代码的可读性和可靠性，建议使用标准库提供的函数和宏。以下是使用标准库函数的示例：
+ 示例：使用 GPIO_Init 函数配置GPIO
```c
#include "stm32f10x_gpio.h"
 
// 初始化GPIOA_Pin_5为推挽输出 
void GPIO_Config(void) {
    GPIO_InitTypeDef GPIO_InitStructure;
 
    // 使能GPIOA时钟 
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);
 
    // 配置GPIO_InitStructure 
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_5;
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP; // 推挽输出 
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_10MHz;
 
    // 应用配置 
    GPIO_Init(GPIOA, &GPIO_InitStructure);
}
```
 
 
#### 介绍标准库中的`GPIO_InitTypeDef` 结构体类型 
 
在STM32微控制器的编程中，`GPIO_InitTypeDef` 是一种用于配置 GPIO（通用输入输出）外设的结构体类型。它属于 STM32 的标准外设库（Standard Peripheral Library），旨在简化 GPIO 的初始化过程。
 
##### `GPIO_InitTypeDef`结构体的定义 
 
`GPIO_InitTypeDef` 结构体通常定义在 STM32 的头文件中，例如 `stm32f10x_gpio.h`。其定义大致如下：
 
```c 
typedef struct {
    uint32_t GPIO_Pin;       // 要配置的引脚 
    uint32_t GPIO_Mode;      // 引脚模式（输入、输出等）
    uint32_t GPIO_Speed;     // 输出速度 
    uint32_t GPIO_PuPd;      // 上拉/下拉配置 
} GPIO_InitTypeDef;
```
##### 成员变量说明 
 
1. **GPIO_Pin**  
   - 类型：`uint32_t`  
   - 描述：指定要配置的引脚。可以是单个引脚（如 `GPIO_Pin_5`）或多个引脚的组合（如 `GPIO_Pin_5 | GPIO_Pin_7`）。
 
2. **GPIO_Mode**  
   - 类型：`uint32_t`  
   - 描述：指定引脚的工作模式。常见的模式包括：
     - `GPIO_Mode_IN`：输入模式。
     - `GPIO_Mode_OUT`：输出模式。
     - `GPIO_Mode_AF`：复用功能模式。
     - `GPIO_Mode_AN`：模拟模式。
 
3. **GPIO_Speed**  
   - 类型：`uint32_t`  
   - 描述：指定输出引脚的速度。常见的速度设置包括：
     - `GPIO_Speed_Low`：低速（约 10 kHz）。
     - `GPIO_Speed_Medium`：中速（约 50 kHz）。
     - `GPIO_Speed_Fast`：高速（约 100 kHz）。
     - `GPIO_Speed_High`：高速（约 36 MHz）。
 
4. **GPIO_PuPd**  
   - 类型：`uint32_t`  
   - 描述：指定引脚的上拉/下拉配置。常见的配置包括：
     - `GPIO_PuPd_NOPULL`：无上拉/下拉。
     - `GPIO_PuPd_UP`：上拉。
     - `GPIO_PuPd_DOWN`：下拉。
 
##### 使用示例 
 
以下是一个典型的使用 `GPIO_InitTypeDef` 结构体配置 GPIO 的示例：
 
```c 
#include "stm32f10x_gpio.h"
#include "stm32f10x_rcc.h"
 
void GPIO_Configuration(void) {
    GPIO_InitTypeDef GPIO_InitStructure;
 
    // 使能 GPIOA 外设时钟 
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);
 
    // 配置 GPIO_InitStructure 
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_5;          // 配置 GPIOA 的第5引脚 
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;   // 推挽输出模式 
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_10MHz;  // 输出速度为10MHz 
    GPIO_InitStructure.GPIO_PuPd = GPIO_PuPd_NOPULL;   // 无上拉/下拉 
 
    // 初始化 GPIOA 的第5引脚 
    GPIO_Init(GPIOA, &GPIO_InitStructure);
}
```
 
##### 优点 
 
1. **封装性**  
   - 将多个配置参数封装在一个结构体内，简化了函数调用和参数传递。
 
2. **可读性**  
   - 通过明确的成员变量名称，提高了代码的可读性和维护性。
 
3. **灵活性**  
   - 支持同时配置多个引脚和多种模式，适应不同的应用需求。
 
4. **标准化**  
   - 在 STM32 的标准库中广泛使用类似的结构体类型（如 `USART_InitTypeDef`、`ADC_InitTypeDef` 等），便于开发者理解和迁移。
 
##### 总结 
 
`GPIO_InitTypeDef` 是一种用于配置 STM32 微控制器 GPIO 外设的结构体类型。它通过封装多个配置参数，简化了 GPIO 的初始化过程，提高了代码的可读性和可维护性。掌握这种结构体的使用方法，对于 STM32 的开发非常重要。
# 学习资料
## HAL库常用函数
1. https://www.cnblogs.com/startrack/p/16831402.html
# GPIO
## GPIO的output
### GPIO输出的几种模式
+ 推挽输出 `Output Push-Pull`
+ 开漏输出

#### 关键区别总结

| **对比项** | **推挽输出**          | **开漏输出**             |
| ------- | ----------------- | -------------------- |
| 高电平驱动方式 | 内部主动拉到电源电平        | 依赖外部上拉电阻到电源          |
| 低电平驱动方式 | 内部主动拉到地           | 内部主动拉到地              |
| 是否需外部元件 | 无需（驱动小负载时 ）       | 需外接上拉电阻（实现高电平 ）      |
| 驱动能力    | 高低电平驱动能力对称、较强     | 低电平驱动能力强，高电平看外加上拉    |
| 典型应用场景  | 直接驱动负载、高速数字信号传输   | 电平转换、多设备总线、低功耗场景     |
| 信号冲突风险  | *多个推挽输出接同一线易短路损坏* | 多个开漏输出接同一线可 “线与”，无冲突 |

  

简单说，**推挽适合 “主动、独立驱动负载 / 信号”** ，像控制 LED、继电器、纯数字信号传输；**开漏适合 “电平灵活适配、多设备共享总线、需外部参与电平控制”** 的场景，像 I2C 通信、不同电压系统交互 。实际开发中，要结合硬件电路、外设需求选模式，TI 开发环境里配置 GPIO 时，也需根据这些场景决定用推挽还是开漏 。
### 实验1: `TogglePin`
```c
int main(void) {
    HAL_Init();   // 初始化 HAL 库
    LED_Init();   // 初始化 LED 引脚

    while (1) {
        HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin); // 翻转 LED 状态
        HAL_Delay(500); // 延时 500ms
    }
}
```
## GPIO的input
### GPIO输入模式
#### 原理
以上拉输入为例

当按键不按下时，PB2读取到高电平3.3v
![[Pasted image 20250225113647.png]]
d昂按键按下式，PB12和GND通过导线连接等势，PB2读取到0v
![[Pasted image 20250225113820.png]]
#### 模式
1. 浮空输入
2. 上拉输入
3. 下拉输入
### 实验1：按下按键`TogglePin`
先设置PB3为上拉输入模式
![[Pasted image 20250225114517.png]]
代码：
```c
/* USER CODE BEGIN WHILE */

  while (1)

  {

    HAL_GPIO_ReadPin(GPIOB, GPIO_PIN_13);  //读取PB13的电平

    if(HAL_GPIO_ReadPin(GPIOB, GPIO_PIN_13) == GPIO_PIN_RESET){

      HAL_Delay(10);  //按键的软件消抖

      if(HAL_GPIO_ReadPin(GPIOB, GPIO_PIN_13) == GPIO_PIN_RESET){

        HAL_GPIO_TogglePin(GPIOC, GPIO_PIN_13);

        while (HAL_GPIO_ReadPin(GPIOB, GPIO_PIN_13) == GPIO_PIN_RESET)

        {

          /* 
          code
		  这里的循环空代码是让程序卡在这,知道案件松手才戒指执行。不然程序会一直读取
		  PB13为低电平，一直TogglePin
          */
			
        }

      }

    }

    /* USER CODE END WHILE */

  

    /* USER CODE BEGIN 3 */

  }

  /* USER CODE END 3 */
```
### 实验2： 矩阵键盘输入16进制数oled输出

矩阵键盘原理图：
![[Pasted image 20250225183656.png|450]]

用cubeMX配置引脚：
![[Pasted image 20250225183827.png]]

代码：
`keyboard.c`
```c
#include "keyboard.h"


// 定义键盘引脚
#define ROW1_PIN GPIO_PIN_0
#define ROW2_PIN GPIO_PIN_1
#define ROW3_PIN GPIO_PIN_2
#define ROW4_PIN GPIO_PIN_3
#define COL1_PIN GPIO_PIN_4
#define COL2_PIN GPIO_PIN_5
#define COL3_PIN GPIO_PIN_6
#define COL4_PIN GPIO_PIN_7
#define KEY_GPIO_PORT GPIOA


// 初始化 
void Keypad_Init(void) {
    // CubeMX 生成的代码通常已经初始化了 GPIO，这里可以不用实现
}

// 扫描按键矩阵
uint8_t read_keyboard(void) {
    uint8_t key_map[4][4] = {
        {0, 1, 2, 3},
        {4, 5, 6, 7},
        {8, 9, 10, 11},
        {12, 13, 14, 15}
    };

    for (int row = 0; row < 4; row++) {
        HAL_GPIO_WritePin(KEY_GPIO_PORT, ROW1_PIN << row, GPIO_PIN_RESET);
        for (int col = 0; col < 4; col++) {
            if (HAL_GPIO_ReadPin(KEY_GPIO_PORT, COL1_PIN << col) == GPIO_PIN_RESET) {
                HAL_Delay(10);  // 消抖
                while (HAL_GPIO_ReadPin(KEY_GPIO_PORT, COL1_PIN << col) == GPIO_PIN_RESET);  // 用一个空循环(不用{}符号)，等待松开
                HAL_GPIO_WritePin(KEY_GPIO_PORT, ROW1_PIN << row, GPIO_PIN_SET);
                return key_map[row][col];  // 返回按键值，跳出KeyScan(void)函数
            }
        }
        HAL_GPIO_WritePin(KEY_GPIO_PORT, ROW1_PIN << row, GPIO_PIN_SET);
    }
    return 0xFF;  // 没有按键按下
}

```

`main.c`
+ 引入`keyboard.c

```c
/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */
#include "oled.h"
#include "keyboard.h"
/* USER CODE END Includes */
```

+ 定义变量
```c
/* USER CODE BEGIN PV */
uint8_t key_pressed = 0xFF;
char display_str[2] = "0";
/* USER CODE END PV */
```

+ 主循环代码

```c
/* USER CODE BEGIN WHILE */
  while (1)
  {
    key_pressed = read_keyboard();
    if (key_pressed != 0xFF) {
        if (key_pressed < 10) {
            display_str[0] = '0' + key_pressed;
        } else {
            display_str[0] = 'A' + (key_pressed - 10);
        }
        OLED_NewFrame(); 
        OLED_PrintASCIIString(20, 20,  display_str, &afont24x12, OLED_COLOR_NORMAL); // 使用OLED_PrintString函数
        OLED_ShowFrame();
    }


   
    /* USER CODE END WHILE */
    

    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
```
## GPIO外部中断(External interrupt)
### 外部中断原理原理
以EXTI10的中断为例：
触发EXTI10的中断后，STM32会调用
在 `stm32f1xx_it.c`（或 `stm32f4xx_it.c`）中，CubeMX 生成的默认代码包含：

```c
void EXTI10_IRQHandler(void) {
    HAL_GPIO_EXTI_IRQHandler(GPIO_PIN_10);  // 调用 HAL 库的 EXTI 处理函数
}

```

如果需要自定义功能（如按键中断），可以修改这个函数：

```c
void EXTI10_IRQHandler(void) {
    HAL_GPIO_EXTI_IRQHandler(GPIO_PIN_10);  // 调用 HAL 库的中断处理函数
    // 你的自定义代码，比如 LED 亮灭
    HAL_GPIO_TogglePin(GPIOC, GPIO_PIN_13);
}

```
### 实验1： 红灯一直闪，按下按键触发中断让绿灯改变状态
### 实验2：按键按下改变水平灵敏度

cube配置：配置system core的NVIC![[Pasted image 20250320153519.png]]

改`stm32f4xx_it.c`中的代码：
```c
void EXTI15_10_IRQHandler(void)
{
  /* USER CODE BEGIN EXTI15_10_IRQn 0 */
  // HAL_GPIO_EXTI_IRQHandler(GPIO_PIN_15);
  // if (__HAL_GPIO_EXTI_GET_IT(GPIO_PIN_15) != RESET) {
  //   __HAL_GPIO_EXTI_CLEAR_IT(GPIO_PIN_15);
  //   buttonPressCount++;
  //   if (buttonPressCount >= 3) {
  //     buttonPressCount = 0;
  //   }
  //   currentArrIndex = buttonPressCount;
  //   __HAL_TIM_SET_AUTORELOAD(&htim3, arr_values[currentArrIndex]);
  //   __HAL_TIM_SET_COUNTER(&htim3, 0); // 重置计数器为0
  //   SAMPLING_FREQUENCY = samplingFrequencies[currentArrIndex];
  // }

  buttonPressCount++;
  if (buttonPressCount >= 3) {
    buttonPressCount = 0;
  }
  currentArrIndex = buttonPressCount;
  __HAL_TIM_SET_AUTORELOAD(&htim3, arr_values[currentArrIndex]);
  __HAL_TIM_SET_COUNTER(&htim3, 0); // 重置计数器为0
  SAMPLING_FREQUENCY = samplingFrequencies[currentArrIndex];
  /* USER CODE END EXTI15_10_IRQn 0 */
  HAL_GPIO_EXTI_IRQHandler(GPIO_PIN_15);
  /* USER CODE BEGIN EXTI15_10_IRQn 1 */

  /* USER CODE END EXTI15_10_IRQn 1 */
}

```

或者自己改弱定义的中断回调函数
## 改GPIO用户标签
以翻转小灯为例
不改标签的代码：
```c
HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5); // ç¿»è½¬ LED çŠ¶æ€
```
加了用户标签的代码
```c
HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin); // ç¿»è½¬ LED çŠ¶æ€
```
# 串口通信
## 轮询模式
![[Pasted image 20241108114343.jpg]]

+ 在此模式下，以发送为例：<mark style="background: #ADCCFFA6;">CPU要一直查询</mark> 发送数据寄存器中的数据<mark style="background: #ADCCFFA6;">有没有转移到发送移位寄存器中</mark>，如果发送数据寄存器中的数据被转移了，就要<mark style="background: #ADCCFFA6;">将下一个数据塞进发送数据寄存器中</mark>。这时候CPU不能执行其他代码，所以叫阻塞模式。
## 串口中断
### 发送
CPU把数据塞进发送数据寄存器中就可以去执行其他任务，当<mark style="background: #ADCCFFA6;">发送数据寄存器当中的数据被转移到发送移位寄存器</mark>中，就会触发<mark style="background: #ADCCFFA6;">发送数据寄存器空中断</mark>把 CPU调回来，把下一个数据塞进发送数据寄存器里。这时候CPU可以去执行其他代理，<mark style="background: #ADCCFFA6;">但是仍然会有多次打断</mark>。
### 接收
当我们使用`HAL_UART_Receive_IT`进行中断接收后，每当接收移位寄存器将一帧数据（仍然存疑，到底是一字节还是一帧）移入接收数据寄存器，就会触发接受数据寄存器非空中断，把正在处理其他事情的CPU叫回来，把数据读入变量中，然后CPU再去处理其它事情。直到接收到了我们设定的数据长度，就算完成了本次接收。
#### **HAL_UART_RxCpltCallback**中断回调函数
虽然接收移位寄存器每向接收数据寄存器转移一帧数据都会触发一次中断，但是这个函数做了优化，<mark style="background: #BBFABBA6;">只有当接收到我们想要的字节数</mark>，也就是接收完成时，<mark style="background: #BBFABBA6;">才会调用</mark>**HAL_UART_RxCpltCallback**中断回调函数。

##### 函数概述

**HAL_UART_RxCpltCallback**是一个用户定义的回调函数，当UART接收完成时，该函数会被自动调用。它的主要作用是在接收到预定数量的数据后，执行用户自定义的处理逻辑。

##### 工作原理

具体的中断工作原理参考[[stm32基础#执行中断的流程]]

1. **初始化接收**：在使用HAL库进行UART通信时，首先需要调用`HAL_UART_Receive_IT()`或`HAL_UART_Receive_DMA()`等函数来启动接收过程。这些函数会配置UART硬件，并设置接收缓冲区和数据长度。例如：
   ```c
   HAL_UART_Receive_IT(&huart1, aRxBuffer, RXBUFFERSIZE);
   ```
   这里`aRxBuffer`是接收数据的缓冲区，`RXBUFFERSIZE`是要接收的数据长度。

2. **中断处理**：当UART接收到数据并触发中断时，系统会进入UART中断服务程序ISR。<mark style="background: #ADCCFFA6;">ISR 是中断服务程序（Interrupt Service Routine）的英文缩写</mark>。<mark style="background: #ADCCFFA6;">它也被叫做中断处理程序（Interrupt Handler）</mark>。在ISR中，通常会调用`HAL_UART_IRQHandler()`，该函数负责处理所有与UART相关的中断，包括接收和发送：
   ```c
   void USART1_IRQHandler(void) {
       HAL_UART_IRQHandler(&huart1);
   }
   ```

3. **调用回调**：在`HAL_UART_IRQHandler()`内部，当接收到指定数量的数据后，会调用`HAL_UART_RxCpltCallback()`：（这次<mark style="background: #ADCCFFA6;">不能将中断逻辑写在USART1_IRQHandler</mark>，因为<mark style="background: #ADCCFFA6;">有其他中断也共用了此中断处理函数</mark>，因此要用中断回调函数来识别当前是那个中断）
	![[465767104854e2e19f5f38c3b1e8201.jpg|400]]
	中断回调函数在这（执行自己编写的逻辑，其它的中断回调函数没有编写逻辑，执行也没用）：
   ```c
   HAL_UART_RxCpltCallback(huart);
   ```

### 实验1：发送消息给单片机产生中断让灯亮在让单片机把数据发送回来

用户需要实现这个回调函数，以便在数据接收完成后进行特定的操作。例如，可以在此处处理接收到的数据或更新状态标志：

在cubeMX中用NVIC打开USART2的中断功能(2种方法)：
```image-layout-a
![[Pasted image 20250303202348.png]]
![[Pasted image 20250224153439.png]]
```


1. 先定义一个数组，作为串口接收数据的缓存区
```c
/* USER CODE BEGIN PV */

uint8_t receiveData[50];

/* USER CODE END PV */
```

1. 再调用`HAL_UART_Receive_IT()`  函数来启动接收过程
```c
/* USER CODE BEGIN 2 */

  

HAL_UART_Receive_IT(&huart2, receiveData, 2);//参数串口2的指针，缓存区数组receiveData,要接受的数据长度是2字节

  


/* USER CODE END 2 */

  

/* Infinite loop */

/* USER CODE BEGIN WHILE */

while (1)
```
1. 再自己定义void HAL_UART_RxCpltCallback()函数（为了方便定义在`main.c`）
```c
/* Private user code ---------------------------------------------------------*/

/* USER CODE BEGIN 0 */

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart){

HAL_UART_Transmit_IT(&huart2, receiveData, 2);

GPIO_PinState state = GPIO_PIN_SET;

  

if(receiveData[0] == 'G'){

state = GPIO_PIN_SET;

HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, state);

}

if(receiveData[0] == 'K'){

state = GPIO_PIN_RESET;

HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, state);

}
// 不能在while里启动串口接收，也不能在usercode中只启动一次重新启动串口接收。所以在回调函数再启动串口接收
HAL_UART_Receive_IT(&huart2, receiveData, 2);

}

/* USER CODE END 0 */
```

### 串口中断优先级
+ 抢占优先级（优先考虑）
+ 相应优先级（后考虑）

### 串口通信数据格式
**Hex格式** 和 **ASCII码格式** 都是表示数据的不同方式，但它们之间有根本的区别。

#### 1. **Hex格式（十六进制）**

Hex格式直接表示数据的原始二进制值，用16个符号（0-9和A-F）表示每4位二进制。它用于表示原始字节数据，不管这个数据代表什么内容（字符、数字、颜色等）。

#### 2. **ASCII码格式（字符格式）**

ASCII码是字符编码标准，它用数字表示计算机中每个字符的二进制值。每个字符（例如字母、数字、符号等）都有一个对应的ASCII编码。ASCII是基于字符集的，每个字符有一个对应的整数值（例如字符`'A'`的ASCII码是65）。

#### 3. 举个例子：

假设我们要发送字符 `'1'`。

##### 1. **Hex格式**

如果你想以Hex格式发送数字`1`，它的16进制表示是 `0x01`，这意味着发送的是一个字节，其二进制值为`00000001`。此时发送的就是原始的二进制数据 `0x01`。

##### 2. **ASCII码格式**

如果你想发送字符 `'1'`（即字符`'1'`的ASCII码），它的ASCII值是`0x31`。这表示发送的是字符 `'1'` 的ASCII编码，实际发送的是 `0x31`，对应的二进制是 `00110001`。

##### 对比：

|格式|十六进制值（Hex）|二进制表示|ASCII字符|
|---|---|---|---|
|**数字1**|0x01|00000001|(无意义的字符)|
|**字符'1'**|0x31|00110001|1|

##### 关键区别：

- **Hex格式** 表示的是原始的数据字节，值为 `0x01` 表示一个字节，其二进制值是 `00000001`，通常用来表示数字、颜色、控制码等原始数据。
- **ASCII码格式** 表示的是字符，值为 `0x31` 表示字符 `'1'`，它对应的是字符 `1` 的编码。

##### 总结：

- 在 **Hex格式** 中，数据就是数字本身。
- 在 **ASCII格式** 中，数据是字符的编码值（比如`'1'`的ASCII值为 `0x31`）。
## DMA模式
![[Pasted image 20241108115752.jpg]]

+ 在此模式下，以发送为例：CPU把数据塞进发送数据寄存器中就可以执行其他任务，期间并不需要再把下一个数据塞进发送数据寄存器中。把下一个数据塞进发送数据寄存器的任务由DMA来完成，当<mark style="background: #ADCCFFA6;">发送数据全部传输完成后</mark>才会<mark style="background: #ADCCFFA6;">触发数据传输完成中断</mark>把CPU叫回来。直接创建DMA通道就可以了，不需要CPU把数据从内存变量发送到寄存器中，也不需要CPU把接收数据寄存器中的数据搬运到内存变量中。这时候CPU可以去执行其他代码，并且期间不会被打断，只有最后指定字节的数据接收完成才会被打断(==这句话好像不是很对==，<mark style="background: #BBFABBA6;">其实是接受寄存器空时</mark>，才打断cpu)。
+ 这里触发的是接收寄存器空中断


### 用串口与fpga通信

#### 认识到串口通信时以字节为单位的
你担心的是：

> “FPGA一位一位地发二进制，STM32收成一个字节，那是不是位的顺序反过来了？”

##### 实际上不会反过来，原因如下：

##### ✅ 串口通信是**按字节发送**，一位一位发只是物理层行为

- UART 发送一个字节（8位）时，是从**最低位（LSB）先发**，再发到最高位（MSB）；
    
- STM32 的 UART 接收模块 **知道这个规则**，它会把接收到的一位一位的电平信号，重新组装回原来的字节顺序。

### 实验1：发送不定长消息给单片机，让单片机把数据发送回来

其实接收不定长数据非常简单
主要靠的就是串口空闲中断
此中段的触发条件与接收的字节数无关
只有当RX引脚上无后续数据进入
也就是串口接收从忙碌转为空闲时才会触发
因而我们可以认为空闲中断发生时
就是一帧数据包接收完成了
在此时对数据进行分析处理即可

我们只需要将串口接收函数替换为HAL库
为我们提供的一个扩展函数`HAL_UARTEx_ReceiveToIdle_DMA
`HAL_UARTEx_ReceiveToIdle_DMA` 是一个用于开启 UART 接收功能的函数
并且采用了 DMA（直接内存访问）方式

先在cubeMX中对USART2的DMA进行配置
![[Pasted image 20250304151015.png]]

代码:
`main.c`
+ 定义接收数据的变量
```c
/* USER CODE BEGIN PV */

uint8_t receiveData[30];

/* USER CODE END PV */
```
+  开启串口数据接收：
```c
/* USER CODE BEGIN 2 */

HAL_UARTEx_ReceiveToIdle_DMA(&huart2, receiveData, sizeof(receiveData)); //用这个扩展函数开启USART2的接收，第一个参数是串口指针，第二哥参数是要接受的变量数组的指针，第三个变量是一次能接收的最大数据长度

__HAL_DMA_DISABLE_IT(&hdma_usart2_rx, DMA_IT_HT); //关闭过半传输中断

/* USER CODE END 2 */
```

+ 正在中断回调函数种实现主要逻辑：
```c
/* USER CODE BEGIN 0 */

void HAL_UARTEx_RxEventCallback(UART_HandleTypeDef *huart, uint16_t Size){

if(huart == &huart2){

HAL_UART_Transmit_DMA(&huart2, receiveData, Size);

  

HAL_UARTEx_ReceiveToIdle_DMA(&huart2, receiveData, sizeof(receiveData)); //重新启动接收

__HAL_DMA_DISABLE_IT(&hdma_usart2_rx, DMA_IT_HT); //重新关闭过半传输中断

}

}

/* USER CODE END 0 */
```



# iic通信
## iic原理
忘了
![[Pasted image 20250226115936.png]]
## 实验1：矩阵键盘输入16进制数oled输出
用cubeMX配置引脚

先引用库：先在文件资源管理器Src和Inc文件夹里加入oled.c和oled.h。在keil里右键文件夹加入.c文件到新工程。

直接用封装好的函数

代码：
`main.c`
```c
/* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    key_pressed = read_keyboard();
    if (key_pressed != 0xFF) {
        if (key_pressed < 10) {
            display_str[0] = '0' + key_pressed;
        } else {
            display_str[0] = 'A' + (key_pressed - 10);
        }
        OLED_NewFrame(); 
        OLED_PrintASCIIString(20, 20,  display_str, &afont24x12, OLED_COLOR_NORMAL); // 使用OLED_PrintString函数
        OLED_ShowFrame();
    }


   
    /* USER CODE END WHILE */
    

    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
```





## 一些通信的概念
### 全双工和半双工
在通信系统中，全双工（Full-Duplex）和半双工（Half-Duplex）是描述数据传输方向和时序的概念。
	•	全双工（Full-Duplex）：指的是数据可以在同一时间内双向传输。也就是说，通信的双方可以同时发送和接收数据。例如，<mark style="background: #BBFABBA6;">串口通信（USART）通常支持全双工模式</mark>，在同一时刻，一个设备可以发送数据，另一个设备也可以接收数据，彼此互不干扰。
	•	半双工（Half-Duplex）：指的是数据只能在同一时间内单向传输。虽然通信双方都可以发送和接收数据，但不能同时进行。当一个设备发送数据时，另一个设备只能接收数据，反之亦然。常见的半双工通信协议包括传统的对讲机或某些无线通信系统。<mark style="background: #BBFABBA6;">STM32 的 I2C 通信属于半双工通信</mark>。下面为你详细解释

在STM32的串口（USART）通信中，你可以根据应用的需要选择全双工或半双工模式。例如，在全双工模式下，TX和RX信号线同时用于发送和接收数据；而在半双工模式下，TX和RX信号线共享一个通道，数据的传输是单向的，需要在发送和接收之间进行切换。

# TIM定时器(计数器)
## 只用基本定时功能的定时器
### 基本定时的硬件原理
+ 基本定时功能在定时器硬件中所处的位置：
![[Pasted image 20250227092237.png]]
+ 基本定时器简化图
![[Pasted image 20250227092326.jpg]]
+ CubeMX配置上图定时器(==其实只是计数器counter==)的部分
![[Pasted image 20250227092733.png]]

## 输入捕获模式(Input Capture)
### 输入捕获模式硬件原理


每个通道对应着一个GPIO口

当<mark style="background: #ADCCFFA6;">输入的信号</mark><mark style="background: #BBFABBA6;">出现我们想要的边沿</mark>时
定时器就会把此时<mark style="background: #ADCCFFA6;">计数器的值</mark>
录到捕获寄存器中
等待我们读取

![[Pasted image 20250227093158.png]]
### 实验1：测方波的频率和占空比

CubeMX参数设置(包括==计数器counter==和==输入捕获寄存器==)
+ 配置通道的模式(注意每个定时器有直接捕获模式和间接捕获模式)
+ 配置上升沿捕获还是下降沿捕获
+ 配置输入捕获中断
![[Pasted image 20250305202042.png]]
```image-layout-a
![[Pasted image 20250305202126.png]]
![[Pasted image 20250305202234.png]]
```

代码：

`main.c`
+ 初始化屏幕，开启定时器，开启==输入捕获中断==
```c
  /* USER CODE BEGIN 2 */
  HAL_Delay(20);
  OLED_Init();

  HAL_TIM_Base_Start(&htim1); //启动定时器计数
  
  //启动输入捕获,IC就是Input Capture的意思。加_IT是开启了通道3和通道4的输入捕获中断
  HAL_TIM_IC_Start_IT(&htim1, TIM_CHANNEL_3);  
  HAL_TIM_IC_Start_IT(&htim1, TIM_CHANNEL_4);

  /* USER CODE END 2 */

```

+ 定义全局变量和中断回调函数：捕获触发中断回调函数，完成计算逻辑后，设置中断标志位`update_display`(全局变量)
+ 计算频率: 现在经过72分频，arr为最大65525，定时器<mark style="background: #ADCCFFA6;">每1/1M秒记一次数</mark>。两个相邻上升沿之间<mark style="background: #ADCCFFA6;">记了`upEdge1-upEdge2`个数</mark>，所以两个相邻上升沿之间<mark style="background: #ADCCFFA6;">有period=(upEdge1-upEdge2)/1M秒</mark>。所以频率<mark style="background: #ADCCFFA6;">为周期倒数f=1M/(upEdge1-upEdge2)</mark>

```c
/* USER CODE BEGIN 0 */
uint32_t upEdge1 = 0;
uint32_t upEdge2 = 0;
uint32_t downEdge = 0;
uint32_t highTime = 0;
uint32_t period = 0;
float frequency = 0;
float dutyCycle = 0;
char message[30] = "";
volatile uint8_t update_display = 0;  // **标志位，通知主循环更新OLED**

void HAL_TIM_IC_CaptureCallback(TIM_HandleTypeDef *htim) {
    if (htim->Instance == TIM1) {  
        // 刚才判断了是都是定时器1，然后再判断是通道3还是通道4
        if (htim->Channel == HAL_TIM_ACTIVE_CHANNEL_3) {  // **上升沿捕获**
            upEdge1 = HAL_TIM_ReadCapturedValue(htim, TIM_CHANNEL_3);  // 读取当前捕获值

            // 计算周期
            if (upEdge1 >= upEdge2) {
                period = upEdge1 - upEdge2;
            } else {
                period = (0xFFFF - upEdge2) + upEdge1;  // 处理定时器溢出
            }

            upEdge2 = upEdge1;  // **更新上一次捕获值**
        } 
        else if (htim->Channel == HAL_TIM_ACTIVE_CHANNEL_4) {  // **下降沿捕获**
            downEdge = HAL_TIM_ReadCapturedValue(htim, TIM_CHANNEL_4);

            // 计算高电平时间
            if (downEdge >= upEdge2) {
                highTime = downEdge - upEdge2;
            } else {
                highTime = (0xFFFF - upEdge2) + downEdge;  // 处理定时器溢出
            }
        }

        // 计算频率（假设定时器时钟为 1MHz）
        if (period > 0) {
            frequency = 1000000.0f / period;
            dutyCycle = ((float)highTime / period) * 100.0f;  // 计算占空比
        }

        update_display = 1; // **设置标志位，通知主循环更新 OLED**
    }
}

/* USER CODE END 0 */

```

+ 根据`update_display`决定是否在`while`中显示结果
```c
  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    //先将计数器TIM1置为零
    //__HAL_TIM_SET_COUNTER(&htim1, 0);

    if (update_display) {  // **检测标志位**
      update_display = 0;  // **清除标志位**

      OLED_NewFrame();

      // 显示频率
      sprintf(message, "Freq: %.2f Hz", frequency);
      OLED_PrintASCIIString(1, 1, message, &afont16x8, OLED_COLOR_NORMAL);

      // 显示占空比
      sprintf(message, "Duty: %.2f%%", dutyCycle);
      OLED_PrintASCIIString(1, 15, message, &afont16x8, OLED_COLOR_NORMAL);

      OLED_ShowFrame();
    }

    HAL_Delay(200);  // **降低 OLED 刷新频率，防止闪屏**
    
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
}

```

## 输出比较模式(Output Compare)与PWM
### 输出比较模式硬件原理
捕获寄存器则摇身一变
改名为了比较寄存器

在输出比较模式下
我们要首先向比较寄存器中写入一个数值
然后定时器会一直比较
计数器值与比较计算器数值的大小关系
根据其大小关系来决定输出有效电平还是无效

![[Pasted image 20250227093732.png]]

输出比较有很多模式

### PWM的硬件原理
输出比较有很多模式
而要输出任意占空比的PWM信号
我们则要使用专门为此设计的模式
输出比较模式中最有用的模式PWM模式

### PWM的模式

PWM有这些模式：

![[b55148ea1fb82e25c0396f0c2b17322.jpg]]
### 实验1：PWM呼吸灯实验

CubeMX参数设置(包括==计数器counter==和==输出比较寄存器==)
![[Pasted image 20250228094443.jpg]]
1. 设置时钟：设置RCC，这里将时钟设置为72MHz。 
2. 选择tim3，将某个channel（这里是channel1）设置成pwm generation模式。
3. 设置预分频器Prescaler，这里将时钟信号72分频，所以将Prescaler设置成72 - 1。此时时钟信号被分频为1MHz的时钟信号。
$$
 TimerClock = 72000000 \div (prescaler + 1) 
$$
$$
Timer Clock=72000000 \div 72 = 1000000
$$
4. 设置自动重装载寄存器（arr）：这里将arr设置为100-1，这样计数器每计数到1000就会归0。此时PWM波的频率是10000Hz。
$$
f=TimerClock \div (arr+1)
$$
$$
f=1000000 \div 100=10000Hz
$$
1. 设置输出比较寄存器（ccr）：这里将ccr的初始值设为0。向上技术模式下，占空比为：
$$
duty = \frac{ccr}{arr+1}
$$
$$
duty=\frac{10}{(100-1)+1}
$$

![[Pasted image 20241120111751.jpg]]

代码：
1. 启动定时器
```c
/* USER CODE BEGIN 2 */

  HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_1);

  /* USER CODE END 2 */
```
2. 呼吸灯主程序
```c
    /* Infinite loop */

  /* USER CODE BEGIN WHILE */

  while (1)

  {

    for(int i = 0; i < 100; i++){

      __HAL_TIM_SET_COMPARE(&htim3, TIM_CHANNEL_1, i);

      HAL_Delay(10);

    }

    for(int i = 99; i >= 0; i--){

      __HAL_TIM_SET_COMPARE(&htim3, TIM_CHANNEL_1, i);

      HAL_Delay(10);

      }

    /* USER CODE END WHILE */

  

    /* USER CODE BEGIN 3 */

  }

  /* USER CODE END 3 */
```

## 定时器中断

### 定时器更新中断

+ 更新中断的中断回调函数

```c
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim)
{
    if (htim == (&htim2))
    {
      
      
    }
}

```

# ADC
+ 与芯片内部的标准电压比较，得到GPIO引脚的电压值

## 一个ADC多通道采集
### 参考教程

+ 链接：[STM32CubeMX+ADC+DMA+TIM触发+多通道_stm32 cubemx adc dma-CSDN博客](https://blog.csdn.net/m0_61901355/article/details/136664893)

# DAC

## 注意事项
+ ==关闭DAC输出（在下一次输出另一种波形前需要关闭之前的输入，否则下次输出无效==

```c
//下面这几行代码可以实现：在通道一依次输出正弦波，方波，三角波，中间间隔两秒；在通道二依次输出三角波，正弦，方波，中间间隔两秒
  HAL_DAC_Start_DMA(&hdac, DAC_CHANNEL_1, (uint32_t*)SinBuffer, LUT_SIZE, DAC_ALIGN_12B_R);//通道1输出正弦波
	HAL_DAC_Start_DMA(&hdac, DAC_CHANNEL_2, (uint32_t*)RampBuffer, LUT_SIZE, DAC_ALIGN_12B_R);//通道2输出三角波
	HAL_Delay(2000);
	HAL_DAC_Stop_DMA(&hdac, DAC_CHANNEL_1);//关闭DAC输出（在下一次输出另一种波形前需要关闭之前的输入，否则下次输出无效）
	HAL_DAC_Start_DMA(&hdac, DAC_CHANNEL_1, (uint32_t*)SquareBuffer, LUT_SIZE, DAC_ALIGN_12B_R);//通道1输出方波
	HAL_DAC_Stop_DMA(&hdac, DAC_CHANNEL_2);
	HAL_DAC_Start_DMA(&hdac, DAC_CHANNEL_2, (uint32_t*)SinBuffer, LUT_SIZE, DAC_ALIGN_12B_R);//通道2输出正弦波
	HAL_Delay(2000);
	HAL_DAC_Stop_DMA(&hdac, DAC_CHANNEL_1);
	HAL_DAC_Start_DMA(&hdac, DAC_CHANNEL_1, (uint32_t*)RampBuffer, LUT_SIZE, DAC_ALIGN_12B_R);//通道1输出三角波
	HAL_DAC_Stop_DMA(&hdac, DAC_CHANNEL_2);
	HAL_DAC_Start_DMA(&hdac, DAC_CHANNEL_2, (uint32_t*)SquareBuffer, LUT_SIZE, DAC_ALIGN_12B_R);//通道2输出方波
	
	//HAL_DAC_Start_DMA(&hdac,DAC_CHANNEL_1,(uint32_t*)Sine12bit,100,DAC_ALIGN_12B_R);//开启输出（制作好的信号点表)
```
# DMA
## cubeMX配置
### normal和circular

当然可以，关于 STM32 的 DMA 设置中，`Mode` 的两个常见选项 —— **Normal** 和 **Circular**，它们的区别如下：通信原理

---

##### ✅ **Normal 模式（一次性传输）**

- **特点：** DMA 传输一次数据后就停止。
    
- **使用场景：** 适用于只需要采集一次数据的场合，比如初始化时读取一次传感器数据。
    
- **行为：**
    
    - 你设置好传输长度，比如采集 100 个 ADC 数据；
        
    - DMA 把 ADC 的数据搬运 100 次到内存后，**DMA 通道就关闭**；
        
    - 若要再次采样，必须重新启动 DMA（通过代码或中断）。
        

---

##### 🔁 **Circular 模式（循环传输）**

- **特点：** DMA 在传输完成后，**自动从头开始**，无限循环搬运数据。
    
- **使用场景：** 用于持续采集的应用，比如实时采集 ADC 值，或者用环形缓冲区接收串口数据。
    
- **行为：**
    
    - 设置的缓冲区满了以后，DMA 会从头继续覆盖；
        
    - 适合和 **中断** 或 **双缓冲** 一起使用，实现连续数据处理。
        

---

##### 对比总结：

|模式|是否自动重复传输|是否适合实时采集|控制复杂性|
|---|---|---|---|
|Normal|❌ 否|❌ 否|✅ 低|
|Circular|✅ 是|✅ 是|⚠️ 稍高|

---

##### 🧠 举个例子：

- 如果你要用 ADC + DMA 来**持续采集电压**，实时计算平均值等，就应该用 **Circular**。
    
- 如果你只是想**采集 1 次 100 个数据点**用于某种校准或者初始化，就用 **Normal**。
## 几个DMA的应用

# 中断

## 执行中断的流程
以GPIO外部中断为例讲解：
### 直接在IRQHandler内写中断发生后处理的逻辑
+ 中断发生后会执行这些内容
`Core\Src\stm32f4xx_it.c`
```c
void EXTI15_10_IRQHandler(void)
{
  /* USER CODE BEGIN EXTI15_10_IRQn 0 */
  
  //处理代码可以写在这，直接执行这些内容
  /*
  code;
  code;
  */

  /* USER CODE END EXTI15_10_IRQn 0 */
  HAL_GPIO_EXTI_IRQHandler(GPIO_PIN_15); //这行代码执行了，但是没有处理逻辑
  /* USER CODE BEGIN EXTI15_10_IRQn 1 */

  /* USER CODE END EXTI15_10_IRQn 1 */
}
```
+ `USER CODE`注释对里面的`code; code;`就是有用的处理逻辑
+ 此时中断回调函数定义在`HAL_GPIO_EXTI_IRQHandler(GPIO_PIN_15);`里，<mark style="background: #ADCCFFA6;">但是中断函数里什么都没写</mark>，`HAL_GPIO_EXTI_IRQHandler(GPIO_PIN_15);`执行了但是不起作用
### 不直接在IRQHandler内写中断处理逻辑，在中断回调函数内写中断处理逻辑

+ 中断发生后会执行这些内容
`Core\Src\stm32f4xx_it.c`
```c
void EXTI15_10_IRQHandler(void)
{
  /* USER CODE BEGIN EXTI15_10_IRQn 0 */
  
  //这次不写代码在这里了，这里没有处理逻辑

  /* USER CODE END EXTI15_10_IRQn 0 */
  HAL_GPIO_EXTI_IRQHandler(GPIO_PIN_15); //这行代码执行了，处理逻辑在这行代码的中断回调函数里
  /* USER CODE BEGIN EXTI15_10_IRQn 1 */

  /* USER CODE END EXTI15_10_IRQn 1 */
}
```

+ `USER CODE`注释对里面没有有用的处理逻辑代码
+ `HAL_GPIO_EXTI_IRQHandler(GPIO_PIN_15);`执行了并且会执行里面定义的中断回调函数(中断回调函数时弱定义，可以定义在其它用户文件)
+ 想看`IRQHandler`具体怎么执行，可以点击`HAL_GPIO_EXTI_IRQHandler(GPIO_PIN_15);`可以跳转到：`\Drivers\STM32F4xx_HAL_Driver\Src\stm32f4xx_hal_gpio.c`

`\Drivers\STM32F4xx_HAL_Driver\Src\stm32f4xx_hal_gpio.c`
```c
void HAL_GPIO_EXTI_IRQHandler(uint16_t GPIO_Pin)
{
  /* EXTI line interrupt detected */
  if(__HAL_GPIO_EXTI_GET_IT(GPIO_Pin) != RESET)
  {
    __HAL_GPIO_EXTI_CLEAR_IT(GPIO_Pin);  //先清除中断标志位
    HAL_GPIO_EXTI_Callback(GPIO_Pin);  //HAL_GPIO_EXTI_IRQHandler函数有用的执行部分其实就是中断回调函数，中断函数的定义在下面:
  }
}

/**
  * @brief  EXTI line detection callbacks.
  * @param  GPIO_Pin Specifies the pins connected EXTI line
  * @retval None
  */
__weak void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
  /* Prevent unused argument(s) compilation warning */
  UNUSED(GPIO_Pin);
  /* NOTE: This function Should not be modified, when the callback is needed,
           the HAL_GPIO_EXTI_Callback could be implemented in the user file
   */
}
```

## 未整理的知识点
在 STM32 微控制器中，`EXTI line`（External Interrupt Line，外部中断线）是一个重要的概念，它为外部设备与 STM32 之间的交互提供了一种机制，允许外部设备在特定事件发生时向 STM32 发送中断信号，从而使 STM32 暂停当前任务并处理外部设备的请求。下面为你详细介绍相关信息：

## 中断优先级可能会引发的问题
### 优先级的中断函数里面有优先级低的函数

+ 问题代码：![[Pasted image 20250707154704.png]]
+ 分析：因为HAOD列函数需要依赖一个叫做system tictimer的中断，这个中段可以为其提供一毫秒的时钟基准。<mark style="background: #BBFABBA6;">但此中断的优先级比我们所触发的中段的优先级低一些</mark>。也就导致其不能在我们的中断处理函数执行时执行。从而使得HAOD列函数无法正常执行。也就卡死在这行代码上
+ 中断优先级数字越小，越优先
+ 方法：让system tick timer的优先级数字小于咱们的EXTI15杠十即可![[Pasted image 20250707155333.png]]
### 基本概念

- **中断通道**：EXTI line 可被视为 STM32 与外部设备间的通信通道。STM32 通常有多个 EXTI line（如 STM32F4 系列有 23 条外部中断线），每条线都能连接到一个或多个 GPIO 引脚，用于接收外部设备的中断信号。
- **信号传输**：当连接到 EXTI line 的 GPIO 引脚检测到电平变化（上升沿、下降沿或双边沿）或者特定电平状态（高电平或低电平）时，就会触发对应的外部中断，通知 STM32 有事件发生。

### 工作原理

1. **引脚映射**：STM32 允许将不同端口（如 PA、PB、PC 等）的相同编号引脚映射到同一条 EXTI line 上。例如，PA0、PB0、PC0 等都可以映射到 EXTI0 线上。但在同一时刻，一条 EXTI line 只能连接一个 GPIO 引脚。
2. **触发方式配置**：可通过寄存器配置每条 EXTI line 的触发方式，常见的触发方式有上升沿触发、下降沿触发、双边沿触发和电平触发。
3. **中断响应**：当 EXTI line 检测到符合配置的触发条件时，会将对应的中断标志位置位，并向 NVIC（Nested Vectored Interrupt Controller，嵌套向量中断控制器）发送中断请求。NVIC 会根据中断优先级决定是否响应该中断请求，如果响应，则跳转到对应的中断服务函数（ISR）执行。

### 应用场景

- **按键检测**：将按键连接到某个 GPIO 引脚，并将该引脚映射到一条 EXTI line 上。当按键按下或释放时，会触发对应的外部中断，从而执行相应的处理代码。
- **传感器数据采集**：一些传感器（如加速度计、陀螺仪等）在检测到特定事件时会输出电平变化信号。通过将传感器的输出引脚连接到 EXTI line，可以实时响应传感器的事件。

### 示例代码

以下是一个简单的示例，展示了如何配置 EXTI line 来检测按键按下事件：


```c
#include "stm32xxxx_hal.h"

// 外部中断服务函数
void EXTI0_IRQHandler(void)
{
    if (__HAL_GPIO_EXTI_GET_IT(GPIO_PIN_0))
    {
        // 处理按键按下事件
        // ...

        // 清除中断标志
        __HAL_GPIO_EXTI_CLEAR_IT(GPIO_PIN_0);
    }
}

// 配置EXTI line
void EXTI_Configuration(void)
{
    GPIO_InitTypeDef GPIO_InitStruct = {0};

    // 使能GPIO端口时钟
    __HAL_RCC_GPIOA_CLK_ENABLE();

    // 配置GPIO引脚
    GPIO_InitStruct.Pin = GPIO_PIN_0;
    GPIO_InitStruct.Mode = GPIO_MODE_IT_FALLING; // 下降沿触发
    GPIO_InitStruct.Pull = GPIO_PULLUP;
    HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);

    // 配置NVIC
    HAL_NVIC_SetPriority(EXTI0_IRQn, 0, 0);
    HAL_NVIC_EnableIRQ(EXTI0_IRQn);
}
```

### 代码解释

- **中断服务函数**：`EXTI0_IRQHandler` 是与 EXTI0 line 对应的中断服务函数。当 EXTI0 line 检测到下降沿触发时，会执行该函数。在函数内部，会处理按键按下事件，并清除中断标志。
- **EXTI line 配置**：在 `EXTI_Configuration` 函数中，首先使能 GPIO 端口时钟，然后配置 GPIO 引脚为下降沿触发模式，并上拉。接着，使用 `HAL_NVIC_SetPriority` 函数设置中断优先级，使用 `HAL_NVIC_EnableIRQ` 函数使能该中断。

  

综上所述，EXTI line 为 STM32 提供了一种灵活的外部中断处理机制，通过合理配置 EXTI line 和对应的 GPIO 引脚，可以实现对外部设备事件的实时响应。

一个EXTI line对应一个中断标志位对吗？

是的，一个 EXTI line（外部中断线）对应一个中断标志位。下面为你详细解释：

### 中断标志位的作用

在 STM32 中，当外部中断线（EXTI line）检测到符合配置的触发条件（如上升沿、下降沿、双边沿触发等）时，会将对应的中断标志位置位。这个标志位就像是一个信号，用来通知 STM32 有外部中断事件发生。中断标志位可以帮助 CPU 判断具体是哪条 EXTI line 触发了中断，进而决定调用哪个中断服务函数来处理该事件。

### 具体对应关系

STM32 的每个 EXTI line 都有一个与之对应的独立中断标志位。例如，当 EXTI0 这条外部中断线检测到触发信号时，会将对应的 EXTI_PR（外部中断挂起寄存器）寄存器中的第 0 位（PR0）置 1，表示 EXTI0 产生了中断。同理，EXTI1 对应 PR1 位，EXTI2 对应 PR2 位，以此类推。

### 代码示例与标志位操作

在代码中，通常会使用相关的宏函数来检查和清除这些中断标志位。以下是一个简单的示例，展示了如何检查和清除 EXTI0 的中断标志位：

  

c

```c
#include "stm32xxxx_hal.h"

// 外部中断服务函数
void EXTI0_IRQHandler(void)
{
    if (__HAL_GPIO_EXTI_GET_IT(GPIO_PIN_0))  // 检查EXTI0的中断标志位
    {
        // 处理中断事件
        // ...

        __HAL_GPIO_EXTI_CLEAR_IT(GPIO_PIN_0);  // 清除EXTI0的中断标志位
    }
}
```

### 代码解释

- `__HAL_GPIO_EXTI_GET_IT(GPIO_PIN_0)`：这个宏函数用于检查 EXTI0 对应的中断标志位是否被置位。如果置位，说明 EXTI0 产生了中断，会执行大括号内的代码。
- `__HAL_GPIO_EXTI_CLEAR_IT(GPIO_PIN_0)`：该宏函数用于清除 EXTI0 对应的中断标志位。在处理完中断事件后，必须清除标志位，否则会导致中断一直触发。

  

综上所述，每个 EXTI line 都有一个对应的中断标志位，通过操作这些标志位可以实现对外部中断事件的检测和处理。

分享

如何清除EXTI的中断标志位？

除了EXTI0，还有哪些EXTI line？

如何配置EXTI line的触发条件？

# keil和其它开发工具的使用
## stm32的cubeMX+keil+vscode开发方法
### 建工程和编辑代码的方法
1. 在cubeMX里新建工程，配置+在project manager选为每个外设生成单独文件。编译框架选MDK-ARM。
2. 用keil打开工程（直接在工程文件夹里点u5那个绿色图标文件夹）+配置芯片类型+在debugger那配置一个什么算法？f407选1M那个。
3. 然后在vscode里打开D:\what_i_am_doing\stm32_project\keil_vscode_project\keil_vscode_f407_toggle_light\MDK-ARM文件夹，多编译下载几次就ok了
## 用Git做版本管理
### 初始化Git
1. 在这个文件夹下初始化git。![[Pasted image 20250314164741.png]](如果实在MDK-ARM文件夹里初始化git，保存不到.c文件的更改)
2. 在Vscode里，<mark style="background: #BBFABBA6;">要根据提示</mark>，打开Git存储库。然后用Vscode里的git操作就行了。![[Pasted image 20250314165207.png]]
### 其他使用方法
+ 参考[[Git & Github]]

## 建立模板工程
## 添加模块的.c和.h文件的方法
1. 在文件资源管理器复制进.c和.h文件
![[Pasted image 20250219151349.png|475]]
![[Pasted image 20250219151539.png|475]]
2. 在keil里右键文件夹加入.c文件到新工程
![[Pasted image 20250220205136.png]]
3. 有可能还要在魔术棒那里添加路径
![[Pasted image 20250220205255.png]]
## 复制工程的办法
### 方法一
在keil里save project as

### 方法二(待验证)
1. 复制整个工程文件夹到另一个地方去
2. 后修改一些文件名
3. 打开ioc文件重新生成代码
4. 再删掉MDK-ARM里面二点一些不用的文件夹
## 用keil调试
1. 首先进入仿真界面
![[Pasted image 20250224171955.png]]
2. 比如要观察局部变量i、j、k的值，首先将变量选中，然后右键选择 Add “i” to Watch1
![[Pasted image 20250224172118.png]]
文章链接：[keil5中如何实时查看变量值_keil查看变量的值-CSDN博客](https://blog.csdn.net/qq_20222919/article/details/100042514)
## 配置芯片闪存编程算法(用f407时遇到的问题)
- **Programming Algorithm（编程算法）**：列表中显示了当前针对 STM32F4xx 系列芯片的闪存编程算法，包含芯片闪存大小（1M）、类型（片上闪存）和地址范围（`08000000H - 080FFFFFH`） 。“Add” 按钮用于添加新的编程算法，“Remove” 按钮用于移除已选算法。
![[Pasted image 20250224205208.png|400]]



# 常见报错
## `implicit declaration`
警告信息：

```
warning: implicit declaration of function 'read_keyboard' is invalid in C99
```


这条警告的意思是，在C99标准中，函数`read_keyboard`没有被显式声明，这是不允许的。在C语言中，如果你调用一个函数，你需要在使用它之前声明它，或者包含声明了该函数的头文件。



要解决这个问题，你需要在使用`read_keyboard`函数之前，找到并包含声明了这个函数的头文件，或者显式声明这个函数的返回类型和参数类型。例如：

```c
int read_keyboard(void); // 假设函数没有参数，返回int类型
```

或者，如果`read_keyboard`函数在某个头文件中声明了，你需要包含那个头文件：

```c
#include "keyboard.h" // 假设read_keyboard在keyboard.h中声明
```

这样编译器就能知道`read_keyboard`函数的类型，从而避免这个警告。

## `argument of type incompatible` 

报错信息：
```bash
../Core/Src/main.c(104): error:  #167: argument of type "uint8_t" is incompatible with parameter of type "uint8_t *"
```


这个报错信息 `../Core/Src/main.c(104): error: #167: argument of type "uint8_t" is incompatible with parameter of type "uint8_t *"` 表明在 `main.c` 文件的第 104 行，你传递给某个函数的参数类型和该函数所期望的参数类型不匹配。

在编程和编译错误信息的语境里，“argument” 指的是**参数**，也就是在调用函数时传递给函数的值
# 未整理的知识
Q：所以这个引脚既可以作为输出引脚用来给外部传感器输入电压,又可以作为输入引脚,让外部电源给芯片供电,是这意思吗?
A：是的，3.3V 和 5V 引脚确实可以既作为输出引脚，也可以作为输入引脚，具体如下：

  

4. 作为输出引脚

• 功能：由开发板上的电压稳压器（LDO 或 DC-DC 转换器）提供稳定的电压，供外部设备或模块使用。

• 场景：

• 3.3V 引脚：为低功耗传感器、通信模块（如 I2C、SPI 设备）供电。

• 5V 引脚：为需要 5V 电压的设备（如继电器模块或 5V 工作电压的 LCD 屏）供电。

  

限制：

• 受限于稳压器的输出能力和开发板供电方式，通常输出电流有限（如 USB 供电时总功率不可超过 2.5W）。

  

5. 作为输入引脚

• 功能：向开发板提供供电电压，驱动 STM32 芯片和其他板载元器件。

• 场景：

• 5V 引脚：开发板从外部电源供电时（如使用 DC 电源适配器），5V 电压直接进入板上的稳压器，降压后为 STM32 和其他元器件提供 3.3V 工作电压。

• 3.3V 引脚：如果不使用板载稳压器（如已由外部电路提供稳定的 3.3V），可直接通过此引脚向 STM32 芯片供电。

  

注意：

• 当 5V 引脚用作输入时，USB 的供电路径可能需要隔离，防止冲突。

• 当 3.3V 引脚用作输入时，应确保外部供电稳定且与开发板需求匹配（通常 3.3V ± 5%）。

  

注意事项

6. 输入与输出模式不可混用：

• 如果引脚作为输出供电使用，请不要同时从外部输入电压，以避免电源冲突或损坏开发板。

7. 注意电压范围：

• STM32F103C8T6 芯片本身的工作电压范围是 2.0V - 3.6V，输入 3.3V 时需确保电压精度，避免过压。

• 5V 输入时，不要超过稳压器支持的输入范围（通常 6V 左右）。

8. 电流能力有限：

• 开发板上的稳压器通常只能提供几百毫安，不能为大功率设备供电。

  

总结：3.3V 和 5V 引脚确实可以双向使用，但需要根据实际电路需求正确选择使用模式，并避免输入与输出冲突。
# 注意点(形成肌肉记忆，可以避免)
1. 用f103芯片要注意可能有上传不上的情况，用这个方法：(https://docs.baud-dance.com/docs/stm32/FAQ/DownloadFailed/CompilationFailed).或者这新网址[报错 No Device Found | 波特律动](https://docs.baud-dance.com/docs/stm32/FAQ/CompilationFailed)拔掉的那个跳线帽是离复位键远的那个
2. 下载程序的时候注意避免双电源供电：如果单片机已经有外部电源供电，那么下载器就只需接三根线，GND、CLK、DIO，也就是不要接供电。如果下载器给单片机供电了，那么单片机就不要再外部电源供电。双电源供电容易把你电脑给烧喽
3. 每次开信号源，<mark style="background: #FF5582A6;">都要把Vpp调到3v以下</mark>，不然烧单片机就好完了
4. 每次改完程序，都要<mark style="background: #BBFABBA6;">先编译</mark>！！在进行烧录和调试操作！
5. 如果发现单片机运行结果和上传的程序不符合，可以rebuild一下，再上传

