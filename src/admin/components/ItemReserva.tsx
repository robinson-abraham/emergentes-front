import type { ReservaType } from "../../utils/ReservaType"
import { useAdminStore } from "../../context/AdminContext"
import { toast } from "sonner"

type ItemProps = {
  reserva: ReservaType;
  reservas: ReservaType[];
  setReservas: React.Dispatch<React.SetStateAction<ReservaType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemReserva({ reserva, reservas, setReservas }: ItemProps) {
  const { admin } = useAdminStore()

  function dataFormatada(data: string) {
    return new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
  }

  async function alterarStatus(novoStatus: 'CONFIRMADA' | 'CANCELADA') {
  if (!admin) {
    toast.error("Você precisa estar logado como administrador para alterar o status da reserva.")
    return
  }
  const response = await fetch(`${apiUrl}/reservas/status/${reserva.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${admin.token}`
    },
    body: JSON.stringify({ status: novoStatus })
  });

  if (response.status === 200) {
    const reservasAtualizadas = reservas.map(r => r.id === reserva.id ? { ...r, status: novoStatus } : r);
    setReservas(reservasAtualizadas);
    toast.success(`Reserva #${reserva.id} foi ${novoStatus.toLowerCase()}!`);
  } else {
    toast.error("Erro ao alterar status da reserva.");
  }
}
  
  const statusEstilo = {
    PENDENTE: 'bg-yellow-200 text-yellow-800',
    CONFIRMADA: 'bg-green-200 text-green-800',
    CANCELADA: 'bg-red-200 text-red-800'
  }

  return (
    <tr className="border-b">
      <td className="px-6 py-4 font-medium">{reserva.imovel.titulo}</td>
      <td className="px-6 py-4">{reserva.cliente?.nome}</td>
      <td className="px-6 py-4">{dataFormatada(reserva.data_checkin)} a {dataFormatada(reserva.data_checkout)}</td>
      <td className="px-6 py-4">{Number(reserva.valor_total).toLocaleString("pt-br", { style: 'currency', currency: 'BRL' })}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusEstilo[reserva.status]}`}>
          {reserva.status}
        </span>
      </td>
      <td className="px-6 py-4">
        {reserva.status === 'PENDENTE' && (
          <div className="flex space-x-2">
            <button onClick={() => alterarStatus('CONFIRMADA')} className="bg-green-500 text-white text-xs px-2 py-1 rounded hover:bg-green-600">
              Confirmar
            </button>
            <button onClick={() => alterarStatus('CANCELADA')} className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600">
              Cancelar
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}