FROM oven/bun:1-alpine
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN bun install -g pnpm@10.4.1 && pnpm install --frozen-lockfile

COPY . .

EXPOSE 2222
CMD ["bun", "run", "src/index.ts"]
