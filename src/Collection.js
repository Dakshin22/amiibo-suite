import React from 'react';


const Collection = (props) =>
{
    return(
        <div>
        <h1 className = "Header">
        Collection:
        </h1>
        {props.collectionArr.length > 0 ? 
        <ul className = "CollectionList">
          {props.collectionArr.map((item) => {
            return <li key={item.image}>{item.name} - {item.amiiboSeries}</li>;
          })}
        </ul>
        :
        <p>There's nothing in your collection yet, click checkboxes on the reusults that you want to add to your collection.</p>}
        </div>
    )
}



export default Collection;