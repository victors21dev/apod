/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ImageToDate } from "../scripts/DateAPI";
import CardDetail from "../components/CardDetail";

const detailCache = {};

function Detail() {
  const API_KEY = import.meta.env.VITE_API_KEY_PROJECT;

  const { id } = useParams();
  const [apiResult, setApiResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    if (detailCache[id]) {
      console.log(`Detalhe para a data ${id} carregado do CACHE.`);
      setApiResult(detailCache[id]);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setApiResult(null);

      try {
        console.log(`Buscando Detalhe para a data ${id} da API...`);
        const result = await ImageToDate(API_KEY, id);

        detailCache[id] = result;

        setApiResult(result);
      } catch (err) {
        console.error("Erro ao buscar dados da API:", err);
        setApiResult(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, API_KEY]);

  if (!id || (isLoading && !apiResult)) {
    return <div>Loading details...</div>;
  }

  if (!apiResult && !isLoading) {
    return <div>No data found for this date.</div>;
  }

  return (
    <div className="grid px-4 lg:grid-cols-[auto_260px] lg:gap-6">
      <div className="flex flex-col gap-2">
        <CardDetail data={apiResult} />
      </div>
      <div className="bg-[#161616] p-4 rounded-lg pt-4">
        <div className="font-bold mb-4 text-center text-sm lg:text-lg">
          Explanation
        </div>
        <div className="text-[#A9B3C2]">
          {apiResult &&
            typeof apiResult === "object" &&
            !Array.isArray(apiResult) && (
              <div>
                <p className="text-sm lg:text-lg">{apiResult.explanation}</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
