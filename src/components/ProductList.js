import React, { useCallback, useEffect, useState } from "react";

export const ProductList = () => {
  const [products, setProduct] = useState([]);
  const [url, setUrl] = useState("http://localhost:8000/products");

  const urlPathList = {
    all: "http://localhost:8000/products",
    onlyStock: "http://localhost:8000/products?in_stock=true",
  };

  const fetchProduct = useCallback(async () => {
    const response = await fetch(url);
    const data = await response.json();
    setProduct(data);
  }, [url]);

  useEffect(() => {
    fetchProduct();

    return () => {
      console.log("page is deallocated!");
    };
  }, [fetchProduct]);

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
      {products.map((product) => {
        return (
          <div className="card">
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
