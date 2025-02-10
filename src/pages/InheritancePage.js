import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { apiCalculate, apiDeleteInheritance, apiGetInheritance, apiGetInheritancesList, apiGetSolution } from '../services/api';
import HeirWrap from '../Components/HeirWrap';
import Swal from 'sweetalert2';
import messagesObj from "../schemas/messages";
import handleError from '../services/handleError';
import AuthContext from '../services/AuthContext';
import { ClipLoader } from 'react-spinners';

const InheritancePage = () => {

    const {
        inheritancesList, setInheritancesList,
        inheritancesAccessList, setInheritancesAccessList
    } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);
    
    const [inheritance, setInheritance] = useState(null);
    const {inheritanceId} = useParams();

    const navigate = useNavigate();

    const timerInterval = 1 * 1000; // 10 secs (in ms)
    const timerIdRef = useRef(null); // Using a ref to store the timer ID
    

    useEffect(() => {
        if (!inheritancesList || !inheritancesAccessList){
            getInheritanceData();        
        } else {
            const inheritanceAux = inheritancesList.find(inh => inh.inheritanceId === inheritanceId);
            setInheritance(inheritanceAux);
            setIsLoading(false); 
        }
        
    }, [])

    const getInheritanceData = async () => {
        try {
            const response = await apiGetInheritancesList();
            setInheritancesList(response?.inheritancesList);
            setInheritancesAccessList(response?.inheritancesAccessList);
            const inheritanceAux = response.inheritancesList.find(inh => inh.inheritanceId === inheritanceId);
            const accessPermission = response.inheritancesAccessList.find(acc => acc.inheritanceId === inheritanceId);
            // Check if they have access
            if (!inheritanceAux || !accessPermission){
                await handleError({response: {status: 403}}, navigate);
            }
            setIsLoading(false);   
            setInheritance(inheritanceAux);
            console.log(inheritanceAux)
        } catch (err) {
            await handleError(err, navigate);
        }
    }


    const isAllValuated = () => {
        if (!inheritance?.heirValuationsObj) {
            return true
        }

        return inheritance?.heirsList.length !== Object.keys(inheritance?.heirValuationsObj).length;
    }

    const calculateInheritance = async () =>{
        try {
            setIsCalculating(true);
            await apiCalculate(inheritanceId);
            // Start checking if solution available
            timerIdRef.current = setInterval(checkForSolution, timerInterval);
            Swal.fire(messagesObj.calculateSuccess);
        } catch (err) {
            console.log(err);
            Swal.fire(messagesObj.calculateError);
            setIsCalculating(false);
        }
    }


    const checkForSolution = async () => {
        try {
            let response = await apiGetSolution(inheritanceId);
            if (response.status === 200) {
                clearInterval(timerIdRef.current); // Access the timer ID from the ref
                timerIdRef.current = null; // Reset the ref


                setInheritance(response.data);
                // Update inheritance in the list
                console.log(inheritancesList)
                let auxInhList = [...inheritancesList];
                const index = auxInhList.findIndex(inh => inh.inheritanceId === inheritanceId);
                console.log(index);
                auxInhList[index] = {...response.data};
                setInheritancesList(auxInhList);
                setIsCalculating(false);
            }
            console.log(response)
        } catch (err) {
            console.log(err)
            Swal.fire(messagesObj.calculateError);
            clearInterval(timerIdRef.current); // Access the timer ID from the ref
            timerIdRef.current = null; // Reset the ref
        }
    }

    const goToSolutionPage = () => {
        navigate(`/inheritance/${inheritance.inheritanceId}/solution`)
    }

    const handleDelete = () => {
        Swal.fire(messagesObj.deleteInheritanceConfirmation
            ).then((result) => {
                if (result.isConfirmed) {
                    setIsDeleting(true);
                    deleteInheritance();
                }
            }
        )
    }

    const deleteInheritance = async () => {
        try {
            await apiDeleteInheritance(inheritanceId);
            // Remove it from list (avoid quering from back)
            const inheritancesListFiltered = inheritancesList.filter(inh => inh.inheritanceId !== inheritanceId);
            console.log(inheritancesListFiltered)
            setInheritancesList(inheritancesListFiltered);
            Swal.fire(messagesObj.deleteInheritanceSuccess);
            navigate('/home');
        } catch (err) {
            console.log(err);
            handleError(err, navigate);
        }
        setIsDeleting(false);
    }

    if (isLoading || !inheritance) {
        return (
            <div className="loader-clip-container">
                <ClipLoader className="custom-spinner-clip" loading={true} />
            </div>
        )
    }


    return (
        <div className='center'>
            <div className='content'>
                <h1>
                    {`${inheritance?.name}`}
                </h1>

                <div className='list-heirs-container'>
                    <h3 className="num-items-title">Valoraciones herederos ({inheritance?.heirsList.length})</h3>                                       
                    <div className="list-heirs-container-content"> 
                        {inheritance?.heirsList.map(heir => (
                            <HeirWrap key={heir.id} heirId={heir.id} inheritance={inheritance}/>
                        ))}
                    </div>
                </div>

                <div className='button-container'>
                    <button className='custom-button large' disabled={isAllValuated() || isCalculating || isDeleting} onClick={calculateInheritance}>
                        {!isCalculating ? (
                            "Calcular"
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
                    <button className='custom-button large' disabled={!inheritance?.solution || isCalculating || isDeleting} onClick={goToSolutionPage}>
                        Ver solución
                    </button>
                    <button className='custom-button large' disabled={!inheritance?.solutionUnvalued || isDeleting} onClick={goToSolutionPage}>
                        Ver solución sin valoraciones
                    </button>

                    <button className='custom-button large delete' onClick={handleDelete} disabled={isDeleting}>
                        {!isDeleting ? (
                            "Eliminar"
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
    )


};
export default InheritancePage;