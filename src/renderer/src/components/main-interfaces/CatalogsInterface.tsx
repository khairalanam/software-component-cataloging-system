import { Catalog } from '@/types/Catalog'
import { useEffect, useState } from 'react'
import CatalogCard from '../CatalogCard'

const CatalogsInterface = (): JSX.Element => {
  const [catalogs, setCatalogs] = useState<Catalog[]>()

  useEffect(() => {
    const fetchingCatalogs = async (): Promise<void> => {
      const fetchedCatalogs = await window.db.db.fetchCatalogs()
      setCatalogs(fetchedCatalogs)
    }

    fetchingCatalogs()
  }, [])

  return (
    <ul className="bg-zinc-700 p-4 rounded-lg max-h-fit grid grid-flow-row grid-cols-3 gap-4 max-lg:grid-cols-2">
      {catalogs &&
        catalogs.map(({ id, name, description, author }) => (
          <CatalogCard key={id} id={id} name={name} description={description} author={author} />
        ))}
    </ul>
  )
}

export default CatalogsInterface
