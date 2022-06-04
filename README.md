## @dmikey/fastify-mtls-proxy

This proxy server seamlessly accepts client certificates and keys to forward upstream.

### quick setup

install the package

```bash
yarn add @dmikey/fastify-mtls-proxy
```

setup the server to receive mTLS requests to forward.

```typescript
import fastify from "fastify";
import mTLSProxyPlugin, { Options } from "@dmikey/fastify-mtls-proxy";

const app = fastify();
app.register(mTLSProxyPlugin, {} as Options);
```

### how to use

Send a request to your server as you would to the original upstream. Specify `client_cert_pem` and `client_key_pem` in the post body.

```typescript
import axios from "axios";

axios
  .post("https://upstream_server.com/upstream-endpoint", {
    proxy: {
      protocol: "https",
      host: "127.0.0.1",
      port: 9000,
      auth: {
        username: "dmikey",
        password: "123qwerty",
      },
    },
    data: {
      client_cert_pem: "abcdefg12345",
      client_key_pem: "abcdefg12345",
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### advanced configuration

using the `Options` type, you can define
