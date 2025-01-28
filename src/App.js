import React from "react";
import SearchBar from "./components/header";
import ProductList from "./components/Productlist";
import { useSearch } from "./context/SearchContext";
import LoadingPage from "./utils/LoadingPage";
import styled from "styled-components";

const App = () => {
  const { isLoading } = useSearch();

  return (
    <Container>
      <SearchBar />
      {isLoading ? (
        <LoadingPage>
          <h1>Loading....</h1>
        </LoadingPage>
      ) : (
        <>
          <ProductList />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 0 20px;
`;

export default App;
