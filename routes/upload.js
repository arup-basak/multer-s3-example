import { Router } from "express";
import "dotenv/config";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const router = Router();

const s3 = new S3Client({
  endpoint: "https://s3.amazonaws.com",
  region: process.env.TEST_AWS_REGION_NAME,
  credentials: {
    accessKeyId: process.env.TEST_AWS_ACCESS_KEY,
    secretAccessKey: process.env.TEST_AWS_ACCESS_SECRET,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.TEST_AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `.jpg`);
    },
  }),
});

router.post("/", (req, res, next) => {
  res.send(`<h1>Successfully uploaded file: </h1>`);
});

export default router;
