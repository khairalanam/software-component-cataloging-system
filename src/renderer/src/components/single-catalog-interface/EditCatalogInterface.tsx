import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Catalog } from '@/types/Catalog'

const EditCatalogInterface = (): JSX.Element => {
  const { catalogId } = useParams()
  const [error, setError] = useState('')
  const [catalog, setCatalog] = useState<Catalog>({ id: '', name: '', description: '', author: '' })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchingCatalog = async (): Promise<void> => {
      const fetchedCatalog = await window.db.db.fetchSingleCatalog(catalogId)
      setCatalog(fetchedCatalog)
    }

    fetchingCatalog()
  }, [catalogId])

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault()
    if (!catalog.name) {
      setError('Name is required')
      return
    }

    try {
      await window.db.db.updateCatalog(JSON.stringify(catalog))
    } catch (error) {
      console.error('Error updating catalog:', error)
    } finally {
      navigate('/')
    }
  }

  return (
    <div className="flex items-center justify-center h-full p-12">
      <div className="bg-zinc-700 p-8 rounded-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Edit Catalog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-zinc-100 mb-2 text-lg font-semibold">
              Name {error && <i className="text-red-500 text-sm mt-1">Name is required.</i>}
            </label>
            <input
              type="text"
              id="name"
              value={catalog.name}
              placeholder="Catalog name"
              onChange={(e) =>
                setCatalog((prevCatalog) => ({
                  ...prevCatalog,
                  name: e.target.value
                }))
              }
              className="bg-zinc-800 text-white rounded mb-4 focus:outline-none w-full p-4 hover:bg-zinc-900 transition-colors focus:bg-zinc-900"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-zinc-100 mb-2 text-lg font-semibold">
              Description
            </label>
            <textarea
              id="description"
              value={catalog.description}
              placeholder="Catalog description"
              onChange={(e) =>
                setCatalog((prevCatalog) => ({
                  ...prevCatalog,
                  description: e.target.value
                }))
              }
              className="bg-zinc-800 text-white rounded mb-4 focus:outline-none w-full p-4 hover:bg-zinc-900 transition-colors focus:bg-zinc-900"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block text-zinc-100 mb-2 text-lg font-semibold">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={catalog.author}
              placeholder="Catalog author"
              onChange={(e) =>
                setCatalog((prevCatalog) => ({
                  ...prevCatalog,
                  author: e.target.value
                }))
              }
              className="bg-zinc-800 text-white rounded mb-4 focus:outline-none w-full p-4 hover:bg-zinc-900 transition-colors focus:bg-zinc-900"
            />
          </div>
          <div className="flex justify-between gap-4">
            <Link
              type="button"
              to="/"
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

export default EditCatalogInterface
