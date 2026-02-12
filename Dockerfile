# ---------- BUILD STAGE ----------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    RUN npm run build
    
    
    # ---------- RUN STAGE ----------
    FROM nginx:alpine
    
    # Remove default nginx website
    RUN rm -rf /usr/share/nginx/html/*
    
    # Copy build files
    COPY --from=builder /app/build /usr/share/nginx/html
    
    EXPOSE 80
    
    CMD ["nginx", "-g", "daemon off;"]
