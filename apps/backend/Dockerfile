FROM oven/bun:1-alpine
WORKDIR /app

COPY . .
RUN npm install -g pnpm@10.4.1
RUN pnpm install --frozen-lockfile

EXPOSE 2222
CMD ["bun", "run", "src/index.ts"]
