import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { useAdminStore } from "../context/AdminContext"
import { TituloAdmin } from './components/Titulo'
import { MenuLateral } from './components/MenuLateral'

export default function AdminLayout() {
  const admin = useAdminStore(state => state.admin)
  const navigate = useNavigate()

  useEffect(() => {
    if (!admin) {
      navigate("/admin/login", { replace: true })
    }
  }, [admin, navigate])

  // Evita renderizar qualquer coisa se o admin não estiver logado
  if (!admin) {
    return null
  }

  return (
    <>
      <TituloAdmin />
      <MenuLateral />
      <div className="p-4 sm:ml-64">
        <div className="mt-14">
          <Outlet />
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </>
  )
}