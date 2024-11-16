# Define args to use throughout the file
ARG NODE_VERSION=20.15.0
ARG PORT=3000

FROM node:${NODE_VERSION}-slim as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN pnpm install --prod --frozen-lockfile

FROM base AS build
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
ENV PORT=${PORT}
COPY --from=build /app/.output /app/.output
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]