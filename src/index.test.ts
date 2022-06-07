import fastify from "fastify";
import plugin, { Options } from "./index";

const app = fastify();

describe("testing proxy", () => {
  app.register(plugin, {} as Options);
  test("should return GET response from upstream", async () => {
    const response = await app.inject({
      headers: {
        upstream: "https://www.httpbin.org",
      },
      method: "GET",
      url: "/anything",
    });
    expect(JSON.parse(response.body).headers["Host"]).toBe("www.httpbin.org");
  });

  test("should return POST response from upstream", (done) => {
    return app.inject(
      {
        headers: {
          upstream: "https://www.httpbin.org",
        },
        method: "POST",
        url: "/anything",
        payload: {
          hello: "world",
        },
      },
      (err, response) => {
        if (response) {
          expect(JSON.parse(response.body).data).toBe(
            JSON.stringify({ hello: "world" })
          );
        }
        done(err);
      }
    );
  });
});
