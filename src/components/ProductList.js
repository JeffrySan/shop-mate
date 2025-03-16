import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";

export const ProductList = () => {
  const [url, setUrl] = useState("http://localhost:8000/products");

  const urlPathList = {
    all: "http://localhost:8000/products",
    onlyStock: "http://localhost:8000/products?in_stock=true",
  };
  
  const { data: products, error, isLoading } = useFetch(url, { timeout: 1000 });
  console.log(products);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <div className="filter">
        <button onClick={() => setUrl(urlPathList["all"])} className="all">
          All
        </button>
        <button
          onClick={() => setUrl(urlPathList["onlyStock"])}
          className="onlyStock"
        >
          In Stock Only
        </button>
      </div>
      {products && products.map((product) => {
        return (
          <div className="card" key={product.id}>
            <p className="id">{product.id}</p>
            <p className="name">{product.name}</p>
            <p className="info">
              <span className="price">${product.price}</span>
              <span className={product.in_stock ? "instock" : "unavailable"}>
                {product.in_stock ? "In Stock" : "Unavailable"}
              </span>
            </p>
          </div>
        );
      })}
    </section>
  );
};
