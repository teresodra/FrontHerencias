import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignOut from '../auth/SignOut';
import userPool from '../../services/cognitoConfig'; // Your Cognito configuration
import { useTranslation } from 'react-i18next';
import { ICON_NAMES } from '../../shared/consts';

const Header = () => {
  const cognitoUser = userPool.getCurrentUser();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [language, setLanguage] = useState(); // Language state (default to Spanish)
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    const language = localStorage.getItem('herenciaideal-language');
    if (language) {
      setLanguage(language);
    } else {
      localStorage.setItem('herenciaideal-language', 'es');
    }
  }, []);

  useEffect(() => {
    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.error(`${t('header-getting-session-error')}:`, err);
          return;
        }
        // Fetch user attributes
        cognitoUser.getUserAttributes((err, attributes) => {
          if (err) {
            console.error(`${t('header-getting-attributes-error')}:`, err);
            return;
          }

          // Parse attributes
          const userAttributes = {};
          attributes.forEach((attribute) => {
            userAttributes[attribute.getName()] = attribute.getValue();
          });

          setName(userAttributes.name);
          setLastName(userAttributes.family_name);
        });
      });
    } else {
      console.error(t('header-no-user-error'));
    }
  }, [cognitoUser]);
  const goHome = () => {
    navigate('/home');
  };

  // Handle language change
  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    setLanguage(newLang);
    localStorage.setItem('herenciaideal-language', event.target.value);
    i18n.changeLanguage(newLang); // Cambia el idioma activamente
  };

  return (
    <div className="header">
      <div className="header-icon-container">
        <span
          className="material-symbols-outlined"
          translate="no"
          aria-hidden="true" // prevent problems with translators
          onClick={goHome}
        >
          {ICON_NAMES.HOME}
        </span>
      </div>

      <div className="header-title-container">
        <h2 translate="no">{t('main-page-title')}</h2>
      </div>

      {cognitoUser && (
        <div className="header-icon-container">
          {language && (
            <div className="language-selector">
              <select value={language} onChange={handleLanguageChange}>
                <option value="es">{t('header-spanish')}</option>
                <option value="en">{t('header-english')}</option>
              </select>
            </div>
          )}
          <div>
            {lastName}, {name}
          </div>
          <SignOut />
        </div>
      )}
    </div>
  );
};

export default Header;
