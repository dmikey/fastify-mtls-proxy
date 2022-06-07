import fastify from "fastify";
import plugin, { Options } from "./src/index";

const app = fastify({ logger: true });

app.register(plugin, {} as any);

app.listen(3000, (err: any, address: string) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
