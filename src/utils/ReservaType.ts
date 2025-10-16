import type { ImovelType } from "./ImovelType"
import type { ClienteType } from "./ClienteType"

export type ReservaType = {
  id: number
  clienteId: string
  cliente?: ClienteType
  imovelId: number
  imovel: ImovelType
  data_checkin: string // ou Date, dependendo de como vem da API
  data_checkout: string // ou Date
  valor_total: string // ou number, dependendo de como vem da API
  status: "PENDENTE" | "CONFIRMADA" | "CANCELADA"
  createdAt: string // ou Date
  updatedAt: string // ou Date
}