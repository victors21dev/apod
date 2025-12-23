import { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { AllMounth } from "../scripts/DateAPI";
import Card from "../components/Card";
import RangeByMonth from "../hooks/RangeByMonth";
import months_items from "../data/Months";
import { Play, CalendarDays, CircleX } from "lucide-react";

const getFormattedDate = (date = new Date()) => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}-${m}-${d}`;
};

function Home() {
  const API_KEY = import.meta.env.VITE_API_KEY_PROJECT;
  const [searchParams] = useSearchParams();

  const [currentMonthData, setCurrentMonthData] = useState(null);
  const [statusListMonth, setStatusListMonth] = useState(false);

  const monthSelect =
    Number(searchParams.get("mounthId")) || new Date().getMonth() + 1;

  const fetchData = useCallback(
    async (mId) => {
      if (!API_KEY) return;
      const cacheKey = `apod_cache_2025_${mId}`;
      const { firstDay, lastDay } = RangeByMonth(mId);

      try {
        const savedData = localStorage.getItem(cacheKey);

        if (savedData) {
          const parsedData = JSON.parse(savedData);
          const lastEntryDate = parsedData[parsedData.length - 1]?.date;

          if (lastEntryDate === lastDay) {
            setCurrentMonthData(parsedData);
            return;
          }

          setCurrentMonthData(parsedData);
          console.log("Incomplete cache detected. Updating data...");
        } else {
          setCurrentMonthData(null);
        }
      } catch (e) {
        console.warn("Error reading cache", e);
        setCurrentMonthData(null);
      }

      try {
        const result = await AllMounth(API_KEY, firstDay, lastDay);

        if (result) {
          localStorage.setItem(cacheKey, JSON.stringify(result));
          setCurrentMonthData(result);
        }
      } catch (error) {
        console.error("API error", error);
        if (!currentMonthData) setCurrentMonthData([]);
      }
    },
    [API_KEY]
  );

  useEffect(() => {
    if (monthSelect >= 1 && monthSelect <= 12) {
      fetchData(monthSelect);
    }
  }, [monthSelect, fetchData]);

  const handleListMonth = () => setStatusListMonth((prev) => !prev);

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
            onClick={handleListMonth}
            className={`lg:hidden text-sm w-fit p-2 ${
              statusListMonth === true ? "bg-red-500" : "bg-[#2B378C]"
            }`}
          >
            {statusListMonth === true ? (
              <div className="flex gap-2 text-white">
                <CircleX />
                <div className="flex items-center">Close</div>
              </div>
            ) : (
              <div className="flex gap-2 text-white">
                <CalendarDays />
                <div className="flex items-center">Choose month</div>
              </div>
            )}
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
                    monthSelect === element.number
                      ? "text-red-500 font-bold"
                      : ""
                  }`}
                >
                  <Link to={`/?mounthId=${Number(element.number)}`}>
                    {element.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-sm lg:text-3xl">
            <span className="text-[#8d98a9]">Current month: </span>
            <span>
              {months_items.find((m) => m.number === monthSelect)?.name ||
                "N/A"}{" "}
              - All
            </span>
          </div>
          <div>
            <Link to={`/detail/${getFormattedDate()}`}>
              <button className="border-[#5F2B8C] border text-sm lg:text-lg p-2">
                <div className="flex gap-2">
                  <Play />
                  <div className="flex items-center">Play to day</div>
                </div>
              </button>
            </Link>
          </div>
        </div>

        <hr className="border-[#3F3F3F]" />

        <div className="flex flex-col gap-4 w-full lg:grid lg:grid-cols-3 lg:gap-6">
          {currentMonthData === null && (
            <div className="col-span-3 text-center py-10 flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
              <p>Loading data month ({monthSelect})...</p>
              <p className="text-xs text-gray-500 italic text-balance">
                The NASA API may take some time to respond for the entire month.
              </p>
            </div>
          )}
          {currentMonthData &&
            currentMonthData.map((element) => {
              return <Card key={element.date} props={element} />;
            })}
          {currentMonthData && currentMonthData.length === 0 && (
            <p className="col-span-3 text-center py-10 text-red-400">
              No data found or API error.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
