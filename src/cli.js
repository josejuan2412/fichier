import arg from "arg";
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import clear from "clear";
import _ from "lodash";
import {
  fileShare,
  setupURL,
  showFileQR,
  clearSharingFile,
  deleteSharingID,
  setupPort,
  getSetupPort,
} from "./index";
import { startServer } from "../app";
import path from "path";
import fs from "fs";

function parseArgumentsIntoOptions(rawArgs) {
  try {
    const args = arg(
      {
        "--start": Boolean,
        "--share": Boolean,
        "-s": "--share",
        "--config": Boolean,
        "-c": "--config",
        "--list": Boolean,
        "-l": "--list",
        "--display": Boolean,
        "-d": "--display",
        "--clear": Boolean,
        "--remove": Boolean,
        "-r": "--remove",
        "--help": Boolean,
        "-h": "--help",
      },
      {
        argv: rawArgs.slice(2),
      }
    );
    return {
      start: args["--start"] || false,
      share: args["--share"] || false,
      config: args["--config"] || false,
      list: args["--list"] || false,
      display: args["--display"] || false,
      clear: args["--clear"] || false,
      remove: args["--remove"] || false,
      help: args["--help"] || false,
      param: args._[0] || false,
      setup: args._[1] || false,
      extra: args._[2] || false,
    };
  } catch (e) {
    console.log(e);
  }
}

async function prompPathName(options) {
  try {
    const questions = [];
    questions.push({
      type: "input",
      name: "file",
      message: "Wich file you want to share?",
    });

    const answers = await inquirer.prompt(questions);
    if (answers.file.length == 0) {
      await prompPathName(options);
    }
    return {
      file: options.file || answers.file,
    };
  } catch (e) {
    console.log(e);
  }
}

export async function cli(args) {
  try {
    clear();
    console.log(
      chalk.blue(figlet.textSync("FICHIER", { horizontalLayout: "full" }))
    );
    let options = parseArgumentsIntoOptions(args);
    //console.log(options);
    let values = {
      param: options.param,
      setup: options.setup,
      extra: options.extra,
    };
    delete options.param;
    delete options.setup;
    delete options.extra;

    if (
      _.filter(options, function (o) {
        return o;
      }).length > 1
    ) {
      showErrorMessages("Multiple commands entered, please follow the usage.");
    } else {
      let selection = _.findKey(options, function (option) {
        return option;
      });
      switch (selection) {
        case "start":
          let port = await getSetupPort();
          await startServer(port);
          break;
        case "share":
          if (!values.param) options = await prompPathName(options);
          else options.param = values.param;
          await fileShare(options);
          break;
        case "config":
          if (!values.param)
            showErrorMessages("Please especify the configuration: URL, Port");
          else if (!values.setup)
            showErrorMessages("Please enter the configuration value.");
          switch (values.param) {
            case "url":
              await setupURL(values.setup);
              console.log("URL Access Updated Succesfully.");
              break;
            case "port":
              await setupPort(values.setup);
              console.log("Running port Updated Succesfully.");
              break;
            default:
              showErrorMessages("This configuration type is not allowed.");
              break;
          }
          break;
        case "list":
          let files = [];
          let fileLocation = path.join(__dirname, "../helpers/sharing.json");
          fs.readFile(fileLocation, (err, data) => {
            if (err) throw err;
            files = JSON.parse(data);
            console.log("*** Shared Files: ***");
            files.files.forEach(function (value, key) {
              console.log("  " + value.id + "\t" + value.path);
            });
            if (files.files.length == 0) {
              console.log(" \t No Files");
            }
            console.log("\n\n*** Shared Folders: ***");
            files.folders.forEach(function (value, key) {
              console.log("  " + value.id + "\t" + value.path);
            });
            if (files.folders.length == 0) {
              console.log(" \t No Shared Folders");
            }
            console.log(" \n");
          });
          break;
        case "display":
          if (!values.param) {
            showErrorMessages(
              "Please enter the ID of the file or folder you want to display."
            );
          } else {
            showFileQR(values.param);
          }
          break;
        case "clear":
          clearSharingFile();
          break;
        case "remove":
          if (!values.param) {
            showErrorMessages(
              "Please enter the ID of the file or folder you want to remove."
            );
          } else {
            deleteSharingID(values.param);
          }
          break;
        case "help":
          showHelpMessages();
          break;
        default:
          showHelpMessages();
          //mostUsedCommands();
          break;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

async function showErrorMessages(message) {
  try {
    console.log(chalk.red("Error: ") + message);
    showHelpMessages();
  } catch (e) {
    console.log(e);
  }
}

async function mostUsedCommands(value) {
  try {
  } catch (e) {
    console.log(e);
  }
}

async function showHelpMessages() {
  try {
    console.log("Share your files with ease.");
    console.log(" \n");
    console.log("Usage: " + chalk.blueBright("  fichier {command} [options]"));
    console.log(" \n");
    console.log("Comands: ");
    console.log(
      chalk.greenBright("  --start ") +
        " \t - Start sharing server from a task manager."
    );
    console.log(
      chalk.greenBright("  --share | -s") +
        " \t - Share files or folders from your computer."
    );
    console.log(
      chalk.greenBright("  --config | -c") +
        "  - Setup your sharing configuration."
    );
    console.log(
      chalk.greenBright("  --list | -l") +
        " \t - Show your currently sharing files or folders."
    );
    console.log(
      chalk.greenBright("  --display | -d") +
        " - Generate QR for an already shared file or folder."
    );
    console.log(
      chalk.greenBright("  --clear") + " \t - Clear your sharing list."
    );
    console.log(
      chalk.greenBright("  --remove | -r") +
        "  - Delete a file or folder from sharing."
    );
    console.log(chalk.redBright("  --help | -h") + " \t - Show CLI help.");
    console.log(" \n");
    console.log("Examples: ");
    console.log(chalk.yellowBright("  fichier -s /Desktop/images/img.png"));
    console.log(
      chalk.yellowBright("  fichier --share /Desktop/images/img.png")
    );
    console.log(chalk.yellowBright("  fichier config URL"));
    console.log(chalk.yellowBright("  fichier --remove FileID"));

    console.log(" \n");
  } catch (e) {
    console.log(e);
  }
}
