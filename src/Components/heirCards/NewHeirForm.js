import React, { useEffect, useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

const NewHeirForm = ({
  heirsList,
  setHeirsList,
  heirData,
  setHeirData,
  closeModal,
  valuationObj,
  setValuationObj
}) => {
  const [heir, setHeir] = useState(heirData ? heirData : {});
  const [heirType, setHeirType] = useState(null);
  const { t } = useTranslation();

  const nameRef = React.createRef();
  const ageRef = React.createRef();

  const [validator] = useState(new SimpleReactValidator());

  const typeOptions = [
    { label: `${t('heir-data-type')} I`, value: 1 },
    { label: `${t('heir-data-type')} II`, value: 2 },
    { label: `${t('heir-data-type')} III`, value: 3 },
    { label: `${t('heir-data-type')} IIII`, value: 4 }
  ];

  useEffect(() => {
    if (heirData) {
      nameRef.current.value = heirData.name;
      ageRef.current.value = heirData.age;
      setHeirType(typeOptions.find((opt) => opt.value === heirData.type));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    changeState();

    if (validator.allValid()) {
      if (heirData) {
        editHeir();
        // To avoid loading data to edit when creating the next new item
        setHeirData(null);
      } else {
        addNewHeir();
      }

      closeModal();
    } else {
      validator.showMessages();
    }
  };

  const changeState = () => {
    setHeir({
      ...heir, // To keep id if it is being edited
      name: nameRef.current.value,
      age: ageRef.current.value
    });
  };

  // Add a new heir to the heirs list
  const addNewHeir = () => {
    const newId = uuidv4();
    setHeirsList([
      ...heirsList,
      { ...heir, id: newId } // Create id so it has a reference to be edited
    ]);
    setValuationObj([
      ...valuationObj,
      {
        heirId: newId,
        valuationObj: {
          heirId: newId,
          assetsValuationObj: { divisibleAssetsList: [] },
          money: 0
        }
      }
    ]);
    setHeir({});
  };

  // Edit the heir data
  const editHeir = () => {
    // Find heir index from heirsList
    const index = heirsList.findIndex((heirObj) => heirObj.id === heir.id);
    let auxHeirsList = [...heirsList];
    auxHeirsList[index] = heir;
    setHeirsList(auxHeirsList);
  };

  const changeHeirType = (value) => {
    setHeirType(value);
    setHeir({
      ...heir,
      type: value.value
    });
  };

  return (
    <div>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">{t('heir-data-name')}</label>
          <input type="text" name="name" ref={nameRef} onChange={changeState} />
          {validator.message('name', heir.name, 'required|alpha_num_space')}
        </div>

        <div className="form-group">
          <label htmlFor="age">{t('heir-data-age')}</label>
          <input type="text" name="age" ref={ageRef} onChange={changeState} />
          {validator.message(
            'age',
            heir.age,
            'required|numeric|min:0,num|max:130,num'
          )}
        </div>

        <div className="form-group">
          <label htmlFor="type">{t('heir-data-type')}</label>
          <Select
            options={typeOptions}
            onChange={changeHeirType}
            placeholder={t('main-select-placeholder')}
            value={heirType}
            classNamePrefix="react-select" // Apply custom prefix
          />
          {validator.message('type', heir.type, 'required')}
        </div>

        <button type="submit" className="custom-button">
          {t('main-save')}
        </button>
      </form>
    </div>
  );
};
export default NewHeirForm;
