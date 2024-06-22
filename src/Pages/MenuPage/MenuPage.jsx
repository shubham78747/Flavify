import React, { useEffect, useState } from 'react';

import './MenuPage.css';
import TableHeaderTitle from '../../Component/MenuPageComponent/TableTitle/TableHeaderTitle';
import MobileBar from '../../Component/CommonComponent/MobileBar/MobileBar';
import ItemDetails from '../../Component/MenuPageComponent/ItemDetails/ItemDetails';
import { useSelector } from 'react-redux';
import Search from '../../Component/CommonComponent/Search/Search';
import Carousel from '../../Component/CommonComponent/OwlCarousel/OwlCarousel';

function MenuPage() {
  const { menu,categories  } = useSelector((state) => state.food);
  const [selectedOption, setSelectedOption] = useState('V');
  const [cate, setSelectedFilter] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState()
    useEffect(() => {
        if (categories.length > 0) {          
          filterMenu(categories[0], selectedOption);
        }
      }, [categories]);

      useEffect(() => {
        if(selectedCategory) {
          filterMenu(selectedCategory, selectedOption)
        }
      }, [selectedOption])


    // List of dummy people for selection (you can replace this with actual data)
    const [menuItem, setMenuItem] = useState([]);
    const handleQuickbiteClick = (category) =>{
          filterMenu(category, selectedOption)
          setSelectedCategory(category)
    }

    const filterMenu = (category, option) => {
      const data = menu.items.filter(item => item.item_category === category.item_name && item.diet === option);
      const updatedData = {
          items: data,
          selected_category: category.item_name
        };
        setMenuItem(updatedData);
    }

    return (
        <>
            <section>
                <div className="container">
                    <div className="tabledetail">
                        <TableHeaderTitle titleicon="/Images/table.svg" title="Table Number : 5" className="d-flex" profileimg="/Images/profile.svg" link="#"></TableHeaderTitle>
                        <Search selectedOption={selectedOption} 
                          setSelectedOption={setSelectedOption}/>
                          <Carousel items={categories} handleQuickbiteClick={handleQuickbiteClick}/>
                        {/* <QuickBites items={Object.keys(categories)} handleQuickbiteClick={handleQuickbiteClick}/> */}
                          <ItemDetails  items={menuItem.items} selectedCategory={menuItem.selected_category}/>
                        {/* <Combos /> */}
                        <MobileBar />
                    </div>
                </div>
            </section>


        </>
    );
}

export default MenuPage;
