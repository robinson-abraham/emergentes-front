import { useEffect, useState } from "react"
import ItemImovel from './components/ItemImovel'
import type { ImovelType } from "../utils/ImovelType"
import { Link } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminImoveis() {
  const [imoveis, setImoveis] = useState<ImovelType[]>([])

  useEffect(() => {
    async function getImoveis() {
      const response = await fetch(`${apiUrl}/imoveis/admin`)
      const dados = await response.json()
      setImoveis(dados)
    }
    getImoveis()
  }, [])

  return (
    <div className='container mx-auto'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className="text-2xl font-bold">Gerenciamento de Imóveis</h1>
        <Link to="/admin/imoveis/novo" className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700">
          Novo Imóvel
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">Foto</th>
              <th scope="col" className="px-6 py-3">Título do Imóvel</th>
              <th scope="col" className="px-6 py-3">Categoria</th>
              <th scope="col" className="px-6 py-3">Valor Diária</th>
              <th scope="col" className="px-6 py-3 text-center">Ativo?</th>
              <th scope="col" className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {imoveis.map(imovel => (
              <ItemImovel key={imovel.id} imovel={imovel} imoveis={imoveis} setImoveis={setImoveis} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}