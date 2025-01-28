import React from "react";
import { useSearch } from "../context/SearchContext";
import styled from "styled-components";

const Pagination = () => {
  const { page, totalPages, handlePagination } = useSearch();

  const getPaginationRange = () => {
    const range = [];
    const pageOffset = 2;

    for (let i = page - pageOffset; i <= page + pageOffset; i++) {
      if (i > 0 && i <= totalPages) {
        range.push(i);
      }
    }

    return range;
  };
  return (
    <PaginationContainer>
      <Button onClick={() => handlePagination(page - 1)} disabled={page === 1}>
        Previous
      </Button>

      {getPaginationRange().map((pageNum) => (
        <PageButton
          key={pageNum}
          onClick={() => handlePagination(pageNum)}
          active={pageNum === page}
        >
          {pageNum}
        </PageButton>
      ))}

      <Button
        onClick={() => handlePagination(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 0 5px;
  background-color: #0742ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const PageButton = styled(Button)`
  background-color: ${(props) => (props.active ? "#0742ff" : "#dcdcdc")};
  color: ${(props) => (props.active ? "white" : "#007bff")};
`;

export default Pagination;
