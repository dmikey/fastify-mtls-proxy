import fastify from "fastify";
import plugin, { Options } from "./src/index";
import { URL } from "url";

const app = fastify({ logger: true });

app.register(plugin, {
  replyOptions: {
    getUpstream: (req: any, base: string) => {
      const url: any = new URL(`${req.url}`);
      return `${base}${url.pathname}`;
    },
  },
} as any);

app.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
