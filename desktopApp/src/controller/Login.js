const electron = require('electron');
const cu = require('./CommonUtil.js');
const { ipcRenderer } = electron;
class Login {
    constructor() {
        this.cu = new cu.CommonUtil;
    }

    loginCheck(userName, password) {
        console.log(userName + " " + password);
        if (userName == 'admin' && password == '123') {
            ipcRenderer.send('login:status', 1);
        } else {
            ipcRenderer.send('login:status', 0);
        }

    }
}

module.exports = { Login };