import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import Database from 'better-sqlite3'

const dbPath = 'db/data.db'

export const db: Database.Database = new Database(dbPath)
db.pragma('journal_mode = WAL')

// Custom APIs for renderer
const api = {}

if (!process.contextIsolated)
  throw new Error('contextIsolation must be enabled in the browser window.')

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('db', {
      db: {
        fetchCatalogs: async () => {
          try {
            const fetchedCatalogs = await ipcRenderer.invoke('fetch-catalogs')
            return fetchedCatalogs
          } catch (error) {
            console.error('Error fetching catalogs from database:', error)
            throw error
          }
        },
        fetchComponents: async () => {
          try {
            const fetchedComponents = await ipcRenderer.invoke('fetch-components')
            return fetchedComponents
          } catch (error) {
            console.error('Error fetching components from database:', error)
            throw error
          }
        }
      }
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
