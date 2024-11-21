import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { apiGetSolution } from '../services/api';

const SolutionPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [inheritance, setInheritance] = useState(true);
    const {inheritanceId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // TODO poner que si solucion no existe de error y te lleve a pagina herencia

    useEffect(() => {
        loadInheritance();
        
    }, []); 

    const loadInheritance = async () => {
        try {
            let data;
            if (location.state?.inheritance?.solution) {
                data = location.state?.inheritance // Get inheritance from state when clicking in inheritance wrap
            } else {
                data = await apiGetSolution(inheritanceId);
                console.log('cojo data')
                console.log(data)
            }
            setInheritance(data);
            setIsLoading(false);
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
                    Solucion
                </h1>

                <div>{JSON.stringify(inheritance.solution)}</div>


            </div>
        </div>
    )


};
export default SolutionPage;