
# find pdk 

resource: https://gitcode.com/open-source-toolkit/d52f6/?utm_source=tools_gitcode&index=top&type=card&

# Install pdks

link: https://ccbirds.github.io/ICnotes1/

# Import pdks & analoglib and so on


前面链接的那个PDK库好像是CDB版，不是OA版
link： https://www.doubao.com/thread/x5xDRFTycCxdRGngt

```bash
COPYRIGHT (C) 1992-2018  CADENCE DESIGN SYSTEMS INC.  ALL RIGHTS RESERVED.
          (C) 1992-2018  UNIX SYSTEMS Laboratories INC.,
                         Reproduced with permission.

This Cadence Design Systems program and online documentation are
proprietary/confidential information and may be disclosed/used only
as authorized in a license agreement controlling such use and disclosure.

          RESTRICTED RIGHTS NOTICE (SHORT FORM)
Use/reproduction/disclosure is subject to restriction
set forth at FAR 1252.227-19 or its equivalent.
Program:		@(#)$CDS: virtuoso version 6.1.8-64b 10/01/2018 20:02 (ip-172-18-22-57) $
Sub version:		sub-version  IC6.1.8-64b.83  (64-bit addresses)
Loading geView.cxt 
Loading menuBuilder.cxt 
Loading schView.cxt 
Loading selectSv.cxt 
Loading wireEdit.cxt 
Loading pte2.cxt 
Loading xlUI.cxt 
Loading auCore.cxt 
Loading vhdl.cxt 
Loading seismic.cxt 
Loading ci.cxt 
Loading layers.cxt 
Loading ams.cxt 
Loading cli.cxt 
Loading cle.cxt 
Virtuoso Framework License (111) was checked out successfully. Total checkout time was 0.35s.
Successfully checked out 'Virtuoso_MixedSignalOpt_Layout' license.
Loading pe.cxt 
*WARNING* could not load font "-*-courier-medium-r-*-*-12-*", using font "fixed"
load("/home/userhush/Program/eda/cadence/pdks/pdks_after_extraction/SMIC_018_MMRF/smic18mmrf/libInit.il")
Loading smic18mmrf/libInit.il ...
Loading smic18mmrf/libInit.il ...
	Loading smic18mmrf/loadCxt.ile ... done!
	Loading context 'smic18mmrf' from library 'smic18mmrf' ... done!
	Loading context 'pdkUtils' from library 'smic18mmrf' ... done!
	Loading smic18mmrf/.cdsenv ... done!
	Loading smic18mmrf/display.drf ... done!
	Loading smic18mmrf/libInitCustomExit.il ... Loading libInitCustomExit.il for smic18mmrf
Loading oasis.cxt 
Loading analog.cxt 
Loading asimenv.cxt 
Loading spectrei.cxt 
Loading devCheck.cxt 
Loading relXpert.cxt 
Loading hspiceD.cxt 
Loading spectreinl.cxt 
Loading UltraSim.cxt 
done!
Loaded smic18mmrf/libInit.il successfully!
	Loading smic18mmrf/.cdsenv ... done!
	Loading smic18mmrf/display.drf ... done!
	Loading smic18mmrf/libInitCustomExit.il ... Loading libInitCustomExit.il for smic18mmrf
done!
Loaded smic18mmrf/libInit.il successfully!
t
```


![[Pasted image 20261020171637.png]]
# Draw schematic


# ADE Simulation

link:  https://ccbirds.github.io/ICnotes22/

## Modify the output of simulation

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
