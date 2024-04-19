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
    <section className="mt-12 bg-zinc-700 p-4 rounded-lg max-h-fit grid grid-flow-row grid-cols-3 gap-4 max-lg:grid-cols-2 text-white">
      {catalogComponents &&
        catalogComponents.map(({ id, catalogId, name, type, desc, data }) => (
          <ComponentCard
            key={id}
            catalogId={catalogId}
            id={id}
            name={name}
            desc={desc}
            type={type}
            data={data}
          />
        ))}
    </section>
  )
}

export default ListOfComponents
