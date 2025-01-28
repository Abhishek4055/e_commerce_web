import React from "react";
import styled from "styled-components";

const ProductCard = ({ product }) => {
  return (
    <ProductItemContainer>
      <ProductImage src={product.thumbnailImageUrl} alt={product.name} />
      <ProductName>{product.name}</ProductName>
      <PriceContainer>
        <ProductPrice>Rs.{product.price}</ProductPrice>
        {product.msrp && product.msrp > product.price && (
          <StrikedPrice>Rs.{product.msrp}</StrikedPrice>
        )}
      </PriceContainer>
    </ProductItemContainer>
  );
};

const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px #8b8585;
  width: 100%;
  max-width: 250px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin: 10px 0;
  color: #000000;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  color: blue;
  font-weight: bold;
  margin-right: 10px;
`;

const StrikedPrice = styled.span`
  font-size: 16px;
  color: red;
  text-decoration: line-through;
`;

export default ProductCard;
