import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import userPool from '../services/cognitoConfig';
// import { CognitoUser } from 'amazon-cognito-identity-js';
import SimpleReactValidator from 'simple-react-validator';
import { ClipLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import messagesObj from '../../schemas/messages';
import { forgotPassword, updatePassword } from '../../services/recoverPassword';
import { useTranslation } from 'react-i18next';

const RecoverPasswordPage = () => {
  const [email, setEmail] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [error] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isPetitionSent, setIsPetitionSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const { t } = useTranslation();

  // Initialize simple-react-validator
  const [validator] = useState(
    new SimpleReactValidator({
      validators: {
        passwordMatch: {
          // Custom validator for matching passwords
          message: t('recover-password-unmatch'),
          rule: (val, params) => {
            return val === params[0]; // params[0] is newPassword passed in the validation rule
          },
          required: true
        },
        passwordStrength: {
          message: t('recover-password-should'),
          rule: (val) => {
            // Ensure at least: one lowercase letter, one uppercase leater, one number and one special character
            const regex =
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`+=-])/;
            return regex.test(val);
          },
          required: true
        }
      }
    })
  );

  // Force component to re-render after validation messages
  const [, forceUpdate] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    // if(!user){
    //     navigate('/login');
    // }
  }, []);

  const handleGetCode = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await forgotPassword(email);
      console.log(result);
      setIsPetitionSent(true);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    if (validator.allValid()) {
      setIsLoading(true);

      try {
        const result = await updatePassword(
          email,
          verificationCode,
          newPassword
        );
        console.log(result);

        Swal.fire(messagesObj.passwordUpdated);
        navigate('/login');
      } catch (err) {
        Swal.fire(messagesObj.passwordUpdatedError);
        navigate('/login');
        setIsLoading(false);
      }
    } else {
      validator.showMessages(); // Show validation error messages
      forceUpdate(); // Force re-render to show validation messages
    }
  };

  const togglePassword = () => {
    setVisible(!visible);
  };

  const isButtonDisabled = () => {
    return (
      verificationCode === '' || newPassword === '' || confirmPassword === ''
    );
  };

  return (
    <div id="search-page" className="center">
      <section className="content">
        <h1>{t('recover-password-recover-password')}</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!isPetitionSent ? (
          <form onSubmit={handleGetCode} className="change-password-form">
            <div className="text-container mt-1 mb-2">
              {t('recover-password-verification-code-send')}
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('recover-password-email')}</label>
              <input
                type="text"
                name="email"
                placeholder={t('recover-password-email-placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {validator.message('email', email, 'required|email')}
            </div>

            <div className="button-container">
              <button
                type="submit"
                className="custom-button"
                disabled={isLoading}
              >
                {t('recover-password-send')}
              </button>
            </div>

            <div className="loader-clip-container">
              <ClipLoader className="custom-spinner-clip" loading={isLoading} />
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleChangePassword}
            className="change-password-form"
          >
            <div className="formGroup">
              <label htmlFor="verificationCode">
                {t('recover-password-verification-code')}
              </label>
              <input
                type="text"
                name="verificationCode"
                placeholder={t(
                  'recover-password-verification-code-placeholder'
                )}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              {validator.message(
                'verificationCode',
                verificationCode,
                'required'
              )}
            </div>
            <div className="formGroup">
              <label htmlFor="new-password">
                {t('recover-password-new-password')}
              </label>
              <input
                type={visible ? 'text' : 'password'}
                name="newPassword"
                placeholder={t('recover-password-new-password-placeholder')}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={() => validator.showMessageFor('newPassword')}
              />
              {validator.message(
                'newPassword',
                newPassword,
                'required|passwordStrength|min:8'
              )}
            </div>

            <div className="formGroup">
              <label htmlFor="confirmPassword">
                {t('recover-password-confirm-password')}
              </label>
              <input
                type={visible ? 'text' : 'password'}
                name="confirmPassword"
                placeholder={t('recover-password-confirm-password-placeholder')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => validator.showMessageFor('confirmPassword')}
              />

              <div className="show-password-container">
                <input type="checkbox" onChange={togglePassword} />
                <div>{t('confirm-password-see-password')}</div>
              </div>

              {validator.message(
                'confirmPassword',
                confirmPassword,
                `required|passwordMatch:${newPassword}`
              )}
            </div>
            <div className="button-container">
              <button
                type="submit"
                className="custom-button"
                disabled={isLoading || isButtonDisabled()}
              >
                {t('recover-password-create-password')}
              </button>
            </div>

            <div className="loader-clip-container">
              <ClipLoader className="custom-spinner-clip" loading={isLoading} />
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
export default RecoverPasswordPage;
