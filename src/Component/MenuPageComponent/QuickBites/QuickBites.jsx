import React from 'react';
import { Link } from 'react-router-dom';

import './QuickBites.css';
import { Image } from 'react-bootstrap';
import Title from '../../CommonComponent/Title/Title';
import QuickBitesSlider from './QuickBitesSlider';



function QuickBites({ items, handleQuickbiteClick }) {
    return (
        <div className="quickbitesslider mb-5 mt-5">
            {/* <Title title="Quick Bites" className="quicktitle mb-3" /> */}
            <QuickBitesSlider items={items} handleQuickbiteClick={handleQuickbiteClick}/>
        </div>
    );
}

export default QuickBites;
