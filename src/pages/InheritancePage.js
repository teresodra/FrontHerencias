import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { apiCalculate, apiGetInheritance, apiGetSolution } from '../services/api';
import HeirWrap from '../Components/HeirWrap';
import Swal from 'sweetalert2';
import messagesObj from "../schemas/messages";

const InheritancePage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [inheritance, setInheritance] = useState(true);
    const {inheritanceId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const timerInterval = 1 * 1000; // 10 secs (in ms)
    const timerIdRef = useRef(null); // Using a ref to store the timer ID
    

    useEffect(() => {
        loadInheritance();
        
    }, []); 

    const loadInheritance = async () => {
        try {
            let data;
            if (location.state?.inheritance) {
                data = location.state?.inheritance // Get inheritance from state when clicking in inheritance wrap
            } else {
                data = await apiGetInheritance(inheritanceId);

                console.log('cojo data')
                console.log(data)
            }
            setInheritance(data);
            setIsLoading(false);
        } catch (err) {
            console.log(err)
        }
    }


    const isAllValuated = () => {
        console.log(inheritance)
        if (!inheritance.heirValuationsObj) {
            console.log('treu')
            return true
        }

        return inheritance.heirsList.length !== Object.keys(inheritance.heirValuationsObj).length;
    }

    const calculateInheritance = async () =>{
        try {
            await apiCalculate(inheritanceId);
            // Start checking if solution available
            timerIdRef.current = setInterval(checkForSolution, timerInterval);
            Swal.fire(messagesObj.calculateSuccess);
        } catch (err) {
            console.log(err);
            Swal.fire(messagesObj.calculateError);
        }
    }

    const checkForSolution = async () => {
        try {
            console.log('trying')
            let response = await apiGetSolution(inheritanceId);
            console.log(response.status === 200)
            if (response.status === 200) {
                console.log('entro')
                clearInterval(timerIdRef.current); // Access the timer ID from the ref
                timerIdRef.current = null; // Reset the ref
                // console.log(timerId)
                setInheritance(response.data);
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
        navigate(`/inheritance/${inheritance.id}/solution`, { state: { inheritance: inheritance } })
    }

    if (isLoading) {
        return (
            <div></div>
        )
    }


    return (
        <div className='center'>
            <div className='content'>
                <h1>
                    {`${inheritance.name}`}
                    {/* {`Información herencia`} */}
                </h1>

                {/* <div className='button-container'>
                    <button className='custom-button' onClick={() => {navigate('/new-heritance')}}>
                        Datos herencia
                    </button>
                </div> */}

                <div className='list-items-container'>
                    <h3 className="num-items-title">Valoraciones herederos ({inheritance.heirsList.length})</h3>                                       
                    <div className="list-items-container-content">
                        <div className="list-items-container-content">
                            {inheritance.heirsList.map(heir => (
                                <HeirWrap key={heir.id} heirId={heir.id} inheritance={inheritance}/>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='button-container'>
                    <button className='custom-button' disabled={isAllValuated()} onClick={calculateInheritance}>
                        Calcular
                    </button>
                </div>

                <div className='button-container'>
                    <button className='custom-button' disabled={!inheritance.solution} onClick={goToSolutionPage}>
                        Ver solucion
                    </button>
                </div>

            </div>
        </div>
    )


};
export default InheritancePage;