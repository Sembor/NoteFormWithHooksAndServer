import React, { useContext } from 'react'
import { FormContext } from '../../FormContext';
import countriesList from '../listOfCountries.json'

const Input = ({ input_id, input_label, input_placeholder, input_value, input_instruction }) => {
    const { handleChange } = useContext(FormContext)
    return (
        <div className="mb-3">
            <label className="form-label">{input_label}</label>
            <input type="text" className="form-control" id={input_id}
                   placeholder={input_placeholder ? input_placeholder : ''}
                   value={input_value}
                   onChange={event => handleChange(input_id, event)}
            />
            <div id="emailHelp" className="form-text">{input_instruction}</div>
        </div>
    )
}

export default Input