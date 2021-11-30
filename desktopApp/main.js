const electron = require('electron');
const cu = require('./src/controller/CommonUtil.js');
const { app, Menu, ipcMain } = electron;

//Set Env
process.env.NODE_ENV = 'production';

let loginWindow;
let aboutWindow;
let cuObject;
let homeWindow;

//App Ready
app.on('ready', function(){
    //Create CommonUtil Object
    cuObject = new cu.CommonUtil;

    //Create Main window
    loginWindow = cuObject.createWindow('./src/ui/index.html', null, null, null);

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

ipcMain.on('login:status', function(e, item){
    if(item == 1){
        homeWindow = cuObject.createWindow('./src/ui/admin/home.html', null, null, null);
        loginWindow.close();
    }
});

//Start Menu Template Management
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'About',
                click(){
                    aboutWindow = cuObject.createWindow('./src/ui/about.html', cuObject.subWindowWidth, cuObject.subWindowHeight, 'About');
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ],
    },
]

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+i' : 'Ctrl+i',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}

//End Menu Template Management