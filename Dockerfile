# Stage 1: Build Angular application
FROM node:22 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build 

# Stage 2: Serve the Angular application using Nginx
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the builder stage to replace default nginx contents
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to allow external access to the Angular application
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]