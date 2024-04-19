export interface Component {
  id: string
  catalogId: string | undefined
  name: string
  type: 'CODE' | 'DESIGN'
  description?: string
  data: string
  frequency?: number
  lastAccessed?: Date
  createdAt?: Date
}
