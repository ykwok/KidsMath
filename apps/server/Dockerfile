FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.1.0 --activate
WORKDIR /app

FROM base AS builder
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/server/package.json apps/server/
COPY packages/shared/package.json packages/shared/
COPY packages/content/package.json packages/content/
COPY packages/ui/package.json packages/ui/
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build --filter=server-app
RUN cd apps/server && npx prisma generate

FROM builder AS prod-builder
RUN pnpm prune --prod

FROM node:18-alpine AS runner
RUN apk add --no-cache openssl
WORKDIR /app

COPY --from=prod-builder /app/node_modules ./node_modules
COPY --from=prod-builder /app/apps/server/node_modules ./apps/server/node_modules
COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/server/prisma ./apps/server/prisma
COPY --from=prod-builder /app/apps/server/package.json ./apps/server/package.json
COPY --from=prod-builder /app/package.json ./package.json
COPY --from=prod-builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

WORKDIR /app/apps/server

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main.js"]
