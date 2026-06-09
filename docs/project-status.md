# 项目状态总览

最后更新：2026-06-10

## 1. 项目定位

- 项目名称：`Art&Craft`
- 目标：以中国传统工艺与器物为核心，建设一个可持续录入、可发布、可扩展的内容型网站
- 线上地址：[https://art-craft-site.vercel.app/](https://art-craft-site.vercel.app/)

## 2. 当前技术结构

- 前端框架：`Next.js`
- 内容主表：[`data/demo/artcraft-master.csv`](/Users/ougonbai/Desktop/Antigravity workspace/Art&Craft/data/demo/artcraft-master.csv)
- 生成数据：[`src/data/generated/master-content.json`](/Users/ougonbai/Desktop/Antigravity workspace/Art&Craft/src/data/generated/master-content.json)
- 图片主目录：[`public/images/`](/Users/ougonbai/Desktop/Antigravity workspace/Art&Craft/public/images)

## 3. 当前已经稳定下来的工作流

1. 在 `artcraft-master.csv` 中维护内容
2. 在 `public/images/...` 中补充对应图片
3. 本地执行导入与构建检查
4. 提交到 GitHub
5. 由 Vercel 自动部署

## 4. 当前内容模型

当前主表已经纳入这些内容类型：

- `record_type = object`
- `record_type = term`
- `record_type = timeline`

其中：

- `object` 驱动物件列表、详情页、搜索筛选、相关推荐、参考文献
- `term` 用于 glossary / concept 等延伸阅读能力
- `timeline` 驱动首页时代长廊及后续时代内容

## 5. 已完成的主要页面能力

- 首页
- 物件列表 / 浏览物件
- 物件详情页
- 搜索页
- 探索理念列表页
- 探索理念详情页基础结构
- 时代长廊首页模块

## 6. 已稳定的录入规则文档

- 团队 CSV 与图片录入规则：
  - [`docs/team-csv-entry-guide.md`](/Users/ougonbai/Desktop/Antigravity workspace/Art&Craft/docs/team-csv-entry-guide.md)
- 单表内容系统说明：
  - [`docs/content-demo-import.md`](/Users/ougonbai/Desktop/Antigravity workspace/Art&Craft/docs/content-demo-import.md)
- Vercel 发布说明：
  - [`docs/vercel-deploy-checklist.md`](/Users/ougonbai/Desktop/Antigravity workspace/Art&Craft/docs/vercel-deploy-checklist.md)

## 7. 内容维护原则

- 一个 `slug` = 一个对象唯一 ID
- 一个 `object` 对应一个图片文件夹
- CSV 中填写的是网站路径，不是本地电脑路径
- glossary / concept / timeline 尽量通过主表关联，不拆成多张来源表

## 8. 当前协作建议

- 日常新增内容时，优先只改两处：
  - `artcraft-master.csv`
  - `public/images/...`
- 涉及页面结构、交互、样式时，再改代码
- 为了保持 Codex 响应速度，后续建议按“单批任务”推进，并用新的线程继续开发
