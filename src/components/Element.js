import Input from './elements/Input';
import AutoCompleteInput from "./elements/AutoCompleteInput";
import countriesList from './jsons/listOfCountries.json'

const Element = ({ field: { field_type, field_id, field_labelName, field_placeholder, field_value, field_options, field_instruction,field_required, field_errorVisible } }) => {

    switch (field_type) {
        case 'text':
            return (<Input
                input_id={field_id}
                input_label={field_labelName}
                input_placeholder={field_placeholder}
                input_value={field_value}
                input_instruction={field_instruction}
                input_required={field_required}
                input_errorVisible={field_errorVisible}
            />)
        case 'autocompletetext':
            return (<AutoCompleteInput
                input_id={field_id}
                input_label={field_labelName}
                input_placeholder={field_placeholder}
                input_value={field_value}
                input_instruction={field_instruction}
                input_list={countriesList}
                input_errorVisible={field_errorVisible}
            />)
        default:
            return null;
    }


}

export default Element
