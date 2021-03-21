const electron = require('electron');
const url = require('url');
const path = require('path');
require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
});
const {app, BrowserWindow, Menu, ipcMain} = electron;

// SET ENV
process.env.NODE_ENV = 'production';

let mainWindow;
let addWindow;

// listen for app to be ready
app.on('ready', function(){
    // create new window
    mainWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true
        }
    });

    // load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        rotocol: 'file:',
        slashes: true
    }));
    // quit app when closed (for all windows)
    mainWindow.on('closed', function(){
        app.quit();
    });

    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu)
});

// creating add window
function createAddWindow(){
    //create new window
    addWindow = new BrowserWindow({
        width: 600,
        height: 400,
        title: 'Graph',
        webPreferences: {
            nodeIntegration: true
        }
    });
    // load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'graph.html'),
        rotocol: 'file:',
        slashes: true
    }));
    // collection rubber
    addWindow.on('close', function(){
        addWindow = null;
    })
}

// Catch item (table)
ipcMain.on('Graph:submit', function(event, proxylist){
    try{
    console.log(proxylist, "MAIN.JS");
    addWindow.webContents.send('Graphic:metadata', proxylist);    
    }
    catch{
        console.log("window graphic didn't open")
    }
    //addWindow.close;
})


// create menu template
const mainMenuTemplate = [
    {
        label: 'Аналитика',
        submenu: [
            {
                label: 'График',
                accelerator: process.platform == 'darwin' ? 'Command+G' :
                'Ctrl+G',
                click(){
                    createAddWindow();
                }
            },
            // {
            //     // label: 'Quit',
            //     // accelerator: process.platform == 'darwin' ? 'Command+W' :
            //     // 'Ctrl+W',
            //     // click(){
            //     //     app.quit();
            //     // }
            // }
        ]
    }
];

// if mac, add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// add dev tools item if not in production
if(process.env.NODE_ENV == 'production'){
    mainMenuTemplate.push({
        label: 'Средства',
        submenu:[
            {
                label: 'Инструменты разрабочика',
                accelerator: process.platform == 'darwin' ? 'Command+I' :
                'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload',
                label: 'Обновление'
            },
            {
                label: 'Выход',
                accelerator: process.platform == 'darwin' ? 'Command+W' :
                'Ctrl+W',
                click(){
                    app.quit();
                }
            }            
        ]
    })
}