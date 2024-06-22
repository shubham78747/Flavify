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
    const { quickBites, menu } = useSelector((state) => state.food);
    useEffect(() => {
        dispatch(fetchQuickBites());
        dispatch(fetchMenu());
    }, [dispatch]);

    const { table } = useSelector((state) => state?.table);
    const [show, setShow] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [tablenom, setTableNom] = useState();
    const [activeCategory, setActiveCategory] = useState('V');
    const [selectedOption, setSelectedOption] = useState('V');
    const [selectedFilter, setSelectedFilter] = useState('');
    console.log(selectedFilter)

    useEffect(() => {
        const filtermenu = quickBites.filter((item) => item.diet === selectedOption);
        setSelectedFilter(filtermenu)
    }, [selectedOption, quickBites]);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        console.log(tables[0].table_id,)
        setTableNom(tables[0].table_id)
        setShow(true)
    };

    const senddata = async () => {
        try {
            const header = {
                order_id: table?.response?.order_id,
                pax: currentStep,
                diet: activeCategory,
            }
            const response = await postcustomerpreference(header)
            if (response?.data) {
                setTableNom();
                handleClose();
            }
            console.log('Response from server:', response.data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };
    // Handler to set the active category
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
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
    const maxStep = Math.min(steps, 10);
    return (
        <>
            <section>
                <div className="container">
                    <div className="tabledetail">
                        <TableHeaderTitle titleicon="/Images/table.svg" title="Table Number : 5" className="d-flex" profileimg="/Images/profile.svg" link="#" handleShow={handleShow}></TableHeaderTitle>
                        <Search
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption} />
                        <QuickBites menu={menu} quickBites={!selectedOption ? quickBites : selectedFilter} />
                        <OfferBanner />
                        <Combos />
                        <MobileBar />
                    </div>
                </div>
            </section>
            <Modal show={show} onHide={handleClose} className='automodal'>
                <Modal.Header closeButton></Modal.Header>
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
                        </div >
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
                    </div >
                </Modal.Body >
            </Modal >


        </>
    );
}

export default HomePage;
