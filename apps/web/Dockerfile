FROM node:22-alpine
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@10.4.1 --activate && pnpm install --frozen-lockfile

COPY . .

WORKDIR /app/apps/web
RUN pnpm install --frozen-lockfile && pnpm build

EXPOSE 3000
CMD ["node", ".next/standalone/server.js"]
