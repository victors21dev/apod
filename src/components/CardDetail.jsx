function CardDetail({ data }) {
  if (!data) {
    return <div>Loading details...</div>;
  }
  console.log(data);

  return (
    <>
      <div className="font-bold text-3xl">{data.title}</div>
      <div>
        <img
          src={data.hdurl}
          alt="image"
          className="w-full h-full rounded-lg"
        />
      </div>
      <div className="w-full justify-between text-[#A9B3C2] flex flex-row mb-4">
        <div className="grid">
          <div>{data.copyright}</div>
          <div>{data.date}</div>
        </div>
        <div>
          <button className="bg-[#2B558C]">View HD</button>
        </div>
      </div>
    </>
  );
}

export default CardDetail;
