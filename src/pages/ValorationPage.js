import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import DivisibleAssetValuation from '../Components/assetCard/DivisibleAssetValuation';
import IndivisibleAssetValuation from '../Components/assetCard/IndivisibleAssetValuation';
import { apiGetInheritancesList, apiAddValuation } from '../services/api';
import Swal from 'sweetalert2';
import messagesObj from '../schemas/messages';
import DivisibleInChunksAssetValuation from '../Components/assetCard/DivisibleInChunksAssetValuation';
import CustomPagination from '../Components/utils/CustomPagination';
import AuthContext from '../services/AuthContext';
import handleError from '../services/handleError';
import { ClipLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';

const ValuationPage = () => {
  const {
    inheritancesList,
    setInheritancesList,
    inheritancesAccessList,
    setInheritancesAccessList
  } = useContext(AuthContext);

  const { inheritanceId, heirId } = useParams();
  const [inheritance, setInheritance] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [valuationObj, setValuationObj] = useState({});
  const [money, setMoney] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const { t } = useTranslation();

  // const numSteps = Object.keys(inheritance.assetsObj).length + 1; // +1 because in first step they ask about money
  const [numSteps, setNumSteps] = useState(1);

  const [validator] = useState(new SimpleReactValidator());

  const navigate = useNavigate();

  useEffect(() => {
    if (!inheritancesList || !inheritancesAccessList) {
      getInheritanceData();
    } else {
      const inheritanceAux = inheritancesList.find(
        (inh) => inh.inheritanceId === inheritanceId
      );
      setInheritance(inheritanceAux);
      initializeValuation(inheritanceAux);
      setIsLoading(false);
    }
  }, []);

  const getInheritanceData = async () => {
    try {
      const response = await apiGetInheritancesList();
      setInheritancesList(response?.inheritancesList);
      setInheritancesAccessList(response?.inheritancesAccessList);
      const inheritanceAux = response.inheritancesList.find(
        (inh) => inh.inheritanceId === inheritanceId
      );
      const accessPermission = response.inheritancesAccessList.find(
        (acc) => acc.inheritanceId === inheritanceId
      );
      // Check if they have access
      if (!inheritance || !accessPermission) {
        await handleError({ response: { status: 403 } }, navigate);
      }
      setIsLoading(false);
      setInheritance(inheritanceAux);
      initializeValuation(inheritanceAux);
    } catch (err) {
      await handleError(err, navigate);
    }
  };

  const initializeValuation = (auxInheritance) => {
    calculateSteps(auxInheritance);
    if (!auxInheritance?.heirValuationsObj?.[heirId]) {
      initializeValuationObj(auxInheritance);
    } else {
      setValuationObj(auxInheritance.heirValuationsObj?.[heirId]);
      setMoney(auxInheritance?.heirValuationsObj?.[heirId].money);
    }
  };

  // If we want to skip steps not used (e.g. there are no assets from one type)
  const calculateSteps = (data) => {
    setNumSteps(5);
    // TODO
    // setNumSteps(Object.keys(data.assetsObj).length + 1); // +1 because in first step they ask about money )
  };

  const saveValuation = async () => {
    setIsSaving(true);

    try {
      await apiAddValuation(inheritanceId, {
        heirId: heirId,
        valuationObj: valuationObj
      });
      //if success update inheritance locally
      const auxInheritance = {
        ...inheritance,
        heirValuationsObj: {
          ...(inheritance?.heirValuationsObj || {}), // Initially is undefined
          [heirId]: valuationObj
        }
      };
      let auxInheritancesList = [...inheritancesList];
      const index = auxInheritancesList.findIndex(
        (inh) => inh.inheritanceId === inheritanceId
      );
      auxInheritancesList[index] = auxInheritance;
      setInheritancesList(auxInheritancesList);

      Swal.fire(messagesObj.valorationAddedSuccess);
      navigate(`/inheritance/${inheritance.inheritanceId}`);
    } catch (err) {
      Swal.fire(messagesObj.valorationAddedError);
    }
    setIsSaving(false);
  };

  const initializeValuationObj = (inheritanceData) => {
    let auxObj = { heirId: heirId, money: 0, assetsValuationObj: {} };
    for (let assetType in inheritanceData.assetsObj) {
      let auxList = [];
      for (let asset of inheritanceData.assetsObj[assetType]) {
        // if it is cash, value = its market valur
        auxList.push({ assetId: asset.id });
      }
      auxObj.assetsValuationObj[assetType] = auxList;
    }
    console.log(auxObj);
    setValuationObj(auxObj);
  };

  const updateMoney = (event) => {
    const auxMoney = !isNaN(parseFloat(event.target.value))
      ? parseFloat(event.target.value)
      : '';
    if (auxMoney !== '') {
      setValuationObj({ ...valuationObj, money: auxMoney });
    }
    setMoney(auxMoney);
  };

  const isNextButtonDisabled = () => {
    return currentStep === 1 && (typeof money !== 'number' || isNaN(money));
  };

  const isSaveButtonDisabled = () => {
    return false;
  };

  if (isLoading || !inheritance) {
    return (
      <div className="loader-clip-container">
        <ClipLoader className="custom-spinner-clip" loading={true} />
      </div>
    );
  }

  return (
    <div className="center">
      <div className="content">
        <h2>{`${t('valoration-page-valoration')} ${
          inheritance.heirsList.find((heir) => heir.id === heirId).name
        }`}</h2>

        {currentStep === 1 && (
          <form className="custom-form">
            <div className="form-group">
              <label>
                {t('valoration-page-invest-money')} ({t('main-euro-symbol')})
              </label>
              <input
                type="number"
                name="money"
                value={money}
                onChange={updateMoney}
              />
              {validator.message('money', money, 'required|numeric|min:0,num')}
            </div>
          </form>
        )}

        {currentStep === 2 && (
          <>
            <h2>{'valoration-page-divisible-assets'}</h2>
            {inheritance.assetsObj.divisibleAssetsList ? (
              <div className="card-container">
                {inheritance.assetsObj.divisibleAssetsList.map((asset) => (
                  <DivisibleAssetValuation
                    key={asset.id}
                    asset={asset}
                    ownershipsList={inheritance.ownershipsList}
                    valuationObj={valuationObj}
                    setValuationObj={setValuationObj}
                  />
                ))}
              </div>
            ) : (
              <div>{t('valoration-page-no-assets')}</div>
            )}
          </>
        )}

        {currentStep === 3 && (
          <>
            <h2>{t('valoration-page-indivisible-assets')}</h2>
            {inheritance.assetsObj.indivisibleAssetsList ? (
              <div className="card-container">
                {inheritance.assetsObj.indivisibleAssetsList.map((asset) => (
                  <IndivisibleAssetValuation
                    key={asset.id}
                    asset={asset}
                    ownershipsList={inheritance.ownershipsList}
                    valuationObj={valuationObj}
                    setValuationObj={setValuationObj}
                  />
                ))}
              </div>
            ) : (
              <div>{t('valoration-page-no-assets')}</div>
            )}
          </>
        )}

        {currentStep === 4 && (
          <>
            <h2>{t('valoration-page-divisible-assets-by-parts')}</h2>
            {inheritance.assetsObj.divisibleInPartsAssetsList ? (
              <div></div>
            ) : (
              <div>{t('valoration-page-no-assets')}</div>
            )}
          </>
        )}

        {currentStep === 5 && (
          <>
            <h2>{t('valoration-page-divisible-assets-by-pieces')}</h2>
            {inheritance.assetsObj.divisibleInChunksAssetsList ? (
              <div className="card-container">
                {inheritance.assetsObj.divisibleInChunksAssetsList.map(
                  (asset) => (
                    <DivisibleInChunksAssetValuation
                      key={asset.id}
                      asset={asset}
                      ownershipsList={inheritance.ownershipsList}
                      valuationObj={valuationObj}
                      setValuationObj={setValuationObj}
                    />
                  )
                )}
              </div>
            ) : (
              <div>{t('valoration-page-no-assets')}</div>
            )}
          </>
        )}

        <CustomPagination
          numSteps={numSteps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          isNextButtonDisabled={isNextButtonDisabled}
          isSaveButtonDisabled={isSaveButtonDisabled}
          handleSave={saveValuation}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
};
export default ValuationPage;
