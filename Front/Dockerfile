FROM oven/bun:latest as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN bun run build

FROM nginx:1.25.0-alpine as production

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8050

CMD ["nginx", "-g", "daemon off;"]