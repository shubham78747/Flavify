import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import TableHeaderTitle from '../../Component/HomePageComponent/TableTitle/TableHeaderTitle';
import Search from '../../Component/HomePageComponent/Search/Search';
import QuickBites from '../../Component/HomePageComponent/QuickBites/QuickBites';
import OfferBanner from '../../Component/HomePageComponent/OfferBanner/OfferBanner';
import Combos from '../../Component/HomePageComponent/Combos/Combos';
import { Image, Modal } from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';
import MobileBar from '../../Component/CommonComponent/MobileBar/MobileBar';
import { tables } from './Tablejson/Tablejson';
import { useDispatch, useSelector } from 'react-redux';
import { fetchtable } from './Tableslice/Tableslice';
import axios from 'axios';



function HomePage() {
    const dispatch = useDispatch();
    const { table } = useSelector((state) => state?.table);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [activeCategory, setActiveCategory] = useState('veg');
    const [tablenom, setTableNom] = useState(5);

    const senddata = async () => {
        try {
            const response = await axios.post('https://flavify-test-caa8d1ec1c7d.herokuapp.com/api/v1/customerpreference', {
                order_id: table?.response?.order_id,
                pax: tablenom,
                diet: activeCategory,
            });
            console.log('Response from server:', response.data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };
    // Handler to set the active category
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         handleShow();
    //     }, 5000); // 5 seconds

    //     // Cleanup the timer on component unmount
    //     return () => clearTimeout(timer);
    // }, []);
    const [currentStep, setCurrentStep] = useState(1);

    const handletable = (table_id) =>{
       dispatch(fetchtable(table_id))
    }

    // List of dummy people for selection (you can replace this with actual data)

    return (
        <>
            <section>
                <div className="container">
                    <div className="tabledetail">
                        <TableHeaderTitle titleicon="/Images/table.svg" title="Table Number : 5" className="d-flex" profileimg="/Images/profile.svg" link="#" handleShow={handleShow}></TableHeaderTitle>
                        <Search />
                        <QuickBites />
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
                            <div className="progress-number">{currentStep}</div>

                            {/* Progress bar */}
                            <div className="progress-bar">
                                <div className="progress-line">
                                {tables.map((tableItem, index) => (
                                        <div
                                            key={index}
                                            className={`progress-circle ${index + 1 <= currentStep ? 'active' : ''}`}
                                            onClick={() => handletable(tableItem.table_id)}
                                        ></div>
                                    ))}
                                </div>
                            </div>


                        </div>
                        <ul className='selectcategories'>
                            <li className={activeCategory === 'veg' ? 'active' : ''}>
                                <Link href="#" onClick={() => handleCategoryClick('V')}>
                                    <span><Image src='/Images/veg.svg' alt="Veg" /></span>
                                    Veg
                                </Link>
                            </li>
                            <li className={activeCategory === 'nonveg' ? 'active' : ''}>
                                <Link href="#" onClick={() => handleCategoryClick('N')}>
                                    <span><Image src='/Images/nonveg.svg' alt="Non-Veg" /></span>
                                    Non-Veg
                                </Link>
                            </li>
                            <li className={activeCategory === 'egg' ? 'active' : ''}>
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
