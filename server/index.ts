import app from "./app";

Bun.serve({
  fetch: app.fetch,
});

console.log(`Server is runing on: http://localhost:3000/`);
