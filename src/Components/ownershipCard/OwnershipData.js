import React from 'react';
import { useTranslation } from 'react-i18next';

const OwnershipData = ({
  ownership,
  heirsList,
  removeOwnership,
  editOwnership
}) => {
  const { t } = useTranslation();
  return (
    <div className="card-data-container">
      <div className="card-data-button-container">
        <div
          onClick={() => {
            removeOwnership(ownership.id);
          }}
        >
          <span className="material-symbols-outlined">{t('icon-close')}</span>
        </div>

        <div
          onClick={() => {
            editOwnership(ownership.id);
          }}
        >
          <span className="material-symbols-outlined">{t('icon-edit')}</span>
        </div>
      </div>

      <div className="card-data-content">
        <div className="card-data-item">
          <label>{t('ownership-data-name')}:</label>
          <div>{ownership.name}</div>
        </div>

        {Object.entries(ownership.heirPercObj).map(([heirId, values]) => (
          <div key={heirId} className="card-data-item">
            <div>{heirsList.find((heir) => heir.id === heirId).name}</div>
            <div>{values.fullOwnership}</div>
            <div>{values.bareOwnership}</div>
            <div>{values.lifeUsufruct}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OwnershipData;
