# Stage 1: Build
FROM node:22.20.0-alpine3.21 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:22.20.0-alpine3.21
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install only production dependencies
RUN npm install --legacy-peer-deps --production

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]