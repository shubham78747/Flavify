import React from 'react';
import './Combos.css';
import Title from '../../CommonComponent/Title/Title';
import CombosSlider from './CombosSlider';

function Combos() {
    return (
        <div className="quickbitesslider mb-0">
            <Title title="A.I Combos" className="quicktitle mb-3" />
            <CombosSlider/>
        </div>
    );
}

export default Combos;
