import React from 'react';


const Collection = (props) =>
{
    return(
        <div>
        <h1>
        Collection:
        </h1>
        <ul>
          {props.collectionArr.map((item) => {
            return <li key={item.image}>{item.name}</li>;
          })}
        </ul>
        </div>
    )
}



export default Collection;