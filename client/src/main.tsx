import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import Notes from './pages/notes.tsx'
import Folders from './pages/folders.tsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { store } from './redux/store.ts' // Assuming you have a store file
import './index.css'
import {App} from './App.tsx'

const router =createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children : [
      {index: true, element : <Navigate to="/notes" replace />},
      {path : "notes", element : <Notes />},
      {path : "folders", element : <Folders />}
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
)
