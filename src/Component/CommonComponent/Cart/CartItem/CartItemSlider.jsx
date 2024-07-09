import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CartItem.css';
import { Image } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';
import { useSelector } from 'react-redux';
import predictCheckout from '../../../../Helper/checkout';
import Modals from '../../Modal/Modal';

function CartItemSlider() {

    const options = {
        margin: 14,
        responsiveClass: true,
        nav: false,
        dots: false,
        smartSpeed: 500,
        autoplay: true,
        loop: true,
        items: 1.3,

    };
    const {menu} = useSelector((state)=>state?.food);
    const { table } = useSelector((state) => state?.table);
    const { pastOrdersList, cartItemsList } = useSelector(state => state.cart)

    const [productsList, setProductsList] = useState([])
    const [item,setItem] = useState([]);
    const [isFilled, setIsFilled] = useState(false);
    const [show, setShow] = useState(false);
    const [flag, setFlag] = useState(null);
    console.log(productsList,cartItemsList)

    const filterAllItemsFromCart = (data) => {
      const cartItemsForSimiller = [];
      const itemSet = new Set();
      if (menu && menu?.items) {
        data.map((element) => {
          element.items.map((ele) => {
            const item = menu?.items?.find((i) => i.item_id === ele.item_id);
            if (item && !itemSet.has(item.item_id)) {
              const returmData = {
                item_id: item.item_id,
                item_subcategory: item.item_subcategory,
                qty: element.qty ? element.qty : ele.qty,
              };
              cartItemsForSimiller.push(returmData);
              itemSet.add(item.item_id);
            }
          });
        });
        const youMayLike = predictCheckout(
          menu,
          table?.pax,
          cartItemsForSimiller,
          table?.diet
        );
        const predictedItems = youMayLike.map((ele) => {
          const item = menu.items.find((i) => i.item_id === ele);
          return item;
        });
        console.log({predictedItems})
        setProductsList(predictedItems);
      }
    };
    useEffect(() => {
      if(pastOrdersList?.length > 0 || cartItemsList?.length > 0) {
        const data = [...pastOrdersList, ...cartItemsList]
        filterAllItemsFromCart(data)
      }
    }, [pastOrdersList, cartItemsList, menu])

    const handleClose = () => setShow(false);

    const handleCardSlide = (quickbite) => {
        setFlag('Likespage');
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
            item_id: quickbite.item_id,
            price: quickbite.price,
            item_name: quickbite.item_name,
            addOnsGrouped: addOnsGrouped,
            optionsGrouped: optionsGrouped,
        }
        console.log(data)
        setItem(data);
        setShow(true);
    };
   
    return (
        <div className="Combomain">
            {productsList.length > 0 && <OwlCarousel className="owl-theme mb-3" {...options}>
                {productsList.map((ele, index) => (
                    <div className="item" key={index}>
                        <div className="combodetail">
                            <ul className='saladimgs gap-1 mb-0'>
                                <li ><Image src='Images/manchurianimg.png'></Image></li>
                            </ul>
                            <div className="combosubdetail">

                                <h3>{ele.item_name}</h3>
                                <div className="comboprice d-flex">
                                    <p>₹{ele.price} </p>
                                    <Link onClick={() => handleCardSlide(ele)}>+ Add</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </OwlCarousel>}
            <Modals
                item={item}
                show={show}
                onHide={handleClose}
                handleIconClick={() => setIsFilled(!isFilled)}
                isFilled={isFilled}
                flag={flag}
                /> 
        </div>
    );
}

export default CartItemSlider;
