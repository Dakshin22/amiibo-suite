import React from 'react';
import './App.css';
import style from './Card.module.css'

const Card = (props) => {
    return(
        <div className = {style.Card}>
            <h1>{props.name}</h1>
            <img className = {style.image} src = {props.image} alt = "amiibo"/>
            <h3>from {props.series}</h3>
            <p>released on {props.release}</p>
        </div>
    )
}


export default Card;