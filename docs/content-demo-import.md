# Demo 内容导入说明

## 目标

这一版使用 **一张 `master.csv` 主表** 作为唯一录入入口，让你可以在同一个文件里维护：

- `object` 物件记录
- `term / glossary` 延伸阅读词条
- `term / concept` 探索理念词条
- `home hero` 首页 Banner 轮播内容（通过 `term / concept` 行维护）
- `timeline` 时代长廊记录

并验证：

- 首页推荐卡片
- `/objects` 索引页
- `/objects/[slug]` 详情页
- `/search` 搜索与筛选
- `时代长廊` 与 `探索理念` 页面里的关联关系

也就是说：

- 物件本身写在 `record_type = object` 的行里
- 它属于哪个时代，写在 `era_slug`
- 它属于哪个材质，写在 `material_slug`
- 它对应哪些理念，写在 `concept_slugs`
- 它对应哪些延伸阅读词条，写在 `related_term_slugs`
- glossary 和 concept 词条本身，写在 `record_type = term` 的行里
- 首页 Banner 的三张轮播，也从 `record_type = term` 且 `term_type = concept` 的行里读取

## 你要编辑的文件

- 主模板：
  [`data/demo/artcraft-master.csv`](/Users/ougonbai/Desktop/Antigravity%20workspace/Art&Craft/data/demo/artcraft-master.csv)

## 录入规则

- 一行代表一条内容记录。
- `record_type = object` 表示这是一条物件记录。
- `record_type = term` 表示这是一条词条记录。
- `record_type = timeline` 表示这是一条时代长廊记录。
- `term_type` 只在 `record_type = term` 时使用，可填：
  - `glossary`
  - `concept`
- `slug` 必填，且必须唯一。建议只用英文小写、数字和短横线。
- `title_zh_hans`、`accession_number`、`hero_image` 必填。
- `term` 行不需要填写 `accession_number`。
- 支持多值的字段用 `||` 分隔。
  - 例如：`青色||灰绿色`
- 如果暂时没有繁体内容，可以先留空；系统会自动回退到简体内容。
- 如果暂时没有 `craft_*` 或 `culture_*`，可以先留空。

## 常用字段解释

- `文物名片`
  - 这是详情页固定栏目，不是 CSV 字段。
  - 你不用单独填写“文物名片”这几个字。
  - 这个栏目展示的是你填在 `dynasty_zh_hans`、`material_zh_hans`、`summary_zh_hans`、`overview_zh_hans` 里的内容。
- `craft_title_zh_hans`
  - 这是 `工艺品鉴` 模块里的小标题。
  - 这里要填具体工艺名，比如：`兔毫`、`剔犀`、`缂丝`。
  - 不要填 `工艺品鉴`，因为那是模块固定标题。
- `era_slug`
  - 这是这个物件所属的时代逻辑键。
  - 推荐直接用：`tang`、`song`、`yuan`、`ming`、`qing`
  - 它会决定这个物件在 `时代长廊` 里归到哪一组。
- `material_slug`
  - 这是这个物件所属的材质逻辑键。
  - 推荐直接用：`ceramic`、`lacquer`、`metalwork`、`glass`、`textile`、`wood-bamboo`
  - 它会决定这个物件在材质筛选里归到哪一组。
- `object_kind_slug`
  - 这是这个物件的器型逻辑键，用来驱动物件页的自动“相关推荐”。
  - 推荐直接用：`bowl`、`fan`、`tray`、`case`、`stand`
  - 如果不填，系统会尝试根据标题里的字词自动判断；但长期录入建议手动填写。
- `concept_slugs`
  - 这是这个物件关联的理念键，多个值用 `||`
  - 目前可用值：
    - `fusion`
    - `harmony`
    - `zen`
    - `utility`
  - 它会决定这个物件和哪些理念页关联。
- `首页 Banner`
  - 当前首页 Banner 读取 3 个固定概念 slug，对应顺序是：
    - `utility` → `格物致用`
    - `fusion` → `融合多元`
    - `harmony` → `天人合一`
  - 这些内容都在 `record_type = term` 且 `term_type = concept` 的行里维护。
  - 其中：
    - `title_zh_hans` = Banner 大标题
    - `hero_subtitle_zh_hans` = Banner 副标题
    - `hero_image` = Banner 图片
    - `slug` = Banner 点击后跳转到的概念页 `/concepts/<slug>`
  - 也就是说，Banner 现在是可点击的，点击后进入对应概念页。

- `featured_on_home`
  - `true` 表示可进入首页“浏览物件”
  - `false` 表示只出现在列表页和搜索页
- `search_colors_zh_hans`
  - 这是搜索页“颜色”筛选的来源，多个值用 `||`。
  - 例如：`黑色||褐色||铁黑`
- `search_materials_zh_hans`
  - 这是搜索页“材料”筛选的来源，多个值用 `||`。
  - 例如：`瓷器||黑釉瓷||建盏`
  - 如果留空，系统会回退到 `material_zh_hans`。
- `hero_image`
  - 对 object / concept / timeline 而言，这都是对应记录的主图字段。
  - Banner 轮播读取 concept 行里的 `hero_image`。
  - 当前可先使用站内现有图片路径，例如：
    - `/images/hero-celadon-bowl.svg`
    - `/images/object-bronze-tray.svg`
    - `/images/object-tea-bowl.svg`
  - 首页 Banner 的正式图片建议统一放在：
    - `public/images/home/hero/`
  - 推荐命名：
    - `utility-banner.png`
    - `fusion-banner.png`
    - `harmony-banner.png`
  - 对应 CSV 中填写的网站路径：
    - `/images/home/hero/utility-banner.png`
    - `/images/home/hero/fusion-banner.png`
    - `/images/home/hero/harmony-banner.png`
- `探索理念详情页`
  - 理念详情页现在采用固定结构，且和首页理念卡片、首页 Banner 使用同一条 `term / concept` 记录联动。
  - 也就是说，你只维护 `record_type = term` 且 `term_type = concept` 这一行，首页和详情页会一起更新。
  - 页面从上到下对应这些字段：
    - 固定 Banner
      - `title_zh_hans` = 页面主标题
      - `hero_subtitle_zh_hans` = Banner 副标题
      - `hero_image` = Banner 图片
    - 理念简述
      - `intro_label_zh_hans` = 建议填 `理念简述`
      - `intro_body_zh_hans` = 正文，多段用 `||`
    - 文化源流
      - `section_1_heading_zh_hans` = 建议填 `文化源流`
      - `section_1_body_zh_hans` = 正文，多段用 `||`
      - `section_1_image_1` 到 `section_1_image_4` = 右侧图片，支持 `1-4` 张
      - `section_1_image_1_caption_zh_hans` 到 `section_1_image_4_caption_zh_hans` = 对应图片标题，可留空
    - 理蕴于形
      - `section_2_heading_zh_hans` = 建议填 `理蕴于形`
      - `section_2_body_zh_hans` = 正文，多段用 `||`
      - `section_2_image_1` = 这一段正文下方的大图
      - `section_2_image_1_caption_zh_hans` = 大图标题，可留空
    - 相关推荐
      - 不需要单独填写推荐列表
      - 系统会自动从 `object` 记录中找出 `concept_slugs` 包含当前理念 slug 的物件，最多显示 `4` 个
    - 参考文献
      - `reference_labels_zh_hans`
      - `reference_hrefs`
  - 推荐图片目录：
    - `public/images/concepts/<slug>/banner.png`
    - `public/images/concepts/<slug>/source-01.png`
    - `public/images/concepts/<slug>/source-02.png`
    - `public/images/concepts/<slug>/source-03.png`
    - `public/images/concepts/<slug>/source-04.png`
    - `public/images/concepts/<slug>/form-01.png`
  - 对应 CSV 中建议写成：
    - `hero_image = /images/concepts/<slug>/banner.png`
    - `section_1_image_1 = /images/concepts/<slug>/source-01.png`
    - `section_1_image_2 = /images/concepts/<slug>/source-02.png`
    - `section_1_image_3 = /images/concepts/<slug>/source-03.png`
    - `section_1_image_4 = /images/concepts/<slug>/source-04.png`
    - `section_2_image_1 = /images/concepts/<slug>/form-01.png`
- `related_object_slugs`
  - 填已存在的物件 slug，多个值用 `||`
  - 这是“相关推荐”的手动优先级入口。
  - 如果留空，系统会按器型优先、再按材质、再按时代自动补足到最多 4 个推荐。
- `related_term_slugs`
  - 填这一件物件在“文化解读”下面需要出现的延伸阅读词条。
  - 多个值用 `||`。
  - 这些值需要对应同一个 `master.csv` 里 `record_type = term` 的 `slug`。
  - 例如：`scholar-aesthetics||tea-culture`
- `reference_labels_zh_hans`
  - 这是物件页“参考文献”里的显示标题，多个值用 `||`。
  - 例如：`故宫博物院藏品详情||中国茶叶博物馆相关介绍`
- `reference_hrefs`
  - 这是“参考文献”对应的链接地址，多个值用 `||`。
  - 它必须和 `reference_labels_zh_hans` 一一对应，顺序保持一致。
  - 例如：`https://example-a.com||https://example-b.com`
- `timeline`
  - 首页时代长廊图片与时代详情页都从 `record_type = timeline` 的行读取。
  - 时代图片建议统一放在：
    - `public/images/timeline/<slug>/cover.png`
  - CSV 中填写的网站路径是：
    - `/images/timeline/<slug>/cover.png`
  - 首页只显示图片；时代说明文字继续保留给 `/timeline/[slug]` 页面使用。

## 图片字段先怎么理解

这一轮真正接到页面上的图片字段只有 3 个：

- `hero_image`
  - 物件主图
- `craft_image`
  - 工艺品鉴图
- `culture_image_1`
  - 文化解读图

补充：

- concept 行中的 `hero_image`
  - 同时可以驱动概念页主图与首页 Banner 图

更直观的说明见：

- [`data/demo/artcraft-objects-minimal-template-guide.md`](/Users/ougonbai/Desktop/Antigravity%20workspace/Art&Craft/data/demo/artcraft-objects-minimal-template-guide.md)

## 导入命令

编辑完 CSV 后，运行：

```bash
npm run import:demo
```

这会把 CSV 转成网站读取的 JSON：

- [`src/data/generated/master-content.json`](/Users/ougonbai/Desktop/Antigravity%20workspace/Art&Craft/src/data/generated/master-content.json)

然后启动本地预览：

```bash
npm run dev
```

## 建议的第一轮录入方式

先只填 3 条最典型的工艺品：

1. 一条瓷器
2. 一条金工器
3. 一条纺织 / 漆器 / 杂项

这样我们可以最快验证：

- 搜索筛选字段够不够用
- 详情页字段够不够承载你的真实文字
- 图片字段命名是否方便
- 相关推荐和首页推荐是否够用

## 第二轮再决定

如果这一轮跑通，我们再一起决定下一步是：

- 继续沿用 CSV 批量整理全部工艺品
- 升级成真实数据库，比如 `Supabase`
- 或者中间先过渡到 `JSON + 图片目录` 的内容仓库方式
