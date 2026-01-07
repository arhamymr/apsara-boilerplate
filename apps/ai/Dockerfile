FROM oven/bun:1-alpine AS base 


FROM base AS prepare
WORKDIR /app
RUN bun add turbo@latest -g
COPY . .
RUN turbo prune ai --docker 

COPY . .

FROM node:22-slim  AS builder
WORKDIR /app
RUN corepack enable
COPY --from=prepare /app/out/json/ .
RUN pnpm install

# build the project
COPY --from=prepare /app/out/full/ .
RUN pnpm turbo build --filter=ai


FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 mastraai
RUN adduser --system --uid 1001 mastraai
USER mastraai

COPY --from=builder /app/apps/ai/node_modules ./node_modules
COPY --from=builder /app/apps/ai/.mastra ./.mastra

WORKDIR /app
EXPOSE 3333

CMD ["bun", "run", ".mastra/start"]
