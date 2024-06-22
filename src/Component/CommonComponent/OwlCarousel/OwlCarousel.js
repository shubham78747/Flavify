import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import { Image } from 'react-bootstrap';
// import './Carousel.css'; 

const Carousel = ({ items, handleQuickbiteClick }) => {
  const options = {
    margin: 0,
    responsiveClass: true,
    nav: false,
    dots: false,
    smartSpeed: 500,
    autoplay: true,
    loop: true,
    items: 4.3,
  };
  return (
    <>
        <OwlCarousel className="owl-theme mb-3" {...options}>
          {items.length > 0 && items?.map((item, index) => (
            <div className="item" key={index}>
              <div className="dishname">
                <span onClick={() => handleQuickbiteClick(item)}>
                  <Image src='Images/healthy.png' />
                </span>
                <h4>{item?.item_name}</h4>
              </div>
            </div>
          ))}
        </OwlCarousel>
    </>
  );
};

export default Carousel;
