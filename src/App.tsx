import { CardImovel } from "./components/CardImovel";
import { InputPesquisa } from "./components/InputPesquisa";
import type { ImovelType } from "./utils/ImovelType";
import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function App() {
  const [imoveis, setImoveis] = useState<ImovelType[]>([]);
  const { logaCliente } = useClienteStore();

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/imoveis`);
      const dados = await response.json();
      setImoveis(dados);
    }
    buscaDados();

    async function buscaCliente(id: string) {
      const response = await fetch(`${apiUrl}/clientes/${id}`);
      const dados = await response.json();
      logaCliente(dados);
    }
    if (localStorage.getItem("clienteKey")) {
      const idCliente = localStorage.getItem("clienteKey");
      buscaCliente(idCliente as string);
    }
  }, []);

  const listaImoveis = imoveis.map((imovel) => (
    <CardImovel data={imovel} key={imovel.id} />
  ));

  return (
    <>
      {/* Barra de pesquisa */}
      <InputPesquisa setImoveis={setImoveis} />

      <div className="max-w-7xl mx-auto">
        <h1 className="my-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-orange-400">
          Imóveis <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">em destaque</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {listaImoveis}
        </div>
      </div>
    </>
  );
}