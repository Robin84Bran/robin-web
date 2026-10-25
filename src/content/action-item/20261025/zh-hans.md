---
title: "第一件原型必须回答一个问题"
date: 2026-10-25
updated: 2026-10-25
section: Ouroboros
series: Daily Action Item
categories:
  - Entrepreneurship
  - One Person Company
  - Prototyping
tags:
  - Prototype
  - Simulation
  - Product Evidence
  - AI Native Company
keywords:
  - question first prototype
  - prototype evidence ladder
  - simulation validation
  - one person company
  - SimReady
excerpt: "第一件原型的价值，是在最便宜且真实的证据阶段解决一个重要未知。"
hero: /action-item/20261025/hero.webp
ogImage: /action-item/20261025/og.webp
canonical: "https://iamrobin.ai/ouroboros/202610/20261025/action_item/zh-hans/"
author: https://iamrobin.ai/#person
inLanguage: zh-Hans
languageSlug: zh-hans
translationOf: "https://iamrobin.ai/ouroboros/202610/20261025/action_item/"
translationReview: PASS
draft: false
sourceAction: "Daily Briefing 2026-10-25, item 5"
ledgerId: PROTOTYPE-QUESTION-20261025
visualHeadline: "一个原型，一个问题。"
visualSubhead: "图像 · CAD · 模拟 · 实体测试"
visualFooter: "先要证据，再要精致"
visualNodes: "问题|最便宜测试|验收|学习"
thesis: "第一件原型应在最便宜且真实的证据阶段解决一个关键未知，并保留结果改变了什么。"
---

一件漂亮的原型可能毫无用处。

它可以很上镜，让人点头，却完全没有触碰真正的问题：手能否握住它？它会不会受热变形？机构会不会卡住？第一次看到的人能否理解用途？如果团队从未先选定问题，几乎任何精致物件都能被解释成进展。

第一件原型需要一个更小的任务：回答一个问题。

这不是限制创造力。问题会告诉你最少要做什么、什么算证据、什么时候应该停下。

## 四种看起来相近、证据却不同的对象

图像可以检验想法是否易懂，也可以比较比例、风格、颜色和第一眼传达的故事。它几乎不能说明重量、平衡、受热、冲击、制造公差或反复使用。

CAD 可以检验几何。零件在切割材料之前即可测量、装配、检查碰撞并反复修改。[OpenUSD](https://openusd.org/release/index.html)还能让几何与装配结构在不同工具之间保留。几何本身仍不会自动产生有效的物理行为。

模拟可以检验一套明确写出的现实模型。[SimReady Foundation](https://nvidia.github.io/simready-foundation/)为模拟资产定义配置与检查。[NVIDIA 的 CAD-to-SimReady 示例](https://developer.nvidia.com/blog/5-steps-to-create-simready-assets-for-robotics-with-frontier-ai-models/)从 ABB YuMi 的 CAD 资产开始，补充外观、碰撞几何、关节、质量、摩擦、驱动与运行验证，最后在 Isaac Sim 完成四轮抓取与放置。

这是真实而有限的证据：配置后的资产在那些模拟轨迹中表现合格。它没有证明实体机器人已经制造，没有证明摩擦参数适合所有现实表面，也没有证明产品能承受无控制环境。[Isaac Sim 文档](https://docs.isaacsim.omniverse.nvidia.com/latest/index.html)把它定义为开发环境；模型始终带着假设。

实体原型才会遇到世界：抓握、重量、变形、渗漏、温度、反光、破裂、清洁、不适和意外。它提供屏幕无法给出的材料与人体证据，也更昂贵、更难修改。

这四类对象构成证据阶梯。每上一层，都能回答下一层以下无法回答的问题；若关键未知本来属于低一层，向上跳也会浪费钱。

## 先写下可能杀死想法的句子

在选择软件或材料之前，先写一句：

> 这件原型存在，是为了判断 ______ 是否成立。

空格里应该是一项会改变下一步决策的未知。

“人们是否喜欢它”太宽松，任何反应都能被重新解释。“第一次使用的人能否在没有说明的情况下，于20秒内找到握持处并打开物件”则更清楚：它写出了人、行为、时间与协助边界。

“玻璃是否可行”也太宽。玻璃可能与外观、温度、耐化学性、清洁、重量或破裂有关，每个问题需要不同试件与验收。黏土模型可以回答形状与抓握；软材料模型可以暴露变形与舒适度；玻璃试件可以检验光学、热、清洁或断裂。若真正未知是形状，先做玻璃成品只会变贵。

最便宜且真实的测试，是能够改变决策的最低一层。

## 在动手之前写好结果规则

若验收规则预先写下，原型就更难欺骗团队。一份紧凑记录只需六项：

1. 问题；
2. 能回答问题的最便宜证据阶段；
3. 验收结果与失败条件；
4. 时间与成本上限；
5. 观察，包括尴尬或负面证据；
6. 下一步：继续、修改、换阶段或停止。

规则不需要虚假精度。五人的抓握测试无法证明市场，却可能清楚显示没有人知道如何拿起物件。模拟机构不能证明工厂可靠性，却可能显示两个零件在所有预定路径上都会碰撞。

负面结果必须留下。失败的廉价模型可能省下一轮昂贵模具；加入真实物理后拒绝工作的模拟也产生了信息。只有当团队掩盖失败，并用同一假设继续建造时，失败才变成浪费。

## 让 AI 压缩循环，而不是抹掉证据边界

AI 可以减少问题与测试之间的工作。在 NVIDIA 的例子中，GPT-6 Astra 帮助编写调用 Omniverse 工具的 Python，流程仍需要源文件、规范、物理配置、验证与检查。[CAD-to-SimReady skill](https://github.com/NVIDIA/skills/tree/main/skills/omniverse-cad-to-simready)组织了这些工作，却没有替人决定模拟能证明什么。

这正是一人公司里代理的合适角色：整理参考资料、产生变体、准备几何、运行检查、保存失败、起草下一次测试。所有者保留问题、验收边界与后续决策。

代理可以几秒钟生成图片，也能快速做 CAD 草稿或配置模拟。这些提速是实际投入，结论仍受证据阶段约束。

## 第一件原型是一件决策工具

第一版不必像成品。它可以是一张打印图片、一块纸板轮廓、一团黏土、一件软材料模型、一套 CAD 装配，或只有一条已验证轨迹的模拟。价值来自它消除了哪项未知。

选一个问题，选择最便宜且真实的阶段，写好验收规则，记录时间、成本、结果与失败，再让证据决定下一件原型是否值得存在。

精致可以稍后到来。当第一件原型让下一步更清楚时，它已经完成了任务。
