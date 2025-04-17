import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Select from 'react-select';
import { useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import NewOwnershipModal from '../ownershipCard/NewOwnershipModal';

const AssetDivisibleForm = ({
  assetsObj,
  setAssetsObj,
  ownershipsList,
  closeModal,
  assetData,
  setAssetData,
  setOwnershipsList,
  heirsList
}) => {
  const [asset, setAsset] = useState(assetData ? assetData : {});
  const [ownershipId, setOwnershipId] = useState(null);
  const [category, setCategory] = useState(null);
  const [accordValue, setAccordValue] = useState(null);
  const [ownershipModalIsOpen, setOwnershipModalIsOpen] = useState(false);
  const [ownershipToEdit, setOwnershipToEdit] = useState(null);

  const nameRef = React.createRef();
  const quantityRef = React.createRef();
  const refValueRef = React.createRef();
  const accordCheckedref = React.createRef();
  console.log(ownershipsList);
  const ownerShipOptions = ownershipsList.map(
    (ownership) => (ownership = { value: ownership.id, label: ownership.name })
  );

  const categoryOptionsList = [
    { label: 'Dinero', value: 'cash' },
    { label: 'Otro', value: 'other' }
  ];

  const [validator] = useState(new SimpleReactValidator());

  useEffect(() => {
    if (assetData) {
      loadData();
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
    accordCheckedref.current.checked = assetData.accord;
    setOwnershipId(
      ownerShipOptions.find((owShip) => owShip.value === assetData.ownershipId)
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
      closeModal();
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
    auxAssetList[index] = asset;
    setAssetsObj({
      ...assetsObj,
      divisibleAssetsList: auxAssetList
    });
  };

  const addNewAsset = () => {
    console.log(assetsObj);
    setAssetsObj({
      ...assetsObj,
      divisibleAssetsList: [
        ...(assetsObj?.divisibleAssetsList || []), // Initially is undefined
        { ...asset, id: uuidv4() } // Create id so it has a reference to be edited
      ]
    });
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
  };

  const changeAccord = () => {
    setAccordValue(!accordValue);
    setAsset({
      ...asset,
      accord: !asset.accord
    });
  };

  const editOwnership = (own) => {
    let auxOwn = ownershipsList.find((ownership) => ownership.id === own);
    setOwnershipToEdit({ ...auxOwn });
    setOwnershipModalIsOpen(true);
  };

  const removeOwnership = (own) => {
    if (own === ownershipId) {
      changeOwnership(ownershipsList[0].id);
    }
    setOwnershipsList(
      ownershipsList.filter((ownership) => ownership.id !== own)
    );
  };

  return (
    <div>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre del bien</label>
          <input type="text" name="name" ref={nameRef} onChange={changeState} />
          {validator.message('name', asset.name, 'required|alpha_num_space')}
        </div>

        <div className="form-group">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="text"
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
          <label htmlFor="refValue">Valor de referencia por unidad</label>
          <input
            type="text"
            name="refValue"
            ref={refValueRef}
            onChange={changeState}
          />
          {validator.message('refValue', asset.refValue, 'required|numeric')}
        </div>

        <div className="form-group">
          <label htmlFor="categry">Categoría</label>
          <Select
            options={categoryOptionsList}
            onChange={changeCategory}
            placeholder="Seleccionar..."
            value={category}
            classNamePrefix="react-select" // Apply custom prefix
          />
          {validator.message('category', asset.category, 'required')}
        </div>

        <div className="form-group">
          <label htmlFor="categry">Propiedades</label>
          {ownershipsList.length > 0 &&
            ownershipsList.map((ownership, index) => (
              <div
                className={`radio-edit-container ${
                  ownershipsList.length === index + 1
                    ? 'radio-edit-container-last'
                    : ''
                }`}
              >
                <div className="radio-container">
                  <input
                    type="radio"
                    checked={ownershipId === ownership.id}
                    onChange={() => {
                      changeOwnership(ownership.id);
                    }}
                    classnamePrefix="react-radio"
                    id={`ownership-${ownership.id}`}
                  />
                  <label for={`ownership-${ownership.id}`}>
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
                        delete
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
                      edit
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
            Añadir propiedad
          </button>
        </div>

        <div className="form-group labelled-checkbox">
          <input
            type="checkbox"
            ref={accordCheckedref}
            checked={asset?.accord}
            onChange={changeAccord}
            value={accordValue}
            classNamePrefix="react-checkbox"
            id="accord"
          />
          <label htmlFor="accord" className="labelled-checkbox-label">
            ¿Están todos los herederos de acuerdo en el valor?
          </label>
        </div>

        <div className="formGroup">
          <div className="button-container">
            <button className="custom-button" type="submit">
              Guardar
            </button>
          </div>
        </div>
      </form>

      <NewOwnershipModal
        modalIsOpen={ownershipModalIsOpen}
        setModalIsOpen={setOwnershipModalIsOpen}
        ownershipsList={ownershipsList}
        setOwnershipsList={setOwnershipsList}
        heirsList={heirsList}
        ownershipData={ownershipToEdit}
        setOwnershipData={setOwnershipToEdit}
      />
    </div>
  );
};
export default AssetDivisibleForm;
