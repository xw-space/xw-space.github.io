---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - 计算机网络
tag:
  - default
---

# AIDevelopment

## HuggingFace
在环境变量中添加键：`HF_HOME`和值：`D:\huggingface`，即可更改缓存位置



## 大模型应用
### LMA（Large Multimodal Agent，大规模多模态智能体）
**多模态智能体**
(Large Multimodal Agents, LMAs)

- **定义**：基于多模态大模型（LMM, e.g. GPT-4o, Gemini, Claude 3 Opus）的 Agent，能处理文本、图像、语音、视频等多种模态输入输出。
    
- **特点**：
    - 输入和输出不限于文本。
    - 融合感知与推理：既能“看图”又能“写答案”，还能“听音频”。
    - 通常带有工具调用、RAG 等增强功能。
- **例子**：
    - OpenAI GPT-4o 助手：拍照后能解释数学题。
    - 医疗多模态 Agent：结合 CT 影像和病历文本辅助诊断。
    - 多模态客服机器人：用户上传合同截图+语音提问，Agent 给出法律解释。

👉 **LMA = Agent 的进阶版，依赖大规模多模态模型作为核心大脑**。


赋予单一AI实体处理文本、图像、音频、视频等多元数据模态的能力。


- 图像 + 文本：结合 CLIP、MiniGPT4 实现图文问答、图像标注助手
    
- 结构化数据问答：CSV、Excel、SQL database QA 系统（LangChain + DuckDB / PandasAgent）
    
- 音频、视频摘要 / QA 系统（Whisper + RAG）


## 000杂乱待了解的知识点
模型蒸馏
迁移学习
DevOps实践
知识加工
语料生成
Prompt工程优化
LLM模型微调
模型效果评测
API 设计基本原则
PEFT
pretrainpost-pretrain 
Prompt优化技巧
data first 的意识价值交付
Prompt Engineering、RAG、Function Calling/Tool Binding，具备复杂 Agent（如任务规划、工具调用、记忆与学习机制）的设计、开发与调优经验。
Multi-Agent 协作框架、Autonomous Agent）的设计、开发、调试和评估
LLM 微调（Fine-tuning）、量化、部署和推理优化，熟悉相关工具和框架。
有LangFlow、Flowise、Dify等AI Agent构建平台使用


### Agent（智能体）
**定义**：在 AI 语境中，Agent 指能感知环境、做出决策并执行行动的自主系统。
**特点**：
- 有目标（goal-directed）。
- 有感知输入（环境、用户交互、数据流）。
- 有动作输出（调用 API、生成文本、执行任务）。
**例子**：ChatGPT 加上插件和执行工具后就成了一个 AI Agent；金融风控里的自动审批 Agent；游戏里的 NPC Agent。


类型：`ReActAgent`, `OpenAIFunctionsAgent`, `ChatAgent`, `ToolCallingAgent`

智能体框架：
- LangChain Agent
- AutoGen
- CrewAI
- MetaGPT / OpenDevin（代码代理）
- ChatDev（多人角色协作）


🟢初级：文档问答、搜索引擎工具调用、Python计算
🟡中级：结构化输出、带记忆对话、多模型调度
🔴高级：自主规划Agent、多任务长链路、多状态LangGraph工作流


🔄可恢复工作流：使用checkpoint保存历史状态，断点恢复
🧬多轮上下文记忆结合：Retrieval使用`ContextualCompressionRetriever`
🧭Agentwithplanning：`plan_and_execute`调用分步执行
📤文件上传与分析：FastAPI接口+`Tool`分析文件结构
🕸WebSocket实时反馈：用于任务进度追踪/消息推送
🧪单元测试与链测试：使用LangChain`TestingUtilities`


使用 `Runnable` 管道整合多个链

## MAS多智能体系统
（Multi-Agent System，多智能体系统）
多智能体系统(Multi-agent Systems, MAS)
通过多个独立智能体的协作实现复杂目标。
分而治之

- **定义**：多个 Agent 组成的系统，它们可以 **协作、竞争、分工** 来完成更复杂的任务。
- **特点**：
    - Agent 间有通信协议。
    - 可以是同质的（相似能力）或异质的（不同能力）。
    - 适合解决单 Agent 难以应对的复杂问题。
- **例子**：
    - 智能电网调度（发电/负载/交易 Agent 协同）。
    - AI 论文里常见的“多 Agent 协作写代码”实验。
    - 游戏仿真中的多角色 AI。

👉 **MAS = Agent 的群体化/组织化形态**。


**层级架构**

## Copilot
（副驾驶/助手式 AI）
（代码、文档、决策等领域）
- **定义**：侧重“人机协作”，不是完全自主，而是 **辅助人类决策/操作** 的 Agent。
- **特点**：
    - 强调“增强人类生产力”，而非完全取代。
    - 用户处于决策环节的闭环中，AI 给建议或草稿，人类最终决定。
- **例子**：GitHub Copilot（写代码建议）；Microsoft 365 Copilot（在 Word/Excel 里自动生成或修改内容）。

👉 可以理解为：**Copilot = Agent 的一个应用形态，但更强调“辅助”而非“自主”**。


## langchain

用户可向机器人提问，机器人具备以下能力：
- 记住对话上下文（Memory）
- 检索资料库内容（Vector Store + RAG）
- 执行 Python 运算、搜索、问天气（Agent + Tool）
- 多轮交互，回复清晰、自然

技术栈：
- PromptTemplate（提示模板）
- LLMChain（语言模型链）
- Memory（对话记忆）
- Agent（智能体）
- Tools（工具调用）
- Vector Store + RAG（检索增强）
- Streaming、Callback（可选）
- Web 前端（FastAPI + LangServe 或 Gradio）

|模块|技术|
|---|---|
|LLM|OpenAI ChatGPT (gpt-3.5/4)|
|Prompt|PromptTemplate|
|Memory|ConversationBufferMemory|
|Chain|ConversationalRetrievalChain + AgentExecutor|
|Tool|SerpAPI、Python REPL、自定义函数|
|Vector Store|FAISS + OpenAI Embedding|
|Web|FastAPI + LangServe (推荐) 或 Gradio (快速搭建)|

## RAG
RAG（Retrieval-Augmented Generation，检索增强生成）框架，支持 `ConversationalRetrievalChain`、`RetrievalQA`，基于检索增强的问答系统（ChatPDF、企业知识问答等）：模块组合：`retriever + prompt + LLM + memory`， [Build a Retrieval Augmented Generation (RAG) App: Part 1 | 🦜️🔗 LangChain](https://python.langchain.com/docs/tutorials/rag/#overview)
**定义**：一种 AI 技术范式，将 **外部知识库检索** 与 **大模型生成** 结合。
- **工作流程**：
    1. 用户提问 → 检索引擎找相关文档片段。
    2. 把文档上下文拼接到 prompt。
    3. 大模型基于这些上下文生成回答。
- **意义**：
    - 解决模型“幻觉”问题。
    - 保持答案的实时性与专业性。
- **例子**：法律问答系统、企业知识库问答、论文搜索助手。

👉 RAG 是 **底层技术方法**，可以为 Agent 或 Copilot 提供“知识补充剂”。

官方提供的使用langchain构建rag应用的教程： https://python.langchain.com/docs/tutorials/rag/#overview

介绍典型的问答架构
重点介绍一些更高级的问答技术资源
还将了解 LangSmith 如何帮助我们追踪和理解我们的应用程序，随着应用程序的复杂程度不断提高，LangSmith 的帮助将越来越大。
如果您已经熟悉基本检索，您可能还会对[不同检索技术的高级概述](https://python.langchain.com/docs/concepts/retrieval/)感兴趣。

重点介绍非结构化数据的问答。如果您对结构化数据的 RAG 感兴趣，请查看我们[关于 SQL 数据问答的](https://python.langchain.com/docs/tutorials/sql_qa/)教程。

在本指南中，我们将构建一个应用程序来回答有关网站内容的问题。我们将使用Lilian Weng 撰写的[LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)博客文章，该网站允许我们针对文章内容提出问题。

创建一个简单的索引管道和 RAG 链

- 开源工具链：**LLM inference**：vLLM、TGI、LMDeploy、FastChat

**两个主要组件**：
- **索引**：从数据源提取数据并进行索引的管道。_这通常发生在线下。_
- **检索和生成**：实际的 RAG 链，它在运行时接受用户查询并从索引中检索相关数据，然后将其传递给模型。

**主要流程**：
1. **加载**：首先我们需要加载数据。这可以通过[文档加载器](https://python.langchain.com/docs/concepts/document_loaders/)完成。
2. **拆分**：[文本拆分器](https://python.langchain.com/docs/concepts/text_splitters/)将大块数据拆分`Documents`成更小的块。这对于索引数据和将数据传入模型都非常有用，因为大块数据更难搜索，而且无法容纳在模型有限的上下文窗口中。
3. **存储**：我们需要一个地方来存储和索引我们的分割数据，以便日后进行搜索。这通常使用[VectorStore](https://python.langchain.com/docs/concepts/vectorstores/)和[Embeddings](https://python.langchain.com/docs/concepts/embedding_models/)模型来实现。
4. **检索**：给定用户输入，使用[检索器](https://python.langchain.com/docs/concepts/retrievers/)从存储中检索相关分割。
5. **生成**：[ChatModel](https://python.langchain.com/docs/concepts/chat_models/) / [LLM](https://python.langchain.com/docs/concepts/text_llms/)使用包含问题和检索到的数据的提示生成答案


![](https://python.langchain.com/assets/images/rag_indexing-8160f90a90a33253d0154659cf7d453f.png)
![](https://python.langchain.com/assets/images/rag_retrieval_generation-1046a4668d6bb08786ef73c56d4f228a.png)

## 大模型训练

### SFT

有监督微调（Supervised Fine-Tuning，SFT）：是一种基于标注数据对预训练语言模型进行二次训练的技术。其本质是将通用语言模型适配到具体任务中。SFT 的过程通常包括数据收集与预处理，即构建指令数据集，收集多样化的用户指令及对应的优质回复，并进行数据清洗与标准化；然后选择预训练模型，并可根据情况冻结部分参数，最后使用标注好的 “指令 - 回复” 数据集对模型进行训练，让模型学会遵循特定格式完成任务。


### RLHF

基于人类反馈的强化学习（Reinforcement Learning from Human Feedback，RLHF）：是一种将人类反馈与强化学习相结合的方法，旨在通过引入人类偏好来优化模型的行为和输出。RLHF 框架包括强化学习算法、行动、环境、观察和奖励机制等部分。在 RLHF 中，人类的偏好被用作奖励信号，以指导模型的训练过程。通常需要先收集描述性数据训练一个监督学习模型，再收集比较性数据训练一个奖励模型，最后用近端策略优化（PPO）等强化学习算法对奖励模型进行优化，从而使模型生成更符合人类期望的输出。

### DPO
直接偏好优化（Direct Preference Optimization，DPO）：是一种重要的模型对齐技术，主要用于将预训练语言模型与人类偏好对齐，无需依赖传统强化学习中的奖励模型，简化了训练流程。DPO 直接通过人类对模型输出的偏好数据，即 “偏好对”，如 “哪个回答更好” 来优化模型。其核心损失函数是通过最大化 “偏好似然比” 来优化模型参数，让模型更可能输出人类偏好的结果，同时避免输出较差的结果。DPO 的优势在于流程简单，节省计算资源，训练更稳定，在多数场景下性能可媲美甚至超越 RLHF，但对偏好数据的质量要求较高。


### 数据搜集
这个视频开头说了很多数据搜集途径：【如何把领域文献批量转换为可供模型微调的数据集？】 https://www.bilibili.com/video/BV1y8QpYGE57/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef

## **数据加载**
（Document Loaders）



## **数据切分**
（Text Splitters）

 从 PDF、TXT、Word、网页、Notion、GitHub、数据库中加载文档，构建用于 RAG 的知识库文档输入：`RecursiveCharacterTextSplitter`, `MarkdownTextSplitter`, `ChineseTextSplitter`

## 大模型调用

from langchain_openai import ChatOpenAI
from langchain.chat_models import init_chat_model

| 特征   | `ChatOpenAI`（直接类）  | `init_chat_model`（封装函数）                     |
| ---- | ------------------ | ------------------------------------------- |
| 来源   | `langchain_openai` | `langchain.chat_models`（LangChain官方统一接口）    |
| 模型适配 | 仅适用于 OpenAI 系列模型   | 支持多个提供商：OpenAI、Anthropic、Qwen、HuggingFace 等 |
| 配置方式 | 直接构造类，需显式传参        | 封装了 provider 和模型适配，自动映射配置                   |
| 灵活性  | 灵活但不通用（只能 OpenAI）  | 通用性强，可用于构建多模型统一接口                           |
| 推荐程度 | 适合快速使用 OpenAI      | 适合构建可切换后端的项目（强烈推荐）                          |



## **embedding模型**
将文档向量化：OpenAI、BGE、text2vec、Cohere、Qianfan 等
向量检索瓶颈：在 RAG 中，embedding 决定了“相似性”的定义方式，是检索效果的核心



## **向量数据库**
存储向量化后的数据
用于相似度检索、知识增强问答（RAG）：FAISS、Chroma、Milvus、Weaviate、Qdrant、PGVector、Pinecone
[FAISS — 🦜🔗 LangChain documentation](https://python.langchain.com/api_reference/community/vectorstores/langchain_community.vectorstores.faiss.FAISS.html)
  * 向量存储（FAISS / Chroma / Weaviate）

开源向量数据库比较：Chroma, Milvus, Faiss,Weaviate https://cloud.tencent.com/developer/article/2412486
## **Retriever检索器**
叠加 rerank、压缩、Filter 条件等，作为 RAG 查询器，为语言模型提供上下文支持：`VectorstoreRetriever`, `MultiQueryRetriever`, `ContextualCompressionRetriever`, `SelfQueryRetriever`
[How to use a vectorstore as a retriever | 🦜️🔗 LangChain](https://python.langchain.com/docs/how_to/vectorstore_retriever/)
  * `RetrievalQA` / 自定义检索逻辑
使用 FAISS 或 Qdrant 进行嵌入式检索；结合 LangChain `Retriever`




## **各种模型的LLM接口**
OpenAI、Anthropic、Azure、Cohere、Qwen 等
[ChatHuggingFace — 🦜🔗 LangChain documentation](https://python.langchain.com/api_reference/huggingface/chat_models/langchain_huggingface.chat_models.huggingface.ChatHuggingFace.html#langchain_huggingface.chat_models.huggingface.ChatHuggingFace)
[langchain-huggingface: 0.3.0 — 🦜🔗 LangChain documentation](https://python.langchain.com/api_reference/huggingface/index.html)

 

## 各种控制台
[阿波罗API](http://api.ablai.top/)
[SiliconCloud](https://cloud.siliconflow.cn/sft-dc8ixac46v/models)
[API keys - OpenAI API](https://platform.openai.com/api-keys)
[Models - Hugging Face](https://huggingface.co/models)
[Dashboard - SerpApi - 搜索服务](https://serpapi.com/dashboard)
[LangSmith控制台 - Tracing Projects](https://smith.langchain.com/o/bb18f3b3-479a-40e1-b6ee-77b3d590fdc0/projects/p/417f4341-96da-4946-8b78-f8e02d587be8?timeModel=%7B%22duration%22%3A%227d%22%7D)

[账单明细 - Hugging Face – The AI community building the future.](https://huggingface.co/settings/billing)

易API： https://api.apiyi.com/token
ChatAi API： https://www.chataiapi.com/panel



## **OutputParsers输出解析器**
 将大模型输出转为结构化数据（JSON、Dict、Pydantic 模型），确保输出可被代码后续逻辑处理、函数调用：`PydanticOutputParser`, `StructuredOutputParser`, `RegexParser`
  * `PydanticOutputParser`
`StructuredTool`



## **Prompt模板系统**
`PromptTemplate`, `ChatPromptTemplate`, `FewShotPromptTemplate`
  * `ChatPromptTemplate` 构造输入
  * 模型结构化输出（如 sentiment、QA 分类等）
  * 多字段表单 / JSON 生成




## **链机制（Chain）**

，多个模块顺序组合，自动传参：`LLMChain`、`SequentialChain`、`SimpleSequentialChain`





## **调用工具**（Tool）
构建具备“调用外部工具能力”的大模型智能体（像 GPT-4 里的插件能力），工具类型有 搜索、代码执行、数据库、计算器、自定义 API 调用等：`@tool` 装饰器定义可调用函数
  * Tool 调用链条（action, observation）
  * 自定义工具（search, math, code interpreter, file IO）
注入搜索、Python REPL 等工具



## **Memory记忆系统**
多轮对话上下文保持，用户记忆建模：类型： 
`ConversationBufferMemory`：简单记忆上下文、
`ConversationTokenBufferMemory`：按 token 长度控制、
`ConversationSummaryMemory`：自动总结历史对话
  * `ConversationBufferMemory` / `SummaryMemory`
  * `langchain.memory.chat_message_histories` 结合数据库持久化

## **多阶段检索策略**
dense + sparse 混合检索、embedding rerank、hybrid retriever

## **RAG rerank 优化**
cross-encoder 重排序（如 BGE-reranker）、self-rerank、答案验证（verifier model）




## **多文档融合技术**
段落拼接 vs summary、答案对齐机制（如 RAG-fusion、FiD）


## LangChain4j

## 模型生态

- OpenAI API 家族、Anthropic、Mistral、Claude
- 国内模型如 Qwen、Baichuan、Zhipu、Deepseek



## **模型训练**


- 手把手教你使用服务器训练AI模型_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1TuxLeVED6/?spm_id_from=333.337.search-card.all.click&vd_source=2bebef67d77d9a55c602507243628b63
- 如何训练你自己的o1模型？TPO？？_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV17WyyY3EsE/?spm_id_from=333.337.search-card.all.click&vd_source=2bebef67d77d9a55c602507243628b63
- 3小时从0训练一个仅有27M的多模态GPT，个人显卡即可推理/训练！_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1Sh1vYBEzY/?spm_id_from=333.788.recommend_more_video.3&vd_source=2bebef67d77d9a55c602507243628b63
- 从0训练一个GPT小模型 Retriever-0.1B_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1Fe411m7oa/?spm_id_from=333.788.recommend_more_video.7&vd_source=2bebef67d77d9a55c602507243628b63


- 掌握使用开源模型（如 Qwen, Mistral, Yi）做微调
- 数据构造（instruction tuning, SFT）
- 轻量调参：LoRA、QLoRA、Delta tuning
- 工具：`transformers` + `peft` + `trl`
- 结合 RAG+LoRA 做 hybrid 系统（base 知识 + personalized fine-tune）


## 数据
**数据标注与评估**：Label Studio、OpenCompass、Ragas、GaiaEval
数据集构建：easy-dataset： https://github.com/ConardLi/easy-dataset

## **多智能体协作**
- 构建复杂智能体协作系统（例如规划-Agent、执行-Agent、记忆-Agent）
- 学习 LangGraph 或 Autogen 实现自动化工作流和决策树式智能体
- 引入任务计划、状态切换、失败恢复机制

## **性能调优**
- 异步处理、队列调度（Celery, FastAPI + asyncio）


## **大规模部署**
- 向量数据库服务化（如 Qdrant 服务端、pgvector + pg_bouncer）
- 多租户系统 / 用户隔离 / 权限控制
- 缓存与 streaming 优化（Redis、WebSocket、多轮响应）
    



## LangChain
**常用模块**
官方内核：`langchain_core`
社区插件：`langchain_community`

## LangGraph


**LangGraph**（原 LangChain Expression Language）：构建可视化 Agent 工作流图（多 Agent 调度），支持状态转移、回环、条件执行等逻辑，构建复杂多阶段智能体或流程自动化系统
使用 `StateGraph` 构建流程图；涵盖条件跳转、并行路径


使用 LangGraph，我们需要定义三件事：
1. 我们的应用程序的状态；[应用程序的状态](https://langchain-ai.github.io/langgraph/concepts/low_level/#state)控制着哪些数据被输入到应用程序中、在步骤之间传输以及由应用程序输出。它通常是`TypedDict`，但也可以是[Pydantic BaseModel](https://langchain-ai.github.io/langgraph/how-tos/state-model/)。
2. 我们的应用的节点（即应用步骤）；我们从两个步骤的简单序列开始：检索和生成。我们的检索步骤只是使用输入问题运行相似性搜索，而生成步骤将检索到的上下文和原始问题格式化为聊天模型的提示。
3. 我们的应用程序的“控制流”（例如，步骤的顺序）。  最后，我们将应用程序编译成一个`graph`对象。在这种情况下，我们只是将检索和生成步骤连接成一个序列。

LangGraph 还附带内置实用程序，用于可视化应用程序的控制流：

* 状态跟踪：问题 → 检索 → 回答
* 回答失败时进入反思节点（Self-Reflection）

* 工具调用失败 → fallback tool / 用户确认
* 分支决策节点（基于意图分流）


* 输出异常时 → 自动回退重新调用
* 结果验证器节点（对输出字段校验）
* 每轮对话结果写入记忆状态
* 查询历史回答节点


多模型调度
  * 按任务或预算分派不同模型（OpenAI, Qwen, Claude）
  * `RunnableLambda` + `RouterRunnable` 实现模型选择
  * 条件路由节点（语言、成本、模型性能等）


| 🚨 异常处理 | LangGraph `error` 事件处理器 |
| ------- | ----------------------- |



## langSmith
[Get started with LangSmith | 🦜️🛠️ LangSmith](https://docs.smith.langchain.com/)

* ✅ 应用：
* 每个主要模块链进行追踪
* 对失败节点重试、优化 prompt


  * `@traceable`
  * `wrap_openai`, `wrap_chat_model`, `wrap_tool`
  * 自定义 `tracer = LangChainTracer()` 进行链路可视化

## SpringAI

- 1小时完成一个AI项目实战.SpringAI+AIGC落地实战_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1C5UxYuEc2/?spm_id_from=333.337.search-card.all.click&vd_source=2bebef67d77d9a55c602507243628b63
- 全新SpringBoot+SpringAI+Vue3大模型全栈开发_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV14y411q7RN/?spm_id_from=333.337.search-card.all.click&vd_source=2bebef67d77d9a55c602507243628b63

- 项目介绍 | 起凡Code闲聊： https://www.jarcheng.top/blog/project/spring-ai/intro.html




## 教程资料



- 黑马程序员DeepSeek+Cursor+Devbox+Sealos带你零代码搞定实战项目开发部署视频教程，基于AI完成项目的设计、开发、测试、联调、部署全流程_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1ig9jYUERk/?vd_source=2bebef67d77d9a55c602507243628b63
- AI大模型全套教程（LLM+RAG+Langchain+国产大模型ChatGLM-4+NLP新模型Transformer）-马士兵_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1g1CKYUExu/?spm_id_from=333.337.search-card.all.click&vd_source=2bebef67d77d9a55c602507243628b63

- 零基础入门：AI大模型应用开发_哔哩哔哩_bilibili： https://www.bilibili.com/video/BV1JZ421u7Xo/?spm_id_from=333.337.search-card.all.click&vd_source=2bebef67d77d9a55c602507243628b63




## 其它

### ReAct思维逻辑

- **先思考：** 这个问题能直接回答吗？
- **若不能回答：** 调用某个工具函数（如搜索、数据库、计算器）
- **观察返回值：** 接收工具输出，继续下一轮 Reason    
- **最后生成答案**

```text
Question: What is the weather in Beijing?

Thought: I need to look up the current weather in Beijing.
Action: get_weather[Beijing]

Observation: It's always sunny in Beijing!

Thought: I now know the weather.
Answer: It's always sunny in Beijing!
```


## END
