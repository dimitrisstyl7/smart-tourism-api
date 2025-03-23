import {Router} from "express";
import CountryController from "../controllers/country.controller.js";

const router = Router();

// Retrieve all countries
router.get("/", CountryController.findAll);

// Create a new country
router.post("/", CountryController.create);

// Update a country by id
router.put("/:id", CountryController.update);

// Delete a country by id
router.delete("/:id", CountryController.delete);

export default router;