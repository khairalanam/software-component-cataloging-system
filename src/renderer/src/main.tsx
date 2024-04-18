import './assets/base.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CatalogInterface from './components/single-catalog-interface/CatalogInterface'
import NewCatalogForm from './components/single-catalog-interface/NewCatalogForm'
import EditCatalogInterface from './components/single-catalog-interface/EditCatalogInterface'
import DeleteCatalogInterface from './components/single-catalog-interface/DeleteCatalogInterface'

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
