import { Link } from "react-router-dom"
import type { ImovelType } from "../utils/ImovelType"

type CardProps = {
    data: ImovelType
}

// A linha abaixo PRECISA começar com "export function"
export function CardImovel({ data }: CardProps) {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/detalhes/${data.id}`}>
                <img className="rounded-t-lg" src={data.foto} alt="Foto do Imóvel" />
            </Link>
            <div className="p-5">
                <Link to={`/detalhes/${data.id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {data.titulo}
                    </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Diária: R$ {Number(data.valor_diaria).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Capacidade: {data.capacidade} pessoas - {data.quartos} quarto(s)
                </p>
                <Link to={`/detalhes/${data.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300">
                    Ver Detalhes
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}