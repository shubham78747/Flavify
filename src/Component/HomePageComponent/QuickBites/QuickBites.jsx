import React, { useEffect, useState } from 'react';
import './QuickBites.css';
import Title from '../../CommonComponent/Title/Title';
import Carousel from '../../CommonComponent/OwlCarousel/OwlCarousel';
import Modals from '../../CommonComponent/Modal/Modal';
import { useSelector } from 'react-redux';
import {getGroupedOptionsAndAddOns} from '../../../Helper/Coman'
function QuickBites(props) {
        const [show, setShow] = useState(false);   
        const [isFilled, setIsFilled] = useState(false);
        const [quickbileFirst,setQuickBitefirst] = useState([])
        const [quickbileSecond,setQuickBiteSecond] = useState([])
        const [item,setItem] = useState([]);
        const [flag, setFlag] = useState(null);
        const { quickBites, menu } = useSelector((state) => state.food);
        const [loader,setLoader] = useState(true)
        const handleClose = () => {setShow(false);}

        const handleData = (data) => {
            const filteredData = [...data]
            if(filteredData.length > 5) {
                if(filteredData.length < 10) {
                    const data1 = [...filteredData]
                    const data2 = [...filteredData.reverse()]
                    setQuickBitefirst(data1);
                    setQuickBiteSecond(data2);
                } else {
                    const midpoint = Math.floor(filteredData.length / 2);
                    const firstHalf = filteredData.slice(0, midpoint);
                    const secondHalf = filteredData.slice(midpoint);
                    setQuickBitefirst(firstHalf);
                    setQuickBiteSecond(secondHalf);
                }
            } else {
                setQuickBitefirst(filteredData);
                setQuickBiteSecond([]);
            }
        };
        

        useEffect(()=>{
            if(props?.quickBites.length > 0){
                handleData(props?.quickBites)  
                setLoader(false)    
            } else {
                setQuickBitefirst([])
                setQuickBiteSecond([])
            }
        },[props?.quickBites])


        const handleQuickbiteClick = (quickbite) => {
            setFlag('Qickbitepage');
            const { groupedOptions, groupedAddOns } = getGroupedOptionsAndAddOns(menu, quickbite.item_id);
            // const optionsGrouped = Object.values(menu.itemOptions
            //     .filter((option) => option.item_id === quickbite.item_id)
            //     .reduce((groups, itemOption) => {
            //     const groupName = itemOption.option_group_name;
            //     if (!groups[groupName]) {
            //         groups[groupName] = { groupName, itemList: [] };
            //     }
            //     const optionDetails = menu.options.find(
            //         (option) => option.option_id === itemOption.option_id
            //     );
            //     groups[groupName].itemList.push(optionDetails);
            //     return groups;
            // }, {}));
            
            // // Find related add-ons and group by addon_group_name
            // const addOnsGrouped = Object.values(menu.itemAddOns
            //     .filter((addon) => addon.item_id === quickbite.item_id)
            //     .reduce((groups, itemAddon) => {
            //     const groupName = itemAddon.addon_group_name;
            //     if (!groups[groupName]) {
            //         groups[groupName] = { groupName, itemList: [] };
            //     }
            //     const addonDetails = menu.addOns.find(
            //         (addon) => addon.addon_id === itemAddon.addon_id
            //     );
            //     groups[groupName].itemList.push(addonDetails);
            //     return groups;
            // }, {}));
            const data = {
                item_id: quickbite.item_id,
                price: quickbite.price,
                item_name: quickbite.item_name,
                addOnsGrouped: groupedAddOns,
                optionsGrouped: groupedOptions,
            }
            setItem(data);
            setShow(true);
        };

    return (
        <div className="quickbitesslider mb-5">
            {quickBites.length > 0 &&<Title title="Quick Bites" className="quicktitle mb-3" />}
            <Carousel items={quickbileFirst} handleQuickbiteClick={handleQuickbiteClick}/>
            <Carousel items={quickbileSecond} handleQuickbiteClick={handleQuickbiteClick}/>
            {/* <QuickBitesSlider menu={menu} quickBites={quickBites}/> */}
            <Modals
                item={item}
                show={show}
                onHide={handleClose}
                handleIconClick={() => setIsFilled(!isFilled)}
                isFilled={isFilled}
                flag={flag}
                /> 
        </div>
    );
}

export default QuickBites;
