# Some useful prompt

+ 我的描述可能还不够详细，所以请你判断一下。
+ 你可以判断一下我说的对不对，如果你认为我的需求不合理，可以随时反驳我并提出其他的意见。
+ 如果有其他更好的参考方案也可以借鉴一下。
+ 其实我觉得和你合作这个项目很愉快。我感觉你承担了技术岗的工作而我是产品经理 。But up to no，我意识到一个问题:就是你提到的技术&一些操作&专用名词我不太懂。所以我想了些方法:1、咱在项目根目录下，再建一个TODO.md。里面每个Step用表格列出以下内容你该做的所有事，已经做的所有事我该做的所有事，已经做的所有事。而且TODO.md会随项目进度更。2.同时对于我不懂的地方，我提出，你指导。没事，我们这个项目不急，take it slaw, take it easy

# Some problems

## text compacted problem


> 记录于 2026-10-18 · Kimi Code CLI 2.2.0（当时已是最新版）· 触发场景：VSCode 里的 Kimi Code 扩展

报错原文：

```
Context compacted
CompactionTruncatedError: Compaction response was truncated before producing a complete summary.
```

### 原理

上下文快满时，CLI 会让模型把旧对话「重写成一份摘要」，这份摘要替换掉旧历史。如果这一次摘要请求的输出被截断（`finish_reason = truncated`，撞到模型的输出 token 上限），就拿不到完整摘要，于是抛这个错。

CLI 其实有兜底：一旦截断，它会丢掉最老的一条消息再重试，最多 `loop_control.compaction_max_attempts` 次（默认 5 次）。==所以看到这个报错，意味着已经连续截断 5 次、越丢越少还是写不完==。

麻烦点：上下文依然接近上限，下一条消息大概率又触发压缩、又失败，会话就卡死了。但 ==历史没丢==，都在 `~/.kimi-code/sessions/` 里。

### 自救步骤（按顺序）

1. ==手动压缩一次，并强制要求写短==（最省事）：

   ```
   /compact 用极简中文要点总结，控制在 150 行以内，只保留目标、已改文件和待办
   ```

   截断的根因是摘要太长，明确要求简短通常一次就过。

2. 加大重试次数，编辑 `~/.kimi-code/config.toml`：

   ```toml
   [loop_control]
   compaction_max_attempts = 10
   ```

   改完重启会话（VSCode 里要重启扩展）。

3. 如果会话彻底发不出消息：在那个项目目录开终端跑 `kimi --continue`，==恢复的是同一个会话==（不是复制），终端里 `/compact`、`/export-md`、`/new` 都齐全。处理完再回 VSCode。

4. 实在救不回来就换血（最可靠）：先让 agent 写交接文件 ——「把当前目标、已改文件和关键改动、待办、复现命令写到 HANDOFF.md」→ `/export-md` 存档整个对话 → `/new` 开新会话，让它读 HANDOFF.md 继续。

### 别再踩的坑

+ ==大工具输出是头号元凶==：最近几轮里有一次巨大输出（`cat` 出几万行日志、整份大文件 dump）时，压缩只从**最老的**消息开始丢，尾部那块永远丢不掉，重试几次也收敛不了。以后读大文件用 Grep 或分段读（`line_offset`），别整读。
+ `/fork` 救不了这个场景：fork 复制的就是同一份已经满了的历史。
+ 手动 `/compact` 会压最多的历史（manual 模式取最大可切分点），比自动压缩更容易撞截断；==失败后别反复重试手动 /compact==。
+ 注意 `/compact` 后面跟的那句 hint 是喂给模型看的，可以直接写在里面让它「尽量短」。

### 参考

+ [Sessions and context](https://www.kimi.com/code/docs/en/kimi-code-cli/guides/sessions.html)（上下文压缩、`/compact`、`/export-md`、`/fork`）
+ [Configuration files](https://www.kimi.com/code/docs/en/kimi-code-cli/configuration/config-files.html)（`[loop_control]` 各字段含义）

