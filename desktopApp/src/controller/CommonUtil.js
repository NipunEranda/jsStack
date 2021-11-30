const electron = require('electron');
const { app, BrowserWindow } = electron;
class CommonUtil {
    constructor() {
        this.subWindowHeight = 400;
        this.subWindowWidth = 400;
    }

    //Create a window
    createWindow(path, width, height, title) {
        let window;
        if (width == null && height == null && title == null) {
            window = new BrowserWindow({
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false,
                    enableRemoteModule: true,
                },
            });
        }else{
            window = new BrowserWindow({
                width: width,
                height: height,
                title: title,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false,
                    enableRemoteModule: true,
                },
            });
        }
        window.loadFile(path);
        window.on('close', function(){
            window = null;
        });
        return window;
    }
}
module.exports = { CommonUtil };