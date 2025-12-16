import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  return (
    <>
      <Navbar />
      <div className="container w-full h-full m-auto mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
