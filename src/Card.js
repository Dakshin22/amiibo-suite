import React, { useState } from "react";
import "./App.css";
import style from "./Card.module.css";

const Card = (props) => {
  const returnInitial = () => {
    let z = false;
    for (let i = 0; i < props.alreadyCollected.length; i++) {
      if (props.alreadyCollected[i].image === props.image) {
        z = true;
      }
    }
    return z;
  };

  const [collected, setCollected] = useState(returnInitial());

  const handleCheck = (e) => {
    setCollected(e.target.checked);
    props.collectCallback(props.object, e.target.checked);
  };
  return (
    <div className={style.Card}>
      <input type="checkbox" checked={collected} onChange={handleCheck} />
      <h1 className = "Card-Header">
        {props.name} - {props.object.amiiboSeries}
      </h1>
      <img className={style.image} src={props.image} alt="amiibo" />
      <p className = "Card-Text">Released on {props.release}</p>
    </div>
  );
};

export default Card;
