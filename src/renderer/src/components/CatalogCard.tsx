import { Catalog } from '@/types/Catalog'

const CatalogCard = ({ id, name, desc, author }: Catalog): JSX.Element => {
  return (
    <article
      key={id}
      className="bg-zinc-900 text-white rounded-md list-none p-4 min-h-48 flex flex-col justify-between hover:-translate-y-1 hover:bg-white hover:text-black transition-all active:text-white active:bg-zinc-800 active:translate-y-1 hover:cursor-pointer"
    >
      <h1 className="text-3xl font-bold mb-8 line-clamp-2 text-ellipsis">{name}</h1>
      <div className="flex flex-col gap-4">
        <p className="line-clamp-2 text-ellipsis text-gray-500">
          {desc ? desc : <i>No description</i>}
        </p>
        <h4 className="text-gray-400">Author: {author ? <b>{author}</b> : <i>None</i>}</h4>
      </div>
    </article>
  )
}

export default CatalogCard
