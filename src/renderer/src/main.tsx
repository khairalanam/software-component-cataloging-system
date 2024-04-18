import './assets/base.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CatalogInterface from './components/single-catalog-interface/CatalogInterface'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: 'catalogs/:catalogId',
    element: <CatalogInterface />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
