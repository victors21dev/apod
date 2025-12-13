import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { AllMounth } from "../scripts/DateAPI";
import Card from "../components/Card";

const months_items = [
  { name: "January", number: 1 },
  { name: "February", number: 2 },
  { name: "March", number: 3 },
  { name: "April", number: 4 },
  { name: "May", number: 5 },
  { name: "June", number: 6 },
  { name: "July", number: 7 },
  { name: "August", number: 8 },
  { name: "September", number: 9 },
  { name: "October", number: 10 },
  { name: "November", number: 11 },
  { name: "December", number: 12 },
];

export function getRangeByMonth(monthIndex) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  const jsMonthIndex = monthIndex - 1;
  const firstDayOfMonth = new Date(currentYear, jsMonthIndex, 1);
  let lastDayOfMonth = new Date(currentYear, jsMonthIndex + 1, 0);

  if (monthIndex >= currentMonth) {
    if (monthIndex === currentMonth) {
      lastDayOfMonth = new Date(currentYear, jsMonthIndex, currentDay);
    } else {
      lastDayOfMonth = today;
    }
  }
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  return {
    firstDay: formatDate(firstDayOfMonth),
    lastDay: formatDate(lastDayOfMonth),
  };
}

function Home() {
  const API_KEY = import.meta.env.VITE_API_KEY_PROJECT;
  const [searchParams] = useSearchParams();

  // Date
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
        setApiResult(null); // Limpa o resultado em caso de erro
      }
    },
    [API_KEY]
  );

  useEffect(() => {
    if (mounthSelect < 1 || mounthSelect > 12) return;
    const { firstDay, lastDay } = getRangeByMonth(mounthSelect);
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
            <span className="text-3xl">
              Astronomy Picture of the Day (APOD)
            </span>
          </div>
          {/* Buttons Months */}
          <div className="text-[#A9B3C2] flex gap-4">
            {months_items.map((element, index) => {
              return (
                <div
                  key={element.number}
                  // Adicionado className condicional (ex: Tailwind)
                  className={
                    mounthSelect === element.number
                      ? "text-red-500 font-bold"
                      : ""
                  }
                >
                  {/* Usa <a> para recarregar com novo Query Param (mounthId) */}
                  <a href={`/?mounthId=${Number(element.number)}`}>
                    {element.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        {/* Current */}
        <div className="flex items-center justify-between">
          <div className="text-3xl">
            <span className="text-[#A9B3C2]">Current month: </span>
            <span>
              {months_items.find((m) => m.number === mounthSelect)?.name ||
                "N/A"}{" "}
              - All ({mounthSelect})
            </span>
          </div>
          <div>
            <button className="bg-[#5F2B8C]">Play to day</button>
          </div>
        </div>
        {/* Divisor */}
        <hr className="border-[#3F3F3F]" />
        {/* Cards */}
        <div className="grid grid-cols-3 gap-6">
          {apiResult === null && <p>Carregando mês {mounthSelect}...</p>}
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
