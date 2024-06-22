import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './QuickBites.css';
import { Image } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu, fetchQuickBites } from './QuickBiteSlice/QuickBiteSlice';
import Carousel from '../../CommonComponent/OwlCarousel/OwlCarousel';
import Loader from '../../CommonComponent/Loader/Loader';
import Modals from '../../CommonComponent/Modal/Modal';
function QuickBitesSlider() {
    const dispatch = useDispatch();
    const { quickBites, menu } = useSelector((state) => state.food);
    console.log(menu)
    useEffect(() => {
        dispatch(fetchQuickBites());
        dispatch(fetchMenu());
    }, [dispatch]);

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
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    // const handleShow = (itemName,id) => {        
    //     setSelectedCategory(itemName,id);
    //     setShow(true);
    //     const items = category[itemName];
    //     if (items && items.length > 0) {
    //         setSelectedItem(items[0].item_id);
    //         setTotal(items[0].price);
    //     }
    //     const data = menu.itemAddOns.filter(item => item.item_id === itemName);
    //     if (data.length > 0) {
    //         const addonGroupName = data[0].addon_group_name;
    //         const newData = menu.addOns.filter(item => item.item_id === data.addon_id)
    //         const addongroup = {
    //             groupName: addonGroupName,
    //             items: newData
    //         };
    //         setQuickeBiteMenu(addongroup);
    //     } else {
    //         setQuickeBiteMenu([]);
    //     }
    //     // setQuickeBiteMenu(data)
    // };

    // Event handler to close the modal

    const [isFilled, setIsFilled] = useState(false);

    // Event handler to toggle the filled state
    const handleIconClick = () => {
        setIsFilled(!isFilled);
    };
    const [count, setCount] = useState(1);
    const [quickbileFirst, setQuickBitefirst] = useState([])
    const [quickbileSecond, setQuickBiteSecond] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [vegOptions, setVegOptions] = useState([]);
    const [item, setItem] = useState([]);
    const [loader, setLoader] = useState(true)

    const handleAddClick = () => {
        if (item) {
            setCount(prevCount => prevCount + 1);
        }
    };

    const handleRemoveClick = () => {
        if (item && count > 1) {
            setCount(prevCount => prevCount - 1);
        }
    };
    // Handler to toggle checkbox selection
    const handleCheckboxChange = (event, price) => {
        const { id, checked } = event.target;
        const priceChange = checked ? price : -price;
        if (checked) {
            setSelectedOptions([...selectedOptions, id]);
        } else {
            setSelectedOptions(selectedOptions.filter(option => option !== id));
        }
        setItem(prevItem => ({
            ...prevItem,
            price: prevItem.price + priceChange
        }));
    };

    const handleVegCheckboxChange = (event, price) => {
        const { id, checked } = event.target;
        const priceChange = checked ? price : -price;
        if (checked) {
            setVegOptions([...vegOptions, id]);
        } else {
            setVegOptions(vegOptions.filter(option => option !== id));
        }
        setItem(prevItem => ({
            ...prevItem,
            price: prevItem.price + priceChange
        }));
    };

    const calculateTotalPrice = () => {
        return item.price * count;
    };

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


    // const foodData = () => {
    //     try {
    //       axios.get('https://flavify-test-caa8d1ec1c7d.herokuapp.com/api/v1/quickbites')
    //         .then(response => {
    //         handleData(response.data.data);
    //         })
    //         .catch(error => {
    //           console.error('Error fetching quickbites:', error);
    //         });      
    //       axios.get('https://flavify-test-caa8d1ec1c7d.herokuapp.com/api/v1/menu')
    //         .then(response => {
    //          setMenu(response.data);
    //          const items = response.data.items;
    //          const categories = items.reduce((acc, item) => {
    //             if (!acc[item.item_category]) {
    //                 acc[item.item_category] = [];
    //             }
    //             acc[item.item_category].push(item);
    //             return acc;
    //         }, {});
    //         setCategory(categories);
    //         })
    //         .catch(error => {
    //           console.error('Error fetching menu:', error);
    //         });
    //     } catch (err) {
    //       console.error('Exception occurred:', err);
    //     }
    //   };

    useEffect(() => {
        if (quickBites) {
            handleData(quickBites)
            setLoader(false)
        }
    }, [quickBites])

    // const [adonitem,setAdonitem] = useState([]);
    // const [item,setItem] = useState([]);
    // const handleRadioChange = (itemid,price) => {
    //     setSelectedItem(itemid);
    //     setTotal(price)
    //     const data = menu.itemAddOns.filter(item => item.item_id === itemid);
    //     const itemoptionid = menu.itemOptions.filter(item => item.item_id === itemid);

    //     if (itemoptionid.length > 0) {
    //         const optionGroupName = itemoptionid[0].option_group_name;
    //         const newDataoption = menu.options.filter(option => itemoptionid.some(io => io.option_id === option.option_id));
    //         const optionGroup = {
    //             groupName:optionGroupName,
    //             items:newDataoption
    //         }
    //         setItemOptions(optionGroup);
    //     } else {
    //         setItemOptions([]);
    //     }

    //     if (data.length > 0) {
    //         const addonGroupName = data[0].addon_group_name;
    //         const newData = menu.addOns.filter(item => item.item_id === data.addon_id)
    //         const addongroup = {
    //             groupName: addonGroupName,
    //             items: newData
    //         };
    //         setAdonitem(addongroup);
    //     } else {
    //         setAdonitem([]);
    //     }
    // };

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
            price: quickbite.price,
            name: quickbite.item_name,
            addOnsGrouped: addOnsGrouped,
            optionsGrouped: optionsGrouped,
        }
        setItem(data);
        // setRelatedOptions(data);
        // setRelatedAddOns(addOns);
    };

    return (
        <>
            {loader ? (
                <div>{<Loader />}</div>
            ) : (
                <div className="">
                    <Carousel items={quickbileFirst} handleQuickbiteClick={handleQuickbiteClick} />
                    <Carousel items={quickbileSecond} handleQuickbiteClick={handleQuickbiteClick} />
                </div>
            )}
            <Modals
                calculateTotalPrice={calculateTotalPrice}
                item={item}
                show={show}
                onHide={handleClose}
                handleAddClick={handleAddClick}
                handleRemoveClick={handleRemoveClick}
                handleIconClick={() => setIsFilled(!isFilled)}
                handleCheckboxChange={handleCheckboxChange}
                handleVegCheckboxChange={handleVegCheckboxChange}
                isFilled={isFilled}
                count={count}
            />
        </>
    );
}

export default QuickBitesSlider;

