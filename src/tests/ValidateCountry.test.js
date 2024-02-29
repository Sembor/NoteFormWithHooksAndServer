import React from "react";

import {validateCountry} from "../components/util/ValidateCountry";
const countryToValidate = "Australia"
describe("Validations of Countries", () => {
    it("should validate given country and return true", async () => {

        const res = await validateCountry(countryToValidate);

        expect(res).toEqual(true)

    });

    it("should validate given country and return false", async () => {

        const wrongCountryName = "India"
        const res = await validateCountry(wrongCountryName);

        expect(res).toEqual(false)

    });



});
