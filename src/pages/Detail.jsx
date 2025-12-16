/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ImageToDate } from "../scripts/DateAPI";
import CardDetail from "../components/CardDetail";

function Detail() {
  const API_KEY = import.meta.env.VITE_API_KEY_PROJECT;

  const { id } = useParams();
  const [apiResult, setApiResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ImageToDate(API_KEY, id);
        setApiResult(result);
      } catch (err) {
        console.error("Erro ao buscar dados da API:", err);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="grid grid-cols-[auto_260px] gap-6">
      <div className="flex flex-col gap-2">
        <CardDetail data={apiResult} />
      </div>
      {/* */}
      <div className="bg-[#161616] p-4 rounded-lg pt-4">
        <div className="font-bold mb-4 text-center">Explanation</div>
        <div className="text-[#A9B3C2]">Ver depois</div>
      </div>
    </div>
  );
}

export default Detail;
