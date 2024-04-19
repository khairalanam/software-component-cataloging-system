import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import Database from 'better-sqlite3'
import { Catalog } from '@/types/Catalog'
import { Component } from '@/types/Component'

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
      return fetchedCatalogs
    } catch (error) {
      console.error('Error fetching catalogs:', error)
      throw error
    }
  })

  ipcMain.handle('create-tables', async () => {
    const database = await db
    const catalogTable = await database
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

    console.log(catalogTable.changes)

    const componentTable = await database
      .prepare(
        `
    CREATE TABLE IF NOT EXISTS components (
      id VARCHAR(17) PRIMARY KEY,
      name TEXT,
      type TEXT,
      catalog_id VARCHAR(16),
      data TEXT,
      description TEXT,
      frequency INTEGER DEFAULT 0,
      last_accessed DATETIME,
      created_at DATETIME,
      FOREIGN KEY (catalog_id) REFERENCES catalogs(id)
    )
    `
      )
      .run()

    console.log(componentTable.changes)
  })

  ipcMain.handle('fetch-components', async () => {
    try {
      const database = await db
      const fetchedComponents = await database.prepare('SELECT * FROM components').all()
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
      return fetchedCatalog
    } catch (error) {
      console.error('Error fetching single catalog', error)
      throw error
    }
  })

  ipcMain.handle('insert-catalog', async (_, newCatalog) => {
    try {
      const database = await db
      const newCatalogInsert = await database.prepare('INSERT into catalogs VALUES (?, ?, ?, ?)')

      const insertOne = database.transaction((catalog: Catalog) => {
        newCatalogInsert.run(catalog.id, catalog.name, catalog.description, catalog.author)
      })

      await insertOne(JSON.parse(newCatalog))
    } catch (error) {
      console.error('Error inserting catalogs:', error)
      throw error
    }
  })

  ipcMain.handle('update-catalog', async (_, updatedCatalog) => {
    try {
      const database = await db
      const newCatalogUpdate = await database.prepare(
        'UPDATE catalogs SET name = ?, description = ?, author = ? WHERE id = ?'
      )

      const updateOne = database.transaction((catalog: Catalog) => {
        newCatalogUpdate.run(catalog.name, catalog.description, catalog.author, catalog.id)
      })

      await updateOne(JSON.parse(updatedCatalog))
    } catch (error) {
      console.error('Error updating catalog:', error)
      throw error
    }
  })

  ipcMain.handle('delete-catalog', async (_, deletedCatalogId) => {
    try {
      const database = await db
      const catalogDelete = await database.prepare('DELETE from catalogs WHERE id = ?')
      const componentsDelete = await database.prepare('DELETE from components WHERE catalog_id = ?')
      const emptyDelete = await database.prepare('DELETE from catalogs where name is NULL')

      const deleteOne = database.transaction((catalogId: string) => {
        componentsDelete.run(catalogId)
        catalogDelete.run(catalogId)
        emptyDelete.run()
      })

      await deleteOne(deletedCatalogId)
    } catch (error) {
      console.error('Error deleting catalog:', error)
      throw error
    }
  })

  ipcMain.handle('fetch-components-by-catalog', async (_, catalogId) => {
    try {
      const database = await db
      const fetchedComponents = await database
        .prepare('SELECT * FROM components WHERE catalog_id = ?')
        .all(catalogId)

      return fetchedComponents
    } catch (error) {
      console.error('Error fetching components:', error)
      throw error
    }
  })

  ipcMain.handle('insert-component', async (_, newComponent, lastAccessed, createdAt) => {
    try {
      const database = await db
      const newComponentInsert = await database.prepare(
        'INSERT into components VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      )

      const insertOne = database.transaction((component: Component) => {
        newComponentInsert.run(
          component.id,
          component.name,
          component.type,
          component.catalogId,
          component.data,
          component.description,
          component.frequency,
          lastAccessed!.toISOString().slice(0, 19).replace('T', ' '),
          createdAt!.toISOString().slice(0, 19).replace('T', ' ')
        )
      })

      await insertOne(JSON.parse(newComponent))
    } catch (error) {
      console.error('Error inserting component:', error)
      throw error
    }
  })

  ipcMain.handle('fetch-single-component', async (_, componentId) => {
    try {
      const database = await db
      const fetchedComponent = await database
        .prepare('SELECT * FROM components WHERE id = ?')
        .get(componentId)
      return fetchedComponent
    } catch (error) {
      console.error('Error fetching single component', error)
      throw error
    }
  })

  ipcMain.handle('delete-component', async (_, deletedComponentId) => {
    try {
      const database = await db
      const componentDelete = await database.prepare('DELETE from components WHERE id = ?')
      const emptyDelete = await database.prepare('DELETE from components where name is NULL')

      const deleteOne = database.transaction((componentId: string) => {
        componentDelete.run(componentId)
        emptyDelete.run()
      })

      await deleteOne(deletedComponentId)
    } catch (error) {
      console.error('Error deleting component:', error)
      throw error
    }
  })

  ipcMain.handle('update-component', async (_, updatedComponent) => {
    try {
      const database = await db
      const newComponentUpdate = await database.prepare(
        'UPDATE components SET name = ?, description = ?, data = ? WHERE id = ?'
      )

      const updateOne = database.transaction((component: Component) => {
        newComponentUpdate.run(component.name, component.description, component.data, component.id)
      })

      await updateOne(JSON.parse(updatedComponent))
    } catch (error) {
      console.error('Error updating component:', error)
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
