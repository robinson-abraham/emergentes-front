import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext";
import type { ReservaType } from "./utils/ReservaType";

const apiUrl = import.meta.env.VITE_API_URL;

export default function MinhasReservas() {
    const [reservas, setReservas] = useState<ReservaType[]>([]);
    const { cliente } = useClienteStore();

    useEffect(() => {
        if (cliente.id) {
            async function buscaDados() {
                const response = await fetch(`${apiUrl}/reservas/cliente/${cliente.id}`);
                const dados = await response.json();
                setReservas(dados);
            }
            buscaDados();
        }
    }, [cliente.id]);

    function dataDMA(data: string) {
        return new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    }

    const reservasTable = reservas.map(reserva => (
        <tr key={reserva.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <p><b>{reserva.imovel.titulo}</b></p>
                <p className='mt-3'>Diária: R$ {Number(reserva.imovel.valor_diaria).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</p>
            </th>
            <td className="px-6 py-4">
                <img src={reserva.imovel.foto} style={{ width: 120, height: 'auto' }} alt="Foto Imóvel" />
            </td>
            <td className="px-6 py-4">
                <p>Check-in: <b>{dataDMA(reserva.data_checkin)}</b></p>
                <p>Check-out: <b>{dataDMA(reserva.data_checkout)}</b></p>
            </td>
            <td className="px-6 py-4">
                <p>R$ {Number(reserva.valor_total).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</p>
            </td>
            <td className="px-6 py-4">
                <span className="font-bold">{reserva.status}</span>
            </td>
        </tr>
    ));

    return (
        <section className="max-w-7xl mx-auto">
            <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-black">
                Listagem de <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">Minhas Reservas</span>
            </h1>
            {reservas.length === 0 ?
                <h2 className="mb-4 mt-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
                    Você ainda não fez nenhuma reserva. 🙄
                </h2>
                :
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Imóvel</th>
                                <th scope="col" className="px-6 py-3">Foto</th>
                                <th scope="col" className="px-6 py-3">Período</th>
                                <th scope="col" className="px-6 py-3">Valor Total</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservasTable}
                        </tbody>
                    </table>
                </div>
            }
        </section>
    );
}