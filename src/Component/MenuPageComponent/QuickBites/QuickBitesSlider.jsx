import React, { useState } from 'react';
import './QuickBites.css';
import Carousel from '../../CommonComponent/OwlCarousel/OwlCarousel';
function QuickBitesSlider({items,handleQuickbiteClick}) {

    const options = {
        margin: 0,
        responsiveClass: true,
        nav: false,
        dots: false,
        smartSpeed: 500,
        autoplay: true,
        loop: true,
        items: 3.5,

    };
    // const options2 = {

    //     margin: 0,
    //     responsiveClass: true,
    //     nav: false,
    //     dots: false,
    //     smartSpeed: 500,
    //     autoplay: true,
    //     loop: true,
    //     items: 3.5,


    // };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [activeCategory, setActiveCategory] = useState('veg');

    // Handler to set the active category
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    // Event handler to close the modal

    const [isFilled, setIsFilled] = useState(false);

    // Event handler to toggle the filled state
    const handleIconClick = () => {
        setIsFilled(!isFilled);
    };


    // State to manage selected options
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Base price for the variant (this could be dynamic based on actual data)
    const basePrice = 450;

    // Option prices (you could use different prices for different options)
    const optionPrices = {
        selectoption: 450,
        selectoption1: 450,
        selectoption2: 450,
        selectoption3: 450,
    };

    // Handler to increase the count
    const handleAddClick = () => {
        setCount(count + 1);
    };

    // Handler to decrease the count
    const handleRemoveClick = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    // Handler to toggle checkbox selection
    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        if (checked) {
            setSelectedOptions([...selectedOptions, id]);
        } else {
            setSelectedOptions(selectedOptions.filter(option => option !== id));
        }
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        const selectedOptionPrices = selectedOptions.reduce((total, option) => total + optionPrices[option], 0);
        return (basePrice + selectedOptionPrices) * count;
    };
    const [count, setCount] = useState(1);

    return (
        <>
            <div className="">
            <Carousel items={items} handleQuickbiteClick={handleQuickbiteClick}/>
            </div>
        </>
    );
}

export default QuickBitesSlider;

