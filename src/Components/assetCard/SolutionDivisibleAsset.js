import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SolutionDivisibleAsset = ({
  assetAllocation,
  inheritance,
  ownershipsList,
  removeAsset,
  editAsset
}) => {
  const [isWrapped, setIsWrapped] = useState(true);
  const { t } = useTranslation();

  const asset = inheritance.assetsObj.divisibleAssetsList.find(
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
            {t('icon-arrow-drop-down')}
          </span>
        </div>
      </div>

      <div className="card-data-content">
        <div className="card-data-item">
          <label>{t('divisible-asset-name')}</label>
          <div>{asset.name}</div>
        </div>

        <div className="card-data-item">
          <label>{t('divisible-asset-total-valoration')}</label>
          <div>
            {assetAllocation.valuePOV} {t('main-euro-symbol')}
          </div>
        </div>

        {!isWrapped && (
          <div className="unwrapped-content">
            <div className="card-data-item">
              <label>{t('divisible-asset-quantity')}</label>
              <div>{assetAllocation.quantity}</div>
            </div>

            <div className="card-data-item">
              <label>{t('divisible-asset-reference-unit-value')}</label>
              <div>
                {asset.refValue} {t('main-euro-symbol')}
              </div>
            </div>

            {asset.category === 'cash' && (
              <div className="card-data-item">
                <label>{t('divisible-asset-category')}</label>
                <div>{t('divisible-asset-money')}</div>
              </div>
            )}
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
export default SolutionDivisibleAsset;
