# Stage 1: Build the application
FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Setup nginx and json-server
FROM nginx:alpine

# Install necessary tools and json-server
RUN apk add --no-cache bash nodejs npm supervisor && \
    npm install -g json-server

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy your sample data to the correct location
COPY --from=build /app/data/sampledata.json /app/data/sampledata.json

# Add Supervisor config
COPY supervisord.conf /etc/supervisord.conf

# Expose ports (80 for nginx, 3000 for json-server)
EXPOSE 5001 3000

# Run supervisor to manage both nginx and json-server
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
