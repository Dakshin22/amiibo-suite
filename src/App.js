import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";
const App = () => {
  const [query, setQuery] = useState("peach");
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    getAmiiboSearch();
  }, [search]);

  const getAmiiboSearch = async () => {
    const response = await fetch(
      `https://www.amiiboapi.com/api/amiibo/?name=${search}${type}`
    );
    const data = await response.json();
    setResults(data.amiibo);
    console.log(data.amiibo);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    console.log(query);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(query);
  };

  const handleTypeChange = (e) => {
    const { value } = e.target;
    value !== "" ? setType(`&type=${value}`) : setType("");
    console.log(`Type: ${type}`);
  };

  return (
    <div className="App">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="search for amiibo..."
          value={query}
        />
        <label>Select Type:</label>
        <select value={type} onChange={handleTypeChange} name="type">
          <option value="">All</option>
          <option value="figure">Figure</option>
          <option value="card">Card</option>
          <option value="yarn">Yarn</option>
        </select>
        <button>Click to Search</button>
      </form>

      {results &&
        results.map((result) => (
          <Card
            name={result.name}
            series={result.gameSeries}
            image={result.image}
            release={result.release.na}
          />
        ))}
    </div>
  );
};

export default App;
