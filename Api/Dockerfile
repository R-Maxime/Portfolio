FROM oven/bun:latest

WORKDIR /app

COPY package*.json ./

RUN bun install

COPY . .

EXPOSE 3050

CMD ["bun", "start"]
