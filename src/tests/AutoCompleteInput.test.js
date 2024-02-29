import React from "react";

import {render, screen, within} from '@testing-library/react';

import AutoCompleteInput from "../components/elements/AutoCompleteInput";
import {FormContext} from "../FormContext";

const fieldsValues =
    {
        "field_id": "country_name",
        "field_labelName": "Country",
        "field_required": "yes",
        "field_placeholder": "Country name",
        "field_type": "autocompletetext",
        "field_value": "",
        "field_instruction": "Please select a correct Country Name",
        "field_autocomplete": "true",
        "field_errorVisible": false,
        "field_validator": "list"
    };

const countriesList = ["Australia","Canada", "Costa Rica","Denmark","France","Italy","Japan","Panama","Spain","United States", "Other"]

function renderComponent(fields) {
    const handleChange = jest.fn();

    render(
        <FormContext.Provider value={{handleChange}}>
            <AutoCompleteInput input_id={fields.field_id}
                   input_label={fields.field_labelName}
                   input_placeholder={fields.field_placeholder}
                   input_value={fields.field_value}
                   input_instruction={fields.field_instruction}
                   input_required={fields.field_required}
                   input_errorVisible={fields.field_errorVisible}
                   input_list={countriesList}/>
        </FormContext.Provider>);
}

describe("Input Render", () => {

    it("Loads the label", async () => {
        renderComponent(fieldsValues)

        const inputLabel = within(screen.getByTestId('input_label')).getByText(/Country/i)
        expect(inputLabel).toBeInTheDocument()
    });

    it("Loads the textbox", async () => {
        renderComponent(fieldsValues)

        const textboxes = screen.getByRole("combobox")
        expect(textboxes).toBeInTheDocument()
    });

    it("writes on the textbox", async () => {
        fieldsValues["field_value"] = 'john'
        renderComponent(fieldsValues)

        const textbox = screen.getByRole("combobox")

        expect(textbox).toHaveValue('john')
    });

})