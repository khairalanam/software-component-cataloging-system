import { Component } from '@/types/Component'

const ComponentCard = ({ id, catalogId, name, type, desc, data }: Component): JSX.Element => {
  console.log(typeof data)
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
        <h4 className="text-gray-400">Type: {type === 'CODE' ? <i>Code</i> : <i>Design</i>}</h4>
        <h4 className="text-gray-400">Catalog: {catalogId}</h4>
      </div>
    </article>
  )
}

export default ComponentCard
