import React from 'react';
import { Link } from 'react-router-dom';

import './MenuPageComponent.css';



function MenuPageComponent(props) {
    return (
        <div className={`maintitle ${props.className}`}>
            <h1>{props.title}</h1>
            <span>{props.tag}</span>
        </div>
    );
}

export default MenuPageComponent;
