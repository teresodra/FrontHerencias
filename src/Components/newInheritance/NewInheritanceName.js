import React from 'react';
import { useTranslation } from 'react-i18next';

const NewInheritanceName = ({ name, setName }) => {
  const { t } = useTranslation();
  return (
    <form
      className="custom-form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="form-group">
        <label>{t('new-inheritance-heir-name')}</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>
    </form>
  );
};
export default NewInheritanceName;
