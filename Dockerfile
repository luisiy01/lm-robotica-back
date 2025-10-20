# Stage 1: Build
FROM node:22.20.0-alpine3.21 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Production
FROM node:22.20.0-alpine3.21
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

ARG MONGODB
ENV MONGODB=$MONGODB

# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

# Install only production dependencies
RUN yarn install --frozen-lockfile --production

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]