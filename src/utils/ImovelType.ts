
export type CategoriaType = {
  id: number
  nome: string
}

export type ImovelType = {
    id: number
    titulo: string
    descricao: string
    valor_diaria: number
    capacidade: number
    quartos: number
    modelo: string
    comodidades: string
    categoria: CategoriaType
    ativo: boolean
    ano: number
    preco: number
    km: number
    destaque: boolean
    foto: string
    acessorios: string
    createdAt: Date
    updatedAt: Date
    combustivel: string
}