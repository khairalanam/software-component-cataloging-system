import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png'
import Database from 'better-sqlite3'
import { Catalog } from '@/types/Catalog'

const dbPath = 'db/data.db'

export const db: Database.Database = new Database(dbPath)
db.pragma('journal_mode = WAL')

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    center: true,
    title: 'SCCS',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.handle('fetch-catalogs', async () => {
    try {
      const database = await db
      const fetchedCatalogs = await database.prepare('SELECT * FROM catalogs').all()
      console.log('Yay!')
      return fetchedCatalogs
    } catch (error) {
      console.error('Error fetching catalogs:', error)
      throw error
    }
  })

  ipcMain.handle('create-tables', async () => {
    const database = await db
    const newTable = await database
      .prepare(
        `
    CREATE TABLE IF NOT EXISTS catalogs (
      id VARCHAR(16) PRIMARY KEY,
      name TEXT,
      description TEXT,
      author TEXT
    )
  `
      )
      .run()

    console.log(newTable.changes)

    // await database.exec(`
    // CREATE TABLE IF NOT EXISTS components (
    //   id INTEGER PRIMARY KEY,
    //   name TEXT,
    //   type TEXT,
    //   catalog_id INTEGER,
    //   data TEXT,
    //   description TEXT,
    //   frequency INTEGER DEFAULT 0,
    //   last_accessed TEXT,
    //   created_at TEXT,
    //   FOREIGN KEY (catalog_id) REFERENCES catalogs(id)
    // )
    // `)

    console.log('Tables created!')
  })

  ipcMain.handle('fetch-components', async () => {
    try {
      const database = await db
      const fetchedComponents = await database.prepare('SELECT * FROM components').all()
      console.log('Yay Yay!')
      return fetchedComponents
    } catch (error) {
      console.error('Error fetching components:', error)
      throw error
    }
  })

  ipcMain.handle('fetch-single-catalog', async (_, catalogId) => {
    try {
      const database = await db
      const fetchedCatalog = await database
        .prepare('SELECT * FROM catalogs WHERE id = ?')
        .get(catalogId)
      console.log('Even Yay!')
      return fetchedCatalog
    } catch (error) {
      console.error('Error fetching single catalog', error)
      throw error
    }
  })

  ipcMain.handle('test-insert-catalogs', async () => {
    try {
      const database = await db
      const newCatalogInsert = await database.prepare('INSERT into catalogs VALUES (?, ?, ?, ?)')

      const insertMany = database.transaction((catalogs: Catalog[]) => {
        for (const catalog of catalogs)
          newCatalogInsert.run(catalog.id, catalog.name, catalog.description, catalog.author)
      })

      const testCatalogs: Catalog[] = [
        {
          id: 'CAT-1A2B3C4D5E6F',
          name: 'Test Catalog 1',
          description: 'Test Desc 1',
          author: 'John Doe'
        },
        {
          id: 'CAT-7G8H9I0J1K2',
          name: 'Test Catalog 2',
          description: 'Test Desc 2',
          author: 'Jane Smith'
        },
        {
          id: 'CAT-3L4M5N6O7P8',
          name: 'Test Catalog 3',
          description: 'Test Desc 3',
          author: 'Bob Williams'
        }
      ]

      await insertMany(testCatalogs)
      console.log('Insert Yay!')
    } catch (error) {
      console.error('Error inserting catalogs:', error)
      throw error
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
