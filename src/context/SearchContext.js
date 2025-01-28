import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { RESULTS_FORMET, SEARCH_URL, SITE_ID } from "../config";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [allResultwithperpage, setAllResultwithperpage] = useState({});

  const fetchResults = async (query, page) => {
    setIsLoading(true);
    if (allResultwithperpage[page]) {
      setResults(allResultwithperpage[page].results);
      setTotalPages(allResultwithperpage[page].totalPages);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(SEARCH_URL, {
        params: {
          siteId: SITE_ID,
          q: query,
          resultsFormat: RESULTS_FORMET,
          page: page,
        },
      });

      setAllResultwithperpage((prevCache) => ({
        ...prevCache,
        [page]: {
          results: response?.data?.results,
          totalPages: response?.data?.pagination?.totalPages,
        },
      }));

      setResults(response?.data?.results);
      setTotalPages(response?.data?.pagination?.totalPages);
    } catch (error) {
      console.error("Error🔎  ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchInput(value);
    setPage(1);
    setAllResultwithperpage({});
    fetchResults(value, 1);
  };

  const handlePagination = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
      fetchResults(searchInput, newPage);
    }
  };

  useEffect(() => {
    if (searchInput) {
      fetchResults(searchInput, 1);
    } else {
      fetchResults("", 1);
    }
  }, [searchInput]);

  console.log("Prduct Result 🔎", results);

  return (
    <SearchContext.Provider
      value={{
        searchInput,
        results,
        page,
        totalPages,
        isLoading,
        handleSearch,
        handlePagination,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
