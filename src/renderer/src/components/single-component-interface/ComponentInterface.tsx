import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../Button'
import { Component } from '@/types/Component'

const ComponentInterface = (): JSX.Element => {
  const { componentId } = useParams()
  const [component, setComponent] = useState<Component>({
    id: '',
    catalogId: '',
    name: '',
    type: 'CODE',
    description: '',
    data: '',
    frequency: 0,
    lastAccessed: new Date(),
    createdAt: new Date()
  })

  useEffect(() => {
    const fetchingComponent = async (): Promise<void> => {
      console.log('fetch notfetching')
      const fetchedComponent = await window.db.db.fetchSingleComponent(componentId)
      setComponent(fetchedComponent)
      console.log('True?: ', component)
    }

    fetchingComponent()
  }, [componentId])

  console.log('Component Fetched I guess:', componentId)

  // (
  //   `
  // CREATE TABLE IF NOT EXISTS components (
  // id VARCHAR(17) PRIMARY KEY,
  // name TEXT,
  // type TEXT,
  // catalog_id VARCHAR(16),
  // data TEXT,
  // description TEXT,
  // frequency INTEGER DEFAULT 0,
  // last_accessed DATETIME,
  // created_at DATETIME,
  // FOREIGN KEY (catalog_id) REFERENCES catalogs(id)
  // )
  // `
  // )

  return (
    <>
      <section className="text-white">
        <div className="flex justify-between">
          <Button text="Go Back" link={`/catalogs/${component?.catalog_id}`} reactIcon={null} />
          <Button
            text="Delete Component"
            link={`/components/${component?.id}/delete-component`}
            reactIcon={null}
          />
        </div>
        <div className="flex flex-col gap-8 my-8">
          <h1 className="text-5xl font-bold">{component?.name}</h1>
          <ul className="text-zinc-400">
            <li>Created At: {component.created_at}</li>
            <li>Last Accessed: {component.last_accessed}</li>
          </ul>
        </div>
        <p className="text-zinc-200">{component.description}</p>
        <pre className="bg-zinc-950 text-white w-full p-8 mt-8">{component.data}</pre>
      </section>
    </>
  )
}

export default ComponentInterface
