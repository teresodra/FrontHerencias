import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiAddValuation, apiSaveInheritance } from '../services/api';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import messagesObj from '../schemas/messages';
import NewInheritanceHeirs from '../Components/newInheritance/NewInheritanceHeirs';
import NewInheritanceName from '../Components/newInheritance/NewInheritanceName';
import NewInheritanceAssets from '../Components/newInheritance/NewInheritanceAssets';
import NewInheritanceRegion from '../Components/newInheritance/NewInheritanceRegion';
import CustomPagination from '../Components/utils/CustomPagination';
import handleError from '../services/handleError';
import AuthContext from '../services/AuthContext';
import { useTranslation } from 'react-i18next';
import InfoTooltip from '../Components/infoTooltip/infoTooltip';

const NewHeritancePage = () => {
  const { setInheritancesList, setInheritancesAccessList } =
    useContext(AuthContext);

  const [isSaving, setIsSaving] = useState(false);
  // const [heirsList, setHeirsList] = useState([]);
  // To avoid doing it when testing ownership
  const [heirsList, setHeirsList] = useState([
    { name: 'Mario Martinez Lafuente', id: 'sdgfsdfds', age: 26, type: 1 },
    { name: 'Tereso del Rio Almajano', id: 'adsfsaf', age: 26, type: 2 }
  ]);
  const [ownershipsList, setOwnershipsList] = useState([]);
  const [assetsObj, setAssetsObj] = useState({});
  const [name, setName] = useState('');
  const [region, setRegion] = useState(null);
  const [visiblePagination, setVisiblePagination] = useState(true);
  const [valuationObj, setValuationObj] = useState(null);
  const { t } = useTranslation();

  const [heirDataStep, setHeirDataStep] = useState(1);

  const navigate = useNavigate();

  const handleSave = async () => {
    const adaptOwnershipsList = (ownershipsList) => {
      ownershipsList.forEach((item) => {
        Object.values(item.heirPercObj).forEach((heirObj) => {
          heirObj.fullOwnership = Number(heirObj.fullOwnership);
          heirObj.bareOwnership = Number(heirObj.bareOwnership);
          heirObj.lifeUsufruct = Number(heirObj.lifeUsufruct);
        });
      });
      return ownershipsList;
    };
    const auxOwnershipsList = adaptOwnershipsList(ownershipsList);

    setIsSaving(true);
    const inheritanceId = uuidv4();
    const auxInheritance = {
      inheritanceId: inheritanceId,
      name: name,
      region: region,
      heirsList: heirsList,
      ownershipsList: auxOwnershipsList,
      assetsObj: assetsObj
    };

    try {
      await apiSaveInheritance(auxInheritance);
      setInheritancesList(null);
      setInheritancesAccessList(null);
      for (const item of valuationObj) {
        try {
          await apiAddValuation(inheritanceId, item);
        } catch (error) {
          console.error('Error adding valuation:', error);
        }
      }
      Swal.fire(messagesObj.newInheritanceSuccess);
      navigate(`/inheritance/${inheritanceId}`);
    } catch (err) {
      console.error(err);
      handleError(err, navigate);
      // Swal.fire(messagesObj.newInheritanceError);
    }
    setIsSaving(false);
  };

  // It is required at least 2 heirs and 1 ownership
  const isNextButtonDisabled = () => {
    return (
      (heirDataStep === 1 && name === '') ||
      (heirDataStep === 2 && !region) ||
      (heirDataStep === 3 && heirsList.length < 2) ||
      (heirDataStep === 4 && ownershipsList.length < 1)
    );
  };

  // It is required at least one asset
  const isSaveButtonDisabled = () => {
    for (let key in assetsObj) {
      if (assetsObj[key].length > 0) {
        return false;
      }
    }
    return true;
  };

  const handleVisiblePagination = (visible) => {
    setVisiblePagination(visible);
  };

  return (
    <div className="center">
      <div className="content">
        {/* Show inheritance name in following steps */}
        {name && name !== '' && heirDataStep !== 1 ? (
          <h1>{name}</h1>
        ) : (
          <div className="title">
            <div className="tooltip-container">
              <h1>{t('new-inheritance-new-inheritance')}</h1>
              <InfoTooltip
                text={t('new-inheritance-title-tooltip-text')}
                size={24}
                relative
              />
            </div>
          </div>
        )}

        {/*STEP 1: NAME*/}
        {heirDataStep === 1 && (
          <NewInheritanceName name={name} setName={setName} />
        )}

        {/*STEP 2: REGION*/}
        {heirDataStep === 2 && (
          <NewInheritanceRegion region={region} setRegion={setRegion} />
        )}

        {/*STEP 3: HEIRS*/}
        {heirDataStep === 3 && (
          <NewInheritanceHeirs
            heirsList={heirsList}
            setHeirsList={setHeirsList}
            valuationObj={valuationObj}
            setValuationObj={setValuationObj}
          />
        )}

        {/*STEP 4: ASSETS*/}
        {heirDataStep === 4 && (
          <NewInheritanceAssets
            assetsObj={assetsObj}
            setAssetsObj={setAssetsObj}
            ownershipsList={ownershipsList}
            setVisiblePagination={handleVisiblePagination}
            setOwnershipsList={setOwnershipsList}
            heirsList={heirsList}
            valuationObj={valuationObj}
            setValuationObj={setValuationObj}
          />
        )}
        {visiblePagination && (
          <CustomPagination
            numSteps={4}
            currentStep={heirDataStep}
            setCurrentStep={setHeirDataStep}
            isNextButtonDisabled={isNextButtonDisabled}
            isSaveButtonDisabled={isSaveButtonDisabled}
            handleSave={handleSave}
            isSaving={isSaving}
          />
        )}
      </div>
    </div>
  );
};
export default NewHeritancePage;
