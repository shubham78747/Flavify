import React from 'react';
import { Link } from 'react-router-dom';

import './TableTitle.css';
import { Image } from 'react-bootstrap';



function TableHeaderTitle(props) {
    return (
        <div className={`maintitle ${props.className}`}>
            <h1 onClick={props.handleShow}><Image src={props.titleicon}></Image>{props.title}</h1>
            <Link to={props.link}><Image src={props.profileimg} ></Image></Link>
        </div>
    );
}

export default TableHeaderTitle;
