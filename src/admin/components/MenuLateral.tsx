import { useAdminStore } from "../../context/AdminContext"
import { IoExitOutline } from "react-icons/io5"
import { BiSolidDashboard } from "react-icons/bi"
import { FaHouseUser } from "react-icons/fa6"
import { BsFillCalendar2CheckFill } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"

export function MenuLateral() {
  const navigate = useNavigate()
  const deslogaAdmin = useAdminStore(state => state.deslogaAdmin)

  function adminSair() {
    if (confirm("Deseja realmente sair do sistema?")) {
      deslogaAdmin()
      navigate("/admin/login", { replace: true })
    }
  }

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-gray-100 border-r">
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <Link to="/admin" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group">
              <BiSolidDashboard size={20} color="#6B7280" />
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/imoveis" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group">
              <FaHouseUser size={20} color="#6B7280" />
              <span className="flex-1 ms-3 whitespace-nowrap">Imóveis</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/reservas" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group">
              <BsFillCalendar2CheckFill size={20} color="#6B7280" />
              <span className="flex-1 ms-3 whitespace-nowrap">Reservas</span>
            </Link>
          </li>
          <li>
            <div onClick={adminSair} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group cursor-pointer">
              <IoExitOutline size={20} color="#6B7280" />
              <span className="flex-1 ms-3 whitespace-nowrap">Sair</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  )
}