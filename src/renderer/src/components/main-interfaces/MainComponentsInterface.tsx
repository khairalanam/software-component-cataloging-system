import { Component } from '@/types/Component'
import { useEffect, useState } from 'react'
import ComponentCard from '../ComponentCard'

const MainComponentsInterface = (): JSX.Element => {
  const [components, setComponents] = useState<Component[]>()

  useEffect(() => {
    const fetchingComponents = async (): Promise<void> => {
      const fetchedComponents = await window.db.db.fetchComponents()
      setComponents(fetchedComponents)
    }

    fetchingComponents()
  }, [])

  return (
    <ul className="bg-zinc-700 p-4 rounded-lg max-h-fit grid grid-flow-row grid-cols-3 gap-4 max-lg:grid-cols-2">
      {components &&
        components.map(({ id, catalog_id, name, type, description, data }) => (
          <ComponentCard
            key={id}
            catalogId={catalog_id}
            id={id}
            name={name}
            description={description}
            type={type}
            data={data}
          />
        ))}
    </ul>
  )
}

export default MainComponentsInterface
