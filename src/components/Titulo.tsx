import { Link } from "react-router-dom"
import { useClienteStore } from "../context/ClienteContext"

export default function Titulo() {
    const { cliente, deslogaCliente } = useClienteStore()

    function logout() {
        deslogaCliente()
        if (localStorage.getItem("clienteKey")) {
            localStorage.removeItem("clienteKey")
        }
    }

    return (
        <nav className="bg-white border-gray-200 shadow-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3">
                    <img src="/logo.png" className="h-8" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">Aluga Fácil</span>
                </Link>

                <div className="w-auto">
                    <ul className="font-medium flex flex-row items-center p-0 space-x-8">
                        <li>
                            <Link to="/" className="text-gray-900 hover:text-blue-700" aria-current="page">Home</Link>
                        </li>
                        {cliente.id ?
                            <>
                                <li>
                                    <Link to="/minhasReservas" className="text-gray-900 hover:text-blue-700">Minhas Reservas</Link>
                                </li>
                                <li>
                                    <span className="text-gray-900">Olá, {cliente.nome.split(" ")[0]}</span>
                                </li>
                                <li>
                                    <span onClick={logout} className="cursor-pointer text-gray-900 hover:text-blue-700">Sair</span>
                                </li>
                            </>
                            :
                            <li>
                                <Link to="/login" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2">Entrar</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}