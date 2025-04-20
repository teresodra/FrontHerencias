import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../services/authenticate';
import AuthContext from '../../services/AuthContext';
import SimpleReactValidator from 'simple-react-validator';
import { ClipLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';

function LoginPage() {
  const { setInheritancesList, setInheritancesAccessList } =
    useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const { setUser } = useContext(AuthContext); // Use context to store the user
  const { setUserAttributes } = useContext(AuthContext); // Use context to store the user attributes

  // Initialize simple-react-validator
  const [validator] = useState(
    new SimpleReactValidator({
      messages: {
        required: t('login-page-mandatory-field'),
        email: t('login-page-valid-email')
      }
    })
  );
  const [, forceUpdate] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (validator.allValid()) {
      setIsLoading(true);
      await loginWithCognito();
    } else {
      validator.showMessages();
      forceUpdate(false);
    }
  };

  const loginWithCognito = async () => {
    try {
      // to make sure there are not inhereitances loaded
      setInheritancesList(null);
      setInheritancesAccessList(null);
      const result = await signIn(email, password);

      if (result.newPasswordRequired) {
        setUser(result.cognitoUser);
        setUserAttributes(result.userAttributes);
        navigate('/change-password');
      } else {
        // Otherwise, redirect to the home page
        setUser(result.cognitoUser);
        setUserAttributes(result.userAttributes);

        navigate('/home');
      }
    } catch (err) {
      if (err.code === 'NotAuthorizedException') {
        setError(t('login-page-unvalid-email-pass'));
      } else if (err.code === 'UserNotConfirmedException') {
        navigate(`/confirm-email?email=${email}`);
      }
      setIsLoading(false);
    }
  };

  const togglePassword = () => {
    setVisible(!visible);
  };

  return (
    <div id="search-page" className="center">
      <section className="content">
        <h1>{t('login-page-login')}</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">{t('login-page-email')}</label>
            <input
              type="text"
              name="email"
              autoComplete="email"
              placeholder={t('login-page-email-placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validator.showMessageFor('email')}
            />
            {validator.message('email', email, 'required|email')}
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('login-page-password')}</label>
            <input
              type={visible ? 'text' : 'password'}
              name="password"
              autoComplete="password"
              placeholder={t('login-page-password-placeholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => validator.showMessageFor('password')}
            />
            <div className="show-password-container">
              <input type="checkbox" onChange={togglePassword} />
              <div>{t('login-page-see-password')}</div>
            </div>
            {validator.message('password', password, 'required')}
          </div>

          <div className="button-container">
            <button
              className="custom-button"
              type="submit"
              disabled={isLoading}
            >
              {t('login-page-login')}
            </button>
          </div>

          <div className="login-options-container">
            <p
              className="login-link"
              onClick={() => {
                navigate('/sign-up');
              }}
            >
              {t('login-page-create-account')}
            </p>
            <p
              className="login-link"
              onClick={() => {
                navigate('/recover-password');
              }}
            >
              {t('login-page-forgot-password')}
            </p>
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
