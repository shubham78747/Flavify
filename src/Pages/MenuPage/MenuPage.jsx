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
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu, fetchQuickBites } from '../../Component/HomePageComponent/QuickBites/QuickBiteSlice/QuickBiteSlice';

function MenuPage() {
    const dispatch = useDispatch();
  const { menu,categories  } = useSelector((state) => state.food);

  useEffect(() => {
    dispatch(fetchQuickBites());
    dispatch(fetchMenu());
  }, [dispatch]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [activeCategory, setActiveCategory] = useState('veg');

    // Handler to set the active category
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };
    useEffect(() => {
        if (Object.keys(categories).length > 0) {
          const defaultCategory = Object.keys(categories)[0];
          handleQuickbiteClick(defaultCategory);
        }
      }, [categories]);

    const [currentStep, setCurrentStep] = useState(1);

    // List of dummy people for selection (you can replace this with actual data)
    const [menuItem, setMenuItem] = useState([]);
    const handleQuickbiteClick = (category) =>{
        const data = menu.items.filter(item => item.item_category === category);
        const updatedData = {
            items: data,
            selected_category: category
          };
        setMenuItem(updatedData);
    }

    return (
        <>
            <section>
                <div className="container">
                    <div className="tabledetail">
                        <TableHeaderTitle titleicon="/Images/table.svg" title="Table Number : 5" className="d-flex" profileimg="/Images/profile.svg" link="#"></TableHeaderTitle>
                        <Search />
                        <QuickBites items={Object.keys(categories)} handleQuickbiteClick={handleQuickbiteClick}/>
                        <ItemDetails  items={menuItem.items} selectedCategory={menuItem.selected_category}/>
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
