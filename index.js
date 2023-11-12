import express from "express";
import "dotenv/config";
import uploadRouter from "./routes/upload.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>File Upload</title>
      </head>
      <body>
          <h2>File Upload Form</h2>
          <form action="/upload" method="post" enctype="multipart/form-data">
              <label for="file">Select a file:</label>
              <input type="file" name="photo" />
              <input type="submit" value="Upload" />
          </form>
      </body>
      </html>
  `);
});

app.use("/upload", uploadRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
