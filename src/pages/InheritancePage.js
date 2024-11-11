import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { apiCalculate, apiGetInheritance } from '../services/api';
import HeirWrap from '../Components/HeirWrap';

const InheritancePage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [inheritance, setInheritance] = useState(true);
    const {inheritanceId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();

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
            console.log(isAllValuated())
        } catch (err) {
            console.log(err)
        }
    }

    const loadValoration = async () => {

    }

    const goToHeirsList = () => {
        navigate(`/inheritance/${inheritanceId}/heir`)
    }

    const isAllValuated = () => {
        console.log(inheritance)
        if (!inheritance.heirValuationsList) {
            console.log('treu')
            return true
        }

        console.log(inheritance.heirsList.length !== inheritance.heirValuationsList.length)
        return inheritance.heirsList.length !== inheritance.heirValuationsList.length;
    }

    const calculateInheritance = async () =>{
        try {
            await apiCalculate(inheritanceId);
        } catch (err) {
            console.log(err)
        }
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

            </div>
        </div>
    )


};
export default InheritancePage;