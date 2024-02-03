import { useState } from "react";
import { useNavigate } from "react-router";
import CompanyService from "../../../api/CompanyService";
import { useDebounce } from "../../../hooks/useDebounce";
import { useAuth } from "../../../hooks/useAuth";
import "./SearchBar.css";
import { ROUTES } from "../../../constants/ROUTES";

const SearchBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(""); //search bar value
  const [suggestions, setSuggestions] = useState([]); //return from BE
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const { token } = useAuth();

  const redirect = (company) => {
    console.log(company.id);
    navigate(ROUTES.COMPANY + company.id);
  };

  const fetchData = async (value) => {
    value = value.toUpperCase();
    console.log(value);
    const companies = await CompanyService.getCompaniesForNeededServices(
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
      <div className="container">
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="search"
          className="textbox"
          placeholder="Search for a service..."
          value={value}
          onChange={handleSearchInputChange}
        />
        <div className="suggestions">
          {suggestions &&
            suggestions.map &&
            suggestions.map((suggestion) => (
              <div
                className="suggestion"
                id={suggestion.id}
                onClick={() => redirect(suggestion)}
              >
                {suggestion["name"]}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default SearchBar;
