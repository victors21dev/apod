/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ImageToDate } from "../scripts/DateAPI";
import CardDetail from "../components/CardDetail";
import { Info } from "lucide-react";

function Detail() {
  const API_KEY = import.meta.env.VITE_API_KEY_PROJECT;
  const { id } = useParams();
  const [apiResult, setApiResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const cacheKey = `apod_detail_${id}`;
    const savedDetail = localStorage.getItem(cacheKey);

    if (savedDetail) {
      setApiResult(JSON.parse(savedDetail));
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setApiResult(null);

      try {
        const result = await ImageToDate(API_KEY, id);

        if (result) {
          localStorage.setItem(cacheKey, JSON.stringify(result));
          setApiResult(result);
        }
      } catch (err) {
        console.error("Error loading details", err);
        setApiResult(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, API_KEY]);

  // Loading State
  if (!id || (isLoading && !apiResult)) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
        <p>Loading image details...</p>
      </div>
    );
  }

  if (!apiResult && !isLoading) {
    return (
      <div className="text-center py-20 text-red-400">
        No data found for this date.
      </div>
    );
  }

  return (
    <div className="grid px-4 lg:grid-cols-[auto_350px] lg:gap-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <CardDetail data={apiResult} />
      </div>

      <div className="bg-[#161616] p-6 rounded-lg border border-[#2A2A2A] h-fit">
        <div className="font-bold mb-4 text-center text-sm lg:text-lg border-b border-[#2A2A2A] pb-4">
          <div className="flex justify-center items-center gap-2">
            <Info className="text-blue-400" />
            Explanation
          </div>
        </div>

        <div className="text-[#A9B3C2] leading-relaxed">
          {apiResult &&
            typeof apiResult === "object" &&
            !Array.isArray(apiResult) && (
              <div>
                <p className="text-sm lg:text-base text-justify">
                  {apiResult.explanation}
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
