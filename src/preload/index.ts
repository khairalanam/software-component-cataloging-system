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
        },
        insertCatalog: async (newCatalog) => {
          try {
            // await ipcRenderer.invoke('create-tables')
            await ipcRenderer.invoke('insert-catalog', newCatalog)
            console.log('Actually Inserted!')
          } catch (error) {
            console.error('Error inserting catalog to database:', error)
            throw error
          }
        },
        fetchSingleCatalog: async (catalogId) => {
          try {
            const fetchedCatalog = await ipcRenderer.invoke('fetch-single-catalog', catalogId)
            return fetchedCatalog
          } catch (error) {
            console.error('Error fetching single catalog from database:', error)
            throw error
          }
        },
        updateCatalog: async (updatedCatalog) => {
          try {
            // await ipcRenderer.invoke('create-tables')
            await ipcRenderer.invoke('update-catalog', updatedCatalog)
            console.log('Actually Updated!')
          } catch (error) {
            console.error('Error updating catalog in database:', error)
            throw error
          }
        },
        deleteCatalog: async (deletedCatalogId) => {
          try {
            await ipcRenderer.invoke('delete-catalog', deletedCatalogId)
            console.log('Actually Deleted!')
          } catch (error) {
            console.error('Error deleting catalog from database:', error)
            throw error
          }
        },
        fetchComponentsByCatalog: async (catalogId) => {
          try {
            // await ipcRenderer.invoke('create-tables')
            const fetchedComponents = await ipcRenderer.invoke(
              'fetch-components-by-catalog',
              catalogId
            )
            return fetchedComponents
          } catch (error) {
            console.error('Error fetching components from database:', error)
            throw error
          }
        },
        insertComponent: async (newComponent, lastAccessed, createdAt) => {
          try {
            // await ipcRenderer.invoke('create-tables')
            await ipcRenderer.invoke('insert-component', newComponent, lastAccessed, createdAt)
            console.log('Actually Comp Inserted!')
          } catch (error) {
            console.error('Error inserting component to database:', error)
            throw error
          }
        },
        fetchSingleComponent: async (componentId) => {
          try {
            console.log('Really')
            const fetchedComponent = await ipcRenderer.invoke('fetch-single-component', componentId)
            return fetchedComponent
          } catch (error) {
            console.error('Error fetching single component from database:', error)
            throw error
          }
        },
        deleteComponent: async (deletedComponentId) => {
          try {
            await ipcRenderer.invoke('delete-component', deletedComponentId)
            console.log('Actually Deleted Component!')
          } catch (error) {
            console.error('Error deleting component from database:', error)
            throw error
          }
        },
        updateComponent: async (updatedComponent) => {
          try {
            // await ipcRenderer.invoke('create-tables')
            await ipcRenderer.invoke('update-component', updatedComponent)
            console.log('Actually Component Updated!')
          } catch (error) {
            console.error('Error updating component in database:', error)
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
