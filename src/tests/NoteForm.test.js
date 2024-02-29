import React from "react";

import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event'

import NoteForm from "../NoteForm";
import fieldList from "../components/jsons/listOfFields.json"

function renderComponent() {
    render(<NoteForm />);
}

describe("Home Page mount", () => {
    it("Loads Main Header", async () => {
        renderComponent()

        const headings = screen.getAllByRole("heading")
        expect(headings).toHaveLength(1)
    });

    it("Loads inputs", async () => {
        renderComponent()
        const textboxes = screen.getAllByRole("textbox")
        expect(textboxes).toHaveLength(2)
    })

    it("Loads autocomplete input", async () => {
        renderComponent()
        const textboxes = screen.getAllByRole("combobox")
        expect(textboxes).toHaveLength(1 )
    })

    it("Loads Submit Button", async () => {
        renderComponent()
        const buttons = screen.getByRole("button")
        expect(buttons).toBeInTheDocument()
    })

    it('should check if user writes on the form', async () => {
        renderComponent()

        // Find Inputs
        const [usernameInput, taxIdInput] = screen.getAllByRole('textbox');
        const countryInput = screen.getByRole('combobox')
        const button = screen.getByRole('button', { name: /submit/i })

        user.click(usernameInput);
        user.keyboard('john')

        user.click(countryInput)
        user.keyboard('Italy')

        user.click(taxIdInput);
        user.keyboard('1234567905')

        user.click(button)

        expect(usernameInput).toHaveValue('john')
        expect(taxIdInput).toHaveValue('1234567905')
        expect(countryInput).toHaveValue('Italy')
    })

});
