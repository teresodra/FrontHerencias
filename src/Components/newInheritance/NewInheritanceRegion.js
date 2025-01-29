import React, {useState} from "react";
import Select from 'react-select';
import regionsList from "../../schemas/regionsList";


const NewInheritanceRegion = ({region, setRegion}) => {
    
    const [selectedRegion, setSelectedRegion] = useState(regionsList.find(reg => reg.value === region));

    const updateRegion = (e) => {
        setSelectedRegion(e);
        setRegion(e.value);
    }

    return (
        <>
            <h2>Comunidad autónoma</h2>
            <form className="form-group" onSubmit={(e) => {e.preventDefault()}}>
                <Select
                    options={regionsList}
                    onChange={updateRegion}
                    value={selectedRegion}
                    placeholder={"Seleciona comunidad..."}
                    classNamePrefix="react-select" // Apply custom prefix
                />
            </form>
        </>
    )
};
export default NewInheritanceRegion;