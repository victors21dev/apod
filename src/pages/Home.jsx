/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { AllMounth } from "../scripts/DateAPI";
import Card from "../components/Card";
import RangeByMonth from "../hooks/RangeByMonth";
import months_items from "../data/Months";
import { Link } from "react-router-dom";

function DateNowFunc() {
  const dateNow = new Date();
  const y = dateNow.getFullYear();
  const m = dateNow.getMonth() + 1;
  const d = dateNow.getDate();
  return `${y}-${m}-${d}`;
}

function Home() {
  const API_KEY = import.meta.env.VITE_API_KEY_PROJECT;
  // Date
  const [searchParams] = useSearchParams();
  const mounthId = searchParams.get("mounthId");
  const mounth = new Date().getMonth() + 1;
  const initialMonth = mounthId ? Number(mounthId) : mounth;

  // API
  const [apiResult, setApiResult] = useState(null);
  const [mounthSelect, setMounthSelect] = useState(initialMonth);

  const fetchData = useCallback(
    async (first, last) => {
      if (!API_KEY || !first || !last) return;
      try {
        const result = await AllMounth(API_KEY, first, last);
        setApiResult(result);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
        setApiResult(null);
      }
    },
    [API_KEY]
  );

  useEffect(() => {
    if (mounthSelect < 1 || mounthSelect > 12) return;
    const { firstDay, lastDay } = RangeByMonth(mounthSelect);
    fetchData(firstDay, lastDay);
  }, [mounthSelect, fetchData]);

  useEffect(() => {
    const urlMonth = mounthId ? Number(mounthId) : mounth;

    if (urlMonth !== mounthSelect) {
      setMounthSelect(urlMonth);
    }
  }, [mounthId, mounth, mounthSelect]);

  return (
    <>
      <div className="grid w-full gap-4">
        <div>
          {/* Title */}
          <div>
            <span className="text-3xl font-bold">
              Astronomy Picture of the Day (APOD) - FROM 2025
            </span>
          </div>
          <div className="text-[#A9B3C2] flex gap-4">
            {months_items.map((element) => {
              return (
                <div
                  key={element.number}
                  className={
                    mounthSelect === element.number
                      ? "text-red-500 font-bold"
                      : ""
                  }
                >
                  <a href={`/?mounthId=${Number(element.number)}`}>
                    {element.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-3xl">
            <span className="text-[#8d98a9]">Current month: </span>
            <span>
              {months_items.find((m) => m.number === mounthSelect)?.name ||
                "N/A"}{" "}
              - All
            </span>
          </div>
          <div>
            <Link to={`/detail/${DateNowFunc()}`}>
              <button className="border-[#5F2B8C] border ">Play to day</button>
            </Link>
          </div>
        </div>
        <hr className="border-[#3F3F3F]" />
        <div className="grid grid-cols-3 gap-6">
          {apiResult === null && <p>Loading data month({mounthSelect})...</p>}
          {apiResult &&
            apiResult.map((element) => {
              return <Card props={element} />;
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
