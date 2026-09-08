
# TI板学习方法(查看官方文档)
## 学习资源
1. 用户手册(使用说明)：<br>MSPM0G3507 LaunchPad Development Kit ==User's Guide== (LP-MSPM0G3507) (Rev. D)](https://www.ti.com/lit/pdf/slau873)|
2. ==Technical Reference Manual== [MSPM0 G-Series 80-MHz Microcontrollers Technical Reference Manual (Rev. B)](https://www.ti.com/lit/ug/slau846b/slau846b.pdf?ts=1753164637170&ref_url=https%253A%252F%252Fwww.ti.com%252Fproduct%252FMSPM0G3518%253FkeyMatch%253DMSPM0G3518%2526tisearch%253Duniversal_search%2526usecase%253DGPN)
3. Subsystem design（这个好像没咋用）
4. b站up： https://space.bilibili.com/336736729?spm_id_from=333.788.upinfo.head.click

## GPIO

## GPIO syscfg 配置
1. 第一步先配置输入还是输出

2. 然后再配置这个：![[Pasted image 20250630130152.png]]
在 TI 开发环境（比如配合 CCS 等，结合 SYSCFG 工具配置 GPIO ）里，你截图的这些属于 **GPIO 引脚的数字 IO 复用（IOMUX）功能配置项** ，用于精细调整引脚电气特性，以下逐个解释：

### 1. Internal Resistor（内部电阻）

- 配置为 `No Resistor`：表示引脚内部**不上拉、不下拉** 。引脚电平完全由外部电路或输出驱动决定，不会因为内部电阻影响电平状态。若外部悬空，电平可能不确定（高阻态 ），常用在明确外部有驱动或上下拉电路的场景。
- 其他可能选项（若有）：`Pull-up`（上拉到电源 ）、`Pull-down`（下拉到地 ），用于外部无明确驱动时，让引脚默认保持稳定电平（比如按键检测常用上拉 / 下拉 ）。

### 2. Invert（电平翻转）

- 配置为 `Disabled`：引脚**输入 / 输出电平不翻转** ，即外部输入高电平，读取就是高；软件输出高电平，引脚实际输出也是高。
- 若使能（`Enabled` ）：输入电平会被 “取反”（外部高→内部读低，外部低→内部读高 ）；输出时，软件写高→引脚实际输出低，写低→实际输出高，用于需要电平逻辑反转的场景（比如适配外部电路电平习惯 ）。

### 3. Drive Strength Control（驱动能力控制）

- 配置为 `Low`：表示引脚**驱动能力低** ，输出电流较小。适合驱动小负载（如普通 GPIO 控制信号、低功耗场景 ），降低功耗和信号噪声。
- 其他可能选项（如 `High` ）：驱动能力高，输出电流大，可驱动更大负载（如直接点亮功率稍高的 LED ），但功耗和电磁干扰可能增加。你截图里的提示 `Set drive strength on high-drive and high-speed capable pins` 也说明：该配置针对支持 “高驱动、高速” 特性的引脚，用来灵活切换其驱动强度，适配不同负载需求。

### 4. High-Impedance（高阻态）

- 配置为 `Disabled`：引脚**不是高阻态** ，正常工作在输入 / 输出模式（输出时有驱动能力，输入时可检测电平 ）。
- 若使能（`Enabled` ）：引脚进入高阻态，相当于 “断开” 内部电路连接，外部电平不会被引脚影响，也无法从引脚读取 / 输出有效电平，常用于需要释放引脚控制权、避免影响外部电路的场景（比如总线复用、动态切换功能时 ）。

  

这些配置最终会影响 GPIO 引脚的电气表现（电平稳定性、驱动能力、逻辑反转等 ），需结合硬件电路需求（比如外接负载类型、电平匹配、噪声敏感程度 ）来选。比如驱动小 LED 用 `Low` 驱动、外部有上拉电路就关内部电阻，需要逻辑反转就使能 `Invert` ，灵活搭配能让 GPIO 更好适配实际硬件交互场景 。
## GPIO函数解释

`DL_GPIO_setPins` 函数是 TI（德州仪器）DriverLib 库中用于 GPIO（通用输入输出）操作的一个函数，主要功能是**设置指定 GPIO 端口的引脚状态（通常是将对应的引脚设置为高电平 ）**，以下从关键部分拆解说明：

### 1. 函数声明与所属

- 从代码可知，它是在 `ti/driverlib/dl_gpio.h` 头文件中声明的**静态内联函数（`static inline` ）** ，静态内联函数的特点是编译时会直接将函数体嵌入调用处，减少函数调用开销，适合简单、高频使用的操作。
- 返回值类型是 `void` ，意味着调用它不会有返回数据，主要做 “设置” 动作。

### 2. 参数解析

- **`GPIO_Regs *gpio`**：  
    这是一个指向 `GPIO_Regs` 结构体的指针，`GPIO_Regs` 一般用于映射 GPIO 外设的寄存器组。不同的 `GPIO_Regs` 实例（==比如 GPIOA、GPIOB 对应的寄存器基地址==），决定了操作哪一组 GPIO 端口 。传入它，函数才知道要操作硬件上的哪个 GPIO 模块。==GPIO端口与register一一对应。==
- **`uint32_t pins`**：  
    这是一个 32 位无符号整数，用来**标识要操作的引脚** 。通常按照 “位掩码” 的方式使用，比如某一位（bit）为 `1` 时，代表对应编号的引脚会被设置（比如第 0 位为 `1` ，对应引脚 0；第 5 位为 `1` ，对应引脚 5 ）。函数内部会依据这个掩码，去设置 `gpio` 指向的 GPIO 模块中对应引脚的输出状态（多数场景下是置为高电平，具体还要看寄存器功能定义，但核心是按掩码控制引脚）。
## GPIO的output
### GPIO输出的几种模式

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


## 实验1：按下按键灯灭

```c
int main(void)
{
    SYSCFG_DL_init();

    while (1) {
        if(!DL_GPIO_readPins(GPIO_button_PORT, GPIO_button_S2_PIN))
        {
            // 按键有被按下，if()语句条件为真，PA0输出高电平，灯灭
            DL_GPIO_setPins(GPIO_LEDS_PORT, GPIO_LEDS_PIN_LED_1_PIN);
        }
        else 
        {
            // 按键没被按下，if()语句条件为假，PA0输出低电平，灯亮
            DL_GPIO_clearPins(GPIO_LEDS_PORT, GPIO_LEDS_PIN_LED_1_PIN);
        }
    }
}


```


## 实验2：循环反转小灯
```c
#include "ti_msp_dl_config.h"

/* This results in approximately 0.5s of delay assuming 32MHz CPU_CLK */
#define DELAY (16000000)

int main(void)
{
    /* Power on GPIO, initialize pins as digital outputs */
    SYSCFG_DL_init();  //类似HAL库的HAL_Init()

    /* Default: LED1 and LED3 ON, LED2 OFF */
    DL_GPIO_clearPins(GPIO_LEDS_PORT, GPIO_LEDS_USER_LED_2_PIN);
    DL_GPIO_setPins(GPIO_LEDS_PORT, GPIO_LEDS_USER_LED_1_PIN |
                                        GPIO_LEDS_USER_LED_3_PIN |
                                        GPIO_LEDS_USER_TEST_PIN);

    while (1) {
        /*
         * Call togglePins API to flip the current value of LEDs 1-3. This
         * API causes the corresponding HW bits to be flipped by the GPIO HW
         * without need for additional R-M-W cycles by the processor.
         */
        delay_cycles(DELAY);
        DL_GPIO_togglePins(GPIO_LEDS_PORT,
            GPIO_LEDS_USER_LED_1_PIN | GPIO_LEDS_USER_LED_2_PIN |
                GPIO_LEDS_USER_LED_3_PIN | GPIO_LEDS_USER_TEST_PIN);
    }
}


```


## `delay_ms()`函数

CPUCLK_FREQ定义在"ti_msp_dl_config.h"文件里
```c
/* This function results in approximately ms ms of delay assuming CPUCLK_FREQHz CPU_CLK */
void delay_ms(uint32_t ms)
{
    while(ms--)
        delay_cycles(CPUCLK_FREQ / 1000);
}

```

# 定时器TIM
## 输入捕获
```c
/*
 * Copyright (c) 2020, Texas Instruments Incorporated
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * *  Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * *  Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * *  Neither the name of Texas Instruments Incorporated nor the names of
 *    its contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

#include "ti_msp_dl_config.h"

volatile uint32_t gCaptureCnt;
volatile bool gSynced;
volatile bool gCheckCaptures;
uint32_t gLoadValue;

int main(void)
{
    volatile static uint32_t pwmPeriod;
    __attribute__((unused)) volatile static uint32_t pwmDuty;

    SYSCFG_DL_init();

    /*
     * This value is used to reload timer manually. Due to timer capture
     * limitation
     */
    gLoadValue = DL_TimerG_getLoadValue(CAPTURE_0_INST);

    /* Initialize capture global states */
    gSynced        = false;
    gCheckCaptures = false;

    /*
     * Forcing timers to halt immediately to prevent timers getting out of sync
     * when code is halted
     */
    DL_TimerG_setCoreHaltBehavior(
        CAPTURE_0_INST, DL_TIMER_CORE_HALT_IMMEDIATE);
    DL_TimerG_setCoreHaltBehavior(PWM_0_INST, DL_TIMER_CORE_HALT_IMMEDIATE); //确保在 CPU 被暂停时（例如调试断点），定时器也同步停止，可以避免因时间差导致的数据不一致或逻辑错误问题。

    NVIC_EnableIRQ(CAPTURE_0_INST_INT_IRQN);
    DL_TimerG_startCounter(CAPTURE_0_INST);
    DL_TimerG_startCounter(PWM_0_INST);

    while (1) {
        while (false == gCheckCaptures) {
            __WFE();
        }
    }
}



```


```c
void CAPTURE_0_INST_IRQHandler(void)
{
    switch (DL_TimerG_getPendingInterrupt(CAPTURE_0_INST)) {
        case DL_TIMERG_IIDX_CC1_DN:
            if (gSynced == true) {
                gCaptureCnt = DL_TimerG_getCaptureCompareValue(
                    CAPTURE_0_INST, DL_TIMER_CC_1_INDEX);
                gCheckCaptures = true;
            } else {
                gSynced = true;  // 执行这一行
            }
            /* Manual reload is needed to workaround timer capture limitation */
            DL_TimerG_setTimerCount(CAPTURE_0_INST, gLoadValue);  //然后重新设置计数器的值为初始获取的gLoadValue = DL_TimerG_getLoadValue(CAPTURE_0_INST);的这个值，是65535
            break;
    }
}
```
![[Pasted image 20250510170043.png]]

```c
void CAPTURE_0_INST_IRQHandler(void)
{
    switch (DL_TimerG_getPendingInterrupt(CAPTURE_0_INST)) {
        case DL_TIMERG_IIDX_CC1_DN:
            if (gSynced == true) {
	            // 执行这一段
                gCaptureCnt = DL_TimerG_getCaptureCompareValue(
                    CAPTURE_0_INST, DL_TIMER_CC_1_INDEX);
                gCheckCaptures = true;
            } else {
                gSynced = true;  
            }
            /* Manual reload is needed to workaround timer capture limitation */
            DL_TimerG_setTimerCount(CAPTURE_0_INST, gLoadValue);  //  然后重新设置计数器的值为初始获取的gLoadValue = DL_TimerG_getLoadValue(CAPTURE_0_INST);的这个值，是65535
            break;
            
    }
}
```
![[2a90c27f1ed1fa4d69218da76bfc44f.jpg]]


```c
int main(void)
{
    while (1) {
        while (false == gCheckCaptures) {
            __WFE();
        }
        // 过了while循环了，执行下面的代码
        gCheckCaptures = false; // 现在捕获到值了，重置 gCheckCaptures 为 false， 下面准备分析

        /*
         * Calculate PWM period and PWM duty cycle. IMPORTANT: These calculation
         * assume timer is running in DOWN counting mode
         */
        pwmPeriod = gLoadValue - gCaptureCnt;
        pwmDuty   = ((gLoadValue - DL_TimerG_getCaptureCompareValue(
                                     CAPTURE_0_INST, DL_TIMER_CC_0_INDEX)) *
                      100) /
                  pwmPeriod;

        __BKPT(0);
    }
}
```
![[b9150a33d307114c1cb7a48abaa3283.jpg]]
```c
int main(void)
{
    while (1) {
        while (false == gCheckCaptures) {
            __WFE();
        }
    }
}

```
![[d9118089b8923a3160bde95d4dd4b86.jpg]]

```c
void CAPTURE_0_INST_IRQHandler(void)
{
    switch (DL_TimerG_getPendingInterrupt(CAPTURE_0_INST)) {
        case DL_TIMERG_IIDX_CC1_DN:
            if (gSynced == true) {
                gCaptureCnt = DL_TimerG_getCaptureCompareValue(
                    CAPTURE_0_INST, DL_TIMER_CC_1_INDEX);
                gCheckCaptures = true;
            } else {
                gSynced = true;  // 执行这一行
            }
            /* Manual reload is needed to workaround timer capture limitation */
            DL_TimerG_setTimerCount(CAPTURE_0_INST, gLoadValue);  //然后重新设置计数器的值为初始获取的gLoadValue = DL_TimerG_getLoadValue(CAPTURE_0_INST);的这个值，是65535
            break;
    }
}
```
![[31da0b407d9baa15d02efa325c130fc 1.jpg]]

```c
void CAPTURE_0_INST_IRQHandler(void)
{
    switch (DL_TimerG_getPendingInterrupt(CAPTURE_0_INST)) {
        case DL_TIMERG_IIDX_CC1_DN:
            if (gSynced == true) {
	            // 执行这一段
                gCaptureCnt = DL_TimerG_getCaptureCompareValue(
                    CAPTURE_0_INST, DL_TIMER_CC_1_INDEX);
                gCheckCaptures = true;
            } else {
                gSynced = true;  
            }
            /* Manual reload is needed to workaround timer capture limitation */
            DL_TimerG_setTimerCount(CAPTURE_0_INST, gLoadValue);  //  然后重新设置计数器的值为初始获取的gLoadValue = DL_TimerG_getLoadValue(CAPTURE_0_INST);的这个值，是65535
            break;
            
    }
}
```
![[6f08a51604dd4ed6555bfeb7a376cac 1.jpg]]

```c
int main(void)
{
    while (1) {
        while (false == gCheckCaptures) {
            __WFE();
        }
        // 过了while循环了，执行下面的代码
        gCheckCaptures = false; // 现在捕获到值了，重置 gCheckCaptures 为 false， 下面准备分析

        /*
         * Calculate PWM period and PWM duty cycle. IMPORTANT: These calculation
         * assume timer is running in DOWN counting mode
         */
        pwmPeriod = gLoadValue - gCaptureCnt;
        pwmDuty   = ((gLoadValue - DL_TimerG_getCaptureCompareValue(
                                     CAPTURE_0_INST, DL_TIMER_CC_0_INDEX)) *
                      100) /
                  pwmPeriod;

        __BKPT(0);
    }
}
```
![[4bf1b5fc35e69a4bf53035e19e7aa4f.jpg]]

```c
int main(void)
{
    while (1) {
        while (false == gCheckCaptures) {
            __WFE();
        }
    }
}

```
![[ee002f39ab6cd5c6c2069884fe04be7.jpg]]
## 输出比较模式与PWM
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

### 直切通过设置寄存器的值来修改PWM参数
#### 示例：直接写 Compare 寄存器

是的，确实“停—改—启”在高频更新场景下会带来明显的性能开销，具体原因有：

1. **DriverLib 调用内部开销大**  
    每次调用
    
    ```c
    DL_TimerG_stopCounter(PWM_0_INST);
    DL_TimerG_setCaptureCompareValue(...);
    DL_TimerG_startCounter(PWM_0_INST);
    ```
    
    实际上会执行多条寄存器读写和状态检测逻辑，DriverLib 函数内部通常还要检查参数合法性、等待定时器状态切换完成，这几次 API 调用加起来动辄上百个 CPU 周期（十几到几十微秒），占用了原本留给下一次中断的时间。
    
2. **频繁停止定时器会干扰定时器硬件状态机**  
    每次 stop → 改 CCR → start，都要让定时器从“停止”态恢复到“运行”态，中间寄存器同步、状态机切换也需要时间，可能导致下一个比较或溢出事件错过。
    
3. **ISR 时间窗被拉长，丢帧风险增大**  
    如果你的中断间隔只有 10 µs，一次“停—改—启”就占用了大半甚至整个间隔，CPU 来不及处理下一次中断请求，就会“漏掉”match 事件。
    

---

##### 示例

MSP 的 TimerG Compare 寄存器是内存映射的，只要把新的占空比写进对应 CCRx 寄存器，就能在下一个 PWM 周期自动生效，无需 stop/start。例如（寄存器名请对照手册或头文件）：

```c
// 假设 CGx_CMPADDR 已指向 PWM 通道的 Compare 寄存器地址
static volatile uint32_t* const CGx_CMPADDR = (uint32_t*)(TIMERG_BASE + OFFSET_CMP0);

void setDutyFast(uint16_t dutyCount)
{
    *CGx_CMPADDR = dutyCount;  // 一条存储指令，马上生效
}
```

ISR 中只需：

```c
void TIMER_0_INST_IRQHandler(void)
{
    DL_TimerA_clearInterruptFlag(TIMER_0_INST, DL_TIMER_IIDX_ZERO);
    setDutyFast(sine_table[sine_index++]);
    if (sine_index >= LUT_SIZE) sine_index = 0;
}
```

这样一次更新大概只需几条汇编指令（几百纳秒到微秒级），就能轻松跟上 100 kHz 以上的更新率，不会再“丢帧”。

---

**结论**：在几十 kHz 以上的中断更新频率下，DriverLib 的“停—改—启”方式开销太高，直接寄存器写入是更高效也更可靠的做法。

### 用内部比较器测频率


# ADC
## ADC的模式
### 单通道单次转换
+ sys：不勾选![[6ddc332de25898cc4bdc3e3711dfa94.jpg|375]]
+ 原理(enable)：虽然enable位再`SYSCFG_DL_init()`之后会默认置1，但是转换玩一此之后就会变为0。enable位要手动，用代码置1。start信号会自己触发自己，并不用自己设置
```image-layout-a
![[828fa34f21eb12dab66c5b7c625033a.jpg]]
![[7e3c06533b43b3847f0e7fcd5925035.jpg]]
```
+ 代码：
```c
int main(void)
{
    SYSCFG_DL_init();

    NVIC_EnableIRQ(ADC12_0_INST_INT_IRQN);
    gCheckADC = false;

    DL_ADC12_startConversion(ADC12_0_INST);

    while (1) {
        while (false == gCheckADC) {
            __WFE();
        }

        gAdcResult = DL_ADC12_getMemResult(ADC12_0_INST, DL_ADC12_MEM_IDX_0);

        if (gAdcResult > 0x7ff) {
            DL_GPIO_clearPins(GPIO_LEDS_PORT, GPIO_LEDS_USER_LED_1_PIN);
        } else {
            DL_GPIO_setPins(GPIO_LEDS_PORT, GPIO_LEDS_USER_LED_1_PIN);
        }
        gCheckADC = false;
        DL_ADC12_enableConversions(ADC12_0_INST); //需要手动设置enable位
    }
}

void ADC12_0_INST_IRQHandler(void)
{
    switch (DL_ADC12_getPendingInterrupt(ADC12_0_INST)) {
        case DL_ADC12_IDX_MEM0_RESULT_LOADED:
            gCheckADC = true;
            break;
        default:
            break;
    }
}
```
### 单通道连续转换
+ sys：不勾选![[6ddc332de25898cc4bdc3e3711dfa94.jpg|375]]
+ 原理(enable)：enable位要手动，用代码置1。start信号会自己触发自己，并不用自己设置
```image-layout-a
![[7e3c06533b43b3847f0e7fcd5925035.jpg]]
![[6833bdcf828929ff304cd1c0fd4b241.jpg]]
```
+ 代码：
```c
int main(void)
{
    SYSCFG_DL_init();

    NVIC_EnableIRQ(ADC12_0_INST_INT_IRQN);
    gCheckADC = false;

    DL_ADC12_startConversion(ADC12_0_INST);

    while (1) {
        while (false == gCheckADC) {
            __WFE();
        }

        gAdcResult = DL_ADC12_getMemResult(ADC12_0_INST, DL_ADC12_MEM_IDX_0);

        if (gAdcResult > 0x7ff) {
            DL_GPIO_clearPins(GPIO_LEDS_PORT, GPIO_LEDS_USER_LED_1_PIN);
        } else {
            DL_GPIO_setPins(GPIO_LEDS_PORT, GPIO_LEDS_USER_LED_1_PIN);
        }
        gCheckADC = false;
        //DL_ADC12_enableConversions(ADC12_0_INST); //不需要手动设置enable位
    }
}

void ADC12_0_INST_IRQHandler(void)
{
    switch (DL_ADC12_getPendingInterrupt(ADC12_0_INST)) {
        case DL_ADC12_IDX_MEM0_RESULT_LOADED:
            gCheckADC = true;
            break;
        default:
            break;
    }
}
```

# DMA
## DMA应用举例
### DMA+硬件更新PWM（解决C2训练问题）

最彻底的做法是不让 CPU 跑 ISR：

1. **把 100 点查表数组放在内存中**
    
2. 配置 TIMA0 的 compare event 触发一次 DMA 传输，把数组下一元素搬到 Compare 寄存器
    
3. DMA 循环（circular）模式，让它自动、无 CPU 干预地以 100 kHz 更新占空比
    
4. CPU 主循环只负责处理 DMA “算完一次完整波形” 的中断或触发分析
    

这样就能真正跑满 100 kHz 甚至更高，不再丢帧。

---


1. **用硬件 DMA 更新 PWM**  
    TI 的 Timer 模块大多数都支持 **DMA on compare**：直接把 100 点的占空比表放到内存里，配置好 DMA 由 TIMA0/TIMG 的 compare event 自动搬运到 CMPR 寄存器，CPU 根本不进 ISR，就能跑满 100 kHz，1000 Hz 正弦没问题。
    
2. **降低 ISR 负担**
    
    - 把中断服务例程能跑的计算全部移到主循环，ISR 只做最小化的寄存器写入；
        
    - 或者把表格预先计算好量化值，用更简单的指针+寄存器操作，避免在 ISR 里做乘除法、浮点运算。
        
3. **调整中断优先级**  
    让 TIMA0 的优先级最高，ADC/DMA 次之；或者把 ADC 采样也用 DMA 完全硬件触发，减少 CPU 干预。
    
4. **提升时钟/优化编译**  
    如果你的主频还有上升空间（比如把系统时钟从 24 MHz 提到 48 MHz），或者把编译器优化级别调到 `-O3`，也能跑得更快一些，但毕竟 CPU 能力是有限的。

## 遇到的问题

# iic
## iic驱动屏幕
+ 注意：==关闭编译器优化，设置值为0==![[Pasted image 20250701183216.png]]
# 中断
## 执行中断的流

具体流程和stm32差不多[[stm32基础#执行中断的流程]]

## 写中断回调函数的操作

+ 中断回调函数是可以定义在任何一个用户文件里的

1. 在`\Debug\ti_msp_dl_config.h`问建立找中断回调函数的定义
![[Pasted image 20250429113659.png]]
2. 然后再用户文件中自己写
`calculation.c`
```c
/**
 * @brief 在中断回调函数里面分析计算
 */

void ADC12_0_INST_IRQHandler(void) {
    switch (DL_ADC12_getPendingInterrupt(ADC12_0_INST)) {
    case DL_ADC12_IIDX_DMA_DONE: {
        // 停—改—启”成本过高，直接调用 DriverLib 的 setLoadValue/setCompareValue，效果上就是“本周期按旧配置跑，下一周期用新配置跑
        // 1. 停止所有定时器
        DL_TimerA_stopCounter(TIMER_1_INST);   //关闭采样定时器
        //DL_TimerA_stopCounter(TIMER_0_INST);
        //DL_TimerG_stopCounter(PWM_0_INST);

        //调试
        if(current_freq >= 990){
            __BKPT();
        }

        // 2. 单次计算频率-幅值对 并 改变SPWM正弦波的频率
        processOneFrequencyPoint();  

        // 3.如果计算完成，就把结果发送到串口
        // 这里写串口发送函数

        // 停—改—启”成本过高，直接调用 DriverLib 的 setLoadValue/setCompareValue，效果上就是“本周期按旧配置跑，下一周期用新配置跑
        // 4. 如果是连续采集模式并且没采集完成，就重启所有定时器
        if((countinuous_mode !=0) && (flag == 0)){
            //DL_TimerG_startCounter(PWM_0_INST);  //启动TIMG0输出PWM波
            //DL_TimerA_startCounter(TIMER_0_INST);  //重启控制PWM的定时器
            DL_TimerA_startCounter(TIMER_1_INST);  //重启采样定时器
        }
        break;
    }
    default:
        break;
    }
}
```
# 烧录&脱离运行
## 烧录工具&调试工具
### 现在用到的芯片的调试器和调试接口

| 芯片型号       | 官方推荐调试器   | 第三方支持调试器                                   | 调试接口         |
| ---------- | --------- | ------------------------------------------ | ------------ |
| STM32      | ST - LINK | J - LINK、OpenOCD 等支持大部分型号                  | JTAG、SWD     |
| MSPM0G3507 | XDS110    | J - LINK 需查看 SEGGER 官方支持情况，一般不支持 ST - LINK | TI - ICD、SWD |
#### ST - LINK

ST - LINK 是意法半导体为其 STM32 系列微控制器推出的官方调试工具，它支持 SWD 和 JTAG 两种接口：

  

- **JTAG 接口**：JTAG 接口在早期的 STM32 开发中较为常用，它提供了一种较为全面的调试手段，能够对芯片内部的多个模块进行测试和调试。ST - LINK 可以通过 JTAG 接口与 STM32 芯片连接，实现程序的下载和调试功能。不过，JTAG 接口需要较多的引脚，在一些引脚资源紧张的应用场景中可能不太方便。
- **SWD 接口**：SWD（Serial Wire Debug）是 ARM 推出的一种简化的调试接口，它只需要两根信号线（SWCLK 和 SWDIO），相比于 JTAG 接口，占用的引脚资源更少。ST - LINK 同样支持通过 SWD 接口与 STM32 芯片进行通信，在实际开发中，由于其引脚占用少的优势，SWD 接口的使用越来越广泛。

#### XDS110

XDS110 是德州仪器（TI）推出的一款调试器，主要用于 TI 的微控制器和处理器产品。对于 XDS110 的接口支持情况，需要分不同芯片系列来看：

  

- **对部分支持 JTAG 和 SWD 的芯片**：一些 TI 的 Cortex - M 内核的微控制器同时支持 JTAG 和 SWD 接口，XDS110 能够支持通过这两种接口与这些芯片进行通信，实现程序烧录和调试功能。
- **对仅支持特定接口的芯片**：TI 还有很多其他架构的芯片，有些可能只支持特定的调试接口，例如 TI 的一些芯片采用了自己的调试协议和接口标准，XDS110 会按照芯片的要求使用相应的接口进行调试，而不一定同时支持 JTAG 和 SWD。
### 浅浅介绍一下J-LINK和JTAG
#### J - LINK

J - LINK 是 SEGGER 公司生产的一种专业的调试器，在嵌入式开发领域应用广泛，下面从它的特点、使用场景等方面进行介绍：

  

- **特点**
    - **通用性强**：支持众多基于 ARM Cortex 内核的微控制器，像 STM32、NXP 的 Kinetis 系列等。同时，它也能兼容部分其他架构的芯片。
    - **调试功能丰富**：支持单步执行、断点设置、内存查看和修改等常规调试功能，还能进行实时追踪和分析，方便开发者深入了解程序的运行状态。
    - **性能稳定**：采用了高质量的硬件设计和优化的通信协议，能够保证稳定的调试连接，减少调试过程中的出错概率。
- **使用场景**
    - **程序烧录**：可以将编译好的程序代码下载到目标芯片的闪存中。
    - **程序调试**：配合 Keil、IAR 等开发工具，对程序进行调试，查找和解决代码中的问题。

#### JTAG

JTAG（Joint Test Action Group）是一种国际标准测试协议，主要用于芯片内部测试及对系统进行调试、编程等。以下从其原理、应用场景等方面展开介绍：

  

- **原理**
    - JTAG 定义了一个四线（TMS、TCK、TDI、TDO）或五线（增加了 TRST）的接口标准。通过这些接口，测试设备可以向芯片内部的测试逻辑电路发送指令和数据，实现对芯片内部寄存器和存储器的访问。
    - 芯片内部集成了 JTAG 接口和相应的测试逻辑，使得外部设备可以通过 JTAG 接口对芯片进行各种测试和调试操作。
- **应用场景**
    - **芯片测试**：在芯片生产过程中，利用 JTAG 接口对芯片内部的电路进行测试，检测芯片是否存在制造缺陷。
    - **程序调试和烧录**：在开发过程中，开发者可以通过 JTAG 接口对芯片进行程序调试和烧录。例如，使用 JTAG 调试器连接到目标芯片的 JTAG 接口，就可以对芯片上运行的程序进行单步执行、设置断点等操作。

  

在实际开发中，J - LINK 调试器通常会支持 JTAG 接口，同时也支持 SWD（Serial Wire Debug）等其他调试接口，开发者可以根据具体需求选择合适的调试方式。
### 没整理的概念

#### DAPLink

- **简介**：DAPLink 是一个开源固件项目。它运行在一个次要 MCU 上，该 MCU 连接到目标 Arm Cortex MCU 的 SWD 或 JTAG 接口，通过 USB 接口与电脑连接，充当开发电脑和目标 MCU 调试端口之间的桥梁。
- **功能**：支持拖放式编程，将程序文件拖放到 DAPLink 的虚拟磁盘中即可完成烧录。提供虚拟串口功能，用于日志输出、跟踪调试以及终端仿真。支持多种 CMSIS-DAP 协议版本，兼容 Keil MDK、IAR Embedded Workbench 等主流 IDE 和调试工具。
- **硬件兼容性**：能运行在各种基于 Arm 微控制器的硬件接口电路上，如 Maxim Integrated MAX32625PICO、Nuvoton Nu - Link2 - Me 等。

#### J - Link

- **简介**：J - Link 是 SEGGER 公司为支持仿真 ARM 内核芯片推出的 JTAG 仿真器。
- **功能**：配合 IAR EWARM、ADS、Keil 等集成开发环境，支持所有 ARM7/ARM9/ARM11、Cortex - M0/M1/M3/M4、Cortex - A5/A8/A9 等内核芯片的仿真。与编译环境无缝连接，操作方便。具有自动速度识别功能，能监测所有 JTAG 信号和目标板电压。支持多 JTAG 器件串行连接，带 J - Link TCP/IP server，允许通过 TCP/IP 网络使用 J - Link。
- **性能参数**：电源由 USB 供电，整机电流小于 50mA，支持的目标板电压为 1.2V 至 3.3V，5V 兼容，目标板供电电压 4.5V 至 5V，供电电流最大 300mA，具有过流保护功能。工作环境温度为 + 5℃至 + 60℃，存储温度为 - 20℃至 + 65℃，湿度小于 90%。

#### SWD

- **简介**：SWD（Serial Wire Debug）是一种用于调试微控制器等设备的串行调试接口协议。它是 ARM 公司推出的一种调试接口标准，被广泛应用于基于 ARM 内核的微控制器以及其他一些支持 SWD 接口的芯片中。
- **特点**：相比传统的 JTAG 接口，SWD 具有引脚少、布线简单的优点，一般只需要两根线（SWDIO 和 SWCLK）就可以实现调试功能，这对于电路板空间有限的设计非常有利。同时，SWD 的调试速度也较快，能够满足大多数开发场景下的调试需求。
- **应用**：在开发过程中，开发工具通过 SWD 接口与目标芯片连接，实现对芯片内部寄存器、内存的读写操作，以及控制芯片的运行、停止、单步执行等调试功能。无论是在芯片的生产测试环节，还是在产品的研发调试阶段，SWD 都发挥着重要的作用。
## 一些概念
### boot键
在TI的MSPM0G3507开发板中，Boot键与引导加载（Boot）过程相关。以下是其具体解释： - **Boot的含义**：Boot即引导加载，是指微控制器或其他设备在通电或复位后，从特定的存储位置（如内部闪存、外部闪存等）读取并执行初始化代码，以启动整个系统运行的过程。这个过程包括初始化硬件设备、配置系统参数、加载操作系统（如果有）或应用程序等，使设备能够进入正常的工作状态。 - **Boot键的作用**：通常情况下，按下Boot键并结合开发板的复位操作（如上电复位或手动复位），可以让开发板进入特定的引导加载模式。在这种模式下，开发板可能会执行一些特殊的操作，比如通过特定的通信接口（如USB、UART等）接收并加载新的程序代码到内存或闪存中，实现程序的更新或升级。此外，Boot键也可能用于选择不同的启动源，例如从内部闪存启动还是从外部存储设备启动，或者进入特定的调试模式等。具体的功能取决于开发板的设计和相关的软件配置。
### BSL模式
BSL是TI在MSP430以及MSPM0系列芯片出厂时预先固化到MCU内部的一段代码。其英文全称为Boot Strap Loader，即引导加载程序。以下是对它的详细介绍： - **功能特点**：BSL只能用于对MCU内部的FLASH访问，不能对其他资源访问，所以只能用作编程器接口。它通过UART协议与编程器连接通信，编程器可以发送不同的通信命令来对MCU的存储器做不同的操作，如擦除、写入程序代码等。 - **启动方式**：一般MSP430或MSPM0芯片复位启动时PC指针指向FFFE复位向量，但通过特殊的启动方式可以使MCU在启动时让PC指向BSL内部固化的程序。这种特殊的启动方式一般是由RST引脚与TEST（或TCK）引脚做一个稍复杂的启动逻辑后产生。对于MSPM0G3507，通常是将板子上的PA18引脚与3V3进行连接（如果板子自带PA18的按键，长按住按键即可保持PA18为高电平），然后在上电或复位时，让芯片进入BSL模式。 给MSPM0G3507上传程序的BSL烧录工具是用于通过BSL接口对MSPM0G3507芯片进行程序烧录的软件工具。常见的有以下两种： - **MSPM0_BSL_GUI**：可以独立运行，在不依赖于MSPM0 SDK包单独运行该工具时，需要手动按住开发板上的boot按键（对于LP - MSPM0G3507，boot按键为LaunchPad上的S1即PA18按键）上电或者按住boot按键之后再按键复位，使单片机进入BSL烧录状态。如果安装了MSPM0 SDK软件包，在其路径下运行MSPM0_BSL_GUI.exe时，若采用launchpad自带的xds110下载器进行BSL烧录，则可以无需手动按boot按键实现烧录。 - **UniFlash**：TI官方提供的一款多功能烧录工具，也支持对MSPM0系列芯片进行BSL烧录。使用UniFlash进行串口BSL烧录时，不依赖于XDS110上的串口，直接使用常规的USB转TTL模块就可以实现。操作时，先选择对应芯片型号及下载方式为“serial”，然后按住开发板上的boot按键，再按下开发板的RST复位按键，使得单片机进入BSL下载状态，最后点击“Load Image”按键即可完成程序的烧录。
c+ 进入BSL模式的方法
	1. 按住PA18boot键不松开同时上电
	2. 不插拔电源，按住PA18boot键同时按下reset键

### XDS110
XDS110是德州仪器（TI）推出的一款调试探针，全称为TMDSEMU110-U。以下是其详细介绍： - **接口与通信**： - **主机探测通信**：支持USB 2.0设备与HS USB PHY，通过USB通信设备类协议实现UART支持，还通过标准USB批量IN和OUT端点支持TI自定义协议。 - **探测目标通信**：支持IEEE 1149.1 JTAG、IEEE 1149.7 cJTAG、ARM串行线调试（SWD）、ARM串行线输出（SWO），具备发送和接收UART与RS - 232C信令（无硬件握手）功能。 - **调试接口**： - **20针调试接口**：包含5针1149.1 JTAG连接（包括TRSTn）、2针1149.1 cJTAG连接、2针ARM SWD连接、1针SWO叠加在JTAG TDO上，以及目标系统复位、目标电压检测、目标断开检测和4个用于GPIO的EMU信号。 - **14针辅助调试接口**：具有探针或目标的UART功能、探头供电的目标电源（可监测ET）、目标电源输入（监测ET后可循环到目标）以及4个GPIO信号。 - **面盖上30针扩展接口**：提供GPIO、UART、I2C、SSI、CAN、ADC（参考2.5V）、时基输入等接口，工作电压为3.3V，也提供5V电源用于更高电压需求。 - **功能特性**： - **调试连接**：设置与TI其他调试探针类似，可用于调试1.8V到3.6V IO电平的目标，也可为目标供电，电流限制在~400mA。在Code Composer Studio中使用时，需安装CCSv7.0或更高版本。 - **辅助目标控制**：探头和目标间的额外接口映射到CTI - 20和AUX电缆上的GPIO信号，可通过dbgjtag实用程序设置其状态，典型用例是驱动GPIO输入到目标以控制启动模式。 - **SWO追踪捕获**：支持ARM SWO跟踪TI的单核MCU和WCS设备，当通过2引脚协议支持调试通信时，目标可重用TDO引脚用于SWO跟踪输出，目前SWO数据从目标到主机的传输只支持UART格式。 - **能量追踪**：有机载电路可测量目标的能源消耗，提供高精度能耗和低带宽电流、功率分布，能量分析范围为1µA到100mA电流输出，适用于表征能量消耗，不适用于捕获短电流峰值。 XDS110是一款功能强大的调试工具，广泛应用于TI芯片的开发和调试过程中，帮助开发人员更方便地进行程序调试、硬件测试和性能分析等工作。


## 脱离运行
+ 对于MSPM0G3507，用CCS调试时烧录代码就已经可以脱离运行了。只要外加5v电源就可以了。==根本就不用下载什么软件==
# 解决ti板子的内存问题

## 报错内容
```
[17]makefile:143: recipe for target 'cmsis_dsp_fft_q15_LP_MSPM0G3507_nortos_ticlang.out' failed [18]"./device_linker.cmd", line 62: error #10099-D: program will not fit into available memory, or the section contains a call site that requires a trampoline that can't be generated for this section, or the section contains padded functions. run placement with alignment fails for section ".bss" size 0xe0bc. Available memory ranges: [19] SRAM size: 0x8000 unused: 0x7d97 max hole: 0x7d97 [20]error #10010: errors encountered during linking; "cmsis_dsp_fft_q15_LP_MSPM0G3507_nortos_ticlang.out" not built [21]tiarmclang: error: tiarmlnk command failed with exit code 1 (use -v to see invocation) [22]gmake[1]: *** [cmsis_dsp_fft_q15_LP_MSPM0G3507_nortos_ticlang.out] Error 1 [23]makefile:139: recipe for target 'all' failed [24]gmake: *** [all] Error 2 [25]**** Build Finished ****
```

```
[5]makefile:143: recipe for target 'cmsis_dsp_fft_q15_LP_MSPM0G3507_nortos_ticlang.out' failed
[6]"./device_linker.cmd", line 62: error #10099-D: program will not fit into available memory, or the section contains a call site that requires a trampoline that can't be generated for this section, or the section contains padded functions. run placement with alignment fails for section ".bss" size 0xe0bc.  Available memory ranges:
[7]   SRAM         size: 0x8000       unused: 0x7d97       max hole: 0x7d97    
[8]error #10010: errors encountered during linking; "cmsis_dsp_fft_q15_LP_MSPM0G3507_nortos_ticlang.out" not built
[9]tiarmclang: error: tiarmlnk command failed with exit code 1 (use -v to see invocation)
[10]gmake[1]: *** [cmsis_dsp_fft_q15_LP_MSPM0G3507_nortos_ticlang.out] Error 1
[11]makefile:139: recipe for target 'all' failed
[12]gmake: *** [all] Error 2
[13]**** Build Finished 
```

#### 这一段报错信息
```
makefile:143: recipe for target 'cmsis_dsp_fft_q15_LP_MSPM0G3507_nortos_ticlang.out' failed
```
- **`makefile`**：指的是 `make` 工具所使用的构建脚本文件，也就是 `Makefile`。`Makefile` 里定义了项目的构建规则，包含了如何编译源文件、链接目标文件等步骤。
- **`143`**：表示 `Makefile` 文件中的行号。错误出现在这个文件的第 143 行。你可以打开 `Makefile` 文件，查看第 143 行的具体内容，一般此处会定义生成目标文件 `cmsis_dsp_fft_q15_LP_MSPM0G3507_nortos_ticlang.out` 的规则。
- **`recipe for target 'cmsis_dsp_fft_q15_LP_MSPM0G3507_nortos_ticlang.out' failed`**：意思是生成目标文件 `cmsis_dsp_fft_q15_LP_MSPM0G3507_nortos_ticlang.out` 的规则执行失败。目标文件一般是构建的最终产物，例如可执行文件或者库文件。在此例中，`cmsis_dsp_fft_q15_LP_MSPM0G3507_nortos_ticlang.out` 可能是一个可执行文件。

```
[6]"./device_linker.cmd", line 62: error #10099-D: program will not fit into available memory, or the section contains a call site that requires a trampoline that can't be generated for this section, or the section contains padded functions. run placement with alignment fails for section ".bss" size 0xe0bc.  Available memory ranges:
[7]   SRAM         size: 0x8000       unused: 0x7d97       max hole: 0x7d97    
```

#### 报错位置信息


```plaintext
"./device_linker.cmd", line 62
```

  

这指出错误发生在`./device_linker.cmd`文件的第 62 行。`device_linker.cmd`通常是链接器脚本文件，它负责定义程序各个段（如代码段、数据段等）在内存中的布局。你需要打开这个文件，查看第 62 行的内容，这里可能定义了某个段的内存分配规则。

#### 错误代码及描述


```plaintext
error #10099-D: program will not fit into available memory, or the section contains a call site that requires a trampoline that can't be generated for this section, or the section contains padded functions.
```

  

- **`program will not fit into available memory`**：说明程序整体需要的内存超过了可用内存。这可能是因为程序代码、数据量过大，或者内存分配不合理。
- **`the section contains a call site that requires a trampoline that can't be generated for this section`**：在某些架构中，当函数调用的目标地址超出了直接跳转的范围时，需要使用 “蹦床（trampoline）” 来实现间接跳转。如果由于某些原因无法为某个段生成蹦床代码，就会导致这个错误。
- **`the section contains padded functions`**：编译器有时会在函数之间插入填充字节（padding），以满足对齐要求或其他优化目的。如果某个段包含了过多填充的函数，可能会导致该段的大小超出预期，从而无法放置到可用内存中。

####  `.bss`段内存放置失败信息

plaintext

```plaintext
run placement with alignment fails for section ".bss" size 0xe0bc.
```

  

- **`.bss`段**：`.bss`（Block Started by Symbol）段用于存储未初始化的全局变量和静态变量。在程序加载时，系统会自动将这个段清零。
- **`run placement with alignment fails`**：表示在尝试将`.bss`段放置到内存中时，由于对齐要求无法满足而失败。内存对齐是为了提高内存访问效率，许多硬件平台要求数据在特定的地址边界上对齐。
- **`size 0xe0bc`**：指出`.bss`段的大小为`0xe0bc`（十进制为 57532）字节。

#### 可用内存范围信息

plaintext

```plaintext
SRAM         size: 0x8000       unused: 0x7d97       max hole: 0x7d97
```

  


- **`SRAM`**：表示静态随机存取存储器（Static Random Access Memory），这是一种用于存储程序和数据的内存类型。
- **`size: 0x8000`**：说明 SRAM 的总大小为`0x8000`（十进制为 32768）字节。
- **`unused: 0x7d97`**：表示当前 SRAM 中未使用的内存大小为`0x7d97`（十进制为 32151）字节。
- **`max hole: 0x7d97`**：表示 SRAM 中最大的连续空闲内存块大小为`0x7d97`字节。

见鬼，为什么uint16_t占用4096个字节。。。不应该是2*4096个字节码![[Pasted image 20250409162316.png]]

## 解决方法
+ 全局变量数组不要定太大，1024和512就很足够了！用不着2048和4096.


# CCS开发工具使用
## 建立模板工程
+ 因为TI可以直接import project，所以不用新建立模板工程

## 复制工程
把一个工程复制到另一个工程
1. 先新建空文件夹![[Pasted image 20250718101054.png]]
2. 再ccs里面打开这个文件夹，然后Import `"D:\ti\mspm0_sdk_2_04_00_06\examples\nortos\LP_MSPM0G3507\cmsis_dsp\cmsis_dsp_empty"`
3. 再复制原来搞好的工程的.syscfg到新工程文件夹里替换![[Pasted image 20250718101316.png]]
4. 再复制要的文件夹，如calculation.c，ad9910.c
# 锁板的解决方法
## 参考教程
https://www.bilibili.com/video/BV1AKTVzGEzm/?spm_id_from=333.337.search-card.all.click&vd_source=839d5c5e0b9a9045916d57924fb464ca

## 识别是上半部分出问题还是下半部分出问题
### 上半部分调试器出现问题
+ 现象：![[Pasted image 20250719143612.png]]
### 下半部分m0芯片出现问题

最底层烧录接口BSL，JTAG和SWD都不能用了
	
## 方法

（1）不用退出CCS，先强制进入BSL模式，然后在CCS里面直接debug
（2）再不行，就先直接用BSL_GUI上传.txt文件，然后再回到CCS里面烧录
（3）再不行，就先强制进入BSL模式，再用BSL_GUI上传.txt文件，然后再回到CCS里面烧录

+ 强制进入BSL模式方法：[[TI learning#BSL模式]]
	1. 按住PA18boot键不松开同时上电
	2. 不插拔电源，按住PA18boot键同时按下reset键
