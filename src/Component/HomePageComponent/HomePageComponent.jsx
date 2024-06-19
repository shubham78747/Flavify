import React from 'react';
import { Link } from 'react-router-dom';

import './HomePageComponent.css';



function HomePageComponent(props) {
    return (
        <div className={`maintitle ${props.className}`}>
            <h1>{props.title}</h1>
            <span>{props.tag}</span>
        </div>
    );
}

export default HomePageComponent;
