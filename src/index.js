import qrcode from "qrcode-terminal";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId();

import {
  getFilePath,
  addFile,
  addFolder,
  getURL,
  setURL,
  clearSharing,
  removeFile,
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

export async function setupURL(url) {
  try {
    await setURL(url);
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
      //console.log(file);
      await removeFile(id);
    } else {
      console.log("file does not exist, no changes were made.");
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

// export async function setupPort(port) {
//   try {
//     await setPort(port);
//     return;
//   } catch (e) {
//     console.log(e);
//   }
// }

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
