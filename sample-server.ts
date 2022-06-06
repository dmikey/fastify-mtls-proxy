import fastify from "fastify";
import plugin, { Options } from "./src/index";

const app = fastify({ logger: true });

app.register(plugin, {} as Options);

app.register(async (fastify, opts) => {
  fastify.get("/test-page", async (request, reply) => {
    reply.header("Content-Type", "text/html; charset=utf-8").send(
      `<!doctype html><html>
        <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.0.0-alpha.1/axios.min.js" integrity="sha512-xIPqqrfvUAc/Cspuj7Bq0UtHNo/5qkdyngx6Vwt+tmbvTLDszzXM0G6c91LXmGrRx8KEPulT+AfOOez+TeVylg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        </head>
        <body>
        <h1>Hello World</h1>
          <script>
          axios
          .get("http://localhost:3000/ip", {
            headers: {
              upstream:'http://httpbin.org',
            },
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          </script>
        </body>
        </html>`
    );
  });
});

app.listen(3000, (err: any, address: string) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
