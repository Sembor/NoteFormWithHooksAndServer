import React from "react";

import {render, screen, within} from '@testing-library/react';

import Input from "../components/elements/Input";
import {FormContext} from "../FormContext";

const fieldsValues =
    {
        "field_id": "user_name",
        "field_labelName": "User Name",
        "field_required": "yes",
        "field_placeholder": "User name",
        "field_type": "text",
        "field_value": "",
        "field_instruction": "User Name Should Contain at least 3 characters.",
        "field_validator": "regex",
        "field_regex": "[a-zA-Z0-9]{3,}$",
        "field_errorVisible": false
    };


function renderComponent(fields) {
    const handleChange = jest.fn();

    render(
        <FormContext.Provider value={{handleChange}}>
            <Input input_id={fields.field_id}
                   input_label={fields.field_labelName}
                   input_placeholder={fields.field_placeholder}
                   input_value={fields.field_value}
                   input_instruction={fields.field_instruction}
                   input_required={fields.field_required}
                   input_errorVisible={fields.field_errorVisible}/>
        </FormContext.Provider>);
}

describe("Input Render", () => {

    it("Loads the label", async () => {
        renderComponent(fieldsValues)

        const inputLabel = within(screen.getByTestId('input_label')).getByText(/User Name/i)
        expect(inputLabel).toBeInTheDocument()
    });

    it("Loads the textbox", async () => {
        renderComponent(fieldsValues)

        const textboxes = screen.getByRole("textbox")
        expect(textboxes).toBeInTheDocument()
    });

    it("writes on the textbox", async () => {
        fieldsValues["field_value"] = 'john'
        renderComponent(fieldsValues)

        const textbox = screen.getByRole("textbox")

        expect(textbox).toHaveValue('john')
    });

})