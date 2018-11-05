require('dotenv').config()
const { app, BrowserWindow } = require('electron')
var fs = require('fs')

let mainWindow

function createWindow() {
	console.log(`${__dirname}/favicon.ico`)
	mainWindow = new BrowserWindow({ 
		width: 800, 
		height: 600, 
		resizable: false,
		icon: `${__dirname}/favicon.ico`,
	})
	fs.writeFile('store.json', '{}', function (err) {
		if (err) {
			return console.log(err)
		}
	})
	mainWindow.loadFile('./src/index.html')
	mainWindow.webContents.openDevTools()
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