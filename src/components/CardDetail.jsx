function CardDetail({ data }) {
  if (!data) {
    return <div>Loading details...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-3xl">{data.title}</div>
      <div className="flex h-screen">
        <img src={data.hdurl} alt="image" className="h-full rounded-lg" />
      </div>
      <div className="w-full justify-between text-[#A9B3C2] flex flex-row mb-4">
        <div className="grid">
          <div>{data.copyright}</div>
          <div>{data.date}</div>
        </div>
        <div>
          <a href={data.hdurl} target="blank">
            <button className="bg-[#2B558C]">View Full</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
