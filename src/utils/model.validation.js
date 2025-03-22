function validateCountryModel(countryModel) {
    return countryModel &&
        countryModel.country &&
        typeof countryModel.country === "string" &&
        isNullOrPositiveInteger(countryModel.qualityOfLife) &&
        isNullOrPositiveInteger(countryModel.adventure) &&
        isNullOrPositiveInteger(countryModel.heritage) &&
        isNullOrPositiveInteger(countryModel.costOfLivingIndex) &&
        isNullOrPositiveInteger(countryModel.restaurantPriceIndex);
}

function isNullOrPositiveInteger(number) {
    return number === null || (Number.isFinite(number) && number >= 0);
}

export {validateCountryModel};