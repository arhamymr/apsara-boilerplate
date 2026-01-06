# Builder stage - installs deps and builds the app
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY packages/ui/package.json packages/ui/package.json

RUN corepack enable && corepack prepare pnpm@10.4.1 --activate && \
    pnpm install --frozen-lockfile

COPY . .

WORKDIR /app/apps/web

RUN pnpm install --frozen-lockfile && pnpm build

# Runner stage - only contains build artifacts
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/apps/web/.next/standalone ./.next/standalone
COPY --from=builder /app/apps/web/.next/static ./.next/static
COPY --from=builder /app/apps/web/public ./public

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

USER nextjs

EXPOSE 3000

CMD ["node", ".next/standalone/apps/web/server.js"]
