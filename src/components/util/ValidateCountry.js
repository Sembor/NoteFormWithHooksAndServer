import countryList from '../jsons/listOfCountries.json'
export const validateCountry = (countryName) => {
    const isIncluded = countryList.includes(countryName)

    return isIncluded
}