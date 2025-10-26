# Utiliser une image Node.js officielle
FROM node:18-alpine AS base

# Installer les dépendances de build
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copier les fichiers de package
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Phase de build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Désactiver le telemetry Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# Construire l'application
RUN npm run build

# Phase de production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers de build
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Créer le dossier pour la base de données
RUN mkdir -p ./db && chown nextjs:nodejs ./db

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Démarrer l'application avec le serveur standalone
CMD ["node", "server.js"]