import { Component } from '@/types/Component'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ComponentCard from '../ComponentCard'

const ListOfComponents = (): JSX.Element => {
  const { catalogId } = useParams()
  const [catalogComponents, setCatalogComponents] = useState<Component[]>([])
  useEffect(() => {
    const fetchingComponents = async (): Promise<void> => {
      const fetchedComponents = await window.db.db.fetchComponentsByCatalog(catalogId)
      setCatalogComponents(fetchedComponents)
    }

    fetchingComponents()
  }, [catalogId])

  return (
    <section className="mt-12 bg-zinc-700 p-4 rounded-lg max-h-72 overflow-auto scrollbar scrollbar-none grid grid-flow-row grid-cols-3 gap-4 max-lg:grid-cols-2 text-white">
      {catalogComponents &&
        catalogComponents.map((component: Component) => (
          <ComponentCard
            key={component.id}
            catalogId={component.catalog_id}
            id={component.id}
            name={component.name}
            description={component.description}
            type={component.type}
            data={component.data}
          />
        ))}
    </section>
  )
}

export default ListOfComponents
