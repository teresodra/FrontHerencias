import React from "react";
import { useNavigate } from 'react-router-dom';


const InheritanceWrap = ({inheritance}) => {

    const navigate = useNavigate();

    const goToInheritance = () => {
        navigate(`/inheritance/${inheritance.id}`, { state: { inheritance: inheritance } })
    }


    return (
        <div className="list-item" onClick={goToInheritance}>
            <div>{inheritance.id}</div>
        </div>
    )
};
export default InheritanceWrap;