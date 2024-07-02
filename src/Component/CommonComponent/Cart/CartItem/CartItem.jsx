import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CartItem.css';
import { Accordion, Image } from 'react-bootstrap';
import PastOrder from './PastOrder';
import { placeorder,Updateplaceorder } from '../action/action';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CartModal from './CartModal/CartModal';
import { useChannel } from 'ably/react';
import { addItemToCart, setAllPastOrders } from '../../../../Pages/CartPage/Cartslice/Cartslice';

function CartItem() {
    const navigate = useNavigate();
    const {menu} = useSelector((state)=>state?.food);
    const { table } = useSelector((state) => state?.table);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); 
    const [show, setShow] = useState(false); 
    const handleClose = () => {setShow(false);}
    const [itemdata,setItemdata] = useState([]);
    const dispatch = useDispatch()
    const { pastOrdersList, cartItemsList } = useSelector(state => state.cart)
    
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
        dispatch(addItemToCart([]))
        localStorage.setItem('cartItems', JSON.stringify([]))
        console.log("called till end ")
    });

    console.log({ cartItems })

    useEffect(() => {
        // if (cartItemsList) {
            setCartItems(cartItemsList);
            calculateTotalPrice(cartItemsList);
        // }
    }, [cartItemsList]);

    useEffect(() => {
        calculateTotalPrice(cartItems);
    }, [cartItems]);

    const updateCartItemsInLocalStorage = (updatedCartItems) => {
        dispatch(addItemToCart(updatedCartItems))
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        // setCartItems(updatedCartItems);
    };

    const addquantity = (item) => {
        const updatedCartItems = cartItems.map(cartItem => 
            cartItem.item_name === item.item_name ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        );
        updateCartItemsInLocalStorage(updatedCartItems);
    };

    const removequantity = (item) => {
        const updatedCartItems = cartItems.map(cartItem => 
            cartItem.item_name === item.item_name ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem
        ).filter(cartItem => cartItem.qty > 0);
        updateCartItemsInLocalStorage(updatedCartItems);
    };

    const calculateTotalPrice = (items) => {
        if (Array.isArray(items) && items.length > 0) {
            const total = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
            setTotalPrice(total);
        } else {
            setTotalPrice(0); 
        }
    };
    
            const handleCartItem = async() =>{
                console.log({ table })
                if(cartItems && cartItems.length > 0){
                    try {
                        const checkOrder = JSON.parse(localStorage.getItem('custorder'));
                        const header = {
                            table_id: table?.table_id,
                            order_id: table?.order_id,
                            items: cartItems,  
                        }
                        const updatedata = {
                            order_id: table?.order_id,
                            items: cartItems,
                        }
                        if(checkOrder?.order){
                            const response = await Updateplaceorder(updatedata)
                            console.log(response.data)
                            if(response?.data){
                                navigate('/success')
                                setCartItems()
                                setTotalPrice()
                            }
                            toast.success("Order Updated successfully!");
                        }else{
                            const response = await placeorder(header)
                            if(response?.data){
                                navigate('/success')
                                setCartItems()
                                setTotalPrice()

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

        // const handleplaceorder = async() =>{
        //     try {
        //         const header = {
        //             table_id: table?.table_id,
        //             order_id: table?.order_id,
        //             items: cartItems,  
        //         }
        //         localStorage.setItem('placeorder',JSON.stringify(header))
        //         setCartItems([])
        //         localStorage.removeItem('cartItems');
        //     } catch (error) {
        //         console.error('Error sending data:', error);
        //     }
        // }

        const handleQuickbiteClick = (quickbite) => {
            setShow(true);
            const itemOptions = Array.isArray(menu.itemOptions) ? menu.itemOptions : [];
            const itemAddOns = Array.isArray(menu.itemAddOns) ? menu.itemAddOns : [];
            const optionsGrouped = Object.values(itemOptions
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
            const addOnsGrouped = Object.values(itemAddOns
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
            setItemdata(data);
            // setRelatedOptions(data);
            // setRelatedAddOns(addOns);
        };

    return (
        <>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Order summary</Accordion.Header>
                    <Accordion.Body>
                        <ul>
                        {cartItems?.length > 0 && cartItems?.map((item,index)=>(
                            <li key={index}>
                                <div className="itemmaindetail" onClick={() => handleQuickbiteClick(item)}>
                                    <span>
                                        <Image src='Images/makhniimg.png'></Image>
                                    </span>
                                    <div className="itemsubdetail">
                                        <Link to=""><Image src='Images/veg.svg'></Image>{item?.item_name}</Link>
                                        <span>₹{item.price}</span>
                                    </div>
                                </div>
                                <div className="itemaddremove">
                                    <div className="addremove">
                                        <Link to="#" onClick={() => removequantity(item)}>-</Link>
                                        <span>{item.qty}</span>
                                        <Link to="#" onClick={() => addquantity(item)}>+</Link>
                                    </div>
                                    <p>₹{item.price * item.qty}</p>
                                    {/* <p>₹{item.price}</p> */}
                                </div>
                            </li>
                        ))}
                           
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {/* <YouMayAlsoLike /> */}
            <PastOrder />
            <Link className='btn-green placeorder' onClick={handleCartItem}>{!JSON.parse(localStorage.getItem('custorder'))?.order ? 'Place order' : 'Update Order'} - <span> ₹{totalPrice && totalPrice?.toFixed(2)}</span></Link>
            <CartModal show={show} onHide={handleClose} item={itemdata} setCartItems={setCartItems}/>
        </>
    );
}

export default CartItem;
