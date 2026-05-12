# 长期内容录入与素材目录规范

这份文档是项目后续持续录入内容时的统一规则。  
目标不是只让第一轮 demo 跑通，而是让你后面整理几十条、上百条工艺品时仍然不会乱。

核心原则只有一句话：

- **用文件夹层级区分“内容实体”**
- **用文件名区分“图片角色”**

这意味着：

- 不能只靠文件名管理图片
- 也不能只靠朝代分类图片
- 应该按内容类型和具体条目建立文件夹

---

## 1. 我们长期采用的管理思路

### 1. 内容实体优先

图片和文字最终服务的是“某一条网站内容”，不是服务一个宽泛的朝代目录。

所以真正应该作为归档单位的是：

- 某一个物件
- 某一个理念页
- 某一个时代页
- 某一个 glossary 词条

而不是单纯按：

- 宋代
- 唐代
- 清代

去建图片大仓库。

### 2. 朝代是内容字段，不是主目录逻辑

朝代应该写进 CSV 或数据库字段里，例如：

- `dynasty_zh_hans = 宋代`

但图片目录不建议按朝代做第一层归档，否则后期很容易出现这些问题：

- 同一张文化延伸图可能关联多个条目
- 同一个理念会跨多个朝代
- 你会更难从目录快速判断“这张图是给哪条页面内容用的”

### 3. 文件夹负责隔离，文件名负责表达角色

例如：

```text
public/images/objects/song-jian-ware-tea-bowl/hero.jpg
public/images/objects/song-jian-ware-tea-bowl/craft-01.jpg
public/images/objects/song-jian-ware-tea-bowl/culture-01.jpg
```

这里的含义非常清楚：

- `objects`
  - 内容类型
- `song-jian-ware-tea-bowl`
  - 具体哪一条内容
- `hero / craft / culture`
  - 这张图在该内容里的用途

---

## 2. 长期推荐目录结构

以后统一按这个结构来：

```text
public/
  images/
    objects/
      <object-slug>/
        hero.jpg
        object-01.jpg
        detail-01.jpg
        craft-01.jpg
        culture-01.jpg
        gallery-01.jpg

    concepts/
      <concept-slug>/
        hero.jpg
        section-01.jpg
        section-02.jpg
        diagram-01.jpg

    timeline/
      <timeline-slug>/
        hero.jpg
        section-01.jpg
        gallery-01.jpg

    glossary/
      <glossary-slug>/
        hero.jpg
        step-01.jpg
        step-02.jpg
        video-cover.jpg
```

这 4 个一级目录分别对应：

- `objects`
  - 物件
- `concepts`
  - 理念专题
- `timeline`
  - 时代页
- `glossary`
  - 工艺词条

---

## 3. 你应该如何理解“路径”

CSV 里填写的 **不是你电脑 Finder 里的绝对路径**。

不要填这种：

```text
/Users/你的名字/Desktop/素材/茶碗.jpg
```

CSV 里应该填这种：

```text
/images/objects/song-jian-ware-tea-bowl/hero.jpg
```

对应的真实文件位置是：

```text
public/images/objects/song-jian-ware-tea-bowl/hero.jpg
```

记忆方法：

- 文件真实位置：`public/...`
- CSV 中填写：去掉 `public`，保留前导 `/`

---

## 4. 命名规则

### A. slug 命名规则

`slug` 是一个内容条目的唯一标识。  
它会同时影响：

- 页面 URL
- 图片文件夹名称
- 内容关联
- 搜索与推荐

推荐规则：

- 全小写英文
- 单词之间用 `-`
- 不用空格
- 不用中文
- 不用括号
- 不带版本号
- 不带日期

推荐：

```text
song-jian-ware-tea-bowl
tang-gilt-flower-tray
qing-ivory-bird-fan
utility
kiln-transmutation
```

不推荐：

```text
宋代茶盏
tea bowl
celadonBowl
final-bowl-2026
图片版本2
```

建议构成方式：

- `朝代 + 类别 + 关键特征`

例如：

```text
song-jian-ware-tea-bowl
southern-song-longquan-bowl
tang-gilt-bronze-tray
```

### B. 图片文件名规则

图片文件名不要承担“唯一性”，唯一性由文件夹保证。  
图片文件名只负责表达它的用途。

推荐命名：

#### 物件目录下

- `hero.jpg`
  - 顶部主视觉
- `object-01.jpg`
  - 标准物件图
- `object-02.jpg`
  - 第二张标准物件图
- `detail-01.jpg`
  - 局部细节图
- `craft-01.jpg`
  - 工艺过程图
- `culture-01.jpg`
  - 文化延伸图
- `gallery-01.jpg`
  - 补充展示图

#### 理念目录下

- `hero.jpg`
- `section-01.jpg`
- `section-02.jpg`
- `diagram-01.jpg`

#### 时代目录下

- `hero.jpg`
- `section-01.jpg`
- `gallery-01.jpg`

#### glossary 目录下

- `hero.jpg`
- `step-01.jpg`
- `step-02.jpg`
- `video-cover.jpg`

### C. 不推荐的图片命名

```text
IMG_4928.JPG
图片1.jpg
最终版.png
茶盏新版2.jpeg
new-photo-final.jpg
```

### D. 推荐的图片命名

```text
hero.jpg
object-01.jpg
detail-01.jpg
craft-01.jpg
culture-01.jpg
diagram-01.jpg
video-cover.jpg
```

---

## 5. 为什么这套结构不会混乱

因为我们不是用单一命名方案做全局区分，而是两层同时工作：

### 第一层：文件夹隔离

不同条目放进不同文件夹：

```text
public/images/objects/song-jian-ware-tea-bowl/
public/images/objects/tang-gilt-flower-tray/
public/images/objects/qing-ivory-bird-fan/
```

### 第二层：文件名表达角色

每个条目目录内部再用统一角色名：

```text
hero.jpg
craft-01.jpg
culture-01.jpg
```

这样：

- 跨条目不会撞名
- 同类图片角色一眼就能识别
- 录入 CSV 时也容易推断路径

---

## 6. CSV 该怎么填

当前第一轮录入仍然使用：

[`data/demo/artcraft-objects-demo.csv`](/Users/ougonbai/Desktop/Antigravity%20workspace/Art&Craft/data/demo/artcraft-objects-demo.csv)

一行代表一个工艺品。

### A. 基本信息字段

建议第一轮必填：

- `slug`
- `title_zh_hans`
- `accession_number`
- `dynasty_zh_hans`
- `material_zh_hans`
- `summary_zh_hans`
- `overview_zh_hans`
- `hero_image`
- `featured_on_home`

### B. 短文字字段

适合一句话或两句话：

- `summary_zh_hans`
- `craft_summary_zh_hans`

### C. 长文字字段

可以分多段：

- `overview_zh_hans`
- `culture_body_zh_hans`

多段用 `||` 分隔。

示例：

```text
第一段内容。||第二段内容。||第三段内容。
```

### D. 多值字段

以下字段也统一用 `||`：

- `highlights_zh_hans`
- `search_colors_zh_hans`
- `search_materials_zh_hans`
- `related_object_slugs`

示例：

```text
青色||灰绿色
陶瓷||青瓷
tea-bowl||white-bowl
```

### E. 图片字段

当前第一轮常用：

- `hero_image`
- `craft_image`
- `culture_image_1`

填写示例：

```text
/images/objects/song-jian-ware-tea-bowl/hero.jpg
/images/objects/song-jian-ware-tea-bowl/craft-01.jpg
/images/objects/song-jian-ware-tea-bowl/culture-01.jpg
```

---

## 7. 推荐的录入流程

每录入一个新工艺品，按这个顺序：

1. 先确定 `slug`
2. 在 `public/images/objects/` 下建立该 `slug` 文件夹
3. 把图片放进去，并按统一规则重命名
4. 在 CSV 里填写该条目的文字信息
5. 填图片路径
6. 运行导入
7. 本地预览检查

这套流程比“先乱放图片，再回头整理”稳定得多。

---

## 8. 第一轮最推荐你先做什么

第一轮先不要试图一次性把所有字段、所有图片、所有研究材料都填满。

建议先准备 3 个工艺品：

1. 一件瓷器
2. 一件金工器
3. 一件你资料最完整的工艺品

并且每个工艺品先只准备：

- 1 张 `hero`
- 1 段 `summary`
- 1 到 2 段 `overview`
- 可选 1 张 `craft`
- 可选 1 张 `culture`

先跑通，再扩写。

---

## 9. 导入与预览

编辑完 CSV 后运行：

```bash
npm run import:demo
```

启动预览：

```bash
npm run dev
```

然后看这些页面：

- [http://127.0.0.1:3001](http://127.0.0.1:3001)
- [http://127.0.0.1:3001/objects](http://127.0.0.1:3001/objects)
- [http://127.0.0.1:3001/search](http://127.0.0.1:3001/search)

---

## 10. 一句话执行法

如果你只记一件事，就记这个：

- **每个内容条目一个文件夹**
- **每张图按用途命名**
- **CSV 里填网站路径，不填电脑绝对路径**
