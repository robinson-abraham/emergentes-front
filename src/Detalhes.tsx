import type { ImovelType } from "./utils/ImovelType"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useClienteStore } from "./context/ClienteContext"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  data_checkin: string,
  data_checkout: string
}

export default function Detalhes() {
  const params = useParams()
  const [imovel, setImovel] = useState<ImovelType>()
  const { cliente } = useClienteStore()
  const { register, handleSubmit, reset } = useForm<Inputs>()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/imoveis/${params.imovelId}`)
      const dados = await response.json()
      setImovel(dados)
    }
    buscaDados()
  }, [])

  async function enviaReserva(data: Inputs) {
    const response = await fetch(`${apiUrl}/reservas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clienteId: cliente.id,
        imovelId: Number(params.imovelId),
        data_checkin: data.data_checkin,
        data_checkout: data.data_checkout
      })
    })

    if (response.status === 201) {
      toast.success("Sua reserva foi solicitada! Aguarde a confirmação.")
      reset()
    } else {
        const erro = await response.json()
      toast.error(`Erro: ${erro.erro || 'Não foi possível fazer a reserva.'}`)
    }
  }

  return (
    <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-1/2 md:rounded-none md:rounded-s-lg"
          src={imovel?.foto} alt="Foto do Imóvel" />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {imovel?.titulo}
          </h5>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Categoria: {imovel?.categoria.nome}
          </h5>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Diária: R$ {Number(imovel?.valor_diaria).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {imovel?.comodidades}
          </p>
          {cliente.id ?
            <>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                🙂 Faça sua reserva!</h3>
              <form onSubmit={handleSubmit(enviaReserva)} className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="checkin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Check-in</label>
                        <input type="date" id="checkin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" required {...register("data_checkin")} />
                    </div>
                    <div>
                        <label htmlFor="checkout" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Check-out</label>
                        <input type="date" id="checkout" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" required {...register("data_checkout")} />
                    </div>
                </div>
                <button type="submit" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600">Solicitar Reserva</button>
              </form>
            </>
            :
            <h2 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
              😎Gostou? Identifique-se para fazer uma reserva!
            </h2>
          }
        </div>
      </section>
  )
}