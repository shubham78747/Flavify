import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TableTitle.css';
import { Image } from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchtable } from '../../../Pages/HomePage/Tableslice/Tableslice';
import { fetchMenu, fetchQuickBites } from '../../HomePageComponent/QuickBites/QuickBiteSlice/QuickBiteSlice';
import { tables } from '../../../Pages/HomePage/Tablejson/Tablejson';
function TableHeaderTitle(props) {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchtable(tables[2].table_id))       
        dispatch(fetchQuickBites());
        dispatch(fetchMenu());
    }, [0]);

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
