import React, { useEffect, useState } from 'react';
import './Combos.css';
import Title from '../../CommonComponent/Title/Title';
import CombosSlider from './CombosSlider';
import { useSelector } from 'react-redux';

function Combos({activeDiet}) {
//     const {menu} = useSelector((state) => state.food)
//     const { table } = useSelector((state) => state?.table);
//     const [tableData, setTableData] = useState([])
//     const [diet,setDiet] = useState('V')

//     useEffect(() => {
//         console.log({ table })
//         if(table) {
//             setTableData(table?.lp_combos)
//         }
// }, [table])
//     useEffect(() => {
//         setDiet(diet)
// }, [diet])

   
// console.log({ table, tableData })
    return (
        <div className="quickbitesslider mb-0">
            <Title title="A.I Combos" className="quicktitle mb-3" />
            <CombosSlider/>
        </div>
    );
}

export default Combos;
