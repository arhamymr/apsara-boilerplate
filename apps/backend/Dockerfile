FROM oven/bun:1-alpine
WORKDIR /app

COPY . .
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate
RUN pnpm install --frozen-lockfile

EXPOSE 2222
CMD ["bun", "run", "src/index.ts"]
