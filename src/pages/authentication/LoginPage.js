import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {signIn} from '../../services/authenticate';
import AuthContext from '../../services/AuthContext';
import SimpleReactValidator from 'simple-react-validator';
import { apiGetStorageRoomsList, apiPostAuthenticate } from '../../services/api';
import { ClipLoader } from 'react-spinners';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { setUser } = useContext(AuthContext); // Use context to store the user
    const { setUserAttributes } = useContext(AuthContext); // Use context to store the user attributes

    // Initialize simple-react-validator
    const [validator, setValidator] = useState(
        new SimpleReactValidator(
            { messages: {
                required: "Este campo es obligatorio.",
                email: "Debe ser una dirección de correo válida.",
            }
        }));
    const [, forceUpdate] = useState('')
    const navigate = useNavigate();
    
    const handleLogin = async (event) => {
        event.preventDefault();

        if (validator.allValid()){
            setIsLoading(true);
            await loginWithCognito();
        } else {
            validator.showMessages();
            forceUpdate(false);
        }
    };

    const loginWithCognito = async () => {
        try {
            const result = await signIn(email, password);
            console.log(result)
            // const result = await apiPostAuthenticate(email, password);

            if (result.newPasswordRequired) {
                setUser(result.cognitoUser)
                setUserAttributes(result.userAttributes)
                navigate('/change-password')
            } else {
                // Otherwise, redirect to the home page
                setUser(result.cognitoUser)
                setUserAttributes(result.userAttributes)
                
                navigate('/home');
            }
        } catch (err) {
            if (err.code === 'NotAuthorizedException') {
                setError("Email o contraseña incorrectos")
            } else if (err.code === "UserNotConfirmedException") {
                navigate(`/confirm-email?email=${email}`)
            }
            setIsLoading(false);
        }
    }

    const togglePassword = () => {
        setVisible(!visible);
    }


    return (
        <div id="search-page" className="center">
            <section className="content">
                <h1>Iniciar Sesión</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                    
                <form onSubmit={handleLogin} className='login-form'>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            autoComplete="email"
                            placeholder={"Email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => validator.showMessageFor('email')}
                        />
                        {validator.message('email', email, 'required|email')}
                    </div>
            
                    <div className='form-group'>
                        <label htmlFor="password">{"Contraseña"}</label>
                        <input
                            type={visible ? 'text' : 'password'}
                            name="password"
                            autoComplete="password"
                            placeholder={"Contraseña"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => validator.showMessageFor('password')}
                        />
                        <div className='show-password-container'>
                            <input type='checkbox' onChange={togglePassword}/>
                            <div>{"Mostrar contraseña"}</div>
                        </div>
                        {validator.message('password', password, 'required')}
                    </div>

                    <div className="button-container">
                        <button className="custom-button" type="submit" disabled={isLoading}>
                            Iniciar sesión
                        </button>
                    </div>

                    <div className='login-options-container'>
                        <p className='login-link' onClick={() => {navigate('/sign-up')}}>{"Crear cuenta"}</p>
                        <p className='login-link' onClick={() => {navigate('/recover-password')}}>{"He olvidado mi contraseña"}</p>
                    </div>
                </form>

                <div className="loader-clip-container">
                    <ClipLoader className="custom-spinner-clip" loading={isLoading} />
                </div>        
                    
            </section>
        </div>
    );
}

export default LoginPage;
