import React from 'react';
import { Link } from 'react-router-dom';

import './QuickBites.css';
import { Image } from 'react-bootstrap';
import Title from '../../CommonComponent/Title/Title';
import QuickBitesSlider from './QuickBitesSlider';



function QuickBites() {
    return (
        <div className="quickbitesslider mb-5">
            <Title title="Quick Bites" className="quicktitle mb-3" />
            <QuickBitesSlider />
        </div>
    );
}

export default QuickBites;
