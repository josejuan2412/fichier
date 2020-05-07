import express from "express";
import bodyParser from "body-parser";
import { renderDownloadView } from "./views/render.js";
import { getFilePath } from "./helpers/fileHandler";

const app = express();

// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );

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

// app.get("/", function (req, res) {
//   let viewContent = renderDownloadView();
//   res.send(viewContent);
// });

app.get("/download/:file", async (req, res) => {
  let file = req.params.file;
  let result = await getFilePath(file);
  console.log(result);
  if (result) {
    res.download(result.path);
  } else {
    res.status(404).send({
      status: 404,
      success: false,
      payload: {
        message: "File not found.",
      },
    });
  }
});

// app.get("/folder", function (req, res) {
//   console.log(express.static(__dirname + "/src"));
//   express.static(__dirname + "/src");
// });

// app.use("/folder", function (req, res) {
//   express.static("src"), serveIndex("src", { icons: true });
// });
// app.use(
//   "/folder/:file",
//   express.static("src"),
//   serveIndex("src", { icons: true })
// );

// app.use("/folder/:id", function (req, res, next) {
//   console.log(req);
//   express.static("src"), serveIndex("src", { icons: true });
//   next();
// });

const PORT = process.env.PORT || 3000;

async function startServer() {
  app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
    console.log("WAITING FOR FILE DOWNLOADS");
  });
}

startServer();
