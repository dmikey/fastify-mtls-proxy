import fastify from "fastify";
import plugin, { Options } from "./index";

const app = fastify();

describe("testing encryption", () => {
  app.register(plugin, { upstream: "http://www.google.com" } as Options);
  test("string should encrypt and decrypt with password", async () => {
    const response = await app.inject({
      headers: {
        upstream: "http://www.google.com",
      },
      method: "GET",
      url: "/",
    });

    expect(response.body).toBe(JSON.stringify({ hello: "world" }));
  });
});
