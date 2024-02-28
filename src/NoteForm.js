import formJSON from './components/listOfFields.json';
import { useState, useEffect } from 'react';
import Element from './components/Element';
import { FormContext } from './FormContext';

function MainNoteForm() {
    const baseUrl = 'http://localhost:8383/';

    const [elements, setElements] = useState(null);
    useEffect(() => {
        setElements(formJSON[0])

    }, [])
    const { fields, pageTitle } = elements ?? {}
    const handleSubmit = (event) => {
        event.preventDefault();
        postInfo()
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
    }

    async function postInfo() {

        const res = await fetch(baseUrl,
            {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Access-Control-Allow-Origin": '*',
                    "Access-Control-Allow-Headers": 'Content-Type',
                    "Access-Control-Allow-Credentials": 'true'
                },
                body: JSON.stringify({
                    username: fields[0]['field_value'],
                    country: fields[1]['field_value'],
                    taxIdentifier: fields[2]['field_value']
                })
            })
            .then( response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
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