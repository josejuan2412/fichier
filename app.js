import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { getFilePath, getFolderPath } from "./helpers/fileHandler";

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/download/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let type = "file";
    let result = await getFilePath(id);
    if (result) {
      res.download(result.path);
    } else if (!result) {
      result = await getFolderPath(id);
      res.download(path.join(result.path + "../") + "fishier-" + id + ".zip");
    } else {
      res.status(404).send({
        payload: {
          message: "not found.",
        },
      });
    }
  } catch (e) {
    res.status(500).send({
      payload: {
        message: "Internal Server Error.",
      },
    });
  }
});

export async function startServer(port) {
  try {
    app.listen(port, () => {
      console.log(`WAITING FOR FILE DOWNLOADS ON PORT: ${port}`);
    });
    return port;
  } catch (e) {
    console.log(e);
  }
}
