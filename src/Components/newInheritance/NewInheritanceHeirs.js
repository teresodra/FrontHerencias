import React, { useEffect, useState } from 'react';
import HeirData from '../heirCards/HeirData';
import NewHeirModal from '../heirCards/NewHeirModal';
import { useTranslation } from 'react-i18next';
const NewInheritanceHeirs = ({
  heirsList,
  setHeirsList,
  valuationObj,
  setValuationObj
}) => {
  const [heirModalIsOpen, setHeirModalIsOpen] = useState(false);
  const [heirToEdit, setHeirToEdit] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!valuationObj) {
      setValuationObj(
        heirsList.map((heir) => {
          return {
            heirId: heir.id,
            valuationObj: {
              heirId: heir.id,
              assetsValuationObj: {
                divisibleAssetsList: []
              },
              money: 0
            }
          };
        })
      );
    }
  }, []);

  const removeHeir = (heirId) => {
    setHeirsList(heirsList.filter((heir) => heir.id !== heirId));
    setValuationObj(
      valuationObj.filter((valuation) => valuation.heirId !== heirId)
    );
  };

  const editHeir = (heirId) => {
    let auxHeir = heirsList.find((heir) => heir.id === heirId);
    setHeirToEdit({ ...auxHeir });
    setHeirModalIsOpen(true);
  };

  return (
    <>
      <h2>{t('new-inheritance-heirs')}</h2>
      {heirsList.length > 0 && (
        <div className="card-container">
          {heirsList.map((heir) => (
            <HeirData
              key={heir.id}
              heir={heir}
              removeHeir={removeHeir}
              editHeir={editHeir}
            />
          ))}
        </div>
      )}

      <div className="button-container">
        <button
          className="custom-button"
          onClick={() => {
            setHeirModalIsOpen(true);
          }}
        >
          {t('new-inheritance-add-heir')}
        </button>
      </div>

      <NewHeirModal
        modalIsOpen={heirModalIsOpen}
        setModalIsOpen={setHeirModalIsOpen}
        heirsList={heirsList}
        setHeirsList={setHeirsList}
        heirData={heirToEdit}
        setHeirData={setHeirToEdit}
        valuationObj={valuationObj}
        setValuationObj={setValuationObj}
      />
    </>
  );
};
export default NewInheritanceHeirs;
