import { useEffect, useState } from "react"
import ItemReserva from './components/ItemReserva'
import type { ReservaType } from "../utils/ReservaType"
import type { AdminType } from '../utils/AdminType'
import { useAdminStore } from "../context/AdminContext" // Supondo que AdminType seja exportado daqui

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminReservas() {
  const [reservas, setReservas] = useState<ReservaType[]>([])
  const { admin } = useAdminStore()

  useEffect(() => {
    // CORREÇÃO: A função agora aceita um parâmetro 'adminData' que é garantido como não-nulo.
    // O tipo é 'AdminType', e não 'AdminType | null'.
    async function getReservas(adminData: AdminType) {
      try {
        const response = await fetch(`${apiUrl}/reservas`, {
          // Usamos o parâmetro 'adminData' que a função recebeu.
          // Agora é 100% seguro para o TypeScript.
          headers: { Authorization: `Bearer ${adminData.token}` }
        })
        const dados = await response.json()
        setReservas(dados)
      } catch (error) {
        console.error("Falha ao buscar reservas:", error)
        // Opcional: Tratar o erro na interface
      }
    }

    // Primeiro, verificamos se o 'admin' do hook existe.
    if (admin) {
      // Se ele existir, o passamos como argumento para a função.
      getReservas(admin)
    } else {
      // Se o admin fizer logout, limpa a lista de reservas.
      setReservas([])
    }
  }, [admin]) // O hook é re-executado sempre que o estado 'admin' mudar.

  return (
    <div className='container mx-auto p-4'>
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Reservas</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-700">
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
            {reservas.length > 0 ? (
              reservas.map(reserva => (
                <ItemReserva key={reserva.id} reserva={reserva} reservas={reservas} setReservas={setReservas} />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">Nenhuma reserva encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}