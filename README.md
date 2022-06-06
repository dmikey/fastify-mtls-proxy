# @dmikey/fastify-mtls-proxy

This proxy server seamlessly accepts client certificates and keys to forward upstream.

## why?

In secure environments such as browsers, self signed certificates are not honored to ensure that certificate authorities are vetted and thus ideally those using certificates are subject to some form of regulation.

However with-in self managed `mTLS` environments, self signed certificates make much sense to validate the client application's commands are under control of the client party and not snarfed by a `mitm`. The ability to generate `x509` certificates through `Subtle.crypto` means the progression of continued security at the user custody level.

This server allows that communication to easily facilitate. Using natural `proxy forwarding` requests can use a traditional proxy model, supported by libraries like `Axios`, `curl` and others.

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

bash using `curl`

```bash
curl --proxy "http://localhost:3000" "http://httpbin.org/ip"
```

or to make a secure request over the insecure proxy

```bash
curl --proxy-insecure "http://localhost:3000" "https://www.google.com"
```

typescript using the `axios` library

```typescript
import axios from "axios";

axios
  .post("http://localhost:3000/ip", {
    headers: {
      host: "http://httpbin.org/",
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
