# Cosmoverse 2022

Generating claim keys for the three badges:

```bash
ts-node ../src/1_generate_claim_keys.ts --count 1 --out-dir badge-medellin
ts-node ../src/1_generate_claim_keys.ts --count 1 --out-dir badge-whitepaper
ts-node ../src/1_generate_claim_keys.ts --count 400 --out-dir badge-side-event
```

Draw QR codes for the "side event" badge:

```bash
ts-node ./draw_qr_codes.ts
```

**NOTE:** At the time of writing this code, node-canvas doesn't have the pre-compiled binaries for the latest nodejs version. I had to downgrade to node v17, otherwise with v18 I get the following error:

```plain
npm ERR! node-pre-gyp ERR! install response status 404 Not Found on https://github.com/Automattic/node-canvas/releases/download/v2.10.1/canvas-v2.10.1-node-v108-darwin-unknown-x64.tar.gz
```
