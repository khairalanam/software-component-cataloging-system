import Button from './components/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shadcn/components/ui/tabs'
import { useState } from 'react'
import CatalogsInterface from './components/CatalogsInterface'
import SearchInterface from './components/SearchInterface'
import MainComponentsInterface from './components/MainComponentsInterface'

function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState('catalogs')

  return (
    <>
      <Button text={'New Catalog'} link="/" reactIcon={null} />
      <div className="m-8"></div>
      <Tabs defaultValue="catalogs" className="border border-blue-500 flex flex-col gap-8">
        <TabsList className="bg-zinc-800 flex flex-row justify-between text-white font-semibold p-2 gap-2 rounded-lg">
          <TabsTrigger
            className={`w-full py-2 transition-colors rounded-lg ${activeTab === 'catalogs' ? 'bg-zinc-900' : 'bg-zinc-800'}`}
            value="catalogs"
            onClick={() => setActiveTab('catalogs')}
          >
            Catalogs
          </TabsTrigger>
          <TabsTrigger
            className={`w-full py-2 transition-colors rounded-lg ${activeTab === 'search' ? 'bg-zinc-900' : 'bg-zinc-800'}`}
            value="search"
            onClick={() => setActiveTab('search')}
          >
            Search
          </TabsTrigger>
          <TabsTrigger
            className={`w-full py-2 transition-colors rounded-lg ${activeTab === 'components' ? 'bg-zinc-900' : 'bg-zinc-800'}`}
            value="components"
            onClick={() => setActiveTab('components')}
          >
            Components
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="catalogs"
          className="overflow-y-auto max-h-[28rem] rounded-lg scrollbar-none scrollbar-thumb-zinc-500 scrollbar-track-zinc-800"
        >
          <CatalogsInterface />
        </TabsContent>
        <TabsContent
          value="search"
          className="overflow-y-auto max-h-[28rem] rounded-lg scrollbar-none scrollbar-thumb-zinc-500 scrollbar-track-zinc-800"
        >
          <SearchInterface />
        </TabsContent>
        <TabsContent
          value="components"
          className="overflow-y-auto max-h-[28rem] rounded-lg scrollbar-none scrollbar-thumb-zinc-500 scrollbar-track-zinc-800"
        >
          <MainComponentsInterface />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default App
