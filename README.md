[logo]: https://www.kindpng.com/picc/m/264-2643133_transparent-dead-fish-icon-hd-png-download.png "Logo"

![alt text][logo]

# Fichier

Share files from your computer with other devices even around the world with ease.

## Highlights

- Serve your files or folders with anyone in the world
- QR Generated for every shared file or folder
- Clean and impressive

## Installation

Visit the [API Documentation](https://github.com/josejuan2412/fichier) for a list of all methods available.

```bash
$ npm install fichier -g
```

## Usage

We recomend using a task manager like [Elk](https://github.com/jjzcru/elk) from our partner [@jjzcru](https://github.com/jjzcru) for running the server along with [NGROK](https://www.npmjs.com/package/ngrok) to allow people to access to the files from outside our LAN.

```
fichier --{command} [options]
```

### Available Commands

- **_start_**: Start sharing server from a task manager.
- **_share_**: Share files or folders from your computer.
- **_config_**: Setup your sharing configuration.
- **_list_**: Show your currently sharing files or folders.
- **_display_**: Generate QR for an already shared file or folder.
- **_clear_**: Clear your sharing list.
- **_remove_**: Delete a file or folder from sharing.
- **_help_**: Show CLI help.

## Examples

#### List al shared files or folders.

```
fichier --list
```

#### Change your access url to the files.

by default the tool is set to run on _localhost:3000_

```
fichier -c url url_to_access
```

#### change the running port for server.

by default the tool is set to run on 3000
**note**: this should match the port on the url.

```
fichier -c port running_port
```

#### Share a folder located in /desktop/images

```
fichier --share /folder_path/desktop/images

or

fichier -s
then follow the instructions.
```

## Examples

#### Clear al shared files or folders

```
fichier --clear
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

no licenses defined yet.
