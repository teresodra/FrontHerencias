import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import NewOwnershipModal from '../ownershipCard/NewOwnershipModal';
import { useTranslation } from 'react-i18next';
import { ICON_NAMES } from '../../shared/consts';
import InfoTooltip from '../infoTooltip/infoTooltip';

const AssetDivisibleForm = ({
  assetsObj,
  setAssetsObj,
  ownershipsList,
  closePage,
  assetData,
  setAssetData,
  setOwnershipsList,
  heirsList,
  valuationObj,
  setValuationObj
}) => {
  const [asset, setAsset] = useState(assetData ? assetData : {});
  const [ownershipId, setOwnershipId] = useState(null);
  const [category, setCategory] = useState(null);
  const [accordValue, setAccordValue] = useState(true);
  const [ownershipModalIsOpen, setOwnershipModalIsOpen] = useState(false);
  const [ownershipToEdit, setOwnershipToEdit] = useState(null);
  const [unitValues, setUnitValues] = useState([]);
  const [assignedValue, setAssignedValue] = useState('not-assigned');
  const { t } = useTranslation();

  const nameRef = React.createRef();
  const quantityRef = React.createRef();
  const refValueRef = React.createRef();
  const ownerShipOptions = ownershipsList.map(
    (ownership) => (ownership = { value: ownership.id, label: ownership.name })
  );

  const categoryOptionsList = [
    { label: t('asset-form-money'), value: 'cash' },
    { label: t('asset-form-other'), value: 'other' }
  ];

  const [validator] = useState(
    new SimpleReactValidator({
      validators: {
        addOwnership: {
          message: 'Añade al menos una propiedad.',
          rule: (validator) => {
            return Boolean(validator);
          },
          required: true
        }
      }
    })
  );

  useEffect(() => {
    if (assetData) {
      loadData();
    } else {
      const values = [];
      valuationObj.forEach((valuation) => {
        values.push({
          unitValue: 0,
          heirId: valuation.heirId
        });
      });
      setUnitValues(values);
    }
  }, []);

  useEffect(() => {
    if (!ownershipId && ownershipsList?.length > 0) {
      changeOwnership(ownershipsList[0].id);
    }
  }, [ownershipsList]);

  const loadData = () => {
    nameRef.current.value = assetData.name;
    quantityRef.current.value = assetData.quantity;
    refValueRef.current.value = assetData.refValue;

    setAssignedValue(assetData?.assignedTo || 'not-assigned');
    const values = [];
    valuationObj.forEach((valuation) => {
      values.push({
        unitValue:
          valuation.valuationObj.assetsValuationObj.divisibleAssetsList.find(
            (item) => item.assetId === asset.id
          ).unitValue,
        heirId: valuation.heirId
      });
    });
    setUnitValues(values);
    setAccordValue(assetData.agreedValue);
    setOwnershipId(
      ownerShipOptions.some((owShip) => owShip.value === assetData.ownershipId)
    );
    setCategory(
      categoryOptionsList.find((cat) => cat.value === assetData.category)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeState();

    if (validator.allValid()) {
      if (assetData) {
        editAsset();
        // To avoid loading data to edit when creating the next new item
        setAssetData(null);
      } else {
        addNewAsset();
      }
      closePage();
    } else {
      validator.showMessages();
    }
  };

  const changeState = () => {
    setAsset({
      ...asset,
      name: nameRef.current.value,
      quantity: quantityRef.current.value,
      refValue: refValueRef.current.value
    });
  };

  const editAsset = () => {
    // Find asset index from assetList
    const index = assetsObj.divisibleAssetsList.findIndex(
      (assetObj) => assetObj.id === asset.id
    );
    let auxAssetList = [...assetsObj.divisibleAssetsList];
    auxAssetList[index] = {
      ...asset,
      agreedValue: accordValue,
      assignedTo: assignedValue
    };
    const auxValuationObj = JSON.parse(JSON.stringify(valuationObj));
    valuationObj.forEach((item) => {
      const auxValuationItemIndex = valuationObj.findIndex(
        (valItem) => valItem.heirId === item.heirId
      );
      const auxValuationAssetsListIndex = valuationObj[
        auxValuationItemIndex
      ].valuationObj.assetsValuationObj.divisibleAssetsList.findIndex(
        (item) => item.assetId === asset.id
      );
      auxValuationObj[
        auxValuationItemIndex
      ].valuationObj.assetsValuationObj.divisibleAssetsList[
        auxValuationAssetsListIndex
      ] = {
        assetId: asset.id,
        unitValue: Number(
          unitValues.find((unitValue) => unitValue.heirId === item.heirId)
            .unitValue
        )
      };
    });
    setAsset({
      ...asset,
      agreedValue: accordValue,
      assignedTo: assignedValue
    });
    setValuationObj(auxValuationObj);
    setAssetsObj({
      ...assetsObj,
      divisibleAssetsList: auxAssetList
    });
  };

  const addNewAsset = () => {
    const newUuid = uuidv4();
    setAssetsObj({
      ...assetsObj,
      divisibleAssetsList: [
        ...(assetsObj?.divisibleAssetsList || []), // Initially is undefined
        {
          ...asset,
          id: newUuid,
          agreedValue: accordValue,
          assignedTo: assignedValue
        } // Create id so it has a reference to be edited
      ]
    });
    const auxValuationObj = JSON.parse(JSON.stringify(valuationObj));
    valuationObj.forEach((item) => {
      auxValuationObj[
        valuationObj.findIndex((valItem) => valItem.heirId === item.heirId)
      ].valuationObj.assetsValuationObj.divisibleAssetsList.push({
        unitValue: Number(
          unitValues.find((unitValue) => item.heirId === unitValue.heirId)
            .unitValue
        ),
        assetId: newUuid
      });
    });
    setAsset({
      ...asset,
      agreedValue: accordValue,
      assignedTo: assignedValue
    });
    setValuationObj(auxValuationObj);
  };

  const changeCategory = (event) => {
    setAsset({
      ...asset,
      category: event.value
    });
    setCategory(event);
  };

  const changeOwnership = (item) => {
    setAsset({
      ...asset,
      ownershipId: item
    });
    setOwnershipId(item);
    validator.showMessageFor('ownership');
  };

  const changeAccord = () => {
    if (accordValue) {
      setAsset({
        ...asset,
        assignedTo: 'not-assigned'
      });
    } else if (!accordValue && assignedValue) {
      setAsset({
        ...asset,
        assignedTo: assignedValue
      });
    }
    setAccordValue(!accordValue);
    setUnitValues(
      unitValues.map((unitValue) => {
        return {
          ...unitValue,
          unitValue: 0
        };
      })
    );
  };

  const editOwnership = (own) => {
    let auxOwn = ownershipsList.find((ownership) => ownership.id === own);
    setOwnershipToEdit({ ...auxOwn });
    setOwnershipModalIsOpen(true);
  };

  const removeOwnership = (own) => {
    const newOwnershipsList = ownershipsList.filter(
      (ownership) => ownership.id !== own
    );
    if (own === ownershipId) {
      changeOwnership(newOwnershipsList[0].id);
    }
    setOwnershipsList(newOwnershipsList);
  };

  const triggerChangeValuationObj = (value, heirId) => {
    if (heirId) {
      setUnitValues(
        unitValues.map((unitValue) => {
          return {
            ...unitValue,
            unitValue: unitValue.heirId === heirId ? value : unitValue.unitValue
          };
        })
      );
    } else {
      setUnitValues(
        unitValues.map((unitValue) => {
          return {
            ...unitValue,
            unitValue: value
          };
        })
      );
    }
  };

  const changeAssigned = (e) => {
    setAssignedValue(e);
  };

  return (
    <div>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="form-group --add-margin">
          <label htmlFor="name">{t('asset-form-name')}</label>
          <input type="text" name="name" ref={nameRef} onChange={changeState} />
          {validator.message('name', asset.name, 'required|alpha_num_space')}
        </div>

        <div className="form-group">
          <div className="tooltip-container">
            <label htmlFor="cantidad">{t('asset-form-quantity')}</label>
            <InfoTooltip
              text={t('asset-form-quantity-tooltip')}
              size={20}
              relative
              top={10}
            />
          </div>
          <input
            type="number"
            name="cantidad"
            ref={quantityRef}
            onChange={changeState}
          />
          {validator.message(
            'quantity',
            asset.quantity,
            'required|numeric|min:0,num'
          )}
        </div>

        <div className="form-group">
          <div className="tooltip-container">
            <label htmlFor="refValue">
              {t('asset-form-unit-reference-value')}
            </label>
            <InfoTooltip
              text={t('asset-form-unit-reference-value-tooltip')}
              size={20}
              relative
              top={10}
            />
          </div>
          <input
            type="number"
            name="refValue"
            ref={refValueRef}
            onChange={changeState}
          />
          {validator.message('refValue', asset.refValue, 'required|numeric')}
        </div>

        <div className="form-group">
          <label htmlFor="categry">{t('asset-form-category')}</label>
          <Select
            options={categoryOptionsList}
            onChange={changeCategory}
            placeholder={t('main-select-placeholder')}
            value={category}
          />
          {validator.message('category', asset.category, 'required')}
        </div>

        <div className="form-group">
          <div className="tooltip-container">
            <label htmlFor="categry">{t('asset-form-property')}</label>
            <InfoTooltip
              text={t('asset-form-property-tooltip')}
              size={20}
              relative
              top={10}
            />
          </div>
          {ownershipsList.length > 0 &&
            ownershipsList.map((ownership, index) => (
              <div
                className={`radio-edit-container ${
                  ownershipsList.length === index + 1
                    ? 'radio-edit-container-last'
                    : ''
                }`}
                key={ownership.id}
              >
                <div className="radio-container">
                  <input
                    type="radio"
                    name="ownership"
                    checked={ownershipId === ownership.id}
                    onChange={() => {
                      changeOwnership(ownership.id);
                    }}
                    id={`ownership-${ownership.id}`}
                  />
                  <label htmlFor={`ownership-${ownership.id}`}>
                    {ownership.name}
                  </label>
                </div>
                <div className="radio-actions-container">
                  {ownershipsList.length > 1 && (
                    <button
                      className="invisible-button"
                      onClick={(e) => {
                        e.preventDefault();
                        removeOwnership(ownership.id);
                      }}
                    >
                      <span className="material-symbols-outlined radio-delete-icon action-icon">
                        {ICON_NAMES.DELETE}
                      </span>
                    </button>
                  )}
                  <button
                    className="invisible-button"
                    onClick={(e) => {
                      e.preventDefault();
                      editOwnership(ownership.id);
                    }}
                  >
                    <span className="material-symbols-outlined action-icon">
                      {ICON_NAMES.EDIT}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          <button
            className="custom-button"
            onClick={(e) => {
              e.preventDefault();
              setOwnershipToEdit(null);
              setOwnershipModalIsOpen(true);
            }}
          >
            {t('asset-form-add-property')}
          </button>
          {validator.message('ownership', ownershipId, 'addOwnership')}
        </div>
        {ownershipId && (
          <>
            <div className="form-group inline-radio-group">
              <label htmlFor="accord" className="labelled-checkbox-label">
                {t('asset-form-heirs-accord')}
              </label>
              <div className="inline-radio-group">
                <div className="radio-container">
                  <input
                    type="radio"
                    name="accord"
                    checked={accordValue}
                    onChange={changeAccord}
                    id={`accord-yes`}
                  />
                  <label htmlFor={`accord-yes`}>{t('main-yes')}</label>
                </div>
                <div className="radio-container">
                  <input
                    type="radio"
                    name="accord"
                    checked={!accordValue}
                    onChange={changeAccord}
                    id={`accord-no`}
                  />
                  <label htmlFor={`accord-no`}>{t('main-no')}</label>
                </div>
              </div>
            </div>

            <div className="form-group">
              {accordValue ? (
                <>
                  <div className="heir-value-item">
                    <label htmlFor={`commonheir`}>
                      {t('asset-form-unit-value')}
                    </label>
                    <input
                      type="number"
                      name="value"
                      id={`commonheir`}
                      onChange={(e) => {
                        triggerChangeValuationObj(e.target.value);
                      }}
                      value={unitValues?.[0]?.unitValue || 0}
                    />
                    {validator.message(
                      'quantity',
                      asset.quantity,
                      'required|numeric|min:0,num'
                    )}
                  </div>
                </>
              ) : (
                <>
                  {heirsList.map((heir) => (
                    <div className="heir-value-item" key={heir.id}>
                      <label htmlFor={`heir-${heir.id}`}>{`${t(
                        'asset-form-unit-value-for'
                      )} ${heir.name}`}</label>
                      <input
                        type="number"
                        name="value"
                        id={`heir-${heir.id}`}
                        onChange={(e) => {
                          triggerChangeValuationObj(e.target.value, heir.id);
                        }}
                        value={
                          unitValues?.find((item) => item.heirId === heir.id)
                            ?.unitValue || 0
                        }
                      />
                      {validator.message(
                        'quantity',
                        unitValues?.find((item) => item.heirId === heir.id)
                          ?.unitValue || 0,
                        'required|numeric|min:0,num'
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
            {accordValue && (
              <div className="form-group">
                <label htmlFor="assigned">{t('asset-form-is-assigned')}</label>
                <div className="radio-container">
                  <input
                    type="radio"
                    name="assigned"
                    checked={assignedValue === 'not-assigned'}
                    onChange={() => {
                      changeAssigned('not-assigned');
                    }}
                    id={`assigned-not-assigned`}
                  />
                  <label htmlFor={`assigned-not-assigned`}>
                    {t('main-no')}
                  </label>
                </div>
                {heirsList.map((heir) => (
                  <div className="radio-container" key={heir.id}>
                    <input
                      type="radio"
                      name="assigned"
                      checked={heir.id === assignedValue}
                      onChange={() => {
                        changeAssigned(heir.id);
                      }}
                      id={`assigned-${heir.id}`}
                    />
                    <label htmlFor={`assigned-yes`}>{heir.name}</label>
                  </div>
                ))}
              </div>
            )}

            <div className="formGroup">
              <div className="button-container">
                <button className="custom-button" type="submit">
                  {t('main-save')}
                </button>
              </div>
            </div>
          </>
        )}
      </form>

      <NewOwnershipModal
        modalIsOpen={ownershipModalIsOpen}
        setModalIsOpen={setOwnershipModalIsOpen}
        ownershipsList={ownershipsList}
        setOwnershipsList={setOwnershipsList}
        heirsList={heirsList}
        ownershipData={ownershipToEdit}
        setOwnershipData={setOwnershipToEdit}
        changeOwnership={changeOwnership}
      />
    </div>
  );
};
export default AssetDivisibleForm;
