import { Catalog } from '@/types/Catalog'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../Button'
import ListOfComponents from './ListOfComponents'

const CatalogInterface = (): JSX.Element => {
  const { catalogId } = useParams()
  const [catalog, setCatalog] = useState<Catalog>()

  useEffect(() => {
    const fetchingCatalog = async (): Promise<void> => {
      const fetchedCatalog = await window.db.db.fetchSingleCatalog(catalogId)
      setCatalog(fetchedCatalog)
    }

    fetchingCatalog()
  }, [catalogId])

  return (
    <>
      <section className="text-white">
        <div className="flex justify-between">
          <Button text="Go Back" link="/" reactIcon={null} />
          <Button
            text="New Component"
            link={`/catalogs/${catalogId}/new-component`}
            reactIcon={null}
          />
        </div>
        <div className="flex flex-col gap-8 my-8">
          <h1 className="text-5xl font-bold">{catalog?.name}</h1>
          <h4 className="text-zinc-400">
            <i>Author: {catalog?.author}</i>
          </h4>
        </div>
        <p className="text-zinc-200">
          {catalog?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          voluptas praesentium consectetur velit ratione quisquam ut non odio porro a ipsam, eaque
          enim officia excepturi laudantium itaque quod fugiat earum.
        </p>
      </section>
      <ListOfComponents />
    </>
  )
}

export default CatalogInterface
