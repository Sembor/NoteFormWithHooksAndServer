import formJSON from './components/listOfFields.json';
import { useState, useEffect } from 'react';
import Element from './components/Element';
import { FormContext } from './FormContext';

function MainNoteForm() {
    const [elements, setElements] = useState(null);
    useEffect(() => {
        setElements(formJSON[0])

    }, [])
    const { fields, pageTitle } = elements ?? {}
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('An user name was submitted: ' + fields[0]['field_value']);
        console.log(elements)
    }

    const handleChange = (id, event) => {
        const newElements = {...elements}
        newElements.fields.forEach(field => {
            const {field_type, field_id} = field;
            if (id === field_id) {
                switch (field_type) {
                    case 'text':
                        field['field_value'] = event.target.value;
                        break;
                    case 'autocompletetext':
                        field['field_value'] = event.target.value;
                        break;

                    default:
                        break;
                }


            }
            setElements(newElements)
        });
        console.log(elements)
    }

    return (
        <FormContext.Provider value={{ handleChange }}>
            <div className="App container">
                <h3>{pageTitle}</h3>
                <form>
                    {fields ? fields.map((field, i) => <Element key={i} field={field} />) : null}
                    <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
                </form>

            </div>
        </FormContext.Provider>
    );
}

export default MainNoteForm;