# Codex Handoff

日期：2026-06-10  
适用场景：新线程接手当前开发任务

## 1. 仓库与发布信息

- 仓库目录：[`/Users/ougonbai/Desktop/Antigravity workspace/Art&Craft`](/Users/ougonbai/Desktop/Antigravity workspace/Art&Craft)
- Git 分支：`main`
- 线上地址：[https://art-craft-site.vercel.app/](https://art-craft-site.vercel.app/)

## 2. 优先读取的仓库文档

新线程开始时，优先读这三份：

1. [`docs/project-status.md`](/Users/ougonbai/Desktop/Antigravity workspace/Art&Craft/docs/project-status.md)
2. [`docs/team-csv-entry-guide.md`](/Users/ougonbai/Desktop/Antigravity workspace/Art&Craft/docs/team-csv-entry-guide.md)
3. [`docs/vercel-deploy-checklist.md`](/Users/ougonbai/Desktop/Antigravity workspace/Art&Craft/docs/vercel-deploy-checklist.md)

## 3. 当前系统状态

- 网站内容主来源是：
  - [`data/demo/artcraft-master.csv`](/Users/ougonbai/Desktop/Antigravity workspace/Art&Craft/data/demo/artcraft-master.csv)
- 图片目录主来源是：
  - [`public/images/objects`](/Users/ougonbai/Desktop/Antigravity workspace/Art&Craft/public/images/objects)
  - [`public/images/concepts`](/Users/ougonbai/Desktop/Antigravity workspace/Art&Craft/public/images/concepts)
  - [`public/images/timeline`](/Users/ougonbai/Desktop/Antigravity workspace/Art&Craft/public/images/timeline)

当前站点已经是：

- `master.csv + 图片 + GitHub + Vercel` 工作流
- `prebuild` 会自动执行 CSV 导入

## 4. 本轮接力前的最新任务

用户刚刚更新了新的 `artcraft-master.csv` 和对应图片：

- 新增了 6 个 Tang object
- 新增了 2 个 Ming object
- 要求删除网站中原始给的 object 占位图 / 占位物件
- 新增 object 暂时不用补 glossary / concept 关联，可以先留空
- 如果遇到需要主观判断的地方，先问用户再决定

## 5. 已确认的可直接处理项

### 5.1 旧占位物件来源已处理

文件：
- [`src/data/catalog.ts`](/Users/ougonbai/Desktop/Antigravity workspace/Art&Craft/src/data/catalog.ts)

已改为：

- 优先只使用导入的 object
- 仅在导入数据为空时，才回退到占位数据

旧 concept / glossary / timeline 中若残留旧 object slug 引用，页面会跳过缺失关联，不再混入旧占位物件。

### 5.2 新图片目录已存在

已确认这些目录存在：

- `public/images/objects/tang-putaohuaniaowenyin-xiangnang/`
- `public/images/objects/tang-haishouputaowen-jing/`
- `public/images/objects/tang-tangsancaizaiyueluotuo-yong/`
- `public/images/objects/tang-liujinkuibanyin-chatuo/`
- `public/images/objects/tang-zitanmuhuaxie-shi/`
- `public/images/objects/tang-liujihongyanwenyincha-caozi/`
- `public/images/objects/ming-qingyumingtaizuyi-ce/`

## 6. 已发现但需要小心处理的问题

### 6.1 slug 与图片目录不一致已解决

用户已确认使用：

- `tang-tangsancaizaiyueluotuo-yong`

CSV slug 与图片目录已统一为：

- `tang-tangsancaizaiyueluotuo-yong`

### 6.2 某些字段可补，但部分属于弱推断

新增对象里有一些字段是空的，例如：

- `material_slug`
- `object_kind_slug`
- `search_colors_zh_hans`
- `search_materials_zh_hans`

其中：

- `search_materials_zh_hans` 可以较安全地按页面检索需求补充
- `search_colors_zh_hans` 可根据文案和图片做保守补充
- `material_slug`、`object_kind_slug` 若涉及“玉石器归到哪一类”“镜、册、槽子算哪种器型”等，属于规则层判断，必要时先问用户

### 6.3 已发现一处可直接修正的图片字段已处理

`tang-haishouputaowen-jing` 这一行中：

- `craft_image` 已指向 `craft-01.png`
- `culture_image_1` 已指向 `culture-01.png`

编号规则已确认：按当前 CSV 中 object 行顺序，从 `No. 2026-001` 连续递增。

## 7. 新线程建议的第一轮执行顺序

1. 读取本 handoff 和上述三份 docs
2. 检查 `artcraft-master.csv` 当前未提交改动
3. 先处理无歧义内容：
   - 接入新增 object
   - 修复可确定的图片路径
   - 从前台移除旧占位物件
4. 本地验证：
   - `npm run import:demo`
   - `npm test -- src/data/catalog.test.ts src/data/home.test.ts`
   - `npm run build`
5. 再给用户本地预览或结果总结

## 8. 新线程可直接使用的启动词

把下面这段直接发到新线程即可：

```text
继续 Art&Craft 项目开发。请只基于仓库文档和 handoff 工作，不要回读旧长线程。

先读：
1. docs/project-status.md
2. docs/team-csv-entry-guide.md
3. docs/vercel-deploy-checklist.md
4. docs/codex-handoff-2026-06-10.md

当前任务：
- 接手最新更新的 artcraft-master.csv 和 object 图片
- 删除网站里旧的 object 占位物件
- 处理能确定的字段补全
- glossary / concept 暂时保持为空
- 如果遇到需要主观判断的地方，先问我再决定

先给我一个简短状态判断，再直接开始做。
```

## 9. 备注

这份 handoff 的目标是让新线程不依赖历史聊天上下文，只依赖：

- 仓库文档
- 当前代码
- 当前 CSV
- 当前图片目录

这样可以明显降低上下文负担，加快后续开发速度。
