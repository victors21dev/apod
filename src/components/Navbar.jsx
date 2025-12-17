import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CircleArrowLeft, Telescope } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isDetailPage = currentPath.startsWith("/detail");

  return (
    <>
      <div className="bg-[#2B378C] sticky top-0 z-100">
        <div className="container m-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-4 py-2">
            <img
              src="https://api.nasa.gov/assets/img/favicons/favicon-192.png"
              alt="logo-nasa"
              className="h-12"
            />
            <span className="text-[1rem] lg:text-xl font-bold">APOD NASA</span>
          </div>
          <div>
            <span className="text-[1rem] lg:text-xl">
              <Link to="/">
                {isDetailPage ? (
                  <div className="flex gap-2">
                    <CircleArrowLeft />
                    <div className="flex items-center">Back</div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Telescope />
                    <div className="flex items-center">Home</div>
                  </div>
                )}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
