# 第一轮最小模板怎么填

这份文件配合：

- [`data/demo/artcraft-objects-minimal-template.csv`](/Users/ougonbai/Desktop/Antigravity%20workspace/Art&Craft/data/demo/artcraft-objects-minimal-template.csv)

它的目标是：  
让你第一轮只填一张 `object` 主表，就能同时建立：

- 物件详情
- 时代归属
- 材质归属
- 理念关联

---

## 一行代表什么

一行 = 一件工艺品

---

## 页面上这几个标题是谁来填

- `文物名片`
  - 这是详情页的固定栏目名。
  - 不需要你在 CSV 单独填写。
  - 你填的 `dynasty_zh_hans`、`material_zh_hans`、`summary_zh_hans`、`overview_zh_hans` 会显示在这个栏目下面。

- `工艺品鉴`
  - 这是详情页的固定模块标题。
  - 不需要你在 CSV 单独填写。

- `craft_title_zh_hans`
  - 这不是模块标题。
  - 这是 `工艺品鉴` 模块里面那一行更小的标题，应该填“具体工艺名”。
  - 例如：`兔毫`、`剔犀`、`缂丝`、`鎏金`

- `culture_title_zh_hans`
  - 这是文化模块标题。
  - 第一轮最常见的填法就是 `文化解读`。

---

## 这一张表为什么够用

这张表现在不仅仅是在写“物件本身”，还同时承担 3 个逻辑关系：

- `era_slug`
  - 这个物件属于哪个时代
- `material_slug`
  - 这个物件属于哪个材质分类
- `concept_slugs`
  - 这个物件对应哪些理念

所以你后面不需要再另外填一张 `timeline` 表，或另外填一张“材质表”。
先把关系写在 object 上，网站就能用这些字段去组织页面。

---

## 每一列怎么填

## 1. `slug`

你可以把它理解成：

- 这件工艺品的唯一英文代号
- 页面地址的一部分
- 图片文件夹的名字

### 你应该填什么

填一个全小写英文短名，用 `-` 连接。

### 示例

```text
southern-song-longquan-bowl
tang-gilt-flower-tray
qing-ivory-bird-fan
```

### 它和图片怎么对应

如果你的 `slug` 是：

```text
southern-song-longquan-bowl
```

那图片文件夹就应该是：

```text
public/images/objects/southern-song-longquan-bowl/
```

---

## 2. `title_zh_hans`

你可以把它理解成：

- 页面标题
- 物件卡片标题

### 你应该填什么

这件工艺品的简体中文正式名称。

### 示例

```text
南宋龙泉青瓷碗
唐代花口鎏金托盘
清代象牙丝编花鸟纹扇
```

---

## 3. `accession_number`

你可以把它理解成：

- 馆藏编号
- 内部编号

### 你应该填什么

如果你有正式编号，就填正式编号。  
如果没有，可以先填你临时整理用的编号。

### 示例

```text
No. 2026-001
No. 2026-002
```

---

## 4. `dynasty_zh_hans`

你可以把它理解成：

- 页面上的朝代标签
- 搜索筛选里的朝代信息

### 你应该填什么

这件工艺品所属朝代。

### 示例

```text
南宋
唐代
清代
```

---

## 5. `era_slug`

你可以把它理解成：

- 这个物件在网站逻辑上属于哪个时代
- 它会被归进哪个 `时代长廊` 分组

### 你应该填什么

推荐直接用现成的英文键：

```text
tang
song
yuan
ming
qing
```

### 重要区别

- `dynasty_zh_hans`
  - 是显示给用户看的中文朝代文字
- `era_slug`
  - 是网站内部用来建立关联的逻辑键

---

## 6. `material_zh_hans`

你可以把它理解成：

- 页面上的材质标签

### 你应该填什么

最核心的材质名称。

### 示例

```text
青瓷
铜鎏金
象牙、丝编
```

---

## 7. `material_slug`

你可以把它理解成：

- 这个物件在网站逻辑上属于哪个材质分类

### 你应该填什么

推荐直接用这些英文键：

```text
ceramic
lacquer
metalwork
glass
textile
wood-bamboo
```

### 重要区别

- `material_zh_hans`
  - 是显示给用户看的中文材质文字
- `material_slug`
  - 是网站内部做筛选和归类的逻辑键

---

## 8. `concept_slugs`

你可以把它理解成：

- 这个物件对应哪些“探索理念”

### 你应该填什么

填理念英文键，多个值用 `||`

### 当前可用值

```text
fusion
harmony
zen
utility
```

### 示例

```text
utility||zen
fusion
harmony||utility
```

---

## 9. `summary_zh_hans`

你可以把它理解成：

- 卡片上的一句话介绍
- 搜索页上的短摘要

### 你应该填什么

一句话概括这件工艺品最重要的特点。

### 示例

```text
器形简净，釉色温润，是南宋日用审美的重要代表。
```

---

## 10. `overview_zh_hans`

你可以把它理解成：

- 详情页顶部正文

### 你应该填什么

写 1 到 2 段最基础的介绍文字。

### 如果分段怎么写

用 `||` 分隔。

### 示例

```text
这件青瓷碗适合用来展示南宋器物的比例和釉色特点。||它也适合测试详情页长文本是否足够承载真实内容。
```

---

## 11. `hero_image`

你可以把它理解成：

- 这件工艺品的主图

### 它会显示在哪里

- 首页卡片
- `/objects`
- `/search`
- 详情页顶部主图

### 你应该填什么

这件工艺品最标准的一张代表图的路径。

### 示例

```text
/images/objects/southern-song-longquan-bowl/hero.jpg
```

---

## 12. `craft_title_zh_hans`

你可以把它理解成：

- `工艺品鉴` 模块的小标题

### 你应该填什么

填这个物件对应的“具体工艺名”，不要填 `工艺品鉴`。

### 示例

```text
兔毫
剔犀
缂丝
```

---

## 13. `craft_summary_zh_hans`

你可以把它理解成：

- `工艺品鉴` 模块的短说明

### 你应该填什么

一句话说明这个工艺点。

---

## 14. `craft_image`

你可以把它理解成：

- `工艺品鉴` 模块旁边那张图

### 你应该填什么

与工艺有关的图：

- 工序图
- 材料图
- 工艺特写图

### 示例

```text
/images/objects/southern-song-longquan-bowl/craft-01.jpg
```

---

## 15. `culture_title_zh_hans`

你可以把它理解成：

- `文化解读` 模块标题

### 最常见填法

```text
文化解读
```

如果你以后有更细的栏目名，也可以改。

---

## 16. `culture_body_zh_hans`

你可以把它理解成：

- `文化解读` 模块正文

### 你应该填什么

这件东西为什么重要，它的文化背景是什么。

### 分段规则

还是用 `||`

### 示例

```text
这件器物可以帮助理解宋代器用之美。||它不仅是日用品，也承载了当时的审美判断。
```

---

## 17. `culture_image_1`

你可以把它理解成：

- `文化解读` 模块里的图

### 你应该填什么

与文化背景、使用场景、时代语境有关的图。

### 示例

```text
/images/objects/southern-song-longquan-bowl/culture-01.jpg
```

---

## 18. `culture_image_1_caption_zh_hans`

你可以把它理解成：

- `文化解读` 图片下面显示的图片标题

### 你应该填什么

填这张文化图片的名称、作品名或说明标题。

### 示例

```text
宋徽宗赵佶《听琴图》局部
```

如果暂时没有，可以先留空。

---

## 19. `featured_on_home`

你可以把它理解成：

- 这件工艺品要不要出现在首页“浏览物件”

### 填法

- `true`
- `false`

### 建议

如果这是第一轮你重点展示的工艺品，就填：

```text
true
```

---

## 最小模板和图片怎么对应

如果你的图片目录是：

```text
public/images/objects/southern-song-longquan-bowl/
  hero.jpg
  craft-01.jpg
  culture-01.jpg
```

那最小模板对应列应该这样填：

```text
slug = southern-song-longquan-bowl
era_slug = song
material_slug = ceramic
concept_slugs = utility||harmony
hero_image = /images/objects/southern-song-longquan-bowl/hero.jpg
craft_image = /images/objects/southern-song-longquan-bowl/craft-01.jpg
culture_image_1 = /images/objects/southern-song-longquan-bowl/culture-01.jpg
culture_image_1_caption_zh_hans = 宋徽宗赵佶《听琴图》局部
```

这三列就是你最容易选错图片的位置，所以你只要记住：

- `hero_image` = 主图
- `craft_image` = 工艺图
- `culture_image_1` = 文化图
- `culture_image_1_caption_zh_hans` = 文化图下面的图片标题
