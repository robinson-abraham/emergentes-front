import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// --- Rotas da Área do Cliente (Públicas) ---
import App from './App.tsx'
import Login from './Login.tsx'
import Detalhes from './Detalhes.tsx'
import MinhasReservas from './MinhasReservas.tsx'
import Layout from './Layout.tsx'

// --- Rotas da Área do Administrador ---
import AdminLogin from './admin/AdminLogin.tsx'
import AdminLayout from './admin/AdminLayout.tsx'
import AdminDashboard from './admin/AdminDashboard.tsx'
import AdminImoveis from './admin/AdminImoveis.tsx'
import AdminNovoImovel from './admin/AdminNovoImovel.tsx'
import AdminReservas from './admin/AdminReservas.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const rotas = createBrowserRouter([
  // Rotas da Área do Cliente (públicas e para clientes logados)
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'detalhes/:imovelId', element: <Detalhes /> },
      { path: 'minhasReservas', element: <MinhasReservas /> },
    ],
  },
  // Rotas da Área do Administrador (protegidas)
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'imoveis', element: <AdminImoveis /> },
      { path: 'imoveis/novo', element: <AdminNovoImovel /> },
      { path: 'reservas', element: <AdminReservas /> }
    ]
  },
  // Rota de Login do Administrador (separada para não ter o layout)
  {
    path: '/admin/login',
    element: <AdminLogin />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)