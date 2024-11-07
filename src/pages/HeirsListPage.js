import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { apiGetInheritance } from '../services/api';
import HeirWrap from '../Components/HeirWrap';

const HeirsListPage = () => {

    const [inheritance, setInheritance] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {inheritanceId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        loadInheritance();
    }, [])

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
            setInheritance(data)
            setIsLoading(false)
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
                    Herederos
                </h1>

                <div className='list-items-container'>
                    <h3 className="num-items-title">{inheritance.heirsList.length} Herederos</h3>                                       
                        <div className="list-items-container-content">
                            <div className="list-items-container-content">
                                {inheritance.heirsList.map(heir => (
                                    <HeirWrap key={heir.id} heirId={heir.id} inheritance={inheritance}/>
                                ))}
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )


};
export default HeirsListPage;