import React from "react";
import styled from "styled-components";

function LoadingPage({ children }) {
  return <LoadingContainer> {children} </LoadingContainer>;
}

const LoadingContainer = styled.div`
  text-align: center;
`;

export default LoadingPage;
