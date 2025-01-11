# Define args to use throughout the file
ARG NODE_VERSION=20.15.0

FROM node:${NODE_VERSION}-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apt-get update && apt-get install -y openssl libssl3
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN pnpm install --prod --frozen-lockfile

FROM base AS build
RUN pnpm install --frozen-lockfile
RUN pnpx prisma generate
RUN pnpm run build

FROM base
ARG PORT=3000
ARG NUXT_DATABASE_URL
ENV PORT=${PORT}
ENV NODE_ENV=production
COPY --from=build /app/.output /app/.output
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/prisma /app/prisma
EXPOSE 3000

# Apply migrations
CMD ["sh", "-c", "npx prisma migrate deploy && node .output/server/index.mjs"]