import { Catalog } from '@/types/Catalog'
import { useEffect, useState } from 'react'
import CatalogCard from '../CatalogCard'

const CatalogsInterface = (): JSX.Element => {
  const [catalogs, setCatalogs] = useState<Catalog[]>()

  // const testCatalogs: Catalog[] = [
  //   {
  //     id: '1',
  //     name: 'UI Components',
  //     desc: 'Catalog of reusable UI components for web development',
  //     author: 'John Doe'
  //   },
  //   {
  //     id: '2',
  //     name: 'Code Snippets',
  //     desc: 'Collection of useful code snippets for common tasks',
  //     author: ''
  //   },
  //   {
  //     id: '3',
  //     name: 'Frontend Frameworks',
  //     desc: 'Catalog of frontend frameworks and libraries',
  //     author: 'Jane Smith'
  //   },
  //   {
  //     id: '4',
  //     name: 'Backend APIs',
  //     desc: 'Catalog of backend API endpoints and documentation',
  //     author: ''
  //   },
  //   {
  //     id: '5',
  //     name: 'Database Schemas',
  //     desc: '',
  //     author: 'Bob Williams'
  //   },
  //   {
  //     id: '6',
  //     name: 'Utility Functions',
  //     desc: 'Collection of utility functions for common tasks',
  //     author: ''
  //   },
  //   {
  //     id: '7',
  //     name: 'Code Templates',
  //     desc: 'Catalog of code templates for starting new projects',
  //     author: 'Emily Johnson'
  //   },
  //   {
  //     id: '8',
  //     name: 'Testing Tools',
  //     desc: 'Catalog of testing tools and libraries',
  //     author: ''
  //   },
  //   {
  //     id: '9',
  //     name: 'Deployment Scripts',
  //     desc: 'Collection of deployment scripts for various platforms',
  //     author: 'Alex Wilson'
  //   },
  //   {
  //     id: '10',
  //     name: 'Error Handlers',
  //     desc: 'Catalog of error handling utilities and strategies',
  //     author: ''
  //   }
  // ]

  useEffect(() => {
    const fetchingCatalogs = async (): Promise<void> => {
      // await window.db.db.insertCatalogs()
      const fetchedCatalogs = await window.db.db.fetchCatalogs()
      setCatalogs(fetchedCatalogs)
    }

    fetchingCatalogs()
  }, [])

  console.log('catalogs: ', catalogs)

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
