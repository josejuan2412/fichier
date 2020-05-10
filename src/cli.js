import arg from "arg";
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import clear from "clear";
import _ from "lodash";
import path from "path";
import fs from "fs";

import { startServer } from "../app";
import {
  fileShare,
  setupURL,
  showFileQR,
  clearSharingFile,
  deleteSharingID,
  setupPort,
  getSetupPort,
  directoryShare,
} from "./index";

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
    showErrorMessages("Please enter a valid comand.");
    return false;
  }
}

async function prompPathName(options) {
  try {
    const questions = [];
    questions.push({
      type: "input",
      name: "file",
      message: "enter the file or folder you want to share?",
    });

    const answers = await inquirer.prompt(questions);
    if (answers.file.length == 0) {
      await prompPathName(options);
    }
    return {
      param: options.file || answers.file,
    };
  } catch (e) {
    console.log(e);
  }
}

async function prompConfigType(options) {
  try {
    const questions = [];

    if (!options.param) {
      questions.push({
        type: "list",
        name: "param",
        message: "Please choose the configuration to change:",
        choices: ["url", "Server Port"],
        default: "url",
      });
    }

    questions.push({
      type: "input",
      name: "setup",
      message: "Enter the value:",
    });

    const answers = await inquirer.prompt(questions);
    if (answers.setup.length == 0) {
      options.param = answers.param;
      var promptext = await prompConfigValue(options);
      return {
        param: options.param || answers.param,
      };
    }
    return {
      param: options.param || answers.param,
      setup: options.setup || answers.setup,
    };
  } catch (e) {
    console.log(e);
  }
}

async function prompConfigValue(options) {
  try {
    const questions = [];
    questions.push({
      type: "input",
      name: "setup",
      message: "Please enter the configuration value: ",
    });

    const answers = await inquirer.prompt(questions);
    if (answers.setup.length == 0) {
      console.log("No value were entered.");
      return;
    }
    return {
      param: options.param,
      setup: answers.setup,
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
    if (options) {
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
        showErrorMessages(
          "Multiple commands entered, please follow the usage."
        );
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
            !values.param && (values = await prompPathName(options));
            if (values.param.substring(0, 1) != "/")
              values.param = "/" + values.param;
            console.log("current folder: " + path.resolve(process.cwd()));
            fs.access(values.param, fs.F_OK, async (err) => {
              if (err) {
                fs.access(
                  path.resolve(process.cwd()) + values.param,
                  fs.F_OK,
                  async (err) => {
                    if (err) {
                      showErrorMessages("That file or folder does not exist");
                      return;
                    } else {
                      console.log(
                        "exist in: " +
                          path.resolve(process.cwd()) +
                          values.param
                      );
                      let stats = fs.lstatSync(
                        path.resolve(process.cwd()) + values.param
                      );
                      values.param = path.resolve(process.cwd()) + values.param;
                      if (stats.isDirectory()) {
                        await directoryShare(values);
                      } else if (stats.isFile()) {
                        await fileShare(values);
                      } else {
                        showErrorMessages(
                          "We cannot share the file or folder selected."
                        );
                      }
                    }
                  }
                );
                return;
              } else {
                let stats = fs.lstatSync(values.param);
                if (stats.isDirectory()) {
                  await directoryShare(values);
                } else if (stats.isFile()) {
                  await fileShare(values);
                } else {
                  showErrorMessages(
                    "We cannot share the file or folder selected."
                  );
                }
                return;
              }
            });
            break;
          case "config":
            if (!values.param) {
              values = await prompConfigType(values);
            } else if (!values.setup) {
              values = await prompConfigValue(values);
            }
            if (values.param && values.setup) {
              switch (values.param) {
                case "url":
                  var regex = RegExp("(https?://.*)");
                  if (regex.test(values.setup)) {
                    await setupURL(values.setup);
                    console.log("URL Access Updated Succesfully.");
                  } else {
                    showErrorMessages(
                      "Invalid URL: should be protocol+addres +optional:port (example: http://localhost:3000 or https://999999.ngrok.io)"
                    );
                  }
                  break;
                case "port":
                  var regex = RegExp(
                    "^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$"
                  );
                  if (regex.test(values.setup)) {
                    await setupPort(values.setup);
                    console.log("Running port Updated Succesfully.");
                  } else {
                    showErrorMessages(
                      "Invalid port: should be a number between [1 - 65535]"
                    );
                  }
                  break;
                default:
                  showErrorMessages("This configuration type is not allowed.");
                  break;
              }
            } else {
              showErrorMessages("Missing configuration value.");
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
              console.log("Config file location: " + __dirname + "/helpers");
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
            console.log("Sharing cleared successfully.");
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
            break;
        }
      }
    }
  } catch (e) {
    showErrorMessages("There was an error, please try again.");
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
