import React, { useState } from "react";
import styled from "styled-components";
import { useSearch } from "../context/SearchContext";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const { handleSearch } = useSearch();

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  return (
    <SearchBarContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={searchText}
          onChange={handleChange}
          placeholder="Search products..."
        />
        <Button type="submit">Search</Button>
      </form>
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 300px;
  border: 2px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  border: 2px solid #ccc;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;

export default SearchBar;
