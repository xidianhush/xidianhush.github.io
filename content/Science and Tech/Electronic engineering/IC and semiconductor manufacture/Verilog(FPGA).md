sddff

# 卸载vivado
+ 链接：[WIN10卸载 vivado_vivado卸载-CSDN博客](https://blog.csdn.net/m0_61281991/article/details/138530246)


## wire和reg
这是一个非常关键的问题，理解 **`wire` 和 `reg` 的区别**，是掌握 Verilog 建模的基础。

我们来系统地对比，并辅以示例来帮助你理解。

---

## 🔍 一、`wire` 与 `reg` 的核心区别

|项目|`wire`|`reg`|
|---|---|---|
|全称|wire（导线）|register（寄存器，不完全准确）|
|是否能存值|❌ 不能保存值|✅ 能在时钟/过程赋值中存值|
|赋值方式|`assign` 语句（连续赋值）|在 `always` 块中赋值|
|是否必须驱动|✅ 必须有驱动源|✅ 必须在 `always` 块中赋值|
|使用场合|组合逻辑信号线（如连接模块）|时序逻辑（如寄存器）、状态保持|

---

## 🧪 二、具体示例对比

### 示例 1：用 `wire` 和 `assign` 表达组合逻辑

```verilog
module comb_logic (
    input wire a,
    input wire b,
    output wire y
);

assign y = a & b;

endmodule
```

> 这里的 `y` 是 `wire` 类型，适合用 `assign` 表达简单组合逻辑。

---

### 示例 2：用 `reg` 和 `always` 表达时序逻辑（寄存器）

```verilog
module seq_logic (
    input wire clk,
    input wire d,
    output reg q
);

always @(posedge clk) begin
    q <= d;
end

endmodule
```

> 这里的 `q` 是 `reg` 类型，在 `always` 块中赋值，它能在时钟上升沿**保持值**，适合描述 **寄存器、状态机、时序逻辑**。

---

### 示例 3：组合逻辑也可以用 `reg`（注意场景）

```verilog
module comb_with_always (
    input wire a,
    input wire b,
    output reg y
);

always @(*) begin
    y = a & b;
end

endmodule
```

> 虽然是组合逻辑，但因为用了 `always` 块，所以输出 `y` 必须是 `reg` 类型（尽管它其实不是“寄存器”）。

---

## 🎯 三、总结口诀

|类比|意义|
|---|---|
|`wire` 像“导线”|用于“实时传输信号”，本身不存储任何值|
|`reg` 像“变量”|可以在 `always` 块中存储中间值或时序值|

---

## ⚠️ 常见误区

- `reg` **不等于** 寄存器！它只是 Verilog 语法中 **能被过程赋值的变量**，最终是否合成为“寄存器”取决于你如何使用它（比如是否用时钟触发）。
    
- `wire` 不能写在 `always` 块中赋值，编译会报错。
    

---

## 🚀 实际建议

- **组合逻辑**：简单用 `assign` + `wire`；复杂用 `always @(*)` + `reg`
    
- **时序逻辑（寄存器/状态机）**：用 `always @(posedge clk)` + `reg`
    

---

如果你愿意，我可以给你出几道小题练一练，帮你更快掌握这些概念。要不要试试看？


## assign和always

当然可以！`assign`语句和 `always` 语句是 Verilog 中两种不同的建模方式，分别对应 **连续赋值（combinational logic）** 和 **过程赋值（procedural logic）**，它们在用法、语义、和合成电路中代表的含义都有显著区别。

---

### 一、`assign`语句（连续赋值）

#### 特点：

- 用于连续地给 **wire 类型** 信号赋值。
    
- 表达 **组合逻辑**。
    
- 每当右边的操作数变化时，左边的值自动更新。
    

#### 示例 1：用 `assign` 实现 2:1 多路选择器

```verilog
module mux_assign (
    input wire a,
    input wire b,
    input wire sel,
    output wire y
);

assign y = sel ? b : a;

endmodule
```

##### 解释：

- `y` 总是等于 `sel ? b : a`，这是一种**并行逻辑**建模方式。
    
- 没有时序逻辑，只要输入有变动，输出立即更新。
    

---

### 二、`always`语句（过程赋值）

#### 特点：

- 用于对 **reg 类型** 的变量赋值。
    
- 根据 `always` 后的敏感列表来触发执行。
    
- 可用于表达 **组合逻辑或时序逻辑**，取决于敏感列表和内部代码结构。
    

---

#### 示例 2：用 `always` 实现 2:1 多路选择器

```verilog
module mux_always (
    input wire a,
    input wire b,
    input wire sel,
    output reg y
);

always @(*) begin
    if (sel)
        y = b;
    else
        y = a;
end

endmodule
```

##### 解释：

- `@(*)` 表示组合逻辑，对所有输入敏感。
    
- `y` 是 `reg` 类型，因为在 `always` 块内赋值。
    
- 和 `assign` 的功能一样，但写法不同。
    

---

#### 示例 3：使用 `always @(posedge clk)` 描述时序逻辑

```verilog
module dff (
    input wire clk,
    input wire d,
    output reg q
);

always @(posedge clk) begin
    q <= d;
end

endmodule
```

##### 解释：
	
- 这是一个 D 触发器。
    
- `q` 在时钟上升沿采样 `d`。
    
- 描述的是 **时序逻辑**，和 `assign` 完全不同。
    

---

### 三、总结对比

|项目|`assign`|`always`|
|---|---|---|
|用于赋值对象类型|`wire`|`reg`|
|建模类型|通常用于组合逻辑|可用于组合或时序逻辑|
|执行方式|自动（连续赋值）|在触发条件下执行（过程赋值）|
|用途|简单逻辑表达式|复杂逻辑、时序逻辑|
|示例|`assign y = a & b;`|`always @(*) y = a & b;`|

---

### 适用建议

- 如果你只需要表达简单组合逻辑（如`y = a & b`），**优先使用 `assign`**，更简洁、清晰。
    
- 当逻辑复杂、涉及条件判断或需要时钟控制，使用 `always` 更灵活。
    

---

如果你还有具体代码想要比较分析，也可以发给我，我来帮你详细讲解。

|特性|`assign` 语句|`always` 块|
|---|---|---|
|类型|**连续赋值语句**|**过程赋值语句**|
|用途|**组合逻辑**（常用于简单逻辑）|既可用于**组合逻辑**，也可用于**时序逻辑**（带时钟）|
|数据对象要求|只能赋值给 `wire` 类型|只能赋值给 `reg` 类型|
|是否自动更新|是，一旦右边的值改变，立即更新|是，但必须触发敏感列表（如输入信号变化或时钟沿）|
|典型场景|组合逻辑：如译码器、加法器等|时序逻辑（如寄存器）、复杂组合逻辑（如 case、if-else）|
## 时序逻辑
### 计数器

```verilog
//led反转逻辑
    always@(posedge clk or posedge reset) 
    if(reset) 
        led <= 1'b1; 
    else if(cnt == MCNT) 
        led <= ~led; 
    else 
        led <= led; 
```

# 工程结构

## ***
+ 翻了个错，仿真文件模块名核原模块同名，没有用_tb