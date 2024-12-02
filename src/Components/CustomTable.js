import React from "react";
import { useNavigate } from 'react-router-dom';


const CustomTable = ({inheritance, valuesObj, heirPOV}) => {


    // const valuesObj = inheritance.solution.perceivedValueMatrix.refValue.valuesExpected;
    // const valuesExpectedObj = inheritance.solution.perceivedValueMatrix.refValue;

    if (!valuesObj)
        return <div></div>
    

    return (
        <table className="custom-table">
          <thead className="custom-thead">
            <tr>
            {/* {inheritance.heirsList.map((heir) => ( */}
              {Object.keys(valuesObj).map((heirId) => (
                <th key={heirId}>{inheritance.heirsList.find(heir => heir.id === heirId).name}</th>
              ))}
            </tr>
          </thead>

          <tbody className="custom-tbody">
              <tr>
                {/* {Object.values(valuesObj).map((value, i) => ( */}
                {Object.entries(valuesObj).map(([heirId, value]) => (
                    <td
                    className={heirId === heirPOV ? "custom-td-bold" : "custom-td"}
                    key={heirId}>
                        {value.toFixed(2)}
                    </td>
                ))}
              </tr>
          </tbody>
        </table>
      );
    
};
export default CustomTable;