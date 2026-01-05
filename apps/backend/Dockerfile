FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

FROM base AS prepare
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune backend --docker

FROM base AS deps
WORKDIR /app
COPY --from=prepare /app/out/json/ .
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=prepare /app/out/full/ .
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
WORKDIR /app/apps/backend
EXPOSE 2222
CMD ["node", "dist/index.js"]
