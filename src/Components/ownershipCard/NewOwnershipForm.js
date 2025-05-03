import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SimpleReactValidator from 'simple-react-validator';
import { v4 as uuidv4 } from 'uuid';

const NewOwnershipForm = ({
  ownershipsList,
  setOwnershipsList,
  heirsList,
  ownershipData,
  setOwnershipData,
  changeOwnership,
  closeModal
}) => {
  const [ownership, setOwnership] = useState(
    ownershipData ? ownershipData : {}
  );
  const { t } = useTranslation();

  const [validator] = useState(
    new SimpleReactValidator({
      validators: {
        allFilled: {
          message: t('new-inheritance-fill-percentage-inputs'),
          rule: (val) => {
            const { heirPercObj } = val;
            for (let heirId in heirPercObj) {
              const heir = heirPercObj[heirId];
              if (
                heir.fullOwnership === null ||
                heir.bareOwnership === null ||
                heir.lifeUsufruct === null
              ) {
                return false;
              }
            }
            return true;
          },
          required: true
        },
        sumOne: {
          message: t('new-inheritance-ownership-sum'),
          rule: (val) => {
            const { heirPercObj } = val;
            let total = 0;
            for (let heirId in heirPercObj) {
              total += parseFloat(heirPercObj[heirId].fullOwnership || 0);
              total += parseFloat(heirPercObj[heirId].bareOwnership || 0);
            }

            return Math.abs(1 - total) < 1e-6;
          },
          required: true
        },
        sumEqual: {
          message: t('new-inheritance-usufruct-sum'),
          rule: (val) => {
            const { heirPercObj } = val;
            let totaLife = 0;
            let totalBare = 0;
            for (let heirId in heirPercObj) {
              totaLife += parseFloat(heirPercObj[heirId].lifeUsufruct || 0);
              totalBare += parseFloat(heirPercObj[heirId].bareOwnership || 0);
            }
            return Math.abs(totaLife - totalBare) < 1e-6;
          },
          required: true
        }
      }
    })
  );

  const nameRef = React.createRef();

  useEffect(() => {
    if (ownershipData) {
      nameRef.current.value = ownershipData.name;
    } else {
      initializeHeirPercObj();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    changeState();

    if (validator.allValid()) {
      if (ownershipData) {
        editOwnership();
        // To avoid loading data to edit when creating the next new item
        setOwnershipData(null);
      } else {
        addNewOwnership();
      }
      closeModal();
    } else {
      validator.showMessages(true);
    }
  };

  const changeState = () => {
    setOwnership({
      ...ownership, // To keep id if it is being edited
      name: nameRef.current.value
    });
  };

  const addNewOwnership = () => {
    const newId = uuidv4();
    setOwnershipsList([
      ...ownershipsList,
      { ...ownership, id: newId } // Create id so it has a reference to be edited
    ]);
    changeOwnership(newId);
  };

  const editOwnership = () => {
    // Find ownership index from ownershipsList
    const index = ownershipsList.findIndex(
      (ownObj) => ownObj.id === ownership.id
    );
    let auxOwnershipsList = [...ownershipsList];
    auxOwnershipsList[index] = ownership;
    setOwnershipsList(auxOwnershipsList);
  };

  const initializeHeirPercObj = () => {
    let auxObj = {};
    for (let heir of heirsList) {
      auxObj[heir.id] = { fullOwnership: 0, bareOwnership: 0, lifeUsufruct: 0 };
    }
    setOwnership({ ...ownership, heirPercObj: auxObj });
  };

  const handleInputChange = (heirId, field, value) => {
    setOwnership((prev) => ({
      ...prev,
      heirPercObj: {
        ...prev.heirPercObj,
        [heirId]: {
          ...prev.heirPercObj[heirId],
          [field]: value.replace(',', '.')
        }
      }
    }));
  };

  // Validator to check that all the percentages are filled
  // const validateHeirPercObj = () => {
  //     const { heirPercObj } = ownership;
  //     for (let heirId in heirPercObj) {
  //         const heir = heirPercObj[heirId];
  //         if (heir.pp === null || heir.np === null || heir.uv === null) {
  //             return false;
  //         }
  //     }
  //     return true;
  // };

  return (
    <div>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">{t('new-inheritance-name')}</label>
          <input type="text" name="name" ref={nameRef} onChange={changeState} />
          {validator.message(
            'name',
            ownership.name,
            'required|alpha_num_space'
          )}
        </div>

        {heirsList.map((heir) => (
          <div key={heir.id} className="form-group">
            <div>{heir.name}</div>

            <div className="ownership-values-container">
              <label>{t('new-inheritance-full-ownership')}:</label>
              <input
                type="text"
                value={ownership.heirPercObj?.[heir.id]?.fullOwnership || 0}
                min="0"
                max="100"
                onChange={(e) =>
                  handleInputChange(heir.id, 'fullOwnership', e.target.value)
                }
              />

              {/* <input type='number' defaultValue={0} min="0" max="100" onChange={(e) => handleInputChange(heir.id, 'pp', e.target.value)}/> */}
            </div>

            <div className="ownership-values-container">
              <label>{t('new-inheritance-bare-ownership')}:</label>
              <input
                type="text"
                value={ownership.heirPercObj?.[heir.id]?.bareOwnership || 0}
                min="0"
                max="100"
                onChange={(e) =>
                  handleInputChange(heir.id, 'bareOwnership', e.target.value)
                }
              />
              {/* <input type='number' defaultValue={0} min="0" max="100" onChange={(e) => handleInputChange(heir.id, 'np', e.target.value)}/> */}
            </div>

            <div className="ownership-values-container">
              <label>{t('new-inheritance-life-usufruct')}:</label>
              <input
                type="text"
                value={ownership.heirPercObj?.[heir.id]?.lifeUsufruct || 0}
                min="0"
                max="100"
                onChange={(e) =>
                  handleInputChange(heir.id, 'lifeUsufruct', e.target.value)
                }
              />
              {/* <input type='number' defaultValue={0} min="0" max="100" onChange={(e) => handleInputChange(heir.id, 'uv', e.target.value)}/> */}
            </div>
          </div>
        ))}
        {validator.message('allFilledValidation', ownership, 'allFilled')}
        {validator.message('sumOneValidation', ownership, 'sumOne')}
        {validator.message('sumEqualValidation', ownership, 'sumEqual')}

        <button type="submit" className="custom-button">
          {t('main-save')}
        </button>
      </form>
    </div>
  );
};
export default NewOwnershipForm;
