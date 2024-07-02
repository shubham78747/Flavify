import React, { useEffect, useState } from 'react';
import './MenuPage.css';
import TableHeaderTitle from '../../Component/MenuPageComponent/TableTitle/TableHeaderTitle';
import MobileBar from '../../Component/CommonComponent/MobileBar/MobileBar';
import ItemDetails from '../../Component/MenuPageComponent/ItemDetails/ItemDetails';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../Component/CommonComponent/Search/Search';
import Carousel from '../../Component/CommonComponent/OwlCarousel/OwlCarousel';
import { useChannel } from 'ably/react';
import { setAllPastOrders } from '../CartPage/Cartslice/Cartslice';

function MenuPage() {
  const getitemdata = JSON.parse(localStorage.getItem('category'));
  const { menu, categories } = useSelector((state) => state.food);
  const [activePref, setActivePref] = useState(getitemdata?.diet || 'V');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState([]);
  const {pastOrdersList, cartItemsList} = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const { channel } = useChannel('punched_sub_order', (message) => {
      const response = JSON.parse(message.data)
      let pastOrders = []
      console.log({ cartItemsList, pastOrdersList })
      
      const data = {
          is_punched: true,
          items: cartItemsList,
          sub_order_id: response.sub_order_id
      }
      console.log({ pastOrders, data })
      pastOrders = [...pastOrdersList, data]
      console.log({ pastOrders, data })
      dispatch(setAllPastOrders(pastOrders))
      localStorage.setItem('cartItemsList', JSON.stringify([]))     
      console.log("called till end ")
  });
  // useEffect(() => {
  //   if (categories.length > 0) {
  //     filterMenu(categories[0]);
  //   }
  // }, [categories]);

  useEffect(() => {
    if (selectedCategory && activePref) {
      filterMenu(selectedCategory, activePref);
    }
  }, [selectedCategory, activePref]);

  useEffect(() => {
    const getitemdata = JSON.parse(localStorage.getItem('category'));
    setActivePref(getitemdata?.diet)
  }, [0]);

  // State to hold filtered menu items
  // useEffect(() => {
  //   if(menu?.items?.length > 0) {
  //     setFilteredItems(menu.items);
  //   }
  // }, [menu.items]);

  const handleQuickbiteClick = (category) => {
    setSelectedCategory(category);
    filterMenu(category, activePref)
  };

  const filterMenu = (category, preference) => {
      const data = menu?.items?.filter(item => { 
       if(category !== 'All') {
          if(item.item_category === category.item_name && item.diet === preference) {
            return item;
          }
        } else {
          if(item.diet === preference) {
            return item;
          }
        }
      })
      setFilteredItems(data);
  };

  const handleCategoryClick = (pref) => {
    console.log(pref)
    if (activePref !== pref) {
      filterMenu(selectedCategory, pref)
      setActivePref(pref);
    }
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value ? event.target.value.toLowerCase() : '';
    const filteredData = menu.items.filter(item =>{
      if(selectedCategory !== 'All') {
        if(item.item_category === selectedCategory.item_name && item.diet === activePref && (item.item_name && item.item_name.toLowerCase().includes(searchTerm)) ||
        (item.item_description && item.item_description.toLowerCase().includes(searchTerm))) {
          return item;
        }
      } else {
        if(item.diet === activePref && (item.item_name && item.item_name.toLowerCase().includes(searchTerm)) ||
        (item.item_description && item.item_description.toLowerCase().includes(searchTerm))) {
          return item;
        }
      }
      (item.item_name && item.item_name.toLowerCase().includes(searchTerm)) ||
      (item.item_description && item.item_description.toLowerCase().includes(searchTerm))
    }
    );
    setFilteredItems(filteredData);
  };  

  return (
    <>
      <section>
        <div className="container">
          <div className="tabledetail">
            <TableHeaderTitle titleicon="/Images/table.svg" title="Table Number : 5" className="d-flex" profileimg="/Images/profile.svg" link="#"></TableHeaderTitle>
            <Search
              selectedOption={activePref}
              setSelectedOption={setActivePref}
              handleCategoryClick={handleCategoryClick}
              handleSearchchnage={handleSearchChange}
            />
            <Carousel items={categories} handleQuickbiteClick={handleQuickbiteClick} />
            {/* {activePref && !selectedCategory && <ItemDetails items={menu.items} />} */}
            <ItemDetails items={filteredItems} selectedCategory={selectedCategory} />
            {/* {itemsToDisplay && <ItemDetails items={itemsToDisplay} />} */}
            
            {/* <Combos /> */}
            <MobileBar />
          </div>
        </div>
      </section>
    </>
  );
}

export default MenuPage;
