import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar, FaStar } from "react-icons/fa"
import type { ImovelType } from "../../utils/ImovelType"
import { useAdminStore } from "../../context/AdminContext"

type ItemProps = {
  imovel: ImovelType;
  imoveis: ImovelType[];
  setImoveis: React.Dispatch<React.SetStateAction<ImovelType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemImovel({ imovel, imoveis, setImoveis }: ItemProps) {
  const { admin } = useAdminStore()

  async function excluirImovel() {
    if (confirm(`Confirma a exclusão do imóvel "${imovel.titulo}"?`)) {
      const response = await fetch(`${apiUrl}/imoveis/${imovel.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${admin.token}` },
      })
      if (response.status === 200) {
        const imoveisAtualizados = imoveis.map(i => i.id === imovel.id ? { ...i, ativo: false } : i);
        setImoveis(imoveisAtualizados);
      }
    }
  }

  async function alterarDestaque() {
    const response = await fetch(`${apiUrl}/imoveis/destacar/${imovel.id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${admin.token}` },
    })
    if (response.status === 200) {
      const imoveisAtualizados = imoveis.map(i => i.id === imovel.id ? { ...i, destaque: !i.destaque } : i);
      setImoveis(imoveisAtualizados);
    }
  }

  return (
    <tr className={`border-b ${!imovel.ativo && 'bg-red-100'}`}>
      <td className="px-6 py-4">
        <img src={imovel.foto} alt={`Foto de ${imovel.titulo}`} className="w-40 h-auto" />
      </td>
      <td className={`px-6 py-4 font-medium ${imovel.destaque && "font-extrabold text-amber-600"}`}>
        {imovel.titulo}
      </td>
      <td className="px-6 py-4">{imovel.categoria.nome}</td>
      <td className="px-6 py-4">{Number(imovel.valor_diaria).toLocaleString("pt-br", { style: 'currency', currency: 'BRL' })}</td>
      <td className="px-6 py-4 text-center">
        {imovel.ativo ? "Sim" : "Não"}
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          <button onClick={alterarDestaque} title="Destacar">
            {imovel.destaque ? <FaStar className="text-2xl text-yellow-500" /> : <FaRegStar className="text-2xl text-gray-400" />}
          </button>
          <button onClick={excluirImovel} title="Excluir">
            <TiDeleteOutline className="text-2xl text-red-600" />
          </button>
        </div>
      </td>
    </tr>
  )
}