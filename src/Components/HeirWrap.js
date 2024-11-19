import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const HeirWrap = ({inheritance, heirId}) => {

    const [heir, setHeir] = useState({});
    const [isValuated, setIsValuated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('entro')
        getHeirInfo();
        setIsValuated(checkIfValuated())
    }, [])

    const getHeirInfo = () => {
        setHeir(inheritance.heirsList.find(heir => heir.id === heirId))
        console.log(inheritance.heirsList.find(heir => heir.id === heirId))
    }

    // Check if heir has already valuated the assets
    const checkIfValuated = () => {
        return inheritance?.heirValuationsObj?.[heirId]
    }
    
    const goToValoration = () => {
        navigate(
            `/inheritance/${inheritance.id}/heir/${heirId}/valoration`,
            { state: { inheritance: inheritance }
        })
    }


    return (
        <div className="list-item" onClick={goToValoration}>
            <div>{heir?.name}</div>
            {isValuated && (
                <div>Valorado</div>
            )}
        </div>
    )
};
export default HeirWrap;