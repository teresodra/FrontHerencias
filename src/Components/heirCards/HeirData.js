import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ICON_NAMES } from '../../shared/consts';

const HeirData = ({ heir, removeHeir, editHeir }) => {
  const [heirType, setHeirType] = useState(null);
  const { t } = useTranslation();
  const typeOptions = [
    { label: `${t('heir-data-type')} I`, value: 1 },
    { label: `${t('heir-data-type')} II`, value: 2 },
    { label: `${t('heir-data-type')} III`, value: 3 },
    { label: `${t('heir-data-type')} IIII`, value: 4 }
  ];

  useEffect(() => {
    let usType = typeOptions.find((op) => op.value === heir.type).label;
    setHeirType(usType.split(' ')[1]);
  }, []);

  return (
    <div className="card-data-container">
      <div className="card-data-button-container">
        <div
          onClick={() => {
            removeHeir(heir.id);
          }}
        >
          <span className="material-symbols-outlined">{ICON_NAMES.CLOSE}</span>
        </div>

        <div
          onClick={() => {
            editHeir(heir.id);
          }}
        >
          <span className="material-symbols-outlined">{ICON_NAMES.EDIT}</span>
        </div>
      </div>

      <div className="card-data-content">
        <div className="card-data-item">
          <label>{t('heir-data-name')}:</label>
          <div>{heir.name}</div>
        </div>

        <div className="card-data-item">
          <label>{t('heir-data-age')}:</label>
          <div>{heir.age}</div>
        </div>

        <div className="card-data-item">
          <label>{t('heir-data-type')}:</label>
          <div>{heirType}</div>
        </div>
      </div>
    </div>
  );
};
export default HeirData;
