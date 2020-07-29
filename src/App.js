import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("")
  const [typeSearch, setTypeSearch] = useState("")
  const [type, setType] = useState("");

  useEffect(() => {
    getAmiiboSearch();
  }, [search, typeSearch]);

  const getAmiiboSearch = async () => {
    let typeURL, searchURL = "empty"
    typeURL = type ? (search ? `&type=${type}`: `?type=${type}`): ``  
    searchURL = search ? `?name=${search}`:``
    const response = await fetch(
      `https://www.amiiboapi.com/api/amiibo/${searchURL}${typeURL}`
    );
    const data = await response.json();
    setResults(data.amiibo);

  };

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);

  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(query);
    setTypeSearch(type);
  };

  const handleTypeChange = (e) => {
    const { value } = e.target;
    setType(value);

  };

  const reorder = (resultInput) => {


    let resultOrig = resultInput
    let temp = {}
    let j = 0 
  for(let i = 0; i<resultOrig.length; i++)
  {
    j = i
    while(j>0 && newerThan(resultOrig[j].release.na, resultOrig[j-1].release.na))
    {
      
      temp = resultOrig[j]
      resultOrig[j] = resultOrig[j-1]
      resultOrig[j-1] = temp
      j = j-1;
    }

  
  }
  for(let i = 0; i<resultOrig.length; i++)
  {
    console.log(resultOrig[i].release.na)
  }
  return resultOrig;
}

 const newerThan = (left, right) =>
 {
   if(left && right)
   {
  const newLeft = parseInt(left.replace(/-/g, ''))
  const newRight = parseInt(right.replace(/-/g, ''))

  console.log(newLeft)
  console.log(newRight)
  const ret = newLeft > newRight ? true : false
  return ret
   }
   else
   {
     return 0
   }
  }

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

 
 <CircularProgressbar value={54} text={`${54}%`} />
      {results &&
        console.log(reorder(results))}

       { results.map((result) => (
          <Card
            key = {result.image}
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
