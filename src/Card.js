import React, { useState } from "react";
import "./App.css";
import style from "./Card.module.css";

const Card = (props) => {
  
 

  const returnInitial = () => {
    let z = false;
    for(let i = 0; i<props.alreadyCollected.length; i++)
    {
      if(props.alreadyCollected[i].image === props.image)
        {
          z = true;
        }
    }
    const ret = props.alreadyCollected.filter((item, index, arr) => {
      //console.log(props.alreadyCollected)
       //console.log(`${item.name} - ${item.amiiboSeries}: ${item.image === props.image}`)
       return item.image === props.image;
     }) === [];

     return z;

  } 
  
  const [collected, setCollected] = useState(
     returnInitial()
  );

  const handleCheck = (e) => {
    // const x = props.alreadyCollected.filter((item, index, arr) => {
    //   console.log(arr);
    //   return item.image === props.image;
    // }) !== [];
    //console.log(x);
    setCollected(e.target.checked);
    props.collectCallback(props.object, e.target.checked);
    //console.log(`this is from card.js ${props.object}`);
  };
  return (
    <div className={style.Card}>
      <input type="checkbox" checked={collected} onChange={handleCheck} />
      <h1>{props.name} - {props.object.amiiboSeries}</h1>
      <img className={style.image} src={props.image} alt="amiibo"/>
      <p>Released on {props.release}</p>
    </div>
  );
};

export default Card;
