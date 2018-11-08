const { app, BrowserWindow } = require('electron')
var fs = require('fs')

let mainWindow

function createWindow() {
	mainWindow = new BrowserWindow({ 
		width: 800, 
		height: 600, 
		resizable: false,
	})
	fs.writeFile('store.json', '{}', function (err) {
		if (err) {
			return console.log(err)
		}
	})
	mainWindow.loadFile('./src/index.html')
	//mainWindow.webContents.openDevTools()
	mainWindow.setMenu(null)

	mainWindow.on('closed', function () {
		fs.writeFile('store.json', '{}', function (err) {
			if (err) {
				return console.log(err)
			}
		})
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	fs.writeFile('store.json', '{}', function (err) {
		if (err) {
			return console.log(err)
		}
	})
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow()
	}
})