import React from 'react';
import { Link } from 'react-router-dom';

import './Combos.css';
import { Image } from 'react-bootstrap';
import Title from '../../CommonComponent/Title/Title';

import CombosSlider from './CombosSlider';



function Combos() {
    return (
        <div className="quickbitesslider mb-0">
            <Title title="Custom combos just for you" className="quicktitle mb-3" />
            <CombosSlider />
        </div>
    );
}

export default Combos;
