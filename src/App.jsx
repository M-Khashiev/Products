import { Routes, Route, Link } from "react-router-dom";
import SinglePage from "./components/SingePage";
import Navbar from "./components/Navbar";
import Lists from "./components/AllLists";
import { useSelector } from "react-redux";
import CreateProduct from "./components/CreateProduct";

function App() {
  const { favorites, products } = useSelector((state) => state.request);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Link to="/products">Открыть список</Link>} />
        <Route path="/products" element={<Lists list={products} />} />
        <Route path="/products/favorites" element={<Lists list={favorites} />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/products/:id" element={<SinglePage />} />
      </Routes>
    </>
  );
}

export default App;