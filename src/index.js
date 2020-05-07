import qrcode from "qrcode-terminal";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId();

import {
  getFilePath,
  getFolderPath,
  addFile,
  addDirectory,
  getURL,
  setURL,
  clearSharing,
  removeFile,
  removeDirectory,
  setPort,
  getPort,
} from "../helpers/fileHandler";

export async function fileShare(options) {
  try {
    let id = uid();
    var exist = false;
    do {
      if (await getFilePath(id)) {
        exist = !exist;
      }
    } while (exist);
    options = {
      ...options,
      targetDirectory: options.targetDirectory || process.cwd(),
      currentFileUrl: import.meta.url,
      id: id,
    };

    await addFile(options);
    let url = await getURL();
    await generateQR(url + "/download/" + options.id);
    return;
  } catch (e) {
    console.log(e);
  }
}

export async function directoryShare(options) {
  try {
    let id = uid();
    var exist = false;
    do {
      if (await getFilePath(id)) {
        exist = !exist;
      }
    } while (exist);
    options = {
      ...options,
      targetDirectory: options.targetDirectory || process.cwd(),
      currentFileUrl: import.meta.url,
      id: id,
    };
    await addDirectory(options);
    let url = await getURL();
    await generateQR(url + "/download/" + options.id);
    return options;
  } catch (e) {
    console.log(e);
  }
}

export async function getSetupPort() {
  try {
    let port = await getPort();
    return port;
  } catch (e) {
    console.log(e);
  }
}

export async function setupURL(url) {
  try {
    await setURL(url);
    return;
  } catch (e) {
    console.log(e);
  }
}

export async function setupPort(port) {
  try {
    await setPort(port);
    return;
  } catch (e) {
    console.log(e);
  }
}

export async function showFileQR(id) {
  try {
    let file = await getFilePath(id);
    if (file) {
      let url = await getURL();
      await generateQR(url + "/download/" + file.id);
    }
    return;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteSharingID(id) {
  try {
    let file = await getFilePath(id);
    if (file) {
      await removeFile(id);
      console.log(id + " file deleted Succesfully.");
    } else if (await getFolderPath(id)) {
      await removeDirectory(id, await getFolderPath(id));
      console.log(id + " directory deleted Succesfully.");
    } else {
      console.log("this ID does not exist, no changes were made.");
    }
    return;
  } catch (e) {
    console.log(e);
  }
}

export async function clearSharingFile() {
  try {
    await clearSharing();
    return;
  } catch (e) {
    console.log(e);
  }
}

const generateQR = async (text) => {
  try {
    qrcode.generate(text, function (qrcode) {
      console.log(qrcode);
    });
    console.log("URL: " + text);
  } catch (err) {
    console.error(err);
  }
};
