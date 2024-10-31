import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './pages/ProtectedRoute'
import LoginFormComponent from './pages/LoginForm'

const router = createBrowserRouter([
  {path: '/', element: <Home />, errorElement: <NotFoundPage />},
  {path: 'about', element: <About />},
  {path: '/protected', element: <ProtectedRoute />},
  {path: '/login', element: <LoginFormComponent />}

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
