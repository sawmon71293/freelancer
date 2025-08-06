FROM node:18

RUN corepack enable && corepack prepare pnpm@latest --activate

# Then install expo-cli globally
RUN pnpm add -g expo-cli

ENV PATH="/root/.local/share/pnpm:$PATH"

WORKDIR /app
COPY pnpm-lock.yaml package.json ./
RUN pnpm install
COPY . .

EXPOSE 19000 19001 19002

CMD ["pnpm", "expo", "start", "--tunnel"]
