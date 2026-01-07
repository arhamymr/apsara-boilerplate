FROM oven/bun:1-alpine AS base 

FROM base AS prepare
WORKDIR /app
RUN bun install turbo@latest -g
COPY . .
RUN turbo prune backend --docker

FROM node:22-slim AS builder
RUN corepack enable
WORKDIR /app
COPY --from=prepare /app/out/json/ .
RUN pnpm install
# build the project
COPY --from=prepare /app/out/full/ .

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 backend
RUN adduser --system --uid 1001 backend
USER backend

COPY --from=builder /app/apps/backend/ .

WORKDIR /app
EXPOSE 2222
CMD ["bun", "start"]
