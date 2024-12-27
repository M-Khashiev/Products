import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, addAndRemoveFavorite } from "./slice";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./styles/allList.css";

function Lists({ list }) {
  const dispatch = useDispatch();
  const { isLoading, status, favorites, products } = useSelector(
    (state) => state.request
  );
  const [value, setValue] = useState("");

  const isFavorite = (product) => {
    return favorites.find((favorite) => favorite.id === product.id) !== undefined;
  };

  // Фильтрация продуктов по имени
  list = list.filter((product) =>
    product.name.toLowerCase().includes(value.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (status === "rejected") {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Поиск по имени продукта"
        className="search-input"
      />
      <div className="product-list">
        {list.map((product) => (
          <div className="product-card" key={product.id}>
            <Link to={`/products/${product.id}`} className="product-link">
              <img
                src={product.image_url}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <h3 className="product-price">{product.price} руб.</h3>
              </div>
            </Link>
            <div className="product-actions">
              <button
                onClick={() => dispatch(deleteProduct({ id: product.id }))}
                className="product-delete"
              >
                Удалить
              </button>
              <button
                onClick={() => dispatch(addAndRemoveFavorite(product))}
                className="product-favorite"
              >
                {isFavorite(product) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="red"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Lists;
