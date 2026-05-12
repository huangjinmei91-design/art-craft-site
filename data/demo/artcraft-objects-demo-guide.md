# Objects Demo CSV 字段对照说明

这份说明专门配合：

- [`data/demo/artcraft-objects-demo.csv`](/Users/ougonbai/Desktop/Antigravity%20workspace/Art&Craft/data/demo/artcraft-objects-demo.csv)

目标是回答一个最实际的问题：

- **每个字段在页面的什么位置出现**
- **我应该给它放什么类型的图片**

---

## 1. 这一轮真正会显示的图片字段只有 3 个

虽然长期目录规范里我们预留了：

- `object-01`
- `detail-01`
- `gallery-01`
- `section-01`

这些名字，

但 **当前第一轮 CSV 真正已经接到前端页面上的图片字段，只有下面 3 个：**

1. `hero_image`
2. `craft_image`
3. `culture_image_1`

也就是说：

- 现在你先只需要关心这 3 张图
- 其他命名是为后续扩展准备的，还没有在当前 objects CSV 中使用

---

## 2. 这 3 张图分别对应什么

## A. `hero_image`

### 它显示在哪里

它会出现在：

- 物件详情页顶部主图
- 物件索引页卡片
- 搜索结果页卡片
- 如果 `featured_on_home = true`，也会出现在首页“浏览物件”卡片

### 你应该放什么图

最推荐放：

- 这件工艺品最标准、最清晰、最能代表它的一张主图

你可以把它理解成：

- “封面图”
- “代表图”
- “如果一个条目只能选一张图，就选它”

### 推荐素材类型

- 白底标准拍摄图
- 展示最完整器形的一张图
- 不要太复杂的拼图

### 推荐文件名

```text
hero.jpg
```

### 示例路径

```text
/images/objects/song-jian-ware-tea-bowl/hero.jpg
```

---

## B. `craft_image`

### 它显示在哪里

它会出现在物件详情页的：

- `工艺品鉴` 模块卡片左侧缩略图

也就是“工艺品鉴”那块内容旁边那张图。

### 你应该放什么图

最推荐放：

- 工艺过程图
- 工序图
- 材料处理图
- 局部能体现工艺特征的图

你可以把它理解成：

- “这件工艺品最能体现工艺特点的辅助图”

### 推荐素材类型

- 烧造过程
- 錾刻过程
- 织造/编织过程
- 局部工艺特写

### 推荐文件名

```text
craft-01.jpg
```

### 示例路径

```text
/images/objects/song-jian-ware-tea-bowl/craft-01.jpg
```

---

## C. `culture_image_1`

### 它显示在哪里

它会出现在物件详情页的：

- `文化解读` 模块图片区

### 你应该放什么图

最推荐放：

- 与该物件文化语境相关的图
- 使用场景图
- 同时代绘画图像
- 延伸阅读图
- 可以帮助理解“它为什么重要”的图

你可以把它理解成：

- “帮助讲故事的图”

### 推荐素材类型

- 同时代生活场景图
- 文献插图
- 使用情境相关图
- 与器物文化意义有关的图

### 推荐文件名

```text
culture-01.jpg
```

### 示例路径

```text
/images/objects/song-jian-ware-tea-bowl/culture-01.jpg
```

---

## 3. 当前页面结构可以这样理解

你可以把当前 objects 页面先理解成下面这个结构：

```text
物件详情页
  ├─ 顶部主区域
  │   ├─ 标题、朝代、材质、正文
  │   └─ hero_image
  │
  ├─ 工艺品鉴
  │   ├─ craft_title_zh_hans
  │   ├─ craft_summary_zh_hans
  │   └─ craft_image
  │
  ├─ 文化解读
  │   ├─ culture_title_zh_hans
  │   ├─ culture_body_zh_hans
  │   └─ culture_image_1
  │
  ├─ 相关推荐
  └─ 参考文献
```

所以你当前录入时，先把它理解成：

- `hero_image` = 主图
- `craft_image` = 工艺说明图
- `culture_image_1` = 文化延伸图

---

## 4. 你现在其实不需要先准备的图

第一轮先不要被这些名字吓住：

- `object-01.jpg`
- `detail-01.jpg`
- `gallery-01.jpg`

这些是我给后面扩展预留的长期规范，**不是你现在必须马上提供的图**。

也就是说，第一轮你最少只需要：

1. `hero.jpg`
2. 如果有就加 `craft-01.jpg`
3. 如果有就加 `culture-01.jpg`

这就足够了。

---

## 5. 现在填 CSV 时的最小图片策略

如果你只想先快速测试一条真实内容，图片准备最低可以这样：

### 最低可运行版

- 只提供 `hero_image`

### 比较完整的第一轮版

- `hero_image`
- `craft_image`
- `culture_image_1`

所以你完全可以先这样开始：

```text
hero_image = /images/objects/southern-song-longquan-bowl/hero.jpg
craft_image = /images/objects/southern-song-longquan-bowl/craft-01.jpg
culture_image_1 = /images/objects/southern-song-longquan-bowl/culture-01.jpg
```

如果没有工艺图或文化图，就先留空。

---

## 6. 给你一个直观示范

假设你要录入一件：

- 南宋龙泉青瓷碗

那它当前最推荐的图片准备方式是：

```text
public/images/objects/southern-song-longquan-bowl/
  hero.jpg
  craft-01.jpg
  culture-01.jpg
```

CSV 里对应填写：

```text
hero_image = /images/objects/southern-song-longquan-bowl/hero.jpg
craft_image = /images/objects/southern-song-longquan-bowl/craft-01.jpg
culture_image_1 = /images/objects/southern-song-longquan-bowl/culture-01.jpg
```

对应含义：

- `hero.jpg`
  - 这件碗最好的一张标准图
- `craft-01.jpg`
  - 比如釉色、烧造、局部工艺相关图
- `culture-01.jpg`
  - 比如茶事场景、宋代相关图像、文化语境图

---

## 7. 一句话结论

如果你现在只想知道“我到底该放什么图”，那就按这个最简单的记法：

- `hero_image`：这件工艺品的代表主图
- `craft_image`：说明它怎么做出来的图
- `culture_image_1`：说明它为什么重要的图
