const ffmpeg = require("ffmpeg-cli");
const fs = require("fs");
const IMG_PATH = "watermark.png";
const OUTPUT_PATH = "watermarked.mp4";
const VIDEO_PATH = "video.mp4";
const FILTER_COMPLEX_OPTIONS = "overlay=W-w-50:H-h-50";
async function watermarkIt() {
  try {
    fs.unlinkSync(OUTPUT_PATH);
  } catch (e) {}
  await ffmpeg.run(
    `-i ${VIDEO_PATH} -i ${IMG_PATH} -filter_complex "${FILTER_COMPLEX_OPTIONS}" ${OUTPUT_PATH}`
  );

  return "uploaded";
}
module.exports = watermarkIt;
