
# find pdk 

resource: https://gitcode.com/open-source-toolkit/d52f6/?utm_source=tools_gitcode&index=top&type=card&

this pdk can be used


# collect the zip & unzip the pdk to certain path



# Import pdks & analoglib and so on

this link is unsuccessful : https://ccbirds.github.io/ICnotes1/
then i turn for 
## examine whether it is OA

link: https://www.doubao.com/thread/xHDjUjAy4qIsW5LN9
result:
![[Pasted image 20261021104830.png]]
## import and further examine wether it is available OA

link： https://www.doubao.com/thread/xW4cYwvOO1uk6nhjl

i create and edir `cds.lib` first

```vim
DEFINE smic18mmrf /home/userhush/Program/eda/cadence/pdks/pdks_after_extraction/SMIC_018_MMRFsmic18mmrf
```

then the `smic18mmrf` appears int the library manager

![[Pasted image 20261021105553.png]]

then i input this in CIW:

```CIW
load("/home/userhush/Program/eda/cadence/pdks/pdks_after_extraction/SMIC_018_MMRF/smic18mmrf/libInit.il")
```

then got the CIW  output:

```CIW
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


![[Pasted image 20261021110216.png]]

## import `Analog.lib`

## move the simuilation folder to current working directory



![[Pasted image 20261021141012.png]]
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

# AI Assist

## SSH 免密配置复盘（Windows ⇋ EDA 虚拟机）

> 2026-11-18 · 为 AI Agent（virtuoso-bridge）免密操控 VMware 里的 Virtuoso 打通 SSH：`userhush@192.168.30.100`
> 📄 完整复盘（外链，不在 vault 内）：[SSH免密配置复盘.md](<file:///C:/Users/29144/Doubao/chats/2026-11-18/new-chat/SSH免密配置复盘.md>)

坑位速查（详细原因和命令见全文）：
1. `echo` 写公钥忘了 `> ~/.ssh/authorized_keys` 重定向 → 只是打印，文件没建
2. **手抄公钥 = 最大坑**：转录错误 + 类型不匹配（抄的 ed25519，客户端实际用 id_rsa）→ 必须管道推送：`Get-Content id_rsa.pub -Raw | ssh 用户@主机 "cat >> ~/.ssh/authorized_keys"`
3. PowerShell 找不到 `ssh` → 用全路径 `C:\Windows\System32\OpenSSH\ssh.exe`
4. Windows 换行符 `^M` 混入公钥文件 → `sed -i 's/\r//g' ~/.ssh/authorized_keys`
5. 权限严格：`~/.ssh`=700，`authorized_keys`=600，属主本人
6. CentOS SELinux 拦截 → `restorecon -R ~/.ssh`
7. vim 里 `Ctrl+Z` 是挂起不是退出 → 残留 `.swp` 警告，`rm ~/.ssh/.authorized_keys.swp`
8. vim `E37` → 保存用 `:wq`，放弃用 `:q!`
9. `starship: Command not found.` 与 SSH 无关，可无视

验证命令（Agent 用的就是这条，输出 `ok` 即成功）：
```powershell
C:\Windows\System32\OpenSSH\ssh.exe -o BatchMode=yes userhush@192.168.30.100 echo ok
```

%% 注意：外链指向豆包会话目录，清理会话文件夹会失效；届时把全文挪到固定目录并更新此链接 %%

## Virtuoso-Bridge 只读验证通道安装复盘（Windows ⇋ EDA 虚拟机）

> 2026-11-18 · 为辅导（tutoring）会话搭建 virtuoso-bridge-lite **只读**验证通道：Windows 宿主经 SSH 隧道连到 VMware 里的 Virtuoso（IC618）/Spectre 18.1，只读核对 `ccia_lib`（`input_boosted_stage1` / `tb_n18_char`），不改设计、不跑仿真。安装位置 `D:\IC_tools\virtuoso-bridge-lite`。
> 📄 完整复盘（外链，不在 vault 内）：[VIRTUOSO_BRIDGE_SETUP_HANDOFF.md](<file:///D:/Documents/ChatGPT/Linux%20learning%20%28using%20CentOS%207%29/VIRTUOSO_BRIDGE_SETUP_HANDOFF.md>)

坑位速查（详细原因和命令见全文）：
1. **沙箱禁写用户目录**：python 子进程写 `C:\Users\29144\...` 被拒 → `.env` 与全部运行时目录改放工具目录内（用 `VB_STATE_DIR/LOG_DIR/CACHE_DIR/TMP_DIR/OUTPUT_DIR/CONFIG_DIR` 覆盖），不依赖 `~/.virtuoso-bridge`。
2. **uv 默认缓存被拒** → `UV_CACHE_DIR` 指到工具目录内；`ssh` 不在 PATH → 用全路径 `C:\Windows\System32\OpenSSH\ssh.exe` 并在 `.env` 设 `VB_SSH_CMD`。
3. **首次 SSH 要人工接受 host key**；公钥必须管道推送、手抄必错（详见上一节 SSH 复盘）。
4. **沙箱里一次性 shell 调用结束会杀掉 detached 子进程** → 隧道须用后台任务或自己的（非沙箱）终端托管；在自己终端里 `start` 返回后隧道仍存活。
5. **venv 不可移动**：换目录必须重建 venv + 改 `.env` 绝对路径 + 重新 `start`（本次从 `...\Graduation_Project\tools` 迁到 `D:\IC_tools`）。
6. **CLI `eval` 会吞掉双引号字符串字面量**（`dbOpenCellViewByType("ccia_lib"...)` 变 unbound → 返回 nil）→ 含字符串的 SKILL 用 Python `execute_skill` 或 `virtuoso-bridge load 文件.il`；无引号的 `eval "1+2"` 正常。
7. **Virtuoso 重启 = daemon 死**（它活在 CIW 里）→ 重粘 CIW load 行；**VM 重启清空 /tmp** → 重新 `start` 会重新部署 setup 自动兜底。
8. 远端登录 shell 是 csh：命令带括号报 `Badly placed ()'s.`；`starship: Command not found.` 与 SSH 无关，可无视。

验证命令（`status` 显示 `daemon OK` + Virtuoso PID，且两条 eval 有返回即真连通）：
```powershell
cd D:\IC_tools\virtuoso-bridge-lite   # 激活 .venv 后
virtuoso-bridge status
virtuoso-bridge eval "1+2"                  # 期望 output "3"
virtuoso-bridge eval "ddGetLibList()~>name"  # 期望含 ccia_lib / smic18mmrf
```

%% 注意：此外链指向固定目录 `D:\Documents\ChatGPT\Linux learning (using CentOS 7)\`（比豆包会话目录耐久），即本会话的完整安装/交接记录；若移动该文件请更新此链接。 %%
