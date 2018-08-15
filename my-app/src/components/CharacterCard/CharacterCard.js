import React from 'react';
import "./CharacterCard.css";


const CharacterCard = props => (
    <div className="card col s3" data-id={props.id} onClick={() => props.clicked(props.id)}>
        <img className="picture" alt={props.name} src={props.image} />
        <div className="nameText">{props.name}</div>
    </div>
);

export default CharacterCard;