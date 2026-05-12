# Vercel 首次发布清单

这份清单只服务于第一次把当前项目发布到 Vercel。

## 当前项目特点

- 技术栈：`Next.js`
- 内容源：`data/demo/artcraft-master.csv`
- 网站实际读取的生成文件：`src/data/generated/master-content.json`
- 已配置自动预处理：
  - `npm run build` 之前会自动执行 `npm run import:demo`

也就是说，Vercel 在构建时会先把 `master.csv` 转成 JSON，再继续构建页面。

## 发布前本地检查

在项目根目录运行：

```bash
npm test -- src/data/catalog.test.ts src/data/home.test.ts
npm run build
```

如果这两步通过，说明：

- CSV 能被正常导入
- 数据层和页面层没有明显构建错误

## 第一次发布步骤

1. 在 GitHub 创建一个新仓库
2. 把当前项目推到 GitHub
3. 登录 Vercel
4. 点击 `New Project`
5. 选择这个 GitHub 仓库并导入
6. 保持默认框架识别为 `Next.js`
7. 点击 `Deploy`

## Vercel 中重点确认的配置

一般保持默认即可，重点只看这几项：

- Framework Preset：`Next.js`
- Root Directory：项目根目录
- Install Command：默认
- Build Command：默认

当前项目已经通过 `package.json` 的 `prebuild` 自动处理 CSV，所以不需要你额外填写自定义构建命令。

## 发布成功后你会得到什么

Vercel 会给你一个公网地址，例如：

```text
https://your-project-name.vercel.app
```

这个地址别人可以直接访问。

## 以后怎么更新

后续流程会很简单：

1. 继续修改代码、图片和 `master.csv`
2. 提交到 GitHub
3. push
4. Vercel 自动重新部署

## 这次最适合先验证什么

第一次上线建议只验证这几项：

- 首页能打开
- 一个 object 详情页能打开
- 搜索页能打开
- 图片路径是否都正常
- `master.csv` 改动能否通过部署生效
