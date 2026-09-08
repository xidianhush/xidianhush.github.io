
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


## 怎么查看函数内的局部变量

但是将这些变量改为函数内局部变量，在调试时把这些变量加入watch，却一直显示not available。那这么说，将这些变量改为函数内局部变量不会使得调试很不方便吗？7

你遇到的调试问题确实存在，这与调试器的工作原理和变量存储方式有关。以下是详细解释和解决方案：

### 一、局部变量调试不可用的原因

1. **调试信息丢失**  
    如果编译器开启了优化（如`-O2`），可能会优化掉未使用的局部变量，导致调试器无法访问。
    
2. **函数调用栈状态**  
    当函数执行完毕返回后，局部变量的内存已被释放，此时调试器无法读取其值。
    
3. **断点位置问题**  
    如果断点设在变量作用域之外（如函数返回后），调试器无法显示局部变量。
    

### 二、解决方案

#### 1. **调试版本关闭优化**

在调试版本中，通过编译选项关闭优化（如 GCC 的`-O0`）：

  

makefile

```makefile
CFLAGS_DEBUG = -g -O0  # 调试版本：生成调试信息并关闭优化
CFLAGS_RELEASE = -O2  # 发布版本：开启优化
```

#### 2. **使用调试专用变量**

在函数内部添加`volatile`修饰的调试副本：

  

c

运行

```c
float calculate_precise_frequency(float* fft_output, int maxIndex, float sample_rate) {
    if (maxIndex <= 0 || maxIndex >= FFT_SIZE - 1) 
        return (float)maxIndex * sample_rate / FFT_SIZE;

    float y0 = fft_output[maxIndex - 1];
    float y1 = fft_output[maxIndex];
    float y2 = fft_output[maxIndex + 1];
    
    float delta = 0.5f * (y0 - y2) / (y0 - 2*y1 + y2);
    float result_index = (maxIndex + delta) * (sample_rate / FFT_SIZE);
    
    // 调试专用变量（不会被优化）
    #ifdef DEBUG
    volatile float debug_delta = delta;
    volatile float debug_result = result_index;
    #endif
    
    return result_index;
}
```

  

在调试时监视`debug_delta`和`debug_result`。

#### 3. **使用调试钩子函数**

在关键位置添加调试回调函数：

  

c

运行

```c
// 调试钩子函数（在debug.c中实现）
extern void debug_hook(const char* name, float value);

float calculate_precise_frequency(float* fft_output, int maxIndex, float sample_rate) {
    // ...原有代码...
    
    float delta = 0.5f * (y0 - y2) / (y0 - 2*y1 + y2);
    float result_index = (maxIndex + delta) * (sample_rate / FFT_SIZE);
    
    #ifdef DEBUG
    debug_hook("delta", delta);
    debug_hook("result_index", result_index);
    #endif
    
    return result_index;
}
```

#### 4. **条件断点与单步执行**

- 在变量赋值后立即设置断点
- 使用单步执行（Step Into）跟踪变量变化
- 在函数返回前设置断点，此时局部变量仍有效

### 三、全局变量 vs 局部变量的调试对比

|特性|全局变量|局部变量|
|---|---|---|
|随时可见性|✅ 程序运行期间始终可见|❌ 仅函数执行时可见|
|调试复杂度|低（无需关注函数状态）|高（需在正确时机观察）|
|多线程安全性|❌ 存在竞态条件风险|✅ 线程安全|
|代码可维护性|❌ 增加耦合度|✅ 高内聚低耦合|
|性能|间接访问（全局符号查找）|直接访问（寄存器 / 栈变量）|

### 四、嵌入式系统调试建议

1. **使用硬件调试器**  
    MSPM0G3507 支持 JTAG/SWD 调试，通过硬件调试器（如 TI XDS110）可实时查看内存状态。
    
2. **打印调试信息**  
    通过 UART 输出关键变量值：
    
    c
    
    运行
    
    ```c
    #ifdef DEBUG
    void debug_printf(const char* format, ...);
    #define DBG_PRINT(...) debug_printf(__VA_ARGS__)
    #else
    #define DBG_PRINT(...)
    #endif
    
    // 使用示例
    DBG_PRINT("delta=%.4f, result=%.4f\n", delta, result_index);
    ```
    
      
    
3. **保留调试版本**  
    在生产固件中保留调试接口（通过密码或特定操作激活），以便现场排查问题。
    

### 五、最佳实践

1. **开发阶段**：使用局部变量 + 调试专用副本 + 关闭优化
2. **调试技巧**：结合断点、单步执行和内存查看
3. **发布阶段**：移除调试代码，开启优化



### 待整理的`#ifdebug`
这段代码是嵌入式开发中常用的调试技巧，用于确保关键变量在调试过程中可见。以下是详细解释：

### 一、代码功能解析

c

运行

```c
#ifdef DEBUG
volatile float debug_delta = delta;
volatile float debug_result = result_index;
#endif
```

  

![](data:image/png;base64,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)

  

1. **`#ifdef DEBUG`**
    
    - 条件编译指令，仅当定义了`DEBUG`宏时才会编译这段代码
    - 发布版本中不定义`DEBUG`，这些变量会被完全移除
2. **`volatile`关键字**
    
    - 告诉编译器 "这个变量可能被意外修改"
    - 禁用编译器优化（如寄存器缓存、常量折叠）
    - 确保每次访问都直接读写内存地址
3. **变量复制**
    
    - 将计算结果`delta`和`result_index`复制到专用调试变量
    - 避免原始变量被后续代码覆盖

### 二、为什么需要这样做？

#### 1. **编译器优化导致变量丢失**

在优化模式下（如`-O2`），编译器可能：

  

- 将变量存储在寄存器中而不是内存
- 删除未使用的临时变量
- 内联或重排代码顺序

  

例如，优化后的代码可能直接计算并返回结果，不保留中间变量：

  

assembly

```assembly
; 优化后的汇编代码示例
fld     [eax+ecx*4]      ; 加载y0
fld     [eax+edx*4]      ; 加载y2
fsubr                   ; y0 - y2
; ...省略其他指令...
fstp    [ebp-0Ch]        ; 直接存储结果到返回值位置
```

#### 2. **调试器依赖内存访问**

调试器通过读取内存地址来显示变量值：

  

- 如果变量被优化到寄存器，调试器无法访问
- 如果内存被后续操作覆盖，调试器看到的是脏数据

### 三、`volatile`的作用

`volatile`强制编译器：

  

1. 每次访问都从内存读取
2. 不重排对该变量的读写顺序
3. 不删除看似无用的读写操作

  

例如：

  

c

运行

```c
volatile int x = 10;
x = 20;     // 即使这行看似多余，编译器也会生成对应的机器码
```

### 四、调试与发布版本的区别

#### 调试版本（定义`DEBUG`）

c

运行

```c
float calculate_precise_frequency(...) {
    // ...计算代码...
    float delta = ...;
    float result_index = ...;
    
    // 生成以下代码
    volatile float debug_delta = delta;
    volatile float debug_result = result_index;
    
    return result_index;
}
```

#### 发布版本（未定义`DEBUG`）

c

运行

```c
float calculate_precise_frequency(...) {
    // ...计算代码...
    float delta = ...;
    float result_index = ...;
    
    // 无调试代码
    return result_index;
}
```

### 五、其他调试技巧对比

|方法|优点|缺点|
|---|---|---|
|全局变量|随时可见|破坏封装，线程不安全|
|调试专用变量|仅调试版本存在|增加代码量|
|UART 打印|无需调试器|影响时序，需硬件支持|
|硬件断点|精确控制|断点数量有限|

### 六、实际调试效果

在调试器中：

  

1. 可以直接监视`debug_delta`和`debug_result`变量
2. 即使函数执行完毕，这些变量的值也会保留
3. 适用于断点调试、波形分析（如使用 TI CCS 的 Data Visualizer）

  

例如，在 TI Code Composer Studio 中：  

![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27400%27%20height=%27256%27/%3e)![image](https://i.imgur.com/aBcDeFg.png)

  
（注：实际调试时需确保：

  

- 编译选项包含`-g -O0`
- 断点设在变量赋值之后
- 调试器连接正常）

### 七、使用建议

1. **仅在调试版本中使用**  
    发布版本移除调试代码，避免性能开销
    
2. **变量命名规范**  
    使用`debug_`前缀明确标识调试专用变量
    
3. **结合其他调试手段**
    
    - 关键位置添加 UART 打印
    - 使用硬件断点验证逻辑
    - 对实时系统使用 Trace 工具（如 ETM/SWO）

  

这种方法在嵌入式开发中非常实用，既保证了代码质量，又解决了调试可见性问题。
  
# 其它
1. vscode的ai助手的codebase是啥意思：Codebase 是一个项目或软件系统中所有源代码文件的集合，它包含了用于构建、运行和维护该软件所需的全部代码，以及相关的配置文件、脚本等。
2. vscode的高亮代表不同含义，比如在下面的图中深蓝色代表关键字，浅蓝色代表属性，黄色代表某函数，绿色代表某类型![[Pasted image 20250204101134.png]]
3. 在某处出现红线，可能在这之前就出现了错误（例如在borderradius前就忘加‘，’了）![[Pasted image 20250205150935.png]]

# 奇怪的小问题
## 账户图标消失了
+ 解决方法：[VScode 左下角账户图标消失了，怎么办？_vscode资源管理器图标消失-CSDN博客](https://blog.csdn.net/nie_020920/article/details/130251715)
## 插件消失
![[Pasted image 20250719172845.png]]