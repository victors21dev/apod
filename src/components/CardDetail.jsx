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

  const handleDownload = () => {
    const downloadUrl = data.hdurl;

    if (downloadUrl) {
      const filename = `${data.title.replace(/\s/g, "_")}_${data.date}_HD.jpg`;

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);

      console.log(`Download iniciado: ${filename}`);
    }
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
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-75 rounded-lg">
            <p className="text-white text-lg mb-4">Carregando em HD...</p>

            <svg
              className="animate-spin h-10 w-10 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
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
          <div>
            <button
              onClick={() => {
                handleDownload();
              }}
              className="bg-[#5F2B8C] hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
