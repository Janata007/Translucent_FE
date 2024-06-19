import { useState } from "react";
import { useNavigate } from "react-router";
import UserService from "../../../api/UserService";
import { useDebounce } from "../../../hooks/useDebounce";
import { useAuth } from "../../../hooks/useAuth";
import "./SearchBarUsers.css";
import { ROUTES } from "../../../constants/ROUTES";

const SearchBarUsers = ({setUserForId}) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(""); //search bar value
  const [suggestions, setSuggestions] = useState([]); //return from BE
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const { token } = useAuth();

  const handleSuggestionClick = (user) => {
    setUserForId(user.userId);
    setSuggestions([])
  };

  const fetchData = async (value) => {
    const userNeeded = await UserService.getUsersByUsername(value, token);
    return userNeeded;
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
          placeholder="Search for a user..."
          value={value}
          onChange={handleSearchInputChange}
        />
        <div className="suggestions">
          {suggestions &&
            suggestions.map &&
            suggestions.map((suggestion) => (
              <div
                className="suggestion"
                id={suggestion.userId}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion["username"] + ": " + suggestion["email"]}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default SearchBarUsers;
