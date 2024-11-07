import React, { useEffect, useState } from 'react';
import { apiGetInheritances } from '../services/api';
import InheritanceWrap from '../Components/InheritanceWrap';

const InheritancesListPage = () => {

    const [inheritancesList, setInheritancesList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        retrieveInheritances();
    }, [])

    const retrieveInheritances = async () => {
        try {
            let data = await apiGetInheritances();
            console.log(data)
            setInheritancesList(data);
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
                    Lista herencias
                </h1>

                <div className='list-items-container'>
                    {(inheritancesList !== null && inheritancesList.length === 0) ? (
                            <h3 className="num-items-title">No hay herencias definidas</h3>
                        ) : 
                        (
                            <>
                            
                            <h3 className="num-items-title">{inheritancesList.length} Herencias</h3>
                                                                            
                            <div className="list-items-container-content">
                                {/* {results.slice(startIndex, startIndex + itemsPerPage).map(result => (
                                    <ItemWrap key={result.itemId} itemArg={result} removeItemFromList={removeItemFromList}/>
                                ))} */}
                                <div className="list-items-container-content">
                                    {inheritancesList.map(inheritance => (
                                        <InheritanceWrap key={inheritance.id} inheritance={inheritance}/>
                                    ))}
                                </div>
                            </div>

                            </>
                        )}
                    </div>

            </div>
        </div>
    )


};
export default InheritancesListPage;