import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const DeleteComponentInterface = (): JSX.Element => {
  const { componentId } = useParams()
  const [catalogId, setCatalogId] = useState<string | undefined>('')
  const navigate = useNavigate()

  console.log(componentId, useParams())

  useEffect(() => {
    const fetchingSingleComponent = async (): Promise<void> => {
      const fetchedComponent = await window.db.db.fetchSingleComponent(componentId)
      console.log(fetchedComponent)
      setCatalogId(fetchedComponent.catalog_id)
    }

    fetchingSingleComponent()
  }, [])

  const handleDelete = async (): Promise<void> => {
    try {
      await window.db.db.deleteComponent(componentId)
    } catch (err) {
      console.error('Error deleting component:', err)
    } finally {
      navigate(`/catalogs/${catalogId}`)
    }
  }

  return (
    <section className="flex justify-center items-center h-full">
      <section className="flex flex-col bg-zinc-700 rounded-lg p-8 gap-16">
        <h1 className="text-center text-white text-3xl font-semibold">
          Are you sure you want to delete this component?
        </h1>
        <div className="flex justify-between gap-4">
          <button
            onClick={handleDelete}
            className="text-white bg-zinc-900 px-8 py-3 block text-center font-semibold rounded-lg hover:-translate-y-1 hover:bg-white hover:text-black focus:outline-none transition-all active:text-white active:bg-zinc-800 active:translate-y-1 w-full text-lg"
          >
            Yes
          </button>
          <Link
            type="button"
            to={`/catalogs/${catalogId}`}
            className="text-zinc-700 bg-zinc-200 px-8 py-3 block text-center font-semibold rounded-lg hover:-translate-y-1 hover:bg-zinc-900 hover:text-white focus:outline-none transition-all active:text-zinc-700 active:bg-zinc-200 active:translate-y-1 w-full text-lg"
          >
            No
          </Link>
        </div>
      </section>
    </section>
  )
}

export default DeleteComponentInterface
