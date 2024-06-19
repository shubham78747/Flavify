import React from 'react';
import { Link } from 'react-router-dom';

import './Search.css';
import { Image } from 'react-bootstrap';



function Search(props) {
    return (
        <div className={`searchmain`}>
            <i><Image src='Images/searchicon.svg'></Image></i>
            <input type="search" placeholder='Search' />
            <span><Image src='Images/veg.svg'></Image></span>
        </div>
    );
}

export default Search;
