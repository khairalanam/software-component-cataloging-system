import { useState } from 'react'
import { generateCatalogId } from '@/utils/generateIDs'
import { Link, redirect } from 'react-router-dom'
import { Catalog } from '@/types/Catalog'

const NewCatalogForm = (): JSX.Element => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault()
    if (!name) {
      setError('Name is required')
      return
    }

    // Generate a random ID
    const id = await generateCatalogId()

    // Insert the new catalog into the database
    const newCatalog: Catalog = { id, name, description, author }
    try {
      await window.db.db.insertCatalog(JSON.stringify(newCatalog))
      // onCatalogAdded()
      // onClose()
    } catch (error) {
      console.error('Error inserting catalog:', error)
    } finally {
      redirect('/')
    }
  }

  return (
    <div className="flex items-center justify-center h-full p-12">
      <div className="bg-zinc-700 p-8 rounded-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">New Catalog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-zinc-100 mb-2 text-lg font-semibold">
              Name {error && <i className="text-red-500 text-sm mt-1">Name is required.</i>}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Catalog name"
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-800 text-white rounded mb-4 focus:outline-none w-full p-4 hover:bg-zinc-900 transition-colors focus:bg-zinc-900"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-zinc-100 mb-2 text-lg font-semibold">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              placeholder="Catalog description"
              onChange={(e) => setDescription(e.target.value)}
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
              value={author}
              placeholder="Catalog author"
              onChange={(e) => setAuthor(e.target.value)}
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewCatalogForm
