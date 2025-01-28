import React from "react";
import { useSearch } from "../context/SearchContext";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

const ProductList = () => {
  const { results } = useSearch();

  return (
    <div>
      <ProductListContainer>
        {results &&
          results.length > 0 &&
          results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ProductListContainer>
      <Pagination />
    </div>
  );
};

const ProductListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-items: center;
  margin: 20px;
`;

export default ProductList;
