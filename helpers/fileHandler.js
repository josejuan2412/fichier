import fs from "fs";
import _ from "lodash";

export async function addFile(options) {
  return new Promise((resolve, reject) => {
    try {
      if (fs.existsSync(__dirname + "/sharing.json")) {
        fs.readFile(__dirname + "/sharing.json", (err, data) => {
          if (err) throw err;
          let files = JSON.parse(data);
          files["files"].push({
            id: options.id,
            path: options.param,
          });
          fs.writeFileSync(
            __dirname + "/sharing.json",
            JSON.stringify(files, null, 2)
          );
          if (err) throw err;
          resolve(options);
        });
      } else {
        let fileType = JSON.stringify(
          {
            files: [
              {
                id: options.id,
                path: options.param,
              },
            ],
            folders: [],
          },
          null,
          2
        );
        fs.writeFileSync(__dirname + "/sharing.json", fileType, (err) => {
          if (err) throw err;
          resolve(options);
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

export async function removeFile(value) {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(__dirname + "/sharing.json", (err, data) => {
        if (err) throw err;
        let doc = JSON.parse(data);
        doc.files = _.filter(doc.files, function (o) {
          return o.id !== value;
        });
        fs.writeFileSync(
          __dirname + "/sharing.json",
          JSON.stringify(doc, null, 2)
        );
        if (err) throw err;
        resolve();
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export async function getFilePath(id) {
  return new Promise((resolve, reject) => {
    try {
      if (fs.existsSync(__dirname + "/sharing.json")) {
        fs.readFile(__dirname + "/sharing.json", (error, data) => {
          if (error) console.error(error);
          let sharing = JSON.parse(data);
          let results = _.find(sharing.files, { id: id });
          if (!results) results = _.find(sharing.folders, { id: id });
          resolve(results);
        });
      } else {
        resolve(undefined);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export async function addFolder(options) {
  return new Promise((resolve, reject) => {
    try {
      let stats = fs.statSync(__dirname + "/sharing.json");
      fs.readFile(__dirname + "/sharing.json", (err, data) => {
        if (err) throw err;
        let files = JSON.parse(data);
        files["folders"].push({
          id: options.id,
          path: options.targetDirectory,
        });
        fs.writeFileSync(
          __dirname + "/sharing.json",
          JSON.stringify(files, null, 2)
        );
        if (err) throw err;
        resolve(options);
      });
    } catch (e) {
      let fileType = JSON.stringify(
        {
          files: [],
          folders: [{ id: options.id, path: options.targetDirectory }],
        },
        null,
        2
      );
      fs.writeFileSync(__dirname + "/sharing.json", fileType, (err) => {
        if (err) throw err;
        resolve(options);
      });
    }
  });
}

export async function removeFolder() {
  return new Promise((resolve, reject) => {
    try {
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

//CONFIG
export async function setURL(url) {
  return new Promise((resolve, reject) => {
    try {
      if (fs.existsSync(__dirname + "/config.json")) {
        fs.readFile(__dirname + "/config.json", (err, data) => {
          if (err) throw err;
          let config = JSON.parse(data);
          config["url"] = url;
          fs.writeFileSync(
            __dirname + "/config.json",
            JSON.stringify(config, null, 2)
          );
          if (err) throw err;
          resolve(url);
        });
      } else {
        let config = { url: url, port: 3000 };
        fs.writeFileSync(
          __dirname + "/config.json",
          JSON.stringify(config, null, 2)
        );
        resolve(url);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export async function setPort(port) {
  return new Promise((resolve, reject) => {
    try {
      if (fs.existsSync(__dirname + "/config.json")) {
        fs.readFile(__dirname + "/config.json", (err, data) => {
          if (err) throw err;
          let config = JSON.parse(data);
          config["port"] = port;
          fs.writeFileSync(
            __dirname + "/config.json",
            JSON.stringify(config, null, 2)
          );
          if (err) throw err;
          resolve(port);
        });
      } else {
        let config = { url: "http://localhost:3000", port: port };
        fs.writeFileSync(
          __dirname + "/config.json",
          JSON.stringify(config, null, 2)
        );
        resolve(port);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export async function getURL() {
  return new Promise((resolve, reject) => {
    try {
      if (fs.existsSync(__dirname + "/config.json")) {
        fs.readFile(__dirname + "/config.json", (error, data) => {
          if (error) console.error(error);
          let config = JSON.parse(data);
          resolve(config.url);
        });
      } else {
        let config = { url: "http://localhost:3000", port: 3000 };
        fs.writeFileSync(
          __dirname + "/config.json",
          JSON.stringify(config, null, 2)
        );
        resolve(config.url);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export async function getPort() {
  return new Promise((resolve, reject) => {
    try {
      if (fs.existsSync(__dirname + "/config.json")) {
        fs.readFile(__dirname + "/config.json", (error, data) => {
          if (error) console.error(error);
          let config = JSON.parse(data);
          resolve(config.port);
        });
      } else {
        let config = { url: "http://localhost:3000", port: 3000 };
        fs.writeFileSync(
          __dirname + "/config.json",
          JSON.stringify(config, null, 2)
        );
        resolve(config.port);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export async function clearSharing() {
  return new Promise((resolve, reject) => {
    try {
      let fileType = JSON.stringify(
        {
          files: [],
          folders: [],
        },
        null,
        2
      );
      fs.writeFileSync(__dirname + "/sharing.json", fileType, (err) => {
        if (err) throw err;
        resolve();
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
