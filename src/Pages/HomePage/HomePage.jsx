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
import { fetchtable } from './Tableslice/Tableslice';
import { postcustomerpreference } from './action';
import Search from '../../Component/CommonComponent/Search/Search';
import { fetchMenu, fetchQuickBites } from '../../Component/HomePageComponent/QuickBites/QuickBiteSlice/QuickBiteSlice';


function HomePage() {
    const dispatch = useDispatch();
    const { quickBites,menu  } = useSelector((state) => state.food);
    const { table } = useSelector((state) => state?.table);

    useEffect(() => {
        dispatch(fetchQuickBites());
        dispatch(fetchMenu());
        dispatch(fetchtable(tables[4].table_id))       
        // const tableDataStr = localStorage.getItem('tableData');
        // const tableData = tableDataStr ? JSON.parse(tableDataStr) : {isfirst : false}; 
        // if (!tableData.isfirst) {
        //         setShow(true)
        // } else {
        //     console.log('tableData is not present in localStorage');
        // }
    }, [0]);

    useEffect(() => {
        const tableDataStr = localStorage.getItem('tableData');
        const tableData = tableDataStr ? JSON.parse(tableDataStr) : {isfirst : false}; 
        if(table?.fresh_order && !tableData.isfirst) {
            setShow(true)
        }
    }, [table])
    
    const [show, setShow] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [tablenom, setTableNom] = useState();
    const [activeCategory, setActiveCategory] = useState('V');
    const [selectedFilter, setSelectedFilter] = useState([]);

    useEffect(() => {
        const filtermenu = quickBites.filter((item) => item?.diet === activeCategory);
        setSelectedFilter(filtermenu)
    }, [activeCategory,quickBites]);
    
  useEffect(() => {
    const getitemdata = JSON.parse(localStorage.getItem('category'));
    setActiveCategory(getitemdata?.diet || 'V')
  }, [0]);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setTableNom(tables[1].table_id)
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

    // localStorage.setItem('category', JSON.stringify({ diet: activeCategory }));
    
    const handleCategoryClick = (category) => {
        const storedCategory = JSON.parse(localStorage.getItem('category'));
        if (storedCategory && storedCategory.diet === category) {
            setActiveCategory(category);
        } else {
            localStorage.setItem('category', JSON.stringify({ diet: category }));
            setActiveCategory(category);
        }
    };


    useEffect(() => {
        if (tablenom) {
            handletable(tablenom)
        }
    }, [tablenom])

    const handletable = (table_id) => {
        dispatch(fetchtable(table_id))
    }

    const steps = 10; // Define the total number of steps

    // Handler to sync slider changes
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
                        <TableHeaderTitle titleicon="/Images/table.svg" title="Table Number : 5" className="d-flex" profileimg="/Images/profile.svg" link="#" handleShow={handleShow}></TableHeaderTitle>
                        <Search 
                          selectedOption={activeCategory} 
                          setSelectedOption={setActiveCategory} 
                          handleCategoryClick={handleCategoryClick}  
                          handleSearchchnage={handleSearchchnage}
                          />
                        {<QuickBites menu={menu} quickBites={selectedFilter} />}
                        <OfferBanner />
                        <Combos />
                        <MobileBar />
                    </div>
                </div>
            </section>
            <Modal show={show}  className='automodal'>
                {/* <Modal.Header closeButton></Modal.Header> */}
                <Modal.Body className="pt-5 p-3">
                    <div className="guestselectmodalmain">
                        <h3>Number of guests for dining?</h3>
                        {/* <span className='selectedguest'>1</span> */}
                        <div className="progress-container">
                            {/* Display the current step number */}
                            <div className="progress-number">{currentStep >= 10 ? '10+' : currentStep}</div>
                            {/* Range Slider */}
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
