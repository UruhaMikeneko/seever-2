FROM denoland/deno:2.9.7

WORKDIR /app

COPY . .

CMD ["run", "-A", "--unstable-kv", "server.js"]