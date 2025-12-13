import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const months_items = [
  {
    name: "January",
    number: 1,
  },
  {
    name: "February",
    number: 2,
  },
  {
    name: "March",
    number: 3,
  },
  {
    name: "April",
    number: 4,
  },
  {
    name: "May",
    number: 5,
  },
  {
    name: "June",
    number: 6,
  },
  {
    name: "July",
    number: 7,
  },
  {
    name: "August",
    number: 8,
  },
  {
    name: "September",
    number: 9,
  },
  {
    name: "October",
    number: 10,
  },
  {
    name: "November",
    number: 11,
  },
  {
    name: "December",
    number: 12,
  },
];

function Home() {
  // Params
  const [searchParams] = useSearchParams();
  const mounthId = searchParams.get("mounthId");

  // State Mounth
  const [mounthSelect, setMounthSelect] = useState();
  // Date Today
  const getMonth = new Date();
  // const year = getMonth.getFullYear();
  // const day = getMonth.getDate();
  const mounth = getMonth.getMonth() + 1;

  useEffect(() => {
    if (mounthId == null) {
      return setMounthSelect(mounth);
    }
    setMounthSelect(Number(mounthId));
  }, []);

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
                  className={mounthSelect === index + 1 ? "text-red-500" : ""}
                >
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
            <span>December - All (12)</span>
          </div>
          <div>
            <button className="bg-[#5F2B8C]">Play to day</button>
          </div>
        </div>
        {/* Divisor */}
        <hr className="border-[#3F3F3F]" />
        {/* Cards */}
        <div className=""></div>
      </div>
    </>
  );
}

export default Home;
