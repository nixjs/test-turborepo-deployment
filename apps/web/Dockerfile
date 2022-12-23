# syntax=docker/dockerfile:1
FROM asia.gcr.io/athena-ilt/node:v16.17.1-a

WORKDIR /app

# Copy mono config
COPY package.json package.json
COPY node_modules node_modules

# Copy package-service config
COPY apps/web/.next apps/web/.next
COPY apps/web/node_modules apps/web/node_modules
COPY apps/web/package.json apps/web/package.json
COPY apps/web/public apps/web/public

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080

ENTRYPOINT [ "pnpm", "--filter", "@lottery/web", "start" ]

