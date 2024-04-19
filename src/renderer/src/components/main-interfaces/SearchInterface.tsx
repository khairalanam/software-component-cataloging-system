import { Component } from '@/types/Component'
import { useEffect, useState } from 'react'
import ComponentCard from '../ComponentCard'

const SearchInterface = (): JSX.Element => {
  const [components, setComponents] = useState<Component[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    const fetchingComponents = async (): Promise<void> => {
      const fetchedComponents = await window.db.db.fetchComponents()
      setComponents(fetchedComponents)
    }

    fetchingComponents()
  }, [])

  console.log(components)

  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-zinc-700 p-4 rounded-lg max-h-fit">
      <input
        type="text"
        placeholder="Search components..."
        className="bg-zinc-800 text-white rounded-md mb-4 focus:outline-none w-full p-4 hover:bg-zinc-900 transition-colors focus:bg-zinc-900"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul className="grid grid-flow-row grid-cols-3 gap-4 max-lg:grid-cols-2">
        {filteredComponents.map(({ id, catalogId, name, type, description, data }) => (
          <ComponentCard
            key={id}
            catalogId={catalogId}
            id={id}
            name={name}
            description={description}
            type={type}
            data={data}
          />
        ))}
      </ul>
    </div>
  )
}

export default SearchInterface
