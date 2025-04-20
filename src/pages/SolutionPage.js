import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../services/AuthContext';
import { apiGetInheritancesList } from '../services/api';
import Select from 'react-select';
import handleError from '../services/handleError';
import CustomTable from '../Components/CustomTable';
import SolutionDivisibleAsset from '../Components/assetCard/SolutionDivisibleAsset';
import SolutionIndivisibleAsset from '../Components/assetCard/SolutionIndivisibleAsset';
import { useTranslation } from 'react-i18next';

const SolutionPage = () => {
  const {
    inheritancesList,
    setInheritancesList,
    inheritancesAccessList,
    setInheritancesAccessList
  } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [inheritance, setInheritance] = useState(true);

  const [heirOptions, setHeirOptions] = useState([]);
  const [heirPOV, setHeirPOV] = useState(null);
  const [heirAllocation, setHeirAllocation] = useState(null);

  const [showTables, setShowTables] = useState(false);

  const { t } = useTranslation();

  const { inheritanceId } = useParams();
  const navigate = useNavigate();

  // TODO poner que si solucion no existe de error y te lleve a pagina herencia

  useEffect(() => {
    if (!inheritancesList || !inheritancesAccessList) {
      getInheritanceData();
    } else {
      const inheritanceAux = inheritancesList.find(
        (inh) => inh.inheritanceId === inheritanceId
      );
      if (!inheritanceAux?.solution) {
        handleError({ response: { status: 404 } }, navigate);
      }
      setInheritance(inheritanceAux);
      initializeValues(inheritanceAux);
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
      if (!inheritanceAux || !accessPermission) {
        await handleError({ response: { status: 403 } }, navigate);
      }
      if (!inheritanceAux?.solution) {
        await handleError({ response: { status: 404 } }, navigate);
      }
      setIsLoading(false);
      setInheritance(inheritanceAux);
      initializeValues(inheritanceAux);
    } catch (err) {
      await handleError(err, navigate);
    }
  };

  // const loadInheritance = async () => {
  //     try {
  //         let data;
  //         if (location.state?.inheritance?.solution) {
  //             data = location.state?.inheritance // Get inheritance from state when clicking in inheritance wrap
  //         } else {
  //             let response = await apiGetSolution(inheritanceId);
  //             if (response.status === 204) {
  //                 Swal.fire(messagesObj.solutionNotFoundError)
  //                 navigate(`/inheritance/${inheritanceId}`)
  //             }
  //             data = response.data;
  //         }
  //         setInheritance(data);
  //         initializeValues(data);
  //         setIsLoading(false);

  //     } catch (err) {
  //         console.log(err)
  //     }
  // }

  const initializeValues = (data) => {
    let auxList = [];
    data.heirsList.map((heir) =>
      auxList.push({ value: heir.id, label: heir.name })
    );
    setHeirOptions([
      { label: `- ${t('solution-page-reference-value')} -`, value: 'refValue' },
      ...auxList
    ]);
  };

  const changeHeirPOV = (value) => {
    setHeirPOV(value);
    setHeirAllocation(
      inheritance.solution.heirsAllocation.find(
        (alloc) => alloc.heirId === value?.value
      )
    );
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="center">
      <div className="content">
        <h1>{t('solution-page-solution')}</h1>

        <h3>{t('solution-page-point-of-view')}</h3>
        <form className="custom-form">
          <Select
            options={heirOptions}
            onChange={changeHeirPOV}
            value={heirPOV}
            placeholder={t('main-select-placeholder')}
          />
        </form>

        {heirPOV && (
          <>
            {heirPOV?.value !== 'refValue' && (
              <div className="tab-container">
                <div
                  className={!showTables ? 'tab active' : 'tab'}
                  onClick={() => setShowTables(false)}
                >
                  {t('solution-page-assets')}
                </div>
                <div
                  className={showTables ? 'tab active' : 'tab'}
                  onClick={() => setShowTables(true)}
                >
                  {t('solution-page-values')}
                </div>
              </div>
            )}

            {showTables || heirPOV?.value === 'refValue' ? (
              <>
                <h3>{t('solution-page-expected-values')}</h3>
                <CustomTable
                  inheritance={inheritance}
                  valuesObj={
                    inheritance.solution.perceivedValueMatrix?.[heirPOV?.value]
                      ?.expectedValues
                  }
                  heirPOV={heirPOV?.value}
                />

                <h3>{t('solution-page-received-values')}</h3>
                <CustomTable
                  inheritance={inheritance}
                  valuesObj={
                    inheritance.solution.perceivedValueMatrix?.[heirPOV?.value]
                      ?.receivedValues
                  }
                  heirPOV={heirPOV?.value}
                />

                {heirPOV?.value !== 'refValue' && (
                  <div className="center">
                    <div className="sol-values-container">
                      <div className="aux-flex-row">
                        <div className="bold-text">
                          {heirAllocation.moneyReceived <= 0
                            ? `${t('solution-page-inheritance-contribute')}:`
                            : `${t('solution-page-inheritance-receives')}:`}
                        </div>
                        <div>
                          {Math.abs(heirAllocation.moneyReceived).toFixed(2)}{' '}
                          {t('main-euro-symbol')}
                        </div>
                      </div>

                      <div className="aux-flex-row">
                        <div className="bold-text">
                          {t('solution-page-inheritances-tax')}
                        </div>
                        <div>
                          {heirAllocation.inheritanceTaxReceived.toFixed(2)}{' '}
                          {t('main-euro-symbol')}
                        </div>
                      </div>

                      <div className="aux-flex-row">
                        <div className="bold-text">
                          {t('solution-page-buy-sell-tax')}
                        </div>
                        <div>
                          {heirAllocation.buySellTaxReceived.toFixed(2)}{' '}
                          {t('main-euro-symbol')}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {heirPOV?.value !== 'refValue' && (
                  <>
                    <h2>{t('solution-page-assets')}</h2>
                    <h3>
                      {t('solution-page-divisibles')} (
                      {heirAllocation?.divisibleAssetsList.length})
                    </h3>
                    <div className="card-container">
                      {heirAllocation?.divisibleAssetsList.map((assetAlloc) => (
                        <SolutionDivisibleAsset
                          key={assetAlloc.assetId}
                          assetAllocation={assetAlloc}
                          inheritance={inheritance}
                        />
                      ))}
                    </div>

                    <h3>
                      {t('solution-page-indivisibles')} (
                      {heirAllocation?.indivisibleAssetsList.length})
                    </h3>
                    <div className="card-container">
                      {heirAllocation?.indivisibleAssetsList.map(
                        (assetAlloc) => (
                          <SolutionIndivisibleAsset
                            key={assetAlloc.assetId}
                            assetAllocation={assetAlloc}
                            inheritance={inheritance}
                          />
                        )
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}

        {/* <div>{JSON.stringify(inheritance.solution)}</div> */}
      </div>
    </div>
  );
};
export default SolutionPage;
