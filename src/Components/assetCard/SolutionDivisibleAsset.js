import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ICON_NAMES } from '../../shared/consts';

const SolutionDivisibleAsset = ({ assetAllocation, inheritance }) => {
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
            {ICON_NAMES.ARROW_DROP_DOWN}
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
            {(parseFloat(assetAllocation.quantity) || 0) *
              (parseFloat(asset.refValue) || 0).toFixed(3)}{' '}
            {t('main-euro-symbol')}
          </div>
        </div>

        {!isWrapped && (
          <div className="unwrapped-content">
            <div className="card-data-item">
              <label>{t('divisible-asset-quantity')}</label>
              <div>
                {assetAllocation.quantity}
                {` `}
                {t('main-euro-symbol')}
              </div>
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
