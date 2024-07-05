import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import TableHeaderTitle from '../../Component/HomePageComponent/TableTitle/TableHeaderTitle';
import QuickBites from '../../Component/HomePageComponent/QuickBites/QuickBites';
import OfferBanner from '../../Component/HomePageComponent/OfferBanner/OfferBanner';
import Combos from '../../Component/HomePageComponent/Combos/Combos';
import { Image, Modal } from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';
import MobileBar from '../../Component/CommonComponent/MobileBar/MobileBar';
import { tables } from './Tablejson/Tablejson';
import { useDispatch, useSelector } from 'react-redux';
import { fetchtable, setComboList } from './Tableslice/Tableslice';
import { postcustomerpreference } from './action';
import Search from '../../Component/CommonComponent/Search/Search';
import { fetchMenu, fetchQuickBites } from '../../Component/HomePageComponent/QuickBites/QuickBiteSlice/QuickBiteSlice';
import { addItemToCart, setAllPastOrders, setUserRegistered } from '../CartPage/Cartslice/Cartslice';
import { useChannel } from 'ably/react';


function HomePage() {
    const [show, setShow] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [tablenom, setTableNom] = useState();
    const [activeCategory, setActiveCategory] = useState('V');
    const [selectedFilter, setSelectedFilter] = useState([]);
    const dispatch = useDispatch();
    const { quickBites,menu  } = useSelector((state) => state.food);
    const { cartItems, pastOrdersList  } = useSelector((state) => state.cart);
    const { table } = useSelector((state) => state?.table);
    const [isImageShown, setIsImageShown] = useState(false);
    const toggleImage = () => {
        setIsImageShown(!isImageShown);
    };

    const { channel } = useChannel('punched_sub_order', (message) => {
        const response = JSON.parse(message.data)
        let pastOrders = []
        
        const data = {
            is_punched: true,
            items: cartItems,
            sub_order_id: response.sub_order_id
        }
        pastOrders = [...pastOrdersList, data]
        dispatch(setAllPastOrders(pastOrders))
        dispatch(addItemToCart([]))

        localStorage.setItem('cartItems', JSON.stringify([]))
    });

    useEffect(() => {
        dispatch(fetchtable(tables[2].table_id))       
        dispatch(fetchQuickBites());
        dispatch(fetchMenu());
    }, [0]);

    const createCombos = (combos, diet) => {
        let comboslist = []
        for (const combo of combos) {
            let comboItems = []
            combo.items.map((item) => {
                const i = menu.items.find((i) => i.item_id === item)
                comboItems.push(i)
            })
            const data = {
                ...combo,
                diet: diet,
                items: comboItems
            }
            comboslist.push(data)
        }
        dispatch(setComboList(comboslist))
    }

    useEffect(() => {
        const tableDataStr = localStorage.getItem('tableData');
        const tableData = tableDataStr ? JSON.parse(tableDataStr) : {isfirst : false};
        if(table) {


            if(table?.fresh_order && !tableData.isfirst) {
                setShow(true)
                localStorage.setItem('category', JSON.stringify({ diet: 'V' }));
                setActiveCategory('V')
            }
            if(!table?.fresh_order) {
                const getitemdata = JSON.parse(localStorage.getItem('category'));
                let pastOrder = []
                let currecntOrder = []
                for (const order of table?.order_info) {
                    if(order?.is_punched) {
                        pastOrder.push(order)
                    } else {
                        currecntOrder = order.items
                    }
                }
                dispatch(setAllPastOrders(pastOrder))
                // localStorage.setItem('placeorder', JSON.stringify(pastOrder))
                if(table?.diet) {
                    localStorage.setItem('category', JSON.stringify({ diet: table?.diet }));
                    setActiveCategory(table?.diet)
                }
                if(currecntOrder.length > 0) {
                    const data = {"order":true}
                    localStorage.setItem('custorder', JSON.stringify(data))
                    dispatch(addItemToCart(currecntOrder))
                    localStorage.setItem('cartItems', JSON.stringify(currecntOrder))
                } else {
                    const data = {"order":false}
                    localStorage.setItem('custorder', JSON.stringify(data));
                }
            }
        }
    }, [table])
    
    

    useEffect(() => {
        if(activeCategory) {
            const filtermenu = quickBites.filter((item) => item?.diet === activeCategory);
            setSelectedFilter(filtermenu)
            if(table) {
                createCombos(table?.lpCombos[activeCategory], activeCategory)
            }
        }
    }, [activeCategory, quickBites, table]);
    
    useEffect(() => {
        const tableDataStr = localStorage.getItem('tableData');
        const tableData = tableDataStr ? JSON.parse(tableDataStr) : {isfirst : false};
        const isRegistered = JSON.parse(localStorage.getItem('isRegistered'))
        dispatch(setUserRegistered(isRegistered))
        // dispatch(addItemToCart(cart))
        if(tableData.isfirst) {
            const getitemdata = JSON.parse(localStorage.getItem('category'));
            setActiveCategory(getitemdata?.diet || 'V')
        }
    }, [0]);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setTableNom(table.table_id)
        setShow(true)
    };

    const senddata = async () => {
        try {
            const header = {
                order_id: table?.order_id,
                pax: currentStep,
                diet: activeCategory,
            }
            const response = await postcustomerpreference(header)
            if (response?.data) {
                setTableNom();
                handleClose();
                setShow(false)
                updateIsFirst(true);
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const updateIsFirst = (value) => {
        const tableData = JSON.parse(localStorage.getItem('tableData')) || {};
        tableData.isfirst = value;
        localStorage.setItem('tableData', JSON.stringify(tableData));
    };
    
    const handleCategoryClick = (category) => {
            localStorage.setItem('category', JSON.stringify({ diet: category }));
            setActiveCategory(category);
            setIsImageShown(false)
    };


    useEffect(() => {
        if (tablenom) {
            handletable(tablenom)
        }
    }, [tablenom])

    const handletable = (table_id) => {
        dispatch(fetchtable(table_id))
    }

    const steps = 10; 

    const handleSliderChange = (event) => {
        setCurrentStep(Number(event.target.value));
    };
    const handleSearchchnage = (e) => {
        const serach = e.target.value;
        const filtermenu = quickBites.filter((item) => item?.item_name.toLowerCase().includes(serach.toLowerCase()));
        setSelectedFilter(filtermenu) 
    }
    const maxStep = Math.min(steps, 10);

    return (
        <>
            <section>
                <div className="container">
                    <div className="tabledetail">
                        <TableHeaderTitle titleicon="/Images/table.svg" title={`Table Number : ${table?.table_number ? table?.table_number : '' }`} className="d-flex" profileimg="/Images/profile.svg" link="#" handleShow={handleShow}></TableHeaderTitle>
                        <Search 
                          selectedOption={activeCategory} 
                          handleCategoryClick={handleCategoryClick}  
                          handleSearchchnage={handleSearchchnage}
                          isImageShown={isImageShown}
                          toggleImage={toggleImage}
                          />
                        <QuickBites menu={menu} quickBites={selectedFilter} />
                        <OfferBanner />
                        {table?.lpCombos ? <Combos/> : ''}
                        <MobileBar />
                    </div>
                </div>
            </section>
            <Modal show={show}  className='automodal'>
              
                <Modal.Body className="pt-5 p-3">
                    <div className="guestselectmodalmain">
                        <h3>Number of guests for dining?</h3>                       
                        <div className="progress-container">
                            <div className="progress-number">{currentStep >= 10 ? '10+' : currentStep}</div>
                            <input
                                type="range"
                                min="1"
                                max={steps}
                                value={currentStep}
                                onChange={handleSliderChange}
                                className="progress-slider"
                            />
                        </div>
                        <ul className='selectcategories'>
                            <li className={activeCategory === 'V' ? 'active' : ''}>
                                <Link href="#" onClick={() => handleCategoryClick('V')}>
                                    <span><Image src='/Images/veg.svg' alt="Veg" /></span>
                                    Veg
                                </Link>
                            </li>
                            <li className={activeCategory === 'N' ? 'active' : ''}>
                                <Link href="#" onClick={() => handleCategoryClick('N')}>
                                    <span><Image src='/Images/nonveg.svg' alt="Non-Veg" /></span>
                                    Non-Veg
                                </Link>
                            </li>
                            <li className={activeCategory === 'E' ? 'active' : ''}>
                                <Link href="#" onClick={() => handleCategoryClick('E')}>
                                    <span><Image src='/Images/egg.svg' alt="Egg" /></span>
                                    Egg
                                </Link>
                            </li>
                        </ul>
                        <Link href="#" className='btngreen continue' onClick={senddata}>
                            Continue <Icon icon="formkit:right" width="16px" height="16px" />
                        </Link>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default HomePage;
