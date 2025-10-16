import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Toaster, toast } from 'sonner'
import { useAdminStore } from "../context/AdminContext"
import { useNavigate } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  email: string
  senha: string
}

export default function AdminLogin() {
  const { register, handleSubmit, setFocus } = useForm<Inputs>()
  const navigate = useNavigate()
  const { logaAdmin } = useAdminStore()

  useEffect(() => {
    setFocus("email")
  }, [])

  async function verificaLogin(data: Inputs) {
    const response = await fetch(`${apiUrl}/admins/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data)
    })

    if (response.status === 200) {
      const admin = await response.json()
      logaAdmin(admin)
      navigate("/admin", { replace: true })
    } else {
      toast.error("Erro: Login ou senha incorretos")
    }
  }

  return (
    <main className="max-w-screen-xl flex flex-col items-center mx-auto p-6 mt-10">
      <img src="/logo.png" alt="Logo Aluga Fácil" style={{ width: 180 }} />
      <div className="max-w-sm w-full">
        <h1 className="text-3xl font-bold my-8 text-center">Painel Administrativo</h1>
        <form onSubmit={handleSubmit(verificaLogin)}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">E-mail:</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" {...register("email")} required />
          </div>
          <div className="mb-5">
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" {...register("senha")} required />
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Entrar</button>
        </form>
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
