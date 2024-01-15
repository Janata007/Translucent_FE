import { useState, useEffect } from "react";
import CompanyService from "../../../api/CompanyService";
import { useDebounce } from "../../../hooks/useDebounce";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./SearchBar.css";
import CompanyResult from "../../../pages/Company/Company";

const SearchBar = () => {
  const [value, setValue] = useState(""); //search bar value
  const [suggestions, setSuggestions] = useState([]); //return from BE
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const [result, setResult] = useState(null);
  const { token } = useAuth();

  const findResult = (company) => {
    console.log("findResult method");
    setResult(suggestions.find((suggestion) => suggestion.company === company));
  };

  const fetchData = async (value) => {
    const { companies } = await CompanyService.getCompaniesForNeededServices(
      token,
      value
    );
    return companies;
  };

  useDebounce(
    async () => {
      try {
        const suggestions = await fetchData(value);
        setSuggestions(suggestions);
      } catch (error) {
        console.log(error);
      }
    },
    1000,
    [value]
  );
  const handleFocus = () => {
    setHideSuggestions(false);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setHideSuggestions(true);
    }, 200);
  };
  const handleSearchInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className={styles["container"]}>
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="search"
          className={styles["textbox"]}
          placeholder="Search data..."
          value={value}
          onChange={handleSearchInputChange}
        />
        <div
          className={`${styles.suggestions} ${
            hideSuggestions && styles.hidden
          }`}
        >
          {console.log(suggestions)}
          {suggestions.map((suggestion) => (
            <div
              className={styles.suggestion}
              id={suggestion.id}
              onClick={() => findResult(suggestion["name"])}
            >
              {suggestion["name"]}
            </div>
          ))}
        </div>
      </div>
      {result && <CompanyResult {...result} />}
    </>
  );
};
export default SearchBar;
