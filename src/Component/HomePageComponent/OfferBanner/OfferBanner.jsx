import React from 'react';
import { Link } from 'react-router-dom';

import './OfferBanner.css';
import { Image } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';
import { Icon } from '@iconify/react/dist/iconify.js';



function OfferBanner() {
    const options = {
        margin: 0,
        responsiveClass: true,
        nav: false,
        dots: true,
        smartSpeed: 500,
        autoplay: true,
        loop: true,
        items: 1,

    };
    return (
        <div className="offerbanner mb-5">
            <OwlCarousel className="owl-theme" {...options}>
                <div className="item">
                    <div className="offerbannerdetail">
                        <span>Every thursday</span>
                        <h3>1+1 ON <br /> DRINKS </h3>
                        <p>only for ladies</p>
                        <Link to="#">View offers <Icon icon="teenyicons:right-small-outline" width="16px" height="16px" /></Link>
                        <i><Image src='Images/drinkgirl.png'></Image></i>
                    </div>
                </div>
                <div className="item">
                    <div className="offerbannerdetail">
                        <span>Every thursday</span>
                        <h3>1+1 ON <br /> DRINKS </h3>
                        <p>only for ladies</p>
                        <Link to="#">View offers <Icon icon="teenyicons:right-small-outline" width="16px" height="16px" /></Link>
                        <i><Image src='Images/drinkgirl2.png'></Image></i>
                    </div>
                </div>
                <div className="item">
                    <div className="offerbannerdetail">
                        <span>Every thursday</span>
                        <h3>1+1 ON <br /> DRINKS </h3>
                        <p>only for ladies</p>
                        <Link to="#">View offers <Icon icon="teenyicons:right-small-outline" width="16px" height="16px" /></Link>
                        <i><Image src='Images/drinkgirl3.png'></Image></i>
                    </div>
                </div>
                <div className="item">
                    <div className="offerbannerdetail">
                        <span>Every thursday</span>
                        <h3>1+1 ON <br /> DRINKS </h3>
                        <p>only for ladies</p>
                        <Link to="#">View offers <Icon icon="teenyicons:right-small-outline" width="16px" height="16px" /></Link>
                        <i><Image src='Images/drinkgirl4.png'></Image></i>
                    </div>
                </div>

            </OwlCarousel>

        </div>
    );
}

export default OfferBanner;
