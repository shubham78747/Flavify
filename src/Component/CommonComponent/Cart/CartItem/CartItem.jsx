import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CartItem.css';
import { Accordion, Image } from 'react-bootstrap';
import PastOrder from './PastOrder';
import { placeorder,Updateplaceorder } from '../action/action';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CartModal from './CartModal/CartModal';
import { addItemToCart } from '../../../../Pages/CartPage/Cartslice/Cartslice';
import ComboModal from './ComboModal/ComboModal';
import YouMayAlsoLike from './YouMayAlsoLike';
import { getGroupedOptionsAndAddOns } from '../../../../Helper/Coman';

function CartItem() {
    const navigate = useNavigate();
    const {menu} = useSelector((state)=>state?.food);
    const { table } = useSelector((state) => state?.table);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); 
    const [show, setShow] = useState(false);
    const [showCombo, setShowCombo] = useState(false); 
    const handleClose = () => {setShow(false);}
    const handleCloseCombo = () => {setShowCombo(false);}
    const [itemdata,setItemdata] = useState([]);
    const [comboitemdata,setComboItemdata] = useState([]);
    const dispatch = useDispatch()
    const { pastOrdersList, cartItemsList } = useSelector(state => state.cart)
    useEffect(() => {
            setCartItems(cartItemsList);
            calculateTotalPrice(cartItemsList);
    }, [cartItemsList]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cartItems'))
        dispatch(addItemToCart(cart))
    }, [0]);

    useEffect(() => {
        calculateTotalPrice(cartItems);
    }, [cartItems]);

    const updateCartItemsInLocalStorage = (updatedCartItems) => {
        dispatch(addItemToCart(updatedCartItems))
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const addquantity = (index) => {
        const updatedCartItems = cartItems.map((cartItem, idx) =>
            idx === index ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        );
        updateCartItemsInLocalStorage(updatedCartItems);
    };
    
    const removequantity = (index) => {
        const updatedCartItems = cartItems.map((cartItem, idx) =>
            idx === index ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem
        ).filter(cartItem => cartItem.qty > 0);
        updateCartItemsInLocalStorage(updatedCartItems);
    };

    const calculateTotalPrice = (items) => {
        if (Array.isArray(items) && items.length > 0) {
            const total = items.reduce((itemAcc, subItem) => itemAcc + (subItem.price * subItem.qty), 0)
            setTotalPrice(total);
        } else {
            setTotalPrice(0); 
        }
    };
    
        const handleCartItem = async() =>{
            if(cartItems && cartItems.length > 0){
                try {
                    let tempCart = [...cartItems]
                    const checkOrder = JSON.parse(localStorage.getItem('custorder'));
                    let changedCartJson = tempCart?.map(item => {
                        let tempItem =  {...item}
                        // if(['LandingPage', 'Menu'].includes(item.combo)) {
                        //     tempItem.price = calculateItemPrice(item, 'combo')
                        //     console.log(calculateItemPrice(item, 'combo'))
                        // } else {
                        //     tempItem.price = calculateItemPrice(item, '')
                        // }

                        tempItem.items = tempItem.items?.map(i => {
                            let tempi = {...i}
                            tempi.options = Object.values(tempi.options)?.map(option => ({
                                option_id: option.option_id,
                                price: option.price
                            }))                
                            return tempi
                        })
                        console.log({tempItem})
                        return tempItem
                    })
                    const header = {
                        table_id: table?.table_id,
                        order_id: table?.order_id,
                        items: changedCartJson,  
                    }
                    const updatedata = {
                        order_id: table?.order_id,
                        items: changedCartJson,
                    }
                    console.log({header,updatedata,changedCartJson})
                    if(checkOrder?.order){
                        const response = await Updateplaceorder(updatedata)                         
                        if(response?.data){
                            navigate('/success')
                            setCartItems([])
                            setTotalPrice(0)
                        }
                        toast.success("Order Updated successfully!");
                    }else{
                        const response = await placeorder(header)
                        if(response?.data){
                            navigate('/success')
                            setCartItems([])
                            setTotalPrice(0)

                            localStorage.setItem('custorder',JSON.stringify({order:true}))
                        }
                    }   
                    toast.success("Order placed successfully!");             
                } catch (error) {
                    console.error('Error sending data:', error);
                }
            }else{
                toast.warning("Please add an item");
            }
        }

        const handleQuickbiteClick = (quickbite) => {
            const { groupedOptions, groupedAddOns } = getGroupedOptionsAndAddOns(menu, quickbite.item_id);
            const data = {
                item_id: quickbite.item_id,
                price: quickbite.price,
                item_name: quickbite.item_name,
                addOnsGrouped: groupedAddOns,
                optionsGrouped:  groupedOptions,
            }
            setItemdata(data);
            setShow(true);
        };  

        const handleComboClick = (quickbite) => {
            let itemsdata = []
            quickbite.items.map(ele => {
                const { add_ons, options, ...rest} = ele
                const { groupedOptions, groupedAddOns } = getGroupedOptionsAndAddOns(menu, ele.item_id);
                rest.addOnsGrouped = groupedAddOns;
                rest.optionsGrouped =  groupedOptions;
                itemsdata.push(rest)
            })
            const data = {
                price: quickbite.price,
                qty: quickbite.qty,
                items: itemsdata,
                discount: quickbite.discount,
            }
            setComboItemdata(data);
            setShowCombo(true)
        };

        const calculateItemPrice = (cartItem, type) => {
                let totalOptionPrice = 0;
                let totalAddonsPrice = 0;
                const basePrice = {...cartItem};
    
                basePrice.items?.forEach(item => {
                    item.add_ons.forEach(option => {
                        totalAddonsPrice += option.price;
                    });
                });
    
                basePrice.items?.forEach(item => {
                    Object.values(item.options).forEach(option => {
                        totalOptionPrice += option.price;
                    });
                });
                let totalPrice = 0
                console.log({ basePrice, totalAddonsPrice, totalOptionPrice })
                if(type === 'combo') {
                    totalPrice = ((basePrice.price + totalAddonsPrice + totalOptionPrice) - cartItem?.discount) * cartItem?.qty;
                    // totalPrice = (basePrice.price + totalAddonsPrice + totalOptionPrice) * cartItem?.qty;
                } else {
                    totalPrice = (basePrice.price + totalAddonsPrice + totalOptionPrice) * cartItem?.qty;
                }
                console.log(totalPrice)
                return totalPrice; 
        }

        const calculateCartTotal = (cart) => {
            let totalCartPrice = 0
            cart?.forEach(item => {
                if(['LandingPage', 'Menu'].includes(item.combo)) {
                    totalCartPrice += calculateItemPrice(item, 'combo')
                } else {
                    totalCartPrice += calculateItemPrice(item, '')
                }
            })
            return totalCartPrice
        }

    return (
        <>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Order summary</Accordion.Header>
                    <Accordion.Body>
                        <ul>
                        {cartItems?.length > 0 && cartItems?.map((item,index)=> item.combo === 'None' || item.combo === 'Checkout' ? (
                            <li key={index}>                                                      
                                <div className="itemmaindetail" onClick={() => handleQuickbiteClick(item)}> 
                                    <span>
                                        <Image src='Images/makhniimg.png'></Image>
                                    </span>
                                    <div className="itemsubdetail">
                                        <Link to=""><Image src='Images/veg.svg'></Image>{item?.item_name}</Link>
                                        <span>₹{item?.price}</span>
                                    </div>
                                </div>
                                <div className="itemaddremove">
                                    <div className="addremove">
                                        <Link to="#" onClick={() => removequantity(index)}>-</Link>
                                        <span>{item.qty}</span>
                                        <Link to="#" onClick={() => addquantity(index)}>+</Link>
                                    </div>
                                    {/* <p>₹{item?.price * item.qty}</p> */}
                                    <p>{calculateItemPrice(item, '')}</p>
                                    {/* <p>₹{item.price}</p> */}
                                </div>
                            </li>
                        ) : 
                        <li className='comboBox' >
                            <ul onClick={() => handleComboClick(item)}>
                                {item?.items?.map((i, ix) => (
                                    <li key={ix}>                                  
                                        <div className="itemmaindetail">
                                            <span>
                                                <Image src='Images/makhniimg.png'></Image>
                                            </span>
                                            <div className="itemsubdetail">
                                                <Link to=""><Image src='Images/veg.svg'></Image>{i?.item_name}</Link>
                                                <span>₹{i.price}</span>
                                            </div>
                                        </div>
                                    </li>   
                                ))}
                            </ul>
                            <div className="itemaddremove">
                                <div className="addremove">
                                    <Link to="#" onClick={() => removequantity(index)}>-</Link>
                                    <span>{item.qty}</span>
                                    <Link to="#" onClick={() => addquantity(index)}>+</Link>
                                </div>
                                {/* <p>₹{item.price * item.qty}</p> */}
                                <p>{calculateItemPrice(item, 'combo')}</p>
                                {/* <p>₹{item.price}</p> */}
                            </div>
                        </li>
                        )}
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <YouMayAlsoLike />
            <PastOrder pastOrdersList={pastOrdersList}/>
            <Link className='btn-green placeorder' onClick={handleCartItem}>{!JSON.parse(localStorage.getItem('custorder'))?.order ? 'Place order' : 'Update Order'} - <span>{calculateCartTotal(cartItems)}</span></Link>
            <CartModal show={show} onHide={handleClose} item={itemdata} setCartItems={setCartItems}/>
            <ComboModal show={showCombo} onHide={handleCloseCombo} item={comboitemdata} setCartItems={setCartItems}/>
        </>
    );
}

export default CartItem;
