# 团队录入规则：`artcraft-master.csv` 与图片目录

这份文档给团队成员直接使用。  
目标是让大家在在线表格中填写时，知道：

- 每一行填什么
- 图片怎么命名
- 图片放在哪里
- CSV 里写什么路径

## 一句话原则

- 一行 = 一个内容对象
- 一个 `slug` = 一个对象的唯一 ID
- 一个对象一个文件夹
- CSV 里填的是网站路径，不是电脑本地路径

---

## 1. 当前主要填写哪种内容

目前团队最常填写的是：

- `object` 物件

也就是说，在线表格里每一行代表一件工艺品 / 器物。

---

## 2. 必填字段

每条 `object` 至少要填这些列：

- `record_type`
- `slug`
- `title_zh_hans`
- `accession_number`
- `dynasty_zh_hans`
- `material_zh_hans`
- `summary_zh_hans`
- `overview_zh_hans`
- `hero_image`
- `craft_title_zh_hans`
- `craft_summary_zh_hans`
- `craft_image`
- `culture_title_zh_hans`
- `culture_body_zh_hans`
- `culture_image_1`

建议同时填写这些列，方便搜索和筛选：

- `era_slug`
- `material_slug`
- `object_kind_slug`
- `concept_slugs`
- `related_term_slugs`
- `search_colors_zh_hans`
- `search_materials_zh_hans`

如果有来源信息，也建议填写：

- `reference_labels_zh_hans`
- `reference_hrefs`

---

## 3. 每一列怎么理解

### 基本信息

- `record_type`
  - 固定填：`object`

- `slug`
  - 这件物件的唯一英文 ID
  - 也会用作：
    - 页面 URL
    - 图片文件夹名称
    - 数据关联键

- `title_zh_hans`
  - 中文标题
  - 例：`宋汝窑洗`

- `accession_number`
  - 编号
  - 例：`No. 2026-007`

- `dynasty_zh_hans`
  - 朝代显示文字
  - 例：`宋`

- `material_zh_hans`
  - 页面上展示的材质
  - 例：`瓷器`、`漆器`、`织绣`

### 筛选与关联

- `era_slug`
  - 朝代逻辑键
  - 推荐值：
    - `tang`
    - `song`
    - `yuan`
    - `ming`
    - `qing`

- `material_slug`
  - 材质逻辑键
  - 推荐值：
    - `ceramic`
    - `lacquer`
    - `metalwork`
    - `glass`
    - `textile`
    - `wood-bamboo`
    - `ivory`

- `object_kind_slug`
  - 器型逻辑键
  - 推荐值：
    - `bowl`
    - `cup`
    - `fan`
    - `pot`
    - `tray`
    - `stove`
    - `hat`
    - `clothes`
    - `case`
    - `stand`
    - `object`

- `concept_slugs`
  - 这件物件关联到哪些理念
  - 多个值用 `||`
  - 当前常用值：
    - `utility`
    - `harmony`
    - `fusion`
    - `zen`
  - 例：
    - `harmony||utility`

- `related_term_slugs`
  - 这件物件在“延伸阅读”里关联哪些词条
  - 多个值用 `||`
  - 例：
    - `scholar-aesthetics||tea-culture`

### 搜索筛选字段

- `search_colors_zh_hans`
  - 颜色筛选
  - 多个值用 `||`
  - 例：
    - `青色||蓝色||白色`

- `search_materials_zh_hans`
  - 材料筛选
  - 多个值用 `||`
  - 例：
    - `瓷器||汝窑||笔洗`
    - `织绣||罗||背心||宋锦`

### 正文内容

- `summary_zh_hans`
  - 短摘要
  - 用于列表页、顶部简介
  - 建议 1-2 句

- `overview_zh_hans`
  - 物件正文
  - 多段请用 `||` 分段
  - 例：
    - `第一段||第二段||第三段`

- `craft_title_zh_hans`
  - `工艺品鉴` 模块的小标题
  - 填具体工艺名
  - 例：`点翠`、`开片`、`剔犀`

- `craft_summary_zh_hans`
  - 工艺品鉴正文
  - 多段也用 `||`

- `culture_title_zh_hans`
  - 一般填：`文化解读`

- `culture_body_zh_hans`
  - 文化解读正文
  - 多段也用 `||`

### 图片与参考文献

- `hero_image`
  - 物件主图路径

- `craft_image`
  - 工艺品鉴图片路径

- `culture_image_1`
  - 文化解读图片路径

- `culture_image_1_caption_zh_hans`
  - 文化解读图片标题

- `reference_labels_zh_hans`
  - 参考文献标题
  - 多个值用 `||`

- `reference_hrefs`
  - 参考文献链接
  - 多个值用 `||`
  - 顺序必须和 `reference_labels_zh_hans` 一一对应

---

## 4. 多段文字怎么填

### 规则

在在线表格里，不要手动换多行。  
如果一列内容需要分段，就用：

```text
||
```

作为段落分隔符。

### 示例

```text
第一段内容||第二段内容||第三段内容
```

适用于：

- `overview_zh_hans`
- `craft_summary_zh_hans`
- `culture_body_zh_hans`

---

## 5. 多个标签怎么填

多个值也统一用：

```text
||
```

### 示例

```text
青色||蓝色||白色
```

适用于：

- `concept_slugs`
- `related_term_slugs`
- `search_colors_zh_hans`
- `search_materials_zh_hans`
- `reference_labels_zh_hans`
- `reference_hrefs`

---

## 6. 图片如何命名

### 每个 object 一个文件夹

路径结构：

```text
public/images/objects/<slug>/
```

例如：

```text
public/images/objects/song-ruyao-xi/
```

### 当前最常用的图片命名

- `hero.png`
- `craft-01.png`
- `culture-01.png`
- `culture-02.png`

也可以是 `.jpg`，但同一个对象里最好统一。

### 推荐理解

- `hero`
  - 顶部主图
- `craft-01`
  - 工艺图
- `culture-01`
  - 文化解读图 1
- `culture-02`
  - 文化解读图 2

---

## 7. CSV 里图片地址怎么写

注意：

- 不是填你电脑上的 Finder 路径
- 不是填 `/Users/...`
- 要填网站路径

### 本地真实文件

```text
public/images/objects/song-ruyao-xi/hero.png
```

### CSV 里填写

```text
/images/objects/song-ruyao-xi/hero.png
```

规则就是：

- 文件放在 `public/...`
- CSV 里写 `/images/...`

---

## 8. 命名规范

### `slug` 命名规则

- 全小写
- 用英文或拼音
- 单词之间用 `-`
- 不要空格
- 不要括号
- 不要中文标点

### 推荐示例

```text
song-ruyao-xi
song-mudanhualuobeixin-yi
ming-qinghuahaishuibailongwenbian-hu
```

### 不推荐示例

```text
宋汝窑洗
ruyao xi
final-version-1
图片2
```

---

## 9. 一条完整示例

这里给一个可以参考的 object：

```text
record_type = object
slug = song-ruyao-xi
title_zh_hans = 宋汝窑洗
accession_number = No. 2026-007
dynasty_zh_hans = 宋
material_zh_hans = 瓷器
era_slug = song
material_slug = ceramic
object_kind_slug = bowl
concept_slugs = harmony||utility
related_term_slugs = scholar-aesthetics
search_colors_zh_hans = 青色
search_materials_zh_hans = 瓷器||汝窑||笔洗
summary_zh_hans = 宋代文人案头常见的瓷质笔洗，器型温润简雅。
overview_zh_hans = 第一段||第二段
hero_image = /images/objects/song-ruyao-xi/hero.png
craft_title_zh_hans = 开片
craft_summary_zh_hans = 第一段||第二段
craft_image = /images/objects/song-ruyao-xi/craft-01.png
culture_title_zh_hans = 文化解读
culture_body_zh_hans = 第一段||第二段
culture_image_1 = /images/objects/song-ruyao-xi/culture-01.png
culture_image_1_caption_zh_hans = 宋 佚名《梧阴清暇图轴》
reference_labels_zh_hans = 故宫博物院藏品详情
reference_hrefs = https://example.com
```

---

## 10. 团队填写时最容易出错的 5 件事

1. `slug` 改来改去  
同一个对象的 `slug` 一旦定了，就不要再改。

2. 图片文件夹名和 `slug` 不一致  
必须完全一致。

3. CSV 里写本地电脑路径  
不要写 `/Users/...`，只写 `/images/...`

4. 多段文字直接敲回车  
在线表格里统一用 `||`

5. 参考文献标题和链接数量不一致  
如果有 2 个标题，就必须有 2 个链接，顺序一一对应。

---

## 11. 当前推荐的团队协作流程

1. 先定 `slug`
2. 在 `public/images/objects/<slug>/` 下放图
3. 按规则命名：
   - `hero`
   - `craft-01`
   - `culture-01`
4. 在在线表格里填写这一行
5. 把表格内容复制进 `artcraft-master.csv`
6. 运行导入和本地预览检查

