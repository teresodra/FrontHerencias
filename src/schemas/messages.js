import i18next from 'i18next';

const messagesObj = {
  get newInheritanceSuccess() {
    return {
      title: i18next.t('messages-newInheritanceSuccess-title'),
      text: i18next.t('messages-newInheritanceSuccess-text'),
      icon: "success"
    };
  },
  get newInheritanceError() {
    return {
      title: i18next.t('messages-newInheritanceError-title'),
      text: i18next.t('messages-newInheritanceError-text'),
      icon: "error"
    };
  },
  get valorationAddedSuccess() {
    return {
      title: i18next.t('messages-valorationAddedSuccess-title'),
      text: i18next.t('messages-valorationAddedSuccess-text'),
      icon: "success"
    };
  },
  get valorationAddedError() {
    return {
      title: i18next.t('messages-valorationAddedError-title'),
      text: i18next.t('messages-valorationAddedError-text'),
      icon: "error"
    };
  },
  get calculateSuccess() {
    return {
      title: i18next.t('messages-calculateSuccess-title'),
      text: i18next.t('messages-calculateSuccess-text'),
      icon: "success"
    };
  },
  get calculateError() {
    return {
      title: i18next.t('messages-calculateError-title'),
      text: i18next.t('messages-calculateError-text'),
      icon: "error"
    };
  },
  get solutionNotFoundError() {
    return {
      title: i18next.t('messages-solutionNotFoundError-title'),
      text: i18next.t('messages-solutionNotFoundError-text'),
      icon: "error"
    };
  },
  get emailVerifiedSuccess() {
    return {
      title: i18next.t('messages-emailVerifiedSuccess-title'),
      text: i18next.t('messages-emailVerifiedSuccess-text'),
      icon: "success"
    };
  },
  get UserNotFoundException() {
    return {
      title: i18next.t('messages-UserNotFoundException-title'),
      icon: "error"
    };
  },
  get networkError() {
    return {
      title: i18next.t('messages-networkError-title'),
      icon: "error"
    };
  },
  get sessionError() {
    return {
      title: i18next.t('messages-sessionError-title'),
      icon: "error"
    };
  },
  get accessDeniedError() {
    return {
      title: i18next.t('messages-accessDeniedError-title'),
      icon: "error"
    };
  },
  get itemNotFoundError() {
    return {
      title: i18next.t('messages-itemNotFoundError-title'),
      icon: "error"
    };
  },
  get unexpectedError() {
    return {
      title: i18next.t('messages-unexpectedError-title'),
      icon: "error"
    };
  },
  get deleteInheritanceConfirmation() {
    return {
      title: i18next.t('messages-deleteInheritanceConfirmation-title'),
      text: i18next.t('messages-deleteInheritanceConfirmation-text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e32e36',
      cancelButtonColor: '#1b263b',
      confirmButtonText: i18next.t('messages-deleteInheritanceConfirmation-confirmButtonText'),
      cancelButtonText: i18next.t('messages-deleteInheritanceConfirmation-cancelButtonText')
    };
  },
  get deleteInheritanceSuccess() {
    return {
      title: i18next.t('messages-deleteInheritanceSuccess-title'),
      icon: "success"
    };
  },
  get passwordUpdated() {
    return {
      title: i18next.t('messages-passwordUpdated-title'),
      icon: "success"
    };
  },
  get passwordUpdatedError() {
    return {
      title: i18next.t('messages-passwordUpdatedError-title'),
      icon: "error"
    };
  }
};

export default messagesObj;
