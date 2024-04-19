import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Component } from '@/types/Component'

const EditComponentInterface = (): JSX.Element => {
  const { componentId } = useParams()
  const [error, setError] = useState('')
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
  const navigate = useNavigate()

  useEffect(() => {
    const fetchingComponent = async (): Promise<void> => {
      const fetchedComponent = await window.db.db.fetchSingleComponent(componentId)
      setComponent(fetchedComponent)
    }

    fetchingComponent()
  }, [componentId])

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault()
    if (!component.name) {
      setError('Name is required')
      return
    }

    if (!component.data) {
      setError('Code is required')
      return
    }

    try {
      await window.db.db.updateComponent(JSON.stringify(component))
    } catch (error) {
      console.error('Error updating component:', error)
    } finally {
      navigate(`/components/${component.id}`)
    }
  }

  return (
    <div className="flex items-center justify-center h-full p-12">
      <div className="bg-zinc-700 p-8 rounded-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Edit Component</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-zinc-100 mb-2 text-lg font-semibold">
              Name {error && <i className="text-red-500 text-sm mt-1">{error}</i>}
            </label>
            <input
              type="text"
              id="name"
              value={component.name}
              placeholder="Component name"
              onChange={(e) => setComponent((prev) => ({ ...prev, name: e.target.value }))}
              className="bg-zinc-800 text-white rounded mb-4 focus:outline-none w-full p-4 hover:bg-zinc-900 transition-colors focus:bg-zinc-900"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-zinc-100 mb-2 text-lg font-semibold">
              Description
            </label>
            <textarea
              id="description"
              value={component.description}
              placeholder="Catalog description"
              onChange={(e) => setComponent((prev) => ({ ...prev, description: e.target.value }))}
              className="bg-zinc-800 text-white rounded mb-4 focus:outline-none w-full p-4 hover:bg-zinc-900 transition-colors focus:bg-zinc-900"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-zinc-100 mb-2 text-lg font-semibold">
              Code {error && <i className="text-red-500 text-sm mt-1">{error}</i>}
            </label>
            <textarea
              id="description"
              value={component.data}
              placeholder="Insert code here"
              onChange={(e) => setComponent((prev) => ({ ...prev, data: e.target.value }))}
              className="bg-zinc-800 text-white rounded mb-4 focus:outline-none w-full p-4 hover:bg-zinc-900 transition-colors focus:bg-zinc-900"
            ></textarea>
          </div>

          <div className="flex justify-between gap-4">
            <Link
              type="button"
              to={`/components/${component.id}`}
              className="text-zinc-700 bg-zinc-200 px-8 py-3 block text-center font-semibold rounded-lg hover:-translate-y-1 hover:bg-zinc-900 hover:text-white focus:outline-none transition-all active:text-zinc-700 active:bg-zinc-200 active:translate-y-1 w-full"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="text-white bg-zinc-900 px-8 py-3 block text-center font-semibold rounded-lg hover:-translate-y-1 hover:bg-white hover:text-black focus:outline-none transition-all active:text-white active:bg-zinc-800 active:translate-y-1 w-full"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditComponentInterface
