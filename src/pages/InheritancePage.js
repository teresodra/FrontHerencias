import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { apiGetInheritance } from '../services/api';

const InheritancePage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const {inheritanceId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        loadInheritance();
        setIsLoading(false);
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
        } catch (err) {
            console.log(err)
        }
    }

    const loadValoration = async () => {
        
    }

    const goToHeirsList = () => {
        navigate(`/inheritance/${inheritanceId}/heir`)
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
                    Información herencia
                </h1>

                <div className='button-container'>
                    <div className='custom-button' onClick={() => {navigate('/new-heritance')}}>
                        Datos herencia
                    </div>
                </div>

                <div className='button-container'>
                    <div className='custom-button' onClick={goToHeirsList}>
                        Valoraciones
                    </div>
                </div>

            </div>
        </div>
    )


};
export default InheritancePage;