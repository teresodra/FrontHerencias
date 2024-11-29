import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { apiGetSolution } from '../services/api';
import Select from 'react-select';
import Swal from 'sweetalert2';
import messagesObj from "../schemas/messages";
import CustomTable from '../Components/CustomTable';
import SolutionDivisibleAsset from '../Components/SolutionDivisibleAsset';
import SolutionIndivisibleAsset from '../Components/SolutionIndivisibleAsset';

const SolutionPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [inheritance, setInheritance] = useState(true);

    const [heirOptions, setHeirOptions] = useState([]);
    const [heirPOV, setHeirPOV] = useState(null);
    const [heirAllocation, setHeirAllocation] = useState(null);

    const [showTables, setShowTables] = useState(true);

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
    
    const changeHeirPOV = (value) => {
        setHeirPOV(value);
        setHeirAllocation(inheritance.solution.heirsAllocation.find(alloc => alloc.heirId === value?.value))
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
                <form className='custom-form'>
                    <Select
                        options={heirOptions}
                        onChange={changeHeirPOV}
                        value={heirPOV}
                        placeholder="Seleccionar..."
                    />
                </form>

                {heirPOV && (
                <>
                    {heirPOV?.value !== 'refValue' && (
                        <div className='tab-container'>
                            <div
                                className={showTables ? 'tab active' : 'tab'}
                                onClick={() => setShowTables(true)}
                            >
                                Valores
                            </div>
                            <div
                                className={!showTables ? 'tab active' : 'tab'}
                                onClick={() => setShowTables(false)}
                            >
                                Bienes
                            </div>
                        </div>
                    )}

                    
                    {showTables ? (
                        <>
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

                        {heirPOV?.value !== 'refValue' && (
                            <div className='center'>
                                <div className='sol-values-container'>
                                
                                    <div className='aux-flex-row'>
                                        <div className='bold-text'>
                                            {heirAllocation.moneyReceived >= 0  ? 'Aporta a la herencia:' : 'Recibe de la herencia:'}
                                        </div>
                                        <div>{Math.abs(heirAllocation.moneyReceived).toFixed(2)} €</div>
                                    </div>

                                    <div className='aux-flex-row'>
                                        <div className='bold-text'>
                                            Impuesto de herencias
                                        </div>
                                        <div>{(heirAllocation.inheritanceTaxReceived).toFixed(2)} €</div>
                                    </div>

                                    <div className='aux-flex-row'>
                                        <div className='bold-text'>
                                            Impuesto de compra-venta
                                        </div>
                                        <div>{(heirAllocation.buySellTaxReceived).toFixed(2)} €</div>
                                    </div>
                                
                                </div>
                            </div>
                        )}
                        </>

                        
                    ) : (
                        <>
                        {heirPOV?.value !== 'refValue' && (
                            <>
                            <h2>Bienes</h2>
                            <h3>Divisibles ({heirAllocation?.divisibleAssetsList.length})</h3>
                            <div className='card-container'>
                                {heirAllocation?.divisibleAssetsList.map(assetAlloc => (
                                    <SolutionDivisibleAsset key={assetAlloc.assetId} assetAllocation={assetAlloc} inheritance={inheritance}/>
                                ))}
                            </div>

                            <h3>Inivisibles ({heirAllocation?.indivisibleAssetsList.length})</h3>
                            <div className='card-container'>
                                {heirAllocation?.indivisibleAssetsList.map(assetAlloc => (
                                    <SolutionIndivisibleAsset key={assetAlloc.assetId} assetAllocation={assetAlloc} inheritance={inheritance}/>
                                ))}
                            </div>
                            </>
                        )}
                        </>
                    )}
                </>
            )}


                              
                {/* <div>{JSON.stringify(inheritance.solution)}</div> */}


            </div>
        </div>
    )


};
export default SolutionPage;