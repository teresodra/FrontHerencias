import React from "react";
import { useNavigate } from 'react-router-dom';


const Header = () => {

    const navigate = useNavigate();
    const goHome = () => {
        navigate(`/`);
    }

    return (
        <div className="header">
            <div className='header-icon-container'>
                    <span className="material-symbols-outlined" onClick={goHome}>
                        home
                    </span>
                    {/* <div className='hover-text'>
                        Home
                    </div> */}
                </div>

        </div>
    )
};
export default Header;