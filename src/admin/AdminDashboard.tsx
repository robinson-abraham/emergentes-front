import { useEffect, useState } from "react";
import { VictoryPie, VictoryLabel, VictoryTheme } from "victory";

const apiUrl = import.meta.env.VITE_API_URL;

// Tipos para os dados que virão da API
type GraficoCategoriaType = {
  categoria: string;
  num: number;
}
type GraficoClienteType = {
  cidade: string;
  num: number;
}
type GeralDadosType = {
  clientes: number;
  imoveis: number;
  reservas: number;
}

export default function AdminDashboard() {
  const [dadosGerais, setDadosGerais] = useState<GeralDadosType>({} as GeralDadosType);
  const [imoveisCategoria, setImoveisCategoria] = useState<GraficoCategoriaType[]>([]);
  const [clientesCidade, setClientesCidade] = useState<GraficoClienteType[]>([]);

  useEffect(() => {
    async function getDados() {
      // Adicionando uma verificação para garantir que a API_URL existe
      if (!apiUrl) {
        console.error("VITE_API_URL não está definida no arquivo .env.local");
        return;
      }
      
      const responseGerais = await fetch(`${apiUrl}/dashboard/gerais`);
      setDadosGerais(await responseGerais.json());

      const responseCategorias = await fetch(`${apiUrl}/dashboard/imoveisCategoria`);
      setImoveisCategoria(await responseCategorias.json());

      const responseCidades = await fetch(`${apiUrl}/dashboard/clientesCidade`);
      setClientesCidade(await responseCidades.json());
    }
    getDados();
  }, []);

  const dadosGraficoCategorias = imoveisCategoria.map(item => ({ x: item.categoria, y: item.num }));
  const dadosGraficoCidades = clientesCidade.map(item => ({ x: item.cidade, y: item.num }));

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl mb-4 font-bold">Visão Geral do Sistema</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border-blue-600 border rounded p-4 text-center">
          <span className="bg-blue-100 text-blue-800 text-2xl font-bold mx-auto block px-2.5 py-4 rounded">
            {dadosGerais.clientes || 0}
          </span>
          <p className="font-bold mt-2">Nº de Clientes</p>
        </div>
        <div className="border-red-600 border rounded p-4 text-center">
          <span className="bg-red-100 text-red-800 text-2xl font-bold mx-auto block px-2.5 py-4 rounded">
            {dadosGerais.imoveis || 0}
          </span>
          <p className="font-bold mt-2">Nº de Imóveis Ativos</p>
        </div>
        <div className="border-green-600 border rounded p-4 text-center">
          <span className="bg-green-100 text-green-800 text-2xl font-bold mx-auto block px-2.5 py-4 rounded">
            {dadosGerais.reservas || 0}
          </span>
          <p className="font-bold mt-2">Nº de Reservas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <svg viewBox="0 0 400 400">
            <VictoryPie standalone={false} width={400} height={400} data={dadosGraficoCategorias} innerRadius={60} labelRadius={80} theme={VictoryTheme.material}
              style={{ labels: { fontSize: 12, fill: "white", fontWeight: "bold" } }} />
            <VictoryLabel textAnchor="middle" style={{ fontSize: 16, fill: "#333" }} x={200} y={200} text={["Imóveis por", "Categoria"]} />
          </svg>
        </div>
        <div>
          <svg viewBox="0 0 400 400">
            <VictoryPie standalone={false} width={400} height={400} data={dadosGraficoCidades} innerRadius={60} labelRadius={80} theme={VictoryTheme.material}
              style={{ labels: { fontSize: 12, fill: "white", fontWeight: "bold" } }} />
            <VictoryLabel textAnchor="middle" style={{ fontSize: 16, fill: "#333" }} x={200} y={200} text={["Clientes", "por Cidade"]} />
          </svg>
        </div>
      </div>
    </div>
  );
}