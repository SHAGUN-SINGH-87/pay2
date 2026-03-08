# ---------- Base image ----------
FROM node:22-alpine AS base
WORKDIR /app

# ---------- Install dependencies ----------
FROM base AS deps
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm install

# ---------- Build application ----------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# ---------- Production runtime ----------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup -S nodejs
RUN adduser -S nextjs

# Copy built app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["npm","start"]