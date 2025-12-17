import { useState, useEffect, useCallback, use } from "react";
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
  const [cachedResults, setCachedResults] = useState({});
  const [currentMonthData, setCurrentMonthData] = useState(null);
  const [searchParams] = useSearchParams();
  const mounthId = searchParams.get("mounthId");
  const mounth = new Date().getMonth() + 1;
  const initialMonth = mounthId ? Number(mounthId) : mounth;
  const [mounthSelect, setMounthSelect] = useState(initialMonth);
  const [statusListMonth, setStatusListMonth] = useState(false);

  const callApiAndCache = async (monthKey, first, last) => {
    try {
      setCurrentMonthData(null);
      const result = await AllMounth(API_KEY, first, last);
      setCachedResults((prevCache) => ({
        ...prevCache,
        [monthKey]: result,
      }));
      setCurrentMonthData(result);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      setCurrentMonthData(null);
    }
  };

  const fetchData = useCallback(
    (monthKey, first, last) => {
      if (!API_KEY || !first || !last) return;

      const cached = cachedResults[monthKey];

      if (cached) {
        setCurrentMonthData(cached);
        return;
      }

      // Se não estiver em cache, configura o timer
      const timer = setTimeout(() => {
        callApiAndCache(monthKey, first, last);
      }, 4000);

      return () => {
        clearTimeout(timer);
      };
    },
    [API_KEY, cachedResults]
  );

  const handleListMonth = () => {
    setStatusListMonth((prevStatus) => !prevStatus);
  };

  useEffect(() => {
    if (mounthSelect < 1 || mounthSelect > 12) return;

    const monthKey = String(mounthSelect);
    const { firstDay, lastDay } = RangeByMonth(mounthSelect);
    const cleanup = fetchData(monthKey, firstDay, lastDay);

    return cleanup;
  }, [mounthSelect, fetchData]);

  useEffect(() => {
    const urlMonth = mounthId ? Number(mounthId) : mounth;
    if (urlMonth !== mounthSelect) {
      setMounthSelect(urlMonth);
    }
  }, [mounthId, mounth, mounthSelect]);

  return (
    <>
      <div className="grid w-full gap-2 lg:gap-4 lg:flex lg:flex-col px-4">
        <div>
          <div>
            <div className="text-md lg:text-3xl font-bold">
              Astronomy Picture of the Day (APOD)
            </div>
            <div>FROM 2025</div>
          </div>
          <button
            onClick={() => {
              handleListMonth();
            }}
            className={`lg:hidden text-sm w-fit p-2 ${
              statusListMonth === true ? "bg-red-500" : "bg-[#2B378C]"
            }`}
          >
            {statusListMonth === true ? "Close" : "Choose month"}
          </button>
          <div
            className={`text-[#A9B3C2] lg:flex lg:gap-4 ${
              statusListMonth === true ? "" : "hidden"
            }`}
          >
            {months_items.map((element) => {
              return (
                <div
                  key={element.number}
                  className={`${
                    mounthSelect === element.number
                      ? "text-red-500 font-bold"
                      : ""
                  }`}
                >
                  <a href={`/?mounthId=${Number(element.number)}`}>
                    {element.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-sm lg:text-3xl">
            <span className="text-[#8d98a9]">Current month: </span>
            <span>
              {months_items.find((m) => m.number === mounthSelect)?.name ||
                "N/A"}{" "}
              - All
            </span>
          </div>
          <div>
            <Link to={`/detail/${DateNowFunc()}`}>
              <button className="border-[#5F2B8C] border text-sm lg:text-lg">
                Play to day
              </button>
            </Link>
          </div>
        </div>
        <hr className="border-[#3F3F3F]" />
        <div className="flex flex-col gap-4 w-full lg:grid lg:grid-cols-3 lg:gap-6">
          {currentMonthData === null && (
            <p>Loading data month({mounthSelect})...</p>
          )}
          {currentMonthData &&
            currentMonthData.map((element) => {
              return <Card key={element.date} props={element} />;
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
