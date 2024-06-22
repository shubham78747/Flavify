import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Search.css';
import { Image } from 'react-bootstrap';



function Search(props) {
    const [selectedOption, setSelectedOption] = useState('veg'); // Defaulting to 'veg'

    const handleClick = (option) => {
        setSelectedOption(option);
        setIsImageShown(!isImageShown);
    };

    useEffect(() => {
        // Optionally, you can perform any side effects based on selectedOption here
        console.log(`Selected option changed to: ${selectedOption}`);
    }, [selectedOption]);
    const [isImageShown, setIsImageShown] = useState(false);

    const toggleImage = () => {
        setIsImageShown(!isImageShown);
    };

    return (
        <div className={`searchmain`}>
            <i><Image src='Images/searchicon.svg'></Image></i>
            <input type="search" placeholder='Search' />
            <div className={`image-container ${isImageShown ? 'show' : ''}`}>
                <div className={`image-option ${selectedOption === 'veg' && 'selected'}`} onClick={() => handleClick('veg')}>
                    <Image src="Images/veg.svg" alt="Veg" className="image" />
                </div>
                <div className={`image-option ${selectedOption === 'nonveg' && 'selected'}`} onClick={() => handleClick('nonveg')}>
                    <Image src="Images/nonveg.svg" alt="Non-Veg" className="image" />
                </div>
                <div className={`image-option ${selectedOption === 'egg' && 'selected'}`} onClick={() => handleClick('egg')}>
                    <Image src="Images/egg.svg" alt="Egg" className="image" />
                </div>
            </div>
            {
                selectedOption && (
                    <div className="selected-image-container" onClick={toggleImage}>
                        {/* Render larger image based on selected option */}
                        {selectedOption === 'veg' && (
                            <> <p>Veg</p> <Image src="Images/veg.svg" alt="Veg" className="selected-image" /></>
                        )}
                        {selectedOption === 'nonveg' && (
                            <> <p>Non Veg</p>  <Image src="Images/nonveg.svg" alt="Non-Veg" className="selected-image" /></>
                        )}
                        {selectedOption === 'egg' && (
                            <> <p>Egg</p> <Image src="Images/egg.svg" alt="Egg" className="selected-image" /></>
                        )}
                    </div>
                )
            }


        </div >
    );
}

export default Search;
