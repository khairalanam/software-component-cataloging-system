import './assets/base.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CatalogInterface from './components/single-catalog-interface/CatalogInterface'
import NewCatalogForm from './components/single-catalog-interface/NewCatalogForm'
import EditCatalogInterface from './components/single-catalog-interface/EditCatalogInterface'
import DeleteCatalogInterface from './components/single-catalog-interface/DeleteCatalogInterface'
import NewComponentInterface from './components/single-component-interface/NewComponentInterface'
import DeleteComponentInterface from './components/single-component-interface/DeleteComponentInterface'
import ComponentInterface from './components/single-component-interface/ComponentInterface'
import EditComponentInterface from './components/single-component-interface/EditComponentInterface'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/catalogs/:catalogId',
    element: <CatalogInterface />
  },
  {
    path: '/components/:componentId',
    element: <ComponentInterface />
  },
  {
    path: '/components/:componentId/delete-component',
    element: <DeleteComponentInterface />
  },
  {
    path: '/components/:componentId/edit-component',
    element: <EditComponentInterface />
  },
  {
    path: '/catalogs/:catalogId/new-component',
    element: <NewComponentInterface />
  },
  {
    path: '/new-catalog',
    element: <NewCatalogForm />
  },
  {
    path: '/edit-catalog/:catalogId',
    element: <EditCatalogInterface />
  },
  {
    path: '/delete-catalog/:catalogId',
    element: <DeleteCatalogInterface />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
