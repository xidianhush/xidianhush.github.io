---
exclude-from-graph: true
---

## 4 芯片手册阅读##
当然可以！以下是关于芯片手册参数的整理笔记，涵盖了关键参数的英文名称、中文名称、对应的物理量单位，以及相关的解释。

## 芯片手册关键参数笔记

### 1. 单电压供电范围
- **英文名称**: Flexible Supply Range
- **中文名称**: 单电压供电范围
- **单位**: V（伏特）
- **说明**: 芯片在正常工作时所需的电源电压范围。

### 2. 最高输出电流
- **英文名称**: High Output Current
- **中文名称**: 最高输出电流
- **单位**: mA（毫安）
- **说明**: 芯片能够提供的最大输出电流，影响其驱动负载的能力。

### 3. 压摆率
- **英文名称**: Slew Rate
- **中文名称**:压摆率
- **单位**: V/µs（伏特每微秒）
- **说明**: 输出信号变化的最大速率，决定放大器对快速信号的响应能力。

### 4. 输入电压噪声
- **英文名称**: Input Voltage Noise
- **中文名称**: 输入电压噪声
- **单位**: nV/√Hz（纳伏每根赫兹）
- **说明**: 放大器输入端由于固有噪声引起的电压波动，影响信号处理能力。

### 5. 输入电流噪声
- **英文名称**: Input Current Noise
- **中文名称**: 输入电流噪声
- **单位**: pA/√Hz（皮安每根赫兹）
- **说明**: 由于输入偏置电流引起的噪声，影响高阻抗应用中的信号质量。

### 6. 增益带宽积
- **英文名称**: Gain-Bandwidth Product
- **中文名称**: 增益带宽积
- **单位**: MHz（兆赫兹）
- **说明**: 在特定增益下，放大器能够处理的最大频率，反映其频率响应能力。

### 7. 带宽
- **英文名称**: Bandwidth
- **中文名称**: 带宽
- **单位**: Hz（赫兹）
- **说明**: 放大器能够有效放大的频率范围，通常以最小和最大值表示。

### 8. 有效噪声电压
- **英文名称**: Effective Noise Voltage
- **中文名称**: 有效噪声电压
- **单位**: V（伏特）
- **说明**: 在特定带宽内，由于噪声引起的电压波动的有效值，通常以 RMS 值表示。

---
## 5 软件部分##
### iic程序###
### iic读函数###
当然可以！让我们通过一个具体的例子来详细解释这段代码的每个部分。假设我们要从I2C设备读取一个字节，设备返回的字节是`0b10101100`（十进制的172）。

### 代码示例

```c
uint8_t IIC_Read_One_Byte(uint8_t ack)
{
    unsigned char i, receive = 0;
    IIC_SDA_In(); // SDA设置为输入
    
    for(i = 0; i < 8; i++)
    {
        GPIO_WriteBit(SCLPort, SCLPin, Bit_RESET);
        delay_us(2);
        GPIO_WriteBit(SCLPort, SCLPin, Bit_SET);
        receive <<= 1; // 左移一位，为新位腾出空间
        
        if(GPIO_ReadInputDataBit(SDAPort, SDAPin)) 
            receive++; // 如果SDA为高电平，增加receive的值
        
        delay_us(1);
    }
    
    if (!ack)
        IIC_NAck(); // 发送NACK
    else
        IIC_Ack(); // 发送ACK   
    
    return receive; // 返回读取到的字节
}
```

### 逐步分析

1. **初始化变量**：
   ```c
   unsigned char i, receive = 0;
   ```
   - `i`用于循环计数。
   - `receive`初始化为0，准备接收数据。

2. **设置SDA为输入**：
   ```c
   IIC_SDA_In(); // SDA设置为输入
   ```
   - 将SDA线设置为输入，以便从I2C设备读取数据。

3. **开始读取数据的循环**：
   ```c
   for(i = 0; i < 8; i++)
   ```
   - 循环8次，每次读取一位数据，构成一个完整的字节。

4. **控制SCL线**：
   ```c
   GPIO_WriteBit(SCLPort, SCLPin, Bit_RESET);
   delay_us(2);
   GPIO_WriteBit(SCLPort, SCLPin, Bit_SET);
   ```
   - 将SCL线拉低，确保SDA线稳定，然后将SCL线拉高以开始读取数据。

5. **左移操作**：
   ```c
   receive <<= 1; // 左移一位，为新位腾出空间
   ```
   - 每次循环开始时，`receive`左移一位。例如，如果当前`receive`是`00000000`（0），左移后变为`00000000`（仍然是0）。

6. **读取数据位**：
   ```c
   if(GPIO_ReadInputDataBit(SDAPort, SDAPin)) 
       receive++; // 如果SDA为高电平，增加receive的值
   ```
   - 假设在第1次循环时，SDA线读取到的是1（高电平），此时`receive`从`00000000`变为`00000001`。
   - 在第2次循环时，假设SDA读取到的是0，则`receive`仍然是`00000001`。
   - 在第3次循环时，假设SDA读取到的是1，则此时左移后变为`00000010`，再加上1后变为`00000011`。
   - 按照这个过程继续进行，直到第8次循环结束。

### 假设结果

假设在整个过程中，我们最终得到了 `0b10101100`（十进制172）：

- 第1位：1 → `receive = 00000001`
- 第2位：0 → `receive = 00000010`
- 第3位：1 → `receive = 00000101`
- 第4位：0 → `receive = 00001010`
- 第5位：1 → `receive = 00010101`
- 第6位：1 → `receive = 00101101`
- 第7位：0 → `receive = 01011010`
- 第8位：0 → `receive = 10101100`

### 发送ACK或NACK

```c
if (!ack)
    IIC_NAck(); // 发送NACK
else
    IIC_Ack(); // 发送ACK   
```

- 根据传入的参数决定发送ACK或NACK。如果我们希望继续接收更多数据，就发送ACK；如果不再接收，就发送NACK。

### 返回结果

```c
return receive; // 返回读取到的字节
```

- 最终返回构建好的字节，即 `0b10101100`（十进制172）。

### 总结

通过这个具体的例子，我们可以看到这段代码如何逐步构建出一个完整的字节，以及每个部分在这个过程中所起到的作用。如果还有其他问题或需要进一步解释的地方，请随时告诉我！

---

### iic写函数###
当然可以！让我们逐步分析这段用于I2C写入字节的代码。假设我们要通过I2C向设备写入字节`0b10101100`（十进制的172）。

### 代码示例

```c
void IIC_Write_One_Byte(uint8_t byte)
{
    uint8_t t;
    IIC_SDA_Out(); // 设置SDA为输出
    GPIO_WriteBit(SCLPort, SCLPin, Bit_RESET); // 将SCL线拉低
    
    for(t = 0; t < 8; t++)
    {              
        if((byte & 0x80) >> 7) // 检查最高位
            GPIO_WriteBit(SDAPort, SDAPin, Bit_SET); // 如果最高位为1，设置SDA为高电平
        else
            GPIO_WriteBit(SDAPort, SDAPin, Bit_RESET); // 如果最高位为0，设置SDA为低电平
        
        byte <<= 1; // 左移一位，准备下一位
        delay_us(2); // 延时，确保数据稳定
        
        GPIO_WriteBit(SCLPort, SCLPin, Bit_SET); // 将SCL线拉高，开始发送数据
        delay_us(2); // 延时，确保数据被读取
        GPIO_WriteBit(SCLPort, SCLPin, Bit_RESET); // 将SCL线拉低，准备发送下一位
        delay_us(2); // 延时，确保SCL线稳定
    }
}
```

### 逐步分析

1. **函数声明**：
   ```c
   void IIC_Write_One_Byte(uint8_t byte)
   ```
   - **函数名**：`IIC_Write_One_Byte`，表示写入一个字节。
   - **参数**：`byte`，要写入的字节数据。

2. **初始化变量**：
   ```c
   uint8_t t;
   ```
   - `t`用于循环计数。

3. **设置SDA为输出**：
   ```c
   IIC_SDA_Out(); // 设置SDA为输出
   ```
   - 将数据线SDA设置为输出模式，以便发送数据。

4. **将SCL线拉低**：
   ```c
   GPIO_WriteBit(SCLPort, SCLPin, Bit_RESET); // 将SCL线拉低
   ```
   - 在开始发送数据之前，将时钟线SCL拉低，以确保数据线稳定。

5. **开始写入数据的循环**：
   ```c
   for(t = 0; t < 8; t++)
   ```
   - 循环8次，每次发送一位数据。

6. **检查并设置SDA线**：
   ```c
   if((byte & 0x80) >> 7) // 检查最高位
       GPIO_WriteBit(SDAPort, SDAPin, Bit_SET); // 如果最高位为1，设置SDA为高电平
   else
       GPIO_WriteBit(SDAPort, SDAPin, Bit_RESET); // 如果最高位为0，设置SDA为低电平
   ```
   - 使用位运算检查`byte`的最高位（第8位）。如果该位为1，则将SDA线设置为高电平；如果该位为0，则设置为低电平。

### 假设结果

假设我们要发送的字节是 `0b10101100`：

- 第1次循环：最高位是1 → `GPIO_WriteBit(SDAPort, SDAPin, Bit_SET);`
- 第2次循环：最高位是0 → `GPIO_WriteBit(SDAPort, SDAPin, Bit_RESET);`
- 第3次循环：最高位是1 → `GPIO_WriteBit(SDAPort, SDAPin, Bit_SET);`
- 第4次循环：最高位是0 → `GPIO_WriteBit(SDAPort, SDAPin, Bit_RESET);`
- 第5次循环：最高位是1 → `GPIO_WriteBit(SDAPort, SDAPin, Bit_SET);`
- 第6次循环：最高位是1 → `GPIO_WriteBit(SDAPort, SDAPin, Bit_SET);`
- 第7次循环：最高位是0 → `GPIO_WriteBit(SDAPort, SDAPin, Bit_RESET);`
- 第8次循环：最高位是0 → `GPIO_WriteBit(SDAPort, SDAPin, Bit_RESET);`

7. **左移操作**：
   ```c
   byte <<= 1; // 左移一位，准备下一位
   ```
   - 每次发送完一位后，将`byte`左移一位，以便在下一次循环中检查并发送下一个数据位。

8. **延时操作**：
   ```c
   delay_us(2); // 延时，确保数据稳定
   
   GPIO_WriteBit(SCLPort, SCLPin, Bit_SET); // 将SCL线拉高，开始发送数据
   delay_us(2); // 延时，确保数据被读取
   GPIO_WriteBit(SCLPort, SCLPin, Bit_RESET); // 将SCL线拉低，准备发送下一位
   delay_us(2); // 延时，确保SCL线稳定
   ```
   - 在每次将SDA线状态改变后，需要延时以确保设备能够稳定读取到正确的数据。
   - 然后将SCL线拉高以通知设备读取数据，再延时后将其拉低，为下一次发送做准备。

### 总结

这段代码通过控制GPIO引脚实现了I2C协议中的字节写入功能。它逐位检查要发送的数据，并通过控制SDA和SCL引脚来完成整个写入过程。希望这个详细的解释能够帮助你更好地理解这段代码！如果还有其他问题，请随时问我。

Sources


![[Pasted image 20241208091311.jpg]]
# 查看电阻、电容、电感值的标记方法

## 电阻标记方法
电阻的标记由三位数字组成：
1. **前两位数字**：表示有效数字。
2. **第三位数字**：表示 \(10^n\) 的幂次（单位为欧姆 \(Ω\)）。

### 示例
- **"472"**  
  计算过程：  
  $$
  47 \times 10^2 \, Ω = 4700 \, Ω = 4.7 \, kΩ
  $$  
  **结论**：阻值为 **4.7 kΩ**。

---

## 电容标记方法
电容的标记由三位数字组成：
1. **前两位数字**：表示有效数字。
2. **第三位数字**：表示 \(10^n\) 的幂次（单位为皮法 \(pF\)）。

### 示例
- **"103"**  
  计算过程：  
  $$
  10 \times 10^3 \, pF = 10,000 \, pF = 10 \, nF = 0.01 \, μF
  $$  
  **结论**：容值为 **0.01 μF**。

---

## 电感标记方法
电感的标记由三位数字组成：
1. **前两位数字**：表示有效数字。
2. **第三位数字**：表示 \(10^n\) 的幂次（单位为微亨 \(μH\)）。

### 示例
- **"103"**  
  计算过程：  
  $$
  10 \times 10^3 \, μH = 10,000 \, μH = 10 \, mH
  $$  
  **结论**：电感值为 **10 mH**。
  
![[Pasted image 20241208092720.png]]
