# Cosmoverse 2022

Generating claim keys for the three badges:

```bash
ts-node ../../src/1_generate_claim_keys.ts --count 1 --out-dir badge-medellin
ts-node ../../src/1_generate_claim_keys.ts --count 1 --out-dir badge-whitepaper
ts-node ../../src/1_generate_claim_keys.ts --count 400 --out-dir badge-side-event
```

Draw QR codes for the "side event" badge:

```bash
ts-node ./draw_qr_codes.ts
```

**NOTE:** At the time of writing this code, node-canvas doesn't have the pre-compiled binaries for the latest nodejs version. I had to downgrade to node v17, otherwise with v18 I get the following error:

```plain
npm ERR! node-pre-gyp ERR! install response status 404 Not Found on https://github.com/Automattic/node-canvas/releases/download/v2.10.1/canvas-v2.10.1-node-v108-darwin-unknown-x64.tar.gz
```

## Badges

### 1. Medellin

```json
{
  "metadata": {
    "name": "The Arrival",
    "description": "A limited edition badge for Mars booth attendees at Cosmoverse 2022 in Medellín, Colombia",
    "image": "ipfs://QmdkihzXwwAUHQ2D7Hm4Rzsjnj7TGAqWMtZFifodfTSexN"
  },
  "transferrable": false,
  "rule": {
    "by_key": "0368b306ef7e9d08896deabd8054054f90199fe4e9cd2852cdf593d83eba784b1f"
  },
  "expiry": 1664409600,
  "max_supply": 3000
}
```

```bash
ts-node ../../src/5_create_by_key.ts \
  --hub-addr stars1yqzlqv4hpumnnswannzgtkrd73lmal5lglx29j0mjed0vqudw04qc8j5ga \
  --metadata badge-medellin/metadata.json \
  --pubkey $(cat badge-medellin/pubkeys.txt) \
  --transferrable false \
  --expiry 1664409600 \
  --max-supply 3000 \
  --network testnet \
  --key dev \
  --key-dir ../../keys
```

### 2. Whitepaper

```json
{
  "metadata": {
    "name": "The Unveiling",
    "description": "A limited edition badge celebrating the launch of the Mars Whitepaper during Cosmosverse 2022",
    "image": "ipfs://QmReyRs9e7br3Fpso29o89QywGG1Z6Xc561GJzagp8b6Pc"
  },
  "transferrable": false,
  "rule": {
    "by_key": "023551818d2adc71ba84785b28280258ce4d994a26e8e51c4e7a0c4d7e13cd869b"
  },
  "expiry": 1664236800,
  "max_supply": 7000
}
```

```bash
ts-node ../../src/5_create_by_key.ts \
  --hub-addr stars1yqzlqv4hpumnnswannzgtkrd73lmal5lglx29j0mjed0vqudw04qc8j5ga \
  --metadata badge-whitepaper/metadata.json \
  --pubkey $(cat badge-whitepaper/pubkeys.txt) \
  --transferrable false \
  --expiry 1664236800 \
  --max-supply 7000 \
  --network testnet \
  --key dev \
  --key-dir ../../keys
```

### 3. Side Event

```json
{
  "metadata": {
    "name": "The Gathering",
    "description": "A limited edition badge for ØUTPOST ØNE attendees who joined Mars and Osmosis at Palau on Sept. 26, 2022 in Antioquia, Colombia",
    "image": "ipfs://QmTRAZ6cBJ18xaZGUBPuSRCR52yNMEtmNhYCNJgWae43kd"
  },
  "transferrable": false,
  "rule": "by_keys",
  "expiry": 1664308800,
  "max_supply": 400
}
```

```bash
ts-node ../../src/6_create_by_keys.ts \
  --hub-addr stars1yqzlqv4hpumnnswannzgtkrd73lmal5lglx29j0mjed0vqudw04qc8j5ga \
  --metadata badge-side-event/metadata.json \
  --pubkeys badge-side-event/pubkeys.txt \
  --transferrable false \
  --expiry 1664308800 \
  --max-supply 400 \
  --network testnet \
  --key dev \
  --key-dir ../../keys
```
