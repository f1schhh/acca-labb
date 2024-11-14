# Stage 1: Bygg applikationen
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Starta applikationen för produktion
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "start"]