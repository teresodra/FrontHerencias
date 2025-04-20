import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import AssetDivisibleForm from './AssetDivisibleForm';
import AssetIndivisibleForm from './AssetIndivisibleForm';
import { useTranslation } from 'react-i18next';

const NewAssetPage = ({
  setAddAssetPageOpen,
  assetsObj,
  setAssetsObj,
  ownershipsList,
  assetData,
  setAssetData,
  assetDataType, //these ones only used when editing an asset
  setOwnershipsList,
  heirsList,
  valuationObj,
  setValuationObj
}) => {
  const [assetType, setAssetType] = useState(null);
  const { t } = useTranslation();

  const assetOptionsList = [
    { label: t('new-asset-divisible'), value: 'divisible' },
    { label: t('new-asset-indivisible'), value: 'indivisible' }
  ];

  useEffect(() => {
    if (assetData) {
      loadData();
    }
  }, []); // To load when modal is open

  const loadData = () => {
    let auxAssetType = assetOptionsList.find(
      (type) => type.value === assetDataType
    );
    setAssetType(auxAssetType);
  };

  const closePage = () => {
    setAssetType(null);
    setAddAssetPageOpen(false);
  };

  const checkAssetType = (types, assetType) => {
    if (!assetType) return false;
    return types.some((type) => type === assetType.value);
  };

  return (
    <>
      <div className="add-asset-content-container">
        <div className="add-asset-content">
          <div className="form-group">
            <label>{t('new-asset-asset-type')}:</label>
            <Select
              options={assetOptionsList}
              value={assetType}
              onChange={setAssetType}
              isDisabled={assetData && assetType} // If asset data exists means it is being edited. Hence, changing type is not allowed
              classNamePrefix="react-select" // Apply custom prefix
            />
          </div>

          {checkAssetType(['divisible'], assetType) && (
            <AssetDivisibleForm
              assetsObj={assetsObj}
              setAssetsObj={setAssetsObj}
              closePage={closePage}
              ownershipsList={ownershipsList}
              assetData={assetData}
              setAssetData={setAssetData}
              setOwnershipsList={setOwnershipsList}
              heirsList={heirsList}
              valuationObj={valuationObj}
              setValuationObj={setValuationObj}
            />
          )}

          {checkAssetType(['indivisible'], assetType) && (
            <AssetIndivisibleForm
              assetsObj={assetsObj}
              setAssetsObj={setAssetsObj}
              closePage={closePage}
              ownershipsList={ownershipsList}
              assetData={assetData}
              setAssetData={setAssetData}
              setOwnershipsList={setOwnershipsList}
              heirsList={heirsList}
              valuationObj={valuationObj}
              setValuationObj={setValuationObj}
            />
          )}

          {/* {assetType && assetType.value === 'divisibleInChunks' && (
            <AssetDivisivleInChunksForm
              assetsObj={assetsObj}
              setAssetsObj={setAssetsObj}
              closePage={closePage}
              ownershipsList={ownershipsList}
              assetData={assetData}
              setAssetData={setAssetData}
            />
          )} */}
        </div>
      </div>
    </>
  );
};
export default NewAssetPage;

// {
//     heirsList: [
//         // Lista objetos heredero
//     ],
//     assetsObj: {
//         divisibleAssetsList: [], // Lista objetos divisibleAsset
//         indivisibleAssetsList: [], // Lista objetos indivisibleAsset
//         divisibleInChunksAssetsList: [], // Lista objetos divisibleInChunksAsset
//         divisibleInPartsAssetsList: [] // Lista objetos divisibleInPartsAsset
//     },
//     ownershipsList: [
//         // Lista objetos ownership
//     ]
// }
