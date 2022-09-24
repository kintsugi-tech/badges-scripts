import * as fs from "fs";
import * as path from "path";
import { createCanvas, loadImage } from "canvas";
import QRCode from "qrcode";

const BADGE_ID = 3;

const WIDTH = 2100;
const HEIGHT = 1480;
const QR_SIZE = 900;
const QR_X_OFFSET = 595;
const QR_Y_OFFSET = 325;
const BG_IMAGE = "./outpost-one-a5-horizontal-no-qr.png";

async function draw(text: string, outFile: string) {
  // A5 paper is 148 x 210 mm. we need to maintain the same aspect ratio
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  const bg = await loadImage(BG_IMAGE);
  ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT);

  const qrCanvas = createCanvas(QR_SIZE, QR_SIZE);
  QRCode.toCanvas(qrCanvas, text, {
    margin: 2,
    scale: 16,
  });

  ctx.drawImage(qrCanvas, QR_X_OFFSET, QR_Y_OFFSET, QR_SIZE, QR_SIZE);

  console.log(`attempting to draw QR to file ${outFile}...`);
  const out = fs.createWriteStream(outFile);
  const stream = canvas.createJPEGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("created JPEG:", outFile));
}

(async function () {
  const outDir = path.join(__dirname, "./badge-side-event/qr");
  if (fs.existsSync(outDir)) {
    console.log(`directory ${outDir} already exists!`);
  } else {
    fs.mkdirSync(outDir, { recursive: true });
    console.log(`created output directory ${outDir}`);
  }

  const privkeys = fs
    .readFileSync(path.join(__dirname, "./badge-side-event/privkeys.txt"), "utf8")
    .split("\n")
    .filter((key) => key.length > 0);
  console.log(`loaded ${privkeys.length} keys`);

  for (const [idx, privkey] of privkeys.entries()) {
    await draw(`https://app.badges.fun?id=${BADGE_ID}&key=${privkey}`, `${outDir}/${idx + 1}.jpeg`);
  }
})();
