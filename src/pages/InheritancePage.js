import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  apiCalculate,
  apiDeleteInheritance,
  apiGetInheritancesList,
  apiGetSolution
} from '../services/api';
import Swal from 'sweetalert2';
import messagesObj from '../schemas/messages';
import handleError from '../services/handleError';
import AuthContext from '../services/AuthContext';
import { ClipLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';

const InheritancePage = () => {
  const {
    inheritancesList,
    setInheritancesList,
    inheritancesAccessList,
    setInheritancesAccessList
  } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const { t } = useTranslation();

  const [inheritance, setInheritance] = useState(null);
  const { inheritanceId } = useParams();

  const navigate = useNavigate();

  const timerInterval = 1 * 1000; // 10 secs (in ms)
  const timerIdRef = useRef(null); // Using a ref to store the timer ID

  useEffect(() => {
    if (!inheritancesList || !inheritancesAccessList) {
      getInheritanceData();
    } else {
      const inheritanceAux = inheritancesList.find(
        (inh) => inh.inheritanceId === inheritanceId
      );
      setInheritance(inheritanceAux);
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
      setIsLoading(false);
      setInheritance(inheritanceAux);
    } catch (err) {
      await handleError(err, navigate);
    }
  };

  // const isAllValuated = () => {
  //   if (!inheritance?.heirValuationsObj) {
  //     return true;
  //   }

  //   return (
  //     inheritance?.heirsList.length !==
  //     Object.keys(inheritance?.heirValuationsObj).length
  //   );
  // };

  const calculateInheritance = async () => {
    try {
      setIsCalculating(true);
      await apiCalculate(inheritanceId);
      // Start checking if solution available
      timerIdRef.current = setInterval(checkForSolution, timerInterval);
      Swal.fire(messagesObj.calculateSuccess);
    } catch (err) {
      Swal.fire(messagesObj.calculateError);
      setIsCalculating(false);
    }
  };

  const checkForSolution = async () => {
    try {
      let response = await apiGetSolution(inheritanceId);
      if (response.status === 200) {
        clearInterval(timerIdRef.current); // Access the timer ID from the ref
        timerIdRef.current = null; // Reset the ref
        setInheritance(response.data);
        try {
          const response = await apiGetInheritancesList();
          setInheritancesList(response.inheritancesList);
          setInheritancesAccessList(response.inheritancesAccessList);
          setIsCalculating(false);
        } catch (err) {
          await handleError(err, navigate);
        }
      } else {
        Swal.fire(messagesObj.calculateError);
        clearInterval(timerIdRef.current); // Access the timer ID from the ref
        timerIdRef.current = null; // Reset the ref
      }
    } catch (err) {
      console.error(err);
      Swal.fire(messagesObj.calculateError);
      clearInterval(timerIdRef.current); // Access the timer ID from the ref
      timerIdRef.current = null; // Reset the ref
    }
  };

  const goToSolutionPage = () => {
    navigate(`/inheritance/${inheritance.inheritanceId}/solution`, {
      state: { inheritance: inheritance }
    });
  };

  const handleDelete = () => {
    Swal.fire(messagesObj.deleteInheritanceConfirmation).then((result) => {
      if (result.isConfirmed) {
        setIsDeleting(true);
        deleteInheritance();
      }
    });
  };

  const deleteInheritance = async () => {
    try {
      await apiDeleteInheritance(inheritanceId);
      // Remove it from list (avoid quering from back)
      const inheritancesListFiltered = inheritancesList.filter(
        (inh) => inh.inheritanceId !== inheritanceId
      );
      setInheritancesList(inheritancesListFiltered);
      Swal.fire(messagesObj.deleteInheritanceSuccess);
      navigate('/home');
    } catch (err) {
      console.error(err);
      handleError(err, navigate);
    }
    setIsDeleting(false);
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
        <h1>
          {`${inheritance?.name}`}
          {/* {`Información herencia`} */}
        </h1>

        {/* <div className='button-container'>
                    <button className='custom-button' onClick={() => {navigate('/new-heritance')}}>
                        Datos herencia
                    </button>
                </div> */}

        <div className="button-container">
          <button
            className="custom-button"
            disabled={false}
            onClick={calculateInheritance}
          >
            {!isCalculating ? (
              t('main-calculate')
            ) : (
              <div className="custom-button-spinner-container">
                <ClipLoader
                  className="custom-button-spinner"
                  loading={true}
                  color="white"
                />
              </div>
            )}
          </button>
          <button
            className="custom-button"
            disabled={!inheritance?.solution || isCalculating}
            onClick={goToSolutionPage}
          >
            {t('inheritance-page-see-solution')}
          </button>

          <button
            className="custom-button delete"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {!isDeleting ? (
              t('main-delete')
            ) : (
              <div className="custom-button-spinner-container">
                <ClipLoader
                  className="custom-button-spinner"
                  loading={true}
                  color="white"
                />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default InheritancePage;
