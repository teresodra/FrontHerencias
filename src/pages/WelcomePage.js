import React from "react";
// import Logo from "../assets/images/LOGO.svg"
import logo from "../assets/images/LOGO.svg"

const WelcomePage = () => {
    return (
        <div className='center'>
            <section className='content'>
                <div className="welcome-icon-container">
                    <img src={logo} alt="Logo" className="welcome-icon mt-1"/>
                    {/* <Logo width="100" height="100" /> */}
                </div>

                <div className="welcome-title">
                    {"Herencia Ideal"}
                </div>
                <div className="welcome-slogan">
                    {"Beneficiando a todas las partes"}
                </div>
                <div className="welcome-description mt-2">
                    {"Nuestro software facilita los procesos de herencia encontrando repartos que satisfacen a todas las partes"}
                </div>


            </section>
        </div>
    )
};
export default WelcomePage;