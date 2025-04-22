import React from 'react';
import { useTranslation } from 'react-i18next';
import { ICON_NAMES } from '../../shared/consts';

const IndivisibleAsset = ({
  asset,
  ownershipsList,
  removeAsset,
  editAsset
}) => {
  const ownership = ownershipsList.find(
    (ownership) => ownership.id === asset.ownershipId
  );

  const { t } = useTranslation();

  return (
    <div className="card-data-container">
      <div className="card-data-button-container">
        <div
          onClick={() => {
            removeAsset(asset.id);
          }}
        >
          <span className="material-symbols-outlined">{ICON_NAMES.CLOSE}</span>
        </div>

        <div
          onClick={() => {
            editAsset(asset.id, 'indivisible');
          }}
        >
          <span className="material-symbols-outlined">{ICON_NAMES.EDIT}</span>
        </div>
      </div>

      <div className="card-data-content">
        <div className="card-data-item">
          <label>{t('indivisible-asset-name')}:</label>
          <div>{asset?.name}</div>
        </div>

        <div className="card-data-item">
          <label>{t('indivisible-asset-reference-value')}:</label>
          <div>{asset.refValue}</div>
        </div>

        <div className="card-data-item">
          <label>{t('indivisible-asset-ownership')}:</label>
          <div>{ownership?.name}</div>
        </div>
      </div>
    </div>
  );
};
export default IndivisibleAsset;
