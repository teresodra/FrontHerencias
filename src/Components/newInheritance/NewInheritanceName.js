import React from "react";

const NewInheritanceName = ({name, setName}) => {
    return (
        <form className='custom-form' onSubmit={(e) => {e.preventDefault()}}>
            <div className="form-group">
                <label>Nombre herencia</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(event) => {setName(event.target.value)}}
                />
            </div>
        </form>
    )
}
export default NewInheritanceName;

