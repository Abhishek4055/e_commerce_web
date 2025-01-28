import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { RESULTS_FORMET, SEARCH_URL, SITE_ID } from "../Myconfig";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [allResultwithperpage, setAllResultwithperpage] = useState({});

  const fetchResults = useCallback(
    async (query, currentPage) => {
      setIsLoading(true);
      console.log("Fetching for page:", currentPage);

      if (allResultwithperpage[currentPage]) {
        setResults(allResultwithperpage[currentPage].results);
        setTotalPages(allResultwithperpage[currentPage].totalPages);
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(SEARCH_URL, {
          params: {
            siteId: SITE_ID,
            q: query,
            resultsFormat: RESULTS_FORMET,
            page: currentPage,
          },
        });

        setAllResultwithperpage((prevCache) => ({
          ...prevCache,
          [currentPage]: {
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
    },
    [allResultwithperpage]
  );

  const handleSearch = (value) => {
    setSearchInput(value);
    setPage(1);
    setAllResultwithperpage({});
  };

  const handlePagination = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    const query = searchInput || "";
    fetchResults(query, page);
  }, [searchInput, page, fetchResults]);

  console.log("Product Results 🔎", results);

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
