const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const watermarkIt = require("./watermark");
const app = express();

const UPLOADED_VIDEO_PATH = path.join(__dirname, "video.mp4");
const WATERMARKED_FILE_PATH = path.join(__dirname, "watermarked.mp4");
app.use(fileUpload());

app.post("/upload-vid", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  let video = req.files.video;
  video.mv(UPLOADED_VIDEO_PATH, async function (err) {
    if (err) return res.status(500).send(err);
    await watermarkIt();
    res.sendFile(WATERMARKED_FILE_PATH, (err) => {
      res.send(err);
    });
  });
});

app.listen(3000, () => {
  console.log("server is up");
});
