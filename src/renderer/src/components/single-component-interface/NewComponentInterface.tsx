import { useState } from 'react'
import { generateComponentId } from '@/utils/generateIDs'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Component } from '@/types/Component'

const NewComponentInterface = (): JSX.Element => {
  const { catalogId } = useParams()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [data, setData] = useState('')
  const [nameError, setNameError] = useState('')
  const [dataError, setDataError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault()
    if (!name) {
      setNameError('Name is required')
      return
    }

    if (!data) {
      setDataError('Code is required')
      return
    }

    // Generate a random ID
    const id = await generateComponentId()

    // export interface Component {
    //   id: string
    //   catalogId: string
    //   name: string
    //   type: 'CODE' | 'DESIGN'
    //   desc?: string
    //   data: unknown
    //   frequency?: number
    //   lastAccessed?: string
    //   createdAt?: string
    // }

    const lastAccessed = new Date()
    const createdAt = new Date()

    const newComponent: Component = {
      id,
      catalogId,
      name,
      type: 'CODE',
      description,
      data,
      frequency: 0,
      lastAccessed,
      createdAt
    }

    // Insert the new catalog into the database
    try {
      await window.db.db.insertComponent(JSON.stringify(newComponent), lastAccessed, createdAt)
    } catch (error) {
      console.error('Error inserting component:', error)
    } finally {
      console.log('Redirecting yoashhhhhh')
      navigate(`/catalogs/${catalogId}`)
    }
  }

  return (
    <div className="flex items-center justify-center h-full p-12">
      <div className="bg-zinc-700 p-8 rounded-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">New Component</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-zinc-100 mb-2 text-lg font-semibold">
              Name {nameError && <i className="text-red-500 text-sm mt-1">{nameError}</i>}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Component name"
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
            <label htmlFor="description" className="block text-zinc-100 mb-2 text-lg font-semibold">
              Code {dataError && <i className="text-red-500 text-sm mt-1">{dataError}</i>}
            </label>
            <textarea
              id="description"
              value={data}
              placeholder="Insert code here"
              onChange={(e) => setData(e.target.value)}
              className="bg-zinc-800 text-white rounded mb-4 focus:outline-none w-full p-4 hover:bg-zinc-900 transition-colors focus:bg-zinc-900"
            ></textarea>
          </div>

          <div className="flex justify-between gap-4">
            <Link
              type="button"
              to={`/catalogs/${catalogId}`}
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

export default NewComponentInterface
