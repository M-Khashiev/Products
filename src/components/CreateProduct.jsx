import { useDispatch } from "react-redux";
import { useState } from "react";
import { createProduct } from "./slice";

function CreateProduct() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [features, setFeatures] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Название обязательно";
    if (!category) newErrors.category = "Категория обязательна";

    if (imageUrl && !/^https?:\/\/[^\s]+$/.test(imageUrl)) {
      newErrors.imageUrl = "Некорректный URL изображения";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Если ошибок нет, возвращаем true
  };

  const handleSubmit = () => {
    if (!validate()) return; // Если валидация не прошла, не отправляем данные

    const newProduct = {
      id: Date.now(), // Используем временный ID
      name,
      category,
      description,
      image_url: imageUrl,
      features: features ? features.split(",") : [],
    };

    console.log("New product:", newProduct); // Логирование нового продукта

    dispatch(createProduct(newProduct)); // Добавляем продукт в стейт

    // Очистим поля формы
    setName("");
    setCategory("");
    setDescription("");
    setImageUrl("");
    setFeatures("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Введите название"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

      <input
        type="text"
        placeholder="Введите категорию"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}

      <input
        type="text"
        placeholder="Введите описание (необязательно)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="text"
        placeholder="Ссылку на картинку (необязательно)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      {errors.imageUrl && <p style={{ color: "red" }}>{errors.imageUrl}</p>}

      <input
        type="text"
        placeholder="Полезные свойства через запятую (необязательно)"
        value={features}
        onChange={(e) => setFeatures(e.target.value)}
      />

      <button onClick={handleSubmit}>Создать продукт</button>
    </div>
  );
}

export default CreateProduct;
