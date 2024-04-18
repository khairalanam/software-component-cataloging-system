import { Catalog } from '@/types/Catalog'
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    db: {
      db: {
        fetchCatalogs: () => Catalog[]
      }
    }
  }
}
