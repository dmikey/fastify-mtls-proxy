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

  test("should return TLS certificate was presented", (done) => {
    return app.inject(
      {
        headers: {
          upstream: "https://certauth.cryptomix.com",
        },
        method: "POST",
        url: "/",
        payload: {
          proxy_cert: `-----BEGIN CERTIFICATE-----
          MIIBljCCAT2gAwIBAgIGAXpec6QTMAoGCCqGSM49BAMCMDcxNTAzBgNVBAMTLGFr
          YXNoMWcyazlhejhmYWZnbmhheGN6ajJwY2Y3ZHh6bTk2cjN3MGVhM2Z2MB4XDTIx
          MDYzMDA1MDAwMFoXDTIzMDYzMDA1MDAwMFowNzE1MDMGA1UEAxMsYWthc2gxZzJr
          OWF6OGZhZmduaGF4Y3pqMnBjZjdkeHptOTZyM3cwZWEzZnYwWTATBgcqhkjOPQIB
          BggqhkjOPQMBBwNCAAQxL+j8g6BVY90Qhosaywz/FnAPZSudeKxp1R+7xZp3ObnI
          isXvOeFVxgI4QlZ18XkNzCkH0ld3jE9wM9oWpFlBozUwMzAOBgNVHQ8BAf8EBAMC
          ADAwEwYDVR0lBAwwCgYIKwYBBQUHAwEwDAYDVR0TAQH/BAIwADAKBggqhkjOPQQD
          AgNHADBEAiACxXpENnv/0z+YY8O5PxNcZhCoy0cYEHP7taJSqYCNxAIgezBwfet7
          2fT9yAO55qii1pg9yUTUb+0bLDc4iUSOU60=
          -----END CERTIFICATE-----`,
          proxy_key: `-----BEGIN PRIVATE KEY-----
          MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgGYAxjsEAPUfNblnM
          1hpJhwwEcGNJ2UQ5ZVqgPVggmFugCgYIKoZIzj0DAQehRANCAAQxL+j8g6BVY90Q
          hosaywz/FnAPZSudeKxp1R+7xZp3ObnIisXvOeFVxgI4QlZ18XkNzCkH0ld3jE9w
          M9oWpFlB
          -----END PRIVATE KEY-----`,
        },
      },
      (err, response) => {
        if (response) {
          expect(JSON.parse(response.body).data).toContain("success");
        }
        done(err);
      }
    );
  });
});
