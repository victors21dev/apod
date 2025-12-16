function Card(props) {
  // Image
  if (props.props.media_type === "image") {
    return (
      <div className="cursor-pointer">
        <div className="font-bold">{props.props.title}</div>
        <div
          className="bg-gray-700 shadow-lg overflow-hidden 
                          aspect-[16/9] flex items-center justify-center 
                          text-white text-lg font-bold hover:bg-gray-600 transition duration-300"
        >
          <img src={props.props.url} alt="image" />
        </div>
        <div className="text-[#A9B3C2]">
          <div>
            {console.log(props.props.copyright)}
            {props.props.copyright !== "undefined"
              ? [<span>{props.props.copyright}</span>]
              : null}
          </div>
          <div>{props.props.date}</div>
        </div>
      </div>
    );
  }
  //   Video
  if (props.props.media_type === "video") {
    return (
      <div>
        <div>{props.props.title}</div>
        <div
          className="bg-gray-700 shadow-lg overflow-hidden 
                          aspect-[16/9] flex items-center justify-center 
                          text-white text-lg font-bold hover:bg-gray-600 transition duration-300"
        >
          <iframe
            width="560"
            height="315"
            src={props.props.url}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div>
          <div>{props.props.date}</div>
        </div>
      </div>
    );
  }
}

export default Card;
