# 关键词
## token
Token 是自然语言处理（NLP）中用来表示输入或输出文本的一种基本单位，它可以是一个词、一部分单词、甚至是一个字符。这种分解方式让模型可以更灵活地处理语言。以下是一些关键点来帮助理解 token：

---

### 1. **Token 的定义**：

- **词语（Word）**：比如 "hello world"，可以分解为两个 token：`hello` 和 `world`。
- **部分单词**：对于更复杂的语言，tokenizer 会将单词分解为更小的片段，比如 `unbelievable` 可能被分解为 `un`, `believ`, 和 `able`。
- **标点符号**：标点也是 token，比如句号（`.`）或逗号（`,`）等。
- **特殊符号**：如换行符 `\n` 或模型特定的控制字符。

---

### 2. **为什么需要 Token？**

AI 模型本质上不能直接理解人类语言，它们只能处理数字。通过分解成 token，文本就可以被编码为数字，成为模型可以处理的输入。

- Token 的大小直接影响模型对文本的处理能力和效率。
- 使用 token 分解，可以覆盖多种语言和风格的表达。

---

### 3. **Token 和文本的关系**：

Token 和文本的关系并不是一一对应的：

- 简单句子可能少量 token 表示。例如：`I am happy.` 分解为 4 个 token：`I`, `am`, `happy`, `.`。
- 较长句子会需要更多 token，尤其是含有复合词或技术术语的句子。

---

### 4. **在 AI 模型中的作用**：

- **输入 token**：模型根据你输入的文本，计算出每个 token 的含义，并生成对应的输出。
- **输出 token**：模型生成的每个词（或符号）都算作一个 token。

比如，模型通常有一个 token 限制（比如 4096 个 token）。输入和输出的 token 总数不能超过这个限制。

---

### 5. **举个例子**：

假设输入文本是：

> "Artificial Intelligence is fascinating."

分解成 token 可能是：

- `Artificial`
- `Intelligence`
- `is`
- `fascinating`
- `.`

总共有 5 个 token。

---

你在什么场景下遇到了 token 的概念？如果你还有疑问，可以告诉我具体的应用场景，我可以结合实例进一步讲解！


## MCP
在AI领域，MCP通常指的是Model Context Protocol（模型上下文协议）。以下是关于MCP的详细介绍：
定义
MCP是由Anthropic（Claude的母公司）于2024年11月开源发布的一种开放标准协议，旨在定义应用程序和AI模型之间交换上下文信息的方式。它允许AI模型（尤其是大型语言模型，LLM）以一种标准化的方式与外部工具、数据源和系统进行交互。
核心架构
MCP采用客户端-服务器架构，主要由以下三个核心组件构成：
1.  Host（宿主）：负责接收用户请求并与AI模型交互的应用程序，如Claude Desktop或IDE工具Cursor。
2.  Client（客户端）：当AI模型需要访问外部资源时，Host中的MCP Client会被激活，负责与MCP Server建立连接。
3.  Server（服务器）：执行实际操作的组件，提供特定功能或服务，例如文件系统操作、数据库查询等。
工作流程
当用户向AI模型提出问题时，整个工作流程如下：
4.  客户端将问题发送给AI模型。
5.  AI模型分析问题并决定需要调用的工具。
6.  客户端通过MCP Server执行所选工具。
7.  工具的执行结果返回给AI模型。
8.  AI模型结合执行结果生成最终的回答。
9.  回答展示给用户。
优势
10.  标准化：提供统一的接口，简化了AI模型与外部工具的集成。
11.  生态丰富：提供了许多现成的插件和工具，开发者无需从零开始构建。
12.  数据安全：敏感数据可以保留在本地，无需全部上传到云端。
13.  灵活性：不限制于特定的AI模型，任何支持MCP的模型都可以灵活切换。
应用场景
MCP的应用场景非常广泛，包括但不限于：
•  文件管理：AI助手可以直接读取、写入和管理本地文件。
•  代码开发：AI可以访问代码库，提供更精准的编程建议。
•  数据分析：AI可以直接连接数据库进行实时分析。
•  工具集成：AI可以调用各种外部工具和API。
•  自动化工作流：AI可以协调多个工具和服务，实现复杂的自动化流程。
行业影响
MCP被比喻为AI领域的“USB-C接口”，其开放标准的特性使其有望成为AI应用的通用连接方式。目前，OpenAI等多家公司已经开始支持MCP，并将其集成到相关产品中。
总之，MCP为AI模型与外部世界的交互提供了一种高效、安全且标准化的解决方案，正在推动AI应用的进一步发展。

# 通过认识ai来认识人类思考模式

# 

```bas
SillyTavern is listening on IPv4: 127.0.0.1:8000

=================================================

Go to: http://127.0.0.1:8000/ to open SillyTavern

=================================================

Extensions available for default-user [
  { type: 'system', name: 'assets' },
  { type: 'system', name: 'attachments' },
  { type: 'system', name: 'caption' },
  { type: 'system', name: 'connection-manager' },
  { type: 'system', name: 'expressions' },
  { type: 'system', name: 'gallery' },
  { type: 'system', name: 'memory' },
  { type: 'system', name: 'quick-reply' },
  { type: 'system', name: 'regex' },
  { type: 'system', name: 'stable-diffusion' },
  { type: 'system', name: 'token-counter' },
  { type: 'system', name: 'translate' },
  { type: 'system', name: 'tts' },
  { type: 'system', name: 'vectors' }
]
```
