import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { apiGetSolution } from '../services/api';
import Select from 'react-select';
import Swal from 'sweetalert2';
import messagesObj from "../schemas/messages";
import CustomTable from '../Components/CustomTable';

const SolutionPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [inheritance, setInheritance] = useState(true);

    const [heirOptions, setHeirOptions] = useState([]);
    const [heirPOV, setHeirPOV] = useState(null);

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
                let response = await apiGetSolution(inheritanceId);
                if (response.status === 204) {
                    Swal.fire(messagesObj.solutionNotFoundError)
                    navigate(`/inheritance/${inheritanceId}`)
                }
                data = response.data;
            }
            setInheritance(data);
            initializeValues(data);
            setIsLoading(false);

        } catch (err) {
            console.log(err)
        }
    }

    const initializeValues = (data) => {
        let auxList = [];
        data.heirsList.map(heir => auxList.push({value: heir.id, label: heir.name}))
        console.log([...heirOptions, ...auxList])
        setHeirOptions([{label: "- Valor de referencia -", value: "refValue"}, ...auxList])
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

                <h3>Punto de vista</h3>
                <Select
                    options={heirOptions}
                    onChange={(value) => setHeirPOV(value)}
                    value={heirPOV}
                    placeholder="Seleccionar..."
                />

                <h3>Valores esperados</h3>
                <CustomTable
                    inheritance={inheritance}
                    valuesObj={inheritance.solution.perceivedValueMatrix?.[heirPOV?.value]?.expectedValues}
                    heirPOV={heirPOV?.value}/>


                <h3>Valores recibidos</h3>
                <CustomTable
                    inheritance={inheritance}
                    valuesObj={inheritance.solution.perceivedValueMatrix?.[heirPOV?.value]?.receivedValues}
                    heirPOV={heirPOV?.value}
                />

                              
                {/* <div>{JSON.stringify(inheritance.solution)}</div> */}


            </div>
        </div>
    )


};
export default SolutionPage;