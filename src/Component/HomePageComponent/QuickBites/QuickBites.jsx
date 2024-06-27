import React, { useEffect, useState } from 'react';
import './QuickBites.css';
import Title from '../../CommonComponent/Title/Title';
import Carousel from '../../CommonComponent/OwlCarousel/OwlCarousel';
import Modals from '../../CommonComponent/Modal/Modal';

function QuickBites({menu,quickBites}) {
        const [show, setShow] = useState(false);   
        const [isFilled, setIsFilled] = useState(false);
        // const [count, setCount] = useState(1);
        const [quickbileFirst,setQuickBitefirst] = useState([])
        const [quickbileSecond,setQuickBiteSecond] = useState([])
        const [item,setItem] = useState([]);
        const [loader,setLoader] = useState(true)
        const handleClose = () => {setShow(false);}

        // const handleAddClick = () => {
        //     if (item) {
        //         setCount(prevCount => prevCount + 1);
        //     }
        // };

        // const handleRemoveClick = () => {
        //     if (item && count > 1) {
        //         setCount(prevCount => prevCount - 1);
        //     }
        // };
        
        // const calculateTotalPrice = () => {
        // return item.price*count;
        // };

        const handleData = (data) => {
            // Calculate the number of items for each half
            let firstHalfLength = Math.ceil(data.length / 2);
            let secondHalfLength = Math.floor(data.length / 2);
        
            // Adjust for odd number of items
            if (data.length % 2 !== 0) {
                firstHalfLength++;
            }
        
            // Split the data into two parts
            const firstHalf = data.slice(0, firstHalfLength);
            let secondHalf = data.slice(firstHalfLength);
        
            // Reverse the second half
            secondHalf = secondHalf.reverse();
        
            // Set state for first and reversed second halves
            setQuickBitefirst(firstHalf);
            setQuickBiteSecond(secondHalf);
        };
        

        useEffect(()=>{
            if(quickBites.length > 0){
                handleData(quickBites)  
                setLoader(false)    
            } else {
                setQuickBitefirst([])
                setQuickBiteSecond([])
            }
        },[quickBites])

        const handleQuickbiteClick = (quickbite) => {
            setShow(true);
            const optionsGrouped = Object.values(menu.itemOptions
            .filter((option) => option.item_id === quickbite.item_id)
            .reduce((groups, itemOption) => {
                const groupName = itemOption.option_group_name;
                if (!groups[groupName]) {
                groups[groupName] = { groupName, itemList: [] };
                }
                const optionDetails = menu.options.find(
                (option) => option.option_id === itemOption.option_id
                );
                groups[groupName].itemList.push(optionDetails);
                return groups;
            }, {}));

            // Find related add-ons and group by addon_group_name
            const addOnsGrouped = Object.values(menu.itemAddOns
            .filter((addon) => addon.item_id === quickbite.item_id)
            .reduce((groups, itemAddon) => {
                const groupName = itemAddon.addon_group_name;
                if (!groups[groupName]) {
                groups[groupName] = { groupName, itemList: [] };
                }
                const addonDetails = menu.addOns.find(
                (addon) => addon.addon_id === itemAddon.addon_id
                );
                groups[groupName].itemList.push(addonDetails);
                return groups;
            }, {}));
            const data = {
                item_id: quickbite.item_id,
                price: quickbite.price,
                item_name: quickbite.item_name,
                addOnsGrouped: addOnsGrouped,
                optionsGrouped: optionsGrouped,
            }
            setItem(data);
            // setRelatedOptions(data);
            // setRelatedAddOns(addOns);
        };

    return (
        <div className="quickbitesslider mb-5">
            {quickBites.length > 0 &&<Title title="Quick Bites" className="quicktitle mb-3" />}
            {quickbileFirst.length > 0 && <Carousel items={quickbileFirst} handleQuickbiteClick={handleQuickbiteClick}/>}
            {quickbileSecond.length > 0 && <Carousel items={quickbileSecond} handleQuickbiteClick={handleQuickbiteClick}/>}
            {/* <QuickBitesSlider menu={menu} quickBites={quickBites}/> */}
            <Modals
                item={item}
                show={show}
                onHide={handleClose}
                handleIconClick={() => setIsFilled(!isFilled)}
                isFilled={isFilled}
                /> 
        </div>
    );
}

export default QuickBites;
