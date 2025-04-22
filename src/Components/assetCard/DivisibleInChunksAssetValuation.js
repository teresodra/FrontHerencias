import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ICON_NAMES } from '../../shared/consts';

const DivisibleInChunksAssetValuation = ({
  asset,
  ownershipsList,
  valuationObj,
  setValuationObj
}) => {
  const [isWrapped, setIsWrapped] = useState(true);
  const ownership = ownershipsList.find(
    (ownership) => ownership.id === asset.ownershipId
  );
  const { t } = useTranslation();

  useEffect(() => {
    // If it is cash value = ref value
    if (asset.category === 'cash') {
      addValuation(asset.refValue);
    }
  }, []);

  const handleInputChange = (event) => {
    event.stopPropagation(); // Prevent unwrapping when typing the value
    addValuation(event.target.value);
  };

  const addValuation = (value) => {
    let auxValList = [
      ...valuationObj.assetsValuationObj.divisibleInChunksAssetsList
    ];
    const index = auxValList.findIndex(
      (assetVal) => assetVal.assetId === asset.id
    );
    auxValList[index] = { ...auxValList[index], value: value };
    setValuationObj({
      ...valuationObj,
      assetsValuationObj: {
        ...valuationObj.assetsValuationObj,
        divisibleInChunksAssetsList: auxValList
      }
    });
  };

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

        {!isWrapped && (
          <div className="unwrapped-content">
            <div className="card-data-item">
              <label>{`${t('divisible-asset-total-size')} (${
                asset.unitSize
              })`}</label>
              <div>{asset.totalSize}</div>
            </div>

            <div className="card-data-item">
              <label>{`${t('divisible-asset-reference-unit-per')} ${
                asset.unitSize
              }`}</label>
              <div>
                {asset.refValue} {t('main-euro-symbol')}
              </div>
            </div>

            <div className="card-data-item">
              <label>{t('divisible-asset-part-min-size')}</label>
              <div>
                {asset.minimumSize} {asset.unitSize}
              </div>
            </div>

            {/* {asset.category === "cash" && (
                            <div className='card-data-item'>
                                <label>Categoría</label>
                                <div>Dinero</div>
                            </div>
                        )} */}

            <div className="card-data-item">
              <label>{t('divisible-asset-ownership')}</label>
              <div>{ownership.name}</div>
            </div>

            <div className="custom-form">
              <div className="form-group">
                <label>{`${t('divisible-asset-valoration-per')} ${
                  asset.unitSize
                }`}</label>
                <input
                  type="text"
                  onChange={handleInputChange}
                  onClick={(event) => event.stopPropagation()}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DivisibleInChunksAssetValuation;
