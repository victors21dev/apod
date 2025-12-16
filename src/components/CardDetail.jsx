import { useEffect, useState } from "react";

function CardDetail({ data }) {
  const [image, setImage] = useState(null);
  const [isLoadingHD, setIsLoadingHD] = useState(false);
  const [nameButtonView, setNameButtonView] = useState("");

  useEffect(() => {
    if (data && data.url) {
      setImage(data.url);
      setNameButtonView("View HD");
    }
  }, [data]);

  if (!data) {
    return <div>Loading details...</div>;
  }

  const handlePhotoHD = () => {
    if (data && data.hdurl) {
      setIsLoadingHD(true);
      setImage(data.hdurl);
      setNameButtonView("Reload");
    }
  };

  const handleImageLoad = () => {
    setIsLoadingHD(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-3xl">{data.title}</div>
      <div className="flex h-screen relative">
        {image && (
          <img
            src={image}
            alt="image"
            className="h-full rounded-lg object-contain w-full"
            onLoad={handleImageLoad}
          />
        )}

        {isLoadingHD && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#2B378C] bg-opacity-75 rounded-lg">
            <p className="text-white text-lg">Loading...</p>
          </div>
        )}
        {!image && !isLoadingHD && (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
            Loading image...
          </div>
        )}
      </div>
      <div className="w-full justify-between text-[#A9B3C2] flex flex-row mb-4">
        <div className="grid">
          <div>{data.copyright}</div>
          <div>{data.date}</div>
        </div>
        <div className="flex gap-2">
          <div>
            <button
              onClick={() => {
                handlePhotoHD();
              }}
              className="bg-[#2B558C] hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            >
              {nameButtonView}
            </button>
          </div>
          <a href={data.hdurl} target="blank">
            <button className="bg-[#5F2B8C] hover:bg-purple-800 text-white font-bold py-2 px-4 rounded">
              Download
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
