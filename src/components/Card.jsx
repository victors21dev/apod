import { Link } from "react-router-dom";

function Card(props) {
  // Image
  if (props.props.media_type === "image") {
    return (
      <Link to={`/detail/${props.props.date}`}>
        <div className="cursor-pointer">
          <div className="font-bold text-sm lg:text-lg">
            {props.props.title}
          </div>
          <div
            className="bg-gray-700 shadow-lg overflow-hidden 
                          aspect-video flex items-center justify-center 
                          text-white text-lg font-bold hover:bg-gray-600 transition duration-300"
          >
            <img src={props.props.url} alt="image" />
          </div>
          <div className="text-[#A9B3C2]">
            <div>
              {props.props.copyright !== "undefined"
                ? [
                    <span className="text-sm lg:text-lg">
                      {props.props.copyright}
                    </span>,
                  ]
                : null}
            </div>
            <div className="text-sm lg:text-lg">{props.props.date}</div>
          </div>
        </div>
      </Link>
    );
  }
  //   Video
  if (props.props.media_type === "video") {
    return (
      <div>
        <div className="font-bold text-sm lg:text-lg">{props.props.title}</div>
        <div
          className="bg-gray-700 shadow-lg overflow-hidden 
                          aspect-video flex items-center justify-center 
                          text-white text-lg font-bold hover:bg-gray-600 transition duration-300"
        >
          <iframe
            width="100%"
            height="315"
            src={props.props.url}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div>
          <div className="text-sm lg:text-lg">{props.props.date}</div>
        </div>
      </div>
    );
  }
}

export default Card;
