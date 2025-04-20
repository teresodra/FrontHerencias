import React, { useState } from 'react';
import Select from 'react-select';
import regionsList from '../../schemas/regionsList';
import { useTranslation } from 'react-i18next';

const NewInheritanceRegion = ({ region, setRegion }) => {
  const [selectedRegion, setSelectedRegion] = useState(
    regionsList.find((reg) => reg.value === region)
  );
  const { t } = useTranslation();

  const updateRegion = (e) => {
    setSelectedRegion(e);
    setRegion(e.value);
  };

  return (
    <>
      <h2>{t('new-inheritance-community')}</h2>
      <form
        className="custom-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="form-group">
          <Select
            options={regionsList}
            onChange={updateRegion}
            value={selectedRegion}
            placeholder={`${t('new-inheritance-choose-community')}...`}
          />
        </div>
      </form>
    </>
  );
};
export default NewInheritanceRegion;
