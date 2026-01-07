ARG NODE_VERSION=24.11.1
FROM node:${NODE_VERSION}-slim AS base
RUN corepack enable

#----
FROM base AS prepare
WORKDIR /app

COPY . .
RUN pnpm dlx turbo prune web --docker


FROM base AS builder 
WORKDIR /app
COPY --from=prepare /app/out/json/ .
RUN pnpm install --frozen-lockfile

# build the project 
COPY --from=prepare /app/out/full/ .
RUN pnpm turbo build --filter=web


FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

# Don't run production as root for security reasons
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public


EXPOSE 3000
CMD node apps/web/server.js
