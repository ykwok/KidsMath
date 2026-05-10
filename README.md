# 数感星球 (NumiVerse) 👾

数感星球是一款面向 4-8 岁儿童的数感启蒙学习应用，通过太空探险主题的游戏化方式，帮助孩子建立数学直觉。

## 技术栈

| 类别     | 技术                                       |
| -------- | ------------------------------------------ |
| Monorepo | pnpm workspaces + Turborepo                |
| 前端框架 | React 18 + TypeScript + Vite               |
| UI 方案  | Tailwind CSS + 自研组件库 (`@kidsmath/ui`) |
| 后端     | Node.js + NestJS + TypeScript              |
| 数据库   | PostgreSQL + Prisma ORM                    |
| 代码规范 | ESLint + Prettier + Husky + lint-staged    |

## 开发环境搭建

### 前置要求

- **Node.js** >= 18.0.0
- **pnpm** >= 9.0.0（`npm install -g pnpm`）

### 安装步骤

```bash
# 1. 克隆仓库
git clone https://github.com/ykwok/KidsMath.git
cd KidsMath

# 2. 安装依赖
pnpm install

# 3. 启动儿童端（端口 5173）
pnpm dev:child

# 4. 启动家长端（端口 5174）
pnpm dev:parent

# 5. 启动后端 API（端口 4000）
pnpm dev:server

# 或者同时启动所有服务
pnpm dev
```

### 后端数据库

```bash
cd apps/server
cp .env.example .env  # 配置数据库连接
pnpm db:generate       # 生成 Prisma Client
pnpm db:migrate        # 运行数据库迁移
pnpm db:seed           # 初始化种子数据
```

### Docker Compose（一键启动）

无需手动安装 PostgreSQL，使用 Docker Compose 一键启动开发环境：

```bash
# 一键启动 PostgreSQL + 后端服务
docker compose up -d

# 查看日志
docker compose logs -f server

# 停止
docker compose down

# 重建（代码变更后）
docker compose up -d --build
```

启动后访问：
- 后端 API：`http://localhost:3000`
- 健康检查：`http://localhost:3000/api/health`
- PostgreSQL：`localhost:5432`（用户名/密码：`postgres/postgres`）

## 目录结构

```
KidsMath/
├── apps/
│   ├── child/          # 儿童学习端 H5 (React + Vite)
│   │   ├── src/
│   │   │   ├── components/  # 组件（BottomNav, StarShower, VoiceBuddy...）
│   │   │   ├── pages/       # 页面（Home, Planet, Level, Result...）
│   │   │   ├── store/       # Zustand 状态管理
│   │   │   ├── hooks/       # 自定义 Hooks
│   │   │   └── data/        # 本地数据
│   │   └── ...
│   ├── parent/         # 家长端 H5 (React + Vite)
│   │   ├── src/
│   │   │   ├── components/  # 组件（Header, StatCard, ProgressRing...）
│   │   │   ├── pages/       # 页面（Home, Report, Radar, Tips...）
│   │   │   └── stores/      # Zustand 状态管理
│   │   └── ...
│   └── server/         # 后端 API (NestJS)
│       ├── src/
│       │   ├── auth/           # JWT 认证
│       │   ├── users/          # 用户管理
│       │   ├── levels/         # 关卡服务 + 推荐引擎
│       │   ├── learning-records/ # 学习记录
│       │   ├── daily-reports/  # 每日报告
│       │   └── prisma/         # Prisma 服务
│       └── prisma/schema.prisma
├── packages/
│   ├── ui/             # 共享 UI 组件库 + Tailwind 主题预设
│   ├── shared/         # 共享 TypeScript 类型与工具函数
│   └── content/        # 学习内容数据（关卡配置、题目数据）
├── turbo.json          # Turborepo 任务配置
├── pnpm-workspace.yaml # pnpm 工作区配置
├── tsconfig.base.json  # TypeScript 基础配置
├── .eslintrc.js        # ESLint 配置
├── .prettierrc         # Prettier 配置
└── README.md
```

## Workspace 说明

| 包名                | 说明                           | 端口 |
| ------------------- | ------------------------------ | ---- |
| `child`             | 儿童学习端                     | 5173 |
| `@kidsmath/parent`  | 家长端                         | 5174 |
| `server-app`        | 后端 API                       | 4000 |
| `@kidsmath/ui`      | 共享 UI 组件库 + Tailwind 预设 | —    |
| `@kidsmath/shared`  | 共享类型与工具函数             | —    |
| `@kidsmath/content` | 学习内容数据                   | —    |

## 常用命令

```bash
pnpm dev              # 启动所有服务
pnpm dev:child        # 仅启动儿童端
pnpm dev:parent       # 仅启动家长端
pnpm dev:server       # 仅启动后端
pnpm build            # 构建所有包
pnpm lint             # ESLint 检查
pnpm typecheck        # TypeScript 类型检查
pnpm format           # Prettier 格式化
pnpm format:check     # Prettier 检查
```

## 主题色板

太空探险主题色彩方案，定义在 `packages/ui/tailwind-preset.cjs`：

| 色名               | 色值      | 用途     |
| ------------------ | --------- | -------- |
| `space-deep`       | `#0a0e27` | 主背景   |
| `space-navy`       | `#141b3d` | 卡片背景 |
| `starlight`        | `#e8eaf6` | 主文字   |
| `nebula-purple`    | `#7c4dff` | 品牌紫   |
| `planet-orange`    | `#ff6d00` | 行星橙   |
| `achievement-gold` | `#ffd600` | 成就金   |
| `comet-blue`       | `#00b0ff` | 彗星蓝   |
| `cosmic-pink`      | `#ff4081` | 宇宙粉   |
| `asteroid-gray`    | `#90a4ae` | 小行星灰 |
| `supernova-green`  | `#69f0ae` | 超新星绿 |

儿童端还定义了额外的深色主题色彩（`space-*`, `nebula-*`, `planet-*`, `achievement-*`），详见 `apps/child/tailwind.config.js`。

家长端定义了独立的亮色品牌色彩（`brand-*`, `warm-*`），详见 `apps/parent/tailwind.config.js`。
