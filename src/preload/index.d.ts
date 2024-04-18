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
        insertCatalogs: () => void
        fetchSingleCatalog: (string) => Catalog
      }
    }
  }
}
