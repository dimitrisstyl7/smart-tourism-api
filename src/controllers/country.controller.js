import Country from "../models/country.model.js";
import {validateCountryModel} from "../validations/model.validation.js";
import {isPositiveInteger} from "../utils/number.util.js";

const CountryController = {
    findAll: async (req, res) => {
        const supportedOrderList = ["ascending", "descending", "asc", "desc"];
        const validFields = Object.keys(Country.schema.paths);
        const {sort, order, limit} = req.query;

        // Set the filtering values with fallback values
        const sortBy = validFields.includes(sort) ? sort : "country";
        const sortOrder = supportedOrderList.includes(order) ? order : "asc";
        const limitNumber = isPositiveInteger(parseInt(limit)) ? parseInt(limit) : null;

        try {
            const query = limitNumber ?
                Country.find({}).sort({[sortBy]: sortOrder}).limit(limitNumber) :
                Country.find({}).sort({[sortBy]: sortOrder});
            const countries = await query.exec();
            res.status(200).json(countries);
        } catch (error) {
            res.status(500).json({
                errorCode: 500,
                message: "An unexpected error occurred while retrieving countries.",
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
                message: "Invalid country data. Ensure that the provided fields are correct."
            });
        }

        try {
            // Create and save the new country model
            const countryModel = new Country(body);
            const createdCountry = await countryModel.save();
            res.status(201).json(createdCountry);
        } catch (error) {
            res.status(500).json({
                errorCode: 500,
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    },

    update: async (req, res) => {
        // Validate provided data
        const body = req.body;
        if (!validateCountryModel(body, true)) {
            return res.status(400).json({
                errorCode: 400,
                message: "Invalid country data. Ensure that the provided fields are correct.",
            });
        }

        try {
            // Check if the country exists before updating
            const {id} = req.params;
            const existingCountry = await Country.findById(id);

            if (!existingCountry) {
                return res.status(404).json({
                    errorCode: 404,
                    message: "Country not found. Please check the ID.",
                });
            }

            const updatedCountry = await Country.findByIdAndUpdate(id, body, {returnDocument: "after"});
            res.status(200).json(updatedCountry);
        } catch (error) {
            res.status(500).json({
                errorCode: 500,
                message: "An unexpected error occurred. Please try again later.",
            });
            console.error(error);
        }
    },

    delete: async (req, res) => {
        try {
            // Delete the country with the given id
            const {id} = req.params;
            const country = await Country.findByIdAndDelete(id);
            if (!country) {
                res.status(404).json({
                    errorCode: 404,
                    message: "Country not found. Please check the ID."
                });
            } else res.status(200).json(country);
        } catch (error) {
            res.status(500).json({
                errorCode: 500,
                message: "An unexpected error occurred while deleting the country."
            });
            console.error(error);
        }
    }
};

export default CountryController;