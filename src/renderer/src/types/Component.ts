export interface Component {
  id: string
  catalogId: string
  name: string
  type: 'CODE' | 'DESIGN'
  desc?: string
  data: unknown
}
