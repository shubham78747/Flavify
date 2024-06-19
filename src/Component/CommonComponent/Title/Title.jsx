import React from 'react';
import { Link } from 'react-router-dom';

import './Title.css';



function Title(props) {
    return (
        <div className={`maindishtitle ${props.className}`}>
            <h3>{props.title}</h3>
        </div>
    );
}

export default Title;
