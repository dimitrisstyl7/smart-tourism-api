import Country from "../models/country.model.js";
import {validateCountryModel} from "../utils/model.validation.js";

const CountryController = {
    findAll: async (req, res) => {
        try {
            const countries = await Country.find({});
            res.status(200).json(countries);
        } catch (error) {
            res.status(500).json({
                errorCode: 500,
                message: error.message || "An error occurred while retrieving countries."
            });
            console.error(error);
        }
    },

    create: async (req, res) => {
        // Validate provided data
        const body = req.body;
        if (!validateCountryModel(body)) {
            return res.status(400).json({
                errorCode: 400,
                message: "Invalid country data. Ensure all required fields are provided and correct."
            });
        }

        try {
            // Create and save the new country model
            const countryModel = new Country({
                country: body.country,
                qualityOfLife: body.qualityOfLife,
                adventure: body.adventure,
                heritage: body.heritage,
                costOfLivingIndex: body.costOfLivingIndex,
                restaurantPriceIndex: body.restaurantPriceIndex
            });
            const createdCountry = await countryModel.save();
            res.status(201).json(createdCountry);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                errorCode: 500,
                message: error.message || "An error occurred while creating the country."
            });
        }
    },
};

export default CountryController;