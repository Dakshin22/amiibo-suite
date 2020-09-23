import React, { useState, useEffect } from "react";
import Spacer from "./Spacer.js";
import Header from "./Header";
import "./App.css";
import "./Collection";
import Card from "./Card";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressProvider from "./ProgressProvider";
import Collection from "./Collection";

const App = () => {
  //changes when user types input into search bar.
  const [query, setQuery] = useState("");
  //changes only when the user presses the search button and contains the search text
  const [search, setSearch] = useState("");
  //array of results, which are objects
  const [results, setResults] = useState([]);
  /*
   *boolean value which determines whether the reuslts show in release order or by order
   *of the api
   */
  const [isOrdered, setIsOrdered] = useState(false);

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
  };
  //sets the query value in state (changes on every keystroke)
  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  //sets the search value in state (changes when user clicks search button)
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(query);
    setTypeSearch(type);
  };

  //sets type value in state
  const handleTypeChange = (e) => {
    const { value } = e.target;
    setType(value);
  };

  //reorders results
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

  //adds or removes a result that has been checked to the collection array in state
  const handleCollect = (object, checked) => {
    if (checked) {
      setCollection((prevCollection) => {
        return [...prevCollection, object];
      });
    }
    //removes item from collection state array
    else if (!checked) {
      setCollection((prevCollection) => {
        return prevCollection.filter((collectionItem) => {
          return collectionItem.image !== object.image;
        });
      }, console.log(collection));
      
    }
  };

  return (
    <div className="App">
      
      <Header/>
      <Spacer/>
      <div className = "Column-Layout">
      <form onSubmit={handleSearch}>
        <input
          type="text" 
          onChange={handleChange}
          placeholder="SEARCH..."
          value={query}
        />
        <br></br>
        <label>Select Type: </label>
        <select value={type} onChange={handleTypeChange} name="type">
          <option value="">All</option>
          <option value="figure">Figure</option>
          <option value="card">Card</option>
          <option value="yarn">Yarn</option>
        </select>
        <br></br>
        <button>Click to Search</button>
      </form>
      <br />

      <Spacer />
      <div className="Circular">
        <ProgressProvider valueStart={0} valueEnd={66}>
          {(value) => (
            <CircularProgressbar
              value={collection ? Math.ceil((collection.length / 749) * 100) : 0}
              text={`${collection ? collection.length : 0}/749`}
            />
          )}
        </ProgressProvider>
      
      <Spacer/>
      
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
        </div>
        <Spacer/>
        <div className="collectionDiv">
        <Collection collectionArr = {collection}/>
      </div>
      </div>
      <div className = "Results">
      {results ? (
        isOrdered ? (
          reorder(results).map((result) => (
            <Card
              alreadyCollected = {collection}
              key={result.image}
              name={result.name}
              series={result.gameSeries}
              image={result.image}
              release={result.release.na}
              object={result}
              collectCallback={handleCollect}
            />
          ))
        ) : (
          results.map((result) => (
            <Card
              alreadyCollected = {collection}
              key={result.image}
              name={result.name}
              series={result.gameSeries}
              image={result.image}
              release={result.release.na}
              object={result}
              collectCallback={handleCollect}
            />
          ))
        )
      ) : (
        <p>No Results</p>
      )}
      </div>
    </div>
  );
};

export default App;
