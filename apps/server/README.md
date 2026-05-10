# KidsMath Server

数感星球后端 API 服务。

## 技术栈

- NestJS + TypeScript
- Prisma ORM
- PostgreSQL
- JWT 认证

## 项目结构

```
src/
  auth/              # 认证模块（微信登录、游客登录）
  users/             # 用户模块（个人信息、儿童档案）
  levels/            # 学习内容模块（关卡、今日推荐）
  learning-records/  # 学习记录模块
  daily-reports/     # 学情报告模块
  prisma/            # Prisma 配置
  seed/              # 种子数据
  common/            # 公共工具（拦截器、过滤器、守卫）
```

## 安装与运行

```bash
npm install

# 生成 Prisma Client
npx prisma generate

# 执行数据库迁移
npx prisma migrate dev

# 填充种子数据
npm run db:seed

# 开发模式
npm run start:dev

# 生产模式
npm run build
npm run start:prod
```

## 环境变量

```
DATABASE_URL=postgresql://user:pass@localhost:5432/kidsmath
JWT_SECRET=your-secret-key
PORT=3000
```

## API 文档

### 健康检查
- `GET /api/health` — 无需认证

### 认证
- `POST /api/v1/auth/wechat` — 微信登录
- `POST /api/v1/auth/guest` — 游客登录

### 用户
- `GET /api/v1/users/me` — 获取当前用户
- `POST /api/v1/users/me/children` — 添加儿童
- `GET /api/v1/users/me/children` — 儿童列表

### 关卡
- `GET /api/v1/levels` — 关卡列表
- `GET /api/v1/levels/:id` — 关卡详情
- `GET /api/v1/levels/today` — 今日推荐

### 学习记录
- `POST /api/v1/learning-records` — 提交记录
- `GET /api/v1/learning-records` — 查询记录
- `GET /api/v1/learning-records/stats` — 统计汇总

### 学情报告
- `GET /api/v1/daily-reports/today` — 今日报告
- `GET /api/v1/daily-reports` — 历史报告
- `GET /api/v1/daily-reports/weekly` — 周报

## 响应格式

```json
{
  "success": true,
  "data": {},
  "meta": {},
  "error": null
}
```
