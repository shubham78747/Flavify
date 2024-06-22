import React, { useState } from 'react';
import './Search.css';
import { Image } from 'react-bootstrap';
function Search({setSelectedOption,selectedOption}) {
    const [isImageShown, setIsImageShown] = useState(false);
   console.log('selectedOption=======-------------->',selectedOption)

    const handleClick = (option) => {
        setSelectedOption(option);
        setIsImageShown(!isImageShown);
    };
     const toggleImage = () => {
        setIsImageShown(!isImageShown);
    };
    return (
        <div className={`searchmain`}>
            <i><Image src='Images/searchicon.svg'></Image></i>
            <input type="search" placeholder='Search' />
            <div className={`image-container ${isImageShown ? 'show' : ''}`}>
                <div className={`image-option ${selectedOption === 'V' && 'selected'}`} onClick={() => handleClick('V')}>
                    <Image src="Images/veg.svg" alt="Veg" className="image" />
                </div>
                <div className={`image-option ${selectedOption === 'N' && 'selected'}`} onClick={() => handleClick('N')}>
                    <Image src="Images/nonveg.svg" alt="Non-Veg" className="image" />
                </div>
                <div className={`image-option ${selectedOption === 'E' && 'selected'}`} onClick={() => handleClick('E')}>
                    <Image src="Images/egg.svg" alt="Egg" className="image" />
                </div>
            </div>
            {
                selectedOption && (
                    <div className="selected-image-container" onClick={toggleImage}>
                        {/* Render larger image based on selected option */}
                        {selectedOption === 'V' && (
                            <> <Image src="Images/veg.svg" alt="Veg" className="selected-image" /></>
                        )}
                        {selectedOption === 'N' && (
                            <> <Image src="Images/nonveg.svg" alt="Non-Veg" className="selected-image" /></>
                        )}
                        {selectedOption === 'E' && (
                            <><Image src="Images/egg.svg" alt="Egg" className="selected-image" /></>
                        )}
                    </div>
                )
            }
        </div>
    );
}

export default Search;
