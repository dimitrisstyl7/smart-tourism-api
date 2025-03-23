import {isNotPresentOrNumber} from "../utils/number.util.js";

function validateCountryModel(countryModel, isUpdate = false) {
    return countryModel &&
        (isUpdate || typeof countryModel.country === "string") &&
        isNotPresentOrNumber(countryModel.qualityOfLife) &&
        isNotPresentOrNumber(countryModel.adventure) &&
        isNotPresentOrNumber(countryModel.heritage) &&
        isNotPresentOrNumber(countryModel.costOfLivingIndex) &&
        isNotPresentOrNumber(countryModel.restaurantPriceIndex);
}

export {validateCountryModel};