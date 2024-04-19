import { Catalog } from '@/types/Catalog'
import { Component } from '@/types/Component'
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    db: {
      db: {
        fetchCatalogs: () => Catalog[]
        fetchComponents: () => Component[]
        insertCatalog: (string) => void
        fetchSingleCatalog: (string) => Catalog
        updateCatalog: (string) => void
        deleteCatalog: (string) => void
        fetchComponentsByCatalog: (string) => Component[]
        insertComponent: (string, Date, Date) => void
        fetchSingleComponent: (string) => Component
        deleteComponent: (string) => void
      }
    }
  }
}
