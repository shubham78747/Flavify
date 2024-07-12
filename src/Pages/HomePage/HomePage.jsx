import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import TableHeaderTitle from '../../Component/CommonComponent/TableTitle/TableHeaderTitle';
import QuickBites from '../../Component/HomePageComponent/QuickBites/QuickBites';
import OfferBanner from '../../Component/HomePageComponent/OfferBanner/OfferBanner';
import Combos from '../../Component/HomePageComponent/Combos/Combos';
import { Image, Modal } from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';
import MobileBar from '../../Component/CommonComponent/MobileBar/MobileBar';
// import { tables } from './Tablejson/Tablejson';
import { useDispatch, useSelector } from 'react-redux';
import { fetchtable, setComboList, setCustomerPreference, setLpComboList } from './Tableslice/Tableslice';
import { postcustomerpreference } from './action';
import Search from '../../Component/CommonComponent/Search/Search';
import { fetchMenu, fetchQuickBites } from '../../Component/HomePageComponent/QuickBites/QuickBiteSlice/QuickBiteSlice';
import { addItemToCart, setAllPastOrders, setUserRegistered } from '../CartPage/Cartslice/Cartslice';
import { useChannel } from 'ably/react';
import { tables } from './Tablejson/Tablejson';
import { isEmpty } from 'lodash';
import { createCombos } from '../../Helper/Coman';


function HomePage() {
    // const [show, setShow] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    // const [tablenom, setTableNom] = useState();
    const [activeCategory, setActiveCategory] = useState('V');
    const [selectedFilter, setSelectedFilter] = useState([]);
    const dispatch = useDispatch();
    const { quickBites,menu  } = useSelector((state) => state.food);
    const { cartItemsList, pastOrdersList  } = useSelector((state) => state.cart);
    const [isImageShown, setIsImageShown] = useState(false);
    const { table, comboList, allCombos, customerPref } = useSelector((state) => state?.table);
    console.log({ comboList, allCombos })
    const toggleImage = () => {
        setIsImageShown(!isImageShown);
    };
    console.log('tablenom',{cartItemsList})
    //   const handleShow = () => {
    //     setTableNom(table.table_id)
    //     setShow(true)
    // };

    // const { channel } = useChannel('punched_sub_order', (message) => {
    //     const response = JSON.parse(message.data)
    //     let pastOrders = []
        
    //     const data = {
    //         is_punched: true,
    //         items: cartItemsList,
    //         sub_order_id: response.sub_order_id
    //     }
    //     pastOrders = [...pastOrdersList, data]
    //     dispatch(setAllPastOrders(pastOrders))
    //     dispatch(addItemToCart([]))

    //     localStorage.setItem('cartItems', JSON.stringify([]))
    // });

    // useEffect(() => {
    //     dispatch(fetchtable(tables[2].table_id))       
    //     dispatch(fetchQuickBites());
    //     dispatch(fetchMenu());
    // }, [0]);

    // const createCombos = (combos, diet) => {
    //     let comboslist = []
    //     for (const combo of combos) {
    //         let comboItems = []
    //         combo.items.map((item) => {
    //             const i = menu.items.find((i) => i.item_id === item)
    //             comboItems.push(i)
    //         })
    //         const data = {
    //             ...combo,
    //             diet: diet,
    //             items: comboItems
    //         }
    //         comboslist.push(data)
    //     }
    //     dispatch(setComboList(comboslist))
    // }
    

    useEffect(() => {
        if(activeCategory) {
            const filtermenu = quickBites?.filter((item) => activeCategory === 'N' ? item?.diet === 'V' || item?.diet === 'N' || item?.diet === 'E' : activeCategory === 'E' ? item?.diet === 'V' || item?.diet === 'E' : item?.diet === 'V');
            setSelectedFilter(filtermenu)
        }
    }, [activeCategory, quickBites]);
    
    useEffect(() => {
        const tableDataStr = localStorage.getItem('tableData');
        const tableData = tableDataStr ? JSON.parse(tableDataStr) : {isfirst : false};
        const isRegistered = JSON.parse(localStorage.getItem('isRegistered'))
        dispatch(setUserRegistered(isRegistered ? isRegistered : false))
        // dispatch(addItemToCart(cart))
        if(tableData.isfirst) {
            const getitemdata = JSON.parse(localStorage.getItem('custPref'));
            setActiveCategory(getitemdata?.diet || 'V')
        }
    }, [0]);

    const handleCategoryClick = (category) => {
        const getitemdata = JSON.parse(localStorage.getItem('custPref'));
            localStorage.setItem('custPref', JSON.stringify({ diet: category, pax: getitemdata?.pax }));
            dispatch(setCustomerPreference({ diet: getitemdata?.diet, pax: currentStep }))
            setIsImageShown(false)
    };

    useEffect(() => {
        if (!isEmpty(customerPref)) {
          setCurrentStep(customerPref?.pax)
          setActiveCategory(customerPref?.diet)
        }
      }, [customerPref]);

    const handleSearchchnage = (e) => {
        const serach = e.target.value;
        const filtermenu = quickBites.filter((item) => item?.item_name.toLowerCase().includes(serach.toLowerCase()));
        setSelectedFilter(filtermenu) 
    }

    return (
        <>
            <section>
                <div className="container">
                    <div className="tabledetail">
                        {/* <TableHeaderTitle titleicon="/Images/table.svg" title={`Table Number : ${table?.table_number ? table?.table_number : '' }`} className="d-flex" profileimg="/Images/profile.svg" link="#" handleShow={handleShow}></TableHeaderTitle> */}
                        <Search 
                          selectedOption={activeCategory} 
                          handleCategoryClick={handleCategoryClick}  
                          handleSearchchnage={handleSearchchnage}
                          isImageShown={isImageShown}
                          toggleImage={toggleImage}
                          />
                        <QuickBites menu={menu} quickBites={selectedFilter} />
                        <OfferBanner />
                        {comboList.length > 0 ? <Combos/> : ''}
                        <MobileBar />
                    </div>
                </div>
            </section>
        </>
    );
}

export default HomePage;
