import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {signUp} from '../../services/createAccount';
import SimpleReactValidator from 'simple-react-validator';
// import { useTranslation } from 'react-i18next';
import { ClipLoader } from 'react-spinners';

function SignUpPage() {

    const [name, setName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAccepted, setIsAccepted] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // const { t, i18n } = useTranslation('login'); // Load translations from the 'login' namespace

  // Initialize simple-react-validator
    const [validator, setValidator] = useState(
        new SimpleReactValidator({
            validators: {
                passwordMatch: {  // Custom validator for matching passwords
                    message: 'Las contraseñas no coinciden',
                    rule: (val, params, validator) => {
                        return val === params[0]; // params[0] is newPassword passed in the validation rule
                    },
                    required: true,
                },
                passwordStrength: {
                    message: 'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.',
                    rule: (val) => {
                        // Ensure at least: one lowercase letter, one uppercase leater, one number and one special character
                        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`+=-])/;
                        return regex.test(val);
                    },
                    required: true,
                },
            },
            messages: {
                required: "Este campo es obligatorio.",
                email: "Debe ser una dirección de correo válida.",
            },
        })
    );
    const [, forceUpdate] = useState('')
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();

        if (validator.allValid()){
            setIsLoading(true);
            await signUpWithCognito(); 
        } else {
            validator.showMessages()
            forceUpdate(false)
        }
    };

    const signUpWithCognito = async () => {
        try {
            const result = await signUp(email, password, name, lastName);
            console.log(result)
            navigate(`/confirm-email?email=${email}`);
        } catch (err) {
            console.log(err);
            if (err.code === 'UsernameExistsException') {
                setError("Este email ya está registrado")
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
                <h1>{"Crear Cuenta"}</h1>
                
                <form onSubmit={handleSignUp} className='login-form'>
                    <div className='form-group'>
                        <label htmlFor="name">{"Nombre"}</label>
                        <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            placeholder={"Nombre"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => validator.showMessageFor('name')}
                        />
                        {validator.message('name', name, 'required|alpha_space')}
                    </div>

                    <div className='form-group'>
                        <label htmlFor="lastName">{"Apellido(s)"}</label>
                        <input
                            type="text"
                            name="lastName"
                            autoComplete="lastName"
                            placeholder={"Apellido(s)"}
                            value={lastName}
                            onChange={(e) => setlastName(e.target.value)}
                            onBlur={() => validator.showMessageFor('name')}
                        />
                        {validator.message('lastName', lastName, 'required|alpha_space')}
                    </div>
                    
                    <div className='form-group'>
                        <label htmlFor="email">{'Email'}</label>
                        <input
                            type="text"
                            name="email"
                            autoComplete="email"
                            placeholder={'Email'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => validator.showMessageFor('email')}
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {validator.message('email', email, 'required|email')}
                    </div>
        
                    <div className='form-group'>
                        <label htmlFor="password">{"Contraseña"}</label>
                        <input
                            type={visible ? 'text' : 'password'}
                            name="password"
                            // autoComplete="password"
                            placeholder={"Contraseña"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => validator.showMessageFor('password')}
                        />
                        <div className='show-password-container'>
                            <input type='checkbox' onChange={togglePassword}/>
                            <div>{"Mostrar contraseña"}</div>
                        </div>
                        {validator.message('password', password, 'required|passwordStrength|min:8')}
                    </div>

                    <div className='form-group'>
                        <label htmlFor="confirmPassword">{"Confirmar contraseña"}</label>
                        <input
                            type={visible ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder={"Confirmar contraseña"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={() => validator.showMessageFor('confirmPassword')}
                        />

                        {validator.message('confirmPassword', confirmPassword, `required|passwordMatch:${password}`)}
                    </div>

                    <div className='form-group terms-container mt-1'>
                        <input type="checkbox" onChange={() => {setIsAccepted(!isAccepted);}}/>
                        <div>{"He leído y acepto los"}&nbsp;</div>
                        <div className='login-link'>{"términos y condiciones"}</div>
                        
                    </div>
                
                    <div className="button-container">
                        <button className="custom-button" type="submit" disabled={isLoading}>
                            {"Crear Cuenta"}
                        </button>
                    </div>
                </form>

                <div className="loader-clip-container">
                    <ClipLoader className="custom-spinner-clip" loading={isLoading} />
                </div>        
                
            </section>
        </div>
  );
}

export default SignUpPage;
