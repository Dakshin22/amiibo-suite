import React from 'react';
import './App.css';

const Card = (props) => {
    return(
        <div>
            <h1>{props.name}</h1>
            <img src = {props.image} alt = "amiibo"/>
            <h3>from {props.series}</h3>
            <p>released on {props.release}</p>
        </div>
    )
}


export default Card;