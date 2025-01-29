import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../services/AuthContext';
import { ClipLoader } from 'react-spinners';
import handleError from '../services/handleError';
import { apiGetInheritancesList } from '../services/api';



const HomePage = () => {

    const {inheritancesList, setInheritancesList, setInheritancesAccessList} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!inheritancesList) {
            setIsLoading(true);
            getInheritancesList();
        }
        setIsLoading(false);
    }, []);

    const getInheritancesList = async () => {
        try {
            const response = await apiGetInheritancesList()
            setInheritancesList(response.inheritancesList);
            setInheritancesAccessList(response.inheritancesAccessList)
            
        } catch (err) {
            await handleError(err, navigate)
        }
        // setIsLoading(false);
    }

    const goToInheritance = (inheritanceId) => {
        navigate(`/inheritance/${inheritanceId}`)
    }

    const goToNewInheritance = () => {
        navigate(`/inheritance/new`)
    }

    if (isLoading) {
        return(
            <div className='center'>
                <section className='content'>
                    <div className='inheritances-list'>
                        <h2>{"Tus herencias"}</h2>
                        <div className="loader-clip-container">
                            <ClipLoader className="custom-spinner-clip" loading={isLoading} />
                        </div>
                    </div>        
                </section>
            </div>   
        )
    }

    return (
        <div className='center'>
            <section className='content'>
                <div className='inheritances-list'>
                    <h2>{"Tus herencias"}</h2>

                    {/* {(invitationsList && invitationsList.filter(inv => inv.status === 'pending').length > 0) &&
                        // <h4>Invitations ({invitationsList.length})</h4>
                        <Invitations invitationsList={invitationsList} setInvitationsList={setInvitationsList} getStorageRoomsList={getStorageRoomsList}/>
                    } */}

                    {(inheritancesList && inheritancesList.length > 0) ? (
                        <div className='inheritances-list-container'>
                            {inheritancesList?.map(inh => (
                                <div
                                    key={inh.inheritanceId}
                                    className='inheritance-card'
                                    onClick={() => {goToInheritance(inh.inheritanceId)}}>
                                        {inh.name}
                                </div>
                            ))}
                        </div>
                    ): (
                        <div>{"No tienes herencias creadas"}</div>
                    )}
                </div>

                <div className='option-button-container'>          
                    <button className="custom-button" onClick={goToNewInheritance}>
                        <span className="material-symbols-outlined" translate="no" aria-hidden="true">
                            add
                        </span>
                        {"Nueva herencia"}
                    </button>
                </div>        
            </section>
        </div>
        
    )


};
export default HomePage;