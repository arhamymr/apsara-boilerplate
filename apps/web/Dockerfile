FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

FROM base AS prepare
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune frontend --docker

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
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next/standalone ./apps/web/.next/standalone
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
USER nextjs
WORKDIR /app/apps/web
EXPOSE 3000
CMD ["node", ".next/standalone/server.js"]
