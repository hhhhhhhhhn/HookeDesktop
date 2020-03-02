const {app, BrowserWindow, ipcMain} = require('electron')
const hooke = require("hookejs")
const {sourcesToHTML, textToHTML} = require("./tools.js")
const Store = require('electron-store');
const store = new Store();

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "./static/images/favicon.png",
    webPreferences: {
      nodeIntegration: true
    }
  })


  mainWindow.removeMenu()

  // and load the index.html of the app.
  mainWindow.loadFile('./static/html/home.html')

  // Open the DevTools.
  if(process.argv[2] == "test"){
    mainWindow.webContents.openDevTools()
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.allowRendererProcessReuse = true

var text;

ipcMain.on("send", (event, ...args)=>{
  text = args[0]
})

ipcMain.handle("match", async (event, ...args) => {
  var settings = {
    ...JSON.parse(store.get("settings") || "{}"),
    ...{text: text}
  }
  const result = await hooke.match(settings)
  return sourcesToHTML(result, text, settings)
})

ipcMain.handle("autocitation", async (event, ...args) => {
  var settings = {
    ...JSON.parse(store.get("settings") || "{}"),
    ...{text: text},
    replace: true
  }
  const result = await hooke.autoCitation(settings)
  return textToHTML(result)
})