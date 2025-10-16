// DENTRO DE src/context/AdminContext.ts (VERSÃO CORRIGIDA)

import { create } from 'zustand'
// 👇 PASSO 1: IMPORTE O TIPO CORRETO DO ARQUIVO DE UTILS
import type { AdminType } from '../utils/AdminType'

// PASSO 2: A DEFINIÇÃO LOCAL DE 'AdminType' FOI REMOVIDA DAQUI

type AdminStore = {
  admin: AdminType | null // Agora, este AdminType é o correto, vindo do import.
  logaAdmin: (adminLogado: AdminType) => void
  deslogaAdmin: () => void
}

export const useAdminStore = create<AdminStore>((set) => ({
  admin: null,
  logaAdmin: (adminLogado) => set({ admin: adminLogado }),
  deslogaAdmin: () => set({ admin: null })
}))