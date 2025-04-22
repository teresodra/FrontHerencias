import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ICON_NAMES } from '../../shared/consts';

const SolutionIndivisibleAsset = ({
  assetAllocation,
  inheritance,
  ownershipsList,
  removeAsset,
  editAsset
}) => {
  const [isWrapped, setIsWrapped] = useState(true);
  const { t } = useTranslation();
  // const ownership = ownershipsList.find(ownership => ownership.id === asset.ownershipId );

  const asset = inheritance.assetsObj.indivisibleAssetsList.find(
    (asst) => asst.id === assetAllocation.assetId
  );

  return (
    <div
      className={`card-data-container ${!isWrapped ? 'unwrapped' : ''}`}
      onClick={() => {
        setIsWrapped(!isWrapped);
      }}
    >
      <div className="card-data-button-container">
        <div>
          <span className="material-symbols-outlined">
            {ICON_NAMES.ARROW_DROP_DOWN}
          </span>
        </div>
      </div>

      <div className="card-data-content">
        <div className="card-data-item">
          <label>{t('indivisible-asset-name')}</label>
          <div>{asset.name}</div>
        </div>

        <div className="card-data-item">
          <label>{t('indivisible-asset-valoration')}</label>
          <div>
            {assetAllocation.valuePOV} {t('main-euro-symbol')}
          </div>
        </div>

        {!isWrapped && (
          <div className="unwrapped-content">
            <div className="card-data-item">
              <label>{t('indivisible-asset-reference-value')}</label>
              <div>
                {asset.refValue} {t('main-euro-symbol')}
              </div>
            </div>
            {/* 
                        <div className='card-data-item'>
                            <label>Propiedad</label>
                            <div>{ownership.name}</div>
                        </div> */}
          </div>
        )}
      </div>
    </div>
  );
};
export default SolutionIndivisibleAsset;
