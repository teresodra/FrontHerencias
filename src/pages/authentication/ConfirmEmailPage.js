import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  confirmUser,
  resendConfirmationCode
} from '../../services/createAccount';
import { ClipLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import messagesObj from '../../schemas/messages';
import { useTranslation } from 'react-i18next';
import { ICON_NAMES } from '../../shared/consts';

const ConfirmEmailPage = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, []);

  const handleVerify = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await confirmUser(email, verificationCode);
      Swal.fire(messagesObj.emailVerifiedSuccess).then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.close) {
          navigate('/login');
        }
      });
    } catch (err) {
      console.log(err);
      if (err.code === 'ExpiredCodeException') {
        setError(t('confirm-email-page-expired-code'));
      } else if (
        err.code === 'CodeMismatchException' ||
        err.code === 'InvalidParameterException'
      ) {
        setError(t('confirm-email-page-code-unmatch'));
      } else if (err.code === 'UserNotFoundException') {
        Swal.fire(messagesObj.UserNotFoundException).then((result) => {
          if (
            result.isConfirmed ||
            result.dismiss === Swal.DismissReason.close
          ) {
            navigate('/login');
          }
        });
      } else if (err.code === 'LimitExceededException') {
        setError(t('confirm-email-page-passed-tries'));
      } else if (err.code === 'NotAuthorizedException') {
        Swal.fire(messagesObj.emailVerifiedSuccess).then((result) => {
          if (
            result.isConfirmed ||
            result.dismiss === Swal.DismissReason.close
          ) {
            navigate('/login');
          }
        });
      }
    }
    setIsLoading(false);
  };

  const sendNewCode = async () => {
    setError(null);
    try {
      await resendConfirmationCode(email);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="search-page" className="center">
      <section className="content">
        <h1>{t('confirm-email-page-confirm-email')}</h1>

        <form onSubmit={handleVerify} className="login-form">
          <div className="text-container mt-1 mb-2">
            {`${t('confirm-email-page-verification-send')}:`}
            <b>{email}</b>
          </div>

          <div className="form-group">
            <label htmlFor="verificationCode">
              {t('confirm-email-page-verification-code')}
            </label>
            <input
              type="text"
              name="verificationCode"
              placeholder={t(
                'confirm-email-page-verificacion-code-placeholder'
              )}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <div className="text-icon-container">
            {t('confirm-email-page-send-new-code')}
            <div className="custom-button-icon" onClick={sendNewCode}>
              <span
                className="material-symbols-outlined"
                translate="no"
                aria-hidden="true"
              >
                {ICON_NAMES.SYNC}
              </span>
            </div>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="button-container">
            <button
              className="custom-button"
              type="submit"
              disabled={isLoading}
            >
              {t('main-check')}
            </button>
          </div>
        </form>

        <div className="loader-clip-container">
          <ClipLoader className="custom-spinner-clip" loading={isLoading} />
        </div>
      </section>
    </div>
  );
};

export default ConfirmEmailPage;
