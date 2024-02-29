import formJSON from './components/jsons/listOfFields.json';
import countriesValidator from './components/jsons/listOfCountriesValidations.json'
import {validateCountry} from './components/util/ValidateCountry'
import { postInfo } from './components/util/APICall'
import {useState, useEffect} from 'react';
import Element from './components/Element';
import {FormContext} from './FormContext';

function MainNoteForm() {

    const [elements, setElements] = useState(null);
    const [country, setCountry] = useState('')
    let selCountry = ""

    useEffect(() => {
        setElements(formJSON[0])

    }, [country])


    const {fields, pageTitle} = elements ?? {}
    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validate();
        if (isValid) {
            const data = {
                username: fields[0]['field_value'],
                country: fields[1]['field_value'],
                taxIdentifier: fields[2]['field_value']
            }

            const response = await postInfo(data)

            if (response === 'success') {
                alert("Form Posted Succesfully")
                clearForm()
            } else if (response === 'error') {
                alert("Form not posted")
            }
        }
    }

    const clearForm = () => {
        const newElements = {...elements}
        newElements.fields[0]['field_value'] = ""
        newElements.fields[1]['field_value'] = ""
        newElements.fields[2]['field_value'] = ""
        setElements(newElements)
    }

    function validate() {
        const newElements = {...elements}
        let isValid = true;
        newElements.fields.forEach(field => {
            const {
                field_regex,
                field_validator,
                field_value,
                field_instruction
            } = field;
            if (field_validator === 'regex') {
                const tempRegex = new RegExp(field_regex)
                if (!tempRegex.test(field_value)) {
                    field['field_errorVisible'] = true;
                    field['field_instruction'] = field_instruction;
                    isValid = false;
                } else {
                    field['field_errorVisible'] = false;
                }
            }

            if (field_validator === 'list') {
                const isIncluded = validateCountry(field_value)
                if (!isIncluded) {
                    field['field_errorVisible'] = true;
                    field['field_instruction'] = field_instruction;
                    isValid = false;
                } else {
                    setCountry(field_value)
                    selCountry = field_value
                    field['field_errorVisible'] = false;
                }
            }

            if (field_validator === 'jsonRegex') {
                let countryRegex = ""
                let countryRegexDescription = ""
                if (validateCountry(selCountry)) {
                    if (Object.hasOwn(countriesValidator, selCountry)) {
                        countryRegex = new RegExp(countriesValidator[selCountry].regex)
                        countryRegexDescription = `For ${selCountry} format must be ${countriesValidator[selCountry].description}`
                    } else {
                        countryRegex = new RegExp(countriesValidator["default"].regex)
                        countryRegexDescription = `For ${selCountry} format must be ${countriesValidator["default"].description}`
                    }
                    countryRegex = new RegExp(countryRegex)
                    if (!countryRegex.test(field_value)) {
                        field['field_errorVisible'] = true;
                        field['field_instruction'] = countryRegexDescription;
                        isValid = false;
                    } else {
                        field['field_errorVisible'] = false;
                        isValid = true;
                    }

                } else {
                    isValid = false;
                }
            }
            setElements(newElements)
        })

        return isValid;
    }

    const handleChange = (id, event) => {
        const newElements = {...elements}
        newElements.fields.forEach(field => {
            const {field_type, field_id} = field;
            if (id === field_id) {
                switch (field_type) {
                    case 'text':
                    case 'autocompletetext':
                        field['field_value'] = event.target.value;
                        break;

                    default:
                        break;
                }
            }
            setElements(newElements)
        });
    }

    return (
        <FormContext.Provider value={{handleChange}}>
            <div className="App container">
                <h3>{pageTitle}</h3>
                <form>
                    {fields ? fields.map((field, i) => <Element key={i} field={field}/>) : null}
                    <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
                </form>

            </div>
        </FormContext.Provider>
    );
}

export default MainNoteForm;