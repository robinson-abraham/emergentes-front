import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import type { CategoriaType } from "../utils/CategoriaType"
import { useAdminStore } from "../context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  titulo: string
  categoriaId: number
  quartos: number
  capacidade: number
  valor_diaria: number
  foto: string
  comodidades: string
}

export default function AdminNovoImovel() {
  const [categorias, setCategorias] = useState<CategoriaType[]>([])
  const { admin } = useAdminStore()

  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>()

  useEffect(() => {
    async function getCategorias() {
      const response = await fetch(`${apiUrl}/categorias`)
      const dados = await response.json()
      setCategorias(dados)
    }
    getCategorias()
    setFocus("titulo")
  }, [setFocus])

  async function incluirImovel(data: Inputs) {
  if (!admin) {
    toast.error("Você precisa estar logado como administrador para cadastrar um imóvel.")
    return
  }
  const response = await fetch(`${apiUrl}/imoveis`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${admin.token}`
    },
    body: JSON.stringify({
      ...data,
      categoriaId: Number(data.categoriaId),
      quartos: Number(data.quartos),
      capacidade: Number(data.capacidade),
      valor_diaria: Number(data.valor_diaria),
    })
  })

  if (response.status === 201) {
    toast.success("Imóvel cadastrado com sucesso!")
    reset()
    setFocus("titulo")
  } else {
    toast.error("Erro ao cadastrar imóvel.")
  }
}

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Inclusão de Imóvel</h1>
      <form className="max-w-2xl" onSubmit={handleSubmit(incluirImovel)}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block mb-2 text-sm font-medium">Título do Imóvel</label>
          <input type="text" id="titulo" {...register("titulo")} required className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="categoriaId" className="block mb-2 text-sm font-medium">Categoria</label>
            <select id="categoriaId" {...register("categoriaId")} required className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5">
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="valor_diaria" className="block mb-2 text-sm font-medium">Valor da Diária R$</label>
            <input type="number" step="0.01" id="valor_diaria" {...register("valor_diaria")} required className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="quartos" className="block mb-2 text-sm font-medium">Nº de Quartos</label>
            <input type="number" id="quartos" {...register("quartos")} required className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" />
          </div>
          <div>
            <label htmlFor="capacidade" className="block mb-2 text-sm font-medium">Capacidade de Pessoas</label>
            <input type="number" id="capacidade" {...register("capacidade")} required className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="foto" className="block mb-2 text-sm font-medium">URL da Foto</label>
          <input type="url" id="foto" {...register("foto")} required className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" />
        </div>
        <div className="mb-4">
          <label htmlFor="comodidades" className="block mb-2 text-sm font-medium">Comodidades (separadas por vírgula)</label>
          <textarea id="comodidades" rows={3} {...register("comodidades")} className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300"></textarea>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Salvar Imóvel</button>
      </form>
    </div>
  )
}