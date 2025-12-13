function Navbar() {
  return (
    <>
      <div className="bg-[#2B378C]">
        <div className="container m-auto flex items-center justify-between">
          <div className="flex items-center gap-4 py-2">
            <img
              src="https://api.nasa.gov/assets/img/favicons/favicon-192.png"
              alt="logo-nasa"
              className="h-[3rem]"
            />
            <span className="text-xl font-bold">APOD NASA</span>
          </div>
          <div>
            <span className="text-xl">Home</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
