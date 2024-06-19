import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './MenuPage.css';
import TableHeaderTitle from '../../Component/MenuPageComponent/TableTitle/TableHeaderTitle';
import Search from '../../Component/MenuPageComponent/Search/Search';
import QuickBites from '../../Component/MenuPageComponent/QuickBites/QuickBites';
import Combos from '../../Component/MenuPageComponent/Combos/Combos';
import { Image, Modal } from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';
import MobileBar from '../../Component/CommonComponent/MobileBar/MobileBar';
import ItemDetails from '../../Component/MenuPageComponent/ItemDetails/ItemDetails';



function MenuPage() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [activeCategory, setActiveCategory] = useState('veg');

    // Handler to set the active category
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            handleShow();
        }, 5000); // 5 seconds

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, []);
    const [currentStep, setCurrentStep] = useState(1);

    // List of dummy people for selection (you can replace this with actual data)

    return (
        <>
            <section>
                <div className="container">
                    <div className="tabledetail">
                        <TableHeaderTitle titleicon="/Images/table.svg" title="Table Number : 5" className="d-flex" profileimg="/Images/profile.svg" link="#"></TableHeaderTitle>
                        <Search />
                        <QuickBites />
                        <ItemDetails />
                        {/* <Combos /> */}
                        <MobileBar />
                        {/* <div className="cartitem">
                            <Link className='cart'>
                                <Image src='Images/cart.svg'></Image>
                            </Link>
                        </div> */}
                    </div>
                </div>
            </section>


        </>
    );
}

export default MenuPage;
