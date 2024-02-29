import React, { useContext } from 'react'
import { FormContext } from '../../FormContext';

const AutoCompleteInput = ({ input_id, input_label, input_placeholder, input_value, input_instruction, input_list, input_errorVisible}) => {
    const { handleChange } = useContext(FormContext)
    const styleVisible = {
        "display": input_errorVisible ? 'block' : 'none'
    }
    return (
        <div className="mb-3">
            <label className="form-label"  data-testid="input_label">{input_label}</label>
            <input type="text"  className="form-control" id={input_id}
                   placeholder={input_placeholder ? input_placeholder : ''}
                   value={input_value}
                   onChange={event => handleChange(input_id, event)}
                   list="countryDataList"
            />
            <datalist id="countryDataList">
                {input_list.map((country, i) => <option key={i} value={country} /> ) }
            </datalist>
            <div id="boxHelp"
                 className={`form-text text-danger ${input_errorVisible ? 'visible' : 'invisible'}`}
                 style={styleVisible}>
                {input_instruction}
            </div>
        </div>
    )
}

export default AutoCompleteInput
