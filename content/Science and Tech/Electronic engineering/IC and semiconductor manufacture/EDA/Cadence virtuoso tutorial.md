## 报错 `FATAL (VACOMP-2096): File ... replace it with an equivalent Verilog-A file.`

### 方法1：在 ADE 里直接禁用这两个.def 文件
#### 参考链接

https://www.doubao.com/thread/xMjGPGaqzeQR2xNuF

#### 取消勾选的设置

![[Pasted image 20260824095106.png]]
#### 在invertor仿真时证明可行

证明可行截图
![[Pasted image 20260824095024.png]]

### 方法2：把.def 改写成 Verilog‑A 语法，后缀改成.v

#### 参考链接：

virtuoso仿真报错VACOMP-2096
https://bbs.eetop.cn/thread-974656-1-1.html
(出处: EETOP 创芯网论坛 (原名：电子顶级开发网))

#### 做好文件的备份
### 个人备忘录
#### 证明移动这两个文件后仍然可以跑仿真
![[Pasted image 20260824160852.png]]
#### 证明没有修改工艺库的源`.ckt`文件

编辑复制出来的.ckt文件
对话： https://www.doubao.com/thread/xpo9ALGsKVsOFN9Vv
没有修改工艺库原文件的.ckt文件的截图证明：
![[Pasted image 20260823090914.png]]

![[Pasted image 20260823093245.png]]

# 版本管理
