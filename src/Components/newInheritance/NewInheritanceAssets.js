import React, { useEffect, useState } from 'react';
import NewAssetPage from '../assetCard/NewAssetPage';
import DivisibleAsset from '../assetCard/DivisibleAsset';
import IndivisibleAsset from '../assetCard/IndivisibleAsset';

const NewInheritanceAssets = ({
  assetsObj,
  setAssetsObj,
  ownershipsList,
  setVisiblePagination,
  setOwnershipsList,
  heirsList,
  valuationObj,
  setValuationObj
}) => {
  const [assetToEdit, setAssetToEdit] = useState(null);
  const [addAssetPageOpen, setAddAssetPageOpen] = useState(false);
  const [assetType, setAssetType] = useState(null);

  const removeAsset = (assetId) => {
    let auxAssetsObj = { ...assetsObj };
    for (let key in auxAssetsObj) {
      let assetList = auxAssetsObj[key];
      auxAssetsObj[key] = assetList.filter((asset) => asset.id !== assetId);
    }
    setAssetsObj(auxAssetsObj);
  };

  const editAsset = (assetId, assetType) => {
    setAssetType(assetType);
    for (let key in assetsObj) {
      let auxAsset = assetsObj[key].find((asset) => asset.id === assetId);
      if (auxAsset) {
        setAssetToEdit(auxAsset);
        setAddAssetPageOpen(true);
        break;
      }
    }
  };

  useEffect(() => {
    setVisiblePagination(!addAssetPageOpen);
  }, [addAssetPageOpen]);

  return (
    <>
      <div className="header-divider">
        {addAssetPageOpen && (
          <button
            className="header-back-icon"
            onClick={() => {
              setAddAssetPageOpen(false);
            }}
          >
            <span className="material-symbols-outlined ">arrow_back</span>
          </button>
        )}
        <h2>{addAssetPageOpen ? 'Nuevo bien' : 'Bienes'}</h2>
      </div>
      {addAssetPageOpen ? (
        <NewAssetPage
          setAddAssetPageOpen={setAddAssetPageOpen}
          assetsObj={assetsObj}
          setAssetsObj={setAssetsObj}
          ownershipsList={ownershipsList}
          assetData={assetToEdit}
          setAssetData={setAssetToEdit}
          assetDataType={assetType}
          setOwnershipsList={setOwnershipsList}
          heirsList={heirsList}
          valuationObj={valuationObj}
          setValuationObj={setValuationObj}
        />
      ) : (
        <>
          <div className="button-container">
            <button
              className="custom-button"
              onClick={() => {
                setAddAssetPageOpen(true);
              }}
            >
              Añadir bien
            </button>
          </div>
          {assetsObj.divisibleAssetsList &&
            assetsObj.divisibleAssetsList.length > 0 && (
              <>
                <h3>
                  Bienes divisibles: {assetsObj.divisibleAssetsList.length}
                </h3>
                <div className="card-container">
                  {assetsObj.divisibleAssetsList.map((asset, index) => (
                    <DivisibleAsset
                      key={asset.id}
                      asset={asset}
                      ownershipsList={ownershipsList}
                      assetsObj={assetsObj}
                      setAssetsObj={setAssetsObj}
                      removeAsset={removeAsset}
                      editAsset={editAsset}
                      setOwnershipsList={setOwnershipsList}
                      heirsList={heirsList}
                    />
                  ))}
                </div>
              </>
            )}
          {assetsObj.indivisibleAssetsList &&
            assetsObj.indivisibleAssetsList.length > 0 && (
              <>
                <h3>
                  Bienes indivisibles: {assetsObj.indivisibleAssetsList.length}
                </h3>
                <div className="card-container">
                  {assetsObj.indivisibleAssetsList.map((asset, index) => (
                    <IndivisibleAsset
                      key={asset.id}
                      asset={asset}
                      ownershipsList={ownershipsList}
                      assetsObj={assetsObj}
                      setAssetsObj={setAssetsObj}
                      removeAsset={removeAsset}
                      setOwnershipsList={setOwnershipsList}
                      heirsList={heirsList}
                    />
                  ))}
                </div>
              </>
            )}
        </>
      )}
    </>
  );
};
export default NewInheritanceAssets;
