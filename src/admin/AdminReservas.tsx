import { useEffect, useState } from "react"
import ItemReserva from './components/ItemReserva'
import type { ReservaType } from "../utils/ReservaType"
import { useAdminStore } from "../context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminReservas() {
  const [reservas, setReservas] = useState<ReservaType[]>([])
  const { admin } = useAdminStore()

  useEffect(() => {
    async function getReservas() {
      const response = await fetch(`${apiUrl}/reservas`, {
        headers: { Authorization: `Bearer ${admin.token}` }
      })
      const dados = await response.json()
      setReservas(dados)
    }
    if (admin.token) {
      getReservas()
    }
  }, [admin])

  return (
    <div className='container mx-auto'>
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Reservas</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">Imóvel</th>
              <th scope="col" className="px-6 py-3">Cliente</th>
              <th scope="col" className="px-6 py-3">Período</th>
              <th scope="col" className="px-6 py-3">Valor Total</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map(reserva => (
              <ItemReserva key={reserva.id} reserva={reserva} reservas={reservas} setReservas={setReservas} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}