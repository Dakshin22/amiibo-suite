import React from 'react';


const Collection = (props) =>
{
    return(
        <div>
        <h1 className = "Header">
        Collection:
        </h1>
        <ul className = "CollectionList">
          {props.collectionArr.map((item) => {
            return <li key={item.image}>{item.name} - {item.amiiboSeries}</li>;
          })}
        </ul>
        </div>
    )
}



export default Collection;