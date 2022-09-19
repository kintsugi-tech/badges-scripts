import * as fs from "fs";
import * as path from "path";
import * as promptly from "promptly";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { contracts } from "@steak-enjoyers/badges.js";

import * as helpers from "./helpers";
import * as keystore from "./keystore";

helpers.suppressFetchAPIWarning();

const args = yargs(hideBin(process.argv))
  .option("hub-addr", {
    type: "string",
    describe: "address of the badge hub contract",
    demandOption: true,
  })
  .option("id", {
    type: "number",
    describe: "id of the badge",
    demandOption: true,
  })
  .option("owners", {
    type: "string",
    describe: "a text file containing addresses to receive the badge, one address per line",
    demandOption: true,
  })
  .option("network", {
    type: "string",
    describe: "the network where the codes are to be stored; must be mainnet|testnet|localhost",
    demandOption: false,
    default: "localhost",
  })
  .option("key", {
    type: "string",
    describe: "name of key to sign the txs",
    demandOption: false,
    default: "dev",
  })
  .option("key-dir", {
    type: "string",
    describe: "directories where the encrypted key files are located",
    demandOption: false,
    default: path.resolve(__dirname, "./keys"),
  })
  .wrap(100)
  .parseSync();

(async function () {
  const password = await promptly.password("enter password to decrypt the key: ");
  const key = await keystore.load(args["key"], password, args["key-dir"]);
  const { senderAddr, client } = await helpers.createSigningClient(args["network"], key);

  const hubClient = new contracts.Hub.HubClient(client, senderAddr, args["hub-addr"]);

  const owners = fs
    .readFileSync(args["owners"], "utf8")
    .split("\n")
    .filter((owner) => owner.length > 0);

  const msg = {
    id: args["id"],
    owners,
  };
  console.log("msg:", JSON.stringify({ mint_by_minter: msg }, null, 2));

  await promptly.confirm("proceed? [y/N] ");

  process.stdout.write("broadcasting tx... ");
  const { transactionHash } = await hubClient.mintByMinter(msg, "auto", "", []);
  console.log(`success! txhash: ${transactionHash}`);
})();
