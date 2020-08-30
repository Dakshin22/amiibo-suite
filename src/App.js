import React, { useState, useEffect } from "react";
import Spacer from "./Spacer.js";
import "./App.css";
import Card from "./Card";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressProvider from "./ProgressProvider";

const App = () => {
  
  //changes when user types input into search bar.
  const [query, setQuery] = useState("");
  //array of results, which are objects
  const [results, setResults] = useState([]);
  /*
  *boolean value which determines whether the reuslts show in release order or by order
  *of the api
  */
  const [isOrdered, setIsOrdered] = useState(false);
  //changes when the user presses the search button and contains the search text
  const [search, setSearch] = useState("");
  //changes when a user selects a filter type in the dropdown and then clicks search.
  const [typeSearch, setTypeSearch] = useState("");
  //changes when user selects filter type in the dropdown
  const [type, setType] = useState("");
  //array of the user's collection
  const [collection, setCollection] = useState([]);


  useEffect(() => {
    getAmiiboSearch();
  }, [search, typeSearch]);

  const getAmiiboSearch = async () => {
    let typeURL,
      searchURL = "empty";
    typeURL = type ? (search ? `&type=${type}` : `?type=${type}`) : ``;
    searchURL = search ? `?name=${search}` : ``;
    const response = await fetch(
      `https://www.amiiboapi.com/api/amiibo/${searchURL}${typeURL}`
    );
    const data = await response.json();
    setResults(data.amiibo);
    console.log(data.amiibo);
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
    let filteredInput = resultInput.filter((result) => {
      return result.release.na;
    });
    filteredInput.sort((a, b) => {
      return (
        parseInt(b.release.na.replace(/-/g, "")) -
        parseInt(a.release.na.replace(/-/g, ""))
      );
    });
    return filteredInput;
  };

  const handleCollect = (object, checked) => {

    if(checked)
    {
      console.log(`${object.name} needs to be added`)

    }
    if(!checked)
    {
      console.log(`${object.name} needs to be removed`)
    }
    if(checked)
  {
    //variable to determine whether a identical amiibo already exists in the got it list
    //let check = false;
   // for (let i = 0; i < collection.length; i++) {
    //  if (collection[i] === name) {
      //  check = true;
     // }
   // }
    //if(!check)
    console.log(`current object added to collection: ${object.image}`)
      setCollection((prevCollection) => {
        return [...prevCollection, object]
        
      });
    
    console.log(`collection = ${collection}`)
  }
  else if(!checked)
  {
    let deletePosition = -1
    for (let i = 0; i < collection.length; i++) {
        if (collection[i] === object) {
          deletePosition = i;
        }
      }
      handleDelete(deletePosition)
  }
  };

  const handleDelete = (delPosition)=>
  {
    setCollection((prevCollection)=>
    {
      console.log(`this is the prevCollection: ${prevCollection}`)
      prevCollection.splice(delPosition, 1)
      return prevCollection
    }, )
  }
  const newCollection = collection

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
      <br />

      
      <Spacer />
      <div className="Circular">
        <ProgressProvider valueStart={0} valueEnd={66}>
          {(value) => (
            <CircularProgressbar
              value={results ? Math.ceil((results.length / 749) * 100) : 0}
              text={`${results ? results.length : 0}/749`}
            />
          )}
        </ProgressProvider>
      </div>
      <div className = "collectionDiv">
      {!isOrdered ? (
        <button
          onClick={() => {
            setIsOrdered(true);
          }}
        >
          Order: Newest First
        </button>
      ) : (
        <button
          onClick={() => {
            setIsOrdered(false);
          }}
        >
          Un-Order
        </button>
      )}
      {console.log(collection)}
      <ul>{
      newCollection.map((item)=>{
      return (<li key = {item.image}>{item.name}</li>)
      })}
      </ul>
      </div>
      {results ? (
        isOrdered ? (
          reorder(results).map((result) => (
            <Card
              key={result.image}
              name={result.name}
              series={result.gameSeries}
              image={result.image}
              release={result.release.na}
              object = {result}
              collectCallback={handleCollect}
            />
          ))
        ) : (
          results.map((result) => (
            <Card
              key={result.image}
              name={result.name}
              series={result.gameSeries}
              image={result.image}
              release={result.release.na}
              object = {result}
              collectCallback={handleCollect}
            />
          ))
        )
      ) : (
        <p>No Results</p>
      )}
      
    </div>
  );
};

export default App;
