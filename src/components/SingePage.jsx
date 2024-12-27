import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles/single.css";

function SinglePage() {
  const { id } = useParams();
  const { products } = useSelector((state) => state.request);

  if (!id) {
    return <div>Продукт не найден</div>;
  }

  const product = products.find((product) => product.id === parseInt(id, 10));

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <div className="single-page">
      <h1>{product.name}</h1>
      <h2>Цена: {product.price} руб.</h2>
      <h3>Категория: {product.category}</h3>
      <img src={product.image_url} alt={product.name} />
      <p>{product.description}</p>
      <ol>
        Польза:
        {product.features?.map((element, index) => (
          <li key={index}>{element.toLowerCase()}</li>
        ))}
      </ol>
      <ul>
        {products.map(
          (productPagination) =>
            product.id !== productPagination.id && (
              <li key={productPagination.id}>
                <Link to={`/products/${productPagination.id}`}>
                  {productPagination.id}
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  );
}

export default SinglePage;
