import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { ImovelType } from "../utils/ImovelType";

const apiUrl = import.meta.env.VITE_API_URL;

type Inputs = {
  termo: string;
};

type InputPesquisaProps = {
  setImoveis: React.Dispatch<React.SetStateAction<ImovelType[]>>;
};

export function InputPesquisa({ setImoveis }: InputPesquisaProps) {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  async function enviaPesquisa(data: Inputs) {
    if (data.termo.length < 2) {
      toast.error("Por favor, informe no mínimo 2 caracteres para a busca.");
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/imoveis/pesquisa/${data.termo}`);
      const resultados = await response.json();
      setImoveis(resultados);
      if (resultados.length === 0) {
        toast.info("Nenhum imóvel encontrado.");
      }
    } catch (error) {
      toast.error("Erro ao realizar a busca.");
    }
  }

  async function mostraTodos() {
    try {
      const response = await fetch(`${apiUrl}/imoveis`);
      const dados = await response.json();
      reset({ termo: "" });
      setImoveis(dados);
    } catch (error) {
      toast.error("Erro ao carregar todos os imóveis.");
    }
  }

  return (
    <div className="flex mx-auto max-w-5xl my-4">
      <form onSubmit={handleSubmit(enviaPesquisa)} className="flex w-full gap-2">
        <input
          type="text"
          {...register("termo")}
          placeholder="Buscar imóvel por título ou cidade..."
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-lg">
          Pesquisar
        </button>
        <button type="button" onClick={mostraTodos} className="px-4 py-2 bg-gray-300 rounded-lg">
          Mostrar todos
        </button>
      </form>
    </div>
  );
}