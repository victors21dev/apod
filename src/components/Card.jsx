import { Link } from "react-router-dom";
import { useState } from "react";

function Card({ props: element }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  if (element.media_type === "image") {
    return (
      <Link to={`/detail/${element.date}`}>
        <div className="cursor-pointer">
          {/* Título... */}
          <div className="font-bold text-sm lg:text-lg">{element.title}</div>

          <div className="shadow-lg overflow-hidden aspect-video relative">
            {!isImageLoaded && (
              <div className="absolute inset-0 w-full h-full bg-gray-700 animate-pulse flex items-center justify-center">
                <p className="text-white text-sm">Loading photo...</p>
              </div>
            )}

            <img
              src={element.url}
              alt={element.title}
              onLoad={handleImageLoad}
              loading="lazy"
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          <div className="text-[#A9B3C2]">
            {element.copyright && (
              <div>
                <span className="text-sm lg:text-lg">
                  {element.copyright !== "undefined" ? element.copyright : null}
                </span>
              </div>
            )}
            <div className="text-sm lg:text-lg">{element.date}</div>
          </div>
        </div>
      </Link>
    );
  }

  // Video
  if (element.media_type === "video") {
    // Acesso corrigido: element.media_type
    return (
      <div>
        <div className="font-bold text-sm lg:text-lg">{element.title}</div>
        <div
          className="bg-gray-700 shadow-lg overflow-hidden 
                            aspect-video flex items-center justify-center 
                            text-white text-lg font-bold hover:bg-gray-600 transition duration-300"
        >
          <iframe
            width="100%"
            height="315"
            src={element.url} // Acesso corrigido
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title={element.title}
          ></iframe>
        </div>
        <div>
          <div className="text-sm lg:text-lg">{element.date}</div>
        </div>
      </div>
    );
  }

  return null;
}

export default Card;
