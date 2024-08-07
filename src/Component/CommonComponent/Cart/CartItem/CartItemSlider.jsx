import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CartItem.css';
import { Image } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';
import { useSelector } from 'react-redux';
import predictCheckout from '../../../../Helper/checkout';
import Modals from '../../Modal/Modal';
import { addOnsGroupeds, getGroupedOptionsAndAddOns, optionsGroupeds } from '../../../../Helper/Coman';

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
    const { customerPref } = useSelector((state) => state?.table);
    const { pastOrdersList, cartItemsList } = useSelector(state => state.cart)

    const [productsList, setProductsList] = useState([])
    const [item,setItem] = useState([]);
    const [isFilled, setIsFilled] = useState(false);
    const [show, setShow] = useState(false);
    const [flag, setFlag] = useState(null);

    const filterAllItemsFromCart = (data) => {
      const cartItemsForSimiller = [];
      const itemSet = new Set();
      if (menu && menu?.items) {
        data.map((element) => {
          element.items?.map((ele) => {
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
          customerPref?.pax,
          cartItemsForSimiller,
          customerPref?.diet
        );
        const predictedItems = youMayLike.map((ele) => {
          const item = menu.items.find((i) => i.item_id === ele);
          return item;
        });
        setProductsList(predictedItems);
      }
    };
    useEffect(() => {
      let data = []
      if(pastOrdersList?.length > 0) {
        data = [...data, ...pastOrdersList]
      } 
      if(cartItemsList?.length > 0) {
        data = [...data, ...cartItemsList]
      }
      filterAllItemsFromCart(data)
    }, [pastOrdersList, cartItemsList, menu, customerPref])

    const handleClose = () => setShow(false);
       const handleCardSlide = (quickbite) => {
        setFlag('Likespage');
        const { groupedOptions, groupedAddOns } = getGroupedOptionsAndAddOns(menu, quickbite.item_id);
        const data = {
            item_id: quickbite.item_id,
            price: quickbite.price,
            item_name: quickbite.item_name,
            addOnsGrouped: groupedAddOns,
            optionsGrouped:  groupedOptions,
        }
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
                                <li ><Image src={ele?.url ? ele?.url : 'Images/manchurianimg.png'}></Image></li>
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
