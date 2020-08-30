import React, { useState } from "react";
import "./App.css";
import style from "./Card.module.css";

const Card = (props) => {
  const [collected, setCollected] = useState(
    props.alreadyCollected.filter((item) => {
      console.log(item.image);
      return item.image === props.image;
    }) !== []
  );

  const handleCheck = (e) => {
    setCollected(e.target.checked);
    props.collectCallback(props.object, e.target.checked);
    console.log(`this is from card.js ${props.object}`);
  };
  return (
    <div className={style.Card}>
      <input type="checkbox" value={collected} onChange={handleCheck} />
      <h1>{props.name}</h1>
      <img className={style.image} src={props.image} alt="amiibo" width="130" height="200"/>
      <h3>from {props.series}</h3>
      <p>released on {props.release}</p>
    </div>
  );
};

export default Card;
