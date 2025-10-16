import { FiUsers } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useAdminStore } from "../../context/AdminContext"

export function TituloAdmin() {
  const admin = useAdminStore(state => state.admin)

  return (
    <nav className="bg-blue-600 text-white border-gray-200 flex justify-between items-center fixed top-0 left-0 w-full z-50 p-4">
      <Link to="/admin" className="flex items-center space-x-3">
        <img src="/logo.png" className="h-10" alt="Logo Aluga Fácil" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap">
          Aluga Fácil: Admin
        </span>
      </Link>
      <div className="flex items-center font-bold text-lg mr-4">
        <span className="mr-2">
          <FiUsers size={22} color="#fff" />
        </span>
        {admin?.nome}
      </div>
    </nav>
  )
}