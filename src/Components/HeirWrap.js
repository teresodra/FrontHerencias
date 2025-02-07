import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const HeirWrap = ({inheritance, heirId}) => {

    const [heir, setHeir] = useState({});
    const [isValuated, setIsValuated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getHeirInfo();
        setIsValuated(checkIfValuated())
    }, [])

    const getHeirInfo = () => {
        setHeir(inheritance.heirsList.find(heir => heir.id === heirId))
    }

    // Check if heir has already valuated the assets
    const checkIfValuated = () => {
        return inheritance?.heirValuationsObj?.[heirId]
    }
    
    const goToValoration = () => {
        navigate(
            `/inheritance/${inheritance.inheritanceId}/heir/${heirId}/valoration`,
            { state: { inheritance: inheritance }
        })
    }


    return (
        <div className="list-heir" onClick={goToValoration}>
            <div>{heir?.name}</div>
            {isValuated && (
                <div className="heir-is-valuated">Valorado</div>
            )}
        </div>
    )
};
export default HeirWrap;