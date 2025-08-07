FROM node:20-alpine
# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy only dependency files first for caching
COPY pnpm-lock.yaml ./
COPY package.json ./

# Install deps
RUN pnpm install

COPY . .

# Expose appropriate ports (adjust if needed)
EXPOSE 3000

# Start app
CMD ["pnpm", "dev"]
