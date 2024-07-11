import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TableTitle.css';
import { Image } from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchtable } from '../../../Pages/HomePage/Tableslice/Tableslice';
import { fetchMenu, fetchQuickBites } from '../../HomePageComponent/QuickBites/QuickBiteSlice/QuickBiteSlice';
import { tables } from '../../../Pages/HomePage/Tablejson/Tablejson';
import { useChannel } from 'ably/react';
import { addItemToCart, setAllPastOrders } from '../../../Pages/CartPage/Cartslice/Cartslice';
function TableHeaderTitle(props) {
    const dispatch = useDispatch();
    const { cartItemsList, pastOrdersList  } = useSelector((state) => state.cart);
    const { table } = useSelector((state) => state?.table);
    useEffect(() => {
        dispatch(fetchtable(tables[2].table_id))       
        dispatch(fetchQuickBites());
        dispatch(fetchMenu());
    }, [0]);

    const { channel } = useChannel('punched_sub_order', (message) => {
      const response = JSON.parse(message.data)
      let pastOrders = []
      
      const data = {
          is_punched: true,
          items: cartItemsList,
          sub_order_id: response.sub_order_id
      }
      pastOrders = [...pastOrdersList, data]
      dispatch(setAllPastOrders(pastOrders))
      dispatch(addItemToCart([]))

      localStorage.setItem('cartItems', JSON.stringify([]))
  });
  useEffect(() => {
      if (table && !table?.fresh_order) {
          let pastOrder = [];
          if (table?.order_info && Array.isArray(table.order_info)) {
              for (const order of table.order_info) {
                  if (order?.is_punched) {
                      pastOrder.push(order);
                  }
              }
          }
          dispatch(setAllPastOrders(pastOrder));
      }
  }, [table]);


    const location = useLocation()
    const { pathname } = location;
    return (
        <div className={`maintitle ${props.className}`}>
          {pathname === '/cart' ? (
        <Link to={'/menu'}>
          <Icon icon="ion:chevron-back" />
        </Link>
      ) : pathname === '/menu' ? (
        <h1 className='table-number'>
          <Image src={props.titleicon} />
          {props.title}
        </h1>
      ) : pathname === '/' ? (
        <h1 className='table-number' onClick={props.handleShow}>
          <Image src={props.titleicon} />
          {props.title}
        </h1>
      ) : (
        <h1 className='table-number'>
          <Image src={props.titleicon} />
          {props.title}
        </h1>
      )}
            <Link to={props.link}><Image src={props.profileimg} ></Image></Link>
        </div>
    );
}
export default TableHeaderTitle;
