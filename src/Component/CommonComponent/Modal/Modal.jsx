    import { Icon } from '@iconify/react/dist/iconify.js'
    import React from 'react'
    import { Image } from 'react-bootstrap'
    import Modal from 'react-bootstrap/Modal';
    import { Link } from 'react-router-dom';
    function Modals({ isFilled, count, calculateTotalPrice, item, show, onHide, handleAddClick, handleRemoveClick, handleVegCheckboxChange, handleCheckboxChange, handleIconClick }) {
    return (
        <>
            <Modal show={show} onHide={onHide} className="singleitem">
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="guestselectmodalmain pt-0">
                            <ul className='saladimgs'>
                                <li className='w-100'><Image src='Images/selectedvarient.png'></Image></li>

                            </ul>
                            <div className="ratingmain">
                                <ul className='rating'>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                </ul>
                                <span><Image src='Images/veg.svg'></Image></span>
                            </div>
                            <div className="itemtitle">
                                <h3>{item.name} <span onClick={handleIconClick} style={{ cursor: 'pointer' }}>{isFilled ? (
                                    <Icon icon="ph:heart-fill" width="24px" height="24px" style={{ color: 'red' }} />
                                ) : (
                                    <Icon icon="ph:heart" width="24px" height="24px" style={{ color: 'black' }} />
                                )}</span></h3>
                                <p>Lebanese Fateh Salad is a traditional Middle Eastern dish made with layers of toasted pita bread, chickpeas, and a creamy yogurt-tahini sauce. It's topped with pine nuts, fresh herbs like parsley and mint, and often drizzled with olive oil.</p>
                            </div>
                            <div className="select-variant-container">
                                <div className="selectvariant">
                                    <div className="selectvarianttitle">
                                        {/* <h3>Select add-on’s</h3> */}
                                    </div>
                                    <ul className='selectvariantGroup'>
                                        {item && item.addOnsGrouped && item.addOnsGrouped.length > 0 ? (
                                            item.addOnsGrouped.map((group, index) => (
                                                <li key={`addon-group-${index}`}>
                                                    <h3>{group.groupName}</h3>
                                                    <ul className='selectvariantmain'>
                                                        {group.itemList.map((addon, addonIndex) => (
                                                            <li key={`addon-${addonIndex}`}>
                                                                <h5>{addon.addon_name}</h5>
                                                                <label className="custom-checkbox" htmlFor={`selectaddonoption${addonIndex}`}>
                                                                    <span className="checkbox-label">₹{addon.price}</span>
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`selectaddonoption${addonIndex}`}
                                                                        onChange={(e) => handleCheckboxChange(e, addon.price)}
                                                                    />
                                                                    <span className="checkbox-indicator"></span>
                                                                </label>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ))
                                        ) : (
                                            <li>No add-on items found.</li>
                                        )}
                                    </ul>
                                </div>
                                    <div className="selectvariant">
                                        <div className="selectvarianttitle">
                                            {/* <h3>Select add-on’s</h3> */}
                                        </div>
                                        <ul className='selectvariantGroup'>
                                            {item && item.optionsGrouped && item.optionsGrouped.length > 0 ? (
                                                item.optionsGrouped.map((group, index) => (
                                                    <li key={`addon-option-${index}`}>
                                                        <h3>{group.groupName}</h3>
                                                        <ul className='selectvariantmain'>
                                                            {group.itemList.map((addon, addonIndex) => (
                                                                <li key={`addon-${addonIndex}`}>
                                                                    <h5>{addon.option_name}</h5>
                                                                    <label className="custom-checkbox" htmlFor={`selectaddonoptionMeat${addonIndex}`}>
                                                                        <span className="checkbox-label">₹{addon.price}</span>
                                                                        <input
                                                                            type="checkbox"
                                                                            id={`selectaddonoptionMeat${addonIndex}`}
                                                                            onChange={(e) => handleVegCheckboxChange(e, addon.price)}
                                                                        />
                                                                        <span className="checkbox-indicator"></span>
                                                                    </label>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                ))
                                            ) : (
                                                <li>No add-on items found.</li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="additem">
                                    <div className="addremoveitem" style={{ display: 'flex', alignItems: 'center' }}>
                                        <span 
                                            onClick={item ? handleRemoveClick : null} 
                                            style={{ cursor: item ? 'pointer' : 'not-allowed', opacity: item ? 1 : 0.5 }}>
                                            <Icon icon="ri:subtract-fill" width="24px" height="24px" />
                                        </span>
                                        <h5 style={{ margin: '0 10px' }}>{count}</h5>
                                        <span 
                                            onClick={item ? handleAddClick : null} 
                                            style={{ cursor: item ? 'pointer' : 'not-allowed', opacity: item ? 1 : 0.5 }}>
                                            <Icon icon="ic:round-plus" width="24px" height="24px" />
                                        </span>
                                    </div>
                                    <Link className='btngreen continue'>
                                        Add Item - ₹{calculateTotalPrice()}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
        </>
    )
    }

    export default Modals